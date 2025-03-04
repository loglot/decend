button = document.getElementById("translatebtn")
output = document.getElementById("output")
input = document.getElementById("input")
output.textContent = "output"

var lettertable = [
    ['O', 'o', 'U', 'A', 'u', 'a', 'e', 'I', 'E'],
    ['', '', '', '', 'H', 'R', '', '', ''],
    ['', 'P', 'B', 'M', '', '', '', '', ''],
    ['', '', '', '', 'F', 'V', '', '', ''],
    ['', '', '', '', 't', 'h', '', '', ''],
    ['', 'T', 'D', 'N', 'S', 'Z', 'L', '', ''],
    ['', '', 'c', '', 's', 'z', '', 'J', ''],
    ['', 'K', 'G', 'n', '', '', '', '', ''],
]
//[----[[[//.]****^].**^]/./.]
var x = 4
var y = 1

button.addEventListener("click",function(){
    output.textContent = translate(input.value)
})


function translate(input){
    x = 4
    y = 1
    var posStore = []
    var nest = 0
    var string = ""
    var char = input.split("")
    for(let i = 0; i < char.length; i++){
        switch(char[i]){
            case ".":
                string = string+lettertable[y][x]
            break
            case "^":
                string = string+lettertable[0][x]
            break
            case "+":
                y = y==1?7:y-1
            break
            case "-":
                y = y==7?1:y+1
            break
            case "/":
                x = x==0?8:x-1
            break
            case "*":
                x =x==8?0:x+1
            break
            case "[":
                posStore[nest] = {x:x,y:y}
                nest++
            break
            case "]":
                nest--
                
                x = posStore[nest].x
                y = posStore[nest].y
            break
        }
        if(i==0 && char[i] !="["){
            return("SYNTAX ERROR: does not start with '['")
        }
        if(i==char.length-1 && char[i] !="]"){
            return("SYNTAX ERROR: does not end with ']'")
        }

    }
    return(string)
}