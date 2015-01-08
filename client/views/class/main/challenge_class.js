Template.challenge_class.rendered = function() {
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
    allOtherFreeClasses: function() {
        var pointer = Classes.find({
            _id: {
                $ne: Template.currentData()._id
            }
        });
        var results = pointer.fetch();
        var freeClasses = results.filter(function(classObject) {
            if (activeChallengeWithClass(classObject._id)) {
                return false
            } else {
                return true;
            }
        });

        return freeClasses;
    }
});

Template.challenge_class.events({
    'click #confirmChallenge': function(){
        var challenged = document.getElementById('selectClass').value;
        var challenger = Template.currentData()._id;
        newChallenge(challenged, challenger);
    }
})