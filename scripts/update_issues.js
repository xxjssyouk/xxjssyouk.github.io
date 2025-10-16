const fs = require('fs');
const axios = require('axios');

async function updateReadmeWithIssues() {
  try {
    const repo = process.env.REPO;
    const token = process.env.GITHUB_TOKEN;

    if (!repo || !token) {
      throw new Error('Missing required environment variables: REPO or GITHUB_TOKEN');
    }

    console.log('Fetching issues from repository:', repo);
    
    const response = await axios.get(
      `https://api.github.com/repos/${repo}/issues?state=open`,
      {
        headers: { 
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    console.log('Found', response.data.length, 'open issues');

    // 过滤掉 pull requests
    const issues = response.data.filter(item => !item.pull_request);
    
    let issuesContent = '';
    if (issues.length > 0) {
      issuesContent = issues.map(issue => 
        `- [#${issue.number}](${issue.html_url}) ${issue.title}`
      ).join('\n');
    } else {
      issuesContent = 'No open issues at the moment.';
    }

    let readme = fs.readFileSync('README.md', 'utf8');

    // 更新 README 中的 issues 部分
    const updatedReadme = readme.replace(
      /<!-- ISSUES-START -->[\s\S]*?<!-- ISSUES-END -->/,
      `<!-- ISSUES-START -->\n${issuesContent}\n<!-- ISSUES-END -->`
    );

    fs.writeFileSync('README.md', updatedReadme);
    console.log('README.md updated successfully with', issues.length, 'issues');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

updateReadmeWithIssues();
