button = document.getElementById("translatebtn")
encodebutton = document.getElementById("encodebtn")
output = document.getElementById("output")
input = document.getElementById("input")
canonicalCheck = document.getElementById("canon")
input.value = "[----[[[[..^]////~]^//~].^.^_.^]][/^..~----^[/^//^.~]..^....~]"
var lettertable = [
    ['O', 'o', 'U', 'A', 'u', 'a', 'e', 'I', 'E'],

    ['' , '' , '' , '' , 'H', 'R', '' , '' , '' ],
    ['' , 'P', 'B', 'M', '' , '' , '' , '' , '' ],
    ['' , '' , '' , '' , 'F', 'V', '' , '' , '' ],
    ['' , '' , '' , '' , 't', 'h', '' , '' , '' ],
    ['' , 'T', 'D', 'N', 'S', 'Z', 'L', '' , '' ],
    ['' , '' , 'c', '' , 's', 'z', '' , 'J', '' ],
    ['' , 'K', 'G', 'n', '' , '' , '' , '' , '' ],
]
//[----[[[../]////^]///^]././]
var x = 4
var y = 1


button.addEventListener("click",function(){
    output.textContent = translate(input.value)
})
encodebutton.addEventListener("click",function(){
    output.textContent = encode(input.value)
})
function translate(input){
    var encoded = encode(input)
    if(encoded != "[null]"){
        input = encoded
    }
    return(decode(input))
}
function decode(input){
    x = 4
    y = 1
    var posStore = []
    var nest = 0
    var string = ""
    var char = input.split("")
    for(let i = 0; i < char.length; i++){
        switch(char[i]){
            case "^":
                string = string+lettertable[y][x]
            break
            case "~":
                string = string+lettertable[0][x]
            break
            //looking at other decoder, you can't go up?
            // case "+":
            //     y = y==1?7:y-1
            // break
            case "-":
                y = y==7?1:y+1
            break
            case ".":
                x = x==0?8:x-1
            break
            case "/":
                x =x==8?0:x+1
            break
            case "[":
                posStore[nest] = {x:x,y:y}
                nest++
            break
            case "]":
                nest--
                if(nest>=0){
                    x = posStore[nest].x
                    y = posStore[nest].y
    
                }
            break
            // no solid space standard, so i'm using this temporarily
            case "_":
                string = string+" "
            break
        }
        // if(i==0 && char[i] !="["){
        //     return("SYNTAX ERROR: does not start with '['")
        // }
        if(i==char.length-1){
            // if(char[i] !="]"){
            //     return("SYNTAX ERROR: does not end with ']'")

            // }
            if(nest!=0){
                
                return("SYNTAX ERROR: bracket mismatch")

            }
            if(x!=4||y!=1){
                
                return("ERROR: ended on a letter that isn't 'H'")

            }
        }

    }
    if(string == ""){
        string = "[null]"
    }
    return(string)
}
var canon = ["_", "[////~]", "[///~]", "[//~]", "[/~]", "[~]", "[.~]", "[..~]", "[...~]", "[....~]", "[/^]", "[^]", "[--^]", "[---^]", "[----^]", "[-----^]", "[//----^]", "[.-^]", "[..-^]", "[...-^]", "[.----^]", "[..----^]", "[...----^]", "[.------^]", "[..------^]", "[...------^]", "[..-----^]", "[/--^]", "[/---^]", "[/----^]", "[/-----^]", "[///----^]"]
var vowcon = [" ", "E", "I", "e", "a", "u", "A", "U", "o", "O", "R", "H", "F", "t", "S", "s", "L", "M", "B", "P", "N", "D", "T", "n", "G", "K", "c", "V", "h", "Z", "z", "J"]

function encodeCanon(input){

    var char = input.split("")
    var output = ""
    for(let i = 0; i < char.length; i++){
        for(let z = 0; z < vowcon.length; z++){
            if(char[i] == vowcon[z]){
                output = output+canon[z]
                z=10000
            }
        }
    }
    if(output == ""){
        output = "[null]"
        if (window.confirm('WARN: No Output Detected, Need A Key?')) 
            {
            window.location.href='./key.md';
            };
    }
    return(output)
}

function encodeEfficient(input){

    var char = input.split("")
    var output = "["
    var buffer = ""
    for(let i = 0; i < char.length; i++){
        if(char[i]==" "){
            output=output+"_"
        } else{
            for(let z = 0; z < lettertable.length; z++){
                if(lettertable[z].includes(char[i])){
                    for(let j = 0; j < lettertable[z].length; j++){
                        if(char[i]==lettertable[z][j]){
                            xpos = j
                        }
                    }
                    
                    ypos = z
                }
            }
            buffer=""
            if(ypos==0){
                while(xpos<x){
                    buffer = buffer+"."//+xpos+":"+x
                    x--
                }
                while(xpos>x){
                    buffer = buffer+"/"
                    x++
                }

                buffer = buffer+"~"
            }else{
                var strsplit = output.split()
                var shortestDist = [1000,-1,-1,-1]
                var testX = x
                var testY = y
                var valid = 0
                for(let h = strsplit.length-1; h >= 0; h--){
                    switch (strsplit[h]){
                        case "-":
                            testY = testY==1?7:testY-1
                        break
                        case "/":
                            testX = testX==0?8:testX-1
                        break
                        case ".":
                            testX = testX==8?0:testX+1
                        break
                        case "/":
                            testX = testX==0?8:testX-1
                        break
                        case "]":
                            valid--
                        break
                        case "[":
                            valid++
                        break
                    }
                    var testdist=Math.abs(xpos-testX<0?xpos-testX+8:xpos-testX)+Math.abs(ypos-testY<0?ypos-testY+8:ypos-testY)
                    var dist = 1111
                    if(testdist<shortestDist[0]){
                        shortestDist = [testdist,h,testX,testY]
                    }
                }
                if(shortestDist[0]<900){
                    strsplit = output.split()
                    output = ""
                    for(let d=0;d<strsplit.length;d++){
                        if(d==shortestDist[1]){
                            output = output+"["
                        }
                        output = output+strsplit[i]

                    }
                    output = output+"]"
                    x=shortestDist[2]
                    y=shortestDist[3]
                }
                while(xpos<x){
                    buffer = buffer+"."//+xpos+":"+x
                    x--
                }
                while(xpos>x){
                    buffer = buffer+"/"
                    x++
                }
                while(ypos>y){
                    buffer = buffer+"-"
                    y++
                }
                buffer = buffer+"^"//+xpos+":"+x
    
            }
            output=output+buffer
        }
    }
    
    return(output+"]")
}

function encode(input){
    var translated = decode(input)
    if(translated != "[null]"){
        input = translated
    }
    if(canonicalCheck.checked){
        return(encodeCanon(input))
    }else{
        return(encodeEfficient(input))
    }
}