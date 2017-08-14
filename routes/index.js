var express = require('express');
var fs = require('fs');
var xss = require('xss-filters');
var mkdir = require('mkdirp');
// xss 필터

var t = require('../utils/tools'); // 입력 검증 등에 필요한 도구
const models = require('../models');
var router = express.Router();

// 홈
router.get('/', (req, res) => {
	res.render('index', { title: 'Rivator', menu: 0 });
});
// 강좌 검색 페이지
router.get('/courses', (req, res) => {
	res.render('courses', { title: 'Rivator', menu: 1 });
});
// 강사 검색 페이지
router.get('/teachers', (req, res) => {
	res.render('teachers', { title: 'Rivator', menu: 2 });
});
// 나의 프로필
router.get('/mypage', (req, res) => {
	res.render('mypage', { title: 'Rivator', menu: 3 });
});


// 회원가입
router.get('/join', (req, res) => {
	res.render('join', { title: 'Rivator', menu: 0 });
});

router.post('/join', (req, res) => {
	var d = req.body, f = req.files;
	var portfolio = (req.files && req.files.portfolio) ? req.files.portfolio : undefined;
	if (t.checkAccount(d, res) && t.checkFile(f, res)) { // form 입력검증 & 파일 검증
		// 형식에 맞지 않으면 false를 리턴하고 메세지 json responsing
		d.profileUrl = f.profileImage.name;
		delete (d.rePw);
		delete (d.agree);
		models.User.findAll({
			where: { userId: d.userId }
		}).then((result) => {
			if (result.length === 0) {
				var encrypted = t.encryptPassword(d.userPw, null);
				d.salt = encrypted.salt;
				d.userPw = encrypted.userPw;
				models.User.create(d);
				mkdir(`./user/${d.userId}`, (err) => {
					if (!err) {
						f.profileImage.mv(`./user/${d.userId}/profile-image.jpg`, (err) => {
							if (!err) {
								if (d.userStatus === '2' && portfolio) {
									mkdir(`./user/${d.userId}/portfolio`, (err) => {
										if (!err) {
											portfolio.mv(`./user/${d.userId}/portfolio/${portfolio.name}`, (err) => {
												if (err) console.error(err.stack);
											});
										} else console.error(err.stack);
									});
								}
								res.json({
									href: `/login`,
									message: `가입되었습니다. 로그인해주세요.`
								});
							} else {
								res.json({ message: `이미지 업로드 실패.` });
							}
						});
					} else {
						res.json({ message: `디렉토리 생성 실패.` });
					}
				});
			} else {
				res.json({ message: `이미 존재하는 아이디 입니다.` });
			}
		}).catch((err) => {
			console.error(err.stack);
			res.json({ message: `알 수 없는 오류.` });
		});
	}
});

router.get('/login', (req, res) => {
	if (t.isLogin(req)) {
		res.send(`<script>alert('로그아웃 먼저 해주세요.');location.href='/'</script>`);
	} else {
		res.render('login', { title: 'Rivator', menu: 0 });
	}
});

router.post('/login', (req, res) => {
	var d = req.body;
	if (!t.isLogin(req)) {
		models.User.findAll({
			where: {
				userId: d.userId
			}
		}).then((result) => {
			if (result.length === 1) {
				models.User.findAll({
					where: {
						$and: [{ userId: result[0].userId }, { userPw: t.encryptPassword(d.userPw, result[0].salt).userPw }]
					}
				}).then((account) => {
					if (account.length === 1) {
						req.session.id = d.id;
						req.session.isLogin = true;
						res.json({
							href: `/`,
							message: `로그인에 성공했습니다.`
						});
					} else {
						res.json({ message: `아이디나 비밀번호가 일치하지 않습니다.` });
					}
				}).catch((err) => {
					console.error(err.stack);
					res.json({ message: `알 수 없는 오류.` });
				});
			} else {
				res.json({ message: `아이디가 존재하지 않습니다.` });
			}
		}).catch((err) => {
			console.error(err.stack);
			res.json({ message: `알 수 없는 오류.` });
		});
	} else {
		res.json({ message: `로그아웃 먼저 해주세요.` });
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			res.send(`<script>alert('로그아웃 완료.');location.href='/';</script>`);
			res.end();
		} else {
			res.send(`<script>alert('알 수 없는 오류.');location.href='/';</script>`);
			res.end();
		}
	});
});

module.exports = router;
