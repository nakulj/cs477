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
    for (var year = currentYear; year < currentYear + 10; year++) {
        yearSelect.append("<option value=\"" + year + "\">" + year + "</option>");
    }

    /* Compile templates */

    /* X template */
    //var campaign_source   = $("#campaign-template").html();
    //campaign_template = Handlebars.compile(campaign_source);
});

$("#intro").on("pageinit", function() {
});

$(".sidePanelAccessible").on( "pageinit", function() {
    var pageId = $(this).attr("id");
    $(this).on( "swiperight", function( e ) {
        // Check if panel is open already
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            $("#" + pageId + " .settings-panel").panel( "open" );
        }
    });
});

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

$("#mytickets").click(function() {
    $("#mytickets-list").toggle({
        effect:"slide",
        duration: 200
    });
});
