
// Sophie Sanchez 
// Pascal Huynh
// WEB AND FX: FROM THEORY TO PRACTICE, 502-A22, sec. 00001
// Chesselove 
//https://openprocessing.org/sketch/1885224



/* (Instruction)

in the screen0 use the mouse to click and changes the colors of the background as well to change to the screen 2
in the screen 1(spatial screen) use the mouse to click  anywhere around the canvas and create smoke caused by the comet 
- use the arrow keys to move the rat where you have to choose between the heart or the chesse, so when you approach to one of them the scenerio will change
in the screen 2 ( heart screen) use the space bar to move and put together the rats
in the screen 3 (chesse screen) click mouse and then use the arrow keys to move the rat side to side in order to trap the chesses (you have to trap 20 chesees then a message appear )

(Analysis / artist statement)

This game is an interactive experience where you control a rat floating alone in space. The rat discovers two things that bring him happiness: cheese and love. 
These two things motivate the rat, as even though he is alone in space, interacting with the things he loves makes his life more joyful and exciting. 
The game allows him to teleport to different places where he can find the things he need in his life to be happy.


*/

let x, y, u, a;
let yellowchesse, moon,rat;
var bubbles = [];
let img;
let r = 0;
let s = 0;
let rs = 0;
let sr = 0;
let out = 100;
var screen = 0;
let speed = 2;
let rat1, rat2, heart;
let rat1X, rat1Y, rat2X, rat2Y;
let heartX, heartY;
let heartVisible = false;
let closed = false;
let stop= false;
let cheeses, score;
let ratXX,ratYY;
let comet;
let cometImg;
let smokeImg;
let smokeParticles = [];
let speed2 = { x: 5, y: 5 };
let comets = [];

function setup() {

  createCanvas(800, 800);
  moon = loadImage('moon .png')
  rat1 = loadImage('the rat .png');
  rat2 = loadImage('the rat 22.png');
  heart = loadImage('heart pixel.png');
  yellowchesse=loadImage('yellow cheese.png');
  cometImg = loadImage("comet.png");
  smokeImg = loadImage("smoki.png");
  blackhole= loadImage("Black-Hole-.png");



  //  initial position and velocity of the rat 
  r = 200;
  s = 200;
  rat1X = 50;
  rat1Y = height / 2;
  rat2X = width-50;
  rat2Y = height / 2;
  heartX = width / 2;
  heartY = height / 4;

  // set up for the position and the size of the stars
  for (var i = 0; i < 10; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      radius: random(50, 100)
    });
  }

  // size and position of the chesselove
  textSize(82);
  textAlign(CENTER, CENTER);
  textFont("times new roman")
  u = width / 2;
  a = height / 2;
  
// many chesses function 
 cheeses = [];
 // Set initial score to 0
  score = 0;
//set the rat for the chesseScreen 
  ratXX = 500;
  ratYY = 600;
  
  
  // Initialize comets
  for (let i = 0; i < 10; i++) {
    comets.push({
      x: random(width),
      y: random(height),
      width: 50,
      height: 50
    });
    
  }
  
}


function draw() {
  // screen to change the scenes 
  background(0);
  if (screen == 0) {
    chesselove();
  } else if (screen == 1) {
    spatialScreen();
  } else if (screen == 2) {
    heartScreen();
  }if (screen == 3) {
  chesseScreen(); 
  }

}
// when clicking the canvas the scenario changes 
function chesselove() {
  background(u, a, 100);
  text("chesselove", u, a);
  background(12, 34);
  
  // draw hearts
    for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    image(heart, x, y, random(90), random(120)); }
   // draw chesses 
    for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    image(yellowchesse, x, y, random(90), random(120)); }
}

function mousePressed() {
  u = mouseX;
  a = mouseY;

  if (mouseX > 400) {
    screen = 1; // change to spatialScreen
  } else if (mouseX < 100) {
    screen = 0; // change to chesselove
  }

}

function spatialScreen() {
  background(0);
  
  image(blackhole, 100, 700, 150, 150);
  image(blackhole, 700, 200, 150, 150);

  // Calculate x and y coordinates for the heart and cheese images
  let cheeseX = 100 + 75; // X coordinate of the center of the left black hole
  let cheeseY = 700 + 75; // Y coordinate of the center of the left black hole
  let heartX = 700 + 75; // X coordinate of the center of the right black hole
  let heartY = 200 + 75; // Y coordinate of the center of the right black hole
  
  // Subtract half the width and height of the images to center them
  image(yellowchesse, cheeseX - 45, cheeseY - 45, 90, 90);
  image(heart, heartX - 45, heartY - 45, 90, 90);

  
  // stars 
 fill(255);
 for (let i = 0; i < 200; i++) {
  let x = random(width);
  let y = random(height);
  ellipse(x, y, 2, 2);
 }


  //  planets

  fill(random(12), random(234), random(122));
  ellipse(300, 100, 80, 80);
  fill(random(162), random(141), random(246));
  ellipse(450, 100, 80, 80);
  fill(random(255), random(255), random(100));
  ellipse(600, 100, 70, 70);

  // little moons
  fill(200);
  ellipse(300, 100, 20, 20);
  ellipse(450, 100, 15, 15);
  ellipse(600, 100, 25, 25);

  // moon  setup

  image(moon, 50, 50, 200, 200);
  noStroke()

  // rat 
  image(rat1, r, s, 120, 120);

  // boundary checks for the rat
  if (r < 0) {
    r = 0;
  } else if (r > width - 120) {
    r = width - 120;
  }
  if (s < 0) {
    s = 0;
  } else if (s > height - 120) {
    s = height - 120;
  }


  //image position of the rat 

  // Move the rat when arrow keys are pressed
  if (keyIsDown(LEFT_ARROW)) {
    r -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    r += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    s -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    s += speed;
  }

  // check if rat touches heart
  if (r + 60 > 700 && r + 60 < 790 && s + 60 > 200 && s + 60 < 290) {
    screen = 2; // change to heartScreen
    // check if rat touches chesse
  } else if (r + 60 > 100 && r + 60 < 290 && s + 60 > 700 && s + 60 < 790) {
    screen = 3; // change to chesseScreen

  }

  comet = { x: mouseX, y: mouseY };

  // Draw the comet
  image(cometImg, comet.x, comet.y, 150, 150);

  // Add smoke particles
  if (frameCount % 10 === 0) {
    smokeParticles.push({ x: comet.x, y: comet.y });
  }

  // Draw smoke particles
  for (let i = 0; i < smokeParticles.length; i++) {
    let particle = smokeParticles[i];
    image(smokeImg, particle.x, particle.y, 50, 50);
    particle.y += random(-1, 1);
    particle.x += random(-1, 1);
  }

  // Remove old smoke particles
  if (smokeParticles.length > 60) {
    smokeParticles.splice(0, smokeParticles.length - 60);
  }

     // Move and draw the comets
  for (let i = 0; i < comets.length; i++) {
    let comet = comets[i];
    comet.x += speed2.x;
    comet.y += speed2.y;

    // Bounce off the edges
    if (comet.x < 0 || comet.x > width) {
      speed2.x *= -1;
    }
    if (comet.y < 0 || comet.y > height) {
      speed2.y *= -1;
    }

    // Draw the comet
    image(cometImg, comet.x, comet.y, comet.width, comet.height);

  }
}

function heartScreen() {
  
  background(123,54,78);
  textSize(20);
      textAlign(CENTER, CENTER);
      fill(255);
      text("press space bar", 400, 700);
  
  
  // Move the rats forward if the spacebar is pressed and they haven't reached the heart yet
  if (keyIsPressed && keyCode === 32 && !heartVisible) {
    rat1X += 1;
    rat2X -= 1;
    closed = true;
  } else {
    closed = false;
  }  
  // Draw the rats
  image(rat1, rat1X, rat1Y, 120, 120);
  image(rat2, rat2X, rat2Y, 120, 120);

  //  rats intersect
  if (dist(rat1X, rat1Y, rat2X, rat2Y) < 100 && closed && !heartVisible) {
    heartVisible = true;
    stop = true;
  }

  // Draw the heart if the rats intersect
  if (heartVisible) {
    for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    image(heart, x, y, random(90), random(120)); }
    if (stop) {
      textSize(64);
      textAlign(CENTER, CENTER);
      fill(255, 0, 0);
      text("love", width / 2, height / 4);
     }
  }
}
  function chesseScreen() {
    
  background(30,2,21);
  textSize(20);
      textAlign(CENTER, CENTER);
      fill(255);
      text("use key arrow", 100, );

  // Display the rat image
  image(rat1, ratXX, ratYY, 120, 120);
  
  // Display and update each cheese object in the array
  for (let i = 0; i < cheeses.length; i++) {
    // Display the cheese image
    image(yellowchesse, cheeses[i].x, cheeses[i].y, 50, 50);
    
    // Move the cheese down the screen
    cheeses[i].y += 3;
    
    // Check if the rat touches the cheese
    if (dist(ratXX + 65, ratYY + 65, cheeses[i].x + 65, cheeses[i].y + 65) < 65) {
      // Remove the cheese object from the array
      cheeses.splice(i, 1);
      
      // Increase the score by 1
      score++;
      
      
    }
  }
  
  textSize(30);
  fill(24,122,32);
  text(`Score: ${score}`, 100, 40);
  
  
  // Display a message when the score is 7
  if (score === 20) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(15, 10, 450);
    text(" no more hungry , catching chesse Complete!!!", width/2, height/2);
  }else if (score === 10) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(15, 10, 450);
    text(" still hungry , catching chesse almost Complete!!!", width/2, height/2);
  }
    
  
  
  // Create a new cheese object at a random position every 60 frames
  if (frameCount % 60 === 0) {
    cheeses.push({x: random(width), y: -50});
  }
  
  // Stop the cheese from falling when the score is 20
  if (score === 20) {
    for (let i = 0; i < cheeses.length; i++) {
      cheeses[i].y = height + 50;
   }  
  }
    
  // Move the rat in response to arrow key presses
  if (keyIsDown(LEFT_ARROW)) {
    ratXX -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ratXX += 5;
  }
  
    

}
