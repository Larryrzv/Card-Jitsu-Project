/* Constantes Globales */
// Divs y Sections
const sectionSeleccionarModo = document.getElementById("seleccionarModo");
const sectionSeleccionarAtaques = document.getElementById(
  "seleccionar-ataques"
);
const divReiniciarPPT = document.getElementById("divReiniciarPPT");
const resultadoMensaje = document.getElementById("listaMensajes");
const cajaEnfrentamiento = document.getElementById("enfrentamiento");
const subtituloCombate = document.getElementById("subtitulo");
const cambioVidasScoreR = document.getElementById("conteoRival");
const cambioVidasScoreJ = document.getElementById("conteoJugador");

const contenedorAtaques = document.getElementById("CajaCartas");
// Botones
const botonConfirmarCarta = document.getElementById("botonConfirmarCarta");
const botonPPT = document.getElementById("modoPPT");
const sectionTutorial = document.getElementById("sectionTutorial");
const botonTutorial = document.getElementById("open");
const popupDelTutorial = document.getElementById("cajaTutorial");

const openBotones = document.getElementById("emojiAbrirCartas");
const confirmarCarta = document.getElementById("divConfirmarCarta");
const botonReiniciar2 = document.getElementById("botonReiniciar2");

/* Variables Goblales */
let AGUA = "./img/simboloDeAgua.webp";
let FUEGO = "./img/simboloDeFuego.webp";
let NIEVE = "./img/simboloDeNieve.webp";
let botonesElementales = [];
let isSelected = false;
let emojiAtaqueJugador = [];
let ataquesNinjaJugador;
let emojiAtaqueRival = [];
let opcionDeNinjas;
let NinjaJugador;
let ninjasPPT = [];
let vidasJugador = 3;
let vidasRival = 3;
let resultado;
let botones = [];
let AtaquesNinjaRival;

// Clases
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

// Al Iniciar Juego
function iniciarJuego() {
  sectionSeleccionarAtaques.style.display = "none";
  divReiniciarPPT.style.display = "none";

  botonPPT.addEventListener("click", modoPPT);
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
  configuracionDeCarta.style.backgroundImage = "url(./img/gemaSombra.webp)";
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
        document.getElementById("cartaJugador").src = emojiAtaqueJugador;
        document.getElementById("cartaRival").src = emojiAtaqueRival;
      } else if (e.target.textContent === "Fuego ") {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 2;
        emojiAtaqueJugador = FUEGO;
        emojiAtaqueRival = "./img/cartas.webp";
        ataqueJugadorPPT = "⚔️";
        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("cartaJugador").src = emojiAtaqueJugador;
        document.getElementById("cartaRival").src = emojiAtaqueRival;
      } else {
        confirmarCarta.style.pointerEvents = "all";
        confirmarCarta.style.opacity = "1";
        seleccionJugador = 1;
        emojiAtaqueJugador = NIEVE;
        emojiAtaqueRival = "./img/cartas.webp";
        ataqueJugadorPPT = "⚔️";

        innerEspada.innerHTML = ataqueJugadorPPT;
        document.getElementById("cartaJugador").src = emojiAtaqueJugador;
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

function slide() {
  //hacemos visible el div
  document.getElementById("imagenTutorial").classList.toggle("abierto");
}

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

function iniciarPelea() {
  confirmarCarta.style.pointerEvents = "all";
  confirmarCarta.style.opacity = "1";
}
function iniciarPeleaPPT() {
  confirmarCarta.style.pointerEvents = "all";
  confirmarCarta.style.opacity = "1";
}

function reiniciarJuego() {
  location.reload();
}

//desabilitaciones de botones&Elemento
function desabilitarBotonesCombates() {
  openBotones.style.opacity = "0.5";
  openBotones.style.pointerEvents = "none";
}
function habilitarBotonesCombates() {
  openBotones.style.opacity = "1";
  openBotones.style.pointerEvents = "all";
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// También escucha el evento 'resize' para ajustar las imágenes si cambia el tamaño de la ventana
// Llama a la función al cargar la página
window.addEventListener("load", iniciarJuego);
