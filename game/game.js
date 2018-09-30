const canv = document.querySelector("#plansza");

const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;


const canvWidth = canv.width;
const canvHeight = canv.height;

function table(){
    ctx.fillStyle;
    ctx.fillRect(0,0, 250, 250);
}

table()
//fillStyle jest właściwością, rysowanie w canvasie opiera sie na osi X pozima(od lewej do prawej)
// i osi Y (od góry do dołu)