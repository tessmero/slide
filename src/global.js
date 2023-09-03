resetRand()

const global = {
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'black',
    edgeWidth: .002,
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,
    centerPos: v(.5,.5),
    screenCorners: null, 
    
    // tile grid
    gridSize: 10,
    gridlines: null,
    grid: null,
    
    //
    moveList: null,
    moveIndex: 0,
    
    // 
    autoResetCountdown: 0,
    autoResetDelay: 1000,
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    //debug
    debugTileIndices: false,
    
}