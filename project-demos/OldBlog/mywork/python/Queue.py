class Queue():
	def __init__(qu, size):
		qu.queue = [];
		qu.size = size;
		qu.head = -1;
		qu.tail = -1;

	def IsEmpty(qu):
		if qu.head == qu.tail: 
			return True;
		else:
			return False;

	def IsFull(qu):
		if qu.tail - qu.head == qu.size :
			return True;
		else:
			return False;

	def Out(qu):
		if qu.IsEmpty():
			print("The queue is Empty.");
		else:
			qu.head = qu.head + 1;

	def In(qu, content):
		if qu.IsFull():
			print("The queue is Full.");
		else:
			qu.queue.append(content);
			qu.tail = qu.tail + 1;


a = Queue(3);
print(a.IsEmpty())
print(a.IsFull())
a.Out()