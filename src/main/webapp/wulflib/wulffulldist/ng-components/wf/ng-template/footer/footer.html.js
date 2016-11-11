angular.module('wf.angular.footer').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/footer/footer.html",
    "<div  class=\"n-footer-bordered\">\n" +
    "    <div class=\"n-footer-left\" ng-if=\"$ctrl.links !== undefined\">\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"link in $ctrl.links\"><a ng-href=\"{{link.href}}\" class=\"n-footer-links\">{{link.name}}</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"n-footer-right\">\n" +
    "        <div class=\"n-footer-copyright\" ng-if=\"$ctrl.copyright !== undefined\">\n" +
    "            &copy;{{$ctrl.copyright}}\n" +
    "        </div>\n" +
    "        <div class=\"n-footer-icons\" ng-if=\"$ctrl.icons !== undefined\">\n" +
    "            <a  ng-repeat=\"item in $ctrl.icons\" ng-href=\"{{item.href}}\" class=\"item-icon\">\n" +
    "                <img ng-src=\"{{item.src}}\">\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
