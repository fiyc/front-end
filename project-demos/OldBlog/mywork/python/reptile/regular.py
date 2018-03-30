'''
. : 匹配任意字符，换行符\n除外
* : 匹配前一个字符0次或无限次
? : 匹配前一个字符0次或1次
.*: 贪心算法
.*?: 非贪心算法
() : 括号内的数据作为返回结果 
'''

import re
secret_code = 'hadkfalifexxIxxfasdjifja134xxlovexx23345sdfxxyouxx8dfse'
# . 的使用
#a = 'xz123'
#b = re.findall('x.', a)
#print(b)

# *的使用
#a = 'xyxy123'
#b = re.findall('x*', a)
#print(b)

# ?的使用
#a = 'xy123'
#b = re.findall('x?', a)
#print(b)

b = re.findall('xx.*xx', secret_code)
b = re.findall('xx.*?xx', secret_code)
b = re.findall('xx(.*?)xx', secret_code)

print(b)