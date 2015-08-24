function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

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
			console.log(daysArr);
			days = daysArr;
			currentDay = days[0];
			console.log(currentDay);
			currentDay.$button.addClass('current-day');
		},
		error: function(err) {
			console.error(err);
		}
	})

});
