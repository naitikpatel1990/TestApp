/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    map: '',
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
    mapView: function() {
        let list = document.getElementById("list");
        list.style.display = "none";
        let map = document.getElementById("map");
        map.style.display = "block";
    },

    listView: function() {
        let map = document.getElementById("map");
        map.style.display = "none";
        let list = document.getElementById("list");
        list.style.display = "block";
    },
    initMap: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.294958, lng: -92.492359 },
            zoom: 4
        });
        this.loadMarkers(this.map);
    },
    locationArr: [],
    loadMarkers: function(map) {
        self = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(res) {
            if (this.readyState == 4 && this.status == 200) {
                self.locationArr = JSON.parse(res.target.responseText).locations;
                const locations = self.locationArr;

                locations.forEach(function(location) {
                    let marked = {
                        lat: parseFloat(parseFloat(location.latitude).toFixed(6)),
                        lng: parseFloat(parseFloat(location.longitude).toFixed(6)),
                    };
                    let marker = new google.maps.Marker({
                        position: marked,
                        map: self.map,
                        title: location.name
                    });
                });
            }
        };
        xhttp.open("GET", "https://my-json-server.typicode.com/naitikpatel1990/TestApp/db", true);
        xhttp.send();
    }

};

window.onload = function() {
    let list = document.getElementById("list");
    list ? list.style.display = "none" : '';
    let map = document.getElementById("map");
    map ? map.style.display = "block" : '';
}
app.initialize();