cordova.define("com.badrit.Backbutton.Backbutton", function(require, exports, module) { var Backbutton = {

    goHome: function(successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, 'BackbuttonPlugin',
            'goHome', []);
    }
};

module.exports = Backbutton;
});
