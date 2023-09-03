

function update(dt) {    

    // passive grid movement animation
    global.gridyOffset += dt*global.gridyOffsetSpeed
    while( global.gridyOffset > global.gridSize ){
        global.gridyOffset -= global.gridSize
    }
    if( global.moveIndex < global.moveList.length ){
        
        if( global.moveCountdown > 0 ){
            
            // delay between solution steps
            global.moveCountdown -= dt
            
        } else {
        
            // advance solving animation
            var m = global.moveList[global.moveIndex]
            if( m.advance(dt) ){
                global.moveCountdown = global.moveDelay
                global.moveIndex += 1
                
                if( global.moveIndex == 2 ){
                    // init transition to circle grid
                    global.targetRds = 1
                }
            
                var m = global.moveList[global.moveIndex]
                if(m){
                    m.init()
                } else {
                    global.autoResetCountdown = global.autoResetDelay
                    
                    // init transition to square grid
                    global.targetRds = 0
                }
            }
            
        }
    } else {
        
        // countdown to re-scramble solved grid
        global.autoResetCountdown -= dt
        if(global.autoResetCountdown <= 0){
            resetGame()
        }
    }

    // advance square/circle grid transition
    if( global.rds != global.targetRds ){
        
        var s = Math.sign( global.targetRds - global.rds )
        
        global.rdst += dt        
        var angle = twopi*global.rdst/global.rdsTransitionDuration - pi
        var m = Math.cos(angle)+1
        var d = s*m*dt/global.rdsTransitionDuration
        global.rds += d
        if( Math.sign(global.targetRds-global.rds) != s ){
            global.rds = global.targetRds 
            global.rdst = 0       
        }
    }

    // check for resized window
    fitToContainer()    
}


var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        var padding = 0; // Padding around the square region
        var dimension = Math.min(cvs.width, cvs.height) - padding * 2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / global.canvasScale
        var yr = -global.canvasOffsetY / global.canvasScale
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
    }
}