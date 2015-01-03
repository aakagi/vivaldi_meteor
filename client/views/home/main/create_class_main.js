Template.create_class_main.rendered = function() {
    $('.form').css('display', 'none');

    $('.preview').click(function(event) {
        $('.preview').slideUp(250);
        $('.form').slideDown(250);
    });

    $('#cancelClass').click(function(event) {
        $('.form').slideUp(250);
        $('.preview').slideDown(250);
    });
}

Template.create_class_main.helpers({
    preMadeEnsembles: function() {
        return [
            {'ensembleName': 'String Orchestra'}, 
            {'ensembleName': 'Concert Band'},
            {'ensembleName': 'Full Orchestra'},
            {'ensembleName': 'Other'}
        ];
    },
    // TODO: Doesn't work yet
    preMadeSections: function() {
        var sections;
        var selectedPreMadeEnsemble = Session.get("preMadeEns");

        switch (selectedPreMadeEnsemble) {
            case "String Orchestra":
                sections = ['Violin 1', 'Violin 2', 'Viola', 'Cello', 'Bass', 'Other'];
                break;
            case "Concert Band":
                sections = ['Flute', 'Clarinet', 'Oboe', 'Bassoon', 'Trumpet', 'Trombone'];
                break;
            case "Full Orchestra":
                sections = ['Violin 1', 'Violin 2', 'Viola', 'Cello', 'Bass', 'Other', 'Flute', 'Clarinet', 'Oboe', 'Bassoon', 'Trumpet', 'Trombone'];
                break;
            case "asdf":
                sections = ['a', 'b', 'c'];
                break;
            default:
                return null;
                break;
        }
        for (var i = 0; i < sections.length; i++) {
            var temp;
            if (i == 0) {
                temp = sections[i];
            } else {
                temp = ', ' + sections[i];
            }
            if (sectionString) {
                var sectionString = sectionString + temp;
                console.log(sectionString);
            } else {
                var sectionString = temp;
            }
        };
        console.log(sectionString);
        return sectionString;
    }
});

Template.create_class_main.events({
    'change #selectPreMade': function(evt) {
        var selectedEnsemble = $(evt.target).val();
        console.log(selectedEnsemble);
        Session.set("preMadeEns", selectedEnsemble);
    },
    'click #createClass': function() {
        //get class data from fields
        className = document.getElementById('className').value;
        sectionNames = document.getElementById('sectionNames').value;
        schoolName = currentSchool();
        //split string using handy-dandy split function
        sectionNames = sectionNames.split(", ");
        userId = Meteor.userId();
        sectionIDs = []

        if (isNotEmpty(className) && isNotEmpty(sectionNames)) {
            //defines a document, inserts it, then inserts the section ID into an array
            //array will be saved to the class document
            for (section in sectionNames) {
                sectionDoc = {
                    name: sectionNames[section],
                    users: []
                };
                sectionID = Sections.insert(sectionDoc);
                sectionIDs.push(sectionID);
            }
            //add teacher section
            teacherSectionDoc = {
                name: "Teachers",
                users: [userId]
            }
            teacherSectionID = Sections.insert(teacherSectionDoc);
            sectionIDs.push(teacherSectionID);

            classDoc = {
                name: className,
                school: schoolName,
                teachers: [userId],
                students: [],
                waitlist: [],
                sections: sectionIDs,
                locked: false
            };
            Classes.insert(classDoc, function(err, id){
            	if (err){
            		console.log(err);
            		setAlert('error', 'error writing to database');
            	}
            	else{
            		setAlert('info', 'class created successfully!');
            	}

            });
        }
    }
});