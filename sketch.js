// coment
let imagenFondo
let imagenInicial
let personaje
let pared
let x = 0
let posY = 100
let posX = 100
let dY = 3
let estado = 0 // 0: inicio, 1: juego, 2: game over
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaFondo

function preload() {
 // put preload code here
 imagenFondo = loadImage("./images/descarga.jpg")
imagenInicial = loadImage("./images/descarga-fondo.jpg")
 personaje = loadImage("./images/sombrerodevaquero.png")
pared = loadImage("./images/pared.png")
musicaRecord = loadSound("./sounds/aplauso.wav")
musicaFondo = loadSound("./sounds/musicafondo.mp3")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    background(255)
    imageMode(CORNER)
    // Dibujo del fondo del juego (se repite)
    // Aseguramos que la altura de la imagen sea igual al 'height' del canvas
    image(imagenFondo, x, 0, imagenFondo.width, height) 
    image(imagenFondo, x + imagenFondo.width, 0, imagenFondo.width, height)
        
    x = x - 5
    if (x <= -imagenFondo.width){
      x = 0
    }
    
    dY = dY + 1
    posY = posY + dY
    for (let i = 0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(pared,wallX[i],wallY[i]-500)
      image(pared,wallX[i],wallY[i]+500)

      if (wallX[i] < -50) {
        wallX[i] = width + 100
        wallY[i] = random(200,300)
      }

      if (wallX[i] === posX) {
        puntaje = puntaje + 1
        puntajeMax = max(puntaje,puntajeMax)
      }
      
      wallX[i] = wallX[i] - 5
      
      if (posY <= -60  || posY >= height 
        || (abs(wallX[i]-posX)<60 && abs(wallY[i]-posY)>100)) {
        musicaFondo.stop()
        estado = 0
      } 
  }

    image(personaje,posX,posY,60,60)
    text("Puntaje: " + puntaje, width/2 - 60,30)
  } else if (estado === 0) {
    cursor()
    background(0)
    imageMode(CORNER)
    // CORRECCIÓN: Usamos 'width' y 'height' para cubrir todo el canvas
    image(imagenInicial, 0, 0, width, height)  
    textSize(24)
    fill(255)
    text("Puntaje Máximo: "+ puntajeMax, 600,100)
    text("Clic para jugar",600,200)
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying()) {
        musicaRecord.play()
      }
    }
  }

}


function mousePressed() {
  if (estado === 0) {
    estado = 1
    posY = 100
    x = 0
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
  }
dY = -10
}