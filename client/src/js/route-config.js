import SigninCtrl from './SigninCtrl';
import passData from './pass-data';

export default function(angularModule) {
    angularModule.config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url:'/',
                template: '<home></home>'
            })
            .state('signin', {
                url: '/signin',
                template: '<signin></signin>',
                controller: SigninCtrl
            })
            .state('account', {
                url: '/account',
                template: '<account></account>',
                data: {
                    requireAuth: true
                },
                controller: AccountCtrl
            })
            .state('account.trip', {
                url: '/trips/:tripid',
                template: '<trip tripId="tripid"></trip>'
            })
            .state('account.shoplist', {
                url: '/shoplist',
                template: '<shoplist></shoplist>'
            })
            .state('random_trip', {
                url: '/random_trip',
                template: '<random-trip></random-trip>',
                controller: FeedDetailCtrl
            });
    });
}
