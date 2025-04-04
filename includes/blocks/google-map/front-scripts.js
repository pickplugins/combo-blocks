export function setupGoogleMap() {
	document.addEventListener("DOMContentLoaded", function (event) {
		// To assign event
		var mapLayersWraps = document.querySelectorAll("[data-map-layers]");


		async function loadMap(mapSettings, markers, polylineSets, polygonSets, circles, markerInfoWindows, rectangles) {

			var mapId = mapSettings.mapId;
			var zoom = parseInt(mapSettings.zoom);
			var zoomControl = mapSettings.zoomControl;
			var minZoom = mapSettings.minZoom;
			var maxZoom = mapSettings.maxZoom;
			var centerLat = parseFloat(mapSettings.lat);
			var centerLng = parseFloat(mapSettings.lng);
			var mapTypeId = mapSettings.mapTypeId;
			var colorScheme = mapSettings.colorScheme;
			var streetViewControl = mapSettings.streetViewControl;
			var markerType = mapSettings.markerType;

			const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

			var map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: centerLat, lng: centerLng },
				zoom: zoom,
				mapId: mapId,
			});




			markers.forEach(markersX => {
				const marker = new AdvancedMarkerElement({
					map,
					position: { lat: parseFloat(markersX.lat), lng: parseFloat(markersX.lng) },
					title: markersX.title
				});
				// new google.maps.Marker({
				// 	position: { lat: parseFloat(markersX.lat), lng: parseFloat(markersX.lng) },
				// 	map: map,
				// 	title: markersX.title
				// });
			});
			polylineSets.forEach(polylineSet => {


				const polyline = new google.maps.Polyline({
					path: polylineSet, // Set the path
					geodesic: true, // Makes the line curved as on a sphere
					strokeColor: "#FF0000", // Line color
					strokeOpacity: 1.0, // Line opacity
					strokeWeight: 2 // Line thickness
				});

				// Add the polyline to the map
				polyline.setMap(map);
			});
			polygonSets.forEach(polygonSet => {


				const polygon = new google.maps.Polygon({
					paths: polygonSet, // Set the path
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
				});

				// Add the polyline to the map
				polygon.setMap(map);
			});








			circles.forEach(circle => {


				// Add the circle for this city to the map.
				const cityCircle = new google.maps.Circle({
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
					map,
					center: circle.center,
					radius: Math.sqrt(circle.radius) * 100,
				});


			});


			let activeInfoWindow = null;


			markerInfoWindows.forEach(location => {
				// Create marker
				const marker = new google.maps.Marker({
					position: { lat: location.lat, lng: location.lng },
					map: map,
					title: location.title
				});

				// Create InfoWindow
				const infoWindow = new google.maps.InfoWindow({
					content: `<h3>${location.title}</h3><p>${location.description}</p>`
				});

				// Add click event to open InfoWindow
				marker.addListener("click", () => {
					infoWindow.open(map, marker);
				});
			});


			rectangles.forEach(rectangleData => {


				// Create a rectangle
				const rectangle = new google.maps.Rectangle({
					bounds: rectangleData.bounds,
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
					map: map
				});

				// Create an InfoWindow
				const infoWindow = new google.maps.InfoWindow({
					content: `<h3>${location.title}</h3><p>${location.description}</p>`
				});

				// Add click listener to open InfoWindow
				rectangle.addListener("click", (event) => {
					if (activeInfoWindow) {
						activeInfoWindow.close();
					}
					infoWindow.setPosition(event.latLng); // Set position to click location
					infoWindow.open(map);
					activeInfoWindow = infoWindow;
				});
			});



		}



		if (mapLayersWraps != null) {
			var markers = [];
			var polylineSets = [];
			var polygonSets = [];
			var circles = [];
			var markerInfoWindows = [];
			var rectangles = [];


			mapLayersWraps.forEach(item => {
				var mapLayers = item.getAttribute("data-map-layers");
				var mapSettings = item.getAttribute("data-map-settings");
				var wrapId = item.getAttribute("id");

				var mapLayersObj = JSON.parse(mapLayers);
				var mapSettingsObj = JSON.parse(mapSettings);
				var mapWrap = document.getElementById('#' + wrapId + " #map");


				mapLayersObj.map((layer, layerIndex) => {

					var id = layer.id;
					var label = layer.label;
					var collections = layer.collections;

					if (id == "marker") {
						collections.map(collection => {
							var lat = parseFloat(collection.lat)
							var lng = parseFloat(collection.lng)
							markers.push({ lat: lat, lng: lng })
						})
					}
					if (id == "rectangle") {
						collections.map(collection => {
							console.log(collection);

							var bounds = (collection.bounds)
							var description = (collection.description)
							var title = (collection.title)



							rectangles.push({ bounds: bounds, title: title, description: description })
						})
					}




					if (id == "markerInfoWindow") {
						collections.map(collection => {
							var lat = parseFloat(collection.lat)
							var lng = parseFloat(collection.lng)
							var description = (collection.description)
							var title = (collection.title)


							markerInfoWindows.push({ lat: lat, lng: lng, title: title, description: description })
						})
					}



					if (id == "polyline") {
						collections.map(collection => {


							var lat = parseFloat(collection.lat)
							var lng = parseFloat(collection.lng)
							if (polylineSets[layerIndex] == undefined) {
								polylineSets[layerIndex] = []
							}

							polylineSets[layerIndex].push({ lat: lat, lng: lng })
						})
					}
					if (id == "polygon") {
						collections.map(collection => {


							var lat = parseFloat(collection.lat)
							var lng = parseFloat(collection.lng)
							if (polygonSets[layerIndex] == undefined) {
								polygonSets[layerIndex] = []
							}

							polygonSets[layerIndex].push({ lat: lat, lng: lng })
						})
					}



					if (id == "circle") {
						collections.map(collection => {


							var lat = parseFloat(collection.center.lat)
							var lng = parseFloat(collection.center.lng)
							var radius = parseFloat(collection.radius)
							var strokeColor = (collection.strokeColor)
							var strokeOpacity = (collection.strokeOpacity)
							var strokeWeight = (collection.strokeWeight)
							var fillColor = (collection.fillColor)
							var fillOpacity = (collection.fillOpacity)
							var center = { lat: lat, lng: lng }


							circles.push({ center: center, radius: radius })


						})
					}






				})

				console.log(rectangles);


				loadMap(mapSettingsObj, markers, polylineSets, polygonSets, circles, markerInfoWindows, rectangles);

			})



		}





	});
}