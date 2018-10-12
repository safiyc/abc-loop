window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-keycode="${e.keyCode}"]`);

    audio.currentTime = 0;

    if (key.getAttribute("value") === "1") {
        audio.setAttribute("src", "sounds/b.mp3");
        audio.play();
        key.classList.add('pressed');
        key.setAttribute("value", "2");

    } else if (key.getAttribute("value") === "2") {
        audio.setAttribute("src", "sounds/c.mp3");
        audio.play();
        key.classList.add('pressed');
        key.removeAttribute("value");
    } else {
        console.log("this key doesn't have a value yet.");
        audio.setAttribute("src", "sounds/a.mp3");
        key.setAttribute("value", "1");
        audio.play();
        key.classList.add('pressed');
    }
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));