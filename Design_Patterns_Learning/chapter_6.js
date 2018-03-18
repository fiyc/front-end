/*
建造者模式

将一个复杂对象的构建层与其表示层相互分离, 同样的构建过程可采用不同的表示
*/

//创建一个人类
var Human = function(param){
		this.skill = param && param.skill || '保密';
		this.hobby = param && param.hobby || '保密';
}

Human.prototype = {
		getSkill: function(){
				return this.skill;
		},
		getHobby: function(){
				return this.hobby;
		}
}

//创建姓名类
var Name = function(name){
		var that = this;

		(function(name, that){
				that.wholeName = name;
				if(name.indexOf(' ') > -1){
						that.FirstName = name.slice(0, name.indexOf(' '));
						that.secondName = name.slice(name.indexOf(' '));
				}
		})(name, that);
}

//创建职位类
var Work = function(work){
		var that = this;
		(function(work, that){
				switch(work){
				case 'code':
						that.wrok = '工程师';
						that.workDesc = '每天沉醉于编程'
						break;
				case 'UI':
						break;
				case 'UE':
						break;
				}
		})(work, that);
}

Work.prototype.changeWork = function(work){
		this.wrok = work;
}

Work.prototype.changeDesc = function(desc){
		this.workDesc = desc;
}

//使用
var Person = function(name, work){
		var _person = new Human();
		_person.name = new Name(name);
		_person.work = new Work(work);
		return _person;
}


//测试
var person = new Person('xiao ming', 'code');
console.log(person.name.FirstName);
console.log(person.work.workDesc);


