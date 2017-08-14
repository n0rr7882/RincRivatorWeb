var express = require('express');
var fs = require('fs');

var t = require('../utils/tools'); // 입력 검증 등에 필요한 도구
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('profile/info'); // 프로필 페이지로 리다이렉트
});
// 프로필 페이지
router.get('/info', (req, res) => {
    res.render('profile', { title: 'Rivator 마이페이지', menu: 1 });
});
// 진행 강좌 리스트
router.get('/courses', (req, res) => {
    res.render('profile-objects', { title: 'Rivator 마이페이지', menu: 2 });
});
// 진행 숙제 리스트
router.get('/homeworks', (req, res) => {
    res.render('profile-objects', { title: 'Rivator 마이페이지', menu: 3 });
});
// 진행 콘테스트 리스트
router.get('/contests', (req, res) => {
    res.render('profile-objects', { title: 'Rivator 마이페이지', menu: 4 });
});
// 진행 프로젝트 리스트
router.get('/projects', (req, res) => {
    res.render('profile-objects', { title: 'Rivator 마이페이지', menu: 5 });
});

module.exports = router;