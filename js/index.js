var markers;
var marker;
var gmarkers = [];
var map;
var markerCluster;
var studNumber = 0;

function initMap() {
    var infowindow = new google.maps.InfoWindow({});
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        center: new google.maps.LatLng(49.3994, 31.1656), // Ukraine
        streetViewControl: false,
        mapTypeControl: false,
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5d7e9e"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "2.55"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "2.54"
            },
            {
                "gamma": "1.33"
            },
            {
                "lightness": "0"
            },
            {
                "saturation": "100"
            },
            {
                "hue": "#ff4a00"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e85113"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "5.83"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "1.69"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": "20"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f0e4d3"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#4cff00"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#f4a8a8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f4f4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-43"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#19a0d8"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-84"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#100a0a"
            }
        ]
    }
]

    }
    map = new google.maps.Map(mapCanvas, mapOptions, SetBounds);
    ///Single marker custom icon
    var customIcon = {
        url: 'https://raw.githubusercontent.com/Aeternia-ua/UCUStudentMap/master/img/icon-red.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }
    map.data.loadGeoJson('https://raw.githubusercontent.com/Aeternia-ua/UCUStudentMap/master/ucu-students-by-year-fixed.geojson', null, function(features) {
        var markers = features.map(function(feature, i) {
            var marker = new google.maps.Marker({
                position: feature.getGeometry().get(0),
                icon: customIcon,
                //Creating custom property to filter markers
                category: feature.getProperty('Grupa') + ', ' + feature.getProperty('Specialnist'),
                animation: google.maps.Animation.DROP
            });
            gmarkers.push(marker);
            studNumber = studNumber + 1;
            document.getElementById("studnumber").innerHTML = "Кількість студентів: " + studNumber;

            //Adding infowindow listener to the marker
            marker.addListener('click', function() {
                var content = feature.getProperty('Grupa') + '<br>';
                content += '<b>' + 'Факультет: ' + feature.getProperty('Facultet') + '</b><br>';
                content += '<span style="font-style: italic;">Спеціальність: ' + feature.getProperty('Specialnist') + '</span><br>';
                content += '<span style="font-style: italic;">Освітня програма: ' + feature.getProperty('Osvitnia Programa') + '</span><br>';
                content += '<span style="font-style: italic;">Населений пункт: ' + feature.getProperty('MistoSelo') + ', ' + feature.getProperty('Rayon') + ' ' + feature.getProperty('Oblast') + '</span><br>';
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
            return marker;
        });
        ///Marker Clustering
        markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    });
    map.data.setMap(null);
} //initMap function ends

// Function to filter markers by combined categories
function clickBox() {
    // Create the initial group selection
    var checked = [];
    var newmarkers = [];
    var studNumber = 0;
    // Generate the recursive array item from each groups elements
    jQuery('.year:checkbox:checked').each(function() {
        var year = jQuery(this).val();

        jQuery('.spec:selected').each(function() {
            var spec = jQuery(this).val();
            // Construct final combination array same as gmap category value
            checked.push(year + ', ' + spec);
        });
    });

    // Apply the visibility set to markers
    for (i = 0; i < gmarkers.length; i++) {
        marker = gmarkers[i];
        // If marker in category of array, show it
        if (jQuery.inArray(marker.category, checked) !== -1) {
            gmarkers[i].setVisible(true);
            newmarkers.push(marker);
            studNumber = studNumber + 1;
        } else {
            gmarkers[i].setVisible(false);
        }
    }
    markerCluster.clearMarkers();
    markerCluster.addMarkers(newmarkers);
    document.getElementById("studnumber").innerHTML = "Кількість студентів: " + studNumber;
}
//Custom Select All and Deselect All text for Bootstrap select
$('.selectpicker').selectpicker({
    selectAllText: 'Обрати всі',
    deselectAllText: 'Очистити вибір'
});

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
