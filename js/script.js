const img = document.querySelector("img");
const keys = document.querySelectorAll('.key');
// 'letters' for file naming purpose to get correct letter for keycode
const letters = {
    65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j",
    75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t",
    85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z"
};
let lastKeyCode;

// Run this when key is pressed
function abcLoop(e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);

    // confirms value of key in loop
    // file naming conventions: sound-> a1sound, a2sound, a3sound; img -> b1, b2, b3
    if (key.getAttribute("value") == "1" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}2sound.mp3`);
        img.setAttribute("src", `img/${letters[e.keyCode]}2.jpg`);
        key.setAttribute("value", "2");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else if (key.getAttribute("value") == "2" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}3sound.mp3`);
        img.setAttribute("src", `img/${letters[e.keyCode]}3.jpg`);
        key.setAttribute("value", "3");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else if (key.getAttribute("value") == "3" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}4sound.mp3`);
        img.setAttribute("src", `img/${letters[e.keyCode]}4.jpg`);
        key.setAttribute("value", "4");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}1sound.mp3`);
        img.setAttribute("src", `img/${letters[e.keyCode]}1.jpg`);
        lastKeyCode = e.keyCode;
        key.setAttribute("value", "1");
        console.log("letter: " + letters[e.keyCode]);
        console.log(`lastKeyCode: ${lastKeyCode}`);
        console.log("this key is now assigned value: " + key.getAttribute("value"));
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

//  Hide logo 'ABCLoop' to keep content intact within short device's height
if (screen.height <= 640) {
    const window = document.querySelector(".window");
    const title = document.querySelector(".title_sec");

    window.style.marginTop = "10px";
    title.style.display = "none";
}

// Keydown loops thru 4 levels of key; ex: "a", "apple", "ant", "airplane"
// Loop resets to lev1 when different key is pressed
window.addEventListener('keydown', function (e) {
    abcLoop(e);
});

// code works, but needs serious refactor
// Click on letters, instead of event keydown
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function () {
        let ltr = i + 65;
        const audio = document.querySelector(`audio[data-keycode="${ltr}"]`);
        const key = document.querySelector(`.key[data-keycode="${ltr}"]`);

        // confirms value of key in loop
        // file naming conventions: sound-> a1sound, a2sound, a3sound; img -> b1, b2, b3
        if (keys[i].getAttribute("value") == "1" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}2sound.mp3`);
            img.setAttribute("src", `img/${letters[ltr]}2.jpg`);
            keys[i].setAttribute("value", "2");
        } else if (keys[i].getAttribute("value") == "2" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}3sound.mp3`);
            img.setAttribute("src", `img/${letters[ltr]}3.jpg`);
            keys[i].setAttribute("value", "3");
        } else if (keys[i].getAttribute("value") == "3" && ltr == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[ltr]}4sound.mp3`);
            img.setAttribute("src", `img/${letters[ltr]}4.jpg`);
            keys[i].setAttribute("value", "4");
        } else {
            audio.setAttribute("src", `sounds/${letters[ltr]}1sound.mp3`);
            img.setAttribute("src", `img/${letters[ltr]}1.jpg`);
            lastKeyCode = ltr;
            keys[i].setAttribute("value", "1");
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