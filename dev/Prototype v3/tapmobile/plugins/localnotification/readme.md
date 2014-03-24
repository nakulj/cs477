Cordova/PhoneGap Local Notification Plugin
------------------------------------------

A Cordova/PhoneGap 3.0.0+ plugin to create local notifications on iOS, originally by [Olivier Lesnicki](https://github.com/olivierlesnicki/cordova-ios-LocalNotification). This may be used to 
schedule notifications or other functions that trigger at some point in the future.

Installing the plugin
---------------------

Install the core plugin files via the [Command-line Interface](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface):

    $ phonegap local plugin add https://github.com/hiattp/Phonegap-LocalNotification.git

In `platforms/ios/CordovaLib/Classes/CDVPlugin.m` uncomment the following line:

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveLocalNotification:) name:CDVLocalNotification object:nil];

In `platforms/ios/CordovaLib/Classes/CDVPlugin.m` uncomment the following lines at the end of the file:

    - (void)didReceiveLocalNotification:(NSNotification *)notification
    {
       // UILocalNotification* localNotification = [notification object]; // get the payload as a LocalNotification
    }

In `platforms/ios/CordovaLib/Classes/CDVPlugin.h` uncomment the following line:

    - (void)didReceiveLocalNotification:(NSNotification *)notification;

Place any `.caf` audio files into the `Resources` folder in Xcode. The `horn.caf` file has been included in this repo as an example. Note that the sound only plays if the notification is triggered while the app is in the background.

Using the plugin
----------------

Within the `www/js/index.js` file, or any other included js files, the following will trigger a local notification after 5 seconds:

    localNotifier.addNotification({
    	fireDate        : Math.round(new Date().getTime()/1000 + 5),
    	alertBody       : "This is a new local notification.",
    	repeatInterval  : "daily",
    	soundName       : "horn.caf",
    	badge           : 0,
    	notificationId  : 123,
    	foreground      : function(notificationId){ 
    		alert("Hello World! This alert was triggered by notification " + notificationId); 
    	},
    	background	: function(notificationId){
    		alert("Hello World! This alert was triggered by notification " + notificationId);
    	}    		
    });

Uninstalling the plugin
-----------------------

To uninstall the plugin and its components, use:

    $ phonegap local plugin remove localnotification

Note: You may also want to comment out the files above that were necessary for installation.
