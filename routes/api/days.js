var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var models = require('../../models');
// var Promise = require('bluebird');



//populate testing
// router.get('/', function(req, res, next) {
// 	// var promiseDays = []
// 	console.log('yo');
// 	console.log(models.Trip.deepPopulate);
// 	models.Trip.deepPopulate('days.restaurants', function(err, trip) {
// 		if (err) return next(err);
// 		console.log(trip)
// 		res.end()
// 	});
// })

router.get('/', function(req, res, next) {
	console.log('yo');
	var trip = models.Trip.findOne({}).exec();
	trip.then(function(foundTrip) {
		foundTrip.days.forEach(function(day,index) {
			var restaurantArr = []; 
			day.restaurants.forEach(function(restaurant) {
				restaurantArr.push(models.Restaurant.findById(restaurant).exec());
				// .then(function(restaurant) {
				// 	restaurantArr.push(restaurant);
				// 	console.log(restaurantArr);
				// });
			})
			mongoose.Promise.all(restaurantArr).then(function(arr) {
				foundTrip.days[index].restaurants = arr;
			})
		})
		// console.log(foundTrip);
		return foundTrip;
	})
	.then(function(foundItAgain) {
		console.log("It worked!")
		res.json(foundItAgain);
	})
})






// //populate testing
// router.get('/', function(req, res, next) {
// 	var promiseDays = []
// 	models.Trip.findOne({})
// 	.then(function(trip) {
// 		trip.days.forEach(function(day) {
// 			// console.log('wots this', day._id)
// 			console.log('before ze promise', day)
// 			promiseDays.push(day.populate('restaurants'))
// 		})
// 		return promiseDays;
// 	}).then(Promise.all)

// 	.then(function(days) {
// 		console.log(days);
// 		// console.log('this is tripArr[0].days', tripArr[0].days);
// 		res.send(days)
// 	})
// 	.catch(next)
// })


//working code

// router.get('/', function(req, res, next) {
// 	models.Trip.find({})
// 	.exec()
// 	.then(function(tripArr) {
// 		// console.log('this is tripArr[0].days', tripArr[0].days);
// 		res.send(tripArr[0].days)
// 	})
// 	.catch(next)
// })

// router.get('/:id', function(req, res, next) {
// 	models.Trip.find({
// 	}).then(function(days) {
// 		//do somehting to days[req.params.id]
// 	})
// 	.catch(next)
// })

router.post('/:dayNum/restaurants/:restaurantId', function(req, res, next) {
	models.Trip.findOne({}).exec()
	.then(function(trip){

		trip.days[req.params.dayNum-1].restaurants.push(req.params.restaurantId)
		return trip
	})
	.then(function(trip) {
		// console.log(trip)
		return models.Trip.findByIdAndUpdate(trip._id, trip).exec()
	})
	.then(function(trip) {
		// console.log(trip)
		res.send(trip);
	})
	.catch(next)

})

router.post('/:dayNum/activities/:activitiesId', function(req, res, next) {
	models.Trip.findOne({}).exec()
	.then(function(trip){
		console.log('trip.days', trip.days[req.params.dayNum-1]);
		trip.days[req.params.dayNum-1].activities.push(req.params.activitiesId)
		// console.log('trip', trip);
		return trip
	})
	.then(function(trip) {
		// console.log(trip)
		return models.Trip.findByIdAndUpdate(trip._id, trip).exec()
	})
	.then(function(trip) {
		// console.log(trip)
		res.send(trip);
	})
	.catch(next)

})

router.post('/:dayNum/hotel/:hotelId', function(req, res, next) {
	models.Trip.findOne({}).exec()
	.then(function(trip){

		trip.days[req.params.dayNum-1].hotel = req.params.hotelId
		return trip
	})
	.then(function(trip) {
		return models.Trip.findByIdAndUpdate(trip._id, trip).exec()
	})
	.then(function(trip) {
		res.send(trip);
	})
	.catch(next)
})

router.post('/add-new-day', function(req, res, next) {
	//find out num days
	//make a new day with number as next num
	//save to db
	// var newDay = new models.Day({});
	models.Day.create({})
	.then(function(day) {
		models.Trip.update({}, {$push: {'days': day}}, function(err, data){
			if (err) next(err);
			else {
				models.Trip
				.find()
				.exec()
				.then(function(){
					res.json(data);
				})
			}
		});
	});

});

//Trip schema
	//trip: {}
		// trip.days: []
router.delete('/:dayNum', function(req, res, next) {
	//find day based on num (id)
	models.Trip.find({})
	.then(function(arr) {
		if(arr[0].days.length > 1) {
			arr[0].days.splice(req.params.dayNum-1, 1);
			return arr[0];
		}
	})
	.then(function(trip) {
		return models.Trip.findByIdAndUpdate(trip._id, trip).exec()
	})
	.then(function(trip) {
		res.send(trip);
	})
	.catch(next)
})

module.exports = router;
