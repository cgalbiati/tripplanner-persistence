var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var models = require('../../models');

router.get('/', function(req, res, next) {
	models.Trip.find({})
	.exec()
	.then(function(days) {
		res.json(days)
	})
	.catch(next)
})

router.get('/:id', function(req, res, next) {
	models.Trip.find({
	}).then(function(days) {
		//do somehting to days[req.params.id]
	})
	.catch(next)
})

router.post('/:id/restaurants', function(req, res, next) {
	models.Day.findOne({
		number: req.params.id
	})
	.exec()
	.then(function(day) {
		day.restaurants.push()
	})
	.catch(next)

})

router.post('/:id/activities', function(req, res, next) {
	models.Day.findOne({
		number: req.params.id
	})
	.exec()
	.then(function(day) {
		day.restaurants.push()
	})
	.catch(next)

})

router.post('/:id/hotel', function(req, res, next) {
	models.Day.findOne({
		number: req.params.id
	})
	.exec()
	.then(function(day) {
		day.restaurants.push()
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
				models.Trip.find().exec()
				.then(function(trips){
					console.log('newly updated', trips)
				}).then(function(){
					res.json(data);
				})
			}
		});
	});
	
});

router.delete('/:id', function(req, res, next) {
	//find day based on num (id)
	//remove it from db and from ui
	//
})

module.exports = router;
