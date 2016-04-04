import angular      from 'angular';
import angularRouter from 'angular-ui-router';
import components   from './components';
import routeConfig from './js/route-config';
import AppCtrl      from './js/AppCtrl';


/**
 * CSS imports:
 */

// import './node_modules/angular-toastr/dist/angular-toastr.css';

//import './scss/main.scss';

/**
 * App Setup:
 */

const app = angular.module('myApp', [angularRouter]);

app.constant( 'baseUrl', BASE_URL)
   .controller('AppController', AppCtrl);

components(app);
routeConfig(app);

// document.body.innerHTML = main;
// angular.bootstrap(document, [app.name], {});
