import appDr from './app/app';


/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
  //Nav Directives
  appDr(angularModule);

};
