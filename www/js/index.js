// App object
var app = {
    // map properties to store instance of map
    map: '',
    // Device ready events
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Mapview functions which was required for S2
    mapView: function() {
        let list = document.getElementById("list");
        list.style.display = "none";
        let map = document.getElementById("map");
        map.style.display = "block";
    },
    // Listview functions which was required for S2
    listView: function() {
        let map = document.getElementById("map");
        map.style.display = "none";
        let list = document.getElementById("list");
        list.style.display = "block";
    },
    // Google map one time initialization for an intance of it
    initMap: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.294958, lng: -92.492359 },
            zoom: 4
        });
        this.loadMarkers(this.map);
    },
    // Location array for storing locations
    locationArr: [],
    // Main api call to retrive dependet data
    loadMarkers: function(map) {
        self = this;
        // Ajax instance
        const xhttp = new XMLHttpRequest();
        // State events
        xhttp.onreadystatechange = function(res) {
            if (this.readyState == 4 && this.status == 200) {
                self.locationArr = JSON.parse(res.target.responseText).locations;
                const locations = self.locationArr;
                // Iteration of self.locationArr to fetch locations to mark
                locations.forEach(function(location, id) {
                    let index = id + 1;
                    let marked = {
                        lat: parseFloat(parseFloat(location.latitude).toFixed(6)),
                        lng: parseFloat(parseFloat(location.longitude).toFixed(6)),
                    };
                    let marker = new google.maps.Marker({
                        position: marked,
                        map: self.map,
                        title: location.name
                    });
                    //list display code
                    let listobj = document.getElementById("list-location");
                    listobj.innerHTML += '<li class="list-group-item"> ' + index + ')\t' + location.name + ' </li>';
                });
            }
        };
        xhttp.open("GET", "https://my-json-server.typicode.com/naitikpatel1990/TestApp/db", true);
        xhttp.send();
    }

};
// Onload function which was required in S2
window.onload = function() {
    let list = document.getElementById("list");
    list ? list.style.display = "none" : '';
    let map = document.getElementById("map");
    map ? map.style.display = "block" : '';
}
// main app object initialization
app.initialize();