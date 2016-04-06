import appDr from './app/app';
import header from './header/header';
import nav  from './nav-bar/nav-bar';

export default function(angularModule) {

  appDr(angularModule);
  header(angularModule);
  nav(angularModule);

}
