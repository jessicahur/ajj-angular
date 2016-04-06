import template from './nav-bar.html';

export default function(AngularModule) {
  AngularModule.directive('navBar', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    };
  });
}
