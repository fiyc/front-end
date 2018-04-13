const comichander = require('./comic-hander')
const response = require('./response')

module.exports = {
    getcomic: function(req, res, next){
        let name = req.query.name;
        let comicRes = comichander.getComic(name);

        if(comicRes){
            res.json(response.data('success', comicRes));
        }else{
            res.json(response.error('未获取到漫画信息'));
        }
    },
    getBooks: function(req, res, next){
        let comicRes = comichander.getComicNames();
        res.json(response.data('success', comicRes));
    }
}