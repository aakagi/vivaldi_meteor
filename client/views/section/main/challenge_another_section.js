Template.challenge_another_section.rendered = function() {
    $('#sectionChallenge').css('display', 'none');

    var showing = false;

    $('#previewSectionChallenge').click(function(event) {
        if (showing) {
            $('#sectionChallenge').slideUp(250);
        } else {
            $('#sectionChallenge').slideDown(250);
        }
        showing = !showing;
    });
};

Template.challenge_another_section.helpers({
    'allOtherFreeSections': function() {
        var pointer = Sections.find({
            _id: {
                $ne: Template.currentData()._id
            }
        });
        var results = pointer.fetch();
        var freeSections = results.filter(function(sectionObject) {
            //this also works with sections
            if (activeChallengeWithClass(sectionObject._id)) {
                return false
            } else {
                return true;
            }
        });

        return freeSections;
    }
});

Template.challenge_another_section.events({
    'click #confirmChallenge': function(){
        var challenged = document.getElementById('selectsection').value;
        var challenger = Template.currentData()._id;
        newChallengeSection(challenged, challenger);
    }
})

Template.other_section.helpers({
    'sectionName': function() {
        //get the section's class and append it to the name

        var sectionClass = Classes.findOne({
            _id: Template.currentData().classId
        });

        return sectionClass.name + " " + Template.currentData().name
    }
})