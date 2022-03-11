var map
//get user location

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

//pishka function - very important(dosta kur indeed)
function pishka() {

    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(clb => {
            resolve(clb.coords);
        })

    });
}

//initializing map

async function initMap(){

    let coords = await pishka()
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
}

initMap()