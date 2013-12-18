var socket = io.connect();
function sendMessage(msg) {
	if ($('#id').val() != "")
	{
		socket.emit('message', $('#id').val()+'.local:'+msg);
	}
}

$(function() {
	$("#playpause").click(function() {sendMessage('playpause');});
	$("#prev").click(function() {sendMessage('previous track');});
	$("#next").click(function() {sendMessage('next track');});
	$('#id').val($.cookie('id'));
	$('#id').change(function() {$.cookie('id', $('#id').val(), { expires: 90 });});
});
