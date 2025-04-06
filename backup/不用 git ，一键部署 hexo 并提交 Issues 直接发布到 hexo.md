前提条件：

- 1 github账号
- 2 Vercel账号

Deploy your own Hexo project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/EvanNotFound/vercel-hexo-template/tree/main&template=hexo)

_Live Example: https://hexo-template.ohevan.com_


下一步：
```
 import os
import requests
import json
from datetime import datetime
import base64

# 配置信息
REPO_OWNER = "your_username"  # 仓库所有者
REPO_NAME = "your_hexo_repo"  # Hexo 仓库名
ISSUES_REPO_NAME = "your_repo_with_issues"  # 包含 issues 的仓库名
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # 从环境变量获取 GitHub token
HEXO_POSTS_DIR = "source/_posts"  # Hexo 文章目录

def get_issues():
    """获取所有 issues"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{ISSUES_REPO_NAME}/issues"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def issue_to_md(issue):
    """将 issue 转换为 Hexo 兼容的 Markdown 格式"""
    # Hexo 文章前置信息
    front_matter = {
        "title": issue["title"],
        "date": datetime.strptime(issue["created_at"], "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d %H:%M:%S"),
        "tags": [label["name"] for label in issue["labels"]],
        "categories": "Issues",
        "source": issue["html_url"],
        "issue_id": issue["number"]
    }
    
    # 生成前置信息部分
    front_matter_str = "---\n"
    for key, value in front_matter.items():
        front_matter_str += f"{key}: {json.dumps(value, ensure_ascii=False)}\n"
    front_matter_str += "---\n\n"
    
    # 添加 issue 内容
    content = front_matter_str + issue["body"]
    
    # 添加评论（如果有）
    if issue["comments"] > 0:
        content += "\n\n## 评论\n"
        comments = get_comments(issue["number"])
        for comment in comments:
            content += f"\n**{comment['user']['login']}** ({comment['created_at']}):\n\n"
            content += comment["body"] + "\n"
    
    return content

def get_comments(issue_number):
    """获取 issue 的评论"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{ISSUES_REPO_NAME}/issues/{issue_number}/comments"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def check_file_exists(file_path):
    """检查文件是否已存在"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    response = requests.get(url, headers=headers)
    return response.status_code == 200

def create_or_update_file(file_path, content, issue_number):
    """创建或更新文件"""
    # 文件名格式: YYYY-MM-DD-issue-<number>.md
    message = f"Add/Update issue {issue_number} as blog post"
    
    # 检查文件是否存在以获取 SHA（更新时需要）
    sha = None
    if check_file_exists(file_path):
        url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path}"
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            sha = response.json().get("sha")
    
    # 准备 API 请求
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    data = {
        "message": message,
        "content": base64.b64encode(content.encode("utf-8")).decode("utf-8"),
        "branch": "main"
    }
    if sha:
        data["sha"] = sha
    
    response = requests.put(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()

def process_issues():
    """处理所有 issues"""
    issues = get_issues()
    for issue in issues:
        if "pull_request" in issue:  # 跳过 PR
            continue
            
        # 生成文件名
        create_date = datetime.strptime(issue["created_at"], "%Y-%m-%dT%H:%M:%SZ")
        file_name = f"{create_date.strftime('%Y-%m-%d')}-issue-{issue['number']}.md"
        file_path = f"{HEXO_POSTS_DIR}/{file_name}"
        
        # 转换为 Markdown
        md_content = issue_to_md(issue)
        
        # 提交到仓库
        try:
            create_or_update_file(file_path, md_content, issue["number"])
            print(f"Processed issue #{issue['number']} - {issue['title']}")
        except Exception as e:
            print(f"Failed to process issue #{issue['number']}: {str(e)}")

if __name__ == "__main__":
    if not GITHUB_TOKEN:
        raise ValueError("GitHub token not provided. Set GITHUB_TOKEN environment variable.")
    process_issues() 

```
## GitHub Actions 工作流配置

创建一个 `.github/workflows/sync_issues_to_posts.yml` 文件：


 ```
name: Sync Issues to Hexo Posts

on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 时间 00:00 运行
  issues:
    types: [opened, edited, reopened]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Hexo repo
      uses: actions/checkout@v2
      with:
        repository: ${{ github.repository_owner }}/your_hexo_repo
        token: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
        
    - name: Run sync script
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: |
        pip install requests
        python sync_issues.py
        
    - name: Commit and push changes
      run: |
        git config --global user.name "GitHub Actions"
        git config --global user.email "actions@github.com"
        git add .
        git commit -m "Automatically updated posts from issues"
        git push

```

## 设置说明

1. **GitHub Token**:
   - 创建一个有 repo 权限的 GitHub Personal Access Token
   - 在 Hexo 仓库的 Settings > Secrets 中添加名为 `GITHUB_TOKEN` 的 secret

2. **脚本配置**:
   - 修改脚本中的 `REPO_OWNER`, `REPO_NAME`, `ISSUES_REPO_NAME` 为你实际的仓库名
   - 确保 Hexo 仓库有 `source/_posts` 目录

3. **触发机制**:
   - 每天自动同步一次
   - 当有新的 issue 被创建、编辑或重新打开时也会触发

## 注意事项

1. 这个方案假设你的 Hexo 仓库和 issues 仓库在同一个 GitHub 账户下
2. 脚本会自动跳过 Pull Requests，只处理纯 issues
3. 每个 issue 会生成一个独立的 Markdown 文件，文件名包含日期和 issue 编号
4. 前置信息包含了 issue 的原始链接，方便追溯

这个方案完全在云端运行，不需要任何本地环境。

