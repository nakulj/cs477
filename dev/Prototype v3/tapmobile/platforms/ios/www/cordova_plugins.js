cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/localnotification/www/localnotification.js",
        "id": "localnotification.LocalNotification",
        "clobbers": [
            "localNotifier"
        ]
    }
]
});