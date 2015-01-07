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

Template.challenge_class_away_main.events({
    'click #confirmChallenge': function() {
        console.log("challenge");
        var challenged = Template.currentData()._id
        var challenger = document.getElementById('selectClass').value
        var newChallenge = {
            challenger: challenger,
            challenged: challenged,
            start: new Date(),
            end: oneWeekFromNow(),
            startXPchallenger: getExperienceTotalForClass(challenger),
            startXPchallenged: getExperienceTotalForClass(challenged),
            accepted: false
        };
        console.log(newChallenge);
        Challenges.insert(newChallenge, function(err, ID){
            if (err){
                console.log(err);
                setAlert('error', 'an error occurred');
            }
            else{
                setAlert('info', 'challenged!' );
            }
        });
    }
})