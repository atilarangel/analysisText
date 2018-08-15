import os

file = open('stop_words.txt', 'r')
new = open('stop_words.json', 'w')
new.write('let stop_words = [')
for i in file:
    new.write('"%s",\n' % (i.replace('\n', '')))
new.write(']')
