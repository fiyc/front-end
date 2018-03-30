class Father:
	name = "Daniel"
	def say(self):
		print("Hello World")
class Son(Father):
	def SonSay(self):
		Father.say(self)
		print("My father is {0}".format(self.name))

#h.SonSay()
	
