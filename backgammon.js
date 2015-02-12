/*GLOBAL VARIABLES*/
var Game;
var debug = true;

/* State Machine for a game of backgammon*/
GameState = {
	RollToStart: "Waiting for initial roll",
	P1Move: "Player 1's move",
	P2Move: "Player 2's move",
	GameOver: "Game has ended"
}

/*
 * color is the color of the piece
 */
function Piece(color, point)
{
	this.color = color;
	this.point = point;
}

/*
 * name is the player name
 * place is either "1" or "2", depending on which player is being initialized
 * player 1 has their home board on the right
 * player 2 has their home board on the left
 * pieces is an array with one point on the board per number. each point has a list of individual
 *		pieces currently on it.
 */
function Player(name, place)
{
	this.Name = name;

	//initialize the 2d board array that will contain this player's pieces
	var pieces = [];
	pieces.length = 26;
	for(i = 0; i < 26; i++)
		pieces[i] = [];

	//create the initial set of pieces and starting points based on which player is being created
	if(place === 1)
	{
		for(var i = 0; i < 5; i++)
			pieces[6].push(new Piece("black"));
		for(var i = 0; i < 3; i++)
			pieces[8].push(new Piece("black"));
		for(var i = 0; i < 5; i++)
			pieces[13].push(new Piece("black"));
		for(var i = 0; i < 2; i++)
			pieces[24].push(new Piece("black"));
	}

	else if(place === 2)
	{
		for(var i = 0; i < 5; i++)
				pieces[19].push(new Piece("red"));
		for(var i = 0; i < 3; i++)
			pieces[17].push(new Piece("red"));
		for(var i = 0; i < 5; i++)
			pieces[12].push(new Piece("red"));
		for(var i = 0; i < 2; i++)
			pieces[1].push(new Piece("red"));
	}

	else if(debug)
	{
		log("Failed to create player: " + name + ", " + place);
	}

	//save pieces to this player
	this.Pieces = pieces;
}

function Game()
{
	//this.pieceSelected = null; //should obsolete
	this.State = GameState.RollToStart;
	this.Player1 = new Player("Player 1", 1);
	this.Player2 = new Player("Player 2", 2);

	this.drawBoard = drawBoard;
	this.drawPieces = drawPieces;
	this.move = move;
}

//TODO: Next step. Needs to define move states and how a player goes from getting a roll to executing.
function move(die1, die2)
{
	var Move = new Move(die1, die2);
	
}

function getPoint(x, y)
{
	var quadPoint; //point within a quadrant that was clicked
	var point; //the position on the board (0-25)

	if(y < yBottomQuadrants/2) //top of the board
	{
		if(x < xRightQuadrants) //left side
		{
			quadPoint = Math.floor(x / pointWidth);
			point = 13 + quadPoint;
		}
		else //right side
		{
			quadPoint = Math.floor((x - xRightQuadrants) /pointWidth);
			point = 19 + quadPoint;
		}
	}
	else //bottom of the board
	{
		if(x < xRightQuadrants) //left side
		{
			quadPoint = Math.floor(x / pointWidth);
			point = 12 - quadPoint;
		}
		else //right side
		{
			quadPoint = Math.floor((x - xRightQuadrants) /pointWidth);
			point = 6 - quadPoint;
		}
	}

	if(debug)
	{
		log("Point Clicked: " + point);
	}

	return point;
}

//need to update this function to conform to new model
function board_clicked(e)
{
	var point = getPoint(e.clientX, e.clientY);

	if(game.pieceSelected === null && game.board[point].length > 0) //TODO: Check that player owns that piece
	{
		game.pieceSelected = point;

		if(debug)
		{
			log(game.pieceSelected + " selected");
		}

	}
	else
	{
		game.board[point].push(game.board[game.pieceSelected].pop());

		if(debug)
		{
			log("Piece moved from " + game.pieceSelected + " to " + point);
			log("Num pieces on point: " + game.board[point].length);
		}

		game.pieceSelected = null;
		game.drawBoard();
	}
}

function btnRoll_clicked(e)
{
	if(Game.State === GameState.GameOver)
		return;

	var die1 = Math.floor(Math.random() * 6 + 1);
	var die2 = Math.floor(Math.random() * 6 + 1);
	log("Roll Results:" + die1 + ", " + die2);

	if(Game.State === GameState.RollToStart)
	{
		if (die1 > die2)
			Game.State = GameState.P1Move;
		else if (die2 > die1)
			Game.State = GameState.P2Move;
		else
			log("Roll was a tie");
	}

	Game.move(die1, die2);
}

function btnNewGame_clicked(e)
{
	log("New Game");
	Game = new Game();
	log("Draw Board");
	Game.drawBoard();
	log("Draw Pieces: Player 1");
	Game.drawPieces(Game.Player1.Pieces);
	log("Draw Pieces: Player 2");
	Game.drawPieces(Game.Player2.Pieces);

	showHide('divNewGame');
	showHide('divRoll');
}

function init()
{
	initConsole('console');
	document.getElementById("board").addEventListener('click', board_clicked);
	document.getElementById("btnNewGame").addEventListener('click', btnNewGame_clicked)
	document.getElementById("btnRoll").addEventListener('click', btnRoll_clicked)
}