Template.class_section_leaders_side.rendered = function () {
    $('#sectionLeadersDisplay').css('display', 'none');


    var showing = false;

    $('#previewSectionLeaders').click(function(event) {
        if (showing) {
            $('#sectionLeadersDisplay').slideUp(150);
        } else {
            $('#sectionLeadersDisplay').slideDown(150);
        }
        showing = !showing;
    });
};

Template.class_section_leaders_side.helpers({
    'sectionList': function() {
        var sectionIds = Template.currentData().sections;
        // console.log(sectionIds);
        var returnSections = Sections.find({
            _id: {
                $in: sectionIds
            },
            name: {
                $ne: 'Teachers'
            }
        }, {sort: {order: 1}}).fetch();
        return returnSections;
    },
    'currentLeader': function() {
        if (Template.currentData().leader) {
            var result = Meteor.users.findOne({
                _id: Template.currentData().leader
            });
            return result;
        } 
        // else {
        //     return {
        //         profile: {
        //             firstName: "",
        //             lastName: "Leader"
        //         },
        //         _id: "noleader"
        //     }
        // }
    },
});
