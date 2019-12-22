// DS - MODULE EXAM



// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200
cnv.height = 700

// Event Listeners
document.addEventListener('keydown', keypressHandler)
cnv.addEventListener('mousemove', mouseEventHandler)
cnv.addEventListener('click', bigLaser)

// Global Vars
let backgroundImg = document.getElementById('spacebg')
ctx.drawImage(backgroundImg, 200, 50, 40, 40)

let xVals = []
let yVals = []
let yLocation = []
let xLocation = []

let xbeamSpeed = []


//Set number Laser Beams
for (let i = 0; i < 100; i++) {

    xVals.push(Math.randomInt(50, 200));
    yVals.push(5);
    xLocation.push(Math.randomInt(0, cnv.width));
    yLocation.push(Math.randomInt(0, cnv.height))
    xbeamSpeed.push(Math.randomInt(10, 30));
    
}


// Canvas Drawing

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
   
    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    let backgroundImg = document.getElementById('spacebg')
    ctx.drawImage(backgroundImg, 0, 0, 1200, 700)

    //Make Beams go back to start with new paremeters
    for (let i = 0; i < xVals.length; i++) {
        xLocation[i] += xbeamSpeed[i]
        if (xLocation[i] >= cnv.width) {
            xVals[i] = Math.randomInt(50, 200)
            yLocation[i] = Math.randomInt(0, cnv.height)
            xLocation[i] = 0 - xVals[i]
        }
        
    }


    //Draw out Beams
    for (let n = 0; n < xVals.length; n++) {
        ctx.fillBeams(xLocation[n], yLocation[n], xVals[n], yVals[n])
        
    }
    // Request another Animation Frame
    requestAnimationFrame(draw);
}



// mouseEventHandler Handler
function mouseEventHandler(event) {
    for (let i = 0; i < xVals.length; i++) {
        var y = event.offsetY;
        yLocation[i] = y

    }
}

// keypressHandler
function keypressHandler(event) {

    if (event.code == 'KeyQ') {
        for (let i = 0; i < xbeamSpeed.length; i++) {
            xbeamSpeed[i] += 1
        }
    }

    else if (event.code == 'KeyZ') {
        for (let i = 0; i < xbeamSpeed.length; i++) {
            xbeamSpeed[i] -= 1
            
        }
    }
    console.log(event.code)
}



// getRandomColor
function getRandomColor() {

    // create an array of the numbers 0-9 and letters A-F (hint: you can start with the string '0123456789ABCDEF' and split it to save time)
    let letters = '0123456789ABCDEF'.split('')
    
    // create a variable to store the color. Initialize it with the value '#'
    let colorInit = "#"
    // loop 6 times, each time adding a random value from the array created above.
    for(let i = 0; i < 6; i++){
        colorInit += letters[Math.floor(Math.random()* 16)]
    }
    
    // return the color variable
    
   return colorInit
}

// myBonusFunction - Tried to do a charge and release Giant Laser but couldn't figure it out so here is a code that spawns giant beams C:
function bigLaser() {
    var y = event.offsetY;
    var x = event.offsetX;
    yLocation.push(y) 
    xLocation.push(x) 
    xVals.push(250);
    yVals.push(20);
    xbeamSpeed.push(10);
}



//Drawing Laser Beams Functions
ctx.fillBeams = function (x1, y1, x2, y2) {
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    ctx.rect(x1, y1, x2, y2);
    ctx.fill()
}