// Constantes Globales
const sectionSeleccionarAtaques = document.getElementById("seleccionar-ataques")
const sectionSeleccionarElementoJugador = document.getElementById("Seleccionar-Elemento")
const sectionSeleccionarModo = document.getElementById("seleccionarModo")

const divReiniciar = document.getElementById("reiniciar")
const botonReiniciar = document.getElementById("boton-reiniciar")
const tutorial = document.getElementById("open")
const botonElementoJugador = document.getElementById("Boton-confirmar-Elemento")
const openBotones = document.getElementById("emojiAbrirCartas")
const confirmarCarta = document.getElementById("divConfirmarCarta")
const botonConfirmarCarta = document.getElementById("botonConfirmarCarta")
const emojisDelJugador = document.getElementById("divAtaqueElementalJugador")
const emojisDelRival = document.getElementById("divAtaqueElementalRival")
const resultadoMensaje = document.getElementById("listaMensajes")
const cajaEnfrentamiento = document.getElementById("enfrentamiento")
const subtituloCombate = document.getElementById("subtitulo")

const botonPPT = document.getElementById("modoPPT")
const botonClassic = document.getElementById("modoClassic")

const contenedorPersonajes = document.getElementById("contenedorPersonajes")
const contenedorAtaques = document.getElementById ("CajaCartas")



// Variables Goblales
let AGUA = "./resources/simboloDeAgua.png"
let FUEGO = "./resources/simboloDeFuego.png"
let NIEVE = "./resources/simboloDeNieve.png"
let ninjasElementales = []
let ninjasPPT = []
let botonesElementales = []
let isSelected = false
let emojiAtaqueJugador = []
let ataquesNinjaJugador;
let emojiAtaqueRival = []
let opcionDeNinjas;
let NinjaJugador
let conteoJugador = 0
let conteoRival = 0
let botones = []
let inputcheckedAgua;
let inputcheckedNieve;
let inputcheckedFuego;
let ataquedelJugador = []
let ataqueDelRival = []
let resultado;
let indexAtaqueJugador;
let indexAtaqueEnemigo; 
let AtaquesNinjaRival;
let indexEmojiJugador;
let indexEmojiRival;
let indexResultado;



// Clases
class Ninjas{
    constructor(nombre, foto, clase, score,) {
        this.nombre = nombre
        this.foto = foto
        this.clase = clase
        this.score = score
        this.ataques = []
    }
}
let ninjaAgua = new Ninjas("NinjaAgua", "./resources/ninjaDeAgua.png", "tarjetaDeAgua", 0)
let ninjaFuego = new Ninjas("NinjaFuego", "./resources/ninjaDeFuego.png", "tarjetaDeFuego", 0)
let ninjaNieve = new Ninjas("NinjaNieve", "./resources/ninjaDeNieve.png", "tarjetaDeNieve", 0)
ninjaAgua.ataques.push(
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
)
ninjaFuego.ataques.push(
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
)
ninjaNieve.ataques.push(
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
)
class NinjasPPT{
    constructor(nombre, foto, emoji, clase, vida,) {
        this.nombre = nombre
        this.foto = foto
        this.emoji = emoji
        this.clase = clase
        this.vida = vida
        this.ataques = []
    }
}
let ninjaBlack1 = new NinjasPPT("Jugador", "./resources/ninjaComun1.png", "./resources/emojiSombra", "tarjetaJugador", 3)
let ninjaBlack2 = new NinjasPPT("Rival", "./resources/ninja2.png", "./resources/emojiSombra", "tarjetaRival", 3)

ninjaBlack1.ataques.push(
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
)
ninjaBlack2.ataques.push(
    { nombre: "Nieve", id: "boton-Nieve", img: "./resources/cartasDeNieve.png"},
    { nombre: "Agua", id: "boton-Agua", img: "./resources/cartasDeAgua.png"},
    { nombre: "Fuego", id: "boton-Fuego", img: "./resources/cartasDeFuego.png"},
)

ninjasElementales.push(ninjaAgua,ninjaFuego,ninjaNieve)
ninjasPPT.push(ninjaBlack1, ninjaBlack2)

// Al Iniciar Juego
function iniciarJuego() {
    sectionSeleccionarAtaques.style.display = "none"
    seleccionarElementoJugador
    sectionSeleccionarElementoJugador.style.display = "none"

    divReiniciar.style.display = "flex"


    botonPPT.addEventListener("click", modoPPT)
    botonClassic.addEventListener("click", modoClassic)
    tutorial.addEventListener("click", popTutorial)


}

function modoPPT() {
    sectionSeleccionarAtaques.style.display = "flex"
    sectionSeleccionarModo.style.display = "none"

    divReiniciar.style.display = "flex"
    tutorial.style.display = "none"

    openBotones.addEventListener("click", abrirBotonesElementales)
    botonConfirmarCarta.addEventListener("click", encuentro)

    botonReiniciar.addEventListener("click", reiniciarJuego)
    divReiniciar.style.display = "flex"

    edicionJugadorPPT()
}
//agregar la visualizacion del jugador para el modo PPT
function edicionJugadorPPT() {
let emojiElementoDelJugador
let picJ;
let configuracionDeCarta = document.getElementById("ContenidoTuyo")
let contenidoTuyoImg = document.getElementById("contenidoTuyoimg")
let colorBackground = document.getElementById("contenidoTuyo")

        NinjaJugador = ninjaBlack1.nombre
        emojiElementoDelJugador = ninjaBlack1.emoji
        picJ = ninjaBlack1.foto
        configuracionDeCarta.style.backgroundImage = "url(./resources/GemasDeFuegoNieveAgua.png)";
        configuracionDeCarta.style.backgroundColor = "rgb(254 194 25)"
        configuracionDeCarta.style.boxShadow = " 0px 0px 20px 2px rgb(255 144 58)"
        configuracionDeCarta.style.marginBottom = "12px"
        configuracionDeCarta.style.border = "12px solid rgb(243, 220, 13)"
        contenidoTuyoImg.style.marginTop = "5px"
        contenidoTuyoImg.style.width = "278px"
        colorBackground.style.backgroundColor = "rgb(243, 220, 13)"
    
        document.getElementById("contenidoTuyoimg").src = picJ 
        document.getElementById("emojiDeLaCardJugador").src = emojiElementoDelJugador

    //Verificacion para los ataques
if (!(emojiElementoDelJugador == "")) {
    extraerAtaquesPPT(NinjaJugador)
    edicionRivalPPT()
    return (isSelected = true)
}
return (isSelected = false)
}
//agregar la visualizacion del Rival para el modo PPT
function edicionRivalPPT() {
let picR;
let emojiElementoDelRival;
let configuracionDeCartaRival = document.getElementById
("ContenidoDelRival")
let backgroundColorRival = document.getElementById("contenidoDelRival")
let ContenidoRivalimg = document.getElementById("contenidoDelRivalimg")
        NinjaJugador = ninjaAgua.nombre
        emojiElementoDelRival = ninjaBlack2.emoji
        picR = ninjaBlack2.foto
        configuracionDeCartaRival.style.backgroundImage = "url(./resources/GemasDeFuegoNieveAgua.png)";
        backgroundColorRival.style.backgroundColor = "rgb(243, 220, 13)"
        configuracionDeCartaRival.style.backgroundColor = "rgb(254 194 25)"
        configuracionDeCartaRival.style.boxShadow = "rgb(254 25 25) 0px 0px 20px 2px"
        configuracionDeCartaRival.style.marginBottom = "21px"
        configuracionDeCartaRival.style.border = "12px solid rgb(243, 220, 13)"
        ContenidoRivalimg.style.marginTop = "5px"
        ContenidoRivalimg.style.width = "278px"

    document.getElementById("contenidoDelRivalimg").src = picR
    document.getElementById("emojiDeLaCardRival").src = emojiElementoDelRival
    AtaquesNinjaRival = ninjasPPT[ElementoAleatorio].ataques
    subtituloCombate.style.width = "194px"
}

function extraerAtaquesPPT(NinjaJugador) {
    let ataquesNinjasPPT
    for (let i = 0; i < ninjasPPT.length; i++) {
        if (NinjaJugador === ninjasPPT[i].nombre) {
            ataquesNinjasPPT = ninjasPPT[i].ataques
        }

    }
    mostrarAtaquesPPT(ataquesNinjasPPT)
}
function mostrarAtaquesPPT(ataquesNinjasPPT){
    ataquesNinjasPPT.forEach((ataquesNinjasPPT)=> {
        ataquesNinjaJugador = `
        <button id=${ataquesNinjasPPT.id} class="boton-de-Ataque BAtaques" type="button">${ataquesNinjasPPT.nombre} <img src=${ataquesNinjasPPT.img} alt="medallon"></button>
        `
        contenedorAtaques.innerHTML += ataquesNinjaJugador
    })
    botones = document.querySelectorAll(".BAtaques")

}


function encuentro () {
    contenedorAtaques.style.opacity = "0"
    contenedorAtaques.style.pointerEvents = "none"
    confirmarCarta.style.pointerEvents = "none"
    confirmarCarta.style.opacity = "0"
    ataquealeatorio = aleatorio(0, AtaquesNinjaRival.length -1)
        if (ataquealeatorio == 2) {
            emojiAtaqueRival = "./resources/simboloDeFuego.png"
            AtaqueDelRival.push("FUEGO")
            actualAtaqueRival = 2
    
        }   else if (ataquealeatorio == 3){ 
                emojiAtaqueRival = "./resources/simboloDeAgua.png"
                AtaqueDelRival.push("AGUA")
                actualAtaqueRival = 3
        }   else {
            emojiAtaqueRival = "./resources/simboloDeNieve.png"
            AtaqueDelRival.push("NIEVE")
            actualAtaqueRival = 1
        }
                console.log(AtaqueDelRival)
                resultadoPPT()
                document.getElementById("ataqueElementalRival").src = emojiAtaqueRival
    }


function resultadoPPT() {
    let innerEspada = document.getElementById("cajaMensajes")
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Agua ") {
                ataquedelJugador.push("AGUA")
                console.log(ataquedelJugador)
                confirmarCarta.style.pointerEvents = "all"
                confirmarCarta.style.opacity = "1"
                seleccionJugador = 3
                emojiAtaqueJugador = "./resources/simboloDeAgua.png"
                emojiAtaqueRival = "./resources/cartas.png"
                resultadoPPT = "⚔️"

                innerEspada.innerHTML = resultadoPPT
                document.getElementById("ataqueElementalJugador").src = emojiAtaqueJugador
                document.getElementById("ataqueElementalRival").src = emojiAtaqueRival
            }
            else if (e.target.textContent === "Fuego ") {
                ataquedelJugador.push("FUEGO")
                console.log(ataquedelJugador)
                confirmarCarta.style.pointerEvents = "all"
                confirmarCarta.style.opacity = "1"
                seleccionJugador = 2
                emojiAtaqueJugador = "./resources/simboloDeFuego.png"
                emojiAtaqueRival = "./resources/cartas.png"
                resultadoPPT = "⚔️"
                innerEspada.innerHTML = resultadoPPT
                document.getElementById("ataqueElementalJugador").src = emojiAtaqueJugador
                document.getElementById("ataqueElementalRival").src = emojiAtaqueRival
            }
            else {
                ataquedelJugador.push("NIEVE")
                console.log(ataquedelJugador)
                confirmarCarta.style.pointerEvents = "all"
                confirmarCarta.style.opacity = "1"
                seleccionJugador = 1
                emojiAtaqueJugador = "./resources/simboloDeNieve.png"
                emojiAtaqueRival = "./resources/cartas.png"
                resultadoPPT = "⚔️"

                innerEspada.innerHTML = resultadoPPT
                document.getElementById("ataqueElementalJugador").src = emojiAtaqueJugador
                document.getElementById("ataqueElementalRival").src = emojiAtaqueRival
            }
            revisarVidas ()
            crearMensajesPPT ()
        })
    })
}

function revisarVidas (){
    let configuracionDeCarta = document.getElementById("ContenidoTuyo")
    let configuracionDeCartaRival = document.getElementById("ContenidoDelRival")
    let cajaMensajes = document.getElementById("mensajes2")
    if(vidasJugador == 0){
        crearMesajeFinal("Lo Siento, Has Perdido, vuelve a intentarlo")
        desabilitarBotonesCombates()
        cajaMensajes.style.background = "#7f4d5a"
        cajaMensajes.style.fontSize = "11mm"
        cajaMensajes.style.boxShadow = "rgb(147 62 84) 0px 0px 20px 5px"
        configuracionDeCarta.style.opacity = "0"
    }
    else if (vidasRival == 0) {
        crearMesajeFinal("¡¡Felicidades Has Ganado!! Quieres seguir con tu racha? Vuelve a intentarlo")
        desabilitarBotonesCombates()
        cajaMensajes.style.background = "#FFEB3B"
        cajaMensajes.style.boxShadow = "rgb(255 232 53) 0px 0px 20px 5px"
        configuracionDeCartaRival.style.opacity = "0"}
}function crearMensajesPPT() {
    let resultadoMensaje = document.getElementById("cajaMensajes")
    let divemojiAtaqueJugador = document.getElementById("ataqueElementalJugador")
    let divemojiAtaqueRival = document.getElementById("ataqueElementalRival")

        resultadoMensaje.innerHTML =  resultadoPPT
        divemojiAtaqueJugador.innerHTML = emojiAtaqueJugador
        divemojiAtaqueRival.innerHTML = emojiAtaqueRival
}

function crearMesajeFinal(resultadoFinal) {
    let sectionResultadoFinal = document.getElementById("mensajes2")
    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML = resultadoFinal
    
    sectionResultadoFinal.appendChild(parrafo2)
}




function modoClassic() {
    sectionSeleccionarAtaques.style.display = "none"

    sectionVerMapa.style.display = "none"

    ninjasElementales.forEach((Ninjas) => {
        opcionDeNinjas = `
        <input type="radio" id=${Ninjas.nombre} name="Seleccion" value="Seleccion">
        <label class= ${Ninjas.clase} for=${Ninjas.nombre}>${Ninjas.nombre}
        <img src=${Ninjas.foto} alt=${Ninjas.nombre}></label>
        `
        contenedorPersonajes.innerHTML += opcionDeNinjas

    })

    divReiniciar.style.display = "flex"

    openBotones.addEventListener("click", abrirBotonesElementales)
    botonConfirmarCarta.addEventListener("click", resultados)

    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    inputcheckedAgua = document.getElementById("NinjaAgua")
    inputcheckedNieve = document.getElementById("NinjaNieve")
    inputcheckedFuego = document.getElementById("NinjaFuego")

    inputcheckedAgua.addEventListener("click", comprobarInputs)
    inputcheckedNieve.addEventListener("click", comprobarInputs)
    inputcheckedFuego.addEventListener("click", comprobarInputs)

//Metodo para impedir pasar a la siguiente parte sin ninja
    botonElementoJugador.addEventListener("click", function() { if (!comprobarInputs()) { 
        alert("Por favor selecciona a algun ninja"); } 
    else { 
        seleccionarElementoJugador()} });
}

function comprobarInputs() {
    if (inputcheckedAgua.checked || inputcheckedNieve.checked || inputcheckedFuego.checked) { 
        botonElementoJugador.style.opacity = "1";
        return true; } 
    else { 
        botonElementoJugador.style.opacity = "0.5"
        } 

}

function popTutorial() {
    let popupDelTutorial = document.getElementById("cajaTutorial")
    let close = document.getElementById("close")
    close.addEventListener("click", popTutorialClose)
    popupDelTutorial.style.opacity = "1"
    popupDelTutorial.style.pointerEvents = "auto"
}function popTutorialClose(){
    let popupDelTutorial = document.getElementById("cajaTutorial")
    popupDelTutorial.style.opacity = "0"
    popupDelTutorial.style.pointerEvents = "none"
}

// Seleccion Elemento del Jugador
function seleccionarElementoJugador() {

sectionSeleccionarAtaques.style.display = "flex"
sectionSeleccionarElementoJugador.style.display = "none"
tutorial.style.display = "none"
divReiniciar.style.display = "flex"

let emojiElementoDelJugador
let pic;
let configuracionDeCarta = document.getElementById("ContenidoTuyo")
let contenidoTuyoImg = document.getElementById("contenidoTuyoimg")
let colorBackground = document.getElementById("contenidoTuyo")

    //if de la Elemento del jugador e insercion de la imagen del Jugador
    if (inputcheckedAgua.checked){
        NinjaJugador = ninjaAgua.nombre
        emojiElementoDelJugador = "./resources/emojiDeAgua.png"        
        pic = "./resources/ninjaDeAguaHover.png"
        configuracionDeCarta.style.backgroundImage = "url(./resources/gemaDeAguaShiny.png)";
        configuracionDeCarta.style.backgroundColor = "#0373f4"
        configuracionDeCarta.style.boxShadow = "0px 0px 20px 2px rgb(34 133 179)"
        configuracionDeCarta.style.marginBottom = "12px"
    }
    else if (inputcheckedNieve.checked){ 
        NinjaJugador = ninjaNieve.nombre
        emojiElementoDelJugador = "./resources/emojiDeNieve.png"
        pic = "./resources/ninjaDeNieveHover.png"
        configuracionDeCarta.style.backgroundImage = "url(./resources/gemaDeNieveShiny.png)";
        configuracionDeCarta.style.backgroundColor = "rgb(170 162 239);";
        configuracionDeCarta.style.boxShadow = "0px 0px 20px 2px rgb(168 174 249)"
        configuracionDeCarta.style.marginBottom = "20px"
        configuracionDeCarta.style.border = "12px solid #a59acb"
        contenidoTuyoImg.style.marginTop = "38px"
        contenidoTuyoImg.style.width = "238px"
        contenidoTuyoImg.style.paddingLeft = "0px"
        colorBackground.style.backgroundColor = "#a59acb"
    }
    else if (inputcheckedFuego.checked){ 
        NinjaJugador = ninjaFuego.nombre
        emojiElementoDelJugador = "./resources/emojiDeFuego.png"
        pic = "./resources/ninjaDeFuegoHover.png"
        configuracionDeCarta.style.backgroundImage = "url(./resources/gemaDeFuegoShiny.png)";
        configuracionDeCarta.style.backgroundColor = "rgb(254 194 25)"
        configuracionDeCarta.style.boxShadow = " 0px 0px 20px 2px rgb(255 144 58)"
        configuracionDeCarta.style.marginBottom = "12px"
        configuracionDeCarta.style.border = "12px solid rgb(243, 220, 13)"
        contenidoTuyoImg.style.marginTop = "5px"
        contenidoTuyoImg.style.width = "278px"
        colorBackground.style.backgroundColor = "rgb(243, 220, 13)"
    }
        subtituloCombate.style.width = "194px"
        document.getElementById("contenidoTuyoimg").src = pic 
        document.getElementById("emojiDeLaCardJugador").src = emojiElementoDelJugador

    
//Verificacion para los ataques
if (!(emojiElementoDelJugador == "")) {
    extraerAtaques(NinjaJugador)
    selecionarElementoRival ()
    return (isSelected = true)
}
return (isSelected = false)
}
function extraerAtaques(NinjaJugador) {
    let ataquesNinja
    for (let i = 0; i < ninjasElementales.length; i++) {
        if (NinjaJugador === ninjasElementales[i].nombre) {
            ataquesNinja = ninjasElementales[i].ataques
        }
        
    }
    mostrarAtaquesClassic(ataquesNinja)
}
function mostrarAtaquesClassic(ataquesNinja){
    ataquesNinja.forEach((ataquesNinja)=> {
        ataquesNinjaJugador = `
        <button id=${ataquesNinja.id} class="boton-de-Ataque BAtaques" type="button">${ataquesNinja.nombre} <img src=${ataquesNinja.img} alt="medallon"></button>
        `
        contenedorAtaques.innerHTML += ataquesNinjaJugador
    })

    botones = document.querySelectorAll(".BAtaques")

}





function slide() {
    //hacemos visible el div
    document.getElementById("imagenTutorial").classList.toggle("abierto");
    
   }


//Seleccion de la Elemento del rival e insercion de su imagen
function selecionarElementoRival () {
    let ElementoAleatorio = aleatorio(0, ninjasElementales.length -1)
    let pic;
    let emojiElementoDelRival;
    let configuracionDeCartaRival = document.getElementById
    ("ContenidoDelRival")
    let backgroundColorRival = document.getElementById("contenidoDelRival")
    let ContenidoRivalimg = document.getElementById("contenidoDelRivalimg")

    if(ElementoAleatorio == 0) {
        emojiElementoDelRival = "./resources/emojiDeAgua.png"
        pic = "./resources/ninjaDeAguaHover.png"
        configuracionDeCartaRival.style.backgroundImage = "url(./resources/gemaDeAguaShiny.png)";
        configuracionDeCartaRival.style.backgroundColor = "#0373f4"
        configuracionDeCartaRival.style.boxShadow = "rgb(254 25 25) 0px 0px 20px 2px"
        configuracionDeCartaRival.style.marginBottom = "27px"
    } 
    else if(ElementoAleatorio == 1) {
        emojiElementoDelRival = "./resources/emojiDeNieve.png"
        pic = "./resources/ninjaDeNieveHover.png"
        configuracionDeCartaRival.style.backgroundImage = "url(./resources/gemaDeNieveShiny.png)";
        configuracionDeCartaRival.style.backgroundColor = "rgb(170 162 239);";
        backgroundColorRival.style.backgroundColor = "#a59acb"
        configuracionDeCartaRival.style.boxShadow = "rgb(254 25 25) 0px 0px 20px 2px"
        configuracionDeCartaRival.style.marginBottom = "13px"
        configuracionDeCartaRival.style.border = "12px solid #a59acb"
} 
    else {
        emojiElementoDelRival = "./resources/emojiDeFuego.png"
        pic = "./resources/ninjaDeFuegoHover.png"
        configuracionDeCartaRival.style.backgroundImage = "url(./resources/gemaDeFuegoShiny.png)";
        backgroundColorRival.style.backgroundColor = "rgb(243, 220, 13)"
        configuracionDeCartaRival.style.backgroundColor = "rgb(254 194 25)"
        configuracionDeCartaRival.style.boxShadow = "rgb(254 25 25) 0px 0px 20px 2px"
        configuracionDeCartaRival.style.marginBottom = "21px"
        configuracionDeCartaRival.style.border = "12px solid rgb(243, 220, 13)"
        ContenidoRivalimg.style.marginTop = "5px"
        ContenidoRivalimg.style.width = "278px"
    }

    document.getElementById("contenidoDelRivalimg").src = pic 
    document.getElementById("emojiDeLaCardRival").src = emojiElementoDelRival
    AtaquesNinjaRival = ninjasElementales[ElementoAleatorio].ataques
    secuenciaAtaque()
}

//Funciones de los ataques del jugador y rival
function abrirBotonesElementales() {
    if (contenedorAtaques.style.opacity === "1") {
        // Si el rectángulo está visible, cambiar su opacity a 0
        contenedorAtaques.style.opacity = "0";
        contenedorAtaques.style.pointerEvents = "none"
        openBotones.setAttribute("data-text", "👇");
        
      } else {
        // Si el rectángulo está oculto, cambiar su opacity a 1
        openBotones.setAttribute("data-text", "☝");
        contenedorAtaques.style.opacity = "1";
        contenedorAtaques.style.pointerEvents = "all"
    }
}


function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego ") {
                ataquedelJugador.push(2)
                console.log(ataquedelJugador)
                emojiAtaqueJugador.push(FUEGO)
                boton.style.background = "#f58"
                boton.style.pointerEvents = "none"
            }
            else if (e.target.textContent === "Agua ") {
                ataquedelJugador.push(3)
                console.log(ataquedelJugador)
                emojiAtaqueJugador.push(AGUA)
                boton.style.background = "#f58"
                boton.style.pointerEvents = "none"
            }
            else {
                ataquedelJugador.push(1)
                console.log(ataquedelJugador)
                emojiAtaqueJugador.push(NIEVE)
                boton.style.background = "#f58"
                boton.style.pointerEvents = "none"
            }
            ataqueAleatorioRival()
        })
    })
}


function ataqueAleatorioRival () {
    let ataquealeatorio = aleatorio(0, AtaquesNinjaRival.length -1)

        if (ataquealeatorio == 0 || ataquealeatorio == 1)  {
            ataqueDelRival.push(2)
            emojiAtaqueRival.push(FUEGO)
            console.log(ataqueDelRival)
    
        }   else if (ataquealeatorio == 3 || ataquealeatorio == 4){ 
                ataqueDelRival.push(3)
                emojiAtaqueRival.push(AGUA)
                console.log(ataqueDelRival)
        }   else {
            ataqueDelRival.push(1)
            emojiAtaqueRival.push(NIEVE)
            console.log(ataqueDelRival)
        } 
        iniciarPelea()
    }

    function iniciarPelea() {
        if (ataquedelJugador.length === 5) {
            confirmarCarta.style.pointerEvents = "all"
            confirmarCarta.style.opacity = "1"
        }
    }


    function indexAmbosOponentes(jugador, enemigo, elResultado) {
        indexAtaqueJugador = ataquedelJugador[jugador]
        indexAtaqueEnemigo = ataqueDelRival[enemigo]

        indexEmojiJugador = emojiAtaqueJugador[jugador]
        indexEmojiRival = emojiAtaqueRival[enemigo]
        indexResultado = resultado
    }

    //Comparacion de los ataques selecionados y el resultado del enfrentamiento (1 es nieve, 2 es fuego y 3 es agua).
    function resultados () {

        let imagenCartaBorrarJ = document.getElementById("ataqueElementalJugador")
        let imagenCartaBorrarR = document.getElementById("ataqueElementalRival")

        emojisDelJugador.removeChild(imagenCartaBorrarJ)
        emojisDelRival.removeChild(imagenCartaBorrarR)

        confirmarCarta.style.pointerEvents = "none"
        confirmarCarta.style.opacity = "0"
        contenedorAtaques.style.opacity = "0"
        contenedorAtaques.style.pointerEvents = "none"

        resultadoMensaje.innerHTML = ""
        
        
        let spanconteoJugador = document.getElementById("conteo-jugador")
        let spanConteoRival = document.getElementById("conteo-rival")
        let contenidoTuyoColor = document.getElementById("contenidoTuyo")
        let contenidoRivalColor = document.getElementById("contenidoDelRival")
 
        cajaEnfrentamiento.style.marginTop = "-72px"

        for (let index = 0; index < ataquedelJugador.length; index++) {
            if (ataquedelJugador[index] === ataqueDelRival[index]) {
                indexAmbosOponentes(index, index, index)
                resultado = "EMPATE"
                
                crearMensajes ()}
            else if( (ataquedelJugador[index] == 2 && ataqueDelRival[index] == 3) || (ataquedelJugador[index] == 3 && ataqueDelRival[index] == 1) || (ataquedelJugador[index] == 1 && ataqueDelRival[index] == 2)){       
                indexAmbosOponentes(index, index, index)
                conteoJugador = Math.max(conteoJugador - 1, 0);
                conteoRival++
                spanconteoJugador.innerHTML = conteoJugador
                spanConteoRival.innerHTML = conteoRival 
                resultado = "DERROTA"
                contenidoTuyoColor.style.color = "red"
                contenidoRivalColor.style.color = "Black"
                crearMensajes ()}
            else{
                indexAmbosOponentes(index, index, index)
                conteoRival = Math.max(conteoRival - 1, 0);
                conteoJugador++
                spanconteoJugador.innerHTML = conteoJugador
                spanConteoRival.innerHTML = conteoRival 
                resultado = "VICTORIA"
                contenidoTuyoColor.style.color = "Black"
                contenidoRivalColor.style.color = "red"
                crearMensajes ()}
        } 
        revisarVictorias()
    }

function revisarVictorias (){
    let configuracionDeCarta = document.getElementById("ContenidoTuyo")
    let configuracionDeCartaRival = document.getElementById("ContenidoDelRival")
    let cajaMensajes = document.getElementById("mensajes2")
    if(conteoRival == conteoJugador){
        crearMesajeFinal("Has empatado. tu rival quiere la revancha ¿¡aceptas!?")
        desabilitarBotonesCombates()
        cajaMensajes.style.background = "rgb(202 103 45)"
        cajaMensajes.style.fontSize = "11mm"
        cajaMensajes.style.boxShadow = "rgb(101 69 9) 0px 0px 20px 5px"
        configuracionDeCarta.style.opacity = "0.5"
        configuracionDeCartaRival.style.opacity = "0.5"
        cajaEnfrentamiento.style.background = "#f3dc0d"
    }
    else if(conteoRival > conteoJugador) {
        crearMesajeFinal("Lo Siento, Has Perdido, vuelve a intentarlo")
        desabilitarBotonesCombates()
        cajaMensajes.style.background = "#7f4d5a"
        cajaMensajes.style.fontSize = "11mm"
        cajaMensajes.style.boxShadow = "rgb(147 62 84) 0px 0px 20px 5px"
        configuracionDeCarta.style.opacity = "0"
        cajaEnfrentamiento.style.background = "#ff2929"
        cajaEnfrentamiento.style.border = "solid black"
    }
    else {
        crearMesajeFinal("¡¡Felicidades Has Ganado!! Quieres seguir con tu racha? Vuelve a intentarlo")
        desabilitarBotonesCombates()
        cajaMensajes.style.background = "#FFEB3B"
        cajaMensajes.style.boxShadow = "rgb(255 232 53) 0px 0px 20px 5px"
        configuracionDeCartaRival.style.opacity = "0"
        cajaEnfrentamiento.style.background = "#5cd93d"
        cajaEnfrentamiento.style.border = "solid white"}
}
// PENDIENTE, HACER EL ALGORITMO QUE DECIDA EL RESULTADO DEL DUELO
function crearMensajes() {
    let nuevoEmojiJugador = document.createElement('img')
    let nuevoEmojiEnemigo = document.createElement('img')
    let resultadosLista = document.createElement('p')

        resultadosLista.innerHTML = resultado;
        resultadosLista.setAttribute("id", "cajaMensajes")
        nuevoEmojiJugador.setAttribute("src", indexEmojiJugador);
        nuevoEmojiJugador.setAttribute("id", "emojisProta");
        nuevoEmojiEnemigo.setAttribute("src", indexEmojiRival);
        nuevoEmojiEnemigo.setAttribute("id", "emojisNoProta");


        resultadoMensaje.appendChild(resultadosLista);
        emojisDelJugador.appendChild(nuevoEmojiJugador);
        emojisDelRival.appendChild(nuevoEmojiEnemigo);
}

function crearMesajeFinal(resultadoFinal) {
    let sectionResultadoFinal = document.getElementById("mensajes2")
    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML = resultadoFinal
    
    sectionResultadoFinal.appendChild(parrafo2)
}
function reiniciarJuego() {
    location.reload()
}

//desabilitaciones de botones&Elemento
function desabilitarBotonesCombates() {
    openBotones.style.opacity = "0.5"
    openBotones.style.pointerEvents = "none"
    contenedorPersonajes.style.opacity = "0.5"
}

function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


window.addEventListener("load", iniciarJuego)