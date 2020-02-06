'use strict';

let text = document.querySelector('.description');
let clear_btn = document.querySelector('#js-clear');
let download_btn = document.querySelector('#js-download');
let canvas = document.querySelector('#canvas');
let content = canvas.getContext('2d');
let x_last = 0;
let y_last = 0;
let hue = 0;
let is_drawing = false;
let direction = true;



function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    content.lineCap = 'round';
    content.lineJoin = 'round';
    content.lineWidth = 10;
    text.classList.remove('is-hidden');
}

function drawing(e) {
    if (!is_drawing) return;

    text.classList.add('is-hidden');

    content.beginPath();
    content.moveTo(x_last, y_last);
    content.lineTo(e.offsetX, e.offsetY);
    content.stroke();

    // Change stroke color
    var _ref = [e.offsetX, e.offsetY];
    x_last = _ref[0];
    y_last = _ref[1];

    // Change line width
    if (content.lineWidth > 20 || content.lineWidth < 5) {
        direction = !direction;
    }
    if (direction) {
        content.lineWidth++;
    } else {
        content.lineWidth--;
    }
}

function toBlue() {
    content.strokeStyle = '#001eff';
}

function toRed() {
    content.strokeStyle = '#FF0000';
}

function toGreen() {
    content.strokeStyle = '#00FF00';
}

function toYellow() {
    content.strokeStyle = '#FFFF00';
}

function toOrange() {
    content.strokeStyle = '#FFAA33';
}



function clearBoard(e) {
    e.preventDefault();
    content.clearRect(0, 0, canvas.width, canvas.height);
    content.beginPath();
    text.classList.remove('is-hidden');
}

function downloadImage() {
    download_btn.href = canvas.toDataURL();
    download_btn.download = 'canvas-image.png';
}

canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mousedown', function (e) {
    is_drawing = true;
    var _ref2 = [e.offsetX, e.offsetY];
    x_last = _ref2[0];
    y_last = _ref2[1];
});
canvas.addEventListener('mouseup', function () {
    is_drawing = false;
});
canvas.addEventListener('mouseout', function () {
    is_drawing = false;
});
clear_btn.addEventListener('click', clearBoard);
download_btn.addEventListener('click', downloadImage);
window.addEventListener('resize', initializeCanvas);

initializeCanvas();