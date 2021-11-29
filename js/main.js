let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 35.7596, lng: -79.0193 },
//     zoom: 10,
//     styles: [
//       { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
//       { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
//       { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
//       {
//         featureType: "administrative.locality",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "geometry",
//         stylers: [{ color: "#263c3f" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#6b9a76" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry",
//         stylers: [{ color: "#38414e" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry.stroke",
//         stylers: [{ color: "#212a37" }],
//       },
//       {
//         featureType: "road",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9ca5b3" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry",
//         stylers: [{ color: "#746855" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry.stroke",
//         stylers: [{ color: "#1f2835" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#f3d19c" }],
//       },
//       {
//         featureType: "transit",
//         elementType: "geometry",
//         stylers: [{ color: "#2f3948" }],
//       },
//       {
//         featureType: "transit.station",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [{ color: "#17263c" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#515c6d" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.stroke",
//         stylers: [{ color: "#17263c" }],
//       },
//     ],
//   });
// }

//   var service = new google.maps.places.PlacesService(map);

//   service.findPlaceFromQuery(request, function(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//     }

//     map.setCenter(results[0].geometry.location);
//     }
//   });
//   }
// var positionToStarbucksLatlng = function(position) {
//     return position.coords.latitude + ',' + position.coords.longitude;
//   };

//   var positionToGoogleLatLng = function(position) {
//     return new google.maps.LatLng(
//       position.coords.latitude,
//       position.coords.longitude
//     );
//   };

//   var storeToGoogleLatLng = function(store) {
//     return new google.maps.LatLng(
//       store.store.coordinates.latitude,
//       store.store.coordinates.longitude
//     );
//   };

//   var drawStoresMap = function(position, storesData) {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: positionToGoogleLatLng(position),
//       zoom: 12
//     });

//     for (var i = 0; i < storesData.stores.length; i++) {
//       drawMarker(map, storesData.stores[i]);
//     }
//   };

//   var drawMarker = function(map, store) {
//     var marker = new google.maps.Marker({
//       map: map,
//       position: storeToGoogleLatLng(store),
//       title: store.store.name
//     });
//   };

//   $(document).ready(function() {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       $.ajax({
//         url: 'https://testhost.openapi.starbucks.com/location/v2/stores/nearby',
//         headers: {
//           'Accept': 'application/json'
//         },
//         data: {
//           radius: 10,
//           latlng: positionToStarbucksLatlng(position)
//         },
//         success: function(storesData) {
//           drawStoresMap(position, storesData);
//         }
//       });
//     });
//   };
// let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7.5,
    center: new google.maps.LatLng(35.7596, -79.0193),
    mapTypeId: "terrain",
  });

//   map.data.loadGeoJson('../data/starbucks.json');

  fetch('../data/starbucks.json')
    .then((res) => res.json())
    .then((json) => {
        json.forEach((element) => {
            let lat = element["Latitude"]
            let lon = element["Longitude"]
            let latLng = new google.maps.LatLng(lat, lon)

            var icon = {
                url: "../assets/mapmarker.png",
                scaledSize: new google.maps.Size(20, 20),
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
            if (element["State/Province"] === "NC") {
                const marker = new google.maps.Marker({
                    position: latLng,
                    icon: icon,
                    map: map,
                });
                const infowindow = new google.maps.InfoWindow({
                content:
                '<div id="tooltip">' +
                '<h4>' + element["Store Name"] + '</h4>' +
                '<p>' + element["Street Address"] + '</p>' +
                '<p>' + element["City"] + ', ' + element["State/Province"] + '</p>' +
                '<a href="#"><i class="fas fa-info-circle"></i> More Info</a>' +
                '</div>'
                ,
                });
                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                });
              });
              makeList(element)
            }
            
        })
    })
}

function makeList(element) {
    var listContent =  
        '<h3>' + element["Store Name"] + '</h3>' +
        '<p>' + element["Street Address"] + '</p>' +
        '<p>' + element["City"] + ', ' + element["State/Province"] + '</p>' +
        '<a href="#"><i class="fas fa-info-circle"></i> More Info</a>';
    var ul = document.getElementById("locations");
    var li = document.createElement("li");
    li.innerHTML = listContent;
    ul.appendChild(li);
    console.log(ul);
  }

// Loop through the results array and place a marker for each
// set of coordinates.
// const eqfeed_callback = function (results) {
//   for (let i = 0; i < results.features.length; i++) {
//     const coords = results.features[i].geometry.coordinates;
//     const latLng = new google.maps.LatLng(coords[1], coords[0]);

//     new google.maps.Marker({
//       position: latLng,
//       map: map,
//     });
//   }
// };