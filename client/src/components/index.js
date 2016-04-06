import appDr from './app/app.js';
import header from './header/header.js';

export default function(angularModule) {

  appDr(angularModule);
  header(angularModule);

}
