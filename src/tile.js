class Tile{
    constructor( ix,iy,color ){
        this.ix = ix
        this.iy = iy
        this.color = color
    }
    
    // used in _draw()
    _getVerts(gl,ix,iy){
        
        // locate 4 tangent gridlines
        var tline = gl.getHLine(iy)
        var bline = gl.getHLine(iy+1)
        var lline = gl.getVLine(ix)
        var rline = gl.getVLine(ix+1)
        
        // compute intersections
        var tr = gl.getInt(tline,rline)
        var br = gl.getInt(bline,rline)
        var bl = gl.getInt(bline,lline)
        var tl = gl.getInt(tline,lline)
        
        return [tr,br,bl,tl]
    }
    
    // used in draw()
    _draw(g,ix,iy){
        
        // compute weighted average of two grid positions
        var sverts = this._getVerts(global.sgridlines,ix,iy) //square grid
        var cverts = this._getVerts(global.cgridlines,ix,iy) //circle grid
        var verts = []
        for( var i = 0 ; i < 4 ; i++ ){
            verts.push( va( sverts[i], cverts[i], global.rds ) )
        }
        
        
        // fill quad formed by intersection points
        g.fillStyle = this.color
        g.strokeStyle = this.color
        g.lineWidth = .002
        g.beginPath()
        g.moveTo( ...verts[0].xy() )
        g.lineTo( ...verts[1].xy() )
        g.lineTo( ...verts[2].xy() )
        g.lineTo( ...verts[3].xy() )
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
        
        var ix = this.ix
        var iy = (this.iy+global.gridyOffset) % global.gridSize
        
        
        // draw this tile
        this._draw(g,ix,iy)
        
        // if this tile is partially off-screen, 
        // draw this tile again at the opposite end of the screen
        if( (ix>(global.gridSize-1)) && (iy>(global.gridSize-1) ) ){
            this._draw(g,ix-global.gridSize,iy-global.gridSize)
        }if( ix>(global.gridSize-1) ){ 
            this._draw(g,ix-global.gridSize,iy)
        }if( iy>(global.gridSize-1) ){ 
            this._draw(g,ix,iy-global.gridSize)
        }
    }
}