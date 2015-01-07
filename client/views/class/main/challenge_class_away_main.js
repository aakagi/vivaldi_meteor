Template.challenge_class_away_main.rendered = function () {
    $('#challengeOpen').css('display', 'none');


    var creatingClass = false;

    $('#previewChallenge').click(function(event) {
        if (creatingClass) {
            $('#challengeOpen').slideUp(250);
        } else {
            $('#challengeOpen').slideDown(250);
        }
        creatingClass = !creatingClass;
    });
};

Template.challenge_class_away_main.helpers({
    foo: function () {
        // ...
    }
});