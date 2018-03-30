import requests
import re
base_url = 'http://www.jikexueyuan.com/course/?pageNum='
total_page = 2


time = ''
level = ''
learn_number = ''
des = ''
for index in range(2, total_page + 1):
	url = base_url + str(index)
	content = requests.get(url);
	content.encoding = 'utf8'
	infor_groups = re.findall('<div class="lesson-infor" style="height: 88px;">(.*?)</div>', content.text, re.S);
	for each_infor in infor_groups:
		#print(each_infor);
		temp = re.search('<h2 class="lesson-info-h2">(.*?)</h2>', each_infor, re.S);
		if temp == None:
			temp = '';
		else:
			temp = temp.group(1);
		temp = re.search('>(.*?)</a>', temp, re.S);
		if temp == None:
			title = '';
		else:
			title = temp.group(1);
		temp = re.search('<i class="time-icon"></i><em>(.*?)</em>', each_infor, re.S);
		if temp == None:
			time = '';
		else:
			time = temp.group(1);
		temp = re.search('<i class="xinhao-icon.?"></i><em>(.*?)</em>', each_infor, re.S);
		if temp == None:
			level = '';
		else:
			level = temp.group(1);
		temp = re.search('<em class="learn-number">(.*?)</em>', each_infor, re.S);
		if temp == None:
			learn_number = '';
		else:
			learn_number = temp.group(1);
		temp = re.search('<p(.*?)/p>', each_infor, re.S);
		if temp == None:
			temp = '';
		else:
			temp = temp.group(1);
		temp = re.search('>(.*?)<', temp, re.S);
		if temp == None:
			des = '';
		else:
			des = temp.group(1);
		document_content = '课程名: ' + title + '\n' + '等级: ' + level + '\n' + '学习人数: ' + learn_number + '\n' + '简介: ' + des + '\n' + '==============================================================' + '\n';
		print(document_content)
		fp = open('document\\jikexueyuan_course.txt','a');
		fp.write(str(document_content));
		fp.close();
		print("page" + str(index) + " finish...")


print("Information get finish...");