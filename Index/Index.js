const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000;

app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const jugadores = []
class Jugador {
    constructor(id) {
    this.id = id
    }

    asignarNinja(ninja) {
        this.ninja = ninja
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques, emojis) {
        this.ataques = ataques
        this.emojis = emojis
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
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.ninja || "lol"
    const ninja = new Ninjas(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador => jugadorId === jugador.id))

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarNinja(ninja)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/cardJitsu/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador => jugadorId === jugador.id))

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)


    res.send({
        enemigos
    })
})

app.post("/cardJitsu/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []    
    const emojis = req.body.emojis || []  
    const jugadorIndex = jugadores.findIndex((jugador => jugadorId === jugador.id))

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques, emojis)
    }
    res.end()
})

app.get("/cardJitsu/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || [],
        emojis: jugador.emojis || []
    })
})



app.listen(3000,() => {
    console.log("servidor listo")
})