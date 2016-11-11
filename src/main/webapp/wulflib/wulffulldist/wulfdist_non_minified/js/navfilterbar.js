/**
 * Created by zhichai on 2016/8/3.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ========================================================================
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    var updateFilterBarContent = function ($item) {
        var filterBar = $('.filter-bar');
        var month = filterBar.find(".n-list-months").find(".selected span").html();
        var year = filterBar.find(".n-list-years").find(".selected span").html();
        var country = filterBar.find(".n-list-countries").find(".selected span").html();
        var city = filterBar.find(".n-list-cities").find(".selected span").html();
        if (month && year && country && city) {
            $item.find(".filter-bar-setting-item").html(month.substr(0,3) + " " + year + ", " + country + ", " + city);
        }
    };

    var appendLiItems = function (item, itemSelected, $itemParent) {
        var liItem = "<li class='n-list-group-item ";
        if (item === itemSelected) {
            liItem += "selected' tabindex='0'";
        }
        else {
            liItem += "' tabindex='-1'";
        }
        liItem += "><span>" + item + "</span></li>";
        $itemParent.append(liItem);
    };

    var loadCities = function (citiesData, citySelected) {
        var citiesContainer = $(".n-list-cities");
        if (citiesContainer) {
            if (citiesContainer.find(".mCSB_container").html()) {
                citiesContainer = citiesContainer.find(".mCSB_container");
            }
            citiesContainer.empty();
            appendLiItems("All cities", citySelected, citiesContainer);
            $.each(citiesData, function (i, item) {
                appendLiItems(item.city, citySelected, citiesContainer);
            });
            if (citiesContainer.find(".n-list-group-item[tabindex='0']").length < 1) {
                citiesContainer.find(".n-list-group-item:first").attr("tabindex", 0);
            }
        }
    };

    var loadCountries = function (countriesCities) {
        var filterBarContent = $(this).find(".filter-bar-tab .filter-bar-setting-item").html().split(",");
        var countryCurrent = filterBarContent[1].trim();
        var cityCurrent = filterBarContent[2].trim();
        var countriesContainer = $(".n-list-countries");
        if (countriesContainer) {
            var countriesUl = countriesContainer;
            if (countriesUl.find(".mCSB_container").html()) {
                countriesUl = countriesUl.find(".mCSB_container");
            }
            countriesUl.empty();
            $.each(countriesCities.countries, function (i, item) {
                appendLiItems(item.country, countryCurrent, countriesUl);
                if (item.country === countryCurrent) {
                    loadCities(item.cities, cityCurrent);
                }
            });
            if (countriesUl.find(".n-list-group-item[tabindex='0']").length < 1) {
                countriesUl.find(".n-list-group-item:first").attr("tabindex", 0);
            }
        }
        countriesContainer.on("click", function (e) {
            var divCitiesContainer = $(".n-list-cities").find("div.mCSB_container");
            var country = "";
            if (e.toElement) {
                country = e.toElement.innerText;
            }
            else {
                country = e.target.innerText;
            }
            if (divCitiesContainer) {
                $.each(countriesCities.countries, function (i, item) {
                    if (item.country === country) {
                        loadCities(item.cities, cityCurrent);
                        return true;
                    }
                });
            }
        });
    };

    $(".filter-bar-nav")
        .on('click', 'li', function(e) {
            var filterBar = $('.filter-bar');
            var bannerSecond = $(e.target).closest('.n-banner-2nd');
            var ulFilter = bannerSecond.find("ul").first();
            var maskFilter = bannerSecond.find(".gray-mask").first();
            var cornerFilter = bannerSecond.find(".gray-corner").first();
            if (filterBar.css("display") !== "none") {
                ulFilter.find("span").css('display', 'block');
                ulFilter.removeAttr("style");
                ulFilter.removeClass('n-banner-filter-background');
                maskFilter.removeClass('n-banner-filter-background');
                cornerFilter.removeClass('n-banner-filter-background');
                $(".n-banner-3rd-filler-dark").css('display', 'none');
                filterBar.css('display', 'none');
                $(this).find(".icon-settings-menu").removeClass("icon-transform-upside-down");
                updateFilterBarContent($(this));
            }
            else {
                ulFilter.css('width', ulFilter.css('width'));
                ulFilter.find("span").css('display', 'none');
                ulFilter.addClass('n-banner-filter-background');
                maskFilter.addClass('n-banner-filter-background');
                cornerFilter.addClass('n-banner-filter-background');
                $(".n-banner-3rd-filler-dark").css('display', 'block');
                filterBar.css('display', 'block');
                $(this).find(".icon-settings-menu").addClass("icon-transform-upside-down");
            }
        })
        .on('mouseenter', 'li', function () {
            updateFilterBarContent($(this));
        });

    $(document).ready(function () {
        var filterBarSettingItem = $(".filter-bar-tab").find(".filter-bar-setting-item");
        if (filterBarSettingItem.length > 0) {
            var filterBarContent = filterBarSettingItem.html().split(",");
            var dateContent = filterBarContent[0].trim().split(" ");
            var monthCurrent = dateContent[0];
            var yearCurrent = dateContent[1];
            $(".n-banner-2nd > ul").clone().insertBefore("div.filter-bar-footer > div.n-banner-right");
            $(".n-banner-2nd > .n-banner-2nd-gray-to-blue").clone().insertAfter("div.filter-bar-footer > div.n-banner-right");
            var months = ["December", "November", "October", "September", "August", "July", "June", "May", "April", "March", "February", "January"];
            $.each(months, function (i, item) {
                var liItem = "<li class='n-list-group-item ";
                if (item.substr(0,3) === monthCurrent) {
                    liItem += "selected";
                }
                liItem += "'><span>" + item + "</span></li>";
                $("ul.n-list-months").append(liItem);
            });
            var currentYear = new Date().getFullYear();
            for (var i = 0;i < 11;i++) {
                appendLiItems(currentYear - i + "", yearCurrent, $("ul.n-list-years"));
            }
            $("ul.n-list-countries").append("<li class='n-list-group-item' tabindex='0'><span>All</span></li>");
            $("ul.n-list-cities").append("<li class='n-list-group-item' tabindex='0'><span>All cities</span></li>");
        }
    });

    $.fn.extend({
        loadCountries: loadCountries
    });
}));
