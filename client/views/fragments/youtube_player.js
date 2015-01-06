Template.youtube_player.rendered = function() {
	console.log('test created');

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	onYouTubeIframeAPIReady();
}

Template.youtube_player.helpers({
	'videoId': function() {
		return Session.get('listenTaskObject').youtubeURL;
	}
});

Template.youtube_player.events({
	'click .goBackFromListen': function() {
		Session.set('showVideo', false);
	}
});