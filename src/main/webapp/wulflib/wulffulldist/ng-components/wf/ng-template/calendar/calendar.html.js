angular.module('wf.angular.calendar').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/calendar/calendar.html",
    "<div class=\"datepicker fuelux\">\n" +
    "    <div class=\"input-group n-calendar\" ng-class=\"{'n-calendar-lock-past' : $ctrl.disablePastDays}\">\n" +
    "        <input class=\"form-control n-inputfield\" type=\"text\" ng-disabled=\"$ctrl.disable\">\n" +
    "        <div class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"$ctrl.disable\">\n" +
    "                <span class=\"glyphicon glyphicon-calendar\"></span>\n" +
    "                <span class=\"sr-only\">Toggle Calendar</span>\n" +
    "            </button>\n" +
    "            <div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">\n" +
    "                <div class=\"datepicker-calendar\">\n" +
    "                    <div class=\"datepicker-calendar-header\">\n" +
    "                        <button type=\"button\" class=\"prev\"><span\n" +
    "                                class=\"glyphicon glyphicon-chevron-left\" ng-click=\"$ctrl.moveMonth(0)\"></span><span class=\"sr-only\">Previous Month</span>\n" +
    "                        </button>\n" +
    "                        <button type=\"button\" class=\"next\"><span\n" +
    "                                class=\"glyphicon glyphicon-chevron-right\" ng-click=\"$ctrl.moveMonth(1)\"></span><span class=\"sr-only\">Next Month</span>\n" +
    "                        </button>\n" +
    "                        <button type=\"button\" class=\"title\">\n" +
    "                                <span class=\"month\">\n" +
    "                                    <span data-month=\"0\">January</span>\n" +
    "                                    <span data-month=\"1\">February</span>\n" +
    "                                    <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span\n" +
    "                                        data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span\n" +
    "                                        data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span\n" +
    "                                        data-month=\"8\">September</span>  <span\n" +
    "                                        data-month=\"9\">October</span>  <span\n" +
    "                                        data-month=\"10\">November</span>  <span\n" +
    "                                        data-month=\"11\">December</span></span> <span class=\"year\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <table class=\"datepicker-calendar-days\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>SUN</th>\n" +
    "                            <th>MON</th>\n" +
    "                            <th>TUE</th>\n" +
    "                            <th>WED</th>\n" +
    "                            <th>THU</th>\n" +
    "                            <th>FRI</th>\n" +
    "                            <th>SAT</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody></tbody>\n" +
    "                    </table>\n" +
    "                    <div class=\"datepicker-calendar-timer\">\n" +
    "                        <div class=\"spinner-container datepicker-calendar-hour\">\n" +
    "                            <div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\"\n" +
    "                                                                                  class=\"form-control spinbox-input n-inputfield\">\n" +
    "                                <div class=\"spinbox-buttons btn-group btn-group-vertical\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button>\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"spinner-container datepicker-calendar-minute\">\n" +
    "                            <div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\"\n" +
    "                                                                                  class=\"form-control spinbox-input n-inputfield\">\n" +
    "                                <div class=\"spinbox-buttons btn-group btn-group-vertical\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button>\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"spinner-container datepicker-calendar-AMPM\">\n" +
    "                            <div class=\"spinbox\" data-initialize=\"spinbox\"><input id=\"s-normal\" type=\"text\" tabIndex=\"-1\"\n" +
    "                                                                                  class=\"form-control spinbox-input n-inputfield n-inputfield-uneditable\"\n" +
    "                                                                                  readonly>\n" +
    "                                <div class=\"spinbox-buttons btn-group btn-group-vertical\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button>\n" +
    "                                    <button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span\n" +
    "                                            class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <input type=\"text\" tabIndex=\"-1\"\n" +
    "                                   class=\"form-control spinbox-input n-inputfield ampm n-inputfield-uneditable\" readonly></div>\n" +
    "                        <div class=\"operator-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-small now\">Now</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-defaultBlue btn-small done\" ng-click=\"$ctrl.confirm($event)\">Done</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"datepicker-wheels\" aria-hidden=\"true\">\n" +
    "                    <div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2>\n" +
    "                        <ul>\n" +
    "                            <li data-month=\"0\">\n" +
    "                                <button type=\"button\">Jan</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"1\">\n" +
    "                                <button type=\"button\">Feb</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"2\">\n" +
    "                                <button type=\"button\">Mar</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"3\">\n" +
    "                                <button type=\"button\">Apr</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"4\">\n" +
    "                                <button type=\"button\">May</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"5\">\n" +
    "                                <button type=\"button\">Jun</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"6\">\n" +
    "                                <button type=\"button\">Jul</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"7\">\n" +
    "                                <button type=\"button\">Aug</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"8\">\n" +
    "                                <button type=\"button\">Sep</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"9\">\n" +
    "                                <button type=\"button\">Oct</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"10\">\n" +
    "                                <button type=\"button\">Nov</button>\n" +
    "                            </li>\n" +
    "                            <li data-month=\"11\">\n" +
    "                                <button type=\"button\">Dec</button>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2>\n" +
    "                        <ul></ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"datepicker-wheels-footer clearfix\">\n" +
    "                        <button type=\"button\" class=\"btn datepicker-wheels-back\"><span\n" +
    "                                class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span>\n" +
    "                        </button>\n" +
    "                        <button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span\n" +
    "                                class=\"sr-only\">Month and Year</span></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
