let knights = [];
let helmetImages = [];
let bg, border, corner;
let myFont;

function preload(){
  
  bg = loadImage('paper2.png');
  border = loadImage('border.png');
  corner = loadImage('corner.png');
 myFont = loadFont('unifrakturmaguntia-regular.ttf');
  
  helmetImages.push(loadImage('helmet1.png'));
  helmetImages.push(loadImage('helmet2.png'));
  helmetImages.push(loadImage('helmet3.png'));
  helmetImages.push(loadImage('helmet4.png'));
  helmetImages.push(loadImage('helmet5.png'));
  helmetImages.push(loadImage('helmet6.png'));  

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  
  
  
  cornerLink = createA('../index.html', '');
  
  let cornerImg = createImg('corner.png', 'corner');
  cornerLink.child(cornerImg);

  cornerImg.style('width', '130px');    
  cornerImg.style('height', '150px');   
  cornerImg.style('position', 'absolute');
  cornerImg.style('top', '0px');
  cornerImg.style('right', '0px');
}

function draw() {
  image(bg, 0, 0, width, height);
  image(border, 10, 10, width / 2 - 20, height - 10);

  for (let knight of knights) {
    knight.update();
    knight.display();
  }
  
    if (knights.length === 0) {
    let spacingX = (width / 2 - 200) / 2; // two columns
    let spacingY = height / 5;
    let startX = width * 0.65;
    let startY = height / 3;

    for (let i = 0; i < helmetImages.length; i++) {
      let col = i % 2;
      let row = Math.floor(i / 2);
      let x = startX + col * spacingX;
      let y = startY + row * spacingY;
      knights.push(new Knight(x, y, helmetImages[i], i % 6)); 
    }
  }

  for (let knight of knights) {
    knight.update();
    knight.display();
  }
  
 let instruction = "Click upon the knightly helms, thou spongy folly-fallen knave!";
  fill(20); // Dark ink color
  textFont(myFont);
  textSize(22); // Adjust size as needed
  textAlign(CENTER, CENTER);

  let boxW = width / 2 - 280; // width of text box inside border
  let boxH = 150; // height of the text box
  let textX = 10 + ((width / 2 - 20) - boxW) / 2; // center the box inside the border
  let textY = height / 2 -100;

text(instruction, textX, textY, boxW, boxH);


  for (let knight of knights) {
    knight.update();
    knight.display();
  }

  if (knights.length === 0) {
    let spacingX = (width / 2 - 200) / 2; // two columns
    let spacingY = height / 5;
    let startX = width * 0.65;
    let startY = height / 3;

    for (let i = 0; i < helmetImages.length; i++) {
      let col = i % 2;
      let row = Math.floor(i / 2);
      let x = startX + col * spacingX;
      let y = startY + row * spacingY;
      knights.push(new Knight(x, y, helmetImages[i], i % 6));
    }
  }
  
}

function mousePressed() {
  for (let knight of knights) {
    if (knight.contains(mouseX, mouseY)) {
      knight.react();
    }
  }
}

class Knight {
  constructor(x, y, img, type) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.r = 60;
    this.type = type;
    this.timer = 0;
    this.angle = 0;
    this.offset = 0;
    this.scale = 1;
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }

  react() {
    this.timer = 30;
  }

  update() {
    if (this.timer > 0) {
      this.timer--;

      switch (this.type) {
        case 0: // Shake
          this.angle = random(-0.1, 0.1);
          break;
        case 1: // Bounce
          this.offset = sin(frameCount * 0.3) * 10;
          break;
        case 2: // Grow
          this.scale = 1.2;
          break;
        case 3: // Rotate
          this.angle += 0.1;
          break;
        case 4: // Wobble
          this.angle = sin(frameCount * 0.5) * 0.3;
          break;
        case 5: // Pulse
          this.scale = 1 + sin(frameCount * 0.4) * 0.1;
          break;
      }
    } else {
      this.angle = 0;
      this.offset = 0;
      this.scale = 1;
    }
  }

  display() {
    push();
    translate(this.x, this.y + this.offset);
    rotate(this.angle);
    scale(this.scale);
    imageMode(CENTER);
    image(this.img, 0, 0, 130, 150);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}