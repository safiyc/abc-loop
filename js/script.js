let lastKeyCode;

window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);

    audio.currentTime = 0;

    console.log("keycode: " + e.keyCode);
    
    if (key.getAttribute("value") === "1" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", "sounds/b.mp3");
        audio.play();
        key.classList.add('pressed');
        key.setAttribute("value", "2");
        console.log(`lastKeyCode: ${lastKeyCode}`);

    } else if (key.getAttribute("value") === "2" && e.keyCode == lastKeyCode) {
        audio.setAttribute("src", "sounds/c.mp3");
        audio.play();
        key.classList.add('pressed');
        key.removeAttribute("value");
        console.log(`lastKeyCode: ${lastKeyCode}`);
    } else {
        audio.setAttribute("src", "sounds/a.mp3");
        audio.play();
        console.log("this key doesn't have a value yet.");
        lastKeyCode = e.keyCode;
        console.log(`lastKeyCode: ${lastKeyCode}`);
        key.setAttribute("value", "1");
        key.classList.add('pressed');
    }
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));