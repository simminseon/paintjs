const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');

const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = 'black'
ctx.lineWidth = 2.5;

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
	ctx.strokeStyle = color;
}

function handleRangeClick(e) {
	ctx.lineWidth = range.value;
}

function handleModeClick(e) {
	if(filling === true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
		ctx.fillStyle = ctx.strokeStyle;
	}

}

function handleCanvasClick(e) {
	if(filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function onMouseMove(e) {
	const x = e.offsetX;
	const y = e.offsetY;

	if(!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMouseDown(e) {
	painting = true;
}

function onMouseUp(e) {
	painting = false;
}

if(canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach(function(color) {
	color.addEventListener('click', handleColorClick);
})

if(range) {
	range.addEventListener('click', handleRangeClick);
}
if(mode) {
	mode.addEventListener('click', handleModeClick);
}
