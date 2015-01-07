Template.challenge_class.rendered = function () {
    $('#challengeOpenA').css('display', 'none');


    var creatingClass = false;

    $('#previewChallengeA').click(function(event) {
        if (creatingClass) {
            $('#challengeOpenA').slideUp(250);
        } else {
            $('#challengeOpenA').slideDown(250);
        }
        creatingClass = !creatingClass;
    });
};

Template.challenge_class.helpers({
    foo: function () {
        // ...
    }
});