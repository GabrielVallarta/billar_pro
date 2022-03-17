class Mover {
    constructor(diameter, borderLimit, color){
      this.id = Date.now() + Math.random();
      this.position = createVector(0, 0);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      //TODO
      this.topSpeed = 20;
      this.color = color;
      //NEW
      this.mass = 3;
      
      //NEW
      this.diameter = diameter;
      this.border = borderLimit + this.diameter/2;
      
      //this.collisionLoss = 0.2;
    }
    setPos(x, y){
      this.position = createVector(x, y);
    }
    //FIX
    getPos(){
      return this.position;
    }
    setVelocity(v1, v2){
      this.velocity = createVector(-v1, -v2);
    }
    setAcc(v1, v2){
      this.acceleration = createVector(-v1, -v2);
    }
    update() {
      this.applyFriction();
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.checkEdges();
      this.acceleration = createVector(0,0);
    }
  
    display() {
      strokeWeight(1);
      fill(this.color);
      circle(this.position.x, this.position.y, this.diameter);
    }
    
    applyForce(force){    
      //NEW
      let f = force.copy();
      f = f.div(this.mass);
   
      this.acceleration.add(f);
    }
    
    //bounce is a boolean, if true -> The friction is more strong
    applyFriction(){
      //TODO
      let cFriction = 0.8;
      this.friction = this.velocity.copy();
      this.friction.mult(-1);
      this.friction.normalize();
      this.friction.mult(cFriction);
      
      //DEBUG
      //print(this.friction.mag());
      
      if(this.friction.mag() < 0.4){
        //print("Hello there")
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.friction = createVector(0,0);
      }else{
        this.applyForce(this.friction);
      }
    }
    
    //EDITED 28 febrero
    checkCollisionsNew(arrayOfBalls){
      let minDistance;
      let distance;
      
      arrayOfBalls.forEach(others => {
        
        if(this.id != others.id){
          distance = p5.Vector.sub(this.position, others.position);
          minDistance = this.diameter/2 + others.diameter/2;
  
          //Collision
          if(distance.mag() < minDistance){
            
            //Avoid internal collisions between objects
            let distanceVector = p5.Vector.sub(others.position, this.position);
            let distanceCorrection = (minDistance - distance.mag())/2;
            let d = distanceVector.copy();
            let correctionVector = d.normalize().mult(distanceCorrection);
            
            others.position.add(correctionVector);
            this.position.sub(correctionVector);
            
            
            let currentVelocity = this.velocity.copy();
            let othersCurrentVelocity = others.velocity.copy();
            
            this.applyForce(currentVelocity.mult(-1));
            
            others.color = this.getRandomColor();
         
          }
        }
      }); //End of forEach
      
    }
    
    checkPoint(){
      //print(this.position.x );
      if(this.position.x < 10){
        return true;
      }else{
        return false;
      }
    }
    
    checkEdges() {
      if (this.position.x > (width - this.border)) {
        this.velocity.x = -this.velocity.x;
        //NEW
        this.applyFriction();
      }
      else if (this.position.x < (0 + this.border)) {
        this.velocity.x = -this.velocity.x;
        //NEW
        this.applyFriction();
      }
  
      if (this.position.y > (height - this.border)) {
        this.velocity.y = -this.velocity.y;
        //NEW
        this.applyFriction();
      }
      else if (this.position.y < (0 + this.border)) {
        this.velocity.y = -this.velocity.y;
        //NEW
        this.applyFriction();
      }
    }
  
    getRandomColor() {
      return "#" + Math.random().toString(16).slice(2,8);
    }
  
  }
  
  