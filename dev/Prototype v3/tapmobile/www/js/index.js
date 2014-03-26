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
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        //window.location="login.html";
    }
};

$(function() {
    /* Attach FastClick to the buttons on the page when it's initialized. */
    FastClick.attach(document.body);

    /***** PLACEHOLDER CODE *******/

    // TODO: Add tickets dynamically to list (to be done by backend later)

    var testInitTickets = [];

    testInitTickets[0] = new AvailableTicket(1, "Metro 30 Day Full Fare (API)", 65);
    //addAvailableTicket(testInitTickets[0]);

    testInitTickets[1] = new AvailableTicket(2, "Metro 30 Day Pass with 1 Zone (API)", 55);
    //addAvailableTicket(testInitTickets[1]);

    testInitTickets[2] = new AvailableTicket(3, "Metro 7 Day Pass (API)", 20);
    //addAvailableTicket(testInitTickets[2]);

    testInitTickets[3] = new AvailableTicket(4, "Metro 3 Day Pass (API)", 10);
    //addAvailableTicket(testInitTickets[3]);

    setAvailableTickets(testInitTickets);

    // Hardcoded default balance value
    setTAPBalance(3);

    // Hardcoded front QR caption value
    setFrontQRCaption(new FrontQRCaption("Metro 7 Day Pass", "3/16/2014", 0));

    /***** PLACEHOLDER CODE *******/


    /* Compile templates (not being used right now, may not ever need it) */

    /* X template */
    //var campaign_source   = $("#campaign-template").html();
    //campaign_template = Handlebars.compile(campaign_source);
});


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

/* READ-ONLY: Set in verifyAndUpdateQRCodeScannable(). */
var qrCodeVisible = true;

/* A list of AvailableTicket objects available to the user to purchase. */
var availableTicketList = [];


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

/* Called by log-in submit button */
$("#log-in-form").on("submit", function(e) {




    // TODO: For now just transition to home page regardless.
    $.mobile.changePage("#home", {transition: "slideup"});
    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
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

$("#submit-create-account").on("click", function(e) {
    //Clear previous error messages
    $("#fname-label").css('color', 'rgb(0,0,0)');
    $("#lname-label").css('color', 'rgb(0,0,0)');
    $("#email-label").css('color', 'rgb(0,0,0)');
    $("#pass-label").css('color', 'rgb(0,0,0)');
    $("#pass2-label").css('color', 'rgb(0,0,0)');
    $("#cc_num-label").css('color', 'rgb(0,0,0)');
    $("#cc_cvv-label").css('color', 'rgb(0,0,0)');
    $("#cc_exp-label").css('color', 'rgb(0,0,0)');
    $("#cc_zip-label").css('color', 'rgb(0,0,0)');

    $("#fname-label").html("<b>First Name:</b>");
    $("#lname-label").html("<b>Last Name:</b>");
    $("#email-label").html("<b>Email Address:</b>");
    $("#pass-label").html("<b>Password:</b>");
    $("#pass2-label").html("<b>Confirm Password:</b>");
    $("#cc_num-label").html("<b>Credit Card Number:</b>");
    $("#cc_cvv-label").html("<b>CVV:</b>");
    $("#cc_exp-label").html("<b>Expiration Date:</b>");
    $("#cc_zip-label").html("<b>Billing Zip Code:</b>");

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
        set_error("fname", "Please enter a first name", error_array);
    }

    if (!lname){
        set_error("lname", "Please enter a last name", error_array);
    }

    /* Check to make sure name fields do not exceed max length */
    if (fname.length > MAX_LENGTH){
        set_error("fname", "First name exceeds max length", error_array);
    }

    if (lname.length > MAX_LENGTH){
        set_error("lname", "Last name exceeds max length", error_array);
    }

    /*  Validate email address  */
    var regex_email = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
    var result_test_email = regex_email.test(email);
    if (!result_test_email){
        set_error("email", "Please enter a valid email address", error_array);
    }

    /* Validate password */
    //length: must be greater at least 5 characters and no greater than max length
    if (pass1.length < 5 || pass1.length > MAX_LENGTH){
        set_error("pass", "Please enter a password within correct length range", error_array);
    }
    else if (pass1 != pass2){
        set_error("pass", "Passwords do not match", error_array);
    }

    //Get account page 2 values
    var cc_num = $("#cc_num").val();
    var cc_cvv = $("#cc_cvv").val();
    var cc_exp = $("#cc_exp").val();
    var cc_zip = $("#cc_zip").val();

    //Validate page 2 values
    var regex_cc_num = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    var result_test_cc_num = regex_cc_num.test(cc_num);
    if (!result_test_cc_num){
        set_error("cc_num", "Please enter a valid credit card number", error_array);
    }

    var regex_cc_cvv = /^[0-9]{3,4}$/;
    var result_test_cc_cvv = regex_cc_cvv.test(cc_cvv);
    if (!result_test_cc_cvv){
        set_error("cc_cvv", "Please enter a valid cvv number", error_array);
    }

    var test_cc_exp = cc_exp.split('-'); //value from input as yyyy-mm
    if (test_cc_exp[0] < 2014 || test_cc_exp > 2200){
        set_error("cc_exp", "Please enter a valid expiration", error_array);
    }
    else if (test_cc_exp[1] < 1 || test_cc_exp[1] > 12){
        set_error("cc_exp", "Please enter a valid expiration", error_array);
    }

    var regex_cc_zip = /^\d{5}(?:[-\s]\d{4})?$/;
    var result_test_cc_zip = regex_cc_zip.test(cc_zip);
    if (!result_test_cc_zip){
        set_error("cc_zip", "Please enter a valid billing zip code", error_array);
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
            else if (error_array[i].field == "cc_zip"){
                $("#cc_zip-label").css('color', 'rgb(200,0,0)');
                $("#cc_zip-label").append("<br>" + error_array[i].msg);
                page = set_page_redirect(page, 2);
            }
        }
        if(page==1)
            $.mobile.changePage("#account-create-1", {transition: "slideup"});
        else
            $.mobile.changePage("#account-create-2", {transition: "slideup"});
    }
    else{
    //If front end validation passes fire Ajax
    //Writes new user to server through PHP script
     $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/newUser.php',
        //dataType:'json',
        data: {
            fname:$('#acc-create-fname').val(),
            lname:$('#acc-create-lname').val(),
            email:$('#acc-create-email').val(),
            password:$('#acc-create-password2').val()
        },
        success : function(data) {

            var parsedstring= $.parseJSON(data);

            if(parsedstring) {
                alert("Email already exists on database");
            }
            if(!parsedstring)  {
                $.mobile.changePage("#home", {transition: "slideup"});
            }

        },
        error: function(data, textStatus) {



            $.mobile.changePage("#home", {transition: "slideup"});
        },
        error: function(data) {
            alert("Server Error Has Occured");
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
    //To Do: link to payment gateway
    console.log("Charged $" + charge_amount);
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
// Object Prototypes
// ----------------------------------------------------------------------

/* Define transit line object prototype */
var TransitLine = function(transitName, arrivalTime) {
  this.transitName = transitName;
  this.arrivalTime = arrivalTime;
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

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

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
 * Description: Set the first nearest transit line.
 * Input: A TransitLine object
 * Output: N/A
 * Error: N/A
 */
function setClosestTransit1(transitLine) {

}

/*
 * Description: Set the second nearest transit line.
 * Input: A TransitLine object
 * Output: N/A
 * Error: N/A
 */
function setClosestTransit2(transitLine) {

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

    /* Always show QR code side when page loads */
    resetCenterTile();

    /* Check if QR code should be displayed or hidden */
    verifyAndUpdateQRCodeScannable();
});

/* Called after the home page is fully transitioned */
$("#home").on("pageshow", function(event) {
    /* Center QR tile on screen dynamically */
    //$("#qr-rotation-tile").css("left", ($("#home-content").width()/2 - $(window).width()/4) + "px");
    $("#qr-rotation-tile").animate({left: ($("#home-content").width()/2 - $(window).width()/4) + "px"}, 200);

    /* Calculate the height of the Buy Tickets container. */
    ticketListHeight = $("#mytickets-list li").actual("height") * 3;

    /* Set the ticket container scrollbox height */
    $("#mytickets-list-container").height(ticketListHeight);

    /* Twitch the ticket tab to indicate its existence to user */
    teaseTicketContainer(600);
});

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

/* Flip QR code and show dependents. */
$("#qr-front").click(function() {
    if (qrCodeVisible) {
        /* Reset data */
        updateGuestTotal(numGuests);

        /* Animation */
        $("#qr-front").hide( "clip", { direction: "horizontal" }, 300, function() {
            $("#qr-back").show("clip", { direction: "horizontal" }, 300, function () {});
        });

        $("#qr-front-caption").hide( "slide", { direction: "left" }, 300, function() {
            $("#qr-back-caption").show("slide", { direction: "right" }, 300, function () {});
        });
    }
});

/* Flip dependents and show QR code. */
$(".qrFlipBack").button().click(function() {
    $("#qr-back").hide( "clip", { direction: "horizontal" }, 300, function() {
        $("#qr-front").show("clip", { direction: "horizontal" }, 300, function () {});
    });
    
    $("#qr-back-caption").hide( "slide", { direction: "left" }, 300, function() {
        $("#qr-front-caption").show("slide", { direction: "right" }, 300, function () {});
    });
});

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
    validateAccountForm();
    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
});

/* TODO: Placeholder for account delete button */


/* Validation */
function validateAccountForm() {
    var email1 = document.forms["AccountSettingsForm"]["new-email"].value;
    var email2 = document.forms["AccountSettingsForm"]["new-email-confirm"].value;

    var pw1 = document.forms["AccountSettingsForm"]["new-password"].value;
    var pw2 = document.forms["AccountSettingsForm"]["new-password-confirm"].value;

    var cardnumber = document.forms["AccountSettingsForm"]["card-number"].value;
    var cvv = document.forms["AccountSettingsForm"]["card-CVV"].value;
    var cardname = document.forms["AccountSettingsForm"]["cardholder-name"].value;

    var validEmail1 = validateEmail(email1);
    var validEmail2 = (email1 == email2);
    var validPw1 = validatePassword(pw1);
    var validPw2 = (pw1 == pw2);
    var validCardnumber = validateCardNumber(cardnumber);
    var validCVV = validateCVV(cvv);
    var validCardname = validateName(cardname);

    var email1Warning, email2Warning, pw1Warning, pw2Warning, cardnumberWarning, cvvWarning, cardnameWarning, finalAlert;

    if (!validEmail1) email1Warning = "Error - You entered: \"" + email1 + "\". Please enter an email in xxx@xxx.xxx format. \n\n";
    else email1Warning = "";

    if (!validEmail2) email2Warning = "Error - You entered: \"" + email2 + "\". Emails do not match. \n\n";
    else email2Warning = "";

    if (!validPw1) pw1Warning = "Please enter a password with more than 5 non-space characters.\n\n";
    else pw1Warning = "";

    if (!validPw2) pw2Warning = "Passwords do not match.\n\n";
    else pw2Warning = "";

    if (!validCardnumber) cardnumberWarning = "Error - You entered: \"" + cardnumber + "\". Please enter a card number with exactly 16 digits.\n\n";
    else cardnumberWarning = "";

    if (!validCVV) cvvWarning = "Error - You entered: \"" + cvv + "\". Please enter a CVV with exactly 3 digits.\n\n";
    else cvvWarning = "";

    if (!validCardname) cardnameWarning = "Error - You entered: \"" + cardname + "\". Please enter a name with at least two letter characters.\n\n";
    else cardnameWarning = "";

    //if (!validEmail1 || !validEmail2 || !validPw1 || !validPw2 || !validCardnumber || !validCVV || !validCardname) finalAlert = email1Warning + email2Warning + pw1Warning + pw2Warning + cardnumberWarning + cvvWarning + cardnameWarning;
    //else finalAlert = "No errors found."

    document.getElementById('AccountEmail1Alert').innerHTML = email1Warning;
    document.getElementById('AccountEmail2Alert').innerHTML = email2Warning;
    document.getElementById('AccountPw1Alert').innerHTML = pw1Warning;
    document.getElementById('AccountPw2Alert').innerHTML = pw2Warning;
    document.getElementById('AccountCardNumberAlert').innerHTML = cardnumberWarning;
    document.getElementById('AccountCVVAlert').innerHTML = cvvWarning;
    document.getElementById('AccountCardNameAlert').innerHTML = cardnameWarning;

    //alert(finalAlert);

    return false;
}

function validateName(fn) {
    var isValid = true;
    var reFNletters = /^[a-zA-Z]{2,}$/

    if (fn.search(reFNletters) == -1) { //at least 2 letters
        isValid = false;
    }

    return isValid;
}

function validatePassword(pw) {
    var isValid = true;
    var pwFormat = /^\S{5,}$/

    if (pw.search(pwFormat) == -1) { //at least 5 non space characters
        isValid = false;
    }

    return isValid;
}

function validateEmail(em) {
    var isValid = true;
    var emailFormat = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

    if (em.search(emailFormat) == -1) { //need email to be in xxx@xxx.xxx format
        isValid = false;
    }

    return isValid;
}

function validateCardNumber(cn) {
    var isValid = true;

    var re16digit = /^\d{16}$/

    if (!(cn.search(re16digit) != -1)) { //16 digit
        isValid = false;
    }

    return isValid;
}

function validateCVV(cvv) {
    var isValid = true;

    var re3digit = /^\d{3}$/

    if (!(cvv.search(re3digit) != -1)) { //3 digit
        isValid = false;
    }

    return isValid;
}
