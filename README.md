# Neighborhood Map : Cafes in Leuven, Belgium

*** 
Search for some cafés in Leuven, Belgium, and you will be provided with some basic information through Foursquare database!
***
(This is the final project of Udacity's [Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001))
This app is to demonstrate my abilities to... 
1. interact with API servers, (`Google Map API`)
2. use third-party libraries and APIs, (`Knockout Js`, `Foursquare API`)
3. implement asynchronous programming.

## GETTING STARTED

##### * Local 
***
##  ! Important : For REVIEWERS and contributors,
## SET your own CLIENT_ID and CLIENT_SECRET for Foursquare API call:
- (I've concealed mine for a security reason. **Please follow the instructions below:** I'd appreciate it!)

1. Go to [Foursquare Developers] (https://developer.foursquare.com/).
2. Create an account to get your client ID and Secret, the two of which we need in the next step.
3. Open config_for_reviewer.js file.
4. Replace the two 'placeholder's for CLIENT_ID and CLIENT_SECRET variables with your own.
5. You are ready! Open index.html.
- ***Then, here are some tips along with your reviewing process :***
1. Click markers or list items to select a location and retrieve info.
2. Type in the search box to filter the shown locations.
3. Click the toggle key on top right to collapse or expand the list.
4. Clicking and typing in the search box keeps the list always open.

##### * Online (to be accessible)
Point your browser to https://jaeminche.github.io/build_portfolio_site/projects_copy/neighborhoodmap/index.html

## BUILT WITH :
* `Knockout JS`,
* `Google Maps API`,
* `Foursquare API`,
* `Bootstrap`,
* `jQuery`,
* Asynchronous programming.


## NOTABLE FEATURES
* #### Locations FILTERING: 
    As an user types a word in the search box, it filters the map markers and list items to locations matching the text input.
* #### LIST VIEW:
    A list-view of location(cafe) names is provided in the dropdown menu which displays all locations by default, and displays the filtered subset of locations when a filter is applied. 
    Clicking a location on the list displays its contact and address information and photo image fetched by asynchronous Foursquare API call, and animates its associated map marker(bouncing).
* #### MAP and MARKERS:
    Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
    Clicking a marker fetches its contact and address information and photo image through asynchronous Foursquare API call, and displays them in an infoWindow. (One infoWindow at a time)
    Markers animate, or bounce, when clicked.
* #### ASYNCHRONOUS API REQUESTS:
    Application utilizes the Google Maps API and Foursquare API.
    All data requests are retrieved in an asynchronous manner.
* #### ERROR HANDLING:
    Data requests that fail are handled gracefully using AJAX fail method, popping up an alert box. 
* #### Proudly architected with proper use of `KNOCKOUT.JS`:
    Code is properly separated based upon Knockout practices, following an MVVM pattern, avoiding updating the DOM manually with jQuery or JS, using observables rather than forcing refreshes manually).

## Resources Used:
* StackOverflow
* Knockout JS Documentation & Tutorials
* Google Maps API Documentation
* Foursquare API Documentation
* Bootstrap 4.0 Documentation