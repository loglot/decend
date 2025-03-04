


contable = [
    ['',  '',  '',  '', 'H', 'R',  '',  '',  '',  '',],
    ['', 'P', 'B', 'M',  '',  '',  '',  '',  '',  '',],
    ['',  '',  '',  '', 'F', 'V',  '',  '',  '',  '',],
    ['',  '',  '',  '', 't', 'h',  '',  '',  '',  '',],
    ['', 'T', 'D', 'N', 'S', 'Z', 'L',  '',  '',  '',],
    ['',  '', 'c',  '', 's', 'z',  '', 'J',  '',  '',],
    ['', 'K', 'G', 'n',  '',  '',  '',  '',  '',  '',],
]

vowtable = ['O', 'o', 'U', 'A', 'u', 'a', 'e', 'I', 'E',]

# ok so- want to make h and u (0,0) 

# test is TPJSF or NSZSNDNSZLD

#logic- [
#go to first letter by x then y (T= ---- then ...)    (put this lower in logic later)
#output letter type (^)
#check if next letters y value is above cursor
#if yes     [we need to set to go back up]
#   then how much 
#   move # off by amount of "-" to front of working space 
#   [working space is defined as front to first set]
#                   ok now it gets rough-- basically compare distance from center column? well- okok
#   check if next letter x value is closer to middle
#   if yes      [already setting might as well optimize]
#       then how much
#                           ugh its tricky cause of um-- the pbm problem
#                           ok to optimise for amount of characters we need to be able to evaluate 
#                           if a set return would be more or less efficient then a horizontal 
#                           if its pbm then no cause the set return is longer than what it cancels out 
#                           so we can figure out how to not use set return right? yea just use the horizontal
#                           problem is that messes up what order the horizontal modifiers are in working space
#                           shit also-- we cant move any characters in workingspace in front of output characters
#                           so even what we have now is a little busted
#       
# 
# else
# 
# 
# 
#go to letter by x then y (T= ---- then ...) or just x
#output letter type (^)(~)
# 
# last step- parenthisies final output
# ]

def encode(msg):
    print('[' + msg + ']')
    
while True :
    msg = input(":")
    final = encode(msg)