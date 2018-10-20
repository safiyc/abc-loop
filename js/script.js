let lastKeyCode;
let letters = {65: "a", 66: "b", 67: "c"};

window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);
    const img = document.querySelector("img");

    audio.currentTime = 0;

    console.log("keycode: " + e.keyCode);
    
    // 4 levels, ex: "A", "Apple", "Ant", "Airplane"
    if (key.getAttribute("value") == "1" && e.keyCode == lastKeyCode) {
        // file naming conventions: a1sound, a2sound, a3sound, b1img, b2img, b3img
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}2sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}2.jpg`);
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.setAttribute("value", "2");
        console.log(`lastKeyCode: ${lastKeyCode}`);

    } else if (key.getAttribute("value") == "2" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}3sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}3.jpg`);
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.removeAttribute("value");
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else if (key.getAttribute("value") == "3" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}4sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}4.jpg`);
        img.classList.add('rotate-img');
        key.classList.add('pressed');
        key.removeAttribute("value");
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else {
        console.log("letter: " + letters[e.keyCode]);
        audio.setAttribute("src", `sounds/${letters[e.keyCode]}1sound.mp3`);
        audio.play();
        img.setAttribute("src", `img/${letters[e.keyCode]}1.jpg`);
        img.classList.add('rotate-img');
        console.log("this key doesn't have a value yet.");
        lastKeyCode = e.keyCode;
        console.log(`lastKeyCode: ${lastKeyCode}`);
        key.setAttribute("value", "1");
        key.classList.add('pressed');
    }
});

window.addEventListener('keyup', function (e) {
    const img = document.querySelector("img");

    img.classList.remove('rotate-img');
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));