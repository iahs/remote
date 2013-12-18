var socket = io.connect();
function sendMessage(msg) {
	if ($('#id').val() != "")
	{
		socket.emit('message', $('#id').val()+'.local:'+msg);
	}
}

$(function() {
	$("#playpause").click(function() {sendMessage('playpause');});
});
