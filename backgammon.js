/*GLOBAL VARIABLES*/
var game;

var debug = true;

/*
 * color is the color of the piece
 */
function Piece(color)
{
	this.color = color;
}

function Game()
{
	this.pieceSelected = null;

	this.board = initBoard();
	this.drawBoard = drawBoard;
}

function initBoard()
{
	var board = [];
	board.length = 24;

	for(var i = 0; i < 24; i++)
	{
		board[i] = [];
		if(i == 0)
			for(var j = 0; j < 2; j++)
				board[i].push(new Piece("black"));

		if(i == 5)
			for(var j = 0; j < 5; j++)
				board[i].push(new Piece("red"));

		if(i == 7)
			for(var j = 0; j < 3; j++)
				board[i].push(new Piece("red"));

		if(i == 11)
			for(var j = 0; j < 5; j++)
				board[i].push(new Piece("black"));

		if(i == 12)
			for(var j = 0; j < 5; j++)
				board[i].push(new Piece("red"));

		if(i == 16)
			for(var j = 0; j < 3; j++)
				board[i].push(new Piece("black"));

		if(i == 18)
			for(var j = 0; j < 5; j++)
				board[i].push(new Piece("black"));

		if(i == 23)
			for(var j = 0; j < 2; j++)
				board[i].push(new Piece("red"));
	}	

	return board;
}

function getPoint(x, y)
{
	var quadPoint; //point within a quadrant that was clicked
	var point; //the position on the board (0-23)

	if(y < yBottomQuadrants/2) //top of the board
	{
		if(x < xRightQuadrants) //left side
		{
			quadPoint = Math.floor(x / pointWidth);
			point = 12 + quadPoint;
		}
		else //right side
		{
			quadPoint = Math.floor((x - xRightQuadrants) /pointWidth);
			point = 18 + quadPoint;
		}
	}
	else //bottom of the board
	{
		if(x < xRightQuadrants) //left side
		{
			quadPoint = Math.floor(x / pointWidth);
			point = 11 - quadPoint;
		}
		else //right side
		{
			quadPoint = Math.floor((x - xRightQuadrants) /pointWidth);
			point = 5 - quadPoint;
		}
	}

	if(debug)
	{
		var console = document.getElementById("console");
		console.innerHTML = console.innerHTML + "<br>Point Clicked: " + point;
	}

	return point;
}

function board_clicked(e)
{
	var point = getPoint(e.clientX, e.clientY);

	if(game.pieceSelected === null && game.board[point].length > 0) //TODO: Check that player owns that piece
	{
		game.pieceSelected = point;

		if(debug)
		{
			var console = document.getElementById("console");
			console.innerHTML = console.innerHTML + "<br>" + game.pieceSelected + " selected";
		}

	}
	else
	{
		game.board[point].push(game.board[game.pieceSelected].pop());

		if(debug)
		{
			var console = document.getElementById("console");
			console.innerHTML = console.innerHTML + "<br>Piece moved from " + game.pieceSelected + " to " + point;
			console.innerHTML = console.innerHTML + "<br>Num pieces on point: " + game.board[point].length;
		}

		game.pieceSelected = null;
		game.drawBoard();
	}
}

function btnRoll_clicked(e)
{
	var die1 = Math.floor(Math.random() * 6 + 1);
	var die2 = Math.floor(Math.random() * 6 + 1);
	document.getElementById("divRollResults").innerHTML = die1 + ", " + die2;
}

function init()
{
	game = new Game();
	game.drawBoard();

	document.getElementById("board").addEventListener('click', board_clicked);
	document.getElementById("btnRoll").addEventListener('click', btnRoll_clicked)
}