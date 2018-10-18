function initialize() {
	var myOptions = {
		zoom: 14,
		center: new google.maps.LatLng(40.773938, -74.164175), //coords
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false,
		styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
		}

	var img_icon = 'img/map-marker.png'
	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

	var marker = new google.maps.Marker({
		map: map,
		icon: img_icon,
		position: new google.maps.LatLng(40.773938, -74.164175) //coords
	});

	var marker2 = new google.maps.Marker({
		map: map,
		icon: img_icon,
		position: new google.maps.LatLng(40.779590, -74.162750) //coords
	});

	google.maps.event.addListener(marker, "click", function() {
		map.setZoom(15);
		map.setCenter(marker.getPosition());
	});

	google.maps.event.addListener(marker2, "click", function() {
		map.setZoom(15);
		map.setCenter(marker2.getPosition());
	});
}
google.maps.event.addDomListener(window, 'load', initialize);
