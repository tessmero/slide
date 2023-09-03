class Move {
    constructor( vertical, duration, offsets ){
        this.vertical = vertical
        this.duration = duration
        this.offsets = offsets
        this.t = 0
    }
    
    norm(i){
        if( i<0 ) return global.gridSize+i
        if( i>=global.gridSize ) return i-global.gridSize
        return i
    }
    
    init(){
        var allGroups = {}
        global.grid.forEach(tile =>{
            var i = Math.floor(this.vertical ? tile.ix : tile.iy) // index of group
            if(!( i in allGroups )){
                allGroups[i] = []
            }
            var o = Math.floor(this.vertical ? tile.iy : tile.ix) // starting position within group
            var fo = this.norm(o+this.offsets[i]) // ending position within group
            allGroups[i].push([tile,fo]) // remember [tile, end position]
        })
        
        this.tileGroups = allGroups
        this.t = 0
    }
    
    advance(dt){
        this.t += dt
        if( this.t >= this.duration ){
            this.finish()
            return true
        }
        
        var angle = twopi*this.t/this.duration - pi
        var m = Math.cos(angle)+1
        
        for( var i in this.tileGroups ){
            var d = dt*(this.offsets[i]/this.duration)*m
            this.tileGroups[i].forEach(pair => {
                if( this.vertical ){
                    pair[0].iy = this.norm(pair[0].iy + d)
                } else {
                    pair[0].ix = this.norm(pair[0].ix + d)
                }
            })
        }
        return false
    }
    
    finish(){
        for( var i in this.tileGroups ){
            this.tileGroups[i].forEach(pair => {
                if( this.vertical ){
                    pair[0].iy = pair[1]
                } else {
                    pair[0].ix = pair[1]
                }
            })
        }
    }
}