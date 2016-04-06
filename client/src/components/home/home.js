import template from './home.html';

export default function(AngularModule) {
  AngularModule.directive('home', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    };
  });
}
