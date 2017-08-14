$('#popup-teacher #popup-close').click(() => {
    $('#popup-teacher').css('display', 'none');
});
function getPopupTeacher(imageUrl, name, major) {
    $('#popup-teacher .preview-image').css('background-image', `url(${imageUrl})`);
    $('#popup-teacher #popup-name').text(name);
    $('#popup-teacher #popup-major').text(major);
    $('#popup-teacher').css('display', 'block');
}