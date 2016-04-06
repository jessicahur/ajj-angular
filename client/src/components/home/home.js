import template from './home.html';

export default function(AngularModule) {
  AngularModule.directive('home', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      controller: function($scope, $http) {
        //Initiate scope variables
        $scope.carYear = '';
        $scope.carMake = '';
        $scope.carModel = '';
        $scope.carEngine = '';
        $scope.years = [];
        $scope.makes = [];
        $scope.models = [];
        $scope.engines = [];

        //Fill in Years
        var today = new Date();
        var year = today.getFullYear();
        for (let ii = 1984; ii <= year; ii++) {
          $scope.years.push(ii);
        }

        //After user chooses a year, send http call for car make
        $scope.fetchMake = function() {
          $http.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${$scope.carYear}`)
               .then(res => {
                  $scope.makes = res.data.menuItem;
                  console.log(res);
               })
               .catch(err => {
                  console.log(err);
               });
        };

        //Http call for car model
        $scope.fetchModel = function() {
          $http.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${$scope.carYear}&make=${$scope.carMake}`)
               .then(res => {
                  if (res.data.menuItem.length){
                    $scope.models = res.data.menuItem;
                  } else {
                    $scope.models.push(res.data.menuItem);
                  }
               })
               .catch(err => {
                console.log(err);
               });
        };

        //Http call for car engine
        $scope.fetchEngine = function() {
          $http.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${$scope.carYear}&make=${$scope.carMake}&model=${$scope.carModel}`)
               .then(res => {
                  if (res.data.menuItem.length){
                    $scope.engines = res.data.menuItem;
                    console.log(res.data);
                  } else {
                    $scope.engines.push(res.data.menuItem);
                  }
               })
               .catch(err => {
                console.log(err);
               });
        };

        //Http call for specific car mileage
        $scope.fetchMileage = function() {
          var engine = $scope.engines.filter(engine => { return engine.text === $scope.carEngine; });
          if ($scope.carYear.length !== 0 && $scope.carMake.length !== 0 && $scope.carModel.length !== 0 && $scope.carEngine.length !== 0) {
            $http.get(`https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${engine[0].value}`)
                 .then(res => {
                    if (res.status === 204) {
                      $scope.message = 'Sorry, we cannot find the mileage for your car';
                    } else {
                      $scope.message = '';
                      $scope.avgMpg = Math.floor(res.data.avgMpg*100)/100;
                    }
                  })
                 .catch(err => {
                  console.log(err);
                 });
          }
        };
      }
    };
  });
}
