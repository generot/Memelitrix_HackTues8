function drawRoute(map, geoJSON){
    layer = map.addLayer({
        'id' : 'route',
        'type' : 'line',
        'source' : {
            'type' : 'geojson',
            'data' : geoJSON
        },
        'paint' : {
            'line-color' : 'green',
            'line-width' : 7
        }
    })
}

function makeRoute(map, from, to){        
        //options and coordinates to draw to
        var options = {
            key : '8tSnq5o8nrZgIPZ5S9uTAH9tXReLKote',
            locations : []
        }

        options.locations.push(from.getLngLat())
        options.locations.push(to.getLngLat())

        tt.services.calculateRoute(options)

        .then(
            function(routeData){
                var geo = routeData.toGeoJson();
                drawRoute(map, geo)
            }
        )
}