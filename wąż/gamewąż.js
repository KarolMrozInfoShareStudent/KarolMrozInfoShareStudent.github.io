var plansza = document.querySelector("#plansza");
var kontekst = plansza.getContext("2d");


var szerokość = plansza.width;
var wysokość = plansza.height;


var rozmiarBloku = 10;
var szerokośćWBlokach = szerokość / rozmiarBloku;
var wysokośćWBlokach = wysokość / rozmiarBloku;


var wynik = 0;

var rysujObramowanie = function () {
  kontekst.fillStyle = "gray";
  kontekst.fillRect(0, 0, szerokość, rozmiarBloku);
  kontekst.fillRect(0, wysokość - rozmiarBloku, szerokość, rozmiarBloku);
  kontekst.fillRect(0, 0, rozmiarBloku, wysokość);
  kontekst.fillRect(szerokość - rozmiarBloku, 0, rozmiarBloku, wysokość);
};


var rysujWynik = function () {
  kontekst.font = "20px Courier";
  kontekst.fillStyle = "Black";
  kontekst.textAlign = "left";
  kontekst.textBaseline = "top";
  kontekst.fillText("Wynik: " + wynik, rozmiarBloku, rozmiarBloku);
};

var koniecGry = function () {
  clearInterval(IdPrzedziału);
  kontekst.font = "60px Courier";
  kontekst.fillStyle = "red";
  kontekst.textAlign = "center";
  kontekst.textBaseline = "middle";
  kontekst.fillText("Game Over", szerokość / 2, wysokość / 2);
};


var okrąg = function (x, y, promień, wypełnijOkrąg) {
  kontekst.beginPath();
  kontekst.arc(x, y, promień, 0, Math.PI * 2, false);
  if (wypełnijOkrąg) {
    kontekst.fill();
  } else {
    kontekst.stroke();
  }
};

var Blok = function (kol, wiersz) {
  this.kol = kol;
  this.wiersz = wiersz;
};


Blok.prototype.rysujKwadrat = function (kolor) {
  var x = this.kol * rozmiarBloku;
  var y = this.wiersz * rozmiarBloku;
  kontekst.fillStyle = kolor;
  kontekst.fillRect(x, y, rozmiarBloku, rozmiarBloku);
};


Blok.prototype.rysujOkrąg = function (kolor) {
  var środekX = this.kol * rozmiarBloku + rozmiarBloku / 2;
  var środekY = this.wiersz * rozmiarBloku + rozmiarBloku / 2;
  kontekst.fillStyle = kolor;
  okrąg(środekX, środekY, rozmiarBloku / 2, true);
};


Blok.prototype.porównaj = function (innyBlok) {
  return this.kol === innyBlok.kol && this.wiersz === innyBlok.wiersz;
};

// Konstruktor Wąż
var Wąż = function () {
  this.segmenty = [
    new Blok(7, 5),
    new Blok(6, 5),
    new Blok(5, 5)
  ];

  this.kierunek = "prawa";
  this.następnyKierunek = "prawa";
};


Wąż.prototype.rysuj = function () {
  for (var i = 0; i < this.segmenty.length; i++) {
    this.segmenty[i].rysujKwadrat ("Red");
  }
};


Wąż.prototype.przesuń = function () {
  var głowa = this.segmenty[0];
  var nowaGłowa;

  this.kierunek = this.następnyKierunek;

  if (this.kierunek === "prawa") {
    nowaGłowa = new Blok(głowa.kol + 1, głowa.wiersz);
  } else if (this.kierunek === "dół") {
    nowaGłowa = new Blok(głowa.kol, głowa.wiersz + 1);
  } else if (this.kierunek === "lewa") {
    nowaGłowa = new Blok(głowa.kol - 1, głowa.wiersz);
  } else if (this.kierunek === "góra") {
    nowaGłowa = new Blok(głowa.kol, głowa.wiersz - 1);
  }

  if (this.wykrywajKolizje(nowaGłowa)) {
    koniecGry();
    return;
  }

  this.segmenty.unshift(nowaGłowa);

  if (nowaGłowa.porównaj(jabłko.pozycja)) {
    wynik++;
    jabłko.promień();
  } else {
    this.segmenty.pop();
  }
};


Wąż.prototype.wykrywajKolizje = function (głowa) {
  var lewaKolizja = (głowa.kol === 0);
  var górnaKolizja = (głowa.wiersz === 0);
  var prawaKolizja = (głowa.kol === szerokośćWBlokach - 1);
  var dolnaKolzja = (głowa.wiersz === wysokośćWBlokach - 1);

  var ścianaKolizja = lewaKolizja || górnaKolizja ||
prawaKolizja || dolnaKolzja;

  var ogonKolizja = false;

  for (var i = 0; i < this.segmenty.length; i++) {
    if (głowa.porównaj(this.segmenty[i])) {
      ogonKolizja = true;
    }
  }

  return ścianaKolizja || ogonKolizja;
};


Wąż.prototype.ustawKierunek = function (nowyKierunek) {
  if (this.kierunek === "góra" && nowyKierunek === "dół") {
    return;
  } else if (this.kierunek === "prawa" && nowyKierunek === "lewa") {
    return;
  } else if (this.kierunek === "dół" && nowyKierunek === "góra") {
    return;
  } else if (this.kierunek === "lewa" && nowyKierunek === "prawa") {
    return;
  }

  this.następnyKierunek = nowyKierunek;
};

// Konstruktor jabłko
var jabłko = function () {
  this.pozycja = new Blok(10, 10);
};


jabłko.prototype.rysuj = function () {
  this.pozycja.rysujOkrąg("LimeGreen");
};


jabłko.prototype.przenieś = function () {
  var losowaKolumna = Math.floor(Math.random() * (szerokośćWBlokach - 2)) + 1;
  var losowyWiersz = Math.floor(Math.random() * (wysokośćWBlokach - 2)) + 1;
  this.pozycja = new Blok(losowaKolumna, losowyWiersz);
};


var Wąż = new Wąż();
var jabłko = new jabłko();


var IdPrzedziału = setInterval(function () {
  kontekst.clearRect(0, 0, szerokość, wysokość);
  rysujWynik();
  Wąż.przesuń();
  Wąż.rysuj();
  jabłko.rysuj();
  rysujObramowanie();
}, 100);


  var kierunki = {
  37: "lewa",
  38: "góra",
  39: "prawa",
  40: "dół"
};


$("body").keydown(function (zdarzenie) {
  var nowyKierunek = kierunki[zdarzenie.keyCode];
  if (nowyKierunek !== undefined) {
    Wąż.ustawKierunek(nowyKierunek);
 }
    });