Template.class_section_leaders_side.rendered = function () {
    $('#sectionLeadersDisplay').css('display', 'none');


    var showing = false;

    $('#previewSectionLeaders').click(function(event) {
        if (showing) {
            $('#sectionLeadersDisplay').slideUp(250);
        } else {
            $('#sectionLeadersDisplay').slideDown(250);
        }
        showing = !showing;
    });
};