let knights = [];
let helmetImages = [];
let insultParticles = [];
let bg, border, corner, myFont;
let spear;

let insults = [
  "Thou art a boil!",
  "You roguish hedge-born scullion!",
  "Thine face offendeth mine eyes!",
  "Away, you starveling!",
  "Thou spongy folly-fallen knave!",
  "Thou art as loathsome as a toad."
];



function preload(){
  
  bg = loadImage('paper2.png');
  border = loadImage('border.png');
  corner = loadImage('corner.png');
  spear = loadImage('spear.png');
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
  cursor ('none');
  
  
  
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
    let spacingX = (width / 2 - 100) / 2; 
    let spacingY = height / 4;
    let startX = width * 0.65;
    let startY = height / 3;

    for (let i = 0; i < helmetImages.length; i++) {
      let col = i % 2;
      let row = Math.floor(i / 2);
      let x = startX + col * spacingX;
      let y = startY + row * spacingY;
      knights.push(new Knight(x, y, helmetImages[i], i % 6)); 
    }
      
        for (let i = insultParticles.length - 1; i >= 0; i--) {
    insultParticles[i].update();
    insultParticles[i].display();
    if (insultParticles[i].isDead()) {
      insultParticles.splice(i, 1);
    }
  }

  }

  for (let knight of knights) {
    knight.update();
    knight.display();
  }
  
 let instruction = "In sooth, the tilt-yard and the Bard are kin; for as knights do break their lances in bold display, so do Shakespeare’s men clash words with wit and fire. The tourney’s charge and courtly grace live alike in Hal’s rise and Henry’s might. Both sport and speech do strive for honor, their glory fleeting, yet full of noble show. Thus jousting bout has commenced. Choose thy opponent sensibly. Click upon the knightly helms, thou spongy folly fallen knave!";
  fill(20); 
  textFont(myFont);
  textSize(24); 
  textAlign(CENTER, CENTER);
  
  

let boxW = width / 2 - 300; 
let boxH = 400; 
let textX = 10 + ((width / 2 - 50) - boxW) / 2; 
let textY = height / 2 -210;

text(instruction, textX, textY, boxW, boxH);


  for (let knight of knights) {
    knight.update();
    knight.display();
  }

 if (knights.length === 0) {
  let cols = 2;
  let helmetWidth = 150;
  let helmetHeight = 180;
  let paddingX = 300;
  let paddingY = 500;
  
  let spacingX = helmetWidth + paddingX;
  let spacingY = helmetHeight + paddingY;
  
  let startX = width * 0.6;
  let startY = height * 0.2;

  for (let i = 0; i < helmetImages.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = startX + col * spacingX;
    let y = startY + row * spacingY;
    knights.push(new Knight(x, y, helmetImages[i], i % 6));
  }
}


for (let i = insultParticles.length - 1; i >= 0; i--) {
  insultParticles[i].update();
  insultParticles[i].display();
  if (insultParticles[i].isDead()) {
    insultParticles.splice(i, 1);
  }
}

image(spear, mouseX, mouseY, 300, 300); 



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
    this.insult = ''; // new
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }

    react() {
    for (let i = 0; i < 3; i++) {
      let insult = random(insults);
      insultParticles.push(new InsultParticle(this.x, this.y, insult));
    }
    this.timer = 30;
  }


  update() {
    if (this.timer > 0) {
      this.timer--;
    } else {
      this.insult = '';
    }
  }

  display() {
    push();
    translate(this.x, this.y + this.offset);
    rotate(this.angle);
    scale(this.scale);
    imageMode(CENTER);
  
    noFill();
    stroke(0);
    strokeWeight(4);
    rectMode(CENTER);
    rect(0, 0, 150, 170); 

    strokeWeight(2);
    rect(0, 0, 140, 160); 

    image(this.img, 0, 0, 130, 150);
    pop();
  
    if (this.insult !== '') {
      push();
      textFont(myFont);
      textSize(18);
      fill(20);
      textAlign(CENTER, BOTTOM);
      text(this.insult, this.x, this.y - 80);
      pop();
    }
  }
  
}

class InsultParticle {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.vx = random(-2, 2);
    this.vy = random(-4, -1);
    this.alpha = 255;
    this.angle = random(-PI/8, PI/8);
    this.rotation = random(-0.05, 0.05);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; 
    this.alpha -= 3;
    this.angle += this.rotation;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textFont(myFont);
    textSize(18);
    fill(20, this.alpha);
    textAlign(CENTER);
    text(this.text, 0, 0);
    pop();
  }

  isDead() {
    return this.alpha <= 0;
  }
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cursor ('none');
}