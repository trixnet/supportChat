var supportSocket;

function chat(rcvr, msg) {
    if (!supportSocket) {
        return console.log("login first");
    }
    supportSocket.emit('chatp2p', {
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
            if (supportSocket) supportSocket.disconnect();
            supportSocket = io.connect('http://localhost:3000', {
                'query': 'token=' + JSON.parse(xhttp.responseText).token
            });
            supportSocket.on("connection-success", function(msg) {
                console.log(msg);
            });
            supportSocket.on('chtp2p-received', function(msg) {
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
    if (supportSocket) supportSocket.disconnect();
};