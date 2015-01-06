Template.user_stats_side.helpers({
    multiInst: function () {
        return studentInstrumentsById(Meteor.userId()).length > 1;
    },
    userInstruments: function () {
        return studentInstrumentsById(Meteor.userId());
    },
    multiSec: function () {
        return studentSectionsById(Meteor.userId()).length > 1;
    },
    userSection: function () {
        return studentSectionsById(Meteor.userId());
    },
    multiClass: function(){
        return studentClassesById(Meteor.userId()).length > 1;
    },
    userClass: function(){
        return studentClassesById(Meteor.userId());
    }
});