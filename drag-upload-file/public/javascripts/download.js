var submitFileAndDownload = function (file) {
    var formData = new FormData();
    formData.append("fff", file, file.name);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = JSON.parse(xhr.responseText);

            if (result.resultCode != 200) {
                return;
            }

            var blob = new Blob([result.body]);

            var eleLink = document.createElement('a');
            eleLink.download = `${file.name}.sql`;
            eleLink.style.display = 'none';
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
        }

    };
    xhr.send(formData);
}

var drapHander = {
    dragEnter: function (dom) {
        $(dom).html('释放鼠标上传文件')
            .removeClass('dragleave')
            .addClass('dragenter');
    },

    dragLeave: function (dom) {
        $(dom).html('拖拽文件至此')
            .removeClass('dragenter')
            .addClass('dragleave');
    },

    defaultEventOperation: {
        dragleave: function (e) {    //拖离 
            e.preventDefault();
        },
        drop: function (e) {  //拖后放 
            e.preventDefault();
        },
        dragenter: function (e) {    //拖进 
            e.preventDefault();
        },
        dragover: function (e) {    //拖来拖去 
            e.preventDefault();
        }
    },

    bind: function () {
        $(document).on(drapHander.defaultEventOperation);

        var dragContent = document.getElementById('dragContent');
        dragContent.addEventListener('drop', function (e) {
            drapHander.dragLeave(dragContent);
            if (e.dataTransfer.files.length > 0) {
                for (var i = 0; i < e.dataTransfer.files.length; i++) {
                    // files.push(e.dataTransfer.files[i]);
                    fileHander.push(e.dataTransfer.files[i]);
                }
            }
        });

        dragContent.addEventListener('dragenter', function (e) {
            drapHander.dragEnter(dragContent);
        });

        dragContent.addEventListener('dragleave', function (e) {
            drapHander.dragLeave(dragContent);
        });
    }
}

var fileHander = (function (domId) {
    var files = [];
    var tagDom = document.getElementById(domId);

    //更新文件tag
    var updateTags = function () {
        var tagsHtml = '';
        for (var index in files) {
            tagsHtml += `<div class="tag" tag-id="${files[index].id}"><span class="glyphicon glyphicon-tags" ></span>${files[index].name}</div>`;
        }

        if (!tagDom) {
            tagDom = document.getElementById(domId);
        }

        tagDom.innerHTML = tagsHtml;
        deleteBind();
    }

    //删除事件绑定
    var deleteBind = function () {
        $(".tag").on('click', function () {
            var id = $(this).attr('tag-id');
            remove(id);
        });
    }

    //根据id删除标签
    var remove = function (id) {
        var removeIndex = -1;
        for (var index in files) {
            var fileId = files[index].id;
            if (fileId === id) {
                removeIndex = index;
                break;
            }
        }

        if (removeIndex >= 0) {
            files.splice(removeIndex, 1);
        }

        updateTags();
    }

    return {
        push: function (fileInfo) {
            files.push({
                id: Date.parse(new Date()).toString(),
                name: fileInfo.name,
                file: fileInfo
            });

            updateTags();
        },
        files: files
    }
})('fileTags');


// var fileHander = fileHanderFactory('fileTags');

$(function () {
    // $("#upload_form").ajaxForm();
    // $("#upload_btn").click(function () {
    //     $("#upload_form").ajaxSubmit(function (result) {
    //         if (result.resultCode != 200) {
    //             alert(result.body);
    //             return;
    //         }

    //         var blob = new Blob([result.body]);

    //         var eleLink = document.createElement('a');
    //         eleLink.download = 'insert.sql';
    //         eleLink.style.display = 'none';
    //         eleLink.href = URL.createObjectURL(blob);
    //         document.body.appendChild(eleLink);
    //         eleLink.click();
    //         document.body.removeChild(eleLink);
    //     });
    // });

    drapHander.bind();


    $("#singleFile").on('change', function () {
        var fileinput = document.getElementById('singleFile');
        if (fileinput.files.length > 0) {
            // files.push(fileinput.files[0]);
            fileHander.push(fileinput.files[0]);
        }
        document.getElementById('sing-file-form').reset();
    });

    $("#choose-single").click(function () {
        $("#singleFile").click();
    });

    $('#download-btn').click(function () {
        if (fileHander.files.length > 0) {
            for (var index in fileHander.files) {
                submitFileAndDownload(fileHander.files[index].file);
            }
        }
    });
});