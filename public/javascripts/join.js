function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
            $('.profile-image').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$('#submit').click(function () { // 가입하기 버튼 클릭시
    var data = new FormData($('#join-form')[0]); // form data 겟
    $.ajax({
        url: '/join',
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            alert(data.message); // 받아온 메세지 띄우기
            if (data.href) { // 받아온 데이터 중 href 존재 시
                location.href = data.href; // 그 주소로 이동
            }
        }
    });
});