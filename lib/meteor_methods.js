Meteor.methods({
    // Creates a new user and then sends an enrollment email
    'createUserFromEmail': function(email) {
        var newUserId = Accounts.createUser({
            email: email
        });
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId
    },
    'removeTask': function(taskID) {
        Tasks.remove({
            _id: taskID
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                TasksData.remove({
                    taskId: taskID
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("task deleted!");
                    }
                });
            }
        });
    }
});