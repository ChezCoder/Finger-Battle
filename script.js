"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Presetup
let canvas;
let ctx;
let pregameCanvasRunner;
let score = 50;
let scoreIncrement = 5;
let enable = false;
let introed = false;
let pregame = {
    pos: [0, 0],
    vel: [0, 0],
    angle: Math.random() * 360,
    angleVariance: .5,
    SPEED: 5
};
function preLoop() {
    let nextpos = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextpos[0] = pregame.pos[0];
    nextpos[1] = pregame.pos[1];
    pregame.vel[0] = Math.cos(pregame.angle) * pregame.SPEED;
    pregame.vel[1] = Math.sin(pregame.angle) * pregame.SPEED;
    nextpos[0] += pregame.vel[0];
    nextpos[1] += pregame.vel[1];
    if ((nextpos[0] <= 0) || (nextpos[0] >= canvas.width)) {
        pregame.pos[0] *= -1;
    }
    pregame.angle = Math.atan2(pregame.pos[0], pregame.pos[1]) * (180 / Math.PI);
    pregame.pos = nextpos;
    // ctx.beginPath();
    // ctx.arc(pregame.pos[0], pregame.pos[1], 5, 0, Math.PI * 2);
    // ctx.fillStyle = "black";
    // ctx.fill();
    pregame.angle += Math.random() * (pregame.angleVariance * 2) - pregame.angleVariance;
}
function gameInit() {
    return __awaiter(this, void 0, void 0, function* () {
        clearInterval(pregameCanvasRunner);
        score = 50;
        document.body.style.backgroundPosition = `${score}% 100%`;
        yield (function () {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(function (resolve) {
                    return __awaiter(this, void 0, void 0, function* () {
                        document.getElementById("player1").setAttribute("disabled", "");
                        document.getElementById("player2").setAttribute("disabled", "");
                        document.getElementById("player1").blur();
                        document.getElementById("player2").blur();
                        if (!introed) {
                            yield wait(1000);
                            doScreenAlert("", 2000, document.getElementById("player1").value + " your button is Q");
                            yield wait(2000);
                            doScreenAlert("", 2000, document.getElementById("player2").value + " your button is P");
                            yield wait(1000);
                            introed = true;
                        }
                        yield wait(1000);
                        doScreenAlert("3...");
                        yield wait(1000);
                        doScreenAlert("2...");
                        yield wait(1000);
                        doScreenAlert("1...");
                        yield wait(1000);
                        enable = true;
                        doScreenAlert("GO!");
                        resolve(null);
                    });
                });
            });
        }());
    });
}
function wait(millis) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, millis);
    });
}
function calculateWin() {
    let messages = [
        [
            "TOO EZ",
            "GG",
            "L",
            "CRACKED",
            "POG",
            "VICTORY!",
            "IMMORTAL",
            "BON"
        ],
        [
            "Hey {loser}, did you try getting good?",
            "Well played, {loser}.",
            "{winner} pressed F to pay respects for {loser}.",
            "{loser} was so close yet so far...",
            "Pretty pog {loser}, BUT NOT POG ENOUGH",
            "{loser} took a fat L to {winner}",
            "{loser} WAS NOT EVEN CLOSE BABYYY",
            "{winner} does not take Ls.",
            "EZ DUBS, {winner}"
        ],
    ];
    let loser, winner;
    if (score !== 0 && score !== 100)
        return;
    if (score == 0) {
        loser = document.getElementById("player2").value;
        winner = document.getElementById("player1").value;
    }
    else if (score == 100) {
        loser = document.getElementById("player1").value;
        winner = document.getElementById("player2").value;
    }
    doScreenAlert(messages[0][Math.floor(Math.random() * messages[0].length)].replace("{loser}", loser).replace("{winner}", winner), 3000, messages[1][Math.floor(Math.random() * messages[1].length)].replace("{loser}", loser).replace("{winner}", winner));
    enable = false;
    setTimeout(function () {
        domInit();
        document.getElementById("player1").removeAttribute("disabled");
        document.getElementById("player2").removeAttribute("disabled");
    }, 4000);
}
function updateBlue() {
    if (!enable)
        return;
    score += scoreIncrement;
    document.body.style.backgroundPosition = `${score}% 100%`;
    calculateWin();
}
function updateRed() {
    if (!enable)
        return;
    score -= scoreIncrement;
    document.body.style.backgroundPosition = `${score}% 100%`;
    calculateWin();
}
function doScreenAlert(message, delay = 1000, submessage = "") {
    document.getElementById("alerts").textContent = message;
    document.getElementById("details").textContent = submessage;
    document.getElementById("alerts").style.opacity = "1";
    document.getElementById("details").style.opacity = "1";
    setTimeout(function () {
        document.getElementById("alerts").style.opacity = "0";
        document.getElementById("details").style.opacity = "0";
    }, delay - 500);
}
// DOM
function domInit() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    canvas = document.getElementById("game");
    score = 50;
    document.body.style.backgroundPosition = `${score}% 100%`;
    setTimeout(function () {
        document.getElementsByClassName("game-info")[0].style.transition = "opacity 2s";
        document.getElementsByClassName("game-info")[0].style.opacity = "1";
    }, 5000);
    document.getElementsByTagName("header")[0].style.opacity = "1";
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx = canvas.getContext("2d");
    pregame.pos = [Math.random() * canvas.width, Math.random() * canvas.height];
    (_a = document.getElementById("player1")) === null || _a === void 0 ? void 0 : _a.removeAttribute("init");
    (_b = document.getElementById("player1")) === null || _b === void 0 ? void 0 : _b.removeAttribute("ready");
    (_c = document.getElementById("player2")) === null || _c === void 0 ? void 0 : _c.removeAttribute("init");
    (_d = document.getElementById("player2")) === null || _d === void 0 ? void 0 : _d.removeAttribute("ready");
    (_e = document.getElementsByClassName("title")[0]) === null || _e === void 0 ? void 0 : _e.removeAttribute("init");
    (_f = document.getElementsByClassName("title")[0]) === null || _f === void 0 ? void 0 : _f.removeAttribute("ready");
    document.getElementsByClassName("title")[0];
    (_g = document.getElementById("ready")) === null || _g === void 0 ? void 0 : _g.removeAttribute("ready");
    (_h = document.getElementById("ready")) === null || _h === void 0 ? void 0 : _h.setAttribute("init", "");
    document.getElementById("alerts").style.transition = "opacity 0.5s";
    document.getElementById("details").style.transition = "opacity 0.5s";
    document.body.style.transition = "background-position 0.1s";
    setTimeout(function () {
        var _a;
        (_a = document.getElementById("player1")) === null || _a === void 0 ? void 0 : _a.setAttribute("init", "");
    }, 1000);
    setTimeout(function () {
        var _a;
        (_a = document.getElementById("player2")) === null || _a === void 0 ? void 0 : _a.setAttribute("init", "");
    }, 1500);
    setTimeout(function () {
        var _a;
        (_a = document.getElementsByClassName("title")[0]) === null || _a === void 0 ? void 0 : _a.setAttribute("init", "");
    }, 2000);
    setTimeout(function () {
        var _a;
        (_a = document.getElementById("ready")) === null || _a === void 0 ? void 0 : _a.removeAttribute("init");
    }, 4000);
    pregameCanvasRunner = setInterval(function () {
        preLoop();
    }, 16.33);
}
(_a = document.getElementById("ready")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var _a, _b, _c, _d, _e, _f, _g;
    document.getElementsByTagName("header")[0].style.opacity = "0";
    (_a = document.getElementsByClassName("title")[0]) === null || _a === void 0 ? void 0 : _a.removeAttribute("init");
    (_b = document.getElementsByClassName("title")[0]) === null || _b === void 0 ? void 0 : _b.setAttribute("ready", "");
    (_c = document.getElementById("ready")) === null || _c === void 0 ? void 0 : _c.setAttribute("ready", "");
    (_d = document.getElementById("player1")) === null || _d === void 0 ? void 0 : _d.removeAttribute("init");
    (_e = document.getElementById("player1")) === null || _e === void 0 ? void 0 : _e.setAttribute("ready", "");
    (_f = document.getElementById("player2")) === null || _f === void 0 ? void 0 : _f.removeAttribute("init");
    (_g = document.getElementById("player2")) === null || _g === void 0 ? void 0 : _g.setAttribute("ready", "");
    setTimeout(function () {
        gameInit();
    }, 3000);
});
window.addEventListener("load", function () {
    domInit();
    document.body.addEventListener("keypress", function (e) {
        if (e.key.toLowerCase() == "p")
            updateBlue();
        if (e.key.toLowerCase() == "q")
            updateRed();
    });
    document.body.addEventListener("mouseup", function (e) {
        if (e.clientX < ((1 - score / 100) * canvas.width))
            updateRed();
        else
            updateBlue();
    });
    setInterval(function () {
        window.scrollTo(0, 0);
        if ((document.getElementById("player1").value == "") || (document.getElementById("player2").value == "")) {
            document.getElementById("ready").setAttribute("disabled", "");
        }
        else {
            document.getElementById("ready").removeAttribute("disabled");
        }
    });
});
