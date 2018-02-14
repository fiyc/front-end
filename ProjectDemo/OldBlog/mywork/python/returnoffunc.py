#encoding
'''
def test():
	i = 7
	return i
print(test())
'''
def test2(i, j):
	'''this is a test function'''
	result = i * j
	return (i, j, result)
#print(test2(2, 5))
'''
a = test2(4, 6)
print(a[2])
'''
help(test2)