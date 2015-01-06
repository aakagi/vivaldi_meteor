Template.other_teachers_side.helpers({
    otherTeachersList: function () {
        // return otherTeacherDocuments;
    }
}); 

Template.other_teachers_side.rendered = function() {
    $('#otherTeachersList').css('display', 'none');

    $('#previewOtherTeachers').click(function(event) {
        $('#previewOtherTeachers').slideUp(250);
        $('#otherTeachersList').slideDown(250);
    });

    $('#cancel').click(function(event) {
        $('#classCreateForm').slideUp(250);
        $('#otherTeachersList').slideDown(250);
    });
    
    // $('#createClass').click(function(event) {
    //     $('#classCreateForm').slideUp(250);
    //     $('#previewCreateClass').slideDown(250);
    // }); 
}