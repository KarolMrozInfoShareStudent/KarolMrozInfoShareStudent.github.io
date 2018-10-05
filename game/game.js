const canv = document.querySelector("#plansza");

const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;


const ballSize = 20;




const cw = canv.width;
const ch = canv.height;
let ballX = cw / 2 - ballSize 
let ballY = ch / 2 - ballSize 
const paletkaWysokość = 100;
const paletSzerokość = 20

const graczX = 70;
const graczComputerX = 910

let graczY = 200;
let graczComputerY = 200;

let liniaSzerokość = 6;
let liniaWysokość = 16;

let piłkaSzybkośćX = 3;
let piłkaSzybkośćY = 3;

//window.addEventListener przyjmuje dwa argumenty pierwszy na jakie zdarzenie (słowo klucz potrzebne być musi mistrz joda) a drugi to funkcja, window jest na całe okno przeglądarki można przypiąć do danego 
//obszaru np div , canvas

topCanv = canv.offsetTop;
//console.log(topCanv)








function pozycjaGracza(event) {
    // console.log('pozycja myszy to' + (event.clientY - topCanv))
    graczY = event.clientY - topCanv - paletkaWysokość / 2;

    if (graczY >= ch - paletkaWysokość) {
        graczY = ch - paletkaWysokość
    }
    if (graczY <= 0) {
        graczY = 0
    }


}

function odbiciePiłki(){





}




function pozycjaKomutera() {

    var środekPaletki = graczComputerY + paletkaWysokość / 2;
    var środekPiłki = ballY + ballSize / 2;


    if (ballX > 500) {
        if (środekPaletki - środekPiłki > 200) {
            //console.log('AAAAA')
            graczComputerY -= 20
        } else if (środekPaletki - środekPiłki > 50) {
            //console.log('BBB')
            graczComputerY -= 10
        }
        else if (środekPaletki - środekPiłki < - 200) {
            //console.log('CCCC')
            graczComputerY += 20
        } else if (środekPaletki - środekPiłki < - 50) {
            //console.log('DDDDD')
            graczComputerY += 10
        }
    }

    else if (ballX <= 500 && ballX > 150) {
        if (środekPaletki - środekPiłki > 100) {
            graczComputerY -= 3
        }
        else if (ballX <= 500 && ballX < 150) {
            graczComputerY += 3
        }
    }
}




function przyśpieszeniePiłki() {
    //console.log (piłkaSzybkośćX + '   ' + piłkaSzybkośćY)

    if (piłkaSzybkośćX > 0 && piłkaSzybkośćX < 10) {
        ballX += Math.random(0.5) * 2
    } else if (piłkaSzybkośćX < 0 && piłkaSzybkośćX > -10) {
        piłkaSzybkośćX -= Math.random(0.5) * 2
    }

    if (piłkaSzybkośćY > 0 && piłkaSzybkośćY < 10) {
        ballY += Math.random(0.2)
    } else if (piłkaSzybkośćY < 0 && piłkaSzybkośćY > -10) {
        piłkaSzybkośćY -= Math.random(0.2)
    }
}

canv.addEventListener('mousemove', pozycjaGracza)




function gracz() {
    ctx.fillStyle = 'green';
    ctx.fillRect(graczX, graczY, paletSzerokość, paletkaWysokość);
}

function komputer() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(graczComputerX, graczComputerY, paletSzerokość, paletkaWysokość);
}


function table() {
    ctx.fillStyle = '#fff';//fil style koloruje uzywamy tyych samych wartości co w css
    ctx.fillRect(0, 0, cw, ch);

    for (let pozycjaLini = 20; pozycjaLini < ch; pozycjaLini += 30) {
        ctx.fillStyle = 'gray'
        ctx.fillRect(cw / 2 - liniaWysokość / 2, pozycjaLini, liniaSzerokość, liniaWysokość)
    }

}
//fillRect jest właściwością wymaga podania czterech argumetóœ, rysowanie w canvasie opiera sie na osi X pozima(od lewej do prawej)
// i osi Y (od góry do dołu) najpierw x y początek póżniej xy koniec rysowania
// zamiast wpisywać na sztywno wymiar lepiej podać zmienną z wysokością

//piłka

function piłka() {
    ctx.fillStyle = 'black';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += piłkaSzybkośćX;
    ballY += piłkaSzybkośćY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        piłkaSzybkośćY = -piłkaSzybkośćY;
    }
    przyśpieszeniePiłki()
    if (ballX <= 0 || ballX + ballSize >= cw) {
        piłkaSzybkośćX = -piłkaSzybkośćX;
    }


}

function gra() {

    table()

    piłka()

    gracz()

    komputer()

    pozycjaKomutera()

}
// funkcja setInterval umożliwia podanie dwóch argumentów pierwszy jest funkcją a drugi to czas co jaki ma być wykonana
setInterval(gra, 1000 / 60)