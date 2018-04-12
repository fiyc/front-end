let comic_pool = {}

let load = function(name){
    try{
        let jsonData = require(`../data-source/${name}.json`)
        let currentComic = {};
        comic_pool[name] = currentComic;
        for(let key in jsonData){
            var title = key.split('_')[0];
            var index = key.split('_')[1];

            if(!currentComic[title]){
                currentComic[title] = {};
            }

            currentComic[title][index] = jsonData[key];
        }

        return true;
    }catch(err){
        return false;
    }
}


load('YRZX');

module.exports = {
    getComic: function(name){
        if(comic_pool[name] || load(name)){
            return comic_pool[name];
        }
        return undefined;
    }
};