const plansza = document.getElementById('plansza');
const ctx = plansza.getContext('2d');
            
plansza.width = 1000;
plansza.height = 500;
            
let playerSorce = 0;
let aiSorce = 0;

const ScorePlayer = document.getElementById('playerScore');
const ScoreAi = document.getElementById('aiScote');
            

const cw = plansza.width;
const ch = plansza.height;
            

const lineW = 6;
const lineH = 16;
           

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;  
            
let ballSpeedX = 3;
let ballSpeedY = 3;
            

const paddelH = 150;
const paddelW = 20;


const playerX = 70;
const aiX = 910;
            

let playerY = 200;
let aiY = 200;
            

cancasTop = plansza.offsetTop;

let newGame = true;

function aiMove()
{
    const middlePadel = aiY + paddelH/2;
    const middleBall = ballY + ballSize/2;
    
    if(ballX >= 500)
    {
        if(middlePadel - middleBall > 200)
        {
            aiY -= 15;
        }
        else if(middlePadel - middleBall > 40)
        {
            aiY -= 8;        
        }
        else if(middlePadel - middleBall < -200)
        {
            aiY += 15;
        }
        else if(middlePadel - middleBall < -40)
        {
            aiY += 8;
        }   
    }
    else if(ballX < 500)
    {
        if(middlePadel - middleBall > 100)
        {
            aiY -= 4;
        }
        else if(middlePadel - middleBall < -100)
        {
            aiY += 4;
        }
    }
}

//ruch paletki
function playerPos(e)
{
    playerY = e.clientY - cancasTop - paddelH / 2;

    if(playerY < 0)
    {
        playerY = 0;
    }

    if(playerY > ch - paddelH)
    {
        playerY = ch - paddelH;
    } 
}

plansza.addEventListener("mousemove",playerPos)


function table() 
{

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch);
    

    ctx.fillStyle = 'white';
    for(let linePos = 20; linePos < ch; linePos += 30)
    {
        ctx.fillRect(cw/2 - lineW/2, linePos, lineW, lineH)
    }
}

function reset(who)
{
    if(who)
    {
        ScorePlayer.textContent = ++playerSorce;
    }
    else
    {
        ScoreAi.textContent = ++aiSorce;
    }
    newGame = true;
}

function ballReset()
{
    ballX = playerX + paddelW;
    ballY = playerY + paddelH/2 - ballSize/2;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    plansza.addEventListener("click",play);
}

function play()
{
    newGame = false;
    ballSpeedX = 3;
    ballSpeedY = 3;
}

//ruch piłki
function ball()
{
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0)
    {
        ballSpeedY *= -1;
        ballY = 0;
        speedUp();
    }

    if(ballY >= ch - ballSize)
    {
        ballSpeedY *= -1;
        ballY = ch - ballSize;
        speedUp();
    }

    if(ballX + ballSize >= cw)
    {
        reset(true);
    }

    if(ballX <= 0)
    {
        reset(false);
    }

    if(ballX <= playerX + paddelW && 
       ballX >= playerX && 
       ballY + ballSize >= playerY && 
       ballY <= playerY + paddelH)
    { 
        ballSpeedX *= -1;
        ballX = playerX + paddelW;  
        speedUp();
    }

    if(ballX + ballSize >= aiX && 
       ballX + ballSize <= aiX + paddelW &&
       ballY + ballSize >= aiY && 
       ballY <= aiY + paddelH)
    {
        ballSpeedX *= -1;
        ballX = aiX - ballSize;
        speedUp();
    }
} 

function speedUp()
{
    ballSpeedX *= 1.05;
    ballSpeedY *= 1.02;
    
    if(ballSpeedX > 16)
    {
        ballSpeedX = 16;
    }
    
    if(ballSpeedY > 10)
    {
        ballSpeedY = 10;
    }
}

    
function player()
{
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, paddelW, paddelH);
}

function ai()
{
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, paddelW, paddelH);
}

function game()
{
    table();
    if(!newGame)
    {
        ball();
    }
    else
    {   
        ballReset();
    }
    player();
    ai();
    aiMove();
}

setInterval(game,1000/60);
