//Get the canvas
var canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext("2d");

//Game variables
var fps = 1000 / 20;
var cell_width = 10;
var food = {x: 0, y: 0};
var snake = [];
var length = 5;
var direction = 'right';
var direction_queue = 'right';
var score = 0;

//Dibujar en el canvas
function paint_background(){
	ctx.fillStyle = "#333";	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}