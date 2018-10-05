const canv = document.querySelector("#plansza");

const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;


const ballSize = 20;

let playerSorce = 0;
let aiSorce = 0;

const ScorePlayer = document.getElementById('');
const ScoreAi = document.getElementById('');




const cw = canv.width;
const ch = canv.height;
let ballX = cw / 2 - ballSize 
let ballY = ch / 2 - ballSize 
const paddelH = 100;
const paddeleW = 30

const plaerX = 70;
const aiX = 910

let plaerY = 200;
let aiY = 200;

let lineW = 6;
let lineH = 16;

let ballSpeedX = 0.1;
let ballSpeedY = 0.1;

//window.addEventListener przyjmuje dwa argumenty pierwszy na jakie zdarzenie (słowo klucz potrzebne być musi mistrz joda) a drugi to funkcja, window jest na całe okno przeglądarki można przypiąć do danego 
//obszaru np div , canvas

topCanv = canv.offsetTop;
//console.log(topCanv)







//ok
function pozycjaplaera(event) {
    // console.log('pozycja myszy to' + (event.clientY - topCanv))
    plaerY = event.clientY - topCanv - paddelH / 2;

    if (plaerY >= ch - paddelH) {
        plaerY = ch - paddelH
    }
    if (plaerY <= 0) {
        plaerY = 0
    }


}

function odbiciePiłki(){





}



//ok
function pozycjaKomutera() {

    var środekPaletki = aiY + paddelH / 2;
    var środekPiłki = ballY + ballSize / 2;


    if (ballX > 500) {
        if (środekPaletki - środekPiłki > 200) {
            //console.log('AAAAA')
            aiY -= 20
        } else if (środekPaletki - środekPiłki > 50) {
            //console.log('BBB')
            aiY -= 10
        }
        else if (środekPaletki - środekPiłki < - 200) {
            //console.log('CCCC')
            aiY += 20
        } else if (środekPaletki - środekPiłki < - 50) {
            //console.log('DDDDD')
            aiY += 10
        }
    }

    else if (ballX <= 500 && ballX > 150) {
        if (środekPaletki - środekPiłki > 100) {
            aiY -= 3
        }
        else if (ballX <= 500 && ballX < 150) {
            aiY += 3
        }
    }
}




function przyśpieszeniePiłki() {
    //console.log (ballSpeedX + '   ' + ballSpeedY)

    if (ballSpeedX > 0 && ballSpeedX < 10) {
        ballX += Math.random(0.5) * 2
    } else if (ballSpeedX < 0 && ballSpeedX > -10) {
        ballSpeedX -= Math.random(0.5) * 2
    }

    if (ballSpeedY > 0 && ballSpeedY < 10) {
        ballY += Math.random(0.2)
    } else if (ballSpeedY < 0 && ballSpeedY > -10) {
        ballSpeedY -= Math.random(0.2)
    }
}

canv.addEventListener('mousemove', pozycjaplaera)




function plaer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(plaerX, plaerY, paddeleW, paddelH);
}

function komputer() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY, paddeleW, paddelH);
}


function table() {
    ctx.fillStyle = '#fff';//fil style koloruje uzywamy tyych samych wartości co w css
    ctx.fillRect(0, 0, cw, ch);

    for (let pozycjaLini = 20; pozycjaLini < ch; pozycjaLini += 30) {
        ctx.fillStyle = 'gray'
        ctx.fillRect(cw / 2 - lineH / 2, pozycjaLini, lineW, lineH)
    }

}
//fillRect jest właściwością wymaga podania czterech argumetóœ, rysowanie w canvasie opiera sie na osi X pozima(od lewej do prawej)
// i osi Y (od góry do dołu) najpierw x y początek póżniej xy koniec rysowania
// zamiast wpisywać na sztywno wymiar lepiej podać zmienną z wysokością

//piłka

function piłka() {
    ctx.fillStyle = 'black';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }
    przyśpieszeniePiłki()
    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
    }


}

function gra() {

    table()

    piłka()

    plaer()

    komputer()

    pozycjaKomutera()

}
// funkcja setInterval umożliwia podanie dwóch argumentów pierwszy jest funkcją a drugi to czas co jaki ma być wykonana
setInterval(gra, 1000 / 60)