/* Seleccion.js es de la rama platzi a la que migrare */

/* Constantes Globales */
// Divs y Sections
const sectionSeleccionarModo = document.getElementById("seleccionarModo");
const sectionSeleccionarAtaques = document.getElementById(
  "seleccionar-ataques"
);
const divReiniciarPPT = document.getElementById("divReiniciarPPT");
const emojisDelJugador = document.getElementById("divAtaqueElementalJugador");
const emojisDelRival = document.getElementById("divAtaqueElementalRival");
const resultadoMensaje = document.getElementById("listaMensajes");
const cajaEnfrentamiento = document.getElementById("enfrentamiento");
const subtituloCombate = document.getElementById("subtitulo");
const cambioVidasScoreR = document.getElementById("conteoRival");
const cambioVidasScoreJ = document.getElementById("conteoJugador");
const sectionSeleccionarElementoJugador = document.getElementById(
  "Seleccionar-Elemento"
);
const contenedorPersonajes = document.getElementById("contenedorPersonajes");
const contenedorAtaques = document.getElementById("CajaCartas");
// Botones
const botonConfirmarCarta = document.getElementById("botonConfirmarCarta");
const botonPPT = document.getElementById("modoPPT");
const botonClassic = document.getElementById("modoClassic");
const sectionTutorial = document.getElementById("sectionTutorial")
const botonTutorial = document.getElementById("open");
const popupDelTutorial = document.getElementById("cajaTutorial");
const botonElementoJugador = document.getElementById(
  "Boton-confirmar-Elemento"
);
const openBotones = document.getElementById("emojiAbrirCartas");
const confirmarCarta = document.getElementById("divConfirmarCarta");
const botonReiniciar1 = document.getElementById("botonReiniciar1");
const botonReiniciar2 = document.getElementById("botonReiniciar2");
const divReiniciarClassic = document.getElementById("divReiniciarClassic");
// Canvas
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

/* Variables Goblales */
let AGUA = "./img/simboloDeAgua.webp";
let FUEGO = "./img/simboloDeFuego.webp";
let NIEVE = "./img/simboloDeNieve.webp";
let ninjasElementales = [];
let ninjasElementalesRivales = [];
let botonesElementales = [];
let isSelected = false;
let imgCartaJugador = "./img/cartas.webp"
let emojiAtaqueJugador = [];
let ataquesNinjaJugador;
let emojiAtaqueRival = [];
let opcionDeNinjas;
let NinjaJugador;
let ninjasPPT = []
let vidasJugador = 3
let vidasRival = 3
let resultado;
let indexResultado;
let jugadorId = null;
let enemigoId = null;
let rivalEnfrentamiento = null
let botones = [];
let inputcheckedAgua;
let inputcheckedNieve;
let inputcheckedFuego;
let cartaDelRival = []
let imgCartaRival = "./img/cartas.webp"
let AtaquesNinjaRival;
let indexEmojiJugador;
let indexEmojiRival;
let ninjaCanvas;
let intervaloBoleanoMapa; // Intervalo del canvas
let intervaloCombate // Intervalo del combate Classic
let mapaBackground = new Image();
mapaBackground.src = "./img/mapaCanvas.webp";

let imgArbitaria = null
let ejecutado = false;
let termina = false


let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 40;
const anchoMaximoDelMapa = 1150;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa;
}
alturaQueBuscamos = (anchoDelMapa * 400) / 900;
mapa.width = "1050" ;
mapa.height = "511";

let lienzo = mapa.getContext("2d");


// Clases
class Ninjas {
  constructor(nombre, foto, Ide, clase, vida, claseFoto, fotoMapa, enCombate, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.Ide = Ide;
    this.clase = clase;
    this.vida = vida;
    this.claseFoto = claseFoto;
    this.enCombate = enCombate
    this.ataques = [];
    this.ancho = (mapa.width * 50) / 900;
    this.alto = (mapa.width * 50) / 900;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;  }
  pintarNinjas() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

class CartaMano{
  constructor(color, numero, id, imgCarta) {
  this.id = id;
  this.numero = numero;
  this.color = color;
  this.imgCarta = imgCarta
}}
let manoDelJugador = new CartaMano(  
  "colorindefnidio",
  0,
  "idindefinido"
)


class NinjasPPT {
  constructor(nombre, foto, emoji, clase, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.emoji = emoji;
    this.clase = clase;
    this.vida = vida;
    this.ataquesPPT = [];
  }
}
let ninjaBlack1 = new NinjasPPT(
  "Jugador",
  "./img/ninjaComun1.webp",
  "./img/emojiSombra.webp",
  "tarjetaJugador",
  3
);
let ninjaBlack2 = new NinjasPPT(
  "Rival",
  "./img/ninja2.webp",
  "./img/emojiSombra.webp",
  "tarjetaRival",
  3
);
// Lista de Ataques de los ninjas PPT
ninjaBlack1.ataquesPPT.push(
  { nombre: "Nieve", id: "boton-Nieve", img: NIEVE },
  { nombre: "Agua", id: "boton-Agua", img: AGUA },
  { nombre: "Fuego", id: "boton-Fuego", img: FUEGO }
);
ninjaBlack2.ataquesPPT.push(
  { nombre: "Nieve", id: "boton-Nieve", img: NIEVE },
  { nombre: "Agua", id: "boton-Agua", img: AGUA },
  { nombre: "Fuego", id: "boton-Fuego", img: FUEGO }
);
ninjasPPT.push(ninjaBlack1, ninjaBlack2);


let ninjaAgua = new Ninjas(
  "NinjaAgua",
  "./img/ninjaDeAgua.webp",
  "tarjetaDeAgua",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./img/emojiNinjaAgua.webp",
  false
);
let ninjaFuego = new Ninjas(
  "NinjaFuego",
  "./img/ninjaDeFuego.webp",
  "tarjetaDeFuego",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./img/emojiNinjaFuego.webp",
  false
);
let ninjaNieve = new Ninjas(
  "NinjaNieve",
  "./img/ninjaDeNieve.webp",
  "tarjetaDeNieve",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./img/emojiNinjaNieve.webp",
  false
);

/* Lista de Ataques de los ninjas Classic*/
// 4 Agua 36 puntos, 2 Fuego 20 puntos, 4 nieve 24 puntos 80 en total
const barajaAgua = [
  { id: "carta-Agua", color: "Azul", numero: 12, img: "./img/Cards/CartaAzulAgua12,2.webp"},
  { id: "carta-Agua", color: "amarillo", numero: 4, img: "./img/Cards/CartaAmarillaAgua4.webp"},
  { id: "carta-Agua", color: "Azul", numero: 3, img: "./img/Cards/CartaAzulAgua12.webp"},
  { id: "carta-Fuego", color: "Azul", numero: 12, img: "./img/Cards/CartaAzulFuego12.webp"},
  { id: "carta-Fuego", color: "Rojo",  numero: 8, img: "./img/Cards/CartaRojaFuego8.webp"},
  { id: "carta-Nieve", color: "Azul", numero: 10, img: "./img/Cards/CartaAzulNieve10.webp"},
  { id: "carta-Nieve", color: "Violeta", numero: 5, img: "./img/Cards/CartaVioletaNieve5,2.webp"},
  { id: "carta-Agua", color: "Verde", numero: 11, img: "./img/Cards/CartaVerdeAgua11.webp"},
  { id: "carta-Nieve", color: "Rojo", numero: 9, img: "./img/Cards/CartaRojaNieve9.webp"},
  { id: "carta-Agua", color: "Violeta", numero: 6, img: "./img/Cards/CartaVioletaAgua6.webp"},
];
// 4 Fuego 34 puntos, 3 agua 19 puntos, 4 nieve 19 puntos 71 en total
const barajaFuego = [
  { id: "carta-Nieve", color: "Naranja", numero: 12, img: "./img/Cards/CartaNaranjaNieve12.webp"},
  { id: "carta-Fuego", color: "Rojo", numero: 8, img: "./img/Cards/CartaRojaFuego8y2.webp"},
  { id: "carta-Agua", color: "Rojo", numero: 9, img: "./img/Cards/CartaRojaAgua9.webp"},
  { id: "carta-Fuego", color: "Rojo", numero: 12, img: "./img/Cards/CartaRojaFuego12.webp"},
  { id: "carta-Agua", color: "Amarillo", numero: 4, img: "./img/Cards/CartaAmarillaAgua4.webp"},
  { id: "carta-Fuego", color: "Amarillo", numero: 6, img: "./img/Cards/CartaAmarillaFuego6,2.webp"},
  { id: "carta-Agua", color: "Verde", numero: 11, img: "./img/Cards/CartaVerdeAgua11.webp" },
  { id: "carta-Agua", color: "Azul", numero: 12, img: "./img/Cards/CartaAzulAgua12.webp"},
  { id: "carta-Fuego", color: "Azul", numero: 12, img: "./img/Cards/CartaAzulFuego12.webp"},
  { id: "carta-Nieve", color: "Verde", numero: 6, img: "./img/Cards/CartaVerdeNieve10,2.webp"},
];
// 4 nieve 33 puntos, 3 agua 20 puntos, 3 fuego 17 puntos 70 en total
const barajaNieve = [
  { id: "carta-Nieve", color: "Amarillo", numero: 11, img: "./img/Cards/CartaAmarillaNieve11.webp" },
  { id: "carta-Nieve", color: "Amarillo", numero: 7, img: "./img/Cards/CartaAmarillaNieve7.webp" },
  { id: "carta-Agua", color: "Amarillo", numero: 4, img: "./img/Cards/CartaAmarillaAgua4.webp" },
  { id: "carta-Fuego", color: "Amarillo", numero: 6, img: "./img/Cards/CartaAmarillaFuego6.webp" },
  { id: "carta-Nieve", color: "Violeta", numero: 5, img: "./img/Cards/CartaVioletaNieve5.webp" },
  { id: "carta-Fuego", color: "Azul", numero: 3, img: "./img/Cards/CartaAzulFuego3.webp" },
  { id: "carta-Nieve", color: "Azul", numero: 10, img: "./img/Cards/CartaAzulNieve10.webp" },
  { id: "carta-Agua", color: "Naranja", numero: 10, img: "./img/Cards/CartaNaranjaAgua10.webp" },
  { id: "carta-Agua", color: "Violeta", numero: 6, img: "./img/Cards/CartaVioletaAgua6.webp" },
  { id: "carta-Fuego", color: "Rojo", numero: 8, img: "./img/Cards/CartaRojaFuego8y2.webp" },
 ];

ninjaAgua.ataques.push(...barajaAgua);
ninjaFuego.ataques.push(...barajaFuego);
ninjaNieve.ataques.push(...barajaNieve);

ninjasElementales.push(ninjaAgua, ninjaFuego, ninjaNieve);

// Al Iniciar Juego
function iniciarJuego() {
  sectionSeleccionarAtaques.style.display = "none";
  sectionVerMapa.style.display = "none";
  divReiniciarClassic.style.display = "none";
  divReiniciarPPT.style.display = "none";
  sectionSeleccionarElementoJugador.style.display = "none";

  botonPPT.addEventListener("click", modoPPT);
  botonClassic.addEventListener("click", modoClassic);
  botonTutorial.addEventListener("click", popTutorial);
}

// Modo de juego PPT, se requiere revision
function modoPPT() {
  sectionTutorial.style.position = "absolute";    
  sectionTutorial.style.pointerEvents = "none";    
  
  sectionSeleccionarAtaques.style.display = "flex";
  sectionSeleccionarModo.style.display = "none";

  divReiniciarPPT.style.display = "flex";

  openBotones.addEventListener("click", abrirBotonesElementales);
  botonConfirmarCarta.addEventListener("click", encuentroPPT);

  botonReiniciar1.addEventListener("click", reiniciarJuego);
  botonReiniciar2.addEventListener("click", reiniciarJuego);

  edicionJugadorPPT();
}

function edicionJugadorPPT() {
  let emojiElementoDelJugador;
  let picJ;
  let configuracionDeCarta = document.getElementById("ContenidoTuyo");
  let contenidoTuyoImg = document.getElementById("contenidoTuyoimg");
  let colorBackground = document.getElementById("contenidoTuyo");

  NinjaJugador = ninjaBlack1.nombre;
  emojiElementoDelJugador = ninjaBlack1.emoji;
  picJ = ninjaBlack1.foto;
  cambioVidasScoreJ.innerHTML = 3;
  configuracionDeCarta.style.backgroundImage =
    "url(./img/gemaSombra.webp)";
  configuracionDeCarta.style.backgroundSize = "197px 235px";
  configuracionDeCarta.style.backgroundColor = "rgb(255 255 255)";
  configuracionDeCarta.style.boxShadow = "rgb(255 255 255) 0px 0px 20px 2px";
  configuracionDeCarta.style.marginBottom = "12px";
  configuracionDeCarta.style.border = "12px solid rgb(0 0 0)";
  configuracionDeCarta.style.color = "aliceblue";
  contenidoTuyoImg.style.marginTop = "29px";
  contenidoTuyoImg.style.width = "202px";
  colorBackground.style.backgroundColor = "rgb(0 0 0)";

  document.getElementById("contenidoTuyoimg").src = picJ;
  document.getElementById("emojiDeLaCardJugador").src = emojiElementoDelJugador;

  //Verificacion para los ataques
  if (!(emojiElementoDelJugador == "")) {
    extraerAtaquesPPT(NinjaJugador);
    edicionRivalPPT();
    return (isSelected = true);
  }
  return (isSelected = false);
}
function extraerAtaquesPPT(NinjaJugador) {
  let ataquesNinjasPPT;
  for (let i = 0; i < ninjasPPT.length; i++) {
    if (NinjaJugador === ninjasPPT[i].nombre) {
      ataquesNinjasPPT = ninjasPPT[i].ataquesPPT;
    }
  }
  mostrarAtaquesPPT(ataquesNinjasPPT);
}
function mostrarAtaquesPPT(ataquesNinjasPPT) {
  contenedorAtaques.style.justifyContent = "center";
  contenedorAtaques.style.flexDirection = "column";
  contenedorAtaques.style.width = "auto";

  ataquesNinjasPPT.forEach((ataquesNinjasPPT) => {
    ataquesNinjaJugador = `
        <button id=${ataquesNinjasPPT.id} class="boton-de-Ataque BAtaques" type="button">${ataquesNinjasPPT.nombre} <img src=${ataquesNinjasPPT.img} alt="medallon"></button>
        `;
    contenedorAtaques.innerHTML += ataquesNinjaJugador;
  });
  botones = document.querySelectorAll(".BAtaques");
}

//agregar la visualizacion del Rival para el modo PPT
function edicionRivalPPT() {
  let ElementoAleatorio = aleatorio(0, ninjasPPT.length - 1);
  let picR;
  let emojiElementoDelRival;
  let configuracionDeCartaRival = document.getElementById("ContenidoDelRival");
  let backgroundColorRival = document.getElementById("contenidoDelRival");
  let ContenidoRivalimg = document.getElementById("contenidoDelRivalimg");
  emojiElementoDelRival = ninjaBlack2.emoji;
  picR = ninjaBlack2.foto;
  cambioVidasScoreR.innerHTML = 3;
  configuracionDeCartaRival.style.backgroundImage =
    "url(./img/gemaSombra.webp)";
  backgroundColorRival.style.backgroundSize = "197px 235px";
  backgroundColorRival.style.backgroundColor = "rgb(0 0 0)";
  configuracionDeCartaRival.style.backgroundColor = "rgb(255 255 255)";
  configuracionDeCartaRival.style.boxShadow =
    "rgb(254, 25, 25) 0px 0px 20px 2px";
  configuracionDeCartaRival.style.color = "aliceblue";
  configuracionDeCartaRival.style.marginBottom = "21px";
  configuracionDeCartaRival.style.border = "12px solid rgb(0 0 0)";
  ContenidoRivalimg.style.marginTop = "46px";
  ContenidoRivalimg.style.width = "206px";

  document.getElementById("contenidoDelRivalimg").src = picR;
  document.getElementById("emojiDeLaCardRival").src = emojiElementoDelRival;
  AtaquesNinjaRival = ninjasPPT[ElementoAleatorio].ataquesPPT;
  subtituloCombate.style.width = "194px";
  ataqueJugadorPPT();
}

// revisar como que es a detalele
function ataqueJugadorPPT() {
  let innerEspada = document.getElementById("cajaMensajes");
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "Agua ") {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 3;
        emojiAtaqueJugador = AGUA;
        emojiAtaqueRival = "./img/cartas.webp";
        ataqueJugadorPPT = "⚔️";

        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("cartaJugador").src =
          emojiAtaqueJugador;
        document.getElementById("cartaRival").src = emojiAtaqueRival;
      } else if (e.target.textContent === "Fuego ") {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 2;
        emojiAtaqueJugador = FUEGO;
        emojiAtaqueRival = "./img/cartas.webp";
        ataqueJugadorPPT = "⚔️";
        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("cartaJugador").src =
          emojiAtaqueJugador;
        document.getElementById("cartaRival").src = emojiAtaqueRival;
      } else {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 1;
        emojiAtaqueJugador = NIEVE;
        emojiAtaqueRival = "./img/cartas.webp";
        ataqueJugadorPPT = "⚔️";

        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("cartaJugador").src =
          emojiAtaqueJugador;
        document.getElementById("cartaRival").src = emojiAtaqueRival;
      }
      iniciarPeleaPPT();
    });
  });
}
// Logica detras del resultado de los enfrentamientos PPT
function encuentroPPT() {
  confirmarCarta.style.pointerEvents = "none";
  confirmarCarta.style.opacity = "0";
  ataquealeatorio = aleatorio(0, AtaquesNinjaRival.length - 1);
  if (ataquealeatorio == 2) {
    emojiAtaqueRival = FUEGO;
    actualAtaqueRival = 2;
  } else if (ataquealeatorio == 3) {
    emojiAtaqueRival = AGUA;
    actualAtaqueRival = 3;
  } else {
    emojiAtaqueRival = NIEVE;
    actualAtaqueRival = 1;
  }
  console.log(seleccionJugador, actualAtaqueRival);
  document.getElementById("cartaRival").src = emojiAtaqueRival;
  resultadosPPT();
}
// Logica que dicta el vencedor PPT
function resultadosPPT() {
  let cajaEnfrentamiento = document.getElementById("enfrentamiento");
  let contenidoTuyoColor = document.getElementById("contenidoTuyo");
  let contenidoRivalColor = document.getElementById("contenidoDelRival");
  if (seleccionJugador == actualAtaqueRival) {
    resultado = " EMPATE ";
    cajaEnfrentamiento.style.background = "#f3dc0d";
  } else if (
    (seleccionJugador == 2 && actualAtaqueRival == 3) ||
    (seleccionJugador == 3 && actualAtaqueRival == 1) ||
    (seleccionJugador == 1 && actualAtaqueRival == 2)
  ) {
    vidasJugador--;
    cambioVidasScoreJ.innerHTML = vidasJugador;
    resultado = " PERDISTES ";
    cajaEnfrentamiento.style.background = "#ff2929";
    cajaEnfrentamiento.style.border = "solid black";
    contenidoTuyoColor.style.color = "red";
    contenidoRivalColor.style.color = "white";
  } else {
    vidasRival--;
    cambioVidasScoreR.innerHTML = vidasRival;
    resultado = " GANASTES ";
    cajaEnfrentamiento.style.background = "#5cd93d";
    cajaEnfrentamiento.style.border = "solid white";
    contenidoTuyoColor.style.color = "white";
    contenidoRivalColor.style.color = "red";
  }
  revisarVidas();
  crearMensajesPPT();
}

//Revisar vida PPT, se requiere revision inmediata
function revisarVidas() {
  let configuracionDeCarta = document.getElementById("ContenidoTuyo");
  let configuracionDeCartaRival = document.getElementById("ContenidoDelRival");
  let cajaMensajes = document.getElementById("mensajes2");
  if (vidasJugador == 0) {
    crearMesajeFinalPPT("Lo Siento has Perdido, vuelve a intentarlo");
    desabilitarBotonesCombates();
    cajaMensajes.style.background = "#7f4d5a";
    cajaMensajes.style.fontSize = "11mm";
    cajaMensajes.style.boxShadow = "rgb(147 62 84) 0px 0px 20px 5px";
    configuracionDeCarta.style.opacity = "0";
    contenedorAtaques.style.opacity = "0";
    contenedorAtaques.style.pointerEvents = "none";
  } else if (vidasRival == 0) {
    crearMesajeFinalPPT(
      "¡¡Felicidades Has Ganado!! Quieres seguir con tu racha? vuelve a intentarlo"
    );
    desabilitarBotonesCombates();
    cajaMensajes.style.background = "#FFEB3B";
    cajaMensajes.style.boxShadow = "rgb(255 232 53) 0px 0px 20px 5px";
    configuracionDeCartaRival.style.opacity = "0";
    contenedorAtaques.style.opacity = "0";
    contenedorAtaques.style.pointerEvents = "none";
  }
}
function crearMensajesPPT() {
  let resultadoMensaje = document.getElementById("cajaMensajes");
  let divemojiAtaqueJugador = document.getElementById("cartaJugador");
  let divemojiAtaqueRival = document.getElementById("cartaRival");

  resultadoMensaje.innerHTML = resultado;
  divemojiAtaqueJugador.innerHTML = emojiAtaqueJugador;
  divemojiAtaqueRival.innerHTML = emojiAtaqueRival;
}
function crearMesajeFinalPPT(resultadoFinal) {
  let sectionResultadoFinal = document.getElementById("mensajes2");
  let parrafo2 = document.createElement("p");
  divReiniciarPPT.style.marginTop = "0px";

  parrafo2.innerHTML = resultadoFinal;

  sectionResultadoFinal.appendChild(parrafo2);
}

function modoClassic() {
  sectionSeleccionarAtaques.style.display = "none";
  sectionSeleccionarModo.style.display = "none";

  divReiniciarPPT.style.display = "flex";
  divReiniciarClassic.style.display = "flex";
  sectionSeleccionarElementoJugador.style.display = "flex";
  ninjasElementales.forEach((Ninjas) => {
    opcionDeNinjas = `
        <input type="radio" id=${Ninjas.nombre} name="Seleccion" value="Seleccion">
        <label class= ${Ninjas.clase} id=${Ninjas.Ide} for=${Ninjas.nombre}>${Ninjas.nombre}
        <img src=${Ninjas.foto} class=${Ninjas.claseFoto}></label>
        `;
    contenedorPersonajes.innerHTML += opcionDeNinjas;
  });

  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);

  openBotones.addEventListener("click", abrirBotonesElementales);
  botonConfirmarCarta.addEventListener("click", resultados);

  botonTutorial.addEventListener("click", popTutorial);

  inputcheckedAgua = document.getElementById("NinjaAgua");
  inputcheckedNieve = document.getElementById("NinjaNieve");
  inputcheckedFuego = document.getElementById("NinjaFuego");

  inputcheckedAgua.addEventListener("click", comprobarInputs);
  inputcheckedNieve.addEventListener("click", comprobarInputs);
  inputcheckedFuego.addEventListener("click", comprobarInputs);

  botonReiniciar1.addEventListener("click", reiniciarJuego);
  botonReiniciar2.addEventListener("click", reiniciarClassic);

  unirseAlJuego();

  //Metodo para impedir pasar a la siguiente parte sin ninja
  botonElementoJugador.addEventListener("click", function () {
    if (!comprobarInputs()) {
      alert("Por favor selecciona a algun ninja");
    } else {
      seleccionarElementoJugador();
    }
  });
}

function unirseAlJuego() {
  fetch("http://192.168.0.105:3000/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function comprobarInputs() {
  if (
    inputcheckedAgua.checked ||
    inputcheckedNieve.checked ||
    inputcheckedFuego.checked
  ) {
    botonElementoJugador.style.opacity = "1";
    return true;
  } else {
    botonElementoJugador.style.opacity = "0.5";
  }
}

function popTutorial() {
  let close = document.getElementById("close");
  close.addEventListener("click", popTutorialClose);
  popupDelTutorial.style.opacity = "1";
  popupDelTutorial.style.pointerEvents = "auto";
}
function popTutorialClose() {
  popupDelTutorial.style.opacity = "0";
  popupDelTutorial.style.pointerEvents = "none";
  botonTutorial.style.position = "absolute";
}

// Seleccion Elemento del Jugador
function seleccionarElementoJugador() {
  sectionTutorial.style.display = "none";
  sectionVerMapa.style.display = "flex";
  sectionSeleccionarAtaques.style.display = "none";
  sectionSeleccionarElementoJugador.style.display = "none";

// Inicia el intervalo para refrescar el canvas
  intervaloBoleanoMapa = setInterval(pintarCanvas, 50);
  botonTutorial.style.display = "none";
  divReiniciarPPT.style.display = "flex";

  let emojiElementoDelJugador;
  let pic;
  let configuracionDeCarta = document.getElementById("ContenidoTuyo");
  let contenidoTuyoImg = document.getElementById("contenidoTuyoimg");
  let colorBackground = document.getElementById("contenidoTuyo");

  //if de la Elemento del jugador e insercion de la imagen del Jugador
  if (inputcheckedAgua.checked) {
    NinjaJugador = ninjaAgua.nombre;
    emojiElementoDelJugador = "./img/emojiDeAgua.png";
    pic = "./img/ninjaDeAguaHover.webp";
    configuracionDeCarta.style.backgroundImage =
      "url(./img/gemaDeAguaShiny.webp)";
    configuracionDeCarta.style.backgroundColor = "#0373f4";
    configuracionDeCarta.style.boxShadow = "0px 0px 20px 2px rgb(34 133 179)";
    configuracionDeCarta.style.marginBottom = "12px";
  } else if (inputcheckedNieve.checked) {
    NinjaJugador = ninjaNieve.nombre;
    emojiElementoDelJugador = "./img/emojiDeNieve.webp";
    pic = "./img/ninjaDeNieveHover.webp";
    configuracionDeCarta.style.backgroundImage =
      "url(./img/gemaDeNieveShiny.webp)";
    configuracionDeCarta.style.backgroundColor = "rgb(170 162 239);";
    configuracionDeCarta.style.boxShadow = "0px 0px 20px 2px rgb(168 174 249)";
    configuracionDeCarta.style.marginBottom = "20px";
    configuracionDeCarta.style.border = "12px solid #a59acb";
    contenidoTuyoImg.style.marginTop = "38px";
    contenidoTuyoImg.style.width = "238px";
    contenidoTuyoImg.style.paddingLeft = "0px";
    colorBackground.style.backgroundColor = "#a59acb";
  } else if (inputcheckedFuego.checked) {
    NinjaJugador = ninjaFuego.nombre;
    emojiElementoDelJugador = "./img/emojiDeFuego.webp";
    pic = "./img/ninjaDeFuegoHover.webp";
    configuracionDeCarta.style.backgroundImage =
      "url(./img/gemaDeFuegoShiny.webp)";
    configuracionDeCarta.style.backgroundColor = "rgb(254 194 25)";
    configuracionDeCarta.style.boxShadow = " 0px 0px 20px 2px rgb(255 144 58)";
    configuracionDeCarta.style.marginBottom = "12px";
    configuracionDeCarta.style.border = "12px solid rgb(243, 220, 13)";
    contenidoTuyoImg.style.marginTop = "5px";
    contenidoTuyoImg.style.width = "278px";
    colorBackground.style.backgroundColor = "rgb(243, 220, 13)";
  }

  cambioVidasScoreJ.innerHTML = ninjaBlack1.vida;
  document.getElementById("contenidoTuyoimg").src = pic;
  document.getElementById("emojiDeLaCardJugador").src = emojiElementoDelJugador;
  seleccionarNinjaBack(NinjaJugador);

  //Verificacion para los ataques
  if (!(emojiElementoDelJugador == "")) {
    extraerAtaquesClassic(NinjaJugador);
    return (isSelected = true);
  }
  return (isSelected = false);
}

function seleccionarNinjaBack(NinjaJugador) {
  fetch(`http://192.168.0.105:3000/cardJitsu/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ninja: NinjaJugador,
    }),
  });
}

function reiniciarClassic() {
  sectionTutorial.style.display = "none";
  sectionVerMapa.style.display = "flex";
  sectionSeleccionarAtaques.style.display = "none";
  sectionSeleccionarElementoJugador.style.display = "none";

  botonTutorial.style.display = "none";
  divReiniciarPPT.style.display = "flex";

  ninjaCanvas.enCombate = false

  extraerAtaquesClassic(NinjaJugador);
  backToCanvas(NinjaJugador)
}


function backToCanvas(NinjaJugador) {
  fetch(`http://192.168.0.105:3000/cardJitsu/volver/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ninja: NinjaJugador,
    }),
  });
}



function extraerAtaquesClassic(NinjaJugador) {
  let ataquesNinja;
  for (let i = 0; i < ninjasElementales.length; i++) {
    if (NinjaJugador === ninjasElementales[i].nombre) {
      ataquesNinja = ninjasElementales[i].ataques;
    }
  } 
  mostrarAtaquesClassic(ataquesNinja);
}

function mostrarAtaquesClassic(ataquesNinja) {
  ataquesNinja.forEach((ataquesNinja) => {
    ataquesNinjaJugador = `
      <button id="${ataquesNinja.id}" class="cartasBotones" type="button" data-color="${ataquesNinja.color}" data-numero="${ataquesNinja.numero}"><img src="${ataquesNinja.img}" alt="Cards">
      </button>
    `;
    contenedorAtaques.innerHTML += ataquesNinjaJugador;
  });
  
  botones = document.querySelectorAll(".cartasBotones");
  secuenciaAtaqueClassic();
}

function slide() {
  //hacemos visible el div
  document.getElementById("imagenTutorial").classList.toggle("abierto");
}

//Seleccion de la Elemento del rival e insercion de su imagen
function selecionarElementoRival(rival) {
  let pic;
  let emojiElementoDelRival;
  let configuracionDeCartaRival = document.getElementById("ContenidoDelRival");
  let backgroundColorRival = document.getElementById("contenidoDelRival");
  let ContenidoRivalimg = document.getElementById("contenidoDelRivalimg");

  if (rival.nombre == "NinjaAgua") {
    emojiElementoDelRival = "./img/emojiDeAgua.png";
    pic = "./img/ninjaDeAguaHover.webp";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./img/gemaDeAguaShiny.webp)";
    configuracionDeCartaRival.style.backgroundColor = "#0373f4";
    configuracionDeCartaRival.style.boxShadow =
      "rgb(254 25 25) 0px 0px 20px 2px";
    configuracionDeCartaRival.style.marginBottom = "27px";
    AtaquesNinjaRival = ninjaAgua.ataques;
  } else if (rival.nombre == "NinjaNieve") {
    emojiElementoDelRival = "./img/emojiDeNieve.webp";
    pic = "./img/ninjaDeNieveHover.webp";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./img/gemaDeNieveShiny.webp)";
    configuracionDeCartaRival.style.backgroundColor = "rgb(170 162 239);";
    backgroundColorRival.style.backgroundColor = "#a59acb";
    configuracionDeCartaRival.style.boxShadow =
      "rgb(254 25 25) 0px 0px 20px 2px";
    configuracionDeCartaRival.style.marginBottom = "13px";
    configuracionDeCartaRival.style.border = "12px solid #a59acb";
    AtaquesNinjaRival = ninjaNieve.ataques;
  } else {
    emojiElementoDelRival = "./img/emojiDeFuego.webp";
    pic = "./img/ninjaDeFuegoHover.webp";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./img/gemaDeFuegoShiny.webp)";
    backgroundColorRival.style.backgroundColor = "rgb(243, 220, 13)";
    configuracionDeCartaRival.style.backgroundColor = "rgb(254 194 25)";
    configuracionDeCartaRival.style.boxShadow =
      "rgb(254 25 25) 0px 0px 20px 2px";
    configuracionDeCartaRival.style.marginBottom = "21px";
    configuracionDeCartaRival.style.border = "12px solid rgb(243, 220, 13)";
    ContenidoRivalimg.style.marginTop = "5px";
    ContenidoRivalimg.style.width = "278px";
    AtaquesNinjaRival = ninjaFuego.ataques;
  }

  cambioVidasScoreR.innerHTML = ninjaBlack1.vida;
  document.getElementById("contenidoDelRivalimg").src = pic;
  document.getElementById("emojiDeLaCardRival").src = emojiElementoDelRival;
}

//Funciones de los ataques del jugador y rival
function abrirBotonesElementales() {
  if (contenedorAtaques.style.opacity === "1") {
    // Si el rectángulo está visible, cambiar su opacity a 0
    contenedorAtaques.style.opacity = "0";
    contenedorAtaques.style.pointerEvents = "none";
    openBotones.setAttribute("data-text", "👇");
  } else {
    // Si el rectángulo está oculto, cambiar su opacity a 1
    openBotones.setAttribute("data-text", "☝");
    contenedorAtaques.style.opacity = "1";
    contenedorAtaques.style.pointerEvents = "all";
  }
}

/* Funcion que se encarga al momento de escoger una carta en el modo Classic*/
function secuenciaAtaqueClassic() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        let numero = e.target.dataset.numero
        let numeroReal = parseInt(numero, 10)
        let color = e.target.dataset.color
        let id = e.target.id
        // Accede a la imagen dentro del botón
        const imagen = e.target.querySelector('img');
        imgCartaJugador = imagen.src; // Accede al atributo "src" de la img
        manoDelJugador = [id, numeroReal, color]
        console.log(manoDelJugador);
     
        // Elimina la carta seleccionada del DOM
        e.target.remove();

        // Hacer logica para que solo se pueda escoger 1 carta
        contenedorAtaques.style.opacity = "0";
        contenedorAtaques.style.pointerEvents = "none";
        enviarAtaques();
    });
  });
}

function enviarAtaques() {
  fetch(`http://192.168.0.105:3000/cardJitsu/${jugadorId}/carta`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carta: manoDelJugador,
      imgCarta: imgCartaJugador,
    }),
  });
  desabilitarBotonesCombates()
  intervaloCombate = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.0.105:3000/cardJitsu/${enemigoId}/carta`).then(
    function (res) {
      if (res.ok) {
        res.json().then(function ({ carta, imgCarta }) {
          if (carta.length === 3) {  
            cartaDelRival = carta;
            imgCartaRival = imgCarta;
            if (imgArbitaria !== imgCartaRival || imgArbitaria === null) {
              if (!ejecutado) {
                ejecutado = true;       
                setTimeout(iniciarPelea, 2000); // Llama a iniciarPelea después de 5 segundos
              }
            }
          }
        });
      }
    }
  );
}
function iniciarPelea() {
  confirmarCarta.style.pointerEvents = "all";
  confirmarCarta.style.opacity = "1";

}
function iniciarPeleaPPT() {
  confirmarCarta.style.pointerEvents = "all";
  confirmarCarta.style.opacity = "1";
}

//Comparacion de los ataques selecionados y el resultado del enfrentamiento (1 es nieve, 2 es fuego y 3 es agua).
function resultados() {
  let imagenCartaBorrarJ = document.getElementById("cartaJugador");
  let imagenCartaBorrarR = document.getElementById("cartaRival");

  emojisDelJugador.removeChild(imagenCartaBorrarJ);
  emojisDelRival.removeChild(imagenCartaBorrarR);

  confirmarCarta.style.pointerEvents = "none";
  confirmarCarta.style.opacity = "0";

  resultadoMensaje.innerHTML = "";

  let contenidoTuyoColor = document.getElementById("contenidoTuyo");
  let contenidoRivalColor = document.getElementById("contenidoDelRival");

/* Fase de comparacion de cartas*/  
  //Si ambas cartas tienen el mismo elemento se comparara el valor numerico, si no se determinara por el elemento quien gana
  
  if (manoDelJugador[0] === cartaDelRival[0]) {
    // Los elementos son iguales, compara los números
    if (manoDelJugador[1] > cartaDelRival[1]) /*Gana el Jugador por numeros*/{
      vidasRival--;
      cambioVidasScoreR.innerHTML = vidasRival;
      resultado = " GANASTES ";
      cajaEnfrentamiento.style.background = "#5cd93d";
      cajaEnfrentamiento.style.border = "solid white";
      contenidoTuyoColor.style.color = "white";
      contenidoRivalColor.style.color = "red";
      crearMensajes()
    } else if (manoDelJugador[1] < cartaDelRival[1])/*Gana el Rival por numeros*/  {
      vidasJugador--;
      cambioVidasScoreJ.innerHTML = vidasJugador;
      resultado = " PERDISTES ";
      cajaEnfrentamiento.style.background = "#ff2929";
      cajaEnfrentamiento.style.border = "solid black";
      contenidoTuyoColor.style.color = "red";
      contenidoRivalColor.style.color = "white";    
      crearMensajes()
    } else {
      resultado = " EMPATE ";
      cajaEnfrentamiento.style.background = "#f3dc0d";
      crearMensajes()
    }
  // Los elementos son diferentes, el ganador se decide según el elemento
  } else if (
    (cartaDelRival[0] == "carta-Fuego" && manoDelJugador[0] == "carta-Agua") ||
    (cartaDelRival[0] == "carta-Agua" && manoDelJugador[0] == "carta-Nieve") ||
    (cartaDelRival[0] == "carta-Nieve" && manoDelJugador[0] == "carta-Fuego")) 
    { //Gana el Jugador por su Elemento
      vidasRival--;
      cambioVidasScoreR.innerHTML = vidasRival;
      resultado = " GANASTES ";
      cajaEnfrentamiento.style.background = "#5cd93d";
      cajaEnfrentamiento.style.border = "solid white";
      contenidoTuyoColor.style.color = "white";
      contenidoRivalColor.style.color = "red";
      crearMensajes()
  } else { //Gana el Rival por su Elemento
      vidasJugador--;
      cambioVidasScoreJ.innerHTML = vidasJugador;
      resultado = " PERDISTES ";
      cajaEnfrentamiento.style.background = "#ff2929";
      cajaEnfrentamiento.style.border = "solid black";
      contenidoTuyoColor.style.color = "White";
      contenidoRivalColor.style.color = "white";
      crearMensajes()
  }
  ejecutado = false
  imgArbitaria = imgCartaRival;
  clearInterval(intervaloCombate)
  setTimeout(habilitarBotonesCombates, 3000)
  revisarVidas();
}

function crearMensajes() {
  let nuevaImgCartaJugador = document.createElement("img");
  let nuevaImgCartaEnemigo = document.createElement("img");
  let resultadosLista = document.createElement("strong");

  resultadosLista.innerHTML = resultado;
  resultadosLista.setAttribute("id", "cajaMensajes");
  nuevaImgCartaJugador.setAttribute("src", imgCartaJugador);
  nuevaImgCartaJugador.setAttribute("id", "cartaJugador");
  nuevaImgCartaEnemigo.setAttribute("src", imgCartaRival);
  nuevaImgCartaEnemigo.setAttribute("id", "cartaRival");

  resultadoMensaje.appendChild(resultadosLista);
  emojisDelJugador.appendChild(nuevaImgCartaJugador);
  emojisDelRival.appendChild(nuevaImgCartaEnemigo);
}

function reiniciarJuego() {
  location.reload();
}


//desabilitaciones de botones&Elemento
function desabilitarBotonesCombates() {
  openBotones.style.opacity = "0.5";
  openBotones.style.pointerEvents = "none";
  contenedorPersonajes.style.opacity = "0.5";
}function habilitarBotonesCombates() {
  openBotones.style.opacity = "1";
  openBotones.style.pointerEvents = "all";
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


//prueba de canvas
function pintarCanvas() {
  subtituloCombate.style.marginBottom = "0px";
  subtituloCombate.style.fontSize = "14mm";
  subtituloCombate.style.height = "auto";
  subtituloCombate.style.padding = "4px";

  ninjaCanvas = obtenerNinja(ninjasElementales);
  ninjaCanvas.id = jugadorId

  ninjaCanvas.x = ninjaCanvas.x + ninjaCanvas.velocidadX;
  ninjaCanvas.y = ninjaCanvas.y + ninjaCanvas.velocidadY;
  ninjaCanvas.enCombate = ninjaCanvas.enCombate

  lienzo.clearRect(0, 0, mapa.width, mapa.height);

  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  ninjaCanvas.pintarNinjas();
  enviarPosicion(ninjaCanvas.x, ninjaCanvas.y, ninjaCanvas.enCombate);

  ninjasElementalesRivales.forEach(function (ninja) {
    if (ninja != undefined) {
      ninja.pintarNinjas();
      revisarColision(ninja);
    }
  });
}

function enviarPosicion(x, y, enCombate) {
  fetch(`http://192.168.0.105:3000/cardJitsu/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
      enCombate
    }),
  }).then(function (res) {
    if (res.ok)
      res.json().then(function ({ enemigos }) {
        ninjasElementalesRivales = enemigos.map(function (rival) {
          if (rival.ninja != undefined) {
            let ninjaRival = null;
            let algo = rival.ninja.nombre || "";
            const ninjaNombre = algo;
            if (ninjaNombre === "NinjaAgua") {
              ninjaRival = new Ninjas(
                "NinjaAgua",
                "./img/ninjaDeAgua.webp",
                "",
                "",
                3,
                "",
                "./img/emojiNinjaAgua.webp",
                null,
                rival.id
              );
            } else if (ninjaNombre === "NinjaFuego") {
              ninjaRival = new Ninjas(
                "NinjaFuego",
                "./img/ninjaDeFuego.webp",
                "",
                "",
                3,
                "",
                "./img/emojiNinjaFuego.webp",
                null,
                rival.id
              );
            } else if (ninjaNombre === "NinjaNieve") {
              ninjaRival = new Ninjas(
                "NinjaNieve",
                "./img/ninjaDeNieve.webp",
                "",
                "",
                3,
                "",
                "./img/emojiNinjaNieve.webp",
                null,
                rival.id
              );
            }
            ninjaRival.x = rival.x || 0;
            ninjaRival.y = rival.y || 0;
            ninjaRival.enCombate = rival.enCombate
            return ninjaRival;
          }
        });
      });
  });
}


function moverDerecha() {
  ninjaCanvas.velocidadX = 5;
}
function moverIzquierda() {
  ninjaCanvas.velocidadX = -5;
}
function moverArriba() {
  ninjaCanvas.velocidadY = -5;
}
function moverAbajo() {
  ninjaCanvas.velocidadY = 5;
}
function detenerMovimiento(event) {
  switch (event.key) {
    case "d":
      ninjaCanvas.velocidadX = 0;
      break;

    case "a":
      ninjaCanvas.velocidadX = 0;
      break;

    case "w":
      ninjaCanvas.velocidadY = 0;
      break;

    case "s":
      ninjaCanvas.velocidadY = 0;
      break;
    default:
      break;
  }
}
function detenerMovimientoBotones() {
  ninjaCanvas.velocidadX = 0;
  ninjaCanvas.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "d":
      moverDerecha();
      break;

    case "a":
      moverIzquierda();
      break;

    case "w":
      moverArriba();
      break;

    case "s":
      moverAbajo();
      break;
    default:
      break;
  }
}

function obtenerNinja() {
  for (let i = 0; i < ninjasElementales.length; i++) {
    if (NinjaJugador === ninjasElementales[i].nombre) {
      return ninjasElementales[i];
    }
  }
}
function colision() {
  ninjaCanvas.velocidadX = 0;
  ninjaCanvas.velocidadY = 0;
  ninjaCanvas.enCombate = true
}
function revisarColision(rival) {
  const arribaRival = rival.y;
  const abajoRival = rival.y + rival.alto;
  const derechaRival = rival.x + rival.ancho;
  const izquierdaRival = rival.x;

  const arribaNinja = ninjaCanvas.y;
  const abajoNinja = ninjaCanvas.y + ninjaCanvas.alto;
  const derechaNinja = ninjaCanvas.x + ninjaCanvas.ancho;
  const izquierdaNinja = ninjaCanvas.x;

  if (
    abajoNinja < arribaRival ||
    arribaNinja > abajoRival ||
    derechaNinja < izquierdaRival ||
    izquierdaNinja > derechaRival
  ) {
    return;
  }
  colision();
  enemigoId = rival.id;
  sectionSeleccionarAtaques.style.display = "flex";
  sectionVerMapa.style.display = "none";
  selecionarElementoRival(rival);
}



// También escucha el evento 'resize' para ajustar las imágenes si cambia el tamaño de la ventana
// Llama a la función al cargar la página
window.addEventListener("load", iniciarJuego);
