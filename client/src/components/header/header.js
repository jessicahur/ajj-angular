import template from './header.html';

export default function(AngularModule) {
  AngularModule.directive('header', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    };
  });
}
