Template.youtube_player.rendered = function() {
	console.log('test created');

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	//disable completion button
	$('#completeTask').addClass('disabled').attr('disabled', 'disabled');

	onYouTubeIframeAPIReady();
}

Template.youtube_player.helpers({
	'videoId': function() {
		return Session.get('listenTaskObject').youtubeURL;
	}
});

enableCompletion = function(){
	$('#getTask').removeClass('disabled').removeAttr('disabled', 'disabled');
}

Template.youtube_player.events({
	'click .goBackFromListen': function() {
		Session.set('showVideo', false);
	},
	'click #completeTask': function(){
		console.log("complete task");
		var listenTask = Session.get('listenTaskObject');

		Meteor.call('completeTask', Meteor.userId(), listenTask._id);
		setAlert('info', 'task completed!');
	}
});