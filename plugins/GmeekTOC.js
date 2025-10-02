function createTOC() {
    const contentContainer = document.getElementById('content');
    if (!contentContainer) {
        console.warn('未找到 #content 容器');
        return;
    }
    
    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;
    
    // 创建TOC容器
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    
    // 添加标题
    const title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = '文章目录';
    tocElement.appendChild(title);
    
    // 创建目录项
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\u4e00-\u9fa5-]/g, '')
                .toLowerCase();
        }
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = `toc-link toc-${heading.tagName.toLowerCase()}`;
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 12}px`;
        
        // 添加点击事件（可选）
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
        });
        
        tocElement.appendChild(link);
    });
    
    // 添加返回顶部按钮
    const backToTop = document.createElement('a');
    backToTop.className = 'toc-end';
    backToTop.textContent = '返回顶部';
    backTo
