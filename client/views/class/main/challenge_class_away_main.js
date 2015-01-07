Template.challenge_class_away_main.rendered = function() {
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
    yourClasses: function() {
        //returns all classes with no acceped challenges
        var classes = userClasses();
        var freeClasses = [];

        for (i in classes) {
            clas = classes[i]
            if (activeChallengeWithClass(clas._id) == null) {
                freeClasses.push(clas);
            }
        }
        return freeClasses;
    },
    currentChallenge: function() {
        return activeChallengeWithClass(Template.currentData()._id);
    }
});

Template.challenge_class_away_main.helpers({
    'click #confirmChallenge': function(){
        var challenged = Template.currentData()._id
        //var newChallenge = {challenger: document.getElementById('selectClass').value, challenged: challenged}
    }
})