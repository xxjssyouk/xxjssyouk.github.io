document.addEventListener('DOMContentLoaded', function() {
    

    //下雨-------------------------------------------------------------------------------------------

    let rainstyle = document.createElement('style');
    rainstyle.type = 'text/css';
    rainstyle.innerHTML = `
        * {
            padding: 0;
            margin: 0;
        }
        .raincontent {
            width: 100%;
            height: 100%;
        }
        #rainBox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
        }
        .rain {
            position: absolute;
            width: 2px;
            height: 50px;
            background: linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,.6));
        }
    `;
    document.head.appendChild(rainstyle);

    // 创建结构
    let raincontent = document.createElement('div');
    raincontent.classList.add('raincontent');
    let rainBox = document.createElement('div');
    rainBox.id = 'rainBox';
    raincontent.appendChild(rainBox);
    document.body.appendChild(raincontent);

    // 获取rainBox元素
    let box = document.getElementById('rainBox');

    // 定义box的高度和宽度
    let boxHeight = box.clientHeight;
    let boxWidth = box.clientWidth;

    // 窗口加载时更新box的高度和宽度
    window.onload = function () {
        boxHeight = box.clientHeight;
        boxWidth = box.clientWidth;
    };

    // 窗口大小变化时更新box的高度和宽度
    window.onresize = function () {
        boxHeight = box.clientHeight;
        boxWidth = box.clientWidth;
    };

    // 每隔50毫秒添加一个新的雨点
    setInterval(() => {
        // 创建一个新的div元素表示雨点
        let rain = document.createElement('div');

        // 添加类名'rain'到雨点元素
        rain.classList.add('rain');

        // 设置雨点的初始位置
        rain.style.top = '0px';
        rain.style.left = Math.random() * boxWidth + 'px';

        // 设置雨点的随机透明度
        rain.style.opacity = Math.random();

        // 将雨点元素添加到rainBox中
        box.appendChild(rain);

        // 每隔20毫秒更新雨点的位置，使其下落
        let race = 1;
        let timer = setInterval(() => {
            // 如果雨点到达底部，则清除定时器并移除雨点
            if (parseInt(rain.style.top) > boxHeight) {
                clearInterval(timer);
                box.removeChild(rain);
            }
            // 增加雨点的下落速度
            race++;
            rain.style.top = parseInt(rain.style.top) + race + 'px';
        }, 20);
    }, 50);





    //判断url，添加主题------------------------------------------------------------------------


    let currentUrl = window.location.pathname;

    if (currentUrl.includes('/index.html') || currentUrl === "/") {

        console.log('应用主页主题');


        //主页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .title-right {
            margin: unset;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }
        
        /* 背景图片 */
        html {
            background: url('https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
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
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
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



    
    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('应用文章页主题');


        //文章页主题------------------------------------------------------------------------------

        let style = document.createElement("style");
        style.innerHTML = `


        /* 背景图片 */
        html {
            background: url('https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
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
            background: rgba(255, 255, 255, 0.85);
            border-radius: 10px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgb(141 150 161 / 20%);
        }

        video {
            border-radius: 10px;
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





    } else if (currentUrl.includes('/tag.html')) {
        console.log('应用搜索页主题');

        // 搜索页主题--------------------------------------------------------------------
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
            background: url('https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
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
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });

    



    } else {
        console.log('未应用主题');
    }











})
