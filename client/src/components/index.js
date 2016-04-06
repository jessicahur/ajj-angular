import appDr from './app/app';
import header from './header/header';
import nav  from './nav-bar/nav-bar';
import home from './home/home';

export default function(angularModule) {

  appDr(angularModule);
  header(angularModule);
  nav(angularModule);
  home(angularModule);

}
