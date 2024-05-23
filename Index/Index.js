const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000;
const Minuto = 60 * 2000

app.use(express.static("public"))
app.use(cors())
app.use(express.json())

let jugadores = []
let oponentes = []

setInterval(reinicio, Minuto)
function reinicio(){
    jugadores = []
}

class Jugador {
    constructor(id) {
    this.id = id
    }

    asignarNinja(ninja) {
        this.ninja = ninja
    }

    actualizarPosicion(x, y, enCombate) {
        this.x = x
        this.y = y
        this.enCombate = enCombate
    }
    asignarCarta(carta, imgCarta) {
        this.carta = carta
        this.imgCarta = imgCarta
    }
}

class Ninjas {
    constructor(nombre) {
        this.nombre = nombre
    }

}

// Endpoint para obtener id
app.get("/unirse",(req, res)  => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id);
})

app.post("/cardJitsu/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "lol"
    const nombre = req.body.ninja || "lol"
    const ninja = new Ninjas(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador => jugadorId === jugador.id))


    if (jugadorIndex !== -1) {
        jugadores[jugadorIndex].asignarNinja(ninja)
    }

    console.log(jugadores)
    res.end()
})

app.post("/cardJitsu/volver/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "lol"    
    
    const peleadorIndex = oponentes.findIndex((jugador => jugadorId === jugador.id))


    if (peleadorIndex !== -1) {        
        jugadores.push(oponentes[peleadorIndex]);
        oponentes.splice(peleadorIndex, 1);
    }

    console.log(jugadores)
    console.log(oponentes, "Nada")
    res.end()
})

app.post("/cardJitsu/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const enCombate = req.body.enCombate

    const jugadorIndex = jugadores.findIndex((jugador => jugadorId === jugador.id))
    const indiceBoolean = jugadores.findIndex((jugador => jugador.enCombate === true))


    if (indiceBoolean !== -1) {
        // Si se encuentra el array con el nombre "Pedro", elimínalo
        oponentes.push(jugadores[indiceBoolean]);
        jugadores.splice(indiceBoolean, 1);
        console.log('Se eliminó el jugador porque entro en combate');
        console.log('Array en combate:', oponentes);
        console.log('Array actualizado:', jugadores);
      }
    else if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y, enCombate)
    }
  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) 

    res.send({
        enemigos
    })

})


app.post("/cardJitsu/:jugadorId/carta", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const carta = req.body.carta || []    
    const imgCarta = req.body.imgCarta || []  
    const jugadorIndex = oponentes.findIndex((jugador => jugadorId === jugador.id))

    if (jugadorIndex >= 0) {
        oponentes[jugadorIndex].asignarCarta(carta, imgCarta)
    }
    res.end()
})

app.get("/cardJitsu/:jugadorId/carta", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = oponentes.find((jugador) => jugador.id === jugadorId)
    res.send({
        carta: jugador.carta || [],
        imgCarta: jugador.imgCarta || []
    })
})


app.listen(3000,() => {
    console.log("servidor listo")
})