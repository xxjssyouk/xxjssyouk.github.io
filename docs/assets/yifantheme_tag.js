let style = document.createElement("style");
style.innerHTML = `

/* header布局*/

.title-right {
    align-items: flex-end;
}

@media (max-width: 600px) {
    .tagTitle {
        display: unset;
        font-size: 14px;
        white-space: unset;
    }
}


/* 背景图片 */
html {
    background: url('https://img.liyifan.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
    background-size: cover;
}

/* 主体布局 */
body {
    margin: 30px auto;
    padding: 20px;
    font-size: 16px;
    font-family: sans-serif;
    line-height: 1.25;
    background: rgba(255, 255, 255, 0.8); /* 白色背景，透明度80% */
    border-radius: 10px; /* 圆角边框 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
    overflow: auto;
}

.SideNav {
    background: rgba(255, 255, 255, 0.6); /* 白色背景，透明度60% */
    border-radius: 10px; /* 圆角边框 */
    min-width: unset;
}

.SideNav-item:hover {
    background-color: #c3e4e3;
    border-radius: 10px;
    transform: scale(1.02);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.SideNav-item {
    transition: 0.5s;
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

.subnav-search-input {
    border-radius: 2em;
    float: unset !important;
}

.subnav-search-icon {
    top: 9px;
}

button.btn.float-left {
    display: none;
}

.subnav-search {
    width: unset; 
    height: 36px;
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

// 搜索框回车触发
let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
let button = document.getElementsByClassName("btn float-left")[0];
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        button.click();
    }
});
