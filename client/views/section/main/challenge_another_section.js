Template.challenge_another_section.rendered = function () {
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
