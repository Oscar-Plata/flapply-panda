//PANTALLA
var contexto = document.getElementById("pantalla")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;

//VARIABLES
var FPS =60
var pts = 0
var gravedad= 1.2
var jugador = {
	x:50,
	y:150,
	w:50,
	h:50
}

var obstaculo= new Array()
obstaculo[0]={
	x:contexto.width,
	y:0

}


//AUDIO
var punto = new Audio()
punto.src="aud/punto.mp3"
// IMAGENES
var panda= new Image()
panda.src="img/Panda.png"

var fondo= new Image()
fondo.src="img/space.png"

var piso= new Image()
piso.src="img/piso.png"

var arriba= new Image()
arriba.src="img/tuberiaNorte.png"

var abajo= new Image()
abajo.src="img/tuberiaSur.png"

//CONTROL

function pulsoboton(){
jugador.y -= 35
if (obstaculo.length==0) {
	location.reload()
}
}
resize()
function resize(){
	CANVAS_HEIGHT=window.innerHeight;
	CANVAS_WIDTH=window.innerWidth;
	contexto.width = WIDTH;
	contexto.height = HEIGHT;
	//contexto.style.width=""+CANVAS_WIDTH +"px";
	contexto.style.height=""+CANVAS_HEIGHT+"px";
}



//BUCLE
setInterval(loop,1000/FPS)
function loop(){
	
	ctx.clearRect(0,0,300,530) // Tamaño del canvas
	
	//Fondo
		ctx.drawImage(fondo,0,0)
		ctx.drawImage(piso,0,contexto.height - piso.height)
	
	//Personaje
		ctx.drawImage(panda,jugador.x,jugador.y)


	//Tuberias
	for (var i =0; i < obstaculo.length; i++ ){
		var desfaz = arriba.height+120
		if (pts>=10) {
		var desfaz = arriba.height+110
		}
		ctx.drawImage(arriba,obstaculo[i].x,obstaculo[i].y)
		ctx.drawImage(abajo,obstaculo[i].x,obstaculo[i].y + desfaz)
		obstaculo[i].x--

		if (obstaculo[i].y + arriba.height < 90) {
				obstaculo[i].y = 0
		}

		if (obstaculo[i].x==155){
			obstaculo.push({
				x:contexto.width,
				y:Math.floor(Math.random()*arriba.height) - arriba.height
				})
		}
		//COLISIONES
		if(jugador.x + panda.width >= obstaculo[i].x &&
			jugador.x <= obstaculo[i].x + arriba.width &&
			(jugador.y <= obstaculo[i].y + arriba.height ||
				jugador.y + panda.height >= obstaculo[i].y + desfaz)
				|| jugador.y + panda.height >= contexto.height - piso.height){
			//location.reload()
		obstaculo.length=0
		gravedad=0
		}

		//PUNTOS
		if (obstaculo.length!=0) {
		if (obstaculo[i].x== jugador.x) {
			pts++
			punto.play()
		}}
	}
		if (obstaculo.length==0) {
		ctx.fillStyle="rgba(0,0,0,.6)"
		ctx.fillRect(30,170,250,200)
		ctx.fillStyle="rgba(255,255,255,.6)"
		ctx.fillRect(25,165,250,200)
		ctx.fillStyle="rgba(0,0,0,1)"
		ctx.fillText("Puntaje final",77,220)
		ctx.fillStyle="rgba(100,0,0,1)"
		ctx.fillText(pts,150,250)
		ctx.fillText("GAME OVER ",75,190)
		//ctx.font="15px arial"
		ctx.fillText("Pulsa cualquier",50,315)
		ctx.fillText("boton para jugar" ,50,330)
		
		}else {
		
		ctx.fillStyle ="rgba(255,255,255,1)"
		ctx.font = "italic bold 25px Arial"
		ctx.fillText("Puntos: "+pts,10,contexto.height-40)
		ctx.fillStyle ="rgba(0,0,0,1)"
		
		ctx.fillText("Puntos: "+pts,7,contexto.height-43)

		}


	//CONDICIONES
	jugador.y += gravedad
}

//Eventos
window.addEventListener("resize",resize)
window.addEventListener("keydown",pulsoboton)