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
        //$.mobile.changePage('#card_details');
    }
};

/* Attach FastClick to the buttons on the page when it's initialized. */
$(function() {
    FastClick.attach(document.body);

    /* Generate a select menu containing the next 10 years from now */
    var yearSelect = $("#expiration-year");
    var currentYear = new Date().getFullYear();
    var year;
    for (year = currentYear; year < currentYear + 10; year++) {
        yearSelect.append("<option value=\"" + year + "\">" + year + "</option>");
    }


    // TODO: Add tickets dynamically to list (to be done by backend later)

    var testInitTickets = [];

    testInitTickets[0] = new AvailableTicket("Metro 30 Day Full Fare (API)", 65);
    //addAvailableTicket(testInitTickets[0]);

    testInitTickets[1] = new AvailableTicket("Metro 30 Day Pass with 1 Zone (API)", 55);
    //addAvailableTicket(testInitTickets[1]);

    testInitTickets[2] = new AvailableTicket("Metro 7 Day Pass (API)", 20);
    //addAvailableTicket(testInitTickets[2]);

    testInitTickets[3] = new AvailableTicket("Metro 3 Day Pass (API)", 10);
    //addAvailableTicket(testInitTickets[3]);

    setAvailableTickets(testInitTickets);

    /* Compile templates */

    /* X template */
    //var campaign_source   = $("#campaign-template").html();
    //campaign_template = Handlebars.compile(campaign_source);
});

/* Affects all pages with panels in the application */
$(".sidePanelAccessible").on( "pageinit", function() {
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
$("#cancel-yes").on("click", function(e) {
    document.getElementById("user-info-account-create").reset();
    document.getElementById("payment-info-account-create").reset();
    $.mobile.changePage("#log-in", {transition: "slidedown"});
    return false;
});

$("#cancel-yes-2").on("click", function(e) {   
    document.getElementById("user-info-account-create").reset();
    document.getElementById("payment-info-account-create").reset();
    $.mobile.changePage("#log-in", {transition: "slidedown"});
    return false;
});

$("#cancel-yes-3").on("click", function(e) {
    document.getElementById("user-info-account-create").reset();
    document.getElementById("payment-info-account-create").reset();
    $.mobile.changePage("#log-in", {transition: "slidedown"});
    return false;
});

$("#submit-create-account").on("click", function(e) {
    // TODO: For now just transition to home page regardless.
    $.mobile.changePage("#home", {transition: "slideup"});
    return false; // Prevent default form action (causes log-in page to be reloaded on submit if we don't return false here)
});


// ========================================================================================================================
// HOME PAGE
// ========================================================================================================================

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

/* Define ticket object prototype */
var AvailableTicket = function(name, price) {
    this.name = name;
    this.price = price;
};

/* Define transit line object prototype */
var TransitLine = function(name, time) {
  this.name = name;
  this.time = time;
};

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
    $("#mytickets-list").append("<li><a href=\"#dialog-confirm-ticket\" data-rel=\"dialog\" data-transition=\"slidedown\">" + ticket.name + " - $" + ticket.price + "</a></li>");
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
    timestamp= Date.now();
    message= userid+timestamp;
    qrcode.makeCode(message);
}

$("#home").on("pageshow", function(event) {
    qrcode = new QRCode(document.getElementById("qr-code"), {
        width: $(window).width()/2,
        height: $(window).width()/2,
        correctLevel: QRCode.CorrectLevel.L
    });
    updateTimeQR();
    setInterval("updateTimeQR()", refreshRate);

    /* Get the actual QR image height */
    qrImgHeight = $("#qr-code").actual("height");

    /* Set the height of the QR divs and image to be uniform and properly animate */    
    $("#qr-front").height(qrImgHeight);
    $("#qr-code").height(qrImgHeight);
    $("#qr-back").height(qrImgHeight);

    /* Center QR tile on screen dynamically */
    $("#qr-rotation-tile").css("left", ($("#home-content").width()/2 - $(window).width()/4) + "px");

    /* Always show QR code side when page loads */
    resetCenterTile();

    /* Calculate the height of the Buy Tickets container. */
    ticketListHeight = $("#mytickets-list li").actual("height") * 3;

    /* Twitch the ticket tab to indicate its existence to user */
    teaseTicketContainer(600);

    /* Set the ticket container scrollbox height */
    $("#mytickets-list-container").height(ticketListHeight);

    /* Distribute buttons over the height of the QR image. */
    //$(".qrBtn").height(qrImgHeight/$(".qrBtn").length);
    //$(".qrBtn").css("line-height", (qrImgHeight/$(".qrBtn").length)/2 + "px"); // don't know why line height needs to be halved, but it works
});

/* Custom incrementor/decrementor */

function updateGuestTotal() {
    var curGuestNum = +$("#output-guest-num").html();
    var output = curGuestNum * 1.5;
    $("#output-total-price").html(output.toFixed(2));
}

$("#input-guest-inc").on("click", function(e) {
    var curVal = +$("#output-guest-num").html();
    if (curVal < 4) { // hardcoded for now, TODO
        $("#output-guest-num").html(curVal+1);
        updateGuestTotal();
    }
});

$("#input-guest-dec").on("click", function(e) {
    var curVal = +$("#output-guest-num").html();
    if (curVal > 1) { // hardcoded for now, TODO
        $("#output-guest-num").html(curVal-1);
        updateGuestTotal();
    }
});

/* Toggle ticket panel */
$("#mytickets").click(function() {
    toggleTicketContainer(400);
});

/* Flip QR code and show dependents. */
$("#qr-front").click(function() {
    $("#qr-front").hide( "clip", { direction: "horizontal" }, 300, function() {
        $("#qr-back").show("clip", { direction: "horizontal" }, 300, function () {});
    });

    $("#qr-front-caption").hide( "slide", { direction: "left" }, 300, function() {
        $("#qr-back-caption").show("slide", { direction: "right" }, 300, function () {});
    });
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

/* Apply to all buttons that transition to a new page. */
$(".qrShortcutBtn").button().click(function() {
    /* Reset QR code immediately after navigating to a new page so it's in place when user returns. */
    resetCenterTile();
});

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

$("#update-password").click(function() {
    var newPassword = $("#new-password").val();
    var newPasswordConfirm = $("#new-password-confirm").val();

    // Empty fields
    if (newPassword == "" && newPasswordConfirm == "") {
        $("#password-empty-label").show("fold");
    } else {
        $("#password-empty-label").hide("fold");
    }

    // Mismatched passwords
    if (newPassword != newPasswordConfirm) {
        $("#password-mismatch-label").show("fold");
    } else {
        $("#password-mismatch-label").hide("fold");
    }
});
