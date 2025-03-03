
# ok so- t is th   h is TH   c is CH   s is SH   z is ZH   and   n is ng
# pluss- O is oo   U is ou   A is ah   e is eh   E is ee
# ee-oo # r # h-sh # l # m-p # n-t # ng-k # ch v TH z zh j
canon = ["[////~]", "[///~]", "[//~]", "[/~]", "[~]", "[.~]", "[..~]", "[...~]", "[....~]", "[/^]", "[^]", "[--^]", "[---^]", "[----^]", "[-----^]", "[//----^]", "[.-^]", "[..-^]", "[...-^]", "[.----^]", "[..----^]", "[...----^]", "[.------^]", "[..------^]", "[...------^]", "[..-----^]", "[/--^]", "[/---^]", "[/----^]", "[/-----^]", "[///----^]"]
vowcon= ["E", "I", "e", "a", "u", "A", "U", "o", "O", "R", "H", "F", "t", "S", "s", "L", "M", "B", "P", "N", "D", "T", "n", "G", "K", "c", "V", "h", "Z", "z", "J"]


# menuing and mood setup
x = 0
mood = 1

#if yes go to key if no go to encoder
# also edit mood based on response
while x == 0 :
    yesno = input("+.+ want key? (Y/N): ")
    if yesno in ("Y", "N",):
        if yesno == "Y":
            print("*u* yyyaaaayyy")
            print("-----------------------")
            x = x+1
        else:
            print("o-o oh... alright then")
            print("c.c guess i'll just encode")
            mood = mood-1
            x = x+2
    else:
        print("T~T error Y or N please")

#encoder later down the line-- simple list pick rn
def encode(message):
    return canon[int(message)-1]

#keydump asthetics
def dump(y):
    return str(int(y+1)) + " = " + vowcon[int(y)] + " = " + canon[int(y)]

# dump canon list key and goto encoder
while x == 1 :
    # can do for y in range of (32) instead
    y=0
    while y < 31 :
        bleh = dump(y)
        print(bleh)
        y = y+1
    print("t = th  h = TH  c = CH  s = SH  z = ZH  n = NG")  
    print("O = oo  U = ou  A = ah  u = uh  e = eh  E = ee")
    print("-----------------------")
    print("^u^ key made")
    print("-w- encoding time now hehe")
    x = x+1

# encoder input output system
while x == 2 :
    while mood == 1 : 
        message = input("*w* --> ")
        result = encode(message)
        print('output : ' +result)
    while mood == 0 :
        message = input("-.- --> ")
        result = encode(message)
        print('output : ' +result)


