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

//Creando nuestra protagonista
function create_snake(){
	snake = [];
	for(i = length - 1; i >= 0; i--){
		snake.push({x: i, y:0});
	}
}

//Dibujar en el canvas
function paint_background(){
	ctx.fillStyle = "#333";	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paint_cell(x, y, fill, stroke){
	ctx.fillStyle = fill;
	ctx.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);

	//Añadir un borde si fue definido
	if(typeof stroke !== "undefined"){
		ctx.strokeStyle = stroke;
		ctx.strokeRect(x*cell_width, y*cell_width, cell_width, cell_width);	
	}
}

function paint_snake(){
	for(i = 0; i < snake.length; i++){
		paint_cell(snake[i].x, snake[i].y, "#999", "#333");	
	}
}