(function () {
    "use strict";

    var app = angular
        .module('starterApp', ['ngMaterial', 'users'])

        .config(function ($mdThemingProvider, $mdIconProvider) {
            $mdIconProvider
                .defaultIconSet("app/assets/svg/avatars.svg", 128)
                .icon("menu", "app/assets/svg/menu.svg", 24)
                .icon("share", "app/assets/svg/share.svg", 24)
                .icon("google_plus", "app/assets/svg/google_plus.svg", 512)
                .icon("hangouts", "app/assets/svg/hangouts.svg", 512)
                .icon("twitter", "app/assets/svg/twitter.svg", 512)
                .icon("phone", "app/assets/svg/phone.svg", 512);

            $mdThemingProvider.theme('default')
                .primaryPalette('brown')
                .accentPalette('red');
        });

    return {
        app: app
    };
})();