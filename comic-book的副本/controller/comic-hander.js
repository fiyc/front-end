var fs = require('fs')
var path = require('path')

let comic_pool = {}

let load = function(name){
    try{
        let jsonData = require(`../data-source/${name}.json`)
        let currentComic = {};
        comic_pool[name] = currentComic;
        currentComic.name = jsonData.name;
        currentComic.data = {};
        for(let key in jsonData.data){
            var title = key.split('_')[0];
            var index = key.split('_')[1];

            if(!currentComic.data[title]){
                currentComic.data[title] = {};
            }

            currentComic.data[title][index] = jsonData.data[key];
        }

        return true;
    }catch(err){
        return false;
    }
}


// load('YRZX');

fs.readdirSync(path.join(__dirname, '../data-source'))
  .filter(function (file) {
    return file.substr(-5) === '.json'
  }).forEach(function (file) {
    load(file.substr(0, file.length - 5));
  })


module.exports = {
    getComic: function(name){
        if(comic_pool[name] || load(name)){
            return comic_pool[name];
        }
        return undefined;
    },
    getComicNames: function(){
        var result = [];
        for(var item in comic_pool){
            result.push({
                id : item,
                name: comic_pool[item].name
            });
        }
        return result;
    }
};