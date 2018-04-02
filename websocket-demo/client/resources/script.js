/**
 * WebSocket功能模块
 */
var socketHander = function (name, successfn, errorfn, onMsg, onSysMsg) {
    var isLogin = false;
    var ws = new WebSocket('ws://172.28.101.127:8080');

    ws.onmessage = function (evt) {
        var res = JSON.parse(evt.data);

        switch (res.resCode) {
            case 3:
                var data = {
                    reqCode: 1,
                    data: { name: name }
                };
                ws.send(JSON.stringify(data));
                break;
            case 4:
                if (res.data.success) {
                    successfn(res.msg);
                } else {
                    errorfn(res.msg);
                }
                break;
            case 5:
                console.log(res.data.username);
                onSysMsg(res.data);
                break;
            case 6:
                onMsg(res.data);
            case 7:
                break;

        }

        // if (!isLogin && res.resCode === 3) {
        //     if (res === 'OK') {
        //         successfn(res);
        //         isLogin = true;
        //     } else {
        //         errorfn(res);
        //         isLogin = false;
        //     }
        // } else {
        //     var resplit = res.split('||');
        //     var username = resplit[0];
        //     var msg = resplit[1];
        //     onMsg(username, msg);
        // }
    };

    return {
        name: name,
        close: function () {
            ws.close();
        },
        send: function (msg) {
            var data = {
                reqCode: 2,
                data: { msg: msg }
            };
            ws.send(JSON.stringify(data));
        }
    };
}

/**
 * 页面交互事件绑定
 * 1. 登录后页面切换
 * 2. 输入框获取焦点后样式改变
 * 3. 退出后页面切换
 */

$(function () {
    var ws;
    $("#login-btn").click(function () {
        var name = $("#login-name").val();

        if (!name) {
            $("#login-msg").html('没有名字不能跟大家聊天哦。。');
            return;
        }

        ws = socketHander(name, function (res) {
            $("#login-part").css('display', 'none');
            $("#chat-body").css('display', 'block');
        },
            function (res) {
                $("#login-msg").html(res);
            },
            function (data) {
                var name = data.from;
                var msg = data.content;
                var msgfrom = data.isself ? 'my' : 'other';

                var msgContent = `<div class="each-msg ${msgfrom}">
                                    <div class="user">${name}</div>
                                    <div class="msg-content">
                                        <div class="cor"></div>
                                        ${msg}
                                    </div>
                                </div>
                                <div style="clear:both">`;

                $("#msg-body").append(msgContent);
            },
            function (data) {
                var name = data.username;
                var msgContent = `<div class="system-msg">${name} 加入聊天室</div>
                                  <div style="clear:both"></div>`;
                
                $("#msg-body").append(msgContent);

            });

    });

    $("#cancel-btn").click(function () {
        ws.close();
        $("#login-part").css('display', 'block');
        $("#chat-body").css('display', 'none');
    });

    $("#msg").focus(function () {
        $("#msg-input").addClass("focus");
    });

    $("#msg").focusout(function () {
        $("#msg-input").removeClass("focus");
    });


    var ctrldown = false;
    document.getElementById('msg').addEventListener('keydown', function (e) {
        var keycode = e.which || e.keyCode;
        if (keycode === 17) {
            ctrldown = true;
        } else {
            if (keycode === 13 && ctrldown) {
                ws.send($("#msg").val());
                $("#msg").val('');
            }
        }
    });


    document.getElementById('msg').addEventListener('keyup', function (e) {
        var keycode = e.which || e.keyCode;
        if (keycode === 17) {
            ctrldown = false;
        }
    });

});
