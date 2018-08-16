import subprocess
import json, ast
import time
import os

startTime = time.time()
allcontent = {}
resulFinal = open("resultado.txt", "w")
count = 3005

index = str("'./index'")
while (count <= 3827):
    url = str("'http://doweb.rio.rj.gov.br/ler_pdf.php?page=0&edi_id=%s'"%(count))
    subprocess.call(u'node -e "require(%s).allTrends(%s)"'%(index, url), shell=True)
    print u"Done %s"%(count)
    json_data = json.load(open(u'allwords.json'))
    json_data = ast.literal_eval(json.dumps(json_data))
    # print json_data
    for item in json_data:
        if item in allcontent:
            allcontent[item] += 1
        else:
            allcontent[item] = 1
    count+=1
result = sorted(allcontent.items(), key=lambda t: t[1], reverse=True)
resulFinal.write(u"\nResultado Final: \n")
for item in result:
    if item[1] != 1:
        resulFinal.write(u"%s - %s\n"%(item[1], item[0]))
resulFinal.close()
endTime = time.time()
print(endTime - startTime)
