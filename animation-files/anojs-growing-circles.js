// calixo888

let canvasDiv = document.querySelector("#anojs-growing-circles");

canvasDiv.innerHTML += "<canvas id='anojs-growing-circles-canvas'></canvas>";

let canvas = document.querySelector("#anojs-growing-circles-canvas");

canvas.style.width = '100%';
canvas.style.height = '100%';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener("resize", () => {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
});

var x = 700;
var y = 300;
var dx = 10;
var dy = 10;
var radius = 30;

function Circle(x, y, dx, dy, radius, colorIndex) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.origRadius = radius;
    this.colorIndex = colorIndex;

    this.draw = function() {
        c.fillStyle = customColors[this.colorIndex];
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100 && this.radius < 50) {
            this.radius += 2;
        } else if (this.radius > this.origRadius) {
            this.radius -= 2;
        }

        this.draw();
    }
}

var circle = new Circle(x, y, dx, dy, radius);

var customColors = ["ANOJS_COLOR_1", "ANOJS_COLOR_2", "ANOJS_COLOR_3"];

var circles = [];

for (var i = 0; i < 500; i++) {
    var x = Math.random() * window.innerWidth + radius;
    var y = Math.random() * window.innerHeight + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var radius = (Math.random() * 5) + 5;
    var colorIndex = Math.floor(Math.random() * customColors.length);

    circles.push(new Circle(x, y, dx, dy, radius, colorIndex));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (circle of circles) {
        circle.update();
    }
}

animate();
