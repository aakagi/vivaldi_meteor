Template.my_class_challenges.helpers({
    'challengeRequests': function() {
        return pendingChallengesWithClass(Template.currentData()._id);
    }
});

Template.challenge.helpers({
    'challengerName': function() {
        var challenger = Template.currentData().challenger;
        var clas = Classes.findOne({
            _id: challenger
        })
        return clas.school + " " + clas.name

    }
});

Template.challenge.events({
    'click #acceptChallenge': function() {
        Challenges.update({
            _id: Template.currentData()._id
        }, {
            $set: {
                accepted: true
            }
        });
    },
    'click #denyChallenge': function() {
        //deletes challenge
        Challenges.remove({
            _id: Template.currentData()._id
        });
    }
});