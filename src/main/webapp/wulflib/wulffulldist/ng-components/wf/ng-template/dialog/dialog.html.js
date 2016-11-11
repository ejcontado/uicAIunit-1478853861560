angular.module('wf.angular.dialog').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/dialog/dialog.html",
    "<a ng-show=\"$ctrl.toggleStyle === 'link'\" href=\"javascript:void(0)\" class=\"toggle-target\" ng-keydown=\"$ctrl.keydownHandler($event)\" data-backdrop=\"false\" data-toggle=\"modal\" data-keyboard=\"true\" ng-click=\"$ctrl.open($event)\">{{$ctrl.toggleText}}</a>\n" +
    "<button ng-show=\"$ctrl.toggleStyle === 'button'\" type=\"button\" class=\"btn btn-small toggle-target\" data-toggle=\"modal\" data-target=\"#target\" ng-click=\"$ctrl.open($event)\">{{$ctrl.toggleText}}</button>\n" +
    "<div ng-keydown=\"$ctrl.keydownHandler($event)\" class=\"modal\" ng-class=\"{'active':$ctrl.active, 'transparent': $ctrl.animation, 'n-dlg-wizard' : $ctrl.isWizard}\" id=\"target\" role=\"dialog\" aria-hidden=\"false\" tabindex='-1' ng-show=\"$ctrl.isShow\" style=\"display: block;\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'n-dialog-critical':$ctrl.pattern === 'error', 'n-dialog-warning':$ctrl.pattern === 'warning', 'n-dialog-confirm':$ctrl.pattern === 'confirmation'}\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <div class=\"n-dialog-header-fg-filler\">\n" +
    "                    <h1 class=\"modal-title\" id=\"myModalLabel\">\n" +
    "                        <span class=\"icon icon-error\" ng-show=\"$ctrl.pattern === 'error'\"></span>\n" +
    "                        <span class=\"icon icon-warning\" ng-show=\"$ctrl.pattern === 'warning'\"></span>\n" +
    "                        {{$ctrl.titleText}}\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "                <div class=\"n-dialog-header-bg-filler\"></div>\n" +
    "                <div class=\"n-dialog-header-curve\">\n" +
    "                    <div class=\"fg-mask\"></div>\n" +
    "                    <div class=\"bg-mask\"></div>\n" +
    "                    <div class=\"fg-corner\"></div>\n" +
    "                    <div class=\"bg-corner\"></div>\n" +
    "                </div>\n" +
    "                <i class=\"icon icon-close-rounded\" data-dismiss=\"modal\" aria-label=\"Close\" ng-click=\"$ctrl.cancel($event)\"></i>\n" +
    "                <div style=\"clear: both\"></div>\n" +
    "                <h2 class=\"modal-title-subheading\" ng-show=\"$ctrl.pattern !== 'error' && $ctrl.pattern !== 'warning' && $ctrl.pattern !== 'confirmation'\" id=\"myModalLabelVersion\" ng-show=\"$ctrl.subheader !== undefined\">{{$ctrl.subheader}}</h2>\n" +
    "                <h2 ng-class=\"$ctrl.pattern == 'standard'? 'modal-title-instruction':'modal-title-no_subtitle'\" id=\"myModalLabelInstruction\" ng-show=\"$ctrl.instruction !== undefined\">{{$ctrl.instruction}}</h2>\n" +
    "            </div>\n" +
    "            <div ng-class=\"$ctrl.pattern == 'standard'? 'modal-body-subtitle':'modal-body'\" ng-show=\"$ctrl.pattern !== 'error' && $ctrl.pattern !== 'warning' && $ctrl.pattern !== 'confirmation'\">\n" +
    "                <div ng-transclude></div>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button class='btn btn-standard button-previous' ng-if=\"$ctrl.isWizard\" ng-click=\"$ctrl.wizardCtrl.previousStep()\" name='previous' ng-disabled=\"$ctrl.wizardCtrl.selectedStepIdx === 0\">Back</button>\n" +
    "                <button class='btn btn-standard button-next'  name='next' ng-if=\"$ctrl.isWizard\" ng-click=\"$ctrl.wizardCtrl.nextStep()\" ng-disabled=\"$ctrl.wizardCtrl.selectedStepIdx === $ctrl.wizardCtrl.steps.length - 1\">Next</button>\n" +
    "                <button class=\"btn btn-standard confirm-btn\" ng-class=\"{'btn-defaultBlue':$ctrl.pattern !== 'confirmation'}\" ng-disabled=\"($ctrl.isWizard && $ctrl.wizardCtrl.selectedStepIdx < $ctrl.wizardCtrl.steps.length - 1)\" data-dismiss=\"modal\" ng-click=\"$ctrl.confirm($event)\">{{$ctrl.confirmBtnText}}</button>\n" +
    "                <button class=\"btn btn-standard cancel-btn\" ng-class=\"{'btn-defaultBlue':$ctrl.pattern === 'confirmation'}\" data-dismiss=\"modal\" ng-click=\"$ctrl.cancel($event)\">Cancel</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
