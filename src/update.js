

function update(dt) {    

    //
    if( global.moveIndex < global.moveList.length ){
        var m = global.moveList[global.moveIndex]
        if( m.advance(dt) ){
            global.moveIndex += 1
            var m = global.moveList[global.moveIndex]
            if(m){
                m.init()
            } else {
                global.autoResetCountdown = global.autoResetDelay
            }
        }
    } else {
        global.autoResetCountdown -= dt
        if(global.autoResetCountdown <= 0){
            resetGame()
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
        var padding = 100; // Padding around the square region
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