class SquareGrid extends Grid{
    constructor(){
        super()
        
        var n = global.gridSize
        this.vlines = []
        for( var ix = 0 ; ix <= n ; ix++ ){
            var x = ix/n
            this.vlines.push( [v(x,0),v(x,1)] )
        }
        
        this.hlines = []
        for( var iy = 0 ; iy <= n ; iy++ ){
            var y = iy/n
            this.hlines.push( [v(0,y),v(1,y)] )
        }
    }
    
    getVLine(ix){
        var i = Math.floor(ix)
        if( i < 0 ) i=0
        if( i >= global.gridSize ) i=(global.gridSize-1)
        return la( this.vlines[i], this.vlines[i+1], (ix-i)/1 )
    }
    
    getHLine(iy){
        var i = Math.floor(iy)
        if( i < 0 ) i=0
        if( i >= global.gridSize ) i=(global.gridSize-1)
        return la( this.hlines[i], this.hlines[i+1], (iy-i)/1 )
    }
    
    getInt( vline, hline ){
        return intersection( vline, hline )
    }
}