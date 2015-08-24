var generateAttraction;

function getType() {

	var type = $(this).siblings('h4').html();
	if (type === "Hotels") type = 'hotel'
	else if (type === "Restaurants") type = 'restaurants' 
	else type = 'thingsToDo'
		return type;
}

$(document).ready(function () {
	generateAttraction = function (config) {
		config.$all.find('.add').on('click', function () {
			var self = this;
			var dayNum = findDayNum.bind(self);
			var attractionType = getType()
			var attraction = config.$all.find(':selected').data();
			$.ajax({
				method: "POST",
				url: 'days/' + findDayNum.bind(self)() + '/' + getType.bind(self)() + '/' + attraction._id,
				success: function(data) {
					new config.constructor(attraction);
				},
				error: function(err) {
					console.error(this.url)
				}
			})
			
		});
		config.all.forEach(function (attraction) {
			var $option = $('<option></option>').text(attraction.name).data(attraction);
			config.$all.find('select').append($option);
		});
		return {
			eraseMarker: function () {
				this.marker.setMap(null);
				narrowBounds(this.marker);
				return this;
			},

			buildMarker: function () {
				var location = this.place[0].location;
				this.marker = new google.maps.Marker({
					position: new google.maps.LatLng(location[0], location[1]),
					icon: config.icon
				});
				return this;
			},

			drawMarker: function () {
				this.marker.setMap(map);
				extendBounds(this.marker);
				return this;
			},

			eraseItineraryItem: function () {
				this.$itineraryItem.detach();
				return this;
			},

			buildItineraryItem: function () {
				var $title = $('<span class="title"></span>').text(this.name),
					$button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
				var $item = $('<div class="itinerary-item"></div>')
					.append($title)
					.append($button);
				this.$itineraryItem = $item;
				var self = this;
				$button.on('click', function () {
					self.delete();
				});
				return this;
			},

			drawItineraryItem: function () {
				config.$listGroup.append(this.$itineraryItem);
				return this;
			}
		};
	}

});
