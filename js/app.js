// Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

let map, infowindow, contentString, oldMarker;

contentString = 'hahaha';

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

    infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

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
        infowindow.open(map, self.marker);
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
        zoom: 14.5
    });

    ko.applyBindings( new ViewModel() );
}

// handle google map error
function googleMapError() {
    alert('An error occurred while retrieving data from Google Map!');
}