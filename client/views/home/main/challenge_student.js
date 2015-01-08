Template.challenge_student.rendered = function() {
    $('#studentChallenge').css('display', 'none');

    var showing = false;

    $('#previewStudentChallenge').click(function(event) {
        if (showing) {
            $('#studentChallenge').slideUp(250);
        } else {
            $('#studentChallenge').slideDown(250);
        }
        showing = !showing;
    });
};

Template.challenge_student.helpers({
    allOtherFreeStudents: function() {

        //get all classes this student is a member of

        var allClasses = userClasses();

        var allStudents = [];

        for (i in allClasses) {
            allStudents.push.apply(allStudents, allClasses[i].students);
        }

        var studentObjects = Students.find({
            $and: [{
                _id: {
                    $ne: Template.currentData()._id
                }
            }, {
                _id: {
                    $in: allStudents
                }
            }]
        }).fetch();
        var freeStudents = studentObjects.filter(function(studentobj) {
            //also works for students!
            if (activeChallengeWithClass(studentobj._id)) {
                return false
            } else {
                return true;
            }
        });
        return freeStudents;
    }
});

Template.challenge_student.events({
    'click #confirmChallenge': function(){
        var challenged = document.getElementById('selectStudent').value;
        var challenger = Meteor.userId();
        newChallenge(challenged, challenger);
    }
})