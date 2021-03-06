angular.module('wf.angular.login').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/login/login.html",
    "<div class=\"n-login-wrapper\">\n" +
    "    <div ng-hide=\"$ctrl.isAcceptanceShow\" class=\"n-login\"\n" +
    "         ng-class=\"{'n-login-signup':$ctrl.loginType === 'signup','n-login-product':$ctrl.loginType === 'product',\n" +
    "         'n-login-legal-copy':$ctrl.loginType === 'legalcopy','n-login-with-four-column':$ctrl.loginType === 'withfourcolumn'}\">\n" +
    "        <div class=\"n-login-logo\">\n" +
    "            <img src=\"../wulfdist/img/logo.png\" width=\"110\" height=\"19\" alt=\"Nokia logo\"/>\n" +
    "        </div>\n" +
    "        <div class=\"panel panel-shadow panel-blue-cap\">\n" +
    "            <h1 class=\"n-login-title\">{{$ctrl.titleText}}</h1>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <h2 class=\"n-login-title-version-light\">{{$ctrl.version}}</h2>\n" +
    "                <p class=\"n-login-product-name\" ng-if=\"$ctrl.loginType === 'product'\">{{$ctrl.productText}}</p>\n" +
    "                <div class=\"n-login-panel-fields\">\n" +
    "                    <div class=\"form-horizontal\"  method=\"post\">\n" +
    "                        <div class=\"alert-error\" ng-show=\"$ctrl.isAlertErrorShow\" ng-if=\"$ctrl.loginType === 'error'\">\n" +
    "                            <span class=\"icon icon-error\"></span>{{$ctrl.errorText}}\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group n-login-textfields\">\n" +
    "                            <div class=\"col-sm-6 input-required\">\n" +
    "                                <input name=\"username\" type=\"text\" class=\"form-control n-inputfield\" ng-model=\"$ctrl.usernameValue\"\n" +
    "                                       id=\"applicationLoginUsername\"\n" +
    "                                       placeholder=\"Username\">\n" +
    "                                <a class=\"form-control-feedback\">\n" +
    "                                    <span class=\"icon\"\n" +
    "                                          ng-class=\"{'icon-mandatory':$ctrl.usernameValue===undefined || $ctrl.usernameValue.length===0}\"></span></a>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6 input-required\">\n" +
    "                                <input name=\"password\" type=\"password\"  class=\"form-control n-inputfield\" ng-model=\"$ctrl.passwordValue\"\n" +
    "                                       id=\"applicationLoginPassword\"\n" +
    "                                       placeholder=\"Password\">\n" +
    "                                <a class=\"form-control-feedback form-control-feedback\">\n" +
    "                                    <span class=\"icon\"\n" +
    "                                          ng-class=\"{'icon-mandatory':$ctrl.passwordValue===undefined ||$ctrl.passwordValue.length===0}\"></span></a>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"n-login-action\">\n" +
    "                            <div class=\"n-login-forget-password\">\n" +
    "                                <a ng-class=\"{'n-link-visited':$ctrl.forgetPasswordVisited}\" ng-click=\"$ctrl.forgotPsw($event)\" href=\"#\">Forgot password</a>\n" +
    "                                <span class=\"icon icon-breadcrumb\"></span>\n" +
    "                            </div>\n" +
    "                            <button type=\"submit\" class=\"btn btn-defaultBlue btn-standard n-login-button\"\n" +
    "                                    id=\"applicationLoginButton\" ng-click=\"$ctrl.clickLoginButton($event)\"\n" +
    "                                    ng-disabled=\"!($ctrl.usernameValue.length>0 && $ctrl.passwordValue.length>0)\">Log In\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"n-login-action n-login-sign-up-bar\" ng-if=\"$ctrl.loginType === 'signup'\">\n" +
    "                    <span>Don't have an account?</span>\n" +
    "                    <button class=\"btn btn-standard\" ng-click=\"$ctrl.signUp($event)\">Sign Up</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"n-login-legal-copy-text\" ng-if=\"$ctrl.loginType === 'legalcopy'\">\n" +
    "                {{$ctrl.legalcopyText}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"n-login n-login-legal-acceptance\" ng-show=\"$ctrl.isAcceptanceShow\" ng-if=\"$ctrl.loginType === 'acceptance'\">\n" +
    "        <div class=\"n-login-logo\">\n" +
    "            <img src=\"../wulfdist/img/logo.png\" width=\"110\" height=\"19\" alt=\"Nokia logo\"/>\n" +
    "        </div>\n" +
    "        <div id='TA_login_shadow' class=\"panel panel-shadow panel-blue-cap\">\n" +
    "            <h1 class=\"n-login-title\">{{$ctrl.titleText}}</h1>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <h2 class=\"n-login-title-version-light\">{{$ctrl.version}}</h2>\n" +
    "\n" +
    "                <div class=\"n-login-panel-fields\">\n" +
    "                    {{$ctrl.acceptanceText}}\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "            <div class=\"n-login-footer\">\n" +
    "                <button type=\"submit\" class=\"btn btn-standard btn-defaultBlue n-login-button\"\n" +
    "                        id=\"applicationLoginAcceptButton\">Accept\n" +
    "                </button>\n" +
    "                <br>\n" +
    "                <br>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"n-login-four-column\" ng-if=\"$ctrl.loginType === 'withfourcolumn'\" ng-transclude>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"small n-login-copyright\">&copy; {{$ctrl.copyright}}</div>");
}]);
