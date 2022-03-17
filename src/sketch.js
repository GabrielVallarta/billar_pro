let mover;
let lastMousePressed;  
let arr = [];
//NEW
let myBackground;
let borderLimit;
let ballDiam;

let myPole;

let lastX;
let lastY;
let firstX;
let firstY;


function setup() {
  createCanvas(640,360);
  lastMousePressed = false;
  //NEW
  borderLimit = 10;
  //ballDiam = 48;
  ballDiam = 38;
  //NEW
  //Diameter of hole + Border
  myBackground = new poolBackground(55,borderLimit);
  
  myPole = new Pole();
  
  lastX = 0;
  lastY = 0;
  
  firstX = 0;
  firstY = 0;
  
  //Colocando Balls
  //Ball 1
    mover = new Mover(ballDiam, borderLimit, color(210,210,20));
    mover.setPos(120, 120);  
    arr.push(mover); 
  //Ball 2
    mover = new Mover(ballDiam, borderLimit, color(255,255,255));
    mover.setPos(120, 220);   
    arr.push(mover); 
  //Ball 3
    mover = new Mover(ballDiam, borderLimit, color(255,0,0));
    mover.setPos(520,170);  
    arr.push(mover); 
  
}


function draw() {
  
  //NEW
  //background(240);
  myBackground.paintBackground();
  
  
  //Force indicator /////////////////////////////////
  //This fill is for the Power Bar!
  stroke(0);
  fill('#F70547'); //Power Color
  let mouse = new createVector(mouseX,mouseY);
  let center = new createVector(firstX,firstY);
  mouse.sub(center);
  let m = mouse.mag();
  //rect(0,0,m,10);  --> Movido dentro de if(mouseIsPressed)
  
  ////////////////////////////////////////////////
 
  //Circle before creating Ball
  
  
  for(let i = 0; i < (arr.length); i++){
    arr[i].update();
    arr[i].display();
  
    arr[i].checkCollisionsNew(arr);
    
  
    if(arr[i].checkPoint()){
      arr.splice(i,1);
    }
    //NEW 24 Febrero
    
  } 
  
  if(mouseIsPressed){
    
    //Paint Power Bar!
    rect(0,0,m,10);
    
    //NEW - PALO
    myPole.setTarget(arr[1].getPos());
    //myPole.paint(this.getAngle()); //20 degrees
    myPole.paint(); //20 degrees
    
  }
}


function mouseReleased(){
  
  //Para evitar que se salga de la pantalla y pinte cosas
  if(mouseX > (0 + borderLimit) && mouseX < (width - borderLimit)       && mouseY > (0 + borderLimit) && mouseY < (height - borderLimit) ){
    
    lastX = mouseX;
    lastY = mouseY;
  }
}

function mousePressed(){
  firstX = mouseX;
  firstY = mouseY;
}

function keyPressed() {
  if (keyCode === SHIFT) {
    myBackground.swapColors();
    //print(arr[0].getPos().x);
  }

}