//Get the canvas
var canvas = document.getElementById("canvas");
canvas.width = 700;
canvas.height = 600;
canvas.setAttribute('tabindex', 1);
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
function create_food(){
	food.x = Math.floor(Math.random() * ((canvas.width / cell_width) -1));
	food.y = Math.floor(Math.random() * ((canvas.height / cell_width) -1));

	//Evitar crear la manzana donde está la serpiente.
	for(i = 0; i++; i < snake.length){
		if(check_collision(food.x, food.y, snake[i].x, snake[i].y)){
			create_food();
		}
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

function paint_food(){	
	paint_cell(food.x, food.y, "#F02B49", "#333");
}

function paint_score(){	
	ctx.fillStyle = "#999";	
	ctx.font = "normal 10pt Calibri";	
	ctx.fillText("score: " + score, 10, canvas.height-10);
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

function change_direction(keycode){
	//No hacer nada si se intenta cambiar directamente a la dirección opuesta.
	if(keycode == 37 && direction != "right") direction_queue = "left";	
	else if(keycode == 38 && direction != "bottom") direction_queue = "top";
	else if (keycode == 39 && direction != "left") direction_queue = "right";
	else if(keycode == 40 && direction != "top") direction_queue = "bottom";
}

function check_collision(x1, y1, x2, y2){
	if(x1 == x2 && y1 == y2)
		return true;
	else return false;
}

//Game loop
function game(){
	ctx.beginPath();
	paint_background();
	paint_snake();
	paint_food();
	move_snake();
	paint_score();

	//Verificar si la serpiente se ha estrellado con la pared
	var head = snake[0];
	if(head.x < 0 || head.x == canvas.width / cell_width || head.y < 0 || head.y == canvas.height / cell_width){	
		newGame();
		return;
	}
	//No te comas a ti mismo
	for(i = 1; i < snake.length; i++){
		if(head.x == snake[i].x && head.y == snake[i].y){
			newGame();
			return;
		}
	}

	//Comer manzana
	if(check_collision(head.x, head.y, food.x, food.y)){
		score++;
		snake[snake.length] = {x: head.x, y: head.y};
		create_food();
		paint_food();
	}
}

function newGame(){
	direction = "right";
	direction_queue = "right";
	create_snake();
	create_food();

	canvas.onkeydown = function(evt) {
		evt = evt || window.event;
		change_direction(evt.keyCode);
	};

	if(typeof loop !== "undefined"){
		clearInterval(loop);
	}

	loop = setInterval(game, fps);
}

newGame();