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
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);

        scanForCodes();

        //alert("finish");
    }
};

function scanForCodes() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            process(result.text);
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}

function process(str) {
    var words= str.split(" ");
    var uid= words[0];
    var nguests= words[1];
    var time= words[2]; 
    var hmac= words[3];
    setText('ok','okay?');
    var ok= validate(uid, nguests,time,hmac);
    setText('ok',(ok?'yes':'no'));
    
}

function validate(uid, nguests,time,hmac) {
    if(!validateTime(time)){
        return false;
    }

    if(!validateHMAC(uid,nguests,time,hmac)) {
        return false;
    }
    return true;
}

function validateTime(time) {
    var cutoff= 5*60*1000;
    now= new Date().getTime();
    diff= now-time;
    // var okay= diff<cutoff;
    // setText('age',''+diff+(diff?'okay':'no'));
    return(diff<cutoff);
}

function validateHMAC(uid,nguests,time,hash) {
    var toHash= uid+nguests+time;
    var passphrase= "1337password";
    return(hash == CryptoJS.HmacSHA1(toHash, passphrase));
}

function confirmTAP(uid) {
    alert("Confirm user "+uid);
}

function setText(id,text) {
    document.getElementById(id).innerHTML=text;
}
