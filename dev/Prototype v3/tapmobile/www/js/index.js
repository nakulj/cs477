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

}

/*
 * Description: Append a ticket to the "Buy Tickets" tab on the home screen.
 * Input: A ticket object.
 * Output: N/A
 * Error: N/A
 */
function addTicket() {
    
}

// ----------------------------------------------------------------------
// Private
// ----------------------------------------------------------------------

// Public data
var qrImgHeight;
var ticketListHeight;

$("#home").on("pageshow", function(event) {
    /* Get the actual QR image height */
    qrImgHeight = $("#qr-img").actual("height");

    /* Set the height of the QR divs and image to be uniform and properly animate */    
    $("#qr-front").height(qrImgHeight);
    $("#qr-img").height(qrImgHeight);
    $("#qr-back").height(qrImgHeight);

    /* Always show QR code side when page loads */
    resetCenterTile();

    /* Calculate the height of the Buy Tickets container. */
    ticketListHeight = $("#mytickets-list li").actual("height") * 3;

    /* Twitch the ticket tab to indicate its existence to user */
    teaseTicketContainer(600);

    /* Set the ticket container scrollbox height */
    $("#mytickets-list-container").height(ticketListHeight);

    /* Distribute buttons over the height of the QR image. */
    $(".qrBtn").height(qrImgHeight/$(".qrBtn").length);
    $(".qrBtn").css("line-height", (qrImgHeight/$(".qrBtn").length)/2 + "px"); // don't know why line height needs to be halved, but it works
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
$("#qr-back-btn").button().click(function() {
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
