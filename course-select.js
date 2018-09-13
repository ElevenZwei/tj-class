const Request = require('request');
const util = require('./util');

function makeRequestOption(url, cookies) {
	return {
		url: url,
		headers: {
			'User-Agent': 'Mozilla/5.0 Gecko/20100101 Firefox/62.0',
			'Accept': 'text/javascript;q=0.9,*/*;q=0.8',
			'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.2',
			'Cookie': cookies,
			'Connection': 'keep-alive'
		}
	};
}
function fetch4m3Promise(cookies, url) {
	const options = makeRequestOption(url, cookies);
	return new Promise((resolve, reject) => {
		const callback = (err, res, body) => {
			if(!err && res.statusCode === 200) {
				if(body.indexOf('内部错误') === -1) {
					resolve(body);
				} else {
					reject(new Error('Server Internal Error'), res);
				}
			} else {
				console.log(err, res); //
				reject(err, res);
			}
		};
		Request(options, callback);
	});
}

function fetchClassDataPromise(cookies, profileId) {
	// must visit defaultPage.action first, or this will return an error page with '服务器内部错误'.
	return fetch4m3Promise(cookies, 'http://4m3.tongji.edu.cn/eams/tJStdElectCourse!data.action?profileId=' + profileId);
}

function fetchStdCountPromise(cookies, profileId) {
	return fetch4m3Promise(cookies, 'http://4m3.tongji.edu.cn/eams/tJStdElectCourse!queryStdCount.action?profileId=' + profileId);
}

function readClassData(data) {
	const start = data.indexOf('[');
	const end = data.lastIndexOf(']');
	const classArray = eval(data.substring(start, end) + 1); // WARNING eval shall be replaced later
	return classArray.sort((classA, classB) => (classA.no - classB.no));
}
function findClassData(classArray, classNo) {
	return classArray[util.binarySearch(classNo, classArray, (classA, classB) => (classA.no - classB.no))];
}



