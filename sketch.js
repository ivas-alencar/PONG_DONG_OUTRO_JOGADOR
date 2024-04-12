//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

let velocidadeXBolinha = 7;

let velocidadeYBolinha = 7;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 100;

let raqueteXOponente = 585;
let raqueteYOponente = 150;
//o valor da variável será manibulaado dentro da função
let velocidadeYOponente;

let colidiu = false;
//Placar do jogo
let meuPlacar = 0;
let placarOponente = 0;

let ponto;
let raquetada;
let trilha;

let chanceDeErrar = 0.1;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  moveBolinha();
  verificarColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  verificarColisaoBolinha(xRaquete, yRaquete);
  mostrarRaquete(raqueteXOponente, raqueteYOponente);
  movimentaRaqueteOponente();
  verificarColisaoBolinha(raqueteXOponente, raqueteYOponente);
  incluiPlacar(meuPlacar);
  incluiPlacar(placarOponente);
  marcaPonto();
}

//função que mostra a bolinha
function mostraBolinha(){
  circle (xBolinha,yBolinha,diametro);
}
//função que movimenta a bolinha
function moveBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
//função que verificar o impacto da bolinha e redireciona
function verificarColisaoBorda(){
  if ( xBolinha + raio > width || xBolinha - raio < 0) {
   velocidadeXBolinha *= -1;
  }
  
  if ( yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x,y){
  rect(x,y, larguraRaquete, alturaRaquete);
}
//função para movimentar minha raquete
function movimentaRaquete (){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete,10,290);
}

function verificarColisaoBolinha(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio)
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  //tecla w
  if(keyIsDown(87)){
    raqueteYOponente -= 10;
  }
  //tecla s
  if(keyIsDown(83)){
    raqueteYOponente += 10;
  }
  //Limita a raquete até a borda
  raqueteYOponente = constrain (raqueteYOponente, 10, 290);
  }

function incluiPlacar(){
  //borda
  stroke(255);
  //centralizar
  textAlign(CENTER);
  //tamanho do numero
  textSize(20);
  //cor e retangulo
  fill(color (205,133,63));
  rect(150,10, 40,20);
  //cor do placar
  fill(222);
  text(meuPlacar, 170,26);
  ////cor e retangulo
  fill(color (205,133,63));
  rect(450,10, 40,20);
  //cor do placar
  fill(222);
  text(placarOponente, 470,26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meuPlacar += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    placarOponente += 1;
    ponto.play();
  }
}
function calculaChanceDeErrar(){
  if (placarOponente >= meuPlacar){
  chanceDeErrar +=1;
  } 
}