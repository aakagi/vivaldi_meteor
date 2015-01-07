Template.class_stats_side.helpers({
    teachersArray: function() {
        var ids = Template.currentData().teachers;
        // return getUsersByIds(ids);
        var results = Meteor.users.find({
            _id: {
                $in: ids
            }
        }).fetch();
        return results;
    },
    currentChallenge: function() {
        return activeChallengeWithClass(Template.currentData()._id);
    },
    currentChallengeName: function() {
        var challenge = activeChallengeWithClass(Template.currentData()._id);
        //display the other class involved
        if (challenge.challenger == Template.currentData()._id) {
            return Classes.findOne({
                _id: template.challenged
            }).name
        } else if (challenge.challenged == Template.currentData()._id) {
            return Classes.findOne({
                _id: template.challenger
            }).name
        }
    }
});