/*GLOBAL VARIABLES*/
//Board Dimenstions
var pointWidth = 72;
var pointHeight = 300;
var pieceRadius = pointWidth / 2;
var xLeftQuadrants = 0;
var xRightQuadrants = 504;
var yTopQuadrants = 0;
var yBottomQuadrants = 750;
var orientUp = -1;
var orientDown = 1;

//Draw Space
var canvas;
var ctx;

/*
 * x = the leftmost x coordinate of the base
 * y = the leftmost y coordinate of the base
 * oriention is either 1 or -1. positive indicates the point goes from top to bottom, negative is botton to top
 * color is the color the point will be drawn in
 */
function drawPoint(x, y, orientation, color)
{
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+pointWidth/2,y+pointHeight*orientation);
	ctx.lineTo(x+pointWidth,y);
	ctx.lineTo(x,y);
	ctx.fill();
}

/*
 * x = the leftmost x coordinate of the base
 * y = the leftmost y coordinate of the base
 * oriention is either 1 or -1. positive indicates the point goes from top to bottom, negative is botton to top
 * firstColor is the color the leftmost point will be drawn in
 * secondColor is the color of the second point drawn and alternates with firstColor
 */
function drawQuadrant(x, y, orientation, firstColor, secondColor)
{
	for(var i = 0; i < 6; i++)
	{
		if(i%2 == 0)
			drawPoint(x+i*pointWidth, y, orientation, firstColor);
		else
			drawPoint(x+i*pointWidth, y, orientation, secondColor);
	}
}

/*
 * draws a piece at the specific x, y coordinates
 */
function drawPiece(x, y, color)
{
	ctx.beginPath();
	ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false);
	ctx.strokeStyle = "green";
	ctx.lineWidth = 2;
	ctx.stroke();
}

function drawPieces(pieces)
{
	for(var i = 0; i < pieces.length; i++)
	{
		for(var j = 0; j < pieces[i].length; j++)
		{
			if(i === 0) //pieces off the board on bottom right
			{

			}
			else if(i <= 6) //bottom right quadrant
			{
				var x = xRightQuadrants+pointWidth/2+(6-i)*pointWidth;
				var y = yBottomQuadrants-pieceRadius*(1+j*2);

				drawPiece(x,y, pieces[i][j].color);
			}

			else if(i <= 12) //bottom left quadrant
			{
				var x = xLeftQuadrants+pointWidth/2+(12-i)*pointWidth;
				var y = yBottomQuadrants-pieceRadius*(1+j*2);

				drawPiece(x,y, pieces[i][j].color);
			}

			else if(i <= 18) //top left quadrant
			{
				var x = xLeftQuadrants+pointWidth/2+(i-13)*pointWidth;
				var y = yTopQuadrants+pieceRadius*(1+j*2);
				
				drawPiece(x,y, pieces[i][j].color);
			}

			else if(i <= 24) //top right quadrant
			{
				var x = xRightQuadrants+pointWidth/2+(i-19)*pointWidth;
				var y = yTopQuadrants+pieceRadius*(1+j*2);
				
				drawPiece(x,y, pieces[i][j].color);
			}
			else if (i === 25) //pieces off the board on bottom left
			{

			}
			else
				return -1;
		}
	}

	return 0;
}

function drawBoard()
{
	canvas = document.getElementById("board");

	if(canvas.getContext)
	{
		ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, xRightQuadrants*2, yBottomQuadrants);

		ctx.strokeRect(432, yTopQuadrants, pointWidth, yBottomQuadrants);
		ctx.strokeRect(936, yTopQuadrants, pointWidth, yBottomQuadrants);

		drawQuadrant(xLeftQuadrants, yTopQuadrants, orientDown, "red", "black"); //top left
		drawQuadrant(xLeftQuadrants, yBottomQuadrants, orientUp, "black", "red"); //bottom left
		drawQuadrant(xRightQuadrants, yTopQuadrants, orientDown, "red", "black"); //top right
		drawQuadrant(xRightQuadrants, yBottomQuadrants, orientUp, "black", "red"); //bottom right

		//drawPieces(this.board);
	}
}
