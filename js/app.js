let map;
function ViewModel() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: targetCity,
        zoom: 14.5
    });
}




function startApp() {
    ko.applyBindings(new ViewModel());
}