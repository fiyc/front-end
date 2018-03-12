var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');

var cnodeUrl = 'http://cnodejs.org/';

var app = express();

function say(){
		
}

app.get('/', function(req, res){
	superagent.get('http://cnodejs.org/')
		.end(function(err, sres){
			if(err){
				console.log('has error');
				res.send('has error');
				return;
			}

			var $ = cheerio.load(sres.text);
			var topicUrls = [];
			$('#topic_list .topic_title').each(function(idx, element){
				var $element = $(element);
				var href = url.resolve(cnodeUrl, $element.attr('href'));
				topicUrls.push(href);
			});

				//res.send(topicUrls);

				var ep = new eventproxy();
				ep.after('topic_html', topicUrls.length, function(topics){
						topics = topics.map(function(topicPair){
								var topicUrl = topicPair[0];
								var topicHtml = topicPair[1];

								var $ = cheerio.load(topicHtml);

								return {
										title: $('.topic_full_title').text().trim(),
										href: topicUrl,
										comment1: $('.reply_content').eq(0).text().trim()
								};
						});

						res.send(topics);
				});


				topicUrls.forEach(function(topicUrl){
						superagent.get(topicUrl)
								.end(function(err, res){
										console.log('fetch ' + topicUrl + ' successful');
										ep.emit('topic_html', [topicUrl, res.text]);
								})
				});
		});
});

app.listen(3000, function(req, res){
		console.log('listen on port 3000');
});
