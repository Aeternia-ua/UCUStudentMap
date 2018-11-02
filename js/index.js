var markers;
var marker;
var gmarkers = [];
var map;
var markerCluster;

function initMap() {
    var infowindow = new google.maps.InfoWindow({
    });
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    zoom: 3,
    maxZoom: 15,
    center: new google.maps.LatLng(48.3794, 31.1656), // Ukraine
    mapTypeId: 'terrain',
    streetViewControl: false,
    mapTypeControl: false,
    // How you would like to style the map. 
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{
        "featureType": "water",
        "stylers": [{
          "color": "#19a0d8"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "weight": 6
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#e85113"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#efe9e4"
          },
          {
            "lightness": -40
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#efe9e4"
          },
          {
            "lightness": -20
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "lightness": 100
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "lightness": -100
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.icon"
      },
      {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
            "lightness": 20
          },
          {
            "color": "#efe9e4"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "lightness": 100
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "lightness": -100
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "hue": "#11ff00"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "lightness": 100
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "hue": "#4cff00"
          },
          {
            "saturation": 58
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#f0e4d3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#efe9e4"
          },
          {
            "lightness": -25
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#efe9e4"
          },
          {
            "lightness": -10
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "simplified"
        }]
      }
    ]
  }
  map = new google.maps.Map(mapCanvas, mapOptions);
  ///Single marker custom icon
  var customIcon = {
    url: 'https://raw.githubusercontent.com/Aeternia-ua/UCU-students-map/master/img/icon-red.png',
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  }
  map.data.loadGeoJson('https://raw.githubusercontent.com/Aeternia-ua/UCU-students-map/master/ucu-students-by-year-fixed.geojson', null, function(features) {
    var markers = features.map(function(feature, i) {
     var marker = new google.maps.Marker({
        position: feature.getGeometry().get(0),
        icon: customIcon,
        //Creating custom property to filter markers
        year: feature.getProperty('Grupa'),
        animation: google.maps.Animation.DROP
      });
      gmarkers.push(marker);
      
      //Adding infowindow listener to the marker
     marker.addListener('click', function() { 
     var content = feature.getProperty('Grupa') + '<br>';
  content += '<b>' + 'Факультет: ' + feature.getProperty('Facultet') + '</b><br>';
  content += '<span style="font-style: italic;">Спеціальність: ' + feature.getProperty('Specialnist') + '</span><br>';
       content += '<span style="font-style: italic;">Освітня програма: ' + feature.getProperty('Osvitnia Programa') + '</span><br>';
       content += '<span style="font-style: italic;">Населений пункт: ' + feature.getProperty('MistoSelo') + ', ' + feature.getProperty('Rayon') + ' ' + feature.getProperty('Oblast') +'</span><br>';
       infowindow.setContent(content);
      infowindow.open(map, marker);
    });
      return marker;
});
    
    ///Marker Clustering
    markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
    console.log(gmarkers[44].year);
  });
  map.data.setMap(null);
} //initMap function ends

// Function to filter markers by category
var filterMarkers = function(category) {
  console.log("category=" + category);
  var newmarkers = [];
  var studNumber = 0;
  switch (category) {
    case "2014":
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If is same category or category not picked
        if (marker.year == "2014(заоч)") {
          marker.setVisible(true);
          newmarkers.push(marker);
          studNumber = studNumber + 1;
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
      break;
    case "2015":
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If is same category or category not picked
        if (marker.year == "2015") {
          marker.setVisible(true);
          newmarkers.push(marker);
          studNumber = studNumber + 1;
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
      break;
    case "2016":
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If is same category or category not picked
        if (marker.year == "2016") {
          marker.setVisible(true);
          newmarkers.push(marker);
          studNumber = studNumber + 1;
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
      break;
    case "2017":
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If is same category or category not picked
        if (marker.year == "2017") {
          marker.setVisible(true);
          newmarkers.push(marker);
          studNumber = studNumber + 1;
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
      break;
    case "2018":
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If is same category or category not picked
        if (marker.year == "2018") {
          marker.setVisible(true);
          newmarkers.push(marker);
          studNumber = studNumber + 1;
        }
        // Categories don't match 
        else {
          marker.setVisible(false);
        }
      }
      break;
    default:
      for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        marker.setVisible(true);
        newmarkers.push(marker);
        studNumber = studNumber + 1;
      }
  }
  console.log("Всього студентів - " + studNumber);
  //Output students number into HTML div
  document.getElementById("studnumber").innerHTML="Усього студентів: " + studNumber;
  markerCluster.clearMarkers();
  markerCluster.addMarkers(newmarkers);
}
function closeInfoWindow() {
  infowindow.close();
}
function SetBounds() {
  // try to adjust the view point of the map to include all markers
  var bounds = new google.maps.LatLngBounds();

  map.data.forEach(function(feature) {
    var point = feature.getGeometry().get();
    bounds.extend(point);
    return false;
  });

  map.setCenter(bounds.getCenter());
  map.fitBounds(bounds);
  map.setZoom(map.getZoom() + 1);
}

google.maps.event.addDomListener(window, 'load', initMap);