let style = document.createElement("style");
style.innerHTML = `

/* header布局*/


/* 背景图片 */
html {
    background: url('https://img.liyifan.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
    background-size: cover;
}

/* 主体布局 */
body {
    min-width: 200px;
    max-width: 1100px;
    margin: 30px auto;
    font-size: 16px;
    font-family: sans-serif;
    line-height: 1.25;
    background: rgba(255, 255, 255, 0.85); /* 白色背景，透明度85% */
    border-radius: 10px; /* 圆角边框 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
    overflow: auto;
}

@media (min-width: 1001px) {
  body {
    padding: 45px;
  }
}

@media (max-width: 1000px) {
  body {
    padding: 20px;
  }
}


/* markdown内容 */
.markdown-body img {
    border-radius: 10px;
    border: 2px solid #a3e0e4;
}

.markdown-alert {
    border-radius: 10px;
}

.markdown-body .highlight pre, .markdown-body pre {
    background-color: white;
}

.markdown-body code, .markdown-body tt {
    background-color: rgb(141 150 161 / 20%);
}

/* 右上角按钮 */
div.title-right .btn {
    display: inline-flex;
    align-items: center;
    width: auto;
    height: 40px;
    margin: 0 3px;
    border-radius: 2em !important;
    transition: 0.3s;
}

div.title-right .btn:hover {
    width: auto;
    border-radius: 2em !important;
    background-color: #3cd2cd;
}

div.title-right .btn .btndescription {
    display: none;
    margin-left: 3px;
    white-space: nowrap;
    color: black;
    font-weight: bold;
}

div.title-right .btn:hover .btndescription {
    display: inline;
}

`;
document.head.appendChild(style);

//右上角按钮描述
let topright_buttons = document.querySelectorAll(".title-right a.btn");

topright_buttons.forEach(button => {
    var title = button.getAttribute('title');
    if (title) {
        var btndescription = document.createElement('span');
        btndescription.className = 'btndescription';
        btndescription.textContent = title;
        button.appendChild(btndescription);
    }
});
