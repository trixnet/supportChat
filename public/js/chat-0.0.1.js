var socket;

function chat(rcvr, msg) {
    if (!socket) {
        return console.log("login first");
    }
    socket.emit('chatp2p', {
        msg: msg,
        rcvr: rcvr
    });
}

function supportLogin() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("post", "/start-chat", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            if (socket) socket.disconnect();
            socket = io.connect('http://localhost:3000', {
                'query': 'token=' + JSON.parse(xhttp.responseText).token
            });
            socket.on("connection-success", function(msg) {
                console.log(msg);
            });
            socket.on('chtp2p-received', function(msg) {
                console.log(msg);
            });
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(xhttp.responseText);
        }
    };
    xhttp.send(JSON.stringify({
        email: document.getElementById("cemail").value
    }));
}
window.onbeforeunload = function(e) {
    if (socket) socket.disconnect();
};