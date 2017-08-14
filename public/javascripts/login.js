$('#submit').click(() => { // 로그인하기 버튼 클릭시
    var data = new FormData($('#login-form')[0]); // form data 겟
    $.ajax({
        url: '/login',
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