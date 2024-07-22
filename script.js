


const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];






const cvs=document.getElementById('tetris');
const ctx=cvs.getContext("2d");

const ROW=17
const COL=COLUMN=10;
const SQ=squareSIze=20;
const VACANT=' Black';
let board=[];
for(let r=0;r<ROW;r++)
    {
        board[r]=[];
        for(let c=0;c<COL;c++)
        {
           board[r][c]=VACANT;
        }
    }
   
   
           

function drawSquare(x,y,color="red")
{

    ctx.fillStyle=color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.lineWidth = 3;
    ctx.strokeStyle=" Black";
   ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
  
}

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"],
]
function randomPiece()
{
    let r=randomN=Math.floor(Math.random()*PIECES.length)
    return new Piece(PIECES[r][0],PIECES[r][1])
}

  
// Example: Updating content on a button click
let p=randomPiece();
function drawBoard()
{
   
    for( r=0;r<ROW;r++)
    {
        for( c=0;c<COL;c++)
        {
            drawSquare(c,r,board[r][c])
          
        }
    }
}

drawBoard();

function Piece(tetromino,color)
{
    this.tetromino=tetromino;
     this.color=color;
     this.tetrominoN=0;
     this.activeTetromino=this.tetromino[this.tetrominoN];
     this.x=0;this.y=0;


}

// Fill 

Piece.prototype.fill=function(color)
{
    
    for(r=0;r<this.activeTetromino.length;r++)
        {
            for(c=0;c<this.activeTetromino.length;c++)
            {
                if(this.activeTetromino[r][c])
                {
                    drawSquare(c+this.x,r+this.y,color)
                }
            }
        }
}
// Draw a piece to board

Piece.prototype.draw=function(){
    this.fill(this.color);
}

let line=document.getElementById("lines");
let score1=document.getElementById("score");
let level=document.getElementById("level");
// unDraw a piece to board

Piece.prototype.undraw=function( ){
   this.fill(VACANT)
}

Piece.prototype.moveDown=function()
{
    if(!this.collision(0,1,this.activeTetromino))
    {
        this.undraw();
        this.y++;
        this.draw();
    }
   else
   {
    this.lock();
    // this.changeText();
   
p=randomPiece();
 
   }
}
let score=0;
let counter1=0;
Piece.prototype.lock=function()
{
    for(r=0;r<this.activeTetromino.length;r++)
        {
            for(c=0;c<this.activeTetromino.length;c++)
            {
                if(!this.activeTetromino[r][c])
                {
                    continue;
                }
                if(this.y - r<0)
                {
                    alert("Game Over");
                    gameOver=true;
                    break;
                }
                board[this.y + r][this.x+ c]=this.color;
            }
        }
        let isRowFull=true;
        for(r=0;r<ROW;r++)
        {
            isRowFull=true;
            for(c=0;c<COL;c++)
            {
                isRowFull=isRowFull&&(board[r][c]!=VACANT)
                  }
            if(isRowFull)
                {
                    //console.log("\nisRowFUll\t",isRowFUll,"\n")
        
                    for(y=r;y>1;y--)
                    {
                        for(c=0;c<COL;c++)
                        {
                            board[y][c]=board[y-1][c];
        
                        }
                    }
                    for(c=0;c<COL;c++)
                        {
                            board[0][c]=VACANT;
        
                        }
                        score+=10;
                        score1.innerText=score;
                        counter1++;
                        line.innerText=counter1;
                       r++;
                }
               

        }

        drawBoard();
}
Piece.prototype.moveRight=function()
{
    if(!this.collision(1,0,this.activeTetromino))
        {  
    this.undraw();
    this.x++;
    this.draw();
        }
}

Piece.prototype.moveLeft=function()
{
    if(!this.collision(-1,0,this.activeTetromino))
        {
    this.undraw();
    this.x--;
    this.draw();
        }
}

Piece.prototype.rotate=function()
{
    let nextPattern= this.tetromino[(this.tetrominoN+1)%this.tetromino.length]
   let kick=0;
   if(this.collision(0,0,nextPattern))
   {
    if(this.x>COL/2)
    {
        kick=-1;

    }
    else
    {
        kick =1;
    }
   }
   
   
   
    if(!this.collision(kick,0,nextPattern))
        {
    this.undraw();
    this.x+=kick;
    this.tetrominoN=(this.tetrominoN+1)%this.tetromino.length;
    this.activeTetromino=this.tetromino[this.tetrominoN];

    this.draw();
        }
}

//Control

document.addEventListener("keydown",CONTROL)
function CONTROL(event)
{
    if(event.keyCode==37)
    {
        p.moveLeft();
        dropStart=Date.now();
    }
    else if(event.keyCode==38)
    {
       p.rotate();
       dropStart=Date.now();
    }
     else if(event.keyCode==39)
    {
        p.moveRight();
        dropStart=Date.now();
    }
    else if(event.keyCode==40)
        {
            p.moveDown(); 
            dropStart=Date.now();
        }
    
}





let dropStart=Date.now();
let gameOver=false;
function drop()
{
    let now=Date.now();
    let delta=now-dropStart;
    if(delta>1000)
    {
        p.moveDown();
        dropStart=Date.now();
    }
    if(!gameOver)
    {
        requestAnimationFrame(drop);
    }
   
}

drop();

Piece.prototype.collision=function(x,y,piece){
    for(r=0;r<piece.length;r++)
    {
        for(c=0;c<piece.length;c++)
        {
            let newX=this.x+c+x;
            let newY=this.y+r+y;
            if(!piece[r][c])
            {
              
                continue;
            }
            if(newX<0||newX+1>COL||newY>=ROW)
            {
                return true;
            }
            if(newY<0)
            {
                continue;
            }
            
              
            if(board[newY][newX]!=VACANT)
            {
                 
                return true;
            }
        }

    }
    return false;
}