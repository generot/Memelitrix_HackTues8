function drawRoute(map, geoJSON, index = -1){

    layer = map.addLayer({
        'id' : (index === -1) ? 'route' : 'route_' + index,
        'type' : 'line',
        'source' : {
            'type' : 'geojson',
            'data' : geoJSON
        },
        'paint' : {
            'line-color' : 'darkred',
            'line-width' : 7
        }
    })
}

function makeRoute(map, from, to, index = -1){        
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
                drawRoute(map, geo, index)
            }
        )
}

function makeTaskRoute(map, Tasks){
        // for(let i = 1; i < Tasks.length; i++)
        //     if (map.getLayer("route_" + i)) {
        //         map.removeLayer("route_" + i);
        //         map.removeSource("route_" + i);
        //     }

        let from = Tasks[0];
        from.addTo(map);

        for(let index = 1; index < Tasks.length; index++){
            Tasks[index].addTo(map);
            makeRoute(map, from, Tasks[index], index);
            from = Tasks[index];
        }
}