function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}
var firstLoad = false;
var days, currentDay;

$(document).ready(function () {
	// $.get('/days', function(daysArr) {
	// 	console.log('daysArr', daysArr);
	// 	days = daysArr;
	// 	currentDay = days[0];
	// 	console.log('days', days);
	// 	currentDay.$button.addClass('current-day');
	// }, function(err) {
	// 	console.error(err);
	// })

	$.ajax({
		method: 'GET',
		url: '/days',
		success: function(daysArr) {
			firstLoad = true;
			console.log(daysArr);
			days = daysArr;
			daysArr.forEach(function(obj, index) {
				obj.number = index+1;
				console.log(obj.number)
				var newDay = new Day()
				for (var key in obj) {
						newDay[key] = obj[key] || newDay[key]
					}
				days[index] = newDay
				newDay.buildButton()
				.drawButton();
			})
			currentDay = days[0];
			firstLoad = false;
			// currentDay.$button.addClass('current-day');
		},
		error: function(err) {
			console.error(err);
		}
	})

});

var findDayNum = function() {
	console.log('this in findDayNum', $(this))
	return $('#day-title').children('span').html().split(' ')[1];
}
