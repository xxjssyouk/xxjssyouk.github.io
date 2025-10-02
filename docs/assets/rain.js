
const rainstyle = document.createElement('style');
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
const raincontent = document.createElement('div');
raincontent.classList.add('raincontent');
const rainBox = document.createElement('div');
rainBox.id = 'rainBox';
raincontent.appendChild(rainBox);
document.body.appendChild(raincontent);

// 获取rainBox元素
const box = document.getElementById('rainBox');

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
    const rain = document.createElement('div');

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
    const timer = setInterval(() => {
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
