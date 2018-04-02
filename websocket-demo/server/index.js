const WebSocket = require('ws');
var ws = new WebSocket.Server({ port: 8080 });
var clients = require('./clientpool');
var hander = require('./signalhander');

// var clients = {};



ws.on('connection', function (client) {
    client.isLogin = false;

    var loginres = hander.nologinres();
    client.send(loginres);

    client.on('message', function (msg) {
        var reqObj = hander.analysisRequest(msg);
        if (!reqObj) {
            var invalidReq = hander.errorres('无效的请求');
            client.send(invalidReq);
            return;
        }

        if (!client.isLogin && reqObj.reqCode != hander.codeEnum.REQ_LOGIN) {
            var invalidReq = hander.errorres('未登录');
            client.send(invalidReq);
            return;
        }

        if (client.isLogin && reqObj.reqCode === hander.codeEnum.REQ_LOGIN) {
            var invalidReq = hander.errorres('无法重复登录');
            client.send(invalidReq);
            return;
        }

        if (reqObj.reqCode === hander.codeEnum.REQ_LOGIN) {
            var name = reqObj.data.name;
            var resMsg = '';
            if (clients.exit(name)) {
                resMsg = hander.loginres(
                    '用户名已存在',
                    { success: false }
                );

                client.close();
            } else if (clients.allClients().length >= 10) {
                resMsg = hander.loginres(
                    '聊天室已经爆满啦',
                    { success: false }
                );

                client.close();
            } else {
                client.name = name;
                client.isLogin = true;
                clients.push(name, client);
                resMsg = hander.loginres(
                    '登录成功',
                    {
                        success: true,
                        currentuser: clients.allClients()
                    }
                );

                var newchater = hander.newchater(name, clients.allClients());
                clients.broadcast(function (c) {
                    c.send(newchater);
                });
            }

            client.send(resMsg);
            return;
        }

        var resData = {
            date: new Date(),
            from: client.name,
            content: reqObj.data.msg,
            isself: false
        };
        clients.broadcast(function (c) {
            resData.isself = c.name === client.name;
            var res = hander.broadres(resData);
            c.send(res);
        });
    });

    client.on('close', function () {
        if (client.name) {
            clients.remove(client.name);

            var newchater = hander.chaterleave(client.name, clients.allClients());
            clients.broadcast(function (c) {
                c.send(newchater);
            });
        }


    });


    // var name = client.protocol;
    // if(clients[name]){
    //     client.send('已经有人用了这个名字了哦, 换一个试试吧~');
    //     client.close();
    // }else{
    //     clients[name] = client;
    //     client.send('OK');
    // }
    // client.on('message', function(msg){
    //     var index = parseInt(Math.random() * resposnes.length);
    //     for(var key in clients){
    //         clients[key].send(`${name}||${msg}`);
    //     }
    // })

    // client.on('close', function(){
    //     clients[name] = undefined;
    // });
});



