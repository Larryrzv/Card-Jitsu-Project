/* Seleccion.js es de la rama platzi a la que migrare */

/* Constantes Globales */
// Divs y Sections
const sectionSeleccionarModo = document.getElementById("seleccionarModo");
const sectionSeleccionarAtaques = document.getElementById(
  "seleccionar-ataques"
);emojiAbrirCartas
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
const botonTutorial = document.getElementById("open");
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
let AGUA = "./resources/simboloDeAgua.png";
let FUEGO = "./resources/simboloDeFuego.png";
let NIEVE = "./resources/simboloDeNieve.png";
let ninjasElementales = [];
let ninjasElementalesRivales = [];
let botonesElementales = [];
let isSelected = false;
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
let botones = [];
let inputcheckedAgua;
let inputcheckedNieve;
let inputcheckedFuego;
let ataquedelJugador = [];
let ataqueDelRival = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let AtaquesNinjaRival;
let indexEmojiJugador;
let indexEmojiRival;
let ninjaCanvas;
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./resources/mapaCanvas.png";


let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 40;
const anchoMaximoDelMapa = 1150;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa;
}
alturaQueBuscamos = (anchoDelMapa * 400) / 900;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

let lienzo = mapa.getContext("2d");

// Clases
class Ninjas {
  constructor(nombre, foto, Ide, clase, vida, claseFoto, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.Ide = Ide;
    this.clase = clase;
    this.vida = vida;
    this.claseFoto = claseFoto;
    this.ataques = [];
    this.ancho = (mapa.width * 50) / 900;
    this.alto = (mapa.width * 50) / 900;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarNinjas() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}
let ninjaAgua = new Ninjas(
  "NinjaAgua",
  "./resources/ninjaDeAgua.png",
  "tarjetaDeAgua",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./resources/emojiNinjaAgua.png"
);
let ninjaFuego = new Ninjas(
  "NinjaFuego",
  "./resources/ninjaDeFuego.png",
  "tarjetaDeFuego",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./resources/emojiNinjaFuego.png"
);
let ninjaNieve = new Ninjas(
  "NinjaNieve",
  "./resources/ninjaDeNieve.png",
  "tarjetaDeNieve",
  "tarjetaComunNinja",
  3,
  "imagenDinamica",
  "./resources/emojiNinjaNieve.png"
);

// Lista de Ataques de los ninjas Classic
const ninjaAguaAtaques = [
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
];
const ninjaFuegoAtaques = [
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
];
const ninjaNieveAtaques = [
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" },
];

ninjaAgua.ataques.push(...ninjaAguaAtaques);
ninjaFuego.ataques.push(...ninjaFuegoAtaques);
ninjaNieve.ataques.push(...ninjaNieveAtaques);

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
  "./resources/ninjaComun1.png",
  "./resources/emojiSombra.png",
  "tarjetaJugador",
  3
);
let ninjaBlack2 = new NinjasPPT(
  "Rival",
  "./resources/ninja2.png",
  "./resources/emojiSombra.png",
  "tarjetaRival",
  3
);
// Lista de Ataques de los ninjas PPT
ninjaBlack1.ataquesPPT.push(
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" }
);
ninjaBlack2.ataquesPPT.push(
  { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png" },
  { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png" },
  { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png" }
);

ninjasElementales.push(ninjaAgua, ninjaFuego, ninjaNieve);
ninjasPPT.push(ninjaBlack1, ninjaBlack2);

// Al Iniciar Juego
function iniciarJuego() {
  sectionSeleccionarAtaques.style.display = "none";
  sectionVerMapa.style.display = "none";
  divReiniciarClassic.style.display = "none";
  divReiniciarPPT.style.display = "none";
  sectionSeleccionarElementoJugador.style.display = "none";

  botonPPT.addEventListener("click", modoPPT);
  /* comentado hasta terminar el modo classic */
  botonClassic.addEventListener("click", modoClassic);
  botonTutorial.addEventListener("click", popTutorial);
}

// Modo de juego PPT, se requiere revision
function modoPPT() {
  sectionSeleccionarAtaques.style.display = "flex";
  sectionSeleccionarModo.style.display = "none";

  divReiniciarPPT.style.display = "flex";

  openBotones.addEventListener("click", abrirBotonesElementales);
  botonConfirmarCarta.addEventListener("click", encuentro);

  botonReiniciar1.addEventListener("click", reiniciarJuego);
  botonReiniciar2.addEventListener("click", reiniciarJuego);

  edicionJugadorPPT();
}

//agregar la visualizacion del jugador para el modo PPT
function edicionJugadorPPT() {
  let emojiElementoDelJugador;
  let picJ;
  let configuracionDeCarta = document.getElementById("ContenidoTuyo");
  let contenidoTuyoImg = document.getElementById("contenidoTuyoimg");
  let colorBackground = document.getElementById("contenidoTuyo");

  NinjaJugador = ninjaBlack1.nombre;
  emojiElementoDelJugador = ninjaBlack1.emoji;
  picJ = ninjaBlack1.foto;
  cambioVidasScoreJ.innerHTML = ninjaBlack1.vida;
  configuracionDeCarta.style.backgroundImage =
    "url(./resources/gemaSombra.png)";
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
  cambioVidasScoreR.innerHTML = ninjaBlack2.vida;
  configuracionDeCartaRival.style.backgroundImage =
    "url(./resources/gemaSombra.png)";
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
        emojiAtaqueRival = "./resources/cartas.png";
        ataqueJugadorPPT = "⚔️";

        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("ataqueElementalJugador").src =
          emojiAtaqueJugador;
        document.getElementById("ataqueElementalRival").src = emojiAtaqueRival;
      } else if (e.target.textContent === "Fuego ") {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 2;
        emojiAtaqueJugador = FUEGO;
        emojiAtaqueRival = "./resources/cartas.png";
        ataqueJugadorPPT = "⚔️";
        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("ataqueElementalJugador").src =
          emojiAtaqueJugador;
        document.getElementById("ataqueElementalRival").src = emojiAtaqueRival;
      } else {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 1;
        emojiAtaqueJugador = NIEVE;
        emojiAtaqueRival = "./resources/cartas.png";
        ataqueJugadorPPT = "⚔️";

        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("ataqueElementalJugador").src =
          emojiAtaqueJugador;
        document.getElementById("ataqueElementalRival").src = emojiAtaqueRival;
      }
      iniciarPelea();
    });
  });
}
// Logica detras del resultado de los enfrentamientos PPT
function encuentro() {
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
  document.getElementById("ataqueElementalRival").src = emojiAtaqueRival;
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
  let divemojiAtaqueJugador = document.getElementById("ataqueElementalJugador");
  let divemojiAtaqueRival = document.getElementById("ataqueElementalRival");

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
  botonReiniciar2.addEventListener("click", reiniciarJuego);

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
  fetch("http://192.168.0.104:8080/unirse").then(function (res) {
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
  let popupDelTutorial = document.getElementById("cajaTutorial");
  let close = document.getElementById("close");
  close.addEventListener("click", popTutorialClose);
  popupDelTutorial.style.opacity = "1";
  popupDelTutorial.style.pointerEvents = "auto";
}
function popTutorialClose() {
  let popupDelTutorial = document.getElementById("cajaTutorial");
  popupDelTutorial.style.opacity = "0";
  popupDelTutorial.style.pointerEvents = "none";
  botonTutorial.style.position = "absolute";
}

// Seleccion Elemento del Jugador
function seleccionarElementoJugador() {
  sectionVerMapa.style.display = "flex";
  sectionSeleccionarAtaques.style.display = "none";
  sectionSeleccionarElementoJugador.style.display = "none";

  intervalo = setInterval(pintarCanvas, 50);
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
    emojiElementoDelJugador = "./resources/emojiDeAgua.png";
    pic = "./resources/ninjaDeAguaHover.png";
    configuracionDeCarta.style.backgroundImage =
      "url(./resources/gemaDeAguaShiny.png)";
    configuracionDeCarta.style.backgroundColor = "#0373f4";
    configuracionDeCarta.style.boxShadow = "0px 0px 20px 2px rgb(34 133 179)";
    configuracionDeCarta.style.marginBottom = "12px";
  } else if (inputcheckedNieve.checked) {
    NinjaJugador = ninjaNieve.nombre;
    emojiElementoDelJugador = "./resources/emojiDeNieve.png";
    pic = "./resources/ninjaDeNieveHover.png";
    configuracionDeCarta.style.backgroundImage =
      "url(./resources/gemaDeNieveShiny.png)";
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
    emojiElementoDelJugador = "./resources/emojiDeFuego.png";
    pic = "./resources/ninjaDeFuegoHover.png";
    configuracionDeCarta.style.backgroundImage =
      "url(./resources/gemaDeFuegoShiny.png)";
    configuracionDeCarta.style.backgroundColor = "rgb(254 194 25)";
    configuracionDeCarta.style.boxShadow = " 0px 0px 20px 2px rgb(255 144 58)";
    configuracionDeCarta.style.marginBottom = "12px";
    configuracionDeCarta.style.border = "12px solid rgb(243, 220, 13)";
    contenidoTuyoImg.style.marginTop = "5px";
    contenidoTuyoImg.style.width = "278px";
    colorBackground.style.backgroundColor = "rgb(243, 220, 13)";
  }
  document.getElementById("contenidoTuyoimg").src = pic;
  document.getElementById("emojiDeLaCardJugador").src = emojiElementoDelJugador;
  seleccionarNinjaBack(NinjaJugador);

  //Verificacion para los ataques
  if (!(emojiElementoDelJugador == "")) {
    extraerAtaques(NinjaJugador);
    return (isSelected = true);
  }
  return (isSelected = false);
}

function seleccionarNinjaBack(NinjaJugador) {
  fetch(`http://192.168.0.104:8080/cardJitsu/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ninja: NinjaJugador,
    }),
  });
}

function extraerAtaques(NinjaJugador) {
  let ataquesNinja;
  for (let i = 0; i < ninjasElementales.length; i++) {
    if (NinjaJugador === ninjasElementales[i].nombre) {
      ataquesNinja = ninjasElementales[i].ataques;
    }
  }
  mostrarAtaques(ataquesNinja);
}

function mostrarAtaques(ataquesNinja) {
  ataquesNinja.forEach((ataquesNinja) => {
    ataquesNinjaJugador = `
        <button id=${ataquesNinja.id} class="boton-de-Ataque BAtaques" type="button">${ataquesNinja.nombre} <img src=${ataquesNinja.img} alt="medallon"></button>
        `;
    contenedorAtaques.innerHTML += ataquesNinjaJugador;
  });

  botones = document.querySelectorAll(".BAtaques");
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
    emojiElementoDelRival = "./resources/emojiDeAgua.png";
    pic = "./resources/ninjaDeAguaHover.png";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./resources/gemaDeAguaShiny.png)";
    configuracionDeCartaRival.style.backgroundColor = "#0373f4";
    configuracionDeCartaRival.style.boxShadow =
      "rgb(254 25 25) 0px 0px 20px 2px";
    configuracionDeCartaRival.style.marginBottom = "27px";
    AtaquesNinjaRival = ninjaAgua.ataques;
  } else if (rival.nombre == "NinjaNieve") {
    emojiElementoDelRival = "./resources/emojiDeNieve.png";
    pic = "./resources/ninjaDeNieveHover.png";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./resources/gemaDeNieveShiny.png)";
    configuracionDeCartaRival.style.backgroundColor = "rgb(170 162 239);";
    backgroundColorRival.style.backgroundColor = "#a59acb";
    configuracionDeCartaRival.style.boxShadow =
      "rgb(254 25 25) 0px 0px 20px 2px";
    configuracionDeCartaRival.style.marginBottom = "13px";
    configuracionDeCartaRival.style.border = "12px solid #a59acb";
    AtaquesNinjaRival = ninjaNieve.ataques;
  } else {
    emojiElementoDelRival = "./resources/emojiDeFuego.png";
    pic = "./resources/ninjaDeFuegoHover.png";
    configuracionDeCartaRival.style.backgroundImage =
      "url(./resources/gemaDeFuegoShiny.png)";
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

  document.getElementById("contenidoDelRivalimg").src = pic;
  document.getElementById("emojiDeLaCardRival").src = emojiElementoDelRival;
  secuenciaAtaque();
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

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "Fuego ") {
        ataquedelJugador.push(2);
        console.log(ataquedelJugador);
        emojiAtaqueJugador.push(FUEGO);
        boton.style.background = "#f58";
      } else if (e.target.textContent === "Agua ") {
        ataquedelJugador.push(3);
        console.log(ataquedelJugador);
        emojiAtaqueJugador.push(AGUA);
        boton.style.background = "#f58";
      } else {
        ataquedelJugador.push(1);
        console.log(ataquedelJugador);
        emojiAtaqueJugador.push(NIEVE);
        boton.style.background = "#f58";
      }
      if (ataquedelJugador.length === 3) {
        contenedorAtaques.style.opacity = "0";
        contenedorAtaques.style.pointerEvents = "none";
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`http://192.168.0.104:8080/cardJitsu/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataquedelJugador,
      emojis: emojiAtaqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.0.104:8080/cardJitsu/${enemigoId}/ataques`).then(
    function (res) {
      if (res.ok) {
        res.json().then(function ({ ataques, emojis }) {
          if (ataques.length === 3) {
            ataqueDelRival = ataques;
            emojiAtaqueRival = emojis;
            iniciarPelea();
          }
        });
      }
    }
  );
}

function ataquealeatorioenemigo() {
  let ataquealeatorio = aleatorio(1, 3);

  if (ataquealeatorio == 1) {
    ataqueDelRival.push(1);
    emojiAtaqueRival.push(NIEVE);
    console.log(ataqueDelRival);
    ataquealeatorio = aleatorio(2, 3);
    if (ataquealeatorio == 3) {
      ataqueDelRival.push(3);
      emojiAtaqueRival.push(AGUA);
      emojiAtaqueRival.push(FUEGO);
      console.log(ataqueDelRival);
    } else {
      ataqueDelRival.push(2);
      emojiAtaqueRival.push(FUEGO);
      emojiAtaqueRival.push(AGUA);
      console.log(ataqueDelRival);
    }
  } else if (ataquealeatorio == 3) {
    ataqueDelRival.push(3);
    emojiAtaqueRival.push(AGUA);
    console.log(ataqueDelRival);
    ataquealeatorio = aleatorio(1, 2);
    if (ataquealeatorio == 1) {
      ataqueDelRival.push(1);
      emojiAtaqueRival.push(NIEVE);
      emojiAtaqueRival.push(FUEGO);
      console.log(ataqueDelRival);
    } else {
      ataqueDelRival.push(2);
      emojiAtaqueRival.push(FUEGO);
      emojiAtaqueRival.push(NIEVE);
      console.log(ataqueDelRival);
    }
  } else {
    ataqueDelRival.push(2);
    emojiAtaqueRival.push(FUEGO);
    console.log(ataqueDelRival);
    ataquealeatorio = aleatorio(1, 3);
    if (ataquealeatorio == 1) {
      ataqueDelRival.push(1);
      emojiAtaqueRival.push(NIEVE);
      emojiAtaqueRival.push(AGUA);
      console.log(ataqueDelRival);
    } else {
      ataqueDelRival.push(2);
      emojiAtaqueRival.push(AGUA);
      emojiAtaqueRival.push(NIEVE);
      console.log(ataqueDelRival);
    }
  }
  iniciarPelea();
}

function iniciarPelea() {
  clearInterval(intervalo);
  if (ataquedelJugador.length === 3) {
    confirmarCarta.style.pointerEvents = "all";
    confirmarCarta.style.opacity = "1";
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataquedelJugador[jugador];
  indexAtaqueEnemigo = ataqueDelRival[enemigo];

  indexEmojiJugador = emojiAtaqueJugador[jugador];
  indexEmojiRival = emojiAtaqueRival[enemigo];
}

//Comparacion de los ataques selecionados y el resultado del enfrentamiento (1 es nieve, 2 es fuego y 3 es agua).
function resultados() {
  let imagenCartaBorrarJ = document.getElementById("ataqueElementalJugador");
  let imagenCartaBorrarR = document.getElementById("ataqueElementalRival");

  emojisDelJugador.removeChild(imagenCartaBorrarJ);
  emojisDelRival.removeChild(imagenCartaBorrarR);

  confirmarCarta.style.pointerEvents = "none";
  confirmarCarta.style.opacity = "0";
  contenedorAtaques.style.opacity = "0";
  contenedorAtaques.style.pointerEvents = "none";

  resultadoMensaje.innerHTML = "";

  let contenidoTuyoColor = document.getElementById("contenidoTuyo");
  let contenidoRivalColor = document.getElementById("contenidoDelRival");

  cajaEnfrentamiento.style.marginTop = "-72px";

  for (let index = 0; index < ataquedelJugador.length; index++) {
    if (ataquedelJugador[index] === ataqueDelRival[index]) {
      indexAmbosOponentes(index, index, index);
      resultado = "EMPATE";

      crearMensajes();
    } else if (
      (ataquedelJugador[index] == 2 && ataqueDelRival[index] == 3) ||
      (ataquedelJugador[index] == 3 && ataqueDelRival[index] == 1) ||
      (ataquedelJugador[index] == 1 && ataqueDelRival[index] == 2)
    ) {
      indexAmbosOponentes(index, index, index);
      conteoRival++;
      cambioVidasScoreJ.innerHTML = conteoJugador;
      cambioVidasScoreR.innerHTML = conteoRival;
      resultado = "DERROTA";
      contenidoTuyoColor.style.color = "red";
      contenidoRivalColor.style.color = "Black";
      crearMensajes();
    } else {
      indexAmbosOponentes(index, index, index);
      conteoJugador++;
      cambioVidasScoreJ.innerHTML = conteoJugador;
      cambioVidasScoreR.innerHTML = conteoRival;
      resultado = "VICTORIA";
      contenidoTuyoColor.style.color = "Black";
      contenidoRivalColor.style.color = "red";
      crearMensajes();
    }
  }
  revisarVictorias();
}

function revisarVictorias() {
  let configuracionDeCarta = document.getElementById("ContenidoTuyo");
  let configuracionDeCartaRival = document.getElementById("ContenidoDelRival");
  let cajaMensajes = document.getElementById("mensajes2");
  if (conteoRival == conteoJugador) {
    crearMesajeFinal("Has empatado. tu rival quiere la revancha ¿¡aceptas!?");
    desabilitarBotonesCombates();
    cajaMensajes.style.background = "rgb(202 103 45)";
    cajaMensajes.style.fontSize = "11mm";
    cajaMensajes.style.boxShadow = "rgb(101 69 9) 0px 0px 20px 5px";
    configuracionDeCarta.style.opacity = "0.5";
    configuracionDeCartaRival.style.opacity = "0.5";
    cajaEnfrentamiento.style.background = "#f3dc0d";
  } else if (conteoRival > conteoJugador) {
    crearMesajeFinal("Lo Siento, Has Perdido, vuelve a intentarlo");
    desabilitarBotonesCombates();
    cajaMensajes.style.background = "#7f4d5a";
    cajaMensajes.style.fontSize = "11mm";
    cajaMensajes.style.boxShadow = "rgb(147 62 84) 0px 0px 20px 5px";
    configuracionDeCarta.style.opacity = "0";
    cajaEnfrentamiento.style.background = "#ff2929";
    cajaEnfrentamiento.style.border = "solid black";
  } else {
    crearMesajeFinal(
      "¡¡Felicidades Has Ganado!! Quieres seguir con tu racha? Vuelve a intentarlo"
    );
    desabilitarBotonesCombates();
    cajaMensajes.style.background = "#FFEB3B";
    cajaMensajes.style.boxShadow = "rgb(255 232 53) 0px 0px 20px 5px";
    configuracionDeCartaRival.style.opacity = "0";
    cajaEnfrentamiento.style.background = "#5cd93d";
    cajaEnfrentamiento.style.border = "solid white";
  }
}
// PENDIENTE, HACER EL ALGORITMO QUE DECIDA EL RESULTADO DEL DUELO
function crearMensajes() {
  let nuevoEmojiJugador = document.createElement("img");
  let nuevoEmojiEnemigo = document.createElement("img");
  let resultadosLista = document.createElement("p");

  resultadosLista.innerHTML = resultado;
  resultadosLista.setAttribute("id", "cajaMensajes");
  nuevoEmojiJugador.setAttribute("src", indexEmojiJugador);
  nuevoEmojiJugador.setAttribute("id", "emojisProta");
  nuevoEmojiEnemigo.setAttribute("src", indexEmojiRival);
  nuevoEmojiEnemigo.setAttribute("id", "emojisNoProta");

  resultadoMensaje.appendChild(resultadosLista);
  emojisDelJugador.appendChild(nuevoEmojiJugador);
  emojisDelRival.appendChild(nuevoEmojiEnemigo);
}

function crearMesajeFinal(resultadoFinal) {
  let sectionResultadoFinal = document.getElementById("mensajes2");
  let parrafo2 = document.createElement("p");
  parrafo2.innerHTML = resultadoFinal;

  sectionResultadoFinal.appendChild(parrafo2);
}
function reiniciarJuego() {
  location.reload();
}

//desabilitaciones de botones&Elemento
function desabilitarBotonesCombates() {
  openBotones.style.opacity = "0.5";
  openBotones.style.pointerEvents = "none";
  contenedorPersonajes.style.opacity = "0.5";
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

  ninjaCanvas.x = ninjaCanvas.x + ninjaCanvas.velocidadX;
  ninjaCanvas.y = ninjaCanvas.y + ninjaCanvas.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);

  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  ninjaCanvas.pintarNinjas();
  enviarPosicion(ninjaCanvas.x, ninjaCanvas.y);
  ninjasElementalesRivales.forEach(function (ninja) {
    if (ninja != undefined) {
      ninja.pintarNinjas();
      revisarColision(ninja);
    }
  });
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.0.104:8080/cardJitsu/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok)
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        ninjasElementalesRivales = enemigos.map(function (rival) {
          if (rival.ninja != undefined) {
            let ninjaRival = null;
            let algo = rival.ninja.nombre || "";
            const ninjaNombre = algo;
            if (ninjaNombre === "NinjaAgua") {
              ninjaRival = new Ninjas(
                "NinjaAgua",
                "./resources/ninjaDeAgua.png",
                "",
                "",
                3,
                "",
                "./resources/emojiNinjaAgua.png",
                rival.id
              );
            } else if (ninjaNombre === "NinjaFuego") {
              ninjaRival = new Ninjas(
                "NinjaFuego",
                "./resources/ninjaDeFuego.png",
                "",
                "",
                3,
                "",
                "./resources/emojiNinjaFuego.png",
                rival.id
              );
            } else if (ninjaNombre === "NinjaNieve") {
              ninjaRival = new Ninjas(
                "NinjaNieve",
                "./resources/ninjaDeNieve.png",
                "",
                "",
                3,
                "",
                "./resources/emojiNinjaNieve.png",
                rival.id
              );
            }
            ninjaRival.x = rival.x || 0;
            ninjaRival.y = rival.y || 0;
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
    case "ArrowRight":
      ninjaCanvas.velocidadX = 0;
      break;

    case "ArrowLeft":
      ninjaCanvas.velocidadX = 0;
      break;

    case "ArrowUp":
      ninjaCanvas.velocidadY = 0;
      break;

    case "ArrowDown":
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
    case "ArrowRight":
      moverDerecha();
      break;

    case "ArrowLeft":
      moverIzquierda();
      break;

    case "ArrowUp":
      moverArriba();
      break;

    case "ArrowDown":
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
  alert("has enfrentado al " + rival.nombre);
  clearInterval(intervalo);
  enemigoId = rival.id;
  sectionSeleccionarAtaques.style.display = "flex";
  sectionVerMapa.style.display = "none";
  selecionarElementoRival(rival);
}

// También escucha el evento 'resize' para ajustar las imágenes si cambia el tamaño de la ventana
// Llama a la función al cargar la página
window.addEventListener("load", iniciarJuego);
