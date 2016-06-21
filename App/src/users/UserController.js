(function () {
    "use strict";

    angular
         .module('users')
         .controller('UserController', ['userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', UserController]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function UserController(userService, $mdSidenav, $mdBottomSheet, $timeout, $log) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.toggleList = toggleUsersList;
        self.makeContact = makeContact;
        self.chips = ["BMW", "Volvo", "Mercedes", "Ferrari", "Mazda", "Tesla"];

        console.log('self.chips', self.chips);
        // Load all registered users

        userService
              .loadAllUsers()
              .then(function (users) {
                  self.users = [].concat(users);
                  self.selected = users[0];
              });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser(user) {
            self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        }

        /**
         * Show the Contact view in the bottom sheet
         */
        function makeContact(selectedUser) {

            $mdBottomSheet.show({
                controllerAs: "vm",
                templateUrl: 'app/src/users/view/contactSheet.html',
                controller: ['$mdBottomSheet', ContactSheetController],
                parent: angular.element(document.getElementById('content'))
            }).then(function (clickedItem) {
                $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * User ContactSheet controller
             */
            function ContactSheetController($mdBottomSheet) {
                this.user = selectedUser;
                this.items = [
                  { name: 'Phone', icon: 'phone', icon_url: 'app/assets/svg/phone.svg' },
                  { name: 'Twitter', icon: 'twitter', icon_url: 'app/assets/svg/twitter.svg' },
                  { name: 'Google+', icon: 'google_plus', icon_url: 'app/assets/svg/google_plus.svg' },
                  { name: 'Hangout', icon: 'hangouts', icon_url: 'app/assets/svg/hangouts.svg' }
                ];
                this.contactUser = function (action) {
                    // The actually contact process has not been implemented...
                    // so just hide the bottomSheet

                    $mdBottomSheet.hide(action);
                };
            }
        }
    }
})();