var allPalettes = [
    ['#A6FF96','#F8FF95','#BC7AF9','#FFA1F5'],
    ['#EEEEEE','#64CCC5','#176B87','#053B50'],
    ['#141E46','#BB2525','#FF6969','#FFF5E0'],
    ['#FAF0E6','#B9B4C7','#5C5470','#352F44'],
    ['#FFC436','#337CCF','#1450A3','#191D88'],
    ['#F8DE22','#F94C10','#C70039','#900C3F'],
    ['#8CABFF','#4477CE','#512B81','#35155D'],
    ['#3D246C','#5C4B99','#9F91CC','#FFDBC3'],
    ['#EDE4FF','#D7BBF5','#A076F9','#6528F7'],
    ['#836096','#ED7B7B','#F0B86E','#EBE76C'],
    ['#CAEDFF','#D8B4F8','#FFC7EA','#FBF0B2'],
    ['#FF0060','#F6FA70','#00DFA2','#0079FF'],
    ['#D71313','#F0DE36','#EEEDED','#0D1282'],
    ['#2CD3E1','#A459D1','#F266AB','#FFB84C'],
    ['#06FF00','#FFE400','#FF8E00','#FF1700'],
    ['#00A1AB','#00263B','#6F0000','#FF5200'],
    ['#93D9A3','#CDF3A2','#ED8E7C','#A03C78'],
]


function getRandomPalette(){
    var result = allPalettes[Math.floor(randRange(0,allPalettes.length))]
    shuffle(result)
    return result
}