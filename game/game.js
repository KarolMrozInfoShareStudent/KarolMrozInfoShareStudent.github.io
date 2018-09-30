const canv = document.querySelector("#plansza");

const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;
const piłkaRozmiar = 20;




const canvWidth = canv.width;
const canvHeight = canv.height;
const piłkaStartX = canvWidth / 2 - piłkaRozmiar;
const piłkaStartY = canvHeight / 2 - piłkaRozmiar;

const paletkaWysokość = 100;
const paletSzerokość = 20

const graczX = 70;
const graczComputerX = 910

const graczY = 200;
const graczComputerY = 200;

const liniaSzerokość = 6;
const liniaWysokość = 16;

function gracz(){
    ctx.fillStyle = 'green';
    ctx.fillRect(graczX,graczY, paletSzerokość, paletkaWysokość);
}

function komputer(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(graczComputerX,graczComputerY, paletSzerokość, paletkaWysokość);
}


function table() {
    ctx.fillStyle = '#fff';//fil style koloruje uzywamy tyych samych wartości co w css
    ctx.fillRect(0, 0, canvWidth, canvHeight);

    for (let pozycjaLini = 20; pozycjaLini < canvHeight; pozycjaLini += 30){
        ctx.fillStyle = 'gray'
        ctx.fillRect(canvWidth/ 2, pozycjaLini, liniaSzerokość,liniaWysokość)
    }

}
//fillRect jest właściwością wymaga podania czterech argumetóœ, rysowanie w canvasie opiera sie na osi X pozima(od lewej do prawej)
// i osi Y (od góry do dołu) najpierw x y początek póżniej xy koniec rysowania
// zamiast wpisywać na sztywno wymiar lepiej podać zmienną z wysokością



//piłka

function piłka() {
    ctx.fillStyle = 'black';
    ctx.fillRect(piłkaStartX, piłkaStartY, piłkaRozmiar, piłkaRozmiar);
}



table()

piłka()

gracz()

komputer()