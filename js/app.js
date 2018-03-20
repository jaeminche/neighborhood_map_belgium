// Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

let map, contentString;

contentString = 'hahaha';

function LocationDetail(cafe) {
    let self = this;
    this.name = cafe.name;
    this.lat = cafe.lat;
    this.lng = cafe.lng;
    this.show = ko.observable(true);

    this.infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(cafe.lat, cafe.lng),
        title: cafe.name
    });
    // Sets marker
    this.setMarker = ko.computed(function() {
        self.show() ? self.marker.setMap(map) : self.marker.setMap(null);
    });

    this.marker.addListener('click', function() {
        self.infowindow.open(map, self.marker);
    });

}

function ViewModel() {
    let self = this;

    this.searchItem = ko.observable('');

    this.retrievedDataArray = ko.observableArray([]);

    // Pushes locations data array into new location list array
    defaultData.forEach(function(item){
        self.retrievedDataArray.push( new LocationDetail(item) );
    });

    this.filteredDataArray = ko.computed(function() {
        let filteredLowerCased = self.searchItem().toLowerCase();
        // If before search, show markers for all the locations and return them,
        // if not, show and return only the filtered ones
        if (!filteredLowerCased) {
            self.retrievedDataArray().forEach(function(cafe){
                cafe.show(true);
            });
            return self.retrievedDataArray();
        } else {
            return ko.utils.arrayFilter(self.retrievedDataArray(), function(cafe) {
                let cafeLowerCased = cafe.name.toLowerCase();
                let result = (cafeLowerCased.search(filteredLowerCased) >= 0);
                cafe.show(result);
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