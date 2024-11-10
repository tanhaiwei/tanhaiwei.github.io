var data = [];
(function () {
	var head = originData[0];
	originData.forEach(function (d, i) {
		if (i === 0) {
			return;
		}
		var hash = {};
		head.forEach(function (h, j) {
			hash[h] = d[j];
		});
		data.push(hash);
	});
}());

var parseMajor = function (d) {
	var major = (d['Major'] || 'Unknown').split(/[\s\n]/).join(' ');
	if (major === 'law') { // 纠错
		major = 'Law';
	}
	if (major === 'economics') { // 纠错
		major = 'Economics';
	}
	d['Major'] = major;
};
var parseEdu = function (d) {
	var edu = (d['Educational background'] || 'Unknown').split(/[\s\n]/).join(' ');
	// if (edu === "high school educations or less") { // 纠错
	// 	edu = "High school educations or less";
	// }
	d['Educational background'] = edu;
};
var parsePartisan = function (d) {
	var p = d.Partisan;
	if (p.indexOf('CPC(') === 0) {
		d.Partisan = 'CPC (Communist Party of China)';
	}
};
var originOrderData = data.slice();
data.forEach(function (d, i) {
	parseMajor(d);
	parseEdu(d);
	parsePartisan(d);
	d.index = i;
	d.originIndex = i;
	d.position = {
        x: 0,
        y: 0
    };
});

console.log('data', data);