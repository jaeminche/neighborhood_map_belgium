// Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

let map;


function ViewModel() {

    var marker = new google.maps.Marker({
        position: {lat: locationsData[i].lat, lng: locationsData[i].lng},
        map: map
    });
}




function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: targetCity,
        zoom: 14.5
    });
    ko.applyBindings(new ViewModel());
}