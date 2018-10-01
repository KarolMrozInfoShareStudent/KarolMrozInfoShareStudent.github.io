const canv = document.querySelector("#plansza");

const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;
const piłkaRozmiar = 20;




const canvWidth = canv.width;
const canvHeight = canv.height;
let piłkaStartX = canvWidth / 2 - piłkaRozmiar;
let piłkaStartY = canvHeight / 2 - piłkaRozmiar;

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

//window.addEventListener przyjmuje dwa argumenty pierwszy na jakie zdarzenie a drugi to funkcja, window jest na całe okno przeglądarki można przypiąć do danego 
//obszaru np div , canvas

canv.addEventListener('click', function(){
    console.log('klikniecie')
})




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
    ctx.fillRect(0, 0, canvWidth, canvHeight);

    for (let pozycjaLini = 20; pozycjaLini < canvHeight; pozycjaLini += 30) {
        ctx.fillStyle = 'gray'
        ctx.fillRect(canvWidth / 2 - liniaWysokość / 2, pozycjaLini, liniaSzerokość, liniaWysokość)
    }

}
//fillRect jest właściwością wymaga podania czterech argumetóœ, rysowanie w canvasie opiera sie na osi X pozima(od lewej do prawej)
// i osi Y (od góry do dołu) najpierw x y początek póżniej xy koniec rysowania
// zamiast wpisywać na sztywno wymiar lepiej podać zmienną z wysokością

//piłka

function piłka() {
    ctx.fillStyle = 'black';
    ctx.fillRect(piłkaStartX, piłkaStartY, piłkaRozmiar, piłkaRozmiar);

    piłkaStartX += piłkaSzybkośćX;
    piłkaStartY += piłkaSzybkośćY;

    if (piłkaStartY <= 0 || piłkaStartY + piłkaRozmiar >= canvHeight)
    {
        piłkaSzybkośćY = -piłkaSzybkośćY;
    }
    if (piłkaStartX <=0 || piłkaStartX + piłkaRozmiar >= canvWidth)
    {
        piłkaSzybkośćX = -piłkaSzybkośćX;
    }
}

function gra() {

    table()

    piłka()

    gracz()

    komputer()

}
// funkcja setInterval umożliwia podanie dwóch argumentów pierwszy jest funkcją a drugi to czas co jaki ma być wykonana
setInterval(gra, 1000 / 60)