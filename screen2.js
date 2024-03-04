const LETTER_WIDTH = 60;
const LETTER_HEIGHT = 40;

const MAX_VY = 3;
const MIN_VY = 1.5;
const MAX_VX = 1;
const MIN_VX = -1;
const TIME_STEP = 1000;
const RENDER_EACH_TIME = 2;
const MARGIN = 100;
const NUMBER_OF_VIDEO_LETTER = 5;
const LETTER_IMAGE = '';
const VIDEO_ELEM = `
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=0JaMNcjJGxnZWW2U"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
`;

const dialogElem = document.getElementById('dialog');
const dialogInner = document.getElementById('dialog-inner');
const dialogInnerMessage = document.querySelector('#dialog-inner .message');
const dialogInnerVideo = document.querySelector('#dialog-inner .video');

function moveFirstToEnd(array) {
    if (array.length > 0) {
        const firstElement = array.shift();
        array.push(firstElement);
    }
}

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function Letter(type = 'message', message, screenWidth, onClick) {
    this.type = type;
    this.message = message;
    this.vx = getRandomRange(MIN_VX, MAX_VX);
    this.vy = getRandomRange(MIN_VY, MAX_VY);
    this.x = getRandomRange(MARGIN, screenWidth - MARGIN);
    this.y = -30;
    this.elem = (() => {
        const element = document.createElement('div');
        element.className = 'letter';
        if (type === 'video') {
            element.classList.add('video');
        }
        if (getRandomRange(-1, 1) > 0) {
            element.classList.add('rotate1');
        } else {
            element.classList.add('rotate2');
        }
        element.style.width = LETTER_WIDTH + 'px';
        element.style.height = LETTER_HEIGHT + 'px';
        element.style.left = this.x - LETTER_WIDTH / 2 + 'px';
        element.style.top = this.y + 'px';
        element.addEventListener('click', (e) => {
            dialogElem.classList.add('show');
            onClick();
        });
        return element;
    })();
}

window.onload = () => {
    console.log(window.innerHeight, window.innerWidth);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenElem = document.getElementById('screen-2');
    const MESSAGES = [];
    const letterList = [];
    let letterQueue = [];
    for (let i = 1; i <= 100; i++) {
        MESSAGES.push(i);
    }
    for (let i = 0; i < NUMBER_OF_VIDEO_LETTER + MESSAGES.length; i++) {
        if (i % Math.round(MESSAGES.length / NUMBER_OF_VIDEO_LETTER) === 0) {
            letterQueue.push(
                new Letter('video', '', screenWidth, () => {
                    dialogInner.classList.add('video');
                    dialogInnerMessage.innerText = '';
                    dialogInnerVideo.innerHTML = VIDEO_ELEM;
                })
            );
        } else {
            letterQueue.push(
                new Letter('message', '', screenWidth, () => {
                    dialogInnerMessage.innerText = 'MESSAGE';
                    dialogInner.classList.remove('video');
                    dialogInnerVideo.innerHTML = '';
                })
            );
        }
    }

    dialogInner.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    dialogElem.addEventListener('click', (e) => {
        e.target.classList.remove('show');
    });

    let previousTimeStamp;
    let timeCount = 0;

    function run(timeStamp) {
        if (previousTimeStamp === undefined) {
            previousTimeStamp = timeStamp;
        }
        const deltaTime = timeStamp - previousTimeStamp;
        timeCount += deltaTime;

        const willRemoveElemIndexs = [];
        for (let i = 0; i < letterList.length; i++) {
            letterList[i].x += letterList[i].vx;
            letterList[i].y += letterList[i].vy;

            letterList[i].elem.style.left =
                letterList[i].x - LETTER_WIDTH / 2 + 'px';
            letterList[i].elem.style.top = letterList[i].y + 'px';

            if (letterList[i].y > screenHeight) {
                willRemoveElemIndexs.push(i);
            }
        }

        for (let i = willRemoveElemIndexs.length - 1; i >= 0; i--) {
            screenElem.removeChild(letterList[willRemoveElemIndexs[i]].elem);
            letterList[willRemoveElemIndexs[i]].x = getRandomRange(
                MARGIN,
                screenWidth - MARGIN
            );
            letterList[willRemoveElemIndexs[i]].y = -30;
            letterList.splice(willRemoveElemIndexs[i], 1);
        }

        if (timeCount > TIME_STEP) {
            for (i = 0; i < RENDER_EACH_TIME; i++) {
                const letter = letterQueue[0];
                letterList.push(letter);
                screenElem.appendChild(letter.elem);
                moveFirstToEnd(letterQueue);
            }

            timeCount = 0;
        }
        previousTimeStamp = timeStamp;

        window.requestAnimationFrame(run);
    }
    window.requestAnimationFrame(run);
};
