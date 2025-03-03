
# ee-oo # r # h-sh # l # m-p # n-t # ng-k # ch v TH z zh j
canon = ["[////~]", "[///~]", "[//~]", "[/~]", "[~]", "[.~]", "[..~]", "[...~]", "[....~]", "[/^]", "[^]", "[--^]", "[---^]", "[----^]", "[-----^]", "[//----^]", "[.-^]", "[..-^]", "[...-^]", "[.----^]", "[..----^]", "[...----^]", "[.------^]", "[..------^]", "[...------^]", "[..-----^]", "[/--^]", "[/---^]", "[/----^]", "[/-----^]", "[///----^]"]
vowcon= ["E", "I", "e", "A", "u", "a", "U", "o", "O", "R"]

# testing purposes get rid of later
alpha = ["a", "b", "c"]

# def tester:??


def encode(message):
    return canon[int(message)-1]


# location = 0
# location +=
# while location == 0 :
    # movement = input("menu:")
    # print(movement)
    # location += [int[movement]]


while location == 1 :
    message = input("*-*--> ")
    result = encode(message)
    print('output : ' +result)

