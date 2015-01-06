Template.create_class_main.rendered = function() {
    $('#classCreateForm').css('display', 'none');

    $('.preview').click(function(event) {
        $('.preview').slideUp(250);
        $('#classCreateForm').slideDown(250);
    });

    $('#cancelClass').click(function(event) {
        $('#classCreateForm').slideUp(250);
        $('.preview').slideDown(250);
    });
    
    $('#createClass').click(function(event) {
        $('#classCreateForm').slideUp(250);
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
                sections = ['Flute', 'Clarinet', 'Oboe', 'Bassoon', 'Saxophone', 'Trumpet', 'French Horn', 'Trombone', 'Euphonium', 'Tuba'];
                break;
            case "Full Orchestra":
                sections = ['Violin 1', 'Violin 2', 'Viola', 'Cello', 'Bass', 'Other', 'Flute', 'Clarinet', 'Oboe', 'Bassoon', 'French Horn', 'Trumpet', 'Trombone'];
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

        if (isNotEmpty(className)) {
            //defines a document, inserts it, then inserts the section ID into an array
            //array will be saved to the class document
            for (section in sectionNames) {
                // Apparently var section isn't a freaking int
                var plusOne = Number(section) + 1;
                sectionDoc = {
                    name: sectionNames[section],
                    users: [],
                    order: plusOne, //In order to sort sections
                    locked: false
                };
                sectionID = Sections.insert(sectionDoc);
                sectionIDs.push(sectionID);
            }
            //add teacher section
            teacherSectionDoc = {
                name: "Teachers",
                users: [userId],
                order: sectionIDs.length,
                locked: false
            }
            teacherSectionID = Sections.insert(teacherSectionDoc);
            sectionIDs.push(teacherSectionID);
            sectionLeadersDoc =  {
                name: "Section Leaders",
                users: [],
                order: sectionIDs.length,
                leader: userId,
                locked: false
            }
            sectionLeadersID = Sections.insert(sectionLeadersDoc);
            sectionIDs.push(sectionLeadersID);

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
            		setAlert('error', 'Error writing to database');
            	}
            	else{
            		setAlert('info', 'Class created successfully!');
            	}

            });
        }
    }
});