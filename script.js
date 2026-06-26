// Page Change Function

function showPage(pageId){

document.querySelectorAll(".page")
.forEach(page=>{
    page.classList.remove("active");
});

document
.getElementById(pageId)
.classList.add("active");

window.scrollTo({
    top:0,
    behavior:"smooth"
});


}

// Floating Hearts

const heartContainer =
document.getElementById("hearts");

function createHeart(){


const heart =
document.createElement("div");

heart.classList.add("heart");

const emojis = [
    "💗",
    "💖",
    "🌸",
    "✨",
    "🩷"
];

heart.innerHTML =
emojis[
    Math.floor(
        Math.random()*emojis.length
    )
];

heart.style.left =
Math.random()*100 + "%";

heart.style.bottom = "-50px";

heart.style.fontSize =
(20 + Math.random()*25) + "px";

heartContainer.appendChild(heart);

setTimeout(()=>{
    heart.remove();
},8000);


}

setInterval(createHeart,700);

// Balloon Pop

document
.querySelectorAll(".balloon")
.forEach(balloon=>{


balloon.addEventListener(
"click",
()=>{

    balloon.innerHTML = "✨";

    balloon.style.transform =
    "scale(1.5)";

    balloon.style.opacity = "0";

});


});

const popSound = document.getElementById("popSound");

document.querySelectorAll(".balloon").forEach(balloon=>{

    balloon.addEventListener("click",()=>{

        popSound.currentTime = 0;
        popSound.play();

        balloon.style.transition=".3s";

        balloon.style.transform="scale(1.6)";

        balloon.style.opacity="0";

        setTimeout(()=>{
            balloon.remove();
        },300);

    });

});

// Gift Open

giftBox.addEventListener(
"click",
()=>{

    giftBox.innerHTML="💝";

    giftBox.style.transform=
    "scale(1.3)";

    giftText.style.display=
    "block";

});
document.addEventListener(
"click",
()=>{

    const music =
    document.getElementById(
        "bgMusic"
    );

    if(music){

        music.play()
        .catch(()=>{});

    }

},
{once:true});

document
.querySelectorAll(".candles span")
.forEach(candle=>{

    candle.addEventListener(
    "click",
    ()=>{

        candle.innerHTML = "🕯";

        candle.style.opacity = ".5";

    });

});

let blowCount = 0;

async function startMic(){

    const stream =
    await navigator.mediaDevices.getUserMedia({
        audio:true
    });

    const context =
    new AudioContext();

    const mic =
    context.createMediaStreamSource(stream);

    const analyser =
    context.createAnalyser();

    analyser.fftSize = 256;

    mic.connect(analyser);

    const data =
    new Uint8Array(
        analyser.frequencyBinCount
    );

    let lastBlow = 0;

    function detect(){

        analyser.getByteFrequencyData(data);

        let average = 0;

        for(let i=0;i<data.length;i++){

            average += data[i];

        }

        average /= data.length;

        const now = Date.now();

        if(
            average > 35 &&
            now-lastBlow>1500
        ){

            lastBlow = now;

            blowCount++;

            blowOneCandle();

        }

        requestAnimationFrame(
            detect
        );

    }

    detect();

}

function blowOneCandle(){

    const flames =
    document.querySelectorAll(
        ".flame:not(.out)"
    );

    if(!flames.length) return;

    const flame =
    flames[0];

    flame.classList.add("out");

    const smoke =
    document.createElement("div");

    smoke.className="smoke";

    flame.parentElement.appendChild(smoke);

    setTimeout(()=>{

        smoke.remove();

    },2500);

    if(
        document.querySelectorAll(
            ".flame:not(.out)"
        ).length===0
    ){

        setTimeout(()=>{

            wishAnimation();

        },800);

    }

}
startMic();

function launchCelebration(){

    startFireworks();

    for(let i=0;i<100;i++){

        const confetti =
        document.createElement("div");

        confetti.className="confetti";

        const items=[
            "🎉",
            "🎊",
            "💗",
            "🌸",
            "✨"
        ];

        confetti.innerHTML=
        items[Math.floor(
            Math.random()*items.length
        )];

        confetti.style.left=
        Math.random()*100+"vw";

        document.body.appendChild(
            confetti
        );

        setTimeout(()=>{
            confetti.remove();
        },4000);
    }

    alert(
        "🎉 Happy Birthday Habiba! 🎂💗"
    );
}

function startFireworks(){

    const canvas =
    document.getElementById(
        "fireworks"
    );

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    for(let i=0;i<30;i++){

        setTimeout(()=>{

            const x =
            Math.random()*
            canvas.width;

            const y =
            Math.random()*
            canvas.height/2;

            drawBurst(
                ctx,x,y
            );

        },i*300);

    }

}

function drawBurst(
ctx,x,y
){

    for(let i=0;i<40;i++){

        const angle =
        Math.random()*6.28;

        const length =
        50+Math.random()*80;

        ctx.beginPath();

        ctx.moveTo(x,y);

        ctx.lineTo(
            x+
            Math.cos(angle)
            *length,

            y+
            Math.sin(angle)
            *length
        );

        ctx.strokeStyle=
        `hsl(${
        Math.random()*360
        },100%,70%)`;

        ctx.stroke();

    }

}
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register(
            "service-worker.js"
        );

    });

}
document
.getElementById("startBlowing")
.addEventListener(
"click",
startMic
);

function wishAnimation(){

    const wish =
    document.getElementById(
        "wishMessage"
    );

    wish.classList.add("show");

    setTimeout(()=>{

        wish.classList.remove(
            "show"
        );

        launchCelebration();

    },2500);

}