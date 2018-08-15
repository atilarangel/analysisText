import subprocess
import json, ast
import time

startTime = time.time()
allcontent = {}
resulFinal = open("resultado.txt", "w")
count = 3005
# url = 'http://doweb.rio.rj.gov.br/ler_pdf.php?page=0&edi_id=%s'%(count)

while (count <= 3827):
    subprocess.call("node -e 'require(`./index`).allTrends(`http://doweb.rio.rj.gov.br/ler_pdf.php?page=0&edi_id=%s`)'"%(count), shell=True)
    print "Done %s"%(count)
    json_data = json.load(open('allwords.json'))
    json_data = ast.literal_eval(json.dumps(json_data))
    # print json_data
    for item in json_data:
        if item in allcontent:
            allcontent[item] += 1
        else:
            allcontent[item] = 1
    count+=1
result = sorted(allcontent.items(), key=lambda t: t[1], reverse=True)
resulFinal.write("\nResultado Final: \n")
for item in result:
    if item[1] != 1:
        resulFinal.write("%s - %s\n"%(item[1], item[0]))
resulFinal.close()
endTime = time.time()
print(endTime - startTime)
