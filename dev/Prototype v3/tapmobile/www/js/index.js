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
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("online", app.onOnline, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("backbutton", app.onBackKeyDown, false);
    },

    onBackKeyDown: function() {
        if ($.mobile.activePage.attr('id') == "log-in") { // Exit app if on log-in screen.
            navigator.app.exitApp();
        } else if ($.mobile.activePage.attr('id') == "home") { // Handle special home screen cases.
            handleHomeScreenBackBtn();
        } else { // Default "go back"
            navigator.app.backHistory();
        }
    },

    onOnline: function() {
        $.unblockUI();
    },

    /* Connection error timeout message */
    onOffline: function() {
        $.blockUI({
            message: '<img src="css/images/ajax-loader.gif" />Establishing internet connection...',
            css: {
                width: '75%',
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    }
};

$(function() {
    /* Attach FastClick to the buttons on the page when it's initialized. */
    FastClick.attach(document.body);

    /***** PLACEHOLDER CODE *******/
    
    // Hardcoded Metro Expo Line
    var metroExpoLineStations = [];

    metroExpoLineStations[0] = new TransitStation(1, "7th St/Metro Center", "Metro Expo Line", new google.maps.LatLng(34.0497597, -118.2594994), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[1] = new TransitStation(2, "Pico", "Metro Expo Line", new google.maps.LatLng(34.0407045, -118.2661995), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[2] = new TransitStation(3, "Jefferson/USC", "Metro Expo Line", new google.maps.LatLng(34.0229463, -118.2776492), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[3] = new TransitStation(4, "Expo Park/USC", "Metro Expo Line", new google.maps.LatLng(34.0183678, -118.284), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[4] = new TransitStation(5, "Expo/Vermont", "Metro Expo Line", new google.maps.LatLng(34.0184147, -118.2927447), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[5] = new TransitStation(6, "23rd St", "Metro Expo Line", new google.maps.LatLng(34.028762, -118.2738277), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[6] = new TransitStation(7, "Expo/Western", "Metro Expo Line", new google.maps.LatLng(34.018471, -118.3083753), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[7] = new TransitStation(8, "Expo/Crenshaw", "Metro Expo Line", new google.maps.LatLng(34.0222831, -118.3333312), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[8] = new TransitStation(9, "Farmdale", "Metro Expo Line", new google.maps.LatLng(34.0236457, -118.3445348), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[9] = new TransitStation(10, "Expo/La Brea", "Metro Expo Line", new google.maps.LatLng(34.0247601, -118.3538159), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[10] = new TransitStation(11, "La Cienega/Jefferson", "Metro Expo Line", new google.maps.LatLng(34.0263983, -118.3701157), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    metroExpoLineStations[11] = new TransitStation(12, "Culver City", "Metro Expo Line", new google.maps.LatLng(34.0280633, -118.3866186), "Santa Monica", "12:43pm", "Los Angeles", "12:49pm");
    
    // Add to DOM.
    setNearestTransitStations(metroExpoLineStations);

    // TODO: Add tickets dynamically to list (to be done by backend later)
    
    // TODO: Back-end
    clearBalanceHistory();
    addBalanceHistoryItem(new BalanceHistoryItem("addfunds", 10.00, "Card ending in xxxx", "11/14/14", "7:46am"));
    addBalanceHistoryItem(new BalanceHistoryItem("purchase", 4.50, "Single Fare", "12/15/14", "11:55am"));
    addBalanceHistoryItem(new BalanceHistoryItem("purchase", 1.50, "Single Fare", "12/15/14", "8:00am"));


    clearPastTaps();
    addPastTap(new PastTapItem("Single Fare", "Culver Station", "12/01/14", "9:15pm", 2));
    addPastTap(new PastTapItem("Single Fare", "Jefferson Station", "12/03/14", "6:10pm", 0));

    clearTicketWallet();
    addTicketWalletItem(new TicketWalletItem(0, true, true, "3-Day Pass", 0, "12/10/14", "7:45pm"));
    addTicketWalletItem(new TicketWalletItem(1, false, false, "5-Day Pass", 1, "", ""));
    addTicketWalletItem(new TicketWalletItem(2, false, false, "Single Fare", 5, "", ""));

    // Hardcoded default balance value
    //setTAPBalance(0.00);

    // Hardcoded front QR caption value
    setFrontQRCaption(new FrontQRCaption("Metro Pass", "3/16/2014", 0));

    /***** PLACEHOLDER CODE *******/


    /* Compile templates (not being used right now, may not ever need it) */

    /* X template */
    //var campaign_source   = $("#campaign-template").html();
    //campaign_template = Handlebars.compile(campaign_source);
});



// ========================================================================================================================
// OBJECT PROTOTYPES
// ========================================================================================================================

/* Define transit line object prototype */
var TransitStation = function(stationId, stationDescription, transitLine, stationLocation, transitDestA, arrivalTimeA, transitDestB, arrivalTimeB) {
    this.stationId = stationId;
    this.stationDescription = stationDescription;
    this.transitLine = transitLine;
    this.stationLocation = stationLocation;
    this.transitDestA = transitDestA;
    this.arrivalTimeA = arrivalTimeA;
    this.transitDestB = transitDestB;
    this.arrivalTimeB = arrivalTimeB;
};

/* Define ticket object prototype */
var AvailableTicket = function(ticketId, ticketName, ticketPrice) {
    this.ticketId = ticketId;
    this.ticketName = ticketName;
    this.ticketPrice = ticketPrice;
};

var FrontQRCaption = function(ticketText, expirationDate, numGuests) {
    this.ticketText = ticketText;
    this.expirationDate = expirationDate;
    this.numGuests = numGuests;
}

var BalanceHistoryItem = function(transactionType, transactionAmount, descriptionText, transactionDate, transactionTime) {
    this.transactionType = transactionType;
    this.transactionAmount = transactionAmount;
    this.descriptionText = descriptionText;
    this.transactionDate = transactionDate;
    this.transactionTime = transactionTime;
}

var PastTapItem = function(ticketText, stationDescription, tapDate, tapTime, numGuests) {
    this.ticketText = ticketText;
    this.stationDescription = stationDescription;
    this.tapDate = tapDate;
    this.tapTime = tapTime;
    this.numGuests = numGuests;
}

var TicketWalletItem = function(ticketId, ticketActivated, ticketSelected, ticketText, ticketsRemaining, expirationDate, expirationTime) {
    this.ticketId = ticketId;
    this.ticketActivated = ticketActivated;
    this.ticketSelected = ticketSelected;
    this.ticketText = ticketText;
    this.ticketsRemaining = ticketsRemaining;
    this.expirationDate = expirationDate;
    this.expirationTime = expirationTime;
}

// ========================================================================================================================
// GLOBAL VARIABLES
// ========================================================================================================================


/* Max number of guests on a single QR scan (this could be capped further depending on the user's account balance) */
var maxGuests = 4;

/* TODO: Make this nil and force back end to let us know the base fare when the app is started. */
var baseFare = 1.50;

/* The current TAP balance as we know it on the front-end. */
var tapBalance = 0.00;

/* If the user has an active ticket this should be set to true. */
var hasActiveTicket = false;

/* Contains the latest GPS location of user.  */
var lastUpdatedPosition = 0;

var userSession;


// ========================================================================================================================
// GLOBAL SETTERS
// ========================================================================================================================

/*
 * Description: Modify the max number of guests allowed on a single QR scan.
 * Input: An integer upper bound for number of guest spots.
 * Output: N/A
 * Error: N/A
 */
function setMaxGuests(newMaxGuests) {
    maxGuests = newMaxGuests;
    console.log("Max guests set to " + newMaxGuests);
}

/*
 * Description: Change the base fare (displayed to user and used to calculate guest pass price)
 * Input: A monetary value
 * Output: N/A
 * Error: N/A
 */
function setBaseFare(newBaseFare) {
    baseFare = newBaseFare;
    console.log("Base fare set to " + newBaseFare);
}

/*
 * Description: Set the displayed TAP balance in top right of header and in Add Funds under balance.
 * Input: An integer or float representing the monetary value of their account balance.
 * Output: N/A
 * Error: N/A
 */
function setTAPBalance(balanceIntValue) {
    tapBalance = parseFloat(balanceIntValue).toFixed(2);
    $(".tap-balance-value").html(tapBalance);
    $("#funds_tap_balance_value").html("$" + tapBalance);

    // Hide QR code if balance went below required base fare.
    verifyAndUpdateQRCodeScannable();
}

function setUserSession(username) {
    userSession=username;

}

/*
 * Description: Set if this user has an active ticket ready to scan.
 * Input: True if they have a ticket, false if not.
 * Output: N/A
 * Error: N/A
 */
function setHasActiveTicket(newHasActiveTicket) {
    hasActiveTicket = newHasActiveTicket;
}


// ========================================================================================================================
// ALL PAGES
// ========================================================================================================================

/* Private Global Variables */

/* The number of guests currently selected in the app */
var numGuests = 0;

/* READ-ONLY: True if QR is facing foward, false if it's flipped (showing guest passes) */
var qrCodeFacingForward = true;

/* READ-ONLY: Set in verifyAndUpdateQRCodeScannable(). */
var qrCodeVisible = true;

/* A list of AvailableTicket objects available to the user to purchase. */
var availableTicketList = [];

/* A list of TransitStation objects that represent the nearest transit lines to the user */
var nearestTransitStations = [];

/* An index of which TransitStation the user is currently viewing in the home screen. */
var nearestTransitStationIndex = 0;

/* A list of all BalanceHistoryItem objects to be displayed in their balance history */
var balanceHistoryList = [];

/* A list of all PastTapItem objects to be displayed in their past taps. */
var pastTapList = [];

/* A list of all TicketWalletItem objects to be displayed in the "Ticket Wallet." */
var ticketWalletList = [];

/* Enable the "swipe right" feature to open the side panel in the app. */

$(".sidePanelAccessible").on( "pagecreate", function() {
    var pageId = $(this).attr("id");

    /* Find the settings panel this page and set it to open if the user swipes right */
    $(this).on( "swiperight", function( e ) {
        // Check if panel is open already
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            $("#" + pageId + " .settings-panel").panel( "open" );
        }
    });
});

// ========================================================================================================================
// LOGIN PAGE
// ========================================================================================================================
var balance;
/* Called by log-in submit button */
$("#log-in-form").on("submit", function(e) {
/*
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/validateLogin.php',
        data: {
            email:$('#loginemail').val(),
            password:$('#loginpassword').val()
        },
        success : function(data) {

            var parsedusername= $.parseJSON(data);

            if(parsedusername==false) {
                alert("Login Credentials Invalid, Please Try Again");
            }
              else {
                setUserSession(parsedusername);
                $.mobile.changePage("#home", {transition: "slideup"});
            }

        },
        error: function(data, textStatus) {
            alert("Server error has occurred");

        }
    });
    */
//Set Tap Balance
  setTimeout(function() {
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/getBalance.php',
        data: {
            email:userSession
        },
        success : function(data) {

            var parsedbalance= $.parseJSON(data);
            balance=parsedbalance;
            //console.log(parsedbalance);
            setTAPBalance(parsedbalance);

        },
        error: function(data, textStatus) {
            alert("Server error has occurred");

        }
    });
    },3000);


    // Bypass login for testing.
    $.mobile.changePage("#home", {transition: "slideup"});

    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
});

$("#forgot-password").on("click", function(e){
    
    //get email address from login field
    var user_email = $("#loginemail").val();

    //validate it's a real email address
    var regex_email = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
    var result_test_email = regex_email.test(user_email);
    if (!result_test_email){
       //tell user to enter email address
       $("#popup-forgotpass-email").popup({ theme: "b" });
       $("#popup-forgotpass-email").popup("open");
    }
    else{
        //go ahead and send email with password to user's stored email address
        $.ajax({
            type:'POST',
            url:'http://tapmobile.co.nf/back_end/forgotPassword.php',
            data: {
                email:user_email
            },
            success : function(msg) {
                //show confirmation that it has been sent
                $("#popup-confirm-passSent").popup({ theme: "b" });
                $("#popup-confirm-passSent").popup("open");

                //clear log-in form
                $("#log-in-form").trigger("reset");

            },
            error: function(data, textStatus) {
                alert("Server error has occurred");

            }
        });
    }

});

// ========================================================================================================================
// ACCOUNT CREATION PAGE
// ========================================================================================================================

/* Called by accout creation cancel button */
$(".signup-cancel").on("click", function(e) {
    document.getElementById("user-info-account-create").reset();
    document.getElementById("payment-info-account-create").reset();
    $.mobile.changePage("#log-in", {transition: "slidedown"});
    return false;
});

function set_error(field, msg, error_array, set_value){
    var error_object = new Object();
    error_object.field = field;
    error_object.msg = msg;
    error_array.push(error_object);

    if (set_value){
        var page = 0;
        if (field == "cc_state"){
            $("#cc_address_state-label").css('color', 'rgb(200,0,0)');
            $("#cc_address_state-label").append("<br>" + msg);
            page = set_page_redirect(page, 2);
        }
        else if (field == "cc_city"){
            $("#cc_address_city-label").css('color', 'rgb(200,0,0)');
            $("#cc_address_city-label").append("<br>" + msg);
            page = set_page_redirect(page, 2);
        }
    }
}

function set_page_redirect(page, number){
    if (number == 2 && page != 1){
        return 2;
    }
    else return 1;
}

var stripeToken;
Stripe.setPublishableKey('pk_live_xsVpP49WCs4qAWmiHn2If0WB');
var stripeResponseHandler = function (status, response) {
    var $form = $('#payment-info-account-create');

    if (response.error) {
        // Show the errors on the form
        
        alert(response.error.message);
        $('#submit-create-account').prop('disabled', false);
    } else {
        // token contains id, last4, and card type
        stripeToken = response.id;
        
           }
};


$("#submit-create-account").on("click", function (e) {

    var $form = $('#payment-info-account-create');

    // Disable the submit button to prevent repeated clicks
    $(this).prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);
    // end Stripe token creation
  

    //Clear previous error messages
    $("#fname-label").css('color', 'rgb(0,0,0)');
    $("#lname-label").css('color', 'rgb(0,0,0)');
    $("#email-label").css('color', 'rgb(0,0,0)');
    $("#pass-label").css('color', 'rgb(0,0,0)');
    $("#pass2-label").css('color', 'rgb(0,0,0)');
    $("#cc_name-label").css('color', 'rgb(0,0,0)');
    $("#cc_num-label").css('color', 'rgb(0,0,0)');
    $("#cc_cvv-label").css('color', 'rgb(0,0,0)');
    $("#cc_exp-label").css('color', 'rgb(0,0,0)');
    $("#cc_address_street-label").css('color', 'rgb(0,0,0)');
    $("#cc_address_city-label").css('color', 'rgb(0,0,0)');
    $("#cc_address_state-label").css('color', 'rgb(0,0,0)');
    $("#cc_zip-label").css('color', 'rgb(0,0,0)');

    $("#fname-label").html("<b>First Name:</b>");
    $("#lname-label").html("<b>Last Name:</b>");
    $("#email-label").html("<b>Email Address:</b>");
    $("#pass-label").html("<b>Password:</b>");
    $("#pass2-label").html("<b>Confirm Password:</b>");
    $("#cc_name-label").html("<b>Cardholder Name:</b>");
    $("#cc_num-label").html("<b>Credit Card Number:</b>");
    $("#cc_cvv-label").html("<b>CVV:</b>");
    $("#cc_exp-label").html("<b>Expiration Date:</b>");
    $("#cc_zip-label").html("<b>Billing Zip Code:</b>");
    $("#cc_address_street-label").html("<b>Street Address:</b>");
    $("#cc_address_city-label").html("<b>City:</b>");
    $("#cc_address_state-label").html("<b>State:</b>");

    //set values
    var MAX_LENGTH = 255;
    var error_array = [];

    //Get account page 1 values
    var fname = $("#acc-create-fname").val().trim();
    var lname = $("#acc-create-lname").val().trim();
    var email = $("#acc-create-email").val().trim();
    var pass1 = $("#acc-create-password1").val();
    var pass2 = $("#acc-create-password2").val();

    //Validate page 1 values

    /* Check to make sure name fields are not empty */
    if (!fname){
        set_error("fname", "Please enter a first name", error_array, false);
    }

    if (!lname){
        set_error("lname", "Please enter a last name", error_array, false);
    }

    /* Check to make sure name fields do not exceed max length */
    if (fname.length > MAX_LENGTH){
        set_error("fname", "First name exceeds max length", error_array, false);
    }

    if (lname.length > MAX_LENGTH){
        set_error("lname", "Last name exceeds max length", error_array, false);
    }

    /*  Validate email address  */
    var regex_email = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
    var result_test_email = regex_email.test(email);
    if (!result_test_email){
        set_error("email", "Please enter a valid email address", error_array, false);
    }

    /* Validate password */
    //length: must be greater at least 5 characters and no greater than max length
    if (pass1.length < 5 || pass1.length > MAX_LENGTH){
        set_error("pass", "Please enter a password over 5 characters", error_array, false);
    }
    else if (pass1 != pass2){
        set_error("pass", "Passwords do not match", error_array, false);
    }

    //Get account page 2 values
    var cc_name = $("#cc_name").val();
    var cc_num = $("#cc_num").val();
    var cc_cvv = $("#cc_cvv").val();
    var cc_exp = $("#cc_exp").val();
    var cc_street = $("#cc_address_street").val();
    var cc_city = $("#cc_address_city").val();
    var cc_state = $("#cc_address_state").val();
    var cc_zip = $("#cc_zip").val();

    //Validate page 2 values
    if (!cc_name){
        set_error("cc_name", "Please enter a cardholder name", error_array, false);
    }

    var regex_cc_num = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    var result_test_cc_num = regex_cc_num.test(cc_num);
    if (!result_test_cc_num){
        set_error("cc_num", "Please enter a valid credit card number", error_array, false);
    }

    var regex_cc_cvv = /^[0-9]{3,4}$/;
    var result_test_cc_cvv = regex_cc_cvv.test(cc_cvv);
    if (!result_test_cc_cvv){
        set_error("cc_cvv", "Please enter a valid cvv number", error_array, false);
    }

    /*var test_cc_exp = cc_exp.split('-'); //value from input as yyyy-mm
    if (test_cc_exp[0] < 2014 || test_cc_exp > 2200){
        set_error("cc_exp", "Please enter a valid expiration", error_array, false);
    }
    else if (test_cc_exp[1] < 1 || test_cc_exp[1] > 12){
        set_error("cc_exp", "Please enter a valid expiration", error_array, false);
    }*/

    var regex_cc_street = /^[0-9a-zA-Z. ]+$/;
    var result_test_cc_street = regex_cc_street.test(cc_street);
    if (!result_test_cc_street){
        set_error("cc_street", "Please enter a valid street address", error_array, false);
    }

    var regex_cc_city = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    var result_test_cc_city = regex_cc_city.test(cc_city);
    if (!result_test_cc_city){
        set_error("cc_city", "Please enter a valid city", error_array, false);
    }

    var regex_cc_zip = /^\d{5}(?:[-\s]\d{4})?$/;
    var result_test_cc_zip = regex_cc_zip.test(cc_zip);
    if (!result_test_cc_zip){
        set_error("cc_zip", "Please enter a valid billing zip code", error_array, false);
    }

    if (result_test_cc_zip && result_test_cc_city){
        //confirm that zip matches entered city/state
        var zip_found_city, zip_found_state;

        //this is async -- need to wait for this to finish before continuing --> could be done better
        $.zipLookup(
            cc_zip, 
            function(cityName, stateName, stateShortName){      // If Successful,
               zip_found_city = cityName;
               zip_found_state = stateShortName;
               
               if (zip_found_city != cc_city){
                    set_error("cc_city", "City does not match zip code", error_array, true);
               }
               
               if (zip_found_state != cc_state){
                    set_error("cc_state", "State does not match zip code", error_array, true);
               }
            },
            function(errMsg){   
                //set error message                            
                set_error("cc_zip", "Zip code could not be found", error_array, true);
            });
    }

    //Check for Errors and if found redirect user
    if (error_array.length > 0){
        var page = 0;
        //for each field in array set according field to red with error message
        for (var i = 0; i < error_array.length; i++){
            if (error_array[i].field == "fname"){
                $("#fname-label").css('color', 'rgb(200,0,0)');
                $("#fname-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 1);
            }
            else if (error_array[i].field == "lname"){
                $("#lname-label").css('color', 'rgb(200,0,0)');
                $("#lname-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 1);
            }
            else if (error_array[i].field == "email"){
                $("#email-label").css('color', 'rgb(200,0,0)');
                $("#email-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 1);
            }
            else if (error_array[i].field == "pass"){
                $("#pass-label").css('color', 'rgb(200,0,0)');
                $("#pass2-label").css('color', 'rgb(200,0,0)');
                $("#pass-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 1);
            }
            else if (error_array[i].field == "cc_name"){
                $("#cc_name-label").css('color', 'rgb(200,0,0)');
                $("#cc_name-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_num"){
                $("#cc_num-label").css('color', 'rgb(200,0,0)');
                $("#cc_num-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_cvv"){
                $("#cc_cvv-label").css('color', 'rgb(200,0,0)');
                $("#cc_cvv-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_exp"){
                $("#cc_exp-label").css('color', 'rgb(200,0,0)');
                $("#cc_exp-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_street"){
                $("#cc_address_street-label").css('color', 'rgb(200,0,0)');
                $("#cc_address_street-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_city"){
                $("#cc_address_city-label").css('color', 'rgb(200,0,0)');
                $("#cc_address_city-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_state"){
                $("#cc_address_state-label").css('color', 'rgb(200,0,0)');
                $("#cc_address_state-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
            else if (error_array[i].field == "cc_zip"){
                $("#cc_zip-label").css('color', 'rgb(200,0,0)');
                $("#cc_zip-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
        }

        if (page == 1)
            $.mobile.changePage("#account-create-1", {transition: "slideup"});
        else
            $.mobile.changePage("#account-create-2", {transition: "slideup"});
    }
    else{

    //If front end validation passes fire Ajax
    //Writes new user to server through PHP script
     $.ajax({
        
        type: 'POST',
        url:'http://tapmobile.co.nf/back_end/newUser.php',
        //dataType:'json',
        data: {
            fname:$('#acc-create-fname').val(),
            lname:$('#acc-create-lname').val(),
            email:$('#acc-create-email').val(),
            password:$('#acc-create-password2').val(),
            cardholder_name:$('#cc_name').val(),
            street:$('#cc_address_street').val(),
            city:$('#cc_address_city').val(),
            state:$('#cc_address_state').val(),
            zip: $('#cc_zip').val()
        },
        success : function(data) {

            var parsedstring= $.parseJSON(data);

            if(parsedstring) {
               alert("This email address is already in use, please select a new one");
            }
            if(!parsedstring)  {
                $.mobile.changePage("#home", {transition: "slideup"});
            }

        },
        error: function(data, textStatus) {
        alert("server error has occured");

        }
        });
  }


    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
});


// ========================================================================================================================
// ADD FUNDS PAGE
// ========================================================================================================================


/*
 * Description: Charge user's credit card for selected fund amount
 * Input: The amount of money to be charged to card and added to account balance
 *
 * Output: N/A
 * Error: N/A
 */
function purchaseFunds(charge_amount){
    console.log("Attempting to charge user's credit card for " + charge_amount);
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/chargeCard.php',
        data: {
            userSession:userSession
        },
        success : function(data) {
            console.log("Charged $" + charge_amount);
            //TO DO: update balance
            //TO DO: add transaction to purchase history
        },
        error: function(data, textStatus) {
            alert("Server error has occurred");
        }
    }); 
}


/*
 * Description: Aux function to convert radio button choice to fund amount
 * Input: N/A
 * Output: A float value for the fund amount selected
 * Error: N/A
 */
function determineFundAmount(){
    var fund_amount = $("input[type='radio']:checked").val();

    if (fund_amount == "choice-1"){
        fund_amount = 1.50;
    }
    else if (fund_amount == "choice-2"){
        fund_amount = 5.00;
    }
    else if (fund_amount == "choice-3"){
        fund_amount = 10.00;
    }
    else if (fund_amount == "choice-4"){
        fund_amount = 20.00;
    }
    else if (fund_amount == "choice-5"){
        fund_amount = 50.00;
    }
    else if (fund_amount == "choice-6"){
        fund_amount = 100.00;
    }

    return fund_amount;
}

/* Open confirmation when user clicks to purchase funds*/
$("#add-funds-form").on("submit", function(e) {
   
    var card_number = 4444; //TO DO: pull from database
    var fund_amount = determineFundAmount();

    $("#fund-confirm-message").html("Your credit card ending in " + card_number + " will be charged $" + fund_amount.toFixed(2) + ", continue?");
    $("#dialog-confirm-add-funds").popup({ theme: "a" });
    $("#dialog-confirm-add-funds").popup("open");
    
    return false;
});

/*Complete add funds transaction if user confirms purchase*/
$("#dialog-confirm-purchase-funds").on("click", function(e) {
    var fund_amount = determineFundAmount();
    purchaseFunds(fund_amount);
    
    var newBalance = parseFloat($(".tap-balance-value").html()) + fund_amount; //TO DO: pull amount from backend and add to it
    setTAPBalance(newBalance); // Back-end should be validating this value.

    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/updateBalance.php',
        data: {
            newBalance:tapBalance,
            userSession:userSession
        },
        success : function(data) {
            document.getElementById("user-info-account-create").reset();
            document.getElementById("payment-info-account-create").reset();
        },
        error: function(data, textStatus) {
            alert("Server error has occurred");

        }
    });


    
    addItemToBalanceHistory(10,10,10,10);

    $("#dialog-confirm-add-funds").popup("close");
    
    return false; // Prevent default form action
});

//TO DO: this should be pushing to backend and then backend should be pulled everytime balance history is refreshed
function addItemToBalanceHistory(charge_amount, card_number, time, date){
    $("#balance_history_funds").append("<li class='ui-li ui-li-static ui-btn-up-c ui-last-child'><h2 class='ui-li-heading'>$" + charge_amount.toFixed(2) + "</h2><p class='ui-li-desc'><strong>Card ending in " + card_number + "</strong></p><p class='ui-li-desc'>" + date + "-" + time + "</p></li>");
}

// ========================================================================================================================
// HOME PAGE
// ========================================================================================================================

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

/*
 * Description: Use the phone's GPS to store current position information.
 * Input: N/A
 * Output: Updates lastUpdatedPosition with fresh data.
 * Error: Sends an alert if this fails for any reason.
 */
function refreshLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        //position.coords.latitude
        //position.coords.longitude
        lastUpdatedPosition = position;

    }, function(error) {

        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    });
}

/*
 * Description: Set the ticket text in the caption displayed under the front-facing QR code.
 * Input: Text identifying the ticket being used.
 * Output: N/A
 * Error: N/A
 */
function setFrontQRCaptionTicket(ticketText) {
    $("#qr-front-caption-ticket").html(ticketText);
}

/*
 * Description: Set the expiration date in the caption displayed under the front-facing QR code.
 * Input: Text identifying the date.
 * Output: N/A
 * Error: N/A
 */
function setFrontQRCaptionExpDate(expirationDate) {
    $("#qr-front-caption-expdate").html(expirationDate);
}

/*
 * Description: Set the number of guests in the caption displayed under the front-facing QR code (if 0, line is not shown)
 * Input: Number of guests on the QR scan.
 * Output: N/A
 * Error: N/A
 */
function setFrontQRCaptionGuests(numGuests) {
    var frontCaptionGuests = $("#qr-front-caption-guests");
    if (numGuests > 0) {
        $("#qr-front-caption-guests-num").html(numGuests);
        $("#qr-front-caption-guests-price").html((numGuests * baseFare).toFixed(2));
        frontCaptionGuests.css("display", "inline");
    } else {
        frontCaptionGuests.css("display", "none");
    }
}

/*
 * Description: Set the caption displayed under the front-facing QR code.
 * Input: A FrontQRCaption object
 * Output: N/A
 * Error: N/A
 */
function setFrontQRCaption(frontQRCaption) {
    setFrontQRCaptionTicket(frontQRCaption.ticketText);
    setFrontQRCaptionExpDate(frontQRCaption.expirationDate);
    setFrontQRCaptionGuests(frontQRCaption.numGuests);
}

/*
 * Description: nil (may not need this)
 * Input: 
 * Output: N/A
 * Error: N/A
 */
function setBackQRCaption(backQRCaption) {
}


/* Nearest transit lines */

/*
 * Description: 
 * Input: A list of TransitStation objects.
 * Output: N/A
 * Error: N/A
 */
function setNearestTransitStations(transitStationList) {
    for (var i = 0; i < transitStationList.length; i++) {
        addTransitStation(transitStationList[i]);
    }
}

/*
 * Description: 
 * Input: A TransitStation object.
 * Output: N/A
 * Error: N/A
 */
function addTransitStation(transitStation) {
    // Add to array to access later.
    nearestTransitStations.push(transitStation);
}

/*
 * Description: Remove a TransitStation from the list.
 * Input: A ticket object.
 * Output: N/A
 * Error: N/A
 */
function removeTransitStation(transitStation) {
    for (var i = 0; i < transitStationList.length; i++) {
        if (transitStationList[i].stationId == transitStation.stationId) {
            --i;

            // Remove from list.
            transitStationList.splice(i, 1);
        }
    }
}

/*
 * Description: Clear available tickets.
 * Input: N/A
 * Output: N/A
 * Error: N/A
 */
function clearTransitStations() {
    // Clear list.
    nearestTransitStations = [];

    // Clear DOM.
    $("").empty();
}


/* QR/dependents */

/* Available tickets */

/*
 * Description: Define a list of ticket objects to make available in the "Buy Tickets" tab on the home screen.
 * Input: A list of ticket objects to make available on the front end.
 * Output: N/A
 * Error: N/A
 */
function setAvailableTickets(ticketList) {
    for (var i = 0; i < ticketList.length; i++) {
        addAvailableTicket(ticketList[i]);
    }
}

/*
 * Description: Append a ticket to the "Buy Tickets" tab on the home screen.
 * Input: A ticket object.
 * Output: N/A
 * Error: N/A
 */
function addAvailableTicket(ticket) {
    // Add to array to access later.
    availableTicketList.push(ticket);

    // Add to DOM.
    $("#mytickets-list").append("<li id=\"ticketId" + ticket.ticketId + "\"><a href=\"#dialog-confirm-ticket\" data-rel=\"dialog\" data-transition=\"slidedown\">" + ticket.ticketName + " - $" + ticket.ticketPrice + "</a></li>");
}

/*
 * Description: Remove a ticket from the list.
 * Input: A ticket object.
 * Output: N/A
 * Error: N/A
 */
function removeAvailableTicket(ticket) {
    for (var i = 0; i < availableTicketList.length; i++) {
        if (availableTicketList[i].ticketId == ticket.ticketId) {
            --i;
            availableTicketList.splice(i, 1);
            $("#ticketId" + ticket.ticketId).remove();
        }
    }
}

/*
 * Description: Clear available tickets.
 * Input: N/A
 * Output: N/A
 * Error: N/A
 */
function clearAvailableTickets() {
    // Clear list.
    availableTicketList = [];

    // Clear DOM.
    $("#mytickets-list").empty();
}

/* Balance History */

/*
 * Description: Define a list of ticket objects to make available in the "Balance History" tab in the account balance screen.
 * Input: A list of BalanceHistoryItem objects.
 * Output: N/A
 * Error: N/A
 */
function setBalanceHistory(balanceList) {
    for (var i = 0; i < balanceHistoryList.length; i++) {
        addBalanceHistoryItem(balanceList[i]);
    }
}

/*
 * Description: Append a balance history item to the "Balance History" tab in account balance info.
 * Input: A BalanceHistoryEntry object.
 * Output: N/A
 * Error: N/A
 */
function addBalanceHistoryItem(balanceHistoryItem) {
    // Add to array to access later.
    balanceHistoryList.push(balanceHistoryItem);

    // Add to DOM.
    if (balanceHistoryItem.transactionType == "addfunds")
    {
        $("#balance_history_funds").append("<li class=\"balanceHistoryItem\"><h2 class=\"ui-li-heading\">$" + balanceHistoryItem.transactionAmount + "</h2><p class=\"ui-li-desc\"><strong>" + balanceHistoryItem.descriptionText + "</strong></p><p class=\"ui-li-desc\">" + balanceHistoryItem.transactionDate + " - " + balanceHistoryItem.transactionTime + "</p>");
    } else if (balanceHistoryItem.transactionType == "purchase") {
        $("#balance_history_purchases").append("<li class=\"balanceHistoryItem\"><h2 class=\"ui-li-heading\">$" + balanceHistoryItem.transactionAmount + "</h2><p class=\"ui-li-desc\"><strong>" + balanceHistoryItem.descriptionText + "</strong></p><p class=\"ui-li-desc\">" + balanceHistoryItem.transactionDate + " - " + balanceHistoryItem.transactionTime + "</p>");
    }
}

/*
 * Description: Clear balance history.
 * Input: N/A
 * Output: N/A
 * Error: N/A
 */
function clearBalanceHistory() {
    // Clear list.
    balanceHistoryList = [];

    // Clear DOM.
    $(".balanceHistoryItem").remove();
}

/* Past Taps */

/*
 * Description: Define a list of PastTap objects to make available in the "Past Taps" tab on the account balance screen.
 * Input: A list of PastTap objects.
 * Output: N/A
 * Error: N/A
 */
function setPastTaps(tapList) {
    for (var i = 0; i < pastTapList.length; i++) {
        addPastTap(tapList[i]);
    }
}

/*
 * Description: Append a past tap item to the "Past Taps" tab in account balance info.
 * Input: A PastTap object.
 * Output: N/A
 * Error: N/A
 */
function addPastTap(pastTapItem) {
    // Add to array to access later.
    pastTapList.push(pastTapItem);

    // Add to DOM.
    $("#past-tap-list").append("<li><a href=\"#\"><p class=\"ui-li-aside ui-li-desc\"><strong>" + pastTapItem.numGuests + " guests</strong></p><h2 class=\"ui-li-heading\">" + pastTapItem.ticketText + "</h2><p class=\"ui-li-desc\"><strong>" + pastTapItem.stationDescription + "</strong></p><p class=\"ui-li-desc\">" + pastTapItem.tapDate + " - " + pastTapItem.tapTime + "</p></a><a href=\"#\"></a></li>");
}

/*
 * Description: Clear past taps.
 * Input: N/A
 * Output: N/A
 * Error: N/A
 */
function clearPastTaps() {
    // Clear list.
    pastTapList = [];

    // Clear DOM.
    $("#past-tap-list").empty();
}

/* Ticket Wallet */

/*
 * Description: Define a list of TicketWalletItem objects to make available in the "Ticket Wallet" tab on the account balance screen.
 * Input: A list of TicketWalletItem objects.
 * Output: N/A
 * Error: N/A
 */
function setTicketWallet(walletList) {
    for (var i = 0; i < ticketWalletList.length; i++) {
        addTicketWalletItem(walletList[i]);
    }
}

/*
 * Description: Append a ticket wallet item to the "Ticket Wallet" tab in account balance info.
 * Input: A TicketWalletItem object.
 * Output: N/A
 * Error: N/A
 */
function addTicketWalletItem(ticketWalletItem) {
    // Add to array to access later.
    ticketWalletList.push(ticketWalletItem);

    // Add to DOM.
    if (ticketWalletItem.ticketActivated) {
        if (ticketWalletItem.ticketSelected) {
            $("#ticket-wallet-list").append("<li id=\"ticketWalletItemId" + ticketWalletItem.ticketId + "\" data-theme=\"g\" data-icon=\"false\"><p class=\"ui-li-aside ui-li-desc\"><strong>" + ticketWalletItem.ticketsRemaining + " Remaining</strong></p><h2 class=\"ui-li-heading\">" + ticketWalletItem.ticketText + "</h2><p class=\"ui-li-desc\">Expires on " + ticketWalletItem.expirationDate + " at " + ticketWalletItem.expirationTime + "</p></li>");
        } else {
            $("#ticket-wallet-list").append("<li id=\"ticketWalletItemId" + ticketWalletItem.ticketId + "\" data-theme=\"c\" data-icon=\"false\"><p class=\"ui-li-aside ui-li-desc\"><strong>" + ticketWalletItem.ticketsRemaining + " Remaining</strong></p><h2 class=\"ui-li-heading\">" + ticketWalletItem.ticketText + "</h2><p class=\"ui-li-desc\">Expires on " + ticketWalletItem.expirationDate + " at " + ticketWalletItem.expirationTime + "</p></li>");
        }
    } else {
        if (ticketWalletItem.ticketSelected) {
            $("#ticket-wallet-list").append("<li id=\"ticketWalletItemId" + ticketWalletItem.ticketId + "\" data-theme=\"g\" data-icon=\"false\"><p class=\"ui-li-aside ui-li-desc\"><strong>" + ticketWalletItem.ticketsRemaining + " Remaining</strong></p><h2 class=\"ui-li-heading\">" + ticketWalletItem.ticketText + "</h2><p class=\"ui-li-desc\">Not yet activated</p></li>");
        } else {
            $("#ticket-wallet-list").append("<li id=\"ticketWalletItemId" + ticketWalletItem.ticketId + "\" data-theme=\"c\" data-icon=\"false\"><p class=\"ui-li-aside ui-li-desc\"><strong>" + ticketWalletItem.ticketsRemaining + " Remaining</strong></p><h2 class=\"ui-li-heading\">" + ticketWalletItem.ticketText + "</h2><p class=\"ui-li-desc\">Not yet activated</p></li>");
        }
    }
}

/*
 * Description: Remove an item from the ticket wallet.
 * Input: A ticket object.
 * Output: N/A
 * Error: N/A
 */
function removeTicketWalletItem(ticketWalletItem) {
    for (var i = 0; i < ticketWalletList.length; i++) {
        if (ticketWalletList[i].ticketId == ticketWalletItem.ticketId) {
            --i;
            ticketWalletList.splice(i, 1);
            $("#ticketWalletItemId" + ticketWalletItem.ticketId).remove();
        }
    }
}

/*
 * Description: Clear ticket wallet.
 * Input: N/A
 * Output: N/A
 * Error: N/A
 */
function clearTicketWallet() {
    // Clear list.
    ticketWalletList = [];

    // Clear DOM.
    $("#ticket-wallet-list").empty();
}

/*
 * Description: Call this when a ticket QR code was successfully processed and payed for by admin application.
 * Input: Boolean to indicate if TAP balance was used (so front end can deduct it) and the remaining TAP balance (if tapBalanceUsed is true).
 * Output: N/A
 * Error: N/A
 */
function processedTicketSuccessful(remainingBalance) {
    // Send notification to phone platform.
    processedTicketNotification(0, "Successfully processed ticket");

    // Update TAP balance on home screen.
    setTAPBalance(remainingBalance); // Back-end should be validating this value.
}

/*
 * Description: Call this when a ticket QR code was failed to process.
 * Input: An error code to identify the issue.
 * Output: N/A
 * Error: N/A
 */
function processedTicketFailed(errorCode) {
    processedTicketNotification(0, "Ticket failed to process");
}

// ----------------------------------------------------------------------
// Private
// ----------------------------------------------------------------------

// QR Code generation
var userid= "1234567890";
var timestamp;
var message;
var qrcode;

// Public data
var qrImgHeight;
var ticketListHeight;

/* QR Code Generator */
var refreshRate = 5000;

function updateTimeQR() {
    qrcode.clear();
    timestamp = Date.now();
    message = userid + timestamp;
    qrcode.makeCode(message);
}

$("#home").on("pagecreate", function(event) {
    /* Encode the QR image */
    qrcode = new QRCode(document.getElementById("qr-code"), {
        width: $(window).width()/2,
        height: $(window).width()/2,
        correctLevel: QRCode.CorrectLevel.L
    });
    updateTimeQR();
    setInterval("updateTimeQR()", refreshRate);
});

/* Called right when transition to home page begins */
$("#home").on("pagebeforeshow", function(event) {
    /* Get the actual QR image height */
    qrImgHeight = $("#qr-code").actual("height");

    /* Set the height of the QR divs and image to be uniform and properly animate */    
    $("#qr-front").height(qrImgHeight);
    $("#qr-code").height(qrImgHeight);
    $("#qr-code-disabled").height(qrImgHeight);
    $("#qr-back").height(qrImgHeight);

    /* Update the transit station element */
    updateTransitStationElement(nearestTransitStationIndex);

    /* Always show QR code side when page loads */
    resetCenterTile();

    /* Check if QR code should be displayed or hidden */
    verifyAndUpdateQRCodeScannable();

    /* Reset Buy Tickets tab */
    collapseTicketContainer(0);
});

/* Called after the home page is fully transitioned */
$("#home").on("pageshow", function(event) {
    /* Center QR tile on screen dynamically */
    //$("#qr-rotation-tile").css("left", ($("#home-content").width()/2 - $(window).width()/4) + "px");
    //$("#qr-rotation-tile").animate({left: ($("#home-content").width()/2 - $(window).width()/4) + "px"}, 200);

    $.ajax({
        type:'GET',
        url:'http://tapmobile.co.nf/back_end/getTicketType.php',
        success : function(data) {
            /* Build the DOM */
            clearAvailableTickets();
            var ticketTypes= $.parseJSON(data);
            setAvailableTickets(ticketTypes);

            // Refresh jquery UI styling.
            $("#mytickets-list").listview('refresh');

            /* Determine the height of the Buy Tickets container by taking the height of one element and multiplying by 3. */
            ticketListHeight = $("#mytickets-list li").actual("height") * 3;

            /* Set the ticket container scrollbox height */
            $("#mytickets-list-container").height(ticketListHeight);

            /* Twitch the ticket tab to indicate its existence to user */
            teaseTicketContainer(600);

        },
        error: function(data, textStatus) {
            alert("Server error has occurred");
        }
    });
});

/* Handle back button presses on Android when on the home screen. */
function handleHomeScreenBackBtn() {
    if (qrCodeFacingForward) { // Do nothing.
        navigator.Backbutton.goHome(); // Open home screen.
    } else { // Flip the QR code back over
        flipQRCodeToFront();
    }
}

/* Refresh location */

$(".refreshLocation").click(function() {
    //var refreshBtn = $(this);
    refreshLocation();
});

/* Nearest transit station */

// How many milliseconds it takes the element to slide off screen and back on.
var transitStationSwipeSpeed = 200;

$("#nearest-station").on("swipeleft", function(event) {
    event.stopImmediatePropagation(); // Prevent other swipe events from firing.

    if (!$(this).is(':animated')) { // Don't double animate.
        if (nearestTransitStationIndex < nearestTransitStations.length - 1) {
            $(this).css("position", "relative");
            $(this).animate({left: -($(this).width()+20)+"px"}, transitStationSwipeSpeed, function() {
                updateTransitStationElement(++nearestTransitStationIndex);

                $(this).css("left", ($(this).width()+20)+"px");
                $(this).animate({left: ($(this).parent().width() - $(this).width())/2}, transitStationSwipeSpeed, function() {
                    $(this).css("left", "auto");
                    $(this).css("position", "static");
                });
            });
        }
    }
});

$("#nearest-station").on("swiperight", function(event) {
    event.stopImmediatePropagation(); // Prevent other swipe events from firing.

    if (!$(this).is(':animated')) { // Don't double animate.
        if (nearestTransitStationIndex > 0) {
            $(this).css("position", "relative");
            $(this).animate({right: -($(this).width()+20)+"px"}, transitStationSwipeSpeed, function() {
                updateTransitStationElement(--nearestTransitStationIndex);

                $(this).css("right", ($(this).width()+20)+"px");
                $(this).animate({right: ($(this).parent().width() - $(this).width())/2}, transitStationSwipeSpeed, function() {
                    $(this).css("right", "auto");
                    $(this).css("position", "static");
                });
            });
        }
    }
});

function updateTransitStationElement(transitStationIndex) {
    var transitStation = nearestTransitStations[transitStationIndex];
    $("#nearest-station-desc").html(transitStation.stationDescription);
    $("#nearest-station-dest-A").html("Westbound to " + transitStation.transitDestA);
    $("#nearest-station-time-A").html(transitStation.arrivalTimeA);
    $("#nearest-station-dest-B").html("Eastbound to " + transitStation.transitDestB);
    $("#nearest-station-time-B").html(transitStation.arrivalTimeB);
}

/* Custom incrementor/decrementor */

function updateGuestTotal(guestTotal) {
    $("#output-guest-num").html(guestTotal);
    $("#output-total-price").html((guestTotal * baseFare).toFixed(2));
}

$("#input-guest-inc").on("click", function(e) {
    var curVal = +$("#output-guest-num").html();

    // This shitshow makes sure there is enough fare available for the user and guests.
    if (curVal < maxGuests && ((hasActiveTicket && tapBalance >= baseFare * (curVal+1)) || (!hasActiveTicket && tapBalance >= baseFare * (curVal+2)))) {
        updateGuestTotal(curVal+1);
    }
});

$("#input-guest-dec").on("click", function(e) {
    var curVal = +$("#output-guest-num").html();
    if (curVal > 0) {
        updateGuestTotal(curVal-1);
    }
});

$("#qr-guests-accept-btn").on("click", function(event) {
    var strNumGuests = $("#output-guest-num").html();
    numGuests = parseInt(strNumGuests, 10);
    setFrontQRCaptionGuests(numGuests);
});

/* Toggle ticket panel */
$("#mytickets").click(function() {
    toggleTicketContainer(400);
});

/* QR Code Behaviour */

/* Flip QR code and show dependents. */
$("#qr-front").click(function() {
    if (qrCodeVisible) {
        /* Reset data */
        updateGuestTotal(numGuests);

        /* Animation */
        flipQRCodeToBack();
    }
});

/* Flip dependents and show QR code. */
$(".qrFlipBack").button().click(function() {
    flipQRCodeToFront();
});

function flipQRCodeToFront() {
    if (!qrCodeFacingForward) {
        $("#qr-back").hide( "clip", { direction: "horizontal" }, 300, function() {
            $("#qr-front").show("clip", { direction: "horizontal" }, 300, function () {});
        });
        
        $("#qr-back-caption").hide( "slide", { direction: "left" }, 300, function() {
            $("#qr-front-caption").show("slide", { direction: "right" }, 300, function () {});
        });

        qrCodeFacingForward = true;
    }
}

function flipQRCodeToBack() {
    if (qrCodeFacingForward) {
        $("#qr-front").hide( "clip", { direction: "horizontal" }, 300, function() {
            $("#qr-back").show("clip", { direction: "horizontal" }, 300, function () {});
        });

        $("#qr-front-caption").hide( "slide", { direction: "left" }, 300, function() {
            $("#qr-back-caption").show("slide", { direction: "right" }, 300, function () {});
        });

        qrCodeFacingForward = false;
    }
}

// Verify that the user has a valid ticket or enough money for base fare, deactivate qr code otherwise.
function verifyAndUpdateQRCodeScannable()
{
    if (tapBalance >= baseFare || hasActiveTicket) {
        // Show QR code
        $("#qr-code").css("display", "block");
        $("#qr-front-caption").css("display", "block");
        $("#qr-code-disabled").css("display", "none");
        qrCodeVisible = true;
    } else {
        // Hide QR code
        resetCenterTile();
        $("#qr-code").css("display", "none");
        $("#qr-front-caption").css("display", "none");
        $("#qr-code-disabled").css("display", "block");
        qrCodeVisible = false;
    }
}

// Trigger local notification
// TODO: Add Windows and Android notifications
function processedTicketNotification(delayInMilliseconds, notificationText) {
    localNotifier.addNotification({
        fireDate        : Math.round(new Date().getTime() + delayInMilliseconds),
        alertBody       : notificationText,
        repeatInterval  : "",
        soundName       : "horn.caf",
        badge           : 0,
        notificationId  : 1,
        foreground      : function(notificationId) {},
        background      : function(notificationId) {}
    });
}

function resetCenterTile() {
    $("#qr-back").hide();
    $("#qr-back-caption").hide();
    $("#qr-front").show();
    $("#qr-front-caption").show();
    qrCodeFacingForward = true;
}

function isTicketContainerExpanded() {
    return $("#mytickets").data("containerCollapsed");
}

function collapseTicketContainer(duration) {
    $("#mytickets").animate({bottom: -ticketListHeight}, duration);
    $("#mytickets").data("containerCollapsed", true);
}

function expandTicketContainer(duration) {
    $("#mytickets").animate({bottom: 0}, duration);
    $("#mytickets").data("containerCollapsed", false);
}

function toggleTicketContainer(duration) {
    if ($("#mytickets").data("containerCollapsed")) {
        expandTicketContainer(duration);
    } else {
        collapseTicketContainer(duration);
    }
}

/* Briefly show ticket container so user knows it exists */
function teaseTicketContainer(duration) {
    collapseTicketContainer(0);
    $("#mytickets").animate({bottom: -ticketListHeight + ticketListHeight/5}, duration/2);
    $("#mytickets").animate({bottom: -ticketListHeight}, duration/2).delay(duration/2);
}

// ========================================================================================================================
// ACCOUNT SETTINGS PAGE
// ========================================================================================================================

// ----------------------------------------------------------------------
// Private
// ----------------------------------------------------------------------

$("#account-settings").on("pagecreate", function(event) {
    /* Generate a select menu containing the next 20 years from now */
    var yearSelect = $("#expiration-year");
    var currentYear = new Date().getFullYear();
    var year;
    for (year = currentYear; year < currentYear + 20; year++) {
        yearSelect.append("<option value=\"" + year + "\">" + year + "</option>");
    }
});



/* Called by update account form submit button */
$("#update-account-form").on("submit", function(e) {
   
   var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);
    // end Stripe token creation
	
   validateAccountUpdate();
    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
});

/* account delete button popup */
$("#delete-account").on("click", function(e){
    //show popup to confirm delete account
    $("#popup-delete-account-confirmation").popup({ theme: "a" });
    $("#popup-delete-account-confirmation").popup("open");
});

/* account delete button confirmation */
$(".delete-account-confirmed").on("click", function(e){
    //fire Ajax to delete account in back end
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/deleteAccount.php',
        //dataType:'json',
        data: {
            user: userSession
        },
        success : function(msg) {
            //redirect user to log-in
            alert("User deleted: " + msg);
            document.forms["AccountSettingsForm"].reset();
            $.mobile.changePage("#log-in", {transition: "slidedown"});

        },
        error: function(data, textStatus) {
            $("#popup-delete-account-confirmation").popup("close");
            alert("server error has occured");
        }
    });
    return false;
});


function set_error_update(field, msg, error_array){
    var error_object = new Object();
    error_object.field = field;
    error_object.msg = msg;
    error_array.push(error_object);
}

function validateAccountUpdate(){
    reset_all_update_labels();

    var error_array = [];
    var MAX_LENGTH = 255;

    //determine what to send ajax later based on user changes
    var email_changed = true;
    var pass_changed = true;
    var payment_changed = true;

    //get values from form
    var email1 = document.forms["AccountSettingsForm"]["new-email"].value;
    var email2 = document.forms["AccountSettingsForm"]["new-email-confirm"].value;
    var pass1 = document.forms["AccountSettingsForm"]["new-password"].value;
    var pass2 = document.forms["AccountSettingsForm"]["new-password-confirm"].value;
    var cc_cardholder = document.forms["AccountSettingsForm"]["update_cc_name"].value;
    var cc_num = document.forms["AccountSettingsForm"]["update_cc_num"].value;
    var cc_cvv = document.forms["AccountSettingsForm"]["update_cc_cvv"].value;
    var cc_exp_month = document.forms["AccountSettingsForm"]["update_cc_month"].value;
    var cc_exp_year = document.forms["AccountSettingsForm"]["expiration-year"].value;
    var cc_street = document.forms["AccountSettingsForm"]["update_cc_street"].value;
    var cc_city = document.forms["AccountSettingsForm"]["update_cc_city"].value;
    var cc_state = document.forms["AccountSettingsForm"]["update_cc_state"].value;
    var cc_zip = document.forms["AccountSettingsForm"]["update_cc_zip"].value;

    //if email entered, validate
    if (email1 || email2){
        validate_email(email1, email2, error_array);
    }
    else{
        email_changed = false;
    }

    //if password entered, validate
    if (pass1 || pass2){
        validate_password(pass1, pass2, error_array, MAX_LENGTH);
    }
    else{
        pass_changed = false;
    }

    //if payment info entered, validate
    if (cc_cardholder || cc_num || cc_cvv || cc_street || cc_city || cc_zip){
        if (!cc_cardholder){
           set_error_update("#update_cc_name-label", "Please enter a cardholder name", error_array);
        }

        validate_cc(cc_num, cc_cvv, cc_exp_year, cc_exp_month, error_array);

        validate_billing_address(cc_street, cc_city, cc_state, cc_zip, error_array);
    }
    else{
        payment_changed = false;
    }

    //Check fosr errors and if found display errors to user
    if (error_array.length > 0){
        //for each field in array set according field to red with error message
        for (var i = 0; i < error_array.length; i++){
            set_error_message(error_array[i].field, error_array[i].msg);
        }
    }
    else{
    //If front end validation passes fire Ajax
    //validate and update corresponding fields in the backend
        if (email_changed || pass_changed || payment_changed){
        $.ajax({
            type:'POST',
            url:'http://tapmobile.co.nf/back_end/updateAccountSettings.php',
            //dataType:'json',
            data: {
                user: userSession,
                email_changed:email_changed,
                pass_changed:pass_changed,
                payment_changed:payment_changed,
                email: email1,
                pass: pass1,
				stripeToken: stripeToken
                /*
                cc_cardholder: cc_cardholder
                cc_num: cc_num,
                cc_cvv: cc_cvv, 
                cc_exp_month: cc_exp_month,
                cc_exp_year: cc_exp_year,
                cc_street: cc_street,
                cc_city: cc_city,
                cc_state: cc_state,
                cc_zip: cc_zip
                */
            },
            success : function(msg) {

                //let user know account has been successfully updated

                $("#popup-account-settings-update").popup({ theme: "b" });
                $("#popup-account-settings-update").popup("open");
                //reset the update account form
                document.forms["AccountSettingsForm"].reset();
                $.mobile.changePage("#log-in", {transition: "slidedown"});

            },
            error: function(data, textStatus) {
            alert("server error has occured");

            }
        });

        }  
    }
}

function set_error_message(label_id, msg){
    $(label_id).css('color', 'rgb(200,0,0)');
    $(label_id).append("<br>" + msg);
}

function reset_update_label(label_id, msg){
    $(label_id).css('color', 'rgb(0,0,0)');
    $(label_id).html(msg);
}

function reset_all_update_labels(){
    var update_labels = new Array(
        "#new-email-label",
        "#new-email-confirm-label",
        "#new-password-label",
        "#new-password-confirm-label",
        "#update_cc_name-label",
        "#update_cc_num-label",
        "#update_cc_cvv-label",
        "#update_cc_month-label",
        "#update_cc_street-label",
        "#update_cc_city-label",
        "#update_cc_state-label",
        "#update_cc_zip-label"
    );

    var update_fields = new Array(
        "New Email Address:",
        "Confirm New Email Address:",
        "New Password:",
        "Confirm New Password:",
        "Cardholder Name:",
        "Number:",
        "CVV:",
        "Expiration Date:",
        "Street Address:",
        "City:",
        "State:",
        "Zip Code:"
    );

    for (var i=0; i<update_labels.length; i++){
        reset_update_label(update_labels[i], update_fields[i]);
    }

}

function validate_email(email1, email2, error_array){
    console.log("Validating email address");
    var regex_email = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
    var result_test_email = regex_email.test(email1);
    
    if (!result_test_email){
        set_error_update("#new-email-label", "Please enter a valid email address", error_array);
    }
    else if (email1 != email2){
        set_error_update("#new-email-confirm-label", "Email addresses do not match", error_array);
    }
}

function validate_password(pass1, pass2, error_array, MAX_LENGTH){
    console.log("Validating password");

    if (pass1.length < 5 || pass1.length > MAX_LENGTH){
        set_error_update("#new-password-label", "Please enter a password over 5 characters", error_array);
     }
    else if (pass1 != pass2){
        set_error_update("#new-password-confirm-label", "Passwords do not match", error_array);
     }
}

function validate_cc(cc_num, cc_cvv, cc_exp_year, cc_exp_month, error_array){
    console.log("Validating credit card");
    var regex_cc_num = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    var result_test_cc_num = regex_cc_num.test(cc_num);
    
    if (!result_test_cc_num){
        set_error_update("#update_cc_num-label", "Please enter a valid credit card number", error_array);
    }

    var regex_cc_cvv = /^[0-9]{3,4}$/;
    var result_test_cc_cvv = regex_cc_cvv.test(cc_cvv);
    
    if (!result_test_cc_cvv){
        set_error_update("#update_cc_cvv-label", "Please enter a valid cvv number", error_array);
    }

    if (cc_exp_year < 2014 || cc_exp_year > 2200){
        set_error_update("#update_cc_month-label", "Please enter a valid expiration", error_array);
    }
    else if (cc_exp_month < 1 || cc_exp_month > 12){
        set_error_update("#update_cc_month-label", "Please enter a valid expiration", error_array);
    }
}

function validate_billing_address(cc_street, cc_city, cc_state, cc_zip, error_array){
    console.log("Validating billing address");
    var regex_cc_street = /^[0-9a-zA-Z. ]+$/;
    var result_test_cc_street = regex_cc_street.test(cc_street);
    
    if (!result_test_cc_street){
        set_error_update("#update_cc_street-label", "Please enter a valid street address", error_array);
    }

    var regex_cc_city = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    var result_test_cc_city = regex_cc_city.test(cc_city);
    
    if (!result_test_cc_city){
        set_error_update("#update_cc_city-label", "Please enter a valid city", error_array);
    }

    var regex_cc_zip = /^\d{5}(?:[-\s]\d{4})?$/;
    var result_test_cc_zip = regex_cc_zip.test(cc_zip);
    
    if (!result_test_cc_zip){
        set_error_update("#update_cc_zip-label", "Please enter a valid billing zip code", error_array);
    }
}

// ========================================================================================================================
// TICKET WALLET PAGE
// ========================================================================================================================

$("#ticket-wallet-list li").click(function(){
        $("#ticket-wallet-list li").attr("data-theme","c");
        $("#ticket-wallet-list li").removeClass("ui-btn-hover-g ui-btn-up-g");
        $(this).addClass("ui-btn-hover-g ui-btn-up-g");
        $(this).attr("data-theme","g");
});
