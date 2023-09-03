
    
    
// Render graphics
function draw(fps, t) {
    
    var ctx = global.ctx
    var canvas = global.canvas
    
    // draw background
    ctx.fillStyle = global.backgroundColor
    ctx.fillRect( -10,-10,20,20 )

    // restrict further drawing to square in center of screen
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(1,0)
    ctx.lineTo(1,1)
    ctx.lineTo(0,1)
    ctx.closePath()
    ctx.clip()

    if( false ){
        //debug
        // draw screen corners
        var r = .1
        ctx.fillStyle = 'red'
        global.screenCorners.forEach(c => ctx.fillRect( c.x-r, c.y-r, 2*r, 2*r ))
    }
    
    const center = global.centerPos
    

    
    // draw tiles
    global.grid.forEach(tile => tile.draw(ctx))

    // debug 
    if( false ){
        ctx.fillStyle = 'black'
        ctx.font = ".001em Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${global.angleX.toFixed(2)},${global.angleY.toFixed(2)},${global.angleZ.toFixed(2)}`, .5,.5);
    }
}