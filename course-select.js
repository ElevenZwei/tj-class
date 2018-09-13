const Request = require('request');

function fetchClassData(cookies, profileId) {
	const cmd = "curl 'http://4m3.tongji.edu.cn/eams/tJStdElectCourse!data.action?profileId=" + profileId + "' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:62.0) Gecko/20100101 Firefox/62.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.3,en;q=0.2' --compressed -H 'Cookie: " + cookies + "' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -H 'If-None-Match: 1536821008846_883255478' -H 'Cache-Control: max-age=0'";

}
function readClassData(data) {
	const start = data.indexOf('[');
	const end = data.lastIndexOf(']');
	const classArray = eval(data.substring(start, end) + 1); // WARNING eval shall be replaced later
	return classArray.sort((classA, classB) => (classA.no - classB.no));
}
function findClassData(classArray, classNo) {
	return classArray[binarySearch(classNo, classArray, (classA, classB) => (classA.no - classB.no))];
}

function binarySearch(value, array, comp) {
  let left = 0, right = array.length;
  while(right > left) {
    let mid = Math.floor((left + right) / 2);
    let result;
    if(comp) {
      result = comp(array[mid], value);
    } else {
      result = array[mid] < value ? -1 : array[mid] > value ? 1 : 0;
    }
    if(result === 0) { return mid; }
    if(result < 0) { left = mid + 1; }
    else { right = mid; }
  }
  return left - 1;
}



