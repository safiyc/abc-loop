const img = document.querySelector("img");
const keys = document.querySelectorAll('.key');
const word = document.querySelector('.word');

let lastKeyCode;

// Run this when .key is keydown
// Loop thru 4 levels of a letter; ex: "a", "apple", "ant", "airplane"
// Loop resets to lev1 when different letter is pressed
function abcLoop(e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);

    // confirms value of key in loop
    // file naming conventions: sound-> a1, a2, a3; img -> b1, b2, b3
    if (key.getAttribute("value") == "1" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}2.m4a`);
        img.setAttribute("src", `img/abc/${letters[e.keyCode]}2.png`);
        key.setAttribute("value", "2");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);

        word.textContent = arrABC[(e.keyCode - 65)][1];
    } else if (key.getAttribute("value") == "2" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}3.m4a`);
        img.setAttribute("src", `img/abc/${letters[e.keyCode]}3.png`);
        key.setAttribute("value", "3");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);

        word.textContent = arrABC[(e.keyCode - 65)][2];
    } else if (key.getAttribute("value") == "3" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}4.m4a`);
        img.setAttribute("src", `img/abc/${letters[e.keyCode]}4.png`);
        key.setAttribute("value", "4");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);

        word.textContent = arrABC[(e.keyCode - 65)][3];
    } else {
        audio.setAttribute("src", `sounds/a-to-z/${letters[e.keyCode]}.m4a`);
        img.setAttribute("src", `img/abc/${letters[e.keyCode]}1.png`);
        lastKeyCode = e.keyCode;
        key.setAttribute("value", "1");
        console.log("letter: " + letters[e.keyCode]);
        console.log(`lastKeyCode: ${lastKeyCode}`);
        console.log("this key is now assigned value: " + key.getAttribute("value"));

        word.textContent = arrABC[(e.keyCode - 65)][0];
    }
    console.log("keycode: " + e.keyCode);

    audio.play();
    img.style.top = "30%";
    img.classList.add('rotate-img');
    key.classList.add('pressed');
    audio.currentTime = 0;
}

// Remove class 'pressed'
function removeKeyPressed(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');  // 'this' => keys
}

// Remove class 'rotate-img'
function removeImgRotate(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove('rotate-img');  // 'this' => img
}

//  Hide logo 'ABCLoop' to keep content intact within short height devices
if (screen.height <= 640) {
    const window = document.querySelector(".window");
    const title = document.querySelector(".title_sec");

    window.style.marginTop = "10px";
    title.style.display = "none";
}

// Keydown event
// '16' = shift key; 8' = backspace key; '187' = equals key
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 16) {
        switchCase();
    } else if (e.keyCode == 8) {
        window.location.reload();
    } else if (e.keyCode == 187) {
        if (song.currentTime > 0) {
            stopSong();
        } else {
            playSong();
        }
    } else {
        abcLoop(e);
    }
});

// code works, but needs serious refactor
// Click on letters, instead of event keydown
for (let i = 0; i <= 25; i++) {
    keys[i].addEventListener('click', function () {
        let ltr = i + 65;
        const audio = document.querySelector(`audio[data-keycode="${ltr}"]`);

        // confirms value of key in loop
        // file naming conventions: sound-> a1, a2, a3; img -> b1, b2, b3
        if (keys[i].getAttribute("value") == "1" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}2.m4a`);
            img.setAttribute("src", `img/abc/${letters[ltr]}2.png`);
            keys[i].setAttribute("value", "2");

            word.textContent = arrABC[(i)][1];
        } else if (keys[i].getAttribute("value") == "2" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}3.m4a`);
            img.setAttribute("src", `img/abc/${letters[ltr]}3.png`);
            keys[i].setAttribute("value", "3");

            word.textContent = arrABC[(i)][2];
        } else if (keys[i].getAttribute("value") == "3" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}4.m4a`);
            img.setAttribute("src", `img/abc/${letters[ltr]}4.png`);
            keys[i].setAttribute("value", "4");

            word.textContent = arrABC[(i)][3];
        } else {
            audio.setAttribute("src", `sounds/a-to-z/${letters[ltr]}.m4a`);
            img.setAttribute("src", `img/abc/${letters[ltr]}1.png`);
            lastKeyCode = ltr;
            keys[i].setAttribute("value", "1");

            word.textContent = arrABC[(i)][0];
        }

        audio.play();
        img.style.top = "30%";
        img.classList.add('rotate-img');
        keys[i].classList.add('pressed');
        audio.currentTime = 0;
    });
}

// After transition animations end, run functions to remove classes
img.addEventListener('transitionend', removeImgRotate);
keys.forEach(key => key.addEventListener('transitionend', removeKeyPressed));

// Get current year
let date = new Date();
document.getElementById("copyright").textContent = date.getFullYear();

const casingBtn = document.querySelector(".casing-icon");
// Click to switch casing of letters
casingBtn.addEventListener("click", function () {
    switchCase();
});

// Run this when keydown/click of casingBtn
function switchCase () {
    for (let i = 0; i <= 25; i++) {
        let text = keys[i].textContent;
        if (text == text.toUpperCase()) {
            console.log("now lower case");
            keys[i].textContent = text.toLowerCase();
        } else {
            console.log("now upper case");
            keys[i].textContent = text.toUpperCase();
        }
    }
}

const songBtn = document.querySelector(".play-icon");
const song = document.querySelector('audio[name="song"');
// Click to play abc song
songBtn.addEventListener("click", function () {
    if (song.currentTime > 0) {
        stopSong();
    } else {
        playSong();
    }
});

function playSong() {
    song.setAttribute("src", "sounds/abc-song.mp3");
    songBtn.style.backgroundImage = "url('img/icon-stop.png')";
    song.play();
}

function stopSong() {
    songBtn.style.backgroundImage = "url('img/icon-play.png')";
    song.pause();
    song.currentTime = 0;
}

const refresh = document.querySelector(".refresh-icon");
// Click to refresh page to see onload animations; to fix keydown issue: letter stuck pressed
refresh.addEventListener("click", function () {
    window.location.reload();
});