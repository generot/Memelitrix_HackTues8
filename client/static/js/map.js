//get user location
var userCoords
var options = {     
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    return [crd.latitude, crd.longtitude];
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//map render
tt.setProductInfo('myMap', '1');


function getCoords() {

    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(clb => {
            resolve(clb.coords);
        })

    });
}

//initializing map

async function initMap(Markers){

    let coords = await getCoords()
    var long = coords.longitude
    var lat = coords.latitude

    map = tt.map({

            key: '8tSnq5o8nrZgIPZ5S9uTAH9tXReLKote',
            container: 'map',
            zoom : 15,
            center : new tt.LngLat (long, lat),
            maxZoom : 50

        });

        map.addControl(new tt.NavigationControl());
        map.addControl(new tt.GeolocateControl({

        positionOptions: {
            enableHighAccuracy: true
        },

        trackUserLocation: true,
        showAccuracyCircle : false

    }));

    if(Markers)
        for(let index = 0; index < Markers.length; index++){
            placeMarker(map, Markers[index])
        }

    var from = new tt.Marker({
            dragable : false
    })
    .setLngLat([long, lat])
    .addTo(map)

    var to = new tt.Marker({
        dragable : false
    })
    .setLngLat([long - 0.01, lat - 0.01])
    .addTo(map)

    makeRoute(map, from, to)

    userCoords = coords
    console.log("user coords : " + userCoords.longitude + "," + userCoords.latitude)


}

initMap(null);