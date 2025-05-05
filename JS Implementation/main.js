
button = document.getElementById("translatebtn")
encodebutton = document.getElementById("encodebtn")
copybutton = document.getElementById("copybtn")
output = document.getElementById("output")
input = document.getElementById("input")
canonicalCheck = document.getElementById("canon")
qolCheck = document.getElementById("qol")
MCF = document.getElementById("MCF")
input.value = "[----[[[..^]////~]^//~].^.^_.^][/[^..~----^[/^//^.~]..^]/~]"
// input.value = "SNLNM"
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
//[-[---^[.^///^].^].^]
var x = 4
var y = 1


function translate(input){
    var encoded = encodeCanon(input,true)
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
                y++
            break
            case ".":
                x--
            break
            case "/":
                x++
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
            // turns out there are no spaces
            // locking behind qol
            case "_":
                if(qolCheck.checked){

                    string = string+" "
                }
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
                
                return("ERROR: SYNTAX: bracket mismatch")

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
var canon = ["", "[////~]", "[///~]", "[//~]", "[/~]", "[~]", "[.~]", "[..~]", "[...~]", "[....~]", "[/^]", "[^]", "[--^]", "[---^]", "[----^]", "[-----^]", "[//----^]", "[.-^]", "[..-^]", "[...-^]", "[.----^]", "[..----^]", "[...----^]", "[.------^]", "[..------^]", "[...------^]", "[..-----^]", "[/--^]", "[/---^]", "[/----^]", "[/-----^]", "[///----^]"]
var vowcon = [" ", "E", "I", "e", "a", "u", "A", "U", "o", "O", "R", "H", "F", "t", "S", "s", "L", "M", "B", "P", "N", "D", "T", "n", "G", "K", "c", "V", "h", "Z", "z", "J"]

function encodeCanon(input,internal=false){

    if(qolCheck.checked){
        canon[0]="_"
    } else {
        canon[0]=""
    }

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
        if(!internal) if (window.confirm('WARN: No Output Detected, Need A Key?')) 
            {
            window.location.href='./key.md';
            };
    }
    return(output)
}

function encodeEfficient(input){
    var closesta = []

    var char = input.split("")
    var output = "["
    var buffer = ""
    for(let i = 0; i < char.length; i++){
        if(char[i]==" "){
            if(qolCheck.checked){
            output=output+"_"
            }
        } else{
            xpos=1000
            ypos=1000
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
            if(xpos>100||ypos>100){}
            else if(ypos==0){
            // if(ypos==0){
                closesta=getClosestPoint(i,output,"x")
                output = parseStringToClosest(i,output,closesta)
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
                closesta=getClosestPoint(i,output)
                output = parseStringToClosest(i,output,closesta)
                // if(ypos<y){
                //     buffer=buffer+"]["
                //     x=4
                //     y=1
                // }
                while(ypos>y){
                    buffer = buffer+"-"
                    y++
                }
                while(xpos>x){
                    buffer = buffer+"/"
                    x++
                }
                while(xpos<x){
                    buffer = buffer+"."//+xpos+":"+x
                    x--
                }
                buffer = buffer+"^"//+xpos+":"+x
    
            }
            output=output+buffer//
        }
    }
    output = output+"]"
    if(output == "[]"){
        output = "[null]"
        if (window.confirm('WARN: No Output Detected, Need A Key?')) 
            {
            window.location.href='./key.md';
            };
    }
    return(output)//+" +["+closesta+"]")
}

function encode(input){
    var translated = decode(input)
    var translateARR=translated.split("")
    if(translated != "[null]"&&translateARR[5]!=":"){
        input = translated
    }
    if(canonicalCheck.checked){
        return(encodeCanon(input))
    }else{
        return(encodeEfficient(input))
    }
}

function getClosestPoint(i,output,mode="both"){
    var splitout= output.split("")
    var testX=x
    var testY=y
    var valid=0
    var closest=[]
    closest[i]=[1000,0,0,0]
    if(Math.abs(x-xpos)>1||y>ypos) {for(let l = splitout.length; l>0;l--){
        switch(splitout[l]){
            case "/":
                if(valid>=0) testX--
            break
            case ".":
                if(valid>=0) testX++
                
            break
            case "-":
                if(valid>=0) testY--
            break
            case "[":
                valid++
            break
            case "]":
                valid--
            break
        }
        if(mode == "both") if(valid>=0) if(testY<=ypos) if(Math.abs(testX-xpos)+(ypos-testY<0?10000:ypos-testY)<closest[i][0]){
        //if(Math.abs(testX-xpos)+Math.abs(ypos-testY)<closest[i][0]){
            // closest[i] = [Math.abs(testX-xpos)+(ypos-testY<0?10000:ypos-testY),l,testX,testY," "]
            
            closest[i] = [Math.abs(testX-xpos)+Math.abs(ypos-testY),l,testX,testY]
            
        }
        if(mode == "x") if(valid>=0) if(Math.abs(testX-xpos)<closest[i][0]){
            //if(Math.abs(testX-xpos)+Math.abs(ypos-testY)<closest[i][0]){
                // closest[i] = [Math.abs(testX-xpos)+(ypos-testY<0?10000:ypos-testY),l,testX,testY," "]
                
                closest[i] = [Math.abs(testX-xpos),l,testX,testY]
                
            }
    }} else closest[i]=[Math.abs(x-xpos),splitout.length,testX,testY]
    return(closest)
}

function parseStringToClosest(i,output,closesta){

    var test
    if(closesta[i][0]<=200){
        test = output.split("")
        var bak =test[closesta[i][1]] 
        test[closesta[i][1]]=["[",bak].join("")
        test.push("]")
        var testII = test.join("")
        test = testII.split("[]")
        output=test.join("")
        x=closesta[i][2]
        y=closesta[i][3]
        return(output)
    }

}


// frontend stuff --------------------------------------------------------------------------------

button.addEventListener("click",function(){
    initOutput(translate(input.value)) 
})
encodebutton.addEventListener("click",function(){
    initOutput(encode(input.value)) 
})
copybutton.addEventListener("click",function(){
    navigator.clipboard.writeText(output.textContent);
})
var textOut=""
var textTarget="aaaaaa"
var textArr = []
var V = 0
var D = 0
function mcfchecker(){
    if(MCF){
        
    }
}
function initOutput(input){
    textTarget=input
    textOut=""
    textArr=textTarget.split("")
    V=textArr.length
    D = 0
    output.textContent = "loading..."
    setTimeout(outputText,200+(Math.random()*600))
}
function outputText(){
    textOut=textOut+textArr[D]
    output.textContent = textOut
    D++
    if(D<V){
        setTimeout(outputText,(40-Math.log((D+1)/5)*10))
    }

}