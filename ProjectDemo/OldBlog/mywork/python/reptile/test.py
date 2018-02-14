import re
import urllib.request as request
f = open('pic\\1.txt', 'r')
temp = f.read()
f.close()
pic_url = re.findall('img src="(.*?)" alt="ro', temp, re.S)

print(pic_url)

'''
url = 'http://www.meineihan.cc/diaosifuli/26223_3.html'
content = request.urlopen(url)
fp = open('pic\\helo.txt', 'wb')
fp.write(content.read())
fp.close()
'''