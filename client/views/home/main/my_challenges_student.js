Template.my_challenges_student.helpers({
    'challengeRequests': function() {
        return pendingChallengesWithClass(Template.currentData()._id);
    }
});