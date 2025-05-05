let bg;
let border;
let myFont;
let puppet;
let corner;

let insults = ['Thou art a boil', 'Thy wit’s as thick as Tewkesbury mustard', 'Peace, filthy worm!', 'Away, you three-inch fool!',
  'You Banbury cheese!', 'Thou lily-livered boy', 'Peace, ye fat guts!', 'Thine face is not worth sunburning', 
  'Your virginity breeds mites, much like a cheese', 'Thou art unfit for any place but hell', 
  'You scullion! You rampallian! You fustilarian!', 'Thy tongue outvenoms all the worms of Nile', 
  'More of your conversation would infect my brain', 'I’ll beat thee but I would infect my hands', 
  'Thou damned and luxurious mountain goat', 'Out of my sight! Thou dost infect my eyes'];

let selectedInsult = null;
let puppetX, puppetY, puppetW, puppetH;
let cornerLink;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont(myFont);
  
  puppetW = width / 3 - 40;
  puppetH = height / 2 - 40;
  puppetX = width / 11;
  puppetY = 160;
  
  cornerLink = createA('../helmet/index.html', '');
  
  let cornerImg = createImg('corner.png', 'corner');
  cornerLink.child(cornerImg);

  cornerImg.style('width', '130px');    
  cornerImg.style('height', '150px');   
  cornerImg.style('position', 'absolute');
  cornerImg.style('top', '0px');
  cornerImg.style('right', '0px');
  
}

function preload() {
  myFont = loadFont('unifrakturmaguntia-regular.ttf');
  bg = loadImage('paper2.png');
  border = loadImage('border.png');
  puppet = loadImage('puppets.png');
  corner = loadImage('corner.png');
}

function draw() {
  image(bg, 0, 0, width, height);
  image(border, 10, 10, width / 2 - 20, height - 10);
  image(puppet, width / 11, 160, width / 3 - 40, height / 2 - 40);
  image(corner, width, height, 10, 10);
  
  image(border, width / 2 + 20, 10, width / 2 - 20, height - 10);  // Right border
  
  let coverLines = [
    { text: "The Tragedy of", size: 26 },
    { text: "Lady Puddlewick", size: 38 },
    { text: "by", size: 20 },
    { text: "William Shakespeare", size: 26 },
    { text: "First performed at the Globe Theatre", size: 18 },
    { text: "Printed in the Year of Our Lord 1623", size: 18 },
    { text: "“A tragic tale of a lady whose dramatic flair,\nleads her to an epic downfall.”", size: 16 }
  ];

  // Border calculations
  let borderX = width / 2 + 5; // Right-side border
  let borderY = 10;
  let borderW = width / 2 - 20;
  let borderH = height - 40;

  // Paragraph width inside the border
  let paragraphWidth = borderW - 200;  // Reduce the width for padding
  let paragraphX = borderX + (borderW - paragraphWidth) / 2;  // Centered inside right border
  
  // Measure total height for all lines
  let lineHeightPadding = 10;
  let totalHeight = 0;
  for (let line of coverLines) {
    totalHeight += line.size + lineHeightPadding;
  }

  // Positioning the text vertically centered
  let paragraphY = borderY + (borderH - totalHeight) / 2;

  // Set text styles and position
  textAlign(CENTER, TOP);
  fill('#232323');
  noStroke();
  textFont(myFont);

  let currentY = paragraphY;
  for (let line of coverLines) {
    textSize(line.size);
    text(line.text, paragraphX, currentY, paragraphWidth);  // Text centered inside border
    currentY += line.size + lineHeightPadding;
  }

  // If insult selected, show the speech bubble
  if (selectedInsult !== null) {
    drawSpeechBubble(width / 4, 250, selectedInsult);
  }
}

function mousePressed() {
  if (mouseX > puppetX && mouseX < puppetX + puppetW && mouseY > puppetY && mouseY < puppetY + puppetH) {
    selectedInsult = random(insults);  
  }
}

function drawSpeechBubble(x, y, textContent) {
  let bubbleWidth = 150;
  let bubbleHeight = 75;

  fill(235);
  noStroke();
  triangle(x + 10, y + 57, x - 12, y + 80, x + 25, y + 60);
  
  fill(235);
  noStroke();
  rect(x, y, bubbleWidth, bubbleHeight, 10); 

  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text(textContent, x + 10, y + 10, bubbleWidth - 20, bubbleHeight - 20); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
