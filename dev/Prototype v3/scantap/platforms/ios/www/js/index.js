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

var ready;
//var okBox=document.getElementById(ok);

function scanForCodes() {
    ready= false;
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            process(result.text);
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
    wait();
}

function wait() {
    if(!ready) setTimeout(wait,1000);
    else setTimeout(scanForCodes,5000);
}


function process(str) {
    var words= str.split(" ");
    var uid= words[0];
    var nguests= words[1];
    var time= words[2]; 
    var hmac= words[3];
    //setText('ok','okay?');
    var ok= validate(uid, nguests,time,hmac);
    if(ok) {
        testAndDeduct();
        setOkBoxText("GO.<br /> TAP validated for "+nguests+" guests.");
        setOkBoxColor('white','green');
    }
    else {
        setOkBoxText("INVALID QR.");
        setOkBoxColor('white','red');
    }
    ready= true;
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

function setOkBoxText(text) {
    document.getElementById('ok').innerHTML=text;
}
function setOkBoxColor(color,backgroundColor) {
    document.getElementById('ok').style.color=color;
    document.getElementById('ok').style.backgroundColor=backgroundColor;
}

function testAndDeduct() {
    var uid= 9;
    var nguests=0;
    var cost= 1.5*(nguests+1);
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/validateDeductBalance.php',
        data: {
            userid: uid,
            cost: cost
        },
        success: function(data) {
            var validateTAP=$.parseJSON(data);
            alert('No worries, mate?');
            alert(validateTAP);
        },
        error: function(data, textStatus) {
            alert(data+'xx'+textStatus);
        },
        timeout:5000
    });
}


