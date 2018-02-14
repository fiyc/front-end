class Stack():
	def __init__(st, size):
		st.stack = [];
		st.size = size;
		st.top = -1;

	def push(st, content):
		if st.IsFull():
			print("Stack is Full");
		else:
			st.stack.append(content)
			st.top = st.top + 1

	def out(st):
		if st.IsEmpty():
			print("Stack is Empty");	
		else:
			st.top = st.top - 1


	def getTop(st):
		if(st.IsEmpty()):
			print("Stack is IsEmpty")
		else:
			return st.stack[st.top]

	def IsFull(st):
		if st.top == st.size - 1:
			return True
		else:
			return False;

	def IsEmpty(st):
		if st.top == -1:
			return True;
		else:
			return False;

q = Stack(7)
q.push("hello world")
print(q.getTop())
q.push("fuck u")
print(q.getTop())
q.push("nihao")
print(q.getTop())
q.out()
print(q.getTop())