var socket = io.connect();
$(function() {
	$(document).bind("touchmove", function(e) {e.preventDefault();});
	$("#controls button").click(function() { if ($('#id').val() != ""){
		socket.emit('message', $('#id').val().replace(/ /g,'-').replace(/[^a-zA-Z0-9-\.]*/g,"").toLowerCase()+'.local:' + this.id);
	}});
	$('#id').change(function() {$.cookie('id', $('#id').val(), { expires: 90 });}).val($.cookie('id'));
});
