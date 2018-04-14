$(function () {
    var lastChapter = window.localStorage[`${bookId}_last-chapter`] || '001';
    var lasteChapterIndex = window.localStorage[`${bookId}_last-chapter-index`] || 1;
    var commic = {};
    var chapterList = [];

    var loadImg = function (callback) {
        $.ajax({
            url: `/comic?name=${bookId}`,
            type: 'GET',
            success: function (data) {
                if (data.statuscode === 200) {
                    for (var key in data.body.data) {
                        chapterList.push(key);
                        commic[key] = [];
                        for (var item in data.body.data[key]) {
                            commic[key][Number(item)] = data.body.data[key][item];
                        }
                    }

                    if(typeof callback === "function"){
                        callback();
                    }
                }
            }
        });
    }

    var pushImg = function () {
        var imgArray = commic[lastChapter];
        if(!imgArray){
            lastChapter = chapterList[0];
            var imgArray = commic[lastChapter];
        }
        for (var i = 0; i < imgArray.length; i++) {
            if (!imgArray[i]) {
                continue;
            }
            var itemHtml = `<img src="${imgArray[i]}" id="${lastChapter + '_' + i}" hidden/>`;
            $("#content").append(itemHtml);
        }
    }

    var AddIndexOne = function () {
        var imgArray = commic[lastChapter];
        if (lasteChapterIndex + 1 > imgArray.length - 1) {
            var currentChapterNum = chapterList.indexOf(lastChapter.toString());
            if (currentChapterNum >= chapterList.length - 1) {
                alert('没有下一页啦');
                return;
            }

            lastChapter = chapterList[currentChapterNum + 1];
            lasteChapterIndex = 1;
        } else {
            lasteChapterIndex += 1;
        }
    }

    var ReduceIndexOne = function () {
        if (lasteChapterIndex <= 1) {
            var currentChapterNum = chapterList.indexOf(lastChapter.toString());
            if (currentChapterNum === 0) {
                alert('没有前一页啦');
                return;
            }

            lastChapter = chapterList[currentChapterNum - 1];
            lasteChapterIndex = commic[lastChapter].length - 1;

        } else {
            lasteChapterIndex -= 1;
        }
    }

    var MoveIndex = function (num) {
        var currentId = getCurrentImgID();
        $("#" + currentId).prop('hidden', 'hidden');
        var fn;
        if (num > 0) {
            fn = AddIndexOne;
        } else {
            fn = ReduceIndexOne;
        }

        for (var i = 0; i < Math.abs(num); i++) {
            fn();
        }

        window.localStorage[`${bookId}_last-chapter`] = lastChapter;
        window.localStorage[`${bookId}_last-chapter-index`]= lasteChapterIndex;
        updateTitle();

        var nextId = getCurrentImgID();

        if (!document.getElementById(nextId)) {
            pushImg();
        }

        $("#" + nextId).removeAttr('hidden');
        scrollTo(0,0);
    }

    var getCurrentImgID = function () {
        return `${lastChapter}_${lasteChapterIndex}`;
    }

    var updateTitle = function(){
        $("#title").html(getCurrentImgID());
    }

    loadImg(function(){
        pushImg();
        $("#" + getCurrentImgID()).removeAttr('hidden');
        updateTitle();
    });

    document.onkeyup = function(event){
        if(event.keyCode === 37){
            MoveIndex(-1);
        }else if(event.keyCode === 39){
            MoveIndex(1);
        }
    }

    $(".left-click").click(function(){
        MoveIndex(-1);
    });

    $(".right-click").click(function(){
        MoveIndex(1);
    });

    $("#go").click(function(){
        var currentId = getCurrentImgID();
        $("#" + currentId).prop('hidden', 'hidden');

        lastChapter = $("#target-chapter").val();
        lasteChapterIndex = 1;
        MoveIndex(0);
    });
});