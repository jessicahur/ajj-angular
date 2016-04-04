import template from './app.html';

export default function(AngularModule) {
  AngularModule.directive('app', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    };
  });
}
