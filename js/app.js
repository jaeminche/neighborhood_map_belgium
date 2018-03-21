// Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

let map, infowindow, oldMarker, foursquareURL4Data, foursquareURL4Img;

let OpenInfoWindow = function(cafe) {
    let result;
    let self = this;
    foursquareURL4Data = "https://api.foursquare.com/v2/venues/search?ll=" + cafe.lat + "," + cafe.lng + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180320&query=" + cafe.name;
    // foursquareURL4Img = "https://api.foursquare.com/v2/venues/" + VENUE_ID + "/photos"
// https://api.foursquare.com/v2/venues/4bc8672c0050b7134343ba3b/photos?&v=20180320&client_id=PJ0MJJRRYMF2BPAWAWFNKOQXDB1BI3IQSBSEG3QNDMUTXJH4&client_secret=PDPHZHXSTJVQ40SEDUPQ4QJZLLX5MRCUHUG0DEAZFUCEWYV4

    $.getJSON(foursquareURL4Data).done(function(data) {
        result = data.response.venues[0];
        self.contact = result.contact.formattedPhone;
        self.address = result.location.address;

        self.contentStrings = '<div class="card" style="width: 18rem;"><div class="card-body"><div class="card-title"><strong>' + cafe.name + '</strong></div>' +
            '<div class="card-text"><strong>contact: </strong>' + self.contact + '</div><div class="card-text"><strong>address: </strong>' + self.address + '</div></div></div>';

        infowindow.setContent(self.contentStrings);
        infowindow.open(map, cafe.marker);
    }).fail(function() {
        alert(
            'There was an error while retrieving locations data from the Foursquare API. Please refresh the page.'
        );
    });

};

let bounceMarker = function(markerSelected) {
    // sets all other markers stop bouncing
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
        self.showMarker() ? self.marker.setMap(map) : self.marker.setMap(null);
    });

    // when marker is clicked, bounce it and open infoWindow
    this.marker.addListener('click', function() {
        openInfoWindow = new OpenInfoWindow(self);
        bounceMarker(this);
    });

    // when the link is clicked, trigger marker clicking
    this.openInfoAndBounce = function(cafe) {
        google.maps.event.trigger(this.marker, 'click');
    };
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

// handle google map error
function googleMapError() {
    alert('An error occurred while retrieving data from Google Map!');
}