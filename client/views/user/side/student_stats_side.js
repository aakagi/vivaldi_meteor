Template.student_stats_side.helpers({
    multiInst: function () {
        return studentInstrumentsById(Template.currentData()._id).length > 1;
    },
    userInstruments: function () {
        return studentInstrumentsById(Template.currentData()._id);
    },
    multiSec: function () {
        return studentSectionsById(Template.currentData()._id).length > 1;
    },
    userSection: function () {
        return studentSectionsById(Template.currentData()._id);
    },
    multiClass: function(){
        return studentClassesById(Template.currentData()._id).length > 1;
    },
    userClass: function(){
        return studentClassesById(Template.currentData()._id);
    }
});