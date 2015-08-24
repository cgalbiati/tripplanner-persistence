var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var models = require('../../models');

router.get('/', function(req, res, next) {
	models.Day.find({})
	.exec()
	.then(function(days) {
		console.log(days);
		res.json(days)
	})
	.catch(next)
})

router.get('/:id', function(req, res, next) {
	models.Day.findOne({
		number: req.params.id
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

router.post('/add-new-day', function(req, res, next) {
	//find out num days
	//make a new day with number as next num
	//save to db
})

router.delete('/:id', function(req, res, next) {
	//find day based on num (id)
	//remove it from db and from ui
	//
})

module.exports = router;
