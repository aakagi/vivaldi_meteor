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
});