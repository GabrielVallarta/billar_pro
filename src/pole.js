class Pole {
 
    //Position of Target
    constructor(){
      this.force = 0;
      this.beige = color(255, 234, 172);
      this.wood = color('#8A5A25');
      this.shadow = color(0,0,0,90);
      this.size = 400;
      this.thickness = 8;
      this.air = 20;
      this.target = createVector(0,0);
    }
    setTarget(target){
      this.target = target;
    }
    //paint(angle){
    paint(){
      //this.angle = angle;
      this.getAngle();
      //this.evoke();
    }
    evoke(){
      
      //let x = mouseX + this.air;
      //let y = mouseY + this.air;
      let x = this.target.x;
      let y = this.target.y;
      let shad = 20;
     
    }
    
    getAngle(){
      
      let mouseVect = new createVector(mouseX,mouseY);
      let origin = new createVector(this.target.x,this.target.y);
      let horizon = createVector(1000,this.target.y);
      
      line(origin.x, origin.y, horizon.x, horizon.y);
      line(origin.x, origin.y, mouseX, mouseY);
      
      let base = createVector(origin.x, origin.y, horizon.x, horizon.y);
      let poleVect = createVector(origin.x, origin.y, mouseX, mouseY);
      
      let a = base.angleBetween(poleVect)*180; 
      print(a);
      
      let x = this.target.x;
      let y = this.target.y;
      
      stroke(this.thickness);
      fill(this.beige,0.2);
      
      line(x,y,this.size*0.4,mouseX,50);
      fill(this.wood);
      x = x + this.size*0.4;
      line(x,0,this.size*0.6,this.thickness);
      
      /*
      let mouseVect = new createVector(mouseX,mouseY);
      let origin = new createVector(this.target.x,this.target.y);
      let horizon = createVector(1000,this.target.y);
      
      let base = horizon.angleBetween(mouseVect)*-180; 
      print(base);
      
      line(origin.x, origin.y, horizon.x, horizon.y);
      
      //print(this.target.x,this.target.y);
      //mouseVect.sub(origin);
      let dir = createVector(origin.x, origin.y,mouseVect.x,mouseVect.y);
      
      let base2 = horizon.angleBetween(mouseVect)*-180; 
      print(base2);
      //print(this.angle);
      this.angle = base; 
      */
    }
    
    hit(){
         
      new_direction = createVector(lastX-firstX, lastY-firstY);
      //NEW
      powerOfShot = pow((lastX-firstX), 2) + pow((lastY-firstY),2);
      //print("The power of the shot: " + powerOfShot);
  
      //print("Before multiply: " + new_direction);
      //new_direction.mult(powerOfShot);
      new_direction.normalize();
      new_direction.mult(powerOfShot*0.001);
      //print("After multiply: " + new_direction);
  
      this.target.setVelocity(new_direction.x, new_direction.y);
  
    }
     
  }