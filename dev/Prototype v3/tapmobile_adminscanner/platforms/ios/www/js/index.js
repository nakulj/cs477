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
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        // Start the scanner.
        app.scan();
    },
    scan: function () {
      alert("scan");
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert(result.text);
                process(result.text);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }
};

function process(str) {
  words= str.split(" ");
  uid= words[0];
  nguests= words[1];
  time= words[2];
  hmac= words[3];

  if(!validateTime(time))
    alert("QR too old");
  if(!validateHMAC(uid,nguests,time,hash))
    alert("Invalid QR");

  confirmTAP(uid);
}

function validateTime(time) {
  var cutoff= 5*60*1000;
  now= new Date().getTime();
  diff= now-time;
  return(diff<cutoff);
}

function validateHash(uid,nguests,time,hash) {
  toHash= uid+nguests+time;
  var passphrase= "1337password";
  return(hash == CryptoJS.HmacSHA1(toHash, passphrase));
}

function confirmTAP(uid) {
  alert("Confirm user "+uid);
}
