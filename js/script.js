// A simple way to wrap code from possible issues with global variables/functions of future code
// Warning - Below method prevents outside code from accessing code in this scope
// Look at 'module pattern' for better namespacing approach
// (function() {
    const img = document.querySelector("img");
    const keys = document.querySelectorAll(".block");
    const word = document.querySelector(".word");
    const songBtn = document.querySelector(".play-icon");
    const song = document.querySelector("audio[id='song']");

    let lastKeyCode;

    // Run this when .block is keyed down
    // Loop thru 4 levels of a letter; ex: "a", "apple", "ant", "airplane"
    // Loop resets to lev1 when different letter is pressed
    function abcLoop(e) {
        const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
        const key = document.querySelector(`.block[data-keycode="${e.keyCode}"]`);

        // stop abc song when a btn is pressed
        stopSong();

        img.style.top = "30%";
        img.classList.add("rotate-img");
        key.classList.add("pressed");

        // confirms value of key in loop
        // file naming conventions: sound-> a1, a2, a3; img -> b1, b2, b3
        if (key.getAttribute("value") == "1" && e.keyCode == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[e.keyCode]}2.m4a`);
            img.setAttribute("src", `img/abc/${letters[e.keyCode]}2.png`);
            key.setAttribute("value", "2");
            word.textContent = arrABC[(e.keyCode - 65)][1];
        } else if (key.getAttribute("value") == "2" && e.keyCode == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[e.keyCode]}3.m4a`);
            img.setAttribute("src", `img/abc/${letters[e.keyCode]}3.png`);
            key.setAttribute("value", "3");
            word.textContent = arrABC[(e.keyCode - 65)][2];
        } else if (key.getAttribute("value") == "3" && e.keyCode == lastKeyCode) {
            audio.setAttribute("src", `sounds/${letters[e.keyCode]}4.m4a`);
            img.setAttribute("src", `img/abc/${letters[e.keyCode]}4.png`);
            key.setAttribute("value", "4");
            word.textContent = arrABC[(e.keyCode - 65)][3];
        } else {
            audio.setAttribute("src", `sounds/a-to-z/${letters[e.keyCode]}.m4a`);
            img.setAttribute("src", `img/abc/${letters[e.keyCode]}1.png`);
            lastKeyCode = e.keyCode;
            key.setAttribute("value", "1");
            word.textContent = arrABC[(e.keyCode - 65)][0];
        }

        audio.currentTime = 0;
        audio.play();
    }

    // Click on abc letters, instead of event keydown
    for (let i = 0; i <= 25; i++) {
        keys[i].addEventListener("click", function () {
            let ltr = i + 65;  // 65 => 'a'
            const audio = document.querySelector(`audio[data-keycode="${ltr}"]`);

            // stop abc song when other btns pressed
            stopSong();

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

            audio.currentTime = 0;
            audio.play();
            img.style.top = "30%";
            img.classList.add("rotate-img");
            keys[i].classList.add("pressed");
        });
    }

    // Remove class "rotate-img"
    function removeImgRotate() {
        img.classList.remove("rotate-img");
    }

    // Remove class "pressed"
    function removeKeyPressed(e) {
        if (e.propertyName !== "transform") return;
        this.classList.remove("pressed");  // 'this' => keys
    }

    // After transition animations end, run functions to remove classes
    img.addEventListener("transitionend", removeImgRotate);
    keys.forEach(key => key.addEventListener("transitionend", removeKeyPressed));

    // Keydown events
    // '16' => shift key; 8' => backspace key; '187' => equals key; '37' & '39' => left, right keys
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
        } else if (e.keyCode == 37 || e.keyCode == 39) {   // issue: when 37||39 keyed, truck is effected at every position
            moveTruck();
        } else if (65 <= e.keyCode && e.keyCode <= 90) {
            abcLoop(e);
        }   else {
            return;
        }
    });

    // Click to play abc song
    songBtn.addEventListener("click", function () {
        if (song.currentTime > 0) {
            stopSong();
        } else {
            playSong();
        }
    });

    // Var declared to set and clear time interval
    let songImgTimer;

    function playSong() {
        songImgSync();
        word.textContent = "ABC Song";
        img.classList.remove("rotate-img");
        img.classList.add("music-note");
        song.setAttribute("src", "sounds/abc-song.mp3");
        songBtn.style.backgroundImage = "url('img/icon-stop.png')";
        song.play();   
    }

    function stopSong() {
        songBtn.style.backgroundImage = "url('img/icon-play.png')";
        song.pause();
        song.currentTime = 0;
        clearInterval(songImgTimer);
        img.classList.remove("music-note");
        img.style.top = "100%";
    }

    // Execute when song ends
    song.onended = function () {
        console.log("song ended");
        stopSong();

        // sound and img gone, then 'ABC Song' gone
        setTimeout(function () {
            word.textContent = "";
        }, 250);
    }

    // To sync img to sound; still needs more work
    function songImgSync() {
        let songCurrentTime = 0;
        let j = 0;

        // 'ontimeupdate' grabs currentTime info to help with img/sound sync
        song.ontimeupdate = function () {
            songTime();
        };

        function songTime() {
            songCurrentTime = song.currentTime;
            // console.log(songCurrentTime);
            return songCurrentTime;
        }

        songImgTimer = setInterval(function () {
            // set to start at .1 to help with syncing issue
            if (songCurrentTime > .1) {
                // remove img after abc image 'z'
                if (j > 25) {
                    clearInterval(songImgTimer);
                    console.log("hey, stop here");
                    img.setAttribute("src", "img/music-note.png");
                } else {
                    img.setAttribute("src", `img/abc/${letters[65 + j]}1.png`);
                    img.style.top = "30%";
                    console.warn("j: " + j);
                    console.log("cT: " + songCurrentTime);
                    console.log("letter: " + letters[65 + j]);
                    j++;
                }
            }
        }, 600);
    }

    // Click to switch casing of letters
    const casingBtn = document.querySelector(".casing-icon");
    casingBtn.addEventListener("click", function () {
        switchCase();
    });

    // Run this when keydown/click of casingBtn
    function switchCase() {
        for (let i = 0; i <= 25; i++) {
            let text = keys[i].textContent;
            if (text == text.toUpperCase()) {
                console.log("now lowercase");
                keys[i].textContent = text.toLowerCase();
            } else {
                console.log("now uppercase");
                keys[i].textContent = text.toUpperCase();
            }
        }
    }

    // Truck moves left or right
    const truck = document.querySelector(".truck");
    function moveTruck () {
        if (truck.getAttribute("value") == "1") {
            truck.style.right = "65%";

            setTimeout(function () {
                truck.classList.add("truck-flip");
            }, 1100);

            truck.setAttribute("value", "2");
        } else {
            truck.style.right = "10%";

            setTimeout(function () {
                truck.classList.remove("truck-flip");
            }, 1100);

            truck.setAttribute("value", "1");
        }
    }

    // Click to move truck left or right
    truck.addEventListener("click", function () {
        moveTruck();
    });

    // Window view toggles between scenery and black bg
    const viewIcon = document.querySelector(".view-icon");
    const outside = document.querySelector(".outside");
    viewIcon.addEventListener("click", function () {
        if (outside.style.background !== "black") {
            outside.style.background = "black";
            img.style.border = "5px dotted white";
        } else {
            outside.style.backgroundRepeat = "no-repeat";
            outside.style.backgroundSize = "cover";
            outside.style.backgroundImage = "url('img/window_view.jpg')";
            img.style.border = "5px dotted black";
        }
    });

    // Get current year
    let date = new Date();
    document.getElementById("copyright").textContent = date.getFullYear();

    // Hacky way to fix screen heights?
    // Hide logo 'ABCLoop' to keep content intact within short height devices
    if (screen.height <= 640) {
        const window = document.querySelector(".window");
        const title = document.querySelector(".title_sec");
        const floor = document.querySelector(".floor");

        window.style.marginTop = "0";
        title.style.display = "none";
        floor.style.height = "calc(100% - 550px)";
    }
    //  Increase margin-top of title and height of wall, so floor takes up less screen space
    if (screen.height >= 800) {
        const wall = document.querySelector(".wall");
        const title = document.querySelector(".title_sec");
        
        wall.style.height = "950px";
        title.style.marginTop = "40px";
        title.style.marginBottom = "50px";
    }

    // Click to refresh page to see onload animations; to fix keydown issue: letter stuck pressed
    const refresh = document.querySelector(".refresh-icon");
    refresh.addEventListener("click", function () {
        window.location.reload();
    });

    // IIFE - curtains open after x time of page load
    (function() {
        setTimeout(function () {
            const left = document.querySelector(".curtain-left");
            const right = document.querySelector(".curtain-right");
            
            left.classList.add("open");
            right.classList.add("open");
        }, 500);
    })();
// })();