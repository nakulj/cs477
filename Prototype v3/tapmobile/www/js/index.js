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
/*
 * TODO
 */

/*
 * Description: Define a list of ticket objects to make available in the "Buy Tickets" tab on the home screen.
 * Input: A list of ticket objects to make available on the front end.
 * Output: N/A
 * Error: Fails if any ticket in list is invalid.
 */
function setAvailableTickets(ticketList)
{

}

/*
 * Description: Append a ticket to the "Buy Tickets" tab on the home screen.
 * Input: A ticket object.
 * Output: N/A
 * Error: Fails if given invalid ticket object.
 */
function addTicket()
{
    
}

// ----------------------------------------------------------------------
// Private functions
// ----------------------------------------------------------------------

var qrImgHeight;
$("#home").on("pageshow", function(event) {
    qrImgHeight = $("#qr-img").actual("height");
    $("#qr-front").height(qrImgHeight);
    $("#qr-img").height(qrImgHeight);
    $("#qr-back").height(qrImgHeight);

    resetCenterTile();
});

/* Toggle ticket panel */
$("#mytickets").click(function() {
    $("#mytickets-list").toggle({
        effect:"slideup",
        duration: 200
    });
});

$("#qr-front").click(function() {
    $("#qr-front").hide( "clip", { direction: "horizontal" }, 300, function() {
        $("#qr-back").show("clip", { direction: "horizontal" }, 300, function () {});
    });

    $("#qr-front-caption").hide( "slide", { direction: "left" }, 300, function() {
        $("#qr-back-caption").show("slide", { direction: "right" }, 300, function () {});
    });
});

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
    resetCenterTile();
});

function resetCenterTile() {
    $("#qr-back").hide();
    $("#qr-back-caption").hide();
    $("#qr-front").show();
    $("#qr-front-caption").show();
}

// ========================================================================================================================
// ACCOUNT SETTINGS PAGE
// ========================================================================================================================


// ----------------------------------------------------------------------
// Private functions
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
