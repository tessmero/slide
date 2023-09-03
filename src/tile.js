class Tile{
    constructor( ix,iy,color ){
        this.ix = ix
        this.iy = iy
        this.color = color
    }
    
    _draw(g,ix,iy){
        
        // locate 4 tangent gridlines
        var tline = global.gridlines.getHLine(iy)
        var bline = global.gridlines.getHLine(iy+1)
        var lline = global.gridlines.getVLine(ix)
        var rline = global.gridlines.getVLine(ix+1)
        
        // compute intersections
        var tr = global.gridlines.getInt(tline,rline)
        var br = global.gridlines.getInt(bline,rline)
        var bl = global.gridlines.getInt(bline,lline)
        var tl = global.gridlines.getInt(tline,lline)
        
        // fill quad formed by intersection points
        g.fillStyle = this.color
        g.strokeStyle = this.color
        g.lineWidth = .002
        g.beginPath()
        g.moveTo( ...tr.xy() )
        g.lineTo( ...br.xy() )
        g.lineTo( ...bl.xy() )
        g.lineTo( ...tl.xy() )
        g.closePath()
        g.fill()

        // debug 
        if( global.debugTileIndices ){
            g.fillStyle = 'white'
            g.font = ".003em Arial";
            g.textAlign = "center";
            g.fillText(`${this.ix.toFixed(1)}, ${this.iy.toFixed(1)}, ${this.color}`, ...va(tr,bl).xy() );
        }
    }
    
    draw(g){
        
        // draw this tile
        this._draw(g,this.ix,this.iy)
        
        // if this tile is partially off-screen, 
        // draw this tile again at the opposite end of the screen
        if( this.ix>(global.gridSize-1) ) this._draw(g,this.ix-global.gridSize,this.iy)
        if( this.iy>(global.gridSize-1) ) this._draw(g,this.ix,this.iy-global.gridSize)
        
    }
}