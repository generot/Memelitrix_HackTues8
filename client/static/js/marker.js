const Marker = function(latitude, longitude){
        this.lon = longitude
        this.lat = latitude
}

//drawing a marker on the map
function placeMarker(map, marker){

    var marker = new tt.Marker({
        dragable : true
    })

    .setLngLat([marker.lon, marker.lat])
    .addTo(map)

    return marker
}
