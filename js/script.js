const img = document.querySelector("img");
const keys = document.querySelectorAll('.key');
const letters = {
    65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j",
    75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t",
    85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z"
};
let lastKeyCode;

// Keydown loops thru 4 levels of key; ex: "a", "apple", "ant", "airplane"
// Loop resets to lev1 when different key pressed
window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);

    if (key.getAttribute("value") == "1" && e.keyCode == lastKeyCode) {
        // file naming conventions: a1sound, a2sound, a3sound, b1, b2, b3
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}2sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}2.jpg`);
        img.style.top = "30%";
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.setAttribute("value", "2");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else if (key.getAttribute("value") == "2" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}3sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}3.jpg`);
        img.style.top = "30%";
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.setAttribute("value", "3");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else if (key.getAttribute("value") == "3" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}4sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}4.jpg`);
        img.style.top = "30%";
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.setAttribute("value", "4");
        console.log("value: " + key.getAttribute("value"));
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}1sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}1.jpg`);
        img.style.top = "30%";
        img.classList.add('rotate-img');
        lastKeyCode = e.keyCode;
        key.setAttribute("value", "1");
        key.classList.add('pressed');
        console.log("letter: " + letters[e.keyCode]);
        console.log(`lastKeyCode: ${lastKeyCode}`);
        console.log("this key is now assigned value: " + key.getAttribute("value"));
    }

    console.log("keycode: " + e.keyCode);
    audio.currentTime = 0;
});

// remove class 'pressed'
function removeKeyPressed(e) {
    if (e.propertyName !== 'transform') return;
    // 'this' => keys
    this.classList.remove('pressed');
}

// remove class 'rotate-img' and reset img's top position to 100%
function removeImgRotate(e) {
    if (e.propertyName !== "transform")
        return;
    // 'this' => img
    this.classList.remove('rotate-img');
    // this.style.top = "100%";
}

// Hide title_sec "ABCLoop" if height less than 640px
if (screen.height <= 640) {
    const title = document.querySelector(".title_sec");
    const window = document.querySelector(".window");
    title.style.display = "none";
    window.style.marginTop = "20px";
}

// After transition animations end, run functions to remove classes
img.addEventListener('transitionend', removeImgRotate);
keys.forEach(key => key.addEventListener('transitionend', removeKeyPressed));