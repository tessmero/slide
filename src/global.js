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
    gridSize: 20,
    sgridlines: null, // square grid shape
    cgridlines: null, // circular grid shape
    gridyOffset: 0,
    gridyOffsetSpeed: 1e-3, // tiles per ms
    grid: null, // grid index-color arrangement
    
    //
    rds: 0,
    targetRds: 0,
    rdst: 0,
    rdsTransitionDuration: 2000,
    
    //
    moveList: null,
    moveIndex: 0,
    moveDuration: 500, // ms per tile
    moveDelay: 2000, // ms between moves
    moveCountdown: 2000,
    
    // 
    autoResetCountdown: 0,
    autoResetDelay: 5000,
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    //debug
    debugTileIndices: false,
    
}