class CircleGrid extends Grid{
    constructor(){
        super()
        
        var r = .1
        this.centerPos = global.centerPos.add( v( randRange(-r,r), randRange(-r,r) ) )
        
        var n = global.gridSize
        
        // vlines are straight spokes
        this.vlines = []
        for( var ix = 0 ; ix <= n ; ix++ ){
            var angle = twopi * ix/n
            this.vlines.push( angle )
        }
        
        // hlines are concentric circles (center,radius)
        this.hlines = []
        var maxr = global.centerPos.x*sqrt2 * 1.1
        for( var iy = 0 ; iy <= n ; iy++ ){
            var c = va( this.centerPos, global.centerPos, iy/n )
            var rad = avg(0,maxr,iy/n)
            this.hlines.push( [c,rad] )
        }
    }
    
    // vline is angle
    getVLine(ix){
        var i = Math.floor(ix)
        if( i < 0 ) i=0
        if( i >= global.gridSize ) i=(global.gridSize-1)
        return avg( this.vlines[i], this.vlines[i+1], (ix-i)/1 )
    }
    
    // hline is circle (center,rad)
    getHLine(iy){
        var i = Math.floor(iy)
        if( i < 0 ) i=0
        if( i >= global.gridSize ) i=(global.gridSize-1)
        return [
            va( this.hlines[i][0], this.hlines[i+1][0], (iy-i)/1 ),
            Math.max( 0, avg( this.hlines[i][1], this.hlines[i+1][1], (iy-i)/1 ))
        ]
    }
    
    // vline is angle
    // hline is circle (center,rad)
    getInt( hline, vline ){
        return hline[0].add( vp( vline, hline[1] ) )
    }
}