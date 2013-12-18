var socket = io.connect();
function sendMessage(msg) {
	if ($('#id').val() != "")
	{
		socket.emit('message', $('#id').val().replace(' ','-').replace(/[^a-zA-Z0-9-\.]*/g,"").toLowerCase()+'.local:'+msg);
	}
}

$(function() {
	$("#playpause").click(function() {sendMessage('playpause');});
	$("#prev").click(function() {sendMessage('play previous track');});
	$("#next").click(function() {sendMessage('play next track');});
	$('#id').val($.cookie('id'));
	$('#id').change(function() {$.cookie('id', $('#id').val(), { expires: 90 });});
});
