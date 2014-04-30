cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.badrit.Backbutton/www/Backbutton.js",
        "id": "com.badrit.Backbutton.Backbutton",
        "clobbers": [
            "navigator.Backbutton"
        ]
    },
    {
        "file": "plugins/localnotification/www/localnotification.js",
        "id": "localnotification.LocalNotification",
        "clobbers": [
            "localNotifier"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
        "id": "org.apache.cordova.geolocation.Coordinates",
        "clobbers": [
            "Coordinates"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
        "id": "org.apache.cordova.geolocation.PositionError",
        "clobbers": [
            "PositionError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
        "id": "org.apache.cordova.geolocation.Position",
        "clobbers": [
            "Position"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
        "id": "org.apache.cordova.geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugin.statusbar/www/statusbar.js",
        "id": "com.phonegap.plugin.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.badrit.Backbutton": "0.1.0",
    "localnotification": "0.1.0",
    "org.apache.cordova.geolocation": "0.3.8-dev",
    "com.phonegap.plugin.statusbar": "1.1.0"
}
// BOTTOM OF METADATA
});