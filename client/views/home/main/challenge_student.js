Template.challenge_student.rendered = function () {
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
