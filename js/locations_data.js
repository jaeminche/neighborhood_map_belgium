// Set your target city's lat & lng;
// mine is Leuven, Belgium.
let targetCity = {
    lat: 50.879844,
    lng: 4.700518
};

/*
// Set your variable 'query' for the category you are searching for;
// mine is cafe : I will be searching for cafes in Leuven
let locationsDataList;

const query = "cafe";

let foursquareURL4Data = "https://api.foursquare.com/v2/venues/search?ll=50.879844,4.700518&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20180316&limit=6&query=" + query;

let Location = function(data) {
	this.name = data.name;
	this.lat = data.location.lat;
	this.lng = data.location.lng;
};

// Gets the locations data from foursquare and store them into 'locationsData' object.
$.getJSON(foursquareURL4Data).done(function(data) {
    let rawData = data.response.venues;
    locationsData = rawData.map(item => new Location(item));
    locationsDataList = locationsData;
}).fail(function() {
    alert(
        'There was an error while retrieving locations data from the Foursquare API. Please refresh the page.'
    );
});

*/


 // * locationsData object should be returned as follows
var defaultData = [
    {
        name: 'Café AperO',
        lat: 50.87870956051208,
        lng: 4.6997129917144775
    },
    {
        name: 'Café Leffe',
        lat: 50.87951475536544,
        lng: 4.704769586138911
    },
    {
        name: 'Café Manger',
        lat: 50.87758819233503,
        lng: 4.698814150573704
    },
    {
        name: 'RCafé Allee',
        lat: 50.878118916956005,
        lng: 4.699128270149231
    },
    {
        name: 'Café Belge',
        lat: 50.87788924795397,
        lng: 4.699106205763358
    },
    {
        name: 'L Café',
        lat: 50.877965354214204,
        lng: 4.6993590693991925
    },
    {
        name: 'Mont Café',
        lat: 50.877354523232526,
        lng: 4.704103241221817
    },
    {
        name: 'Café Alegria',
        lat: 50.87774018045527,
        lng: 4.69912992374785
    },
    {
        name: 'Rock Café',
        lat: 50.8777771910538,
        lng: 4.699091360777742
    },
    {
        name: 'Café In Den Ouden Tijd',
        lat: 50.881764686568104,
        lng: 4.714513956648781
    }
];
