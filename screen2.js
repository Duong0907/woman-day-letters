const messageQueue = [
  `Chúc các bạn nữ ngày 8/3 luôn xinh đẹp như hoa, rạng rỡ như nắng và ngọt ngào như mật. Happy Women's Day!!!!`,
  `Chúc tất cả chị em không chỉ có 1 ngày 8/3 mà mỗi ngày đều vui vẻ, trẻ trung, xinh đẹp nhé!`,
  `Chúc các chị/em có một ngày 8/3 thật ý nghĩa, được mọi người yêu thương, tiền đầy túi, tình đầy tim.
    Happy Women's Day`,
  `Văn thì em chẳng có đâu
    Thơ thì... một chút đôi câu gọi là
    
    "Hôm nay mùng tám tháng ba
    Là ngày gửi những lời ca đến người
    Gửi nửa thế giới xinh tươi
    Luôn luôn vui vẻ rạng ngời như hoa
    Yêu đời hát những khúc ca
    Nửa kia thế giới nghe là mê say
    Giấc mơ thì hãy cứ bay
    Bay cao cao vút đến ngày thành công
    Mong vạn điều ước chờ mong
    Sẽ sớm chẳng phải ngóng trông đợi chờ
    Thôi thì cứ mộng cứ mơ
    (Cho) nửa kia thế giới ngẩn ngơ ngắm nhìn."`,
    
  `Chúc mừng ngày của những người phụ nữ đáng quý! Mong bạn luôn được tràn đầy niềm vui, sức khỏe và thành công trong cuộc sống và sự nghiệp.`,
  `Chúc bạn ngày Quốc tế Phụ nữ thật vui vẻ và đầy ý nghĩa! Hãy tiếp tục truyền cảm hứng và là nguồn động viên cho mọi người xung quanh nhé.`,
  `Chúc các chị em thật vui vẻ và rạng rỡ trong ngày 8/3
    Chúc chị em ngày càng xinh đẹp, công việc thuận lợi và sớm đạt được điều mình muốn. 
    Về tình cảm, mình xin chúc cho chị em nào đang yêu sẽ ngày càng nồng thắm, ai đang có crush thì sớm được tỏ tình, còn không nữa thì sớm tìm được nửa kia.
    Happy Woman Day!`,
  `Mùng 8 - 3 không chúc các chị em cái gì, chỉ mong các chị em luôn độc lập - tự do - hạnh phúc. Độc lập thì đường hoàng, không phải dựa dẫm vào ai thì có tự do, mà có tự do, là có hạnh phúc.`,
  `Chúc chị em luôn xinh đẹp, tình đầy tim, tiền đầy túi`,
  `Chúc các chị em phụ nữ có một ngày 8/3 thật ý nghĩa và hạnh phúc bên gia đình và bạn bè của mình nhé.`,
  `Gửi lời chúc riêng đến các chị em bạn bè mãi tươi trẻ và nhiệt huyết <3`,
  `Chúc các bạn nữ một ngày 8/3 vui vẻ, luôn vui tươi, xinh đẹp và yêu đời như mọi ngày. Mặc kệ những lời đàm tiếu xung quanh, vì em đẹp nhất khi là chính em.`,
];

const LETTER_WIDTH = 60 * 1.51;
const LETTER_HEIGHT = 60;

const MAX_VY = 3;
const MIN_VY = 1.5;
const MAX_VX = 1;
const MIN_VX = -1;
const TIME_STEP = 800;
const RENDER_EACH_TIME = 1;
const MARGIN = 100;
const NUMBER_OF_VIDEO_LETTER = 5;
const LETTER_IMAGE = "./assets/letter1.svg";
const LETTER_VIDEO_IMAGE = "./assets/letter2.svg";
const VIDEO_ELEM = `
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/pPjaJRC8p9w?si=udMX1jz9b8tWQDdK"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
`;

const dialogElem = document.getElementById("dialog");
const dialogInner = document.getElementById("dialog-inner");
const dialogInnerMessage = document.querySelector("#dialog-inner .message");
const dialogInnerVideo = document.querySelector("#dialog-inner .video");

function moveFirstToEnd(array) {
  if (array.length > 0) {
    const firstElement = array.shift();
    array.push(firstElement);
  }
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Letter(type = "message", message, screenWidth, onClick) {
  this.type = type;
  this.message = message;
  this.vx = getRandomRange(MIN_VX, MAX_VX);
  this.vy = getRandomRange(MIN_VY, MAX_VY);
  this.x = getRandomRange(MARGIN, screenWidth - MARGIN);
  this.y = -LETTER_WIDTH;
  this.elem = (() => {
    const element = document.createElement("img");
    element.className = "letter";
    element.src = LETTER_IMAGE;
    if (type === "video") {
      element.classList.add("video");
      element.src = LETTER_VIDEO_IMAGE;
    }
    if (getRandomRange(-1, 1) > 0) {
      element.classList.add("rotate1");
    } else {
      element.classList.add("rotate2");
    }
    element.style.width = LETTER_WIDTH + "px";
    element.style.height = LETTER_HEIGHT + "px";
    element.style.left = this.x - LETTER_WIDTH / 2 + "px";
    element.style.top = this.y + "px";
    element.addEventListener("click", (e) => {
      dialogElem.classList.add("show");
      onClick();
    });
    return element;
  })();
}

setTimeout(() => {
  console.log(window.innerHeight, window.innerWidth);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenElem = document.getElementById("screen-2");
  screenElem.style.display = "block";
  const MESSAGES = [];
  const letterList = [];
  let letterQueue = [];
  for (let i = 1; i <= 100; i++) {
    MESSAGES.push(i);
  }
  for (let i = 0; i < NUMBER_OF_VIDEO_LETTER + MESSAGES.length; i++) {
    if (i % Math.round(MESSAGES.length / NUMBER_OF_VIDEO_LETTER) === 0) {
      letterQueue.push(
        new Letter("video", "", screenWidth, () => {
          dialogInner.classList.add("video");
          dialogInnerMessage.innerText = "";
          dialogInnerVideo.innerHTML = VIDEO_ELEM;
        })
      );
    } else {
      letterQueue.push(
        new Letter("message", "", screenWidth, () => {
          dialogInnerMessage.innerText = messageQueue[0];
          moveFirstToEnd(messageQueue);
          dialogInner.classList.remove("video");
          dialogInnerVideo.innerHTML = "";
        })
      );
    }
  }

  dialogInner.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  dialogElem.addEventListener("click", (e) => {
    e.target.classList.remove("show");
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

      letterList[i].elem.style.left = letterList[i].x - LETTER_WIDTH / 2 + "px";
      letterList[i].elem.style.top = letterList[i].y + "px";

      if (letterList[i].y > screenHeight + LETTER_HEIGHT) {
        willRemoveElemIndexs.push(i);
      }
    }

    for (let i = willRemoveElemIndexs.length - 1; i >= 0; i--) {
      screenElem.removeChild(letterList[willRemoveElemIndexs[i]].elem);
      letterList[willRemoveElemIndexs[i]].x = getRandomRange(
        MARGIN,
        screenWidth - MARGIN
      );
      letterList[willRemoveElemIndexs[i]].y = -LETTER_WIDTH;
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
}, 3000);
