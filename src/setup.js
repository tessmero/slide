

// Initialize the game
function init() {
    
    var cvs = document.getElementById("gameCanvas");
      cvs.style.width='100%';
      cvs.style.height='100%';  
    cvs.addEventListener("mousedown", mouseDown);
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("mouseup", mouseUp);
    cvs.addEventListener("touchstart", mouseDown, false);
    cvs.addEventListener("touchend", mouseUp, false);
    
    // https://stackoverflow.com/a/63469884
    var previousTouch;
    cvs.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        if (previousTouch) {
            e.movementX = touch.pageX - previousTouch.pageX;
            e.movementY = touch.pageY - previousTouch.pageY;
            mouseMove(e);
        };

        previousTouch = touch;
        e.preventDefault()
    });
    cvs.addEventListener("touchend", (e) => {
        previousTouch = null
        mouseUp(e)
    });
    
    
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    // init grid shape
    global.gridlines = new GridLines()
    
    // init grid tiles
    global.grid = []
    for( var x = 0 ; x < global.gridSize ; x++ ){
        for( var y = 0 ; y < global.gridSize ; y++ ){
            var bx = (x<global.gridSize/2)
            var by = (y<global.gridSize/2)
            global.grid.push( new Tile(x,y,'white') )
        }
    } 
    
    // 
    resetGame()
    
    //
    requestAnimationFrame(gameLoop);
}

function resetGame(){
    resetRand(hard = true)
    
    // create random movement plan
    global.moveList = []
    var vert = rand() > .5
    for ( var i = 0 ; i < 10 ; i++ ){
        vert = !vert
        var offsets = []
        var mo = -global.gridSize
        for( var j = 0 ; j < global.gridSize ; j++ ){
            var o = Math.floor( randRange( -global.gridSize/2, global.gridSize/2 ) )
            if( Math.abs(o) > mo ) mo = Math.abs(o)
            offsets.push( o )
        }
        var duration = mo*100
        global.moveList.push(new Move(vert,duration,offsets))
    }
    
    
    // move tiles to final positions and apply colors
    var i = 0
    for( var x = 0 ; x < global.gridSize ; x++ ){
        for( var y = 0 ; y < global.gridSize ; y++ ){
            global.grid[i].ix = x
            global.grid[i].iy = y
            i += 1
        }
    }
    for( var i = 0 ; i < global.moveList.length ; i++ ){
        global.moveList[i].init()
        global.moveList[i].finish()
    }
    global.grid.forEach(tile => {
        var bx = (tile.ix<global.gridSize/2)
        var by = (tile.iy<global.gridSize/2)
        var c = bx ? (by ? 'red' : 'blue') : (by ? "green" : "yellow")
        tile.color = c
    })
    
    
    // move tiles back to starting positions
    var i = 0
    for( var x = 0 ; x < global.gridSize ; x++ ){
        for( var y = 0 ; y < global.gridSize ; y++ ){
            global.grid[i].ix = x
            global.grid[i].iy = y
            i += 1
        }
    }
    
    
    global.moveList[0].init()   
    global.moveIndex = 0
}


// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,50)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();

