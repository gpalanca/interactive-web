let bg;
let stamp;
let border;
let myFont;
let william;
let corner;



let insultBoxes = []; 

function preload() {
  myFont = loadFont('unifrakturmaguntia-regular.ttf');
  bg = loadImage('paper2.png');
  border = loadImage('border.png');
  stamp = loadImage('stampp.png');
  william = loadImage('william-resized.png');
  corner = loadImage('corner.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont(myFont);
  noCursor();
  
  cornerLink = createA('../puppet_show/index.html', '');
  
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
  image(william, width/8.5, 150, width/4-20, height/2);
  image(corner, width, height, 10, 10);
  
image(border, width/2 + 20, 10, width / 2 - 20, height - 10);
  
let borderX = width / 2 + 10;
let borderY = 10;
let borderW = width / 2 - 20;
let borderH = height - 40;

let paragraphWidth = borderW - 350; 
let paragraphX = borderX + (borderW - paragraphWidth) / 2;
let paragraph = "William Shakespeare, often regarded as the greatest playwright in the English language, transformed literature with his rich storytelling, complex characters, and poetic mastery. His works explore timeless themes like love, power, betrayal, and ambition, and have been adapted across cultures and centuries. From the tragedies of “Hamlet” and “Macbeth” to the comedies of “A Midsummer Night’s Dream” and “Twelfth Night,” Shakespeare’s influence on theater and language is unparalleled.";

fill('#2C2C2C');
noStroke();
textAlign(LEFT, TOP);
textSize(24);
textFont(myFont);

let words = paragraph.split(' ');
let line = '';
let lines = [];
for (let i = 0; i < words.length; i++) {
  let testLine = line + words[i] + ' ';
  if (textWidth(testLine) > paragraphWidth && i > 0) {
    lines.push(line);
    line = words[i] + ' ';
  } else {
    line = testLine;
  }
}
lines.push(line);

let lineHeight = 20;
let totalHeight = lines.length * lineHeight;
let paragraphY = borderY + (borderH - totalHeight) / 2; 

for (let i = 0; i < lines.length; i++) {
  text(lines[i], paragraphX, paragraphY + i * lineHeight);
}


  for (let box of insultBoxes) {
    drawInsultBox(box.x, box.y, box.angle);
  }

  if (!(mouseX > width - 150 && mouseY < 150)) {
    image(stamp, mouseX - 130, mouseY - 150, 260, 300); 
  }
  
  
}


function mousePressed() {
  let angle = random(-PI / 8, PI / 8); 
  insultBoxes.push({ x: mouseX, y: mouseY, angle: angle });
}

function drawInsultBox(x, y, angle) {
  let textString = 'Thou sodden-witted lord! thou hast no more brain than I have in mine elbows';
  let textHeight = 32;
  let w = 300;
  let h = textHeight * 3 + 20;

  push();
  translate(x, y);
  rotate(angle);

  noFill();
  stroke('#990000');
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, w, h, 4);
  strokeWeight(3);
  rect(0, 0, w + 10, h + 10, 4);

  fill('#990000');
  noStroke(); 
  wrapText(0, 0, w, textString, textHeight, h); 

  pop();
}


function wrapText(x, y, maxWidth, str, lineHeight, boxHeight) {
  let words = str.split(' ');
  let line = '';
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);

    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let totalTextHeight = lines.length * lineHeight;
  let startY = y - totalTextHeight / 2 + lineHeight / 2;

  textAlign(CENTER, TOP); 

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * lineHeight);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
