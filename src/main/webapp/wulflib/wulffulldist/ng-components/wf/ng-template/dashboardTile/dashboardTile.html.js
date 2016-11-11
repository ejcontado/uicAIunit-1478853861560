angular.module('wf.angular.dashboardTile').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/dashboardTile/dashboardTile.html",
    "<div class=\"n-tile\" ng-class=\"{'warn':$ctrl.warnStatus, 'normal':$ctrl.normalStatus, 'blocked': $ctrl.blocked}\">\n" +
    "    <div class=\"n-tile-left\">\n" +
    "        <div class=\"n-tile-title\">{{$ctrl.tileTitle||'--'}}</div>\n" +
    "        <div class=\"n-tile-content\">\n" +
    "            <p class=\"n-tile-state\">{{$ctrl.status||'--'}}</p>\n" +
    "            <p class=\"n-tile-frq\">FRQ: {{$ctrl.tileFrq||'--'}} Mhz</p>\n" +
    "            <p class=\"n-tile-id\">ID: {{$ctrl.tileId||'--'}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"n-tile-right\">\n" +
    "        <div ng-class=\"$ctrl.pieClass\">\n" +
    "            <div class=\"ppc-progress\">\n" +
    "                <div ng-style=\"$ctrl.rotate\" class=\"ppc-progress-fill\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"ppc-percents\">\n" +
    "                <div class=\"pcc-percents-wrapper\">\n" +
    "                    <span>{{$ctrl.maskData||'--'}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <p class=\"pie-title\">HW Status</p>\n" +
    "    </div>\n" +
    "</div>");
}]);
