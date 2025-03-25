不用配置本机环境，直接一键部署 Hexo 到 Vecrcel  

仓库地址：<https://github.com/EvanNotFound/vercel-hexo-template>

部署很快，但是默认主题，如果想要改变主题就比较麻烦。

如果无法直接上传文件夹到 Vercel 或 GitHub 仓库（例如在线编辑界面仅支持单文件上传），可以通过以下方法解决：

---

### **方法 1：手动逐文件创建（适合小主题）**
1. **在 Vercel/GitHub 仓库中创建主题文件夹**  
   - 进入你的项目仓库 → 进入 `themes/` 目录  
   - 点击 **"Add file" → "Create new file"**  
   - 输入路径：`themes/主题名/文件名`（例如 `themes/next/_config.yml`）  
   - 粘贴主题文件内容 → 提交  

2. **重复操作**  
   对主题的所有文件逐个创建（需保持与原主题相同的目录结构）。

---

### **方法 2：ZIP 解压工具（推荐）**  
如果仓库支持在线终端（如 GitHub Codespaces 或 GitPod）：  
1. 上传主题的 ZIP 压缩包到仓库根目录  
2. 通过终端命令解压并移动：  
   ```bash
   unzip 主题包.zip -d themes/主题名  # 解压到指定目录
   rm 主题包.zip                     # 删除压缩包
   ```
   *注：Vercel 本身无在线终端，需通过关联的 GitHub 仓库操作。*

---

### **方法 3：临时启用本地环境（最稳妥）**  
即使没有 Git，也可临时操作：  
1. **下载仓库 ZIP**  
   - 在 GitHub 仓库点击 **"Code" → "Download ZIP"**  
2. **本地修改后重新上传**  
   - 解压 ZIP → 手动替换 `themes/` 下的主题文件夹  
   - 重新压缩为 ZIP → 通过 Vercel 或 GitHub 的 **"Upload files"** 覆盖原有文件  

---

### **方法 4：直接修改 CDN 引用（极简方案）**  
如果主题支持 CDN 加载（部分主题如 `hexo-theme-fluid`）：  
1. 在 `_config.yml` 中指定主题名：  
   ```yaml
   theme: fluid  # 主题名称
   ```
2. 在 Hexo 配置中添加 CDN 依赖（无需本地主题文件）：  
   ```yaml
   # _config.yml 中添加
   js_provider:
     fluid: https://cdn.jsdelivr.net/gh/fluid-dev/hexo-theme-fluid@latest/
   ```

---

### **关键注意事项**
1. **保持目录结构一致**：主题的配置文件（如 `_config.yml`）和静态文件（如 `layout/`）需放在正确路径。  
2. **检查依赖**：部分主题需要额外插件，需在 `package.json` 中补充（可通过 Vercel 的在线编辑添加）。  
3. **触发重新部署**：文件更新后，Vercel 会自动部署，若无更新可手动在控制台点击 **"Redeploy"**。

---

### **替代建议**
如果操作复杂，推荐使用 **无需文件夹的主题**（如 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 的 CDN 模式），或改用 Vercel 的 **Serverless Functions** 动态生成主题配置。

