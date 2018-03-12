var superagent = require('superagent');
var cheerio = require('cheerio');

superagent.get('http://cnodejs.org')
		.end(function(err, sres){
				if(err){
						console.log('has error');
				}else{
						console.log(sres.text);
						var $ = cheerio.load(sres.text);

						var items = [];

						$('#topic_list .topic_title').each(function(idx, element){
								var ele = $(element);

								items.push({
										title : ele.attr('title'),
										href: ele.attr('href')
								});

						});

						for(var item of items){
								console.log(item);
						}
				}

		});

