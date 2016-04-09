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

//Acciones del juego
function move_snake(){
	var x = snake[0].x;
	var y = snake[0].y;
	direction = direction_queue;

	if(direction == "right")x++;
	else if(direction == "left") x--;
	else if(direction == "top") y--;
	else if(direction == "bottom") y++;

	var tail = snake.pop();
	tail.x = x;
	tail.y = y;
	snake.unshift(tail);
}

//Game loop
function game(){
	ctx.beginPath();
	paint_background();
	paint_snake();
	move_snake();

	//Verificar si la serpiente se ha estrellado con la pared
	var head = snake[0];
	if(head.x < 0 || head.x == canvas.width / cell_width || head.y < 0 || head.y == canvas.height / cell_width){	
		newGame();
		return;
	}
}

function newGame(){
	direction = "right";
	direction_queue = "right";
	create_snake();
		
	if(typeof loop !== "undefined"){
		clearInterval(loop);
	}

	loop = setInterval(game, fps);
}

newGame();