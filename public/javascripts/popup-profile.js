$('#popup-profile #popup-close').click(() => {
    $('#popup-profile').css('display', 'none');
});
function getPopupProfile(imageUrl, name, major) {
    $('#popup-profile .user-image').css('background-image', `url(${imageUrl})`);
    $('#popup-profile #popup-name').text(name);
    $('#popup-profile #popup-major').text(major);
    $('#popup-profile').css('display', 'block');
}