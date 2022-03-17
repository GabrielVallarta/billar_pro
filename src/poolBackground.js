class poolBackground {

    constructor(diam, borderLimit){
      this.baseColor = color('#06AEA0'); //Base Green
      this.cornerColor = color('#8A5A25'); //Border Brown 
      this.border = borderLimit;
      this.holeDiameter = diam;
      
      this.colorFlag = true;
    }
    paintBackground(){
      
      background(this.baseColor);
    
      //Borders
      //Color of borders
      fill(this.cornerColor);
      noStroke();
      rect(0,0, this.border, height); //Left
      rect(width,0, -(this.border), height); //Right
      rect(0, 0, width, this.border); //Top
      rect(0, height, width, -(this.border)); //Down
      
  
    }
    
    swapColors(){
      if(this.colorFlag){
          //this.baseColor = color('#92121A'); //Base Red
          //this.cornerColor = color('#ffd700'); //Border Golden 
          this.baseColor = color('#92121A'); //Base Red
          this.cornerColor = color('#8A5A25'); //Border Brown 
          this.colorFlag = false;
      }else{
        this.baseColor = color('#06AEA0'); //Base Green
        
         this.cornerColor = color('#5C3E04'); //Border Dark 
        this.colorFlag = true;
      }
    
    }
  }