
# ee-oo # r # h-sh # l # m-p # n-t # ng-k # ch v TH z zh j
canon = ["[////~]", "[///~]", "[//~]", "[/~]", "[~]", "[.~]", "[..~]", "[...~]", "[....~]", "[/^]", "[^]", "[--^]", "[---^]", "[----^]", "[-----^]", "[//----^]", "[.-^]", "[..-^]", "[...-^]", "[.----^]", "[..----^]", "[...----^]", "[.------^]", "[..------^]", "[...------^]", "[..-----^]", "[/--^]", "[/---^]", "[/----^]", "[/-----^]", "[///----^]"]
vowcon= ["E", "I", "e", "a", "u", "A", "U", "o", "O", "R", "H", "F", "t", "S", "s", "L", "M", "B", "P", "N", "D", "T", "n", "G", "K", "c", "V", "h", "Z", "z", "J"]

# testing purposes get rid of later
alpha = ["a", "b", "c"]

# def tester:??

x = 0


def encode(message):
    return canon[int(message)-1]

def dump(y):
    return str(int(y+1)) + " = " + vowcon[int(y)] + " = " + canon[int(y)]

# dump canon list key
while x == 0 :
    # can do for y in range of (32) instead
    y=0
    while y < 31 :
        bleh = dump(y)
        print(bleh)
        y = y+1
    x = x+1


while x == 1 :
    message = input("*-*--> ")
    result = encode(message)
    print('output : ' +result)

