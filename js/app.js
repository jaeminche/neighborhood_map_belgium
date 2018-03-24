/*
 * This js file contains the view-model which creates Knockout Observables and calls for API requests
 */

let map, infowindow, oldMarker, dataReqFoursquare, imgReqFoursquare;

let OpenInfoWindow = function(cafe) {
    let dataRetrieved, photoDataRetrieved, imgUrl;

    let self = this;
    dataReqFoursquare = `https://api.foursquare.com/v2/venues/search?ll=${cafe.lat},${cafe.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180320&query=${cafe.name}`;

    $.getJSON(dataReqFoursquare).done(function(data) {
        dataRetrieved = data.response.venues[0];
        self.contact = dataRetrieved.contact.formattedPhone || 'no phone number provided!';
        self.address = dataRetrieved.location.address || 'no address provided!';
        self.homepage = (url) => (!url) ? '<br>Perhaps there is no homepage!' : `<a href="${url}">${url}</a>`;

        self.contentStrings = `<div class="card" style="width: 13rem"><div class="card-header"><strong>${cafe.name}</strong></div><div class="card-body"><div class="card-text"><strong>contact: </strong>${self.contact}</div><div class="card-text"><strong>address: </strong>${self.address}</div><div class="card-text"><strong>homepage: </strong>${self.homepage(dataRetrieved.url)}</div></div></div>`;
        self.VENUE_ID = dataRetrieved.id;

        // Make a second request for venue's photo by using another endpoint (this separate api call has to be done because the request for the photos data requires a venue_id in its request URL which is retrieved precedently)
        imgReqFoursquare = `https://api.foursquare.com/v2/venues/${self.VENUE_ID}/photos?&v=20180320&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        $.getJSON(imgReqFoursquare).done(function(imgData) {
            photoDataRetrieved = imgData.response.photos.items[0];
            self.imgUrl = photoDataRetrieved.prefix + 'width200' + photoDataRetrieved.suffix;
            self.imgStrings = `<div class="card thumbnail" style="width:13rem"><img class="card-img-bottom" src="${self.imgUrl} "alt="cafe image"></div></div>`;
            infowindow.setContent(self.contentStrings + self.imgStrings);
            infowindow.open(map, cafe.marker);
        }).fail(function() {
            alert(
                'Oops! Something went wrong while retrieving the image data from Foursquare API. Please refresh the page!'
                );
        });
    }).fail(function() {
        alert(
            'Oops! Something went wrong while retrieving the data from Foursquare API. Please refresh the page!'
            );
    });
};

/*
 * Bounces only the marker clicked on and stops the previously selected marker bounce if there's any.
 */
let bounceMarker = markerSelected => {
    if (oldMarker !== undefined && oldMarker.getAnimation() !== null && oldMarker !== markerSelected) {
        oldMarker.setAnimation(null);
    }
    markerSelected.setAnimation(google.maps.Animation.BOUNCE);
    oldMarker = markerSelected;
};

function LocationDetail(cafe) {
    let self = this;
    this.name = cafe.name;
    this.lat = cafe.lat;
    this.lng = cafe.lng;
    this.showMarker = ko.observable(true);

    infowindow = new google.maps.InfoWindow();

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        title: this.name,
        animation: google.maps.Animation.DROP
    });

    // Sets only the marker filtered
    this.setMarker = ko.computed(function() {
        return self.showMarker() ? self.marker.setMap(map) : self.marker.setMap(null);
    });

    // when marker is clicked, bounce it and open infoWindow
    this.marker.addListener('click', function() {
        openInfoWindow = new OpenInfoWindow(self);
        bounceMarker(this);
    });

    // when the link is clicked, trigger marker clicking
    this.openInfoAndBounce = cafe => google.maps.event.trigger(this.marker, 'click');

}

function ViewModel() {
    let self = this;

    this.searchItem = ko.observable('');

    this.unfilteredDataArray = ko.observableArray([]);

    // Pushes locations data array into new location list array
    defaultData.forEach(function(item){
        self.unfilteredDataArray.push( new LocationDetail(item) );
    });

    this.filteredDataArray = ko.computed(function() {
        let filteredLowerCased = self.searchItem().toLowerCase();
        // If before search, show markers for all the locations and return them,
        // if not, show and return only the filtered ones
        if (!filteredLowerCased) {
            self.unfilteredDataArray().forEach(function(cafe){
                cafe.showMarker(true);
            });
            return self.unfilteredDataArray();
        } else {
            return ko.utils.arrayFilter(self.unfilteredDataArray(), function(cafe) {
                let cafeLowerCased = cafe.name.toLowerCase();
                let result = (cafeLowerCased.search(filteredLowerCased) >= 0);
                cafe.showMarker(result);
                return result;
            });
        }
    }, this);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: targetCity,
        zoom: 16
    });

    ko.applyBindings( new ViewModel() );
}

// handles google map error
function googleMapError() {
    alert('An error occurred while retrieving data from Google Map!');
}
