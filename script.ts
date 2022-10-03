// Presetup
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let pregameCanvasRunner: number;

let score: number = 50;
let scoreIncrement: number = 5;

let enable = false;

let introed = false;

let pregame = {
    pos: [0, 0],
    vel: [0, 0],
    angle: Math.random() * 360,
    angleVariance: .5,
    SPEED: 5
}

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

async function gameInit() {
    
    clearInterval(pregameCanvasRunner);
    score = 50;
    document.body.style.backgroundPosition = `${score}% 100%`;
    
    await (async function() {
        return new Promise(async function(resolve) {
            document.getElementById("player1").setAttribute("disabled", "");
            document.getElementById("player2").setAttribute("disabled", "");
            document.getElementById("player1").blur();
            document.getElementById("player2").blur();

            if (!introed) {
                await wait(1000);
                doScreenAlert("", 2000, (document.getElementById("player1") as HTMLInputElement).value + " your button is Q");
                await wait(2000);
                doScreenAlert("", 2000, (document.getElementById("player2") as HTMLInputElement).value + " your button is P");
                await wait(1000);
                introed = true;
            }

            await wait(1000);
            doScreenAlert("3...")
            await wait(1000);
            doScreenAlert("2...")
            await wait(1000);
            doScreenAlert("1...");
            await wait(1000);
            enable = true;
            doScreenAlert("GO!");
            resolve(null);
        });
    }());
}

function wait(millis: number) {
    return new Promise(function(resolve) {
        setTimeout(function() {
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
    ]

    let loser: string, winner: string;

    if (score !== 0 && score !== 100) return;

    if (score == 0) {
        loser = (document.getElementById("player2") as HTMLInputElement).value;
        winner = (document.getElementById("player1") as HTMLInputElement).value;
    } else if (score == 100) {
        loser = (document.getElementById("player1") as HTMLInputElement).value;
        winner = (document.getElementById("player2") as HTMLInputElement).value;
    }

    doScreenAlert(messages[0][Math.floor(Math.random() * messages[0].length)].replace("{loser}", loser).replace("{winner}", winner), 3000, messages[1][Math.floor(Math.random() * messages[1].length)].replace("{loser}", loser).replace("{winner}", winner));
    enable = false;
    
    setTimeout(function() {
        domInit();
        document.getElementById("player1").removeAttribute("disabled");
        document.getElementById("player2").removeAttribute("disabled");
    }, 4000);
}

function updateBlue() {
    if (!enable) return;
    score += scoreIncrement;
    document.body.style.backgroundPosition = `${score}% 100%`;

    calculateWin();
}

function updateRed() {
    if (!enable) return;
    score -= scoreIncrement;
    document.body.style.backgroundPosition = `${score}% 100%`;

    calculateWin();
}

function doScreenAlert(message: string, delay: number = 1000, submessage: string = "") {
    document.getElementById("alerts").textContent = message;
    document.getElementById("details").textContent = submessage;
    document.getElementById("alerts").style.opacity = "1";
    document.getElementById("details").style.opacity = "1";
    setTimeout(function() {
        document.getElementById("alerts").style.opacity = "0";
        document.getElementById("details").style.opacity = "0";
    }, delay - 500);
}

// DOM
function domInit() {
    canvas = document.getElementById("game") as HTMLCanvasElement;

    score = 50;

    document.body.style.backgroundPosition = `${score}% 100%`;

    setTimeout(function() {
        (document.getElementsByClassName("game-info")[0] as HTMLDivElement).style.transition = "opacity 2s";
        (document.getElementsByClassName("game-info")[0] as HTMLDivElement).style.opacity = "1";
    }, 5000);

    document.getElementsByTagName("header")[0].style.opacity = "1";

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    ctx = canvas.getContext("2d");

    pregame.pos = [Math.random() * canvas.width, Math.random() * canvas.height];

    document.getElementById("player1")?.removeAttribute("init");
    document.getElementById("player1")?.removeAttribute("ready");

    document.getElementById("player2")?.removeAttribute("init");
    document.getElementById("player2")?.removeAttribute("ready");

    document.getElementsByClassName("title")[0]?.removeAttribute("init");
    document.getElementsByClassName("title")[0]?.removeAttribute("ready");
    document.getElementsByClassName("title")[0]

    document.getElementById("ready")?.removeAttribute("ready");
    document.getElementById("ready")?.setAttribute("init", "");

    document.getElementById("alerts").style.transition = "opacity 0.5s";
    document.getElementById("details").style.transition = "opacity 0.5s";

    document.body.style.transition = "background-position 0.1s";
    
    setTimeout(function() {
        document.getElementById("player1")?.setAttribute("init", "");
    }, 1000);

    setTimeout(function() {
        document.getElementById("player2")?.setAttribute("init", "");
    }, 1500);

    setTimeout(function() {
        document.getElementsByClassName("title")[0]?.setAttribute("init", "");
    }, 2000);
    
    setTimeout(function() {
        document.getElementById("ready")?.removeAttribute("init");
    }, 4000);

    pregameCanvasRunner = setInterval(function() {
        preLoop();
    }, 16.33);

}

document.getElementById("ready")?.addEventListener("click", function() {
    document.getElementsByTagName("header")[0].style.opacity = "0";

    document.getElementsByClassName("title")[0]?.removeAttribute("init");
    document.getElementsByClassName("title")[0]?.setAttribute("ready", "");
    
    document.getElementById("ready")?.setAttribute("ready", "");
    
    document.getElementById("player1")?.removeAttribute("init");
    document.getElementById("player1")?.setAttribute("ready", "");
    
    document.getElementById("player2")?.removeAttribute("init");
    document.getElementById("player2")?.setAttribute("ready", "");
    
    setTimeout(function() {
        gameInit();
    }, 3000);
});

window.addEventListener("load", function() {
    domInit();
    document.body.addEventListener("keypress", function(e) {
        if (e.key.toLowerCase() == "p")
            updateBlue();
            
        if (e.key.toLowerCase() == "q")
            updateRed();
    });
        
    document.body.addEventListener("mouseup", function(e) {
        if (e.clientX < ((1 - score / 100) * canvas.width))
            updateRed();
        else
            updateBlue();
    });

    setInterval(function() {
        window.scrollTo(0, 0);

        if (((document.getElementById("player1") as HTMLInputElement).value == "") || ((document.getElementById("player2") as HTMLInputElement).value == "")) {
            document.getElementById("ready").setAttribute("disabled", "");
        } else {
            document.getElementById("ready").removeAttribute("disabled");
        }
    });
});