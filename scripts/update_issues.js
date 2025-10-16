const fs = require('fs');
const axios = require('axios');

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY; // 格式：owner/repo

(async () => {
  try {
    // 获取 open issues
    const res = await axios.get(`https://api.github.com/repos/${repo}/issues?state=open`, {
      headers: { Authorization: `token ${token}` }
    });

    const issues = res.data.map(issue => `- [#${issue.number}](${issue.html_url}) ${issue.title}`).join('\n');

    // 读取 README
    let readme = fs.readFileSync('README.md', 'utf8');

    // 替换 <!-- ISSUES-START --> 到 <!-- ISSUES-END --> 之间的内容
    const newReadme = readme.replace(
      /<!-- ISSUES-START -->[\s\S]*<!-- ISSUES-END -->/,
      `<!-- ISSUES-START -->\n${issues}\n<!-- ISSUES-END -->`
    );

    fs.writeFileSync('README.md', newReadme);
    console.log('README.md updated with latest issues.');
  } catch (err) {
    console.error(err);
  }
})();
