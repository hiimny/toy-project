var check = []
let reset;
function response(room, msg, sender, isGroupChat, replier, imageDB) {

// 24시간 출석 리스트 초기화
var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

    var timer = new java.util.Timer();
    var counter = 1; 
    var ids = {};

    setTimeout = function (fn,delay) {
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay);
        return id;
    }

    clearTimeout = function (id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    }

    setInterval = function (fn,delay) {
        var id = counter++; 
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay,delay);
        return id;
    }

    clearInterval = clearTimeout;

// 출첵 or ㅊㅊ 입력 하면 출석완료
if(msg.trim()=="/출첵"||msg.trim()=="/ㅊㅊ") {
    let sw = "";
    sw += "*" + sender
    check.push(sw)
    replier.reply(sw+"님 출첵 완료")
}

// 출석목록을 입력하면 지금까지 출석한 사람 리스트가 나옴
if(msg.trim() == "/출석목록") {
    let list = "";
    for(var i = 0; i < check.length; i++) {
        list += check[i] + "\n";
    }
    replier.reply("[출석 리스트]\n"+list)
}
if(check.length!='0'){
reset = setInterval(function(){
    var day = new Date();
    if(day.getHours()=='0'&&day.getMinutes()=='0'){
        check = [];
    }
},5000)
}
}



