/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jqxcore', 'jqxchart'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('jqxcore'), require('jqxchart'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    if ($.jqx && $.jqx._jqxChart && $.jqx.svgRenderer){
        /** @private */
        $.jqx.adjustColor = function (color) {
            if (typeof (color) != 'string')
                return '#000000';

            if (color.indexOf('#') == -1)
                return color;

            return color.toUpperCase();
        };
        $.extend($.jqx._jqxChart.prototype, {
            _defaultLineColor: '#B1B1B1',
            /** @private */
            _initRenderer: function (host) {
                if (!$.jqx.createRenderer) {
                    throw 'Please include jqxdraw.js';
                }

                //Draw panel shadow
                var shadowDiv = document.createElement('div');
                var type = this.seriesGroups[0].type;
                var orientation = this.seriesGroups[0].orientation;
                $(shadowDiv).addClass('panel-shadow chart-panel');
                if(type === 'line' || type === 'column') {
                    if ( orientation === 'horizontal' ){
                        shadowDiv.style.width = (host.width() - 384) + 'px';
                        shadowDiv.style.height = (host.height() - 50) + 'px';
                        shadowDiv.style.left = '152px';
                    }else{
                        shadowDiv.style.width = (host.width() - 70) + 'px';
                        shadowDiv.style.height = (host.height() - 60) + 'px';
                        this.padding = { top:12, left:9, right:28, bottom:32 };
                    }
                } else {
                    shadowDiv.style.width = host.width() + 'px';
                    shadowDiv.style.height = host.height() + 'px';
                }

                // Draw pie shadow
                if (type === 'donut') {
                    var pieShadow = document.createElement('div');
                    var pieSetting = this.seriesGroups[0].series[0];
                    var height = pieSetting.innerRadius;
                    var width = pieSetting.radius * 1.5;
                    var bottom = host.height()/2 -  pieSetting.radius - height;
                    pieShadow.className = 'pie-shadow';
                    pieShadow.style.width = width+'px';
                    pieShadow.style.height = height+'px';
                    pieShadow.style.marginLeft = -width/2+'px';
                    pieShadow.style.bottom = bottom+'px';
                    shadowDiv.appendChild(pieShadow);
                    host.addClass('pie-chart');
                }

                //Draw top legend
                var seriesLen = this.seriesGroups[0].series.length;
                if (seriesLen && this.showLegend) {
                    var legendHeight = seriesLen * 25;
                    this.padding.top = 12 + legendHeight;
                    shadowDiv.style.height = (host.height() - 60 - legendHeight) + 'px';
                    legendHeight += 'px';
                    $(shadowDiv).css({ top:legendHeight });

                    //horizontal column legend should be on right, fix shadowDiv
                    if (( type==='column') && (orientation==="horizontal")){
                        shadowDiv.style.height = (host.height() - 99 ) + 'px';
                        shadowDiv.style.top = '29px'
                    }
                }
                $(shadowDiv).css({
                    "background-color": "white","border-radius":"9px"
                });
                var render = $.jqx.createRenderer(this, host);
                $(host.find(".chartContainer")).css({
                    "z-index":"1"
                });
                host.append(shadowDiv);
                return render;
            },
            /* jshint ignore:start */
            _render: function (rect) {
                var self = this;
                var renderer = self.renderer;

                self._colorsCache.clear();

                if (!self._isToggleRefresh && self._isUpdate && self._renderData)
                    self._renderDataClone();

                self._renderData = [];

                renderer.clear();
                self._unselect();
                self._hideToolTip(0);

                var bckgImg = self.backgroundImage;
                if (bckgImg == undefined || bckgImg == '')
                    self.host.css({ 'background-image': '' });
                else
                    self.host.css({ 'background-image': (bckgImg.indexOf('(') != -1 ? bckgImg : "url('" + bckgImg + "')") });

                self._rect = rect;

                var padding = self.padding || { left: 5, top: 5, right: 5, bottom: 5 };

                var clipAll = renderer.createClipRect(rect);
                var groupAll = renderer.beginGroup();
                renderer.setClip(groupAll, clipAll);

                var rFill = renderer.rect(rect.x, rect.y, rect.width - 2, rect.height - 2);

                if (bckgImg == undefined || bckgImg == '')
                    renderer.attr(rFill, { fill: self.backgroundColor || self.background || 'white' });
                else
                    renderer.attr(rFill, { fill: 'transparent' });

                if (self.showBorderLine != false) {
                    var borderColor = self.borderLineColor == undefined ? self.borderColor : self.borderLineColor;
                    if (borderColor == undefined)
                        borderColor = self._defaultLineColor;

                    var borderLineWidth = this.borderLineWidth;
                    if (isNaN(borderLineWidth) || borderLineWidth < 0 || borderLineWidth > 10)
                        borderLineWidth = 1;

                    renderer.attr(rFill, { 'stroke-width': borderLineWidth, stroke: borderColor });
                }
                else {
                    if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
                        renderer.attr(rFill, { 'stroke-width': 1, stroke: self.backgroundColor || 'white' });
                    }
                }

                // Invoke user-defined drawing
                if ($.isFunction(self.drawBefore)) {
                    self.drawBefore(renderer, rect);
                }

                var paddedRect = { x: padding.left, y: padding.top, width: rect.width - padding.left - padding.right, height: rect.height - padding.top - padding.bottom };
                self._paddedRect = paddedRect;
                var titlePadding = self.titlePadding || { left: 2, top: 2, right: 2, bottom: 2 };

                var sz;
                if (self.title && self.title.length > 0) {
                    var cssTitle = self.toThemeProperty('jqx-chart-title-text', null);
                    sz = renderer.measureText(self.title, 0, { 'class': cssTitle });
                    renderer.text(self.title, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - (titlePadding.left + titlePadding.right), sz.height, 0, { 'class': cssTitle }, true, 'center', 'center');
                    paddedRect.y += sz.height;
                    paddedRect.height -= sz.height;
                }
                if (self.description && self.description.length > 0) {
                    var cssDesc = self.toThemeProperty('jqx-chart-title-description', null);
                    sz = renderer.measureText(self.description, 0, { 'class': cssDesc });
                    renderer.text(self.description, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - (titlePadding.left + titlePadding.right), sz.height, 0, { 'class': cssDesc }, true, 'center', 'center');

                    paddedRect.y += sz.height;
                    paddedRect.height -= sz.height;
                }

                if (self.title || self.description) {
                    paddedRect.y += (titlePadding.bottom + titlePadding.top);
                    paddedRect.height -= (titlePadding.bottom + titlePadding.top);
                }

                var plotRect = { x: paddedRect.x, y: paddedRect.y, width: paddedRect.width, height: paddedRect.height };
                self._plotRect = plotRect;

                // build stats
                self._buildStats(plotRect);

                var isPieOnly = self._isPieOnlySeries();

                var seriesGroups = self.seriesGroups;

                // axis validation
                var swap;
                var hashAxis = { xAxis: {}, valueAxis: {} };
                for (var i = 0; i < seriesGroups.length && !isPieOnly; i++) {
                    if (seriesGroups[i].type == 'pie' || seriesGroups[i].type == 'donut')
                        continue;

                    var xAxis = self._getXAxis(i);
                    if (!xAxis)
                        throw 'seriesGroup[' + i + '] is missing xAxis definition';

                    var xAxisId = xAxis == self._getXAxis() ? -1 : i;
                    hashAxis.xAxis[xAxisId] = 0x00;
                }

                var axisPadding = self.axisPadding;
                if (isNaN(axisPadding))
                    axisPadding = 5;

                // get vertical axis width
                var wYAxis = { left: 0, right: 0, leftCount: 0, rightCount: 0 };
                var wYAxisArr = [];

                for (i = 0; i < seriesGroups.length; i++) {
                    var g = seriesGroups[i];
                    if (g.type == 'pie' || g.type == 'donut' || g.spider == true || g.polar == true) {
                        wYAxisArr.push({ width: 0, position: 0, xRel: 0 });
                        continue;
                    }

                    swap = g.orientation == 'horizontal';

                    var xAxis = self._getXAxis(i);
                    var xAxisId = xAxis == self._getXAxis() ? -1 : i;

                    var valueAxis = self._getValueAxis(i);
                    var valueAxisId = valueAxis == self._getValueAxis() ? -1 : i;

                    var w = !swap ? valueAxis.axisSize : xAxis.axisSize;
                    var axisR = { x: 0, y: plotRect.y, width: plotRect.width, height: plotRect.height };
                    var position = swap ? self._getXAxis(i).position : valueAxis.position;

                    if (!w || w == 'auto') {
                        if (swap) {
                            w = this._renderXAxis(i, axisR, true, plotRect).width;
                            if ((hashAxis.xAxis[xAxisId] & 0x01) == 0x01)
                                w = 0;
                            else if (w > 0)
                                hashAxis.xAxis[xAxisId] |= 0x01;
                        }
                        else {
                            w = self._renderValueAxis(i, axisR, true, plotRect).width;
                            if ((hashAxis.valueAxis[valueAxisId] & 0x01) == 0x01)
                                w = 0;
                            else if (w > 0)
                                hashAxis.valueAxis[valueAxisId] |= 0x01;
                        }
                    }

                    if (position != 'left' && self.rtl == true)
                        position = 'right';
                    if (position != 'right')
                        position = 'left';

                    if (wYAxis[position + 'Count'] > 0 && wYAxis[position] > 0 && w > 0)
                        wYAxis[position] += axisPadding;

                    wYAxisArr.push({ width: w, position: position, xRel: wYAxis[position] });
                    wYAxis[position] += w;
                    wYAxis[position + 'Count']++;
                }

                var measureSize = Math.max(1, Math.max(rect.width, rect.height));

                // get horizontal axis height
                var hXAxis = { top: 0, bottom: 0, topCount: 0, bottomCount: 0 };
                var hXAxisArr = [];

                for (i = 0; i < seriesGroups.length; i++) {
                    var g = seriesGroups[i];
                    if (g.type == 'pie' || g.type == 'donut' || g.spider == true || g.polar == true) {
                        hXAxisArr.push({ height: 0, position: 0, yRel: 0 });
                        continue;
                    }

                    swap = g.orientation == 'horizontal';

                    var valueAxis = this._getValueAxis(i);
                    var valueAxisId = valueAxis == self._getValueAxis() ? -1 : i;

                    var xAxis = self._getXAxis(i);
                    var xAxisId = xAxis == self._getXAxis() ? -1 : i;

                    var h = !swap ? xAxis.axisSize : valueAxis.axisSize;
                    var position = swap ? valueAxis.position : xAxis.position;

                    if (!h || h == 'auto') {
                        if (swap) {
                            h = self._renderValueAxis(i, { x: 0, y: 0, width: measureSize, height: 0 }, true, plotRect).height;
                            if ((hashAxis.valueAxis[valueAxisId] & 0x02) == 0x02)
                                h = 0;
                            else if (h > 0)
                                hashAxis.valueAxis[valueAxisId] |= 0x02;
                        }
                        else {
                            h = self._renderXAxis(i, { x: 0, y: 0, width: measureSize, height: 0 }, true).height;
                            if ((hashAxis.xAxis[xAxisId] & 0x02) == 0x02)
                                h = 0;
                            else if (h > 0)
                                hashAxis.xAxis[xAxisId] |= 0x02;
                        }
                    }

                    if (position != 'top')
                        position = 'bottom';

                    if (hXAxis[position + 'Count'] > 0 && hXAxis[position] > 0 && h > 0)
                        hXAxis[position] += axisPadding;

                    hXAxisArr.push({ height: h, position: position, yRel: hXAxis[position] });

                    hXAxis[position] += h;
                    hXAxis[position + 'Count']++;
                }

                self._createAnimationGroup("series");

                var showLegend = (self.showLegend != false);
                var szLegend = !showLegend ? { width: 0, height: 0} : self._renderLegend(self.legendLayout ? self._rect : paddedRect, true);
                if (this.legendLayout && (!isNaN(this.legendLayout.left) || !isNaN(this.legendLayout.top)))
                    szLegend = { width: 0, height: 0 };

                if (paddedRect.height < hXAxis.top + hXAxis.bottom + szLegend.height || paddedRect.width < wYAxis.left + wYAxis.right) {
                    renderer.endGroup();
                    return;
                }

                plotRect.height -= hXAxis.top + hXAxis.bottom + szLegend.height;

                plotRect.x += wYAxis.left;
                plotRect.width -= wYAxis.left + wYAxis.right;
                plotRect.y += hXAxis.top;

                var xAxisRect = [];

                if (!isPieOnly) {
                    var lineColor = self._getXAxis().tickMarksColor || self._defaultLineColor;

                    for (i = 0; i < seriesGroups.length; i++) {
                        var g = seriesGroups[i];
                        if (g.polar == true || g.spider == true || g.type == 'pie' || g.type == 'donut')
                            continue;

                        swap = g.orientation == 'horizontal';
                        var xAxisId = self._getXAxis(i) == self._getXAxis() ? -1 : i;
                        var valueAxisId = self._getValueAxis(i) == self._getValueAxis() ? -1 : i;

                        var axisR = { x: plotRect.x, y: 0, width: plotRect.width, height: hXAxisArr[i].height };
                        if (hXAxisArr[i].position != 'top')
                            axisR.y = plotRect.y + plotRect.height + hXAxisArr[i].yRel;
                        else
                            axisR.y = plotRect.y - hXAxisArr[i].yRel - hXAxisArr[i].height;

                        if (swap) {
                            if ((hashAxis.valueAxis[valueAxisId] & 0x04) == 0x04)
                                continue;

                            if (!self._isGroupVisible(i))
                                continue;

                            self._renderValueAxis(i, axisR, false, plotRect);

                            hashAxis.valueAxis[valueAxisId] |= 0x04;
                        }
                        else {
                            xAxisRect.push(axisR);

                            if ((hashAxis.xAxis[xAxisId] & 0x04) == 0x04)
                                continue;

                            if (!self._isGroupVisible(i))
                                continue;

                            self._renderXAxis(i, axisR, false, plotRect);
                            hashAxis.xAxis[xAxisId] |= 0x04;
                        }
                    }
                }

                if (showLegend) {
                    var containerRect = self.legendLayout ? self._rect : paddedRect;

                    var x = paddedRect.x + $.jqx._ptrnd((paddedRect.width - szLegend.width) / 2);
                    var y = plotRect.y + plotRect.height + hXAxis.bottom;
                    var w = paddedRect.width;
                    var h = szLegend.height;
                    if (self.legendLayout) {
                        if (!isNaN(self.legendLayout.left))
                            x = self.legendLayout.left;

                        if (!isNaN(self.legendLayout.top))
                            y = self.legendLayout.top;

                        if (!isNaN(self.legendLayout.width))
                            w = self.legendLayout.width;

                        if (!isNaN(self.legendLayout.height))
                            h = self.legendLayout.height;
                    }

                    if (x + w > containerRect.x + containerRect.width)
                        w = containerRect.x + containerRect.width - x;
                    if (y + h > containerRect.y + containerRect.height)
                        h = containerRect.y + containerRect.height - y;

                    self._renderLegend({ x: x, y: y, width: w, height: h });
                }

                self._hasHorizontalLines = false;
                if (!isPieOnly) {
                    for (i = 0; i < seriesGroups.length; i++) {
                        var g = seriesGroups[i];

                        if (g.polar == true || g.spider == true || g.type == 'pie' || g.type == 'donut')
                            continue;

                        swap = seriesGroups[i].orientation == 'horizontal';
                        var axisR = { x: plotRect.x - wYAxisArr[i].xRel - wYAxisArr[i].width, y: plotRect.y, width: wYAxisArr[i].width, height: plotRect.height };
                        if (wYAxisArr[i].position != 'left')
                            axisR.x = plotRect.x + plotRect.width + wYAxisArr[i].xRel;

                        var xAxisId = self._getXAxis(i) == self._getXAxis() ? -1 : i;
                        var valueAxisId = self._getValueAxis(i) == self._getValueAxis() ? -1 : i;

                        if (swap) {
                            xAxisRect.push(axisR);

                            if ((hashAxis.xAxis[xAxisId] & 0x08) == 0x08)
                                continue;

                            if (!self._isGroupVisible(i))
                                continue;

                            self._renderXAxis(i, axisR, false, plotRect);
                            hashAxis.xAxis[xAxisId] |= 0x08;
                        }
                        else {
                            if ((hashAxis.valueAxis[valueAxisId] & 0x08) == 0x08)
                                continue;

                            if (!self._isGroupVisible(i))
                                continue;

                            self._renderValueAxis(i, axisR, false, plotRect);
                            hashAxis.valueAxis[valueAxisId] |= 0x08;
                        }
                    }
                }

                if (plotRect.width <= 0 || plotRect.height <= 0)
                    return;

                self._plotRect = { x: plotRect.x, y: plotRect.y, width: plotRect.width, height: plotRect.height };

                for (i = 0; i < seriesGroups.length; i++) {
                    this._drawPlotAreaLines(i, true, { gridLines: false, tickMarks: false, alternatingBackground: true });
                    this._drawPlotAreaLines(i, false, { gridLines: false, tickMarks: false, alternatingBackground: true });
                }

                for (i = 0; i < seriesGroups.length; i++) {
                    this._drawPlotAreaLines(i, true, { gridLines: true, tickMarks: true, alternatingBackground: false });
                    this._drawPlotAreaLines(i, false, { gridLines: true, tickMarks: true, alternatingBackground: false });
                }

                var hasCustomDraw = false;
                for (i = 0; i < seriesGroups.length && !hasCustomDraw; i++) {
                    var g = seriesGroups[i];
                    if (g.annotations !== undefined ||
                        $.isFunction(g.draw) ||
                        $.isFunction(g.drawBefore)
                        ) {
                        hasCustomDraw = true;
                        break;
                    }
                }

                var gPlot = renderer.beginGroup();

                if (!hasCustomDraw) {
                    var clip = renderer.createClipRect({ x: plotRect.x + 1, y: plotRect.y, width: plotRect.width + 4, height: plotRect.height }); //need swift for bar chart radius, modifyed by Al
                    renderer.setClip(gPlot, clip);
                }

                for (i = 0; i < seriesGroups.length; i++) {
                    var g = seriesGroups[i];
                    var isValid = false;
                    for (var validtype in self._seriesTypes) {
                        if (self._seriesTypes[validtype] == g.type) {
                            isValid = true;
                            break;
                        }
                    }
                    if (!isValid)
                        throw 'Invalid serie type "' + g.type + '"';

                    // custom drawing before the group
                    if ($.isFunction(g.drawBefore))
                        g.drawBefore(renderer, rect, i, this);

                    // polar series drawing
                    if (g.polar == true || g.spider == true) {
                        if (g.type.indexOf('pie') == -1 && g.type.indexOf('donut') == -1)
                            self._renderSpiderAxis(i, plotRect);
                    }

                    self._renderAxisBands(i, plotRect, true);
                    self._renderAxisBands(i, plotRect, false);
                }

                for (i = 0; i < seriesGroups.length; i++) {
                    var g = seriesGroups[i];

                    if (self._isColumnType(g.type))
                        self._renderColumnSeries(i, plotRect);
                    else if (g.type.indexOf('pie') != -1 || g.type.indexOf('donut') != -1)
                        self._renderPieSeries(i, plotRect);
                    else if (g.type.indexOf('line') != -1 || g.type.indexOf('area') != -1)
                        self._renderLineSeries(i, plotRect);
                    else if (g.type.indexOf('scatter') != -1 || g.type.indexOf('bubble') != -1)
                        self._renderScatterSeries(i, plotRect);
                    else if (g.type.indexOf('candlestick') != -1 || g.type.indexOf('ohlc') != -1)
                        self._renderCandleStickSeries(i, plotRect, g.type.indexOf('ohlc') != -1);

                    if (g.annotations) {
                        if (!this._moduleAnnotations)
                            throw "Please include 'jqxchart.annotations.js'";

                        for (var j = 0; j < g.annotations.length; j++)
                            self._renderAnnotation(i, g.annotations[j], plotRect);
                    }

                    // custom drawing after the group
                    if ($.isFunction(g.draw))
                        self.draw(renderer, rect, i, this);
                }

                renderer.endGroup();

                if (self.enabled == false) {
                    var el = renderer.rect(rect.x, rect.y, rect.width, rect.height);
                    renderer.attr(el, { fill: '#777777', opacity: 0.5, stroke: '#00FFFFFF' });
                }

                // Invoke user-defined drawing
                if ($.isFunction(self.draw)) {
                    self.draw(renderer, rect);
                }

                renderer.endGroup();

                self._startAnimation("series");

                // render range selector
                var hasRangeSelector = false;
                for (var i = 0; i < self.seriesGroups.length && !hasRangeSelector; i++) {
                    var xAxis = self._getXAxis(i);
                    if (xAxis && xAxis.rangeSelector)
                        hasRangeSelector = true;
                }

                if (hasRangeSelector) {
                    if (!this._moduleRangeSelector)
                        throw "Please include 'jqxchart.rangeselector.js'";

                    var isRendered = [];

                    if (!this._isSelectorRefresh) {
                        self.removeHandler($(document), self._getEvent('mousemove'), self._onSliderMouseMove);
                        self.removeHandler($(document), self._getEvent('mousedown'), self._onSliderMouseDown);
                        self.removeHandler($(document), self._getEvent('mouseup'), self._onSliderMouseUp);
                    }

                    if (!self._isSelectorRefresh)
                        self._rangeSelectorInstances = {};

                    for (i = 0; i < self.seriesGroups.length; i++) {
                        var axis = this._getXAxis(i);

                        if (isRendered.indexOf(axis) == -1) {
                            if (this._renderXAxisRangeSelector(i, xAxisRect[i]))
                                isRendered.push(axis);
                        }
                    }
                }
            },


            /** @private */
            _showLabel: function (gidx, sidx, iidx, rect, halign, valign, isMeasure, inverseHAlign, inverseVAlign, labelAngleOverride, renderedRect) {
                var group = this.seriesGroups[gidx];
                var series = group.series[sidx];
                var sz = { width: 0, height: 0 }, szSave;

                if (isNaN(iidx))
                    return;

                var settings = this._getLabelsSettings(gidx, sidx, iidx);

                if (!settings.visible)
                    return isMeasure ? sz : undefined;

                if (rect.width < 0 || rect.height < 0)
                    return isMeasure ? sz : undefined;

                var labelsAngle = settings.angle;
                if (!isNaN(labelAngleOverride))
                    labelsAngle = labelAngleOverride;

                var offset = settings.offset || {};
                var labelOffset = { x: offset.x, y: offset.y };
                if (isNaN(labelOffset.x))
                    labelOffset.x = 0;
                if (isNaN(labelOffset.y))
                    labelOffset.y = 0;

                halign = halign || settings.horizontalAlignment || 'center';
                valign = valign || settings.verticalAlignment || 'center';

                var text = this._getFormattedValue(gidx, sidx, iidx, undefined, undefined, true);

                var w = rect.width;
                var h = rect.height;

                if (inverseHAlign == true && halign != 'center')
                    halign = halign == 'right' ? 'left' : 'right';

                if (inverseVAlign == true && valign != 'center' && valign != 'middle') {
                    valign = valign == 'top' ? 'bottom' : 'top';
                    labelOffset.y *= -1;
                }

                sz = this.renderer.measureText(text, labelsAngle, { 'class': settings['class'] });

                if (isMeasure)
                    return sz;

                var x = 0, y = 0;

                if (w > 0) {
                    if (halign == '' || halign == 'center')
                        x += (w - sz.width) / 2;
                    else if (halign == 'right')
                        x += (w - sz.width);
                }

                if (h > 0) {
                    if (valign == '' || valign == 'center')
                        y += (h - sz.height) / 2;
                    else if (valign == 'bottom')
                        y += (h - sz.height);
                }

                x += rect.x + labelOffset.x;
                y += rect.y + labelOffset.y;

                var plotRect = this._plotRect;

                //if (x <= plotRect.x)
                //    x = plotRect.x + 2;

                //if (y <= plotRect.y)
                //    y = plotRect.y + 2;
                if (this.seriesGroups[0].orientation === "horizontal"){
                    x = plotRect.x - 30 + labelOffset.x;
                    y = y - 2;
                }

                var labelSize = { width: Math.max(sz.width, 1), height: Math.max(sz.height, 1) };

                if (y + labelSize.height >= plotRect.y + plotRect.height)
                    y = plotRect.y + plotRect.height - (szSave ? (labelSize.height + szSave.height) / 2 : labelSize.height) - 2;

                if (x + labelSize.width >= plotRect.x + plotRect.width)
                    x = plotRect.x + plotRect.width - labelSize.width - 2;

                var renderGroup;

                var labelsBackground = settings.backgroundColor;
                var labelsBorder = settings.borderColor;

                var padding = settings.padding;
                if (labelsBackground || labelsBorder) {
                    renderGroup = this.renderer.beginGroup();

                    var rect = this.renderer.rect(
                        x - padding.left,
                        y - padding.top,
                        sz.width + padding.left + padding.right,
                        sz.height + padding.bottom + padding.bottom,
                        {
                            fill: labelsBackground || 'transparent',
                            'fill-opacity': settings.backgroundOpacity || 1,
                            stroke: labelsBorder || 'transparent',
                            'stroke-opacity': settings.borderOpacity,
                            'stroke-width': 1
                        }
                    );
                }

                var elemLabel = this.renderer.text(text, x, y, sz.width, sz.height, labelsAngle, { 'class': settings['class'], opacity: settings.opacity || 1 }, false, 'center', 'center');

                if (renderedRect) {
                    // return the renderedRect
                    renderedRect.x = x - padding.left;
                    renderedRect.y = y - padding.top;
                    renderedRect.width = sz.width + padding.left + padding.right;
                    renderedRect.height = sz.height + padding.bottom + padding.bottom;
                }

                if (this._isVML) {
                    this.renderer.removeElement(elemLabel);
                    this.renderer.getContainer()[0].appendChild(elemLabel);
                }

                if (renderGroup)
                    this.renderer.endGroup();

                return renderGroup || elemLabel;
            },


            _animColumns: function (context, percent) {
                var gidx = context.groupIndex;
                var group = this.seriesGroups[gidx];
                var renderData = context.renderData;
                var isWaterfall = group.type.indexOf('waterfall') != -1;
                var xAxis = this._getXAxis(gidx);

                var isStacked = group.type.indexOf('stacked') != -1;

                var polarAxisCoords = context.polarAxisCoords;

                var gradientType = this._getGroupGradientType(gidx);

                var columnWidth = context.columnGroupWidth.targetWidth;

                var firstVisibleSerie = -1;
                for (var j = 0; j < group.series.length; j++) {
                    if (this._isSerieVisible(gidx, j)) {
                        firstVisibleSerie = j;
                        break;
                    }
                }

                var minPos = NaN, maxPos = NaN;
                for (var j = 0; j < context.seriesCtx.length; j++) {
                    var serieCtx = context.seriesCtx[j];
                    if (isNaN(minPos) || minPos > serieCtx.xAdjust)
                        minPos = serieCtx.xAdjust;
                    if (isNaN(maxPos) || maxPos < serieCtx.xAdjust + serieCtx.columnWidth)
                        maxPos = serieCtx.xAdjust + serieCtx.columnWidth;
                }

                var realGroupWidth = Math.abs(maxPos - minPos);

                var xoffsets = context.renderData.xoffsets;

                var xPrev = -1;

                var yWaterfallPrev = {};

                // skipOverlappingPoints is off by default in column series
                var skipOverlappingPoints = group.skipOverlappingPoints == true;

                for (var i = xoffsets.first; i <= xoffsets.last; i++) {
                    var x = xoffsets.data[i];
                    if (isNaN(x))
                        continue;

                    if (xPrev != -1 && Math.abs(x - xPrev) < realGroupWidth && skipOverlappingPoints)
                        continue;
                    else
                        xPrev = x;

                    var offsets = this._getColumnVOffsets(renderData, gidx, context.seriesCtx, i, isStacked, percent);

                    var isSummary = false;

                    if (isWaterfall) {
                        for (var iSerie = 0; iSerie < group.series.length; iSerie++) {
                            if (group.series[iSerie].summary && xoffsets.xvalues[i][group.series[iSerie].summary])
                                isSummary = true;
                        }
                    }

                    for (var iSerie = 0; iSerie < context.seriesCtx.length; iSerie++) {
                        var serieCtx = context.seriesCtx[iSerie];
                        var sidx = serieCtx.seriesIndex;
                        var serie = group.series[sidx];

                        var from = offsets[iSerie].from;
                        var to = offsets[iSerie].to;
                        var xOffset = offsets[iSerie].xOffset;

                        if (!serieCtx.elements)
                            serieCtx.elements = {};

                        if (!serieCtx.labelElements)
                            serieCtx.labelElements = {};

                        var elements = serieCtx.elements;
                        var labelElements = serieCtx.labelElements;

                        var startOffset = (context.vertical ? context.rect.x : context.rect.y) + serieCtx.xAdjust;

                        var settings = serieCtx.settings;
                        var colors = serieCtx.itemsColors.length != 0 ? serieCtx.itemsColors[i - renderData.xoffsets.first] : serieCtx.serieColors;

                        var isVisible = this._isSerieVisible(gidx, sidx);

                        if (!isVisible /*&& !isStacked*/)
                            continue;

                        var x = $.jqx._ptrnd(startOffset + xOffset);

                        var rect = { x: x, width: serieCtx.columnWidth };

                        if (offsets[iSerie].funnel) {
                            rect.fromWidthPercent = offsets[iSerie].fromWidthPercent;
                            rect.toWidthPercent = offsets[iSerie].toWidthPercent;
                        }

                        var isInverseDirection = true;

                        if (context.vertical) {
                            rect.y = from;
                            rect.height = to - from;
                            if (rect.height < 0) {
                                rect.y += rect.height;
                                rect.height = -rect.height;
                                isInverseDirection = false;
                            }
                        }
                        else {
                            rect.x = from < to ? from : to;
                            rect.width = Math.abs(from - to);
                            isInverseDirection = from - to < 0;
                            rect.y = x;
                            rect.height = serieCtx.columnWidth;
                        }

                        var size = from - to;
                        if (isNaN(size))
                            continue;

                        size = Math.abs(size);

                        var pieSliceInfo = undefined;
                        var isNewElement = elements[i] == undefined;

                        if (!polarAxisCoords) {
                            if (offsets[iSerie].funnel) // funnel or pyramid
                            {
                                var path = this._getTrapezoidPath($.extend({}, rect), context.vertical, isInverseDirection);
                                if (isNewElement)
                                    elements[i] = this.renderer.path(path, {});
                                else
                                    this.renderer.attr(elements[i], { d: path });
                            }
                            else { // regular column
                                if (isNewElement) {
                                    elements[i] = this.renderer.rect(rect.x, rect.y, context.vertical ? rect.width : 0, context.vertical ? 0 : rect.height);
                                }
                                else {
                                    if (context.vertical == true)
                                        this.renderer.attr(elements[i], { x: rect.x, y: rect.y, height: size + 5, class: "bar" }); //fixed by long
                                    else
                                        this.renderer.attr(elements[i], { x: rect.x -5, y: rect.y, width: size + 5, class: "bar" }); //fixed by Al
                                }
                            }
                        }
                        else // column on polar axis
                        {
                            pieSliceInfo = this._columnAsPieSlice(elements, i, context.rect, polarAxisCoords, rect);
                            var colors = this._getColors(gidx, sidx, undefined, 'radialGradient', pieSliceInfo.outerRadius);
                        }

                        if (size < 1 && (percent != 1 || polarAxisCoords))
                            this.renderer.attr(elements[i], { display: 'none' });
                        else
                            this.renderer.attr(elements[i], { display: 'block' });

                        if (isNewElement)
                            this.renderer.attr(elements[i], { fill: colors.fillColor, 'fill-opacity': settings.opacity, 'stroke-opacity': settings.opacity, stroke: colors.lineColor, 'stroke-width': settings.stroke, 'stroke-dasharray': settings.dashStyle });

                        this.renderer.removeElement(labelElements[i]);

                        if (!isVisible || (size == 0 && percent < 1))
                            continue;

                        /// Waterfall start
                        if (isWaterfall && this._get([serie.showWaterfallLines, group.showWaterfallLines]) != false) {
                            if (!isStacked || (isStacked && iSerie == firstVisibleSerie)) {
                                var serieKey = isStacked ? -1 : iSerie;
                                if (percent == 1 && !isNaN(renderData.offsets[iSerie][i].from) && !isNaN(renderData.offsets[iSerie][i].to)) {
                                    var prevWFInfo = yWaterfallPrev[serieKey];
                                    if (prevWFInfo != undefined) {

                                        var p1 =
                                        {
                                            x: prevWFInfo.x,
                                            y: $.jqx._ptrnd(prevWFInfo.y)
                                        };

                                        var p2 = {
                                            x: x,
                                            y: p1.y
                                        };

                                        var topWP = group.columnsTopWidthPercent / 100;
                                        if (isNaN(topWP))
                                            topWP = 1;
                                        else if (topWP > 1 || topWP < 0)
                                            topWP = 1;

                                        var bottomWP = group.columnsBottomWidthPercent / 100;
                                        if (isNaN(bottomWP))
                                            bottomWP = 1;
                                        else if (bottomWP > 1 || bottomWP < 0)
                                            bottomWP = 1;

                                        var sz = context.vertical ? rect.width : rect.height;

                                        p1.x = p1.x - sz / 2 + sz / 2 * topWP;

                                        if (isSummary) {
                                            var adj = sz * topWP / 2;
                                            p2.x = p2.x + sz / 2 - (xAxis.flip ? -adj : adj);
                                        }
                                        else {
                                            var adj = sz * bottomWP / 2;
                                            p2.x = p2.x + sz / 2 - (xAxis.flip ? -adj : adj);
                                        }

                                        if (!context.vertical) {
                                            this._swapXY([p1]);
                                            this._swapXY([p2]);
                                        }

                                        this.renderer.line(
                                            p1.x,
                                            p1.y,
                                            p2.x,
                                            p2.y,
                                            {
                                                stroke: prevWFInfo.color,
                                                'stroke-width': settings.stroke,
                                                'stroke-opacity': settings.opacity,
                                                'fill-opacity': settings.opacity,
                                                'stroke-dasharray': settings.dashStyle
                                            }
                                        );
                                    }
                                }
                            }

                            if (percent == 1 && size != 0) {
                                yWaterfallPrev[isStacked ? -1 : iSerie] = { y: to, x: (context.vertical ? rect.x + rect.width : rect.y + rect.height), color: colors.lineColor };
                            }
                        }
                        // Waterfall end

                        if (polarAxisCoords) {
                            var pointOuter = this._toPolarCoord(polarAxisCoords, context.rect, rect.x + rect.width / 2, rect.y);
                            var sz = this._showLabel(gidx, sidx, i, rect, undefined, undefined, true);
                            var labelRadius = pieSliceInfo.outerRadius + 10;

                            var labelOffset = this._adjustTextBoxPosition(
                                polarAxisCoords.x,
                                polarAxisCoords.y,
                                sz,
                                labelRadius,
                                (pieSliceInfo.fromAngle + pieSliceInfo.toAngle) / 2,
                                true,
                                false,
                                false
                            );

                            labelElements[i] = this._showLabel(gidx, sidx, i, { x: labelOffset.x, y: labelOffset.y }, undefined, undefined, false, false, false);
                        }
                        else {
                            labelElements[i] = this._showLabel(gidx, sidx, i, rect, undefined, undefined, false, false, isInverseDirection);
                        }

                        if (percent == 1.0) {
                            this._installHandlers(elements[i], 'column', gidx, sidx, i);
                        }
                    }
                }
            },
            /** @private */
            _createTooltip: function (position, group, content, style) {
                var self = this;

                var groupType = group.type;

                // create tooltip elements
                var isNew = false;

                var divToolTip = self._ttEl.box;
                if (!divToolTip) {
                    isNew = true;

                    divToolTip = self._ttEl.box = document.createElement("div");

                    var baseZIndex = 10000000;
                    var arrowOuterDiv = document.createElement("div");
                    divToolTip.style.position = 'absolute';
                    divToolTip.style.cursor = 'default';
                    divToolTip.style.zIndex = 9;
                    divToolTip.setAttribute('aria-labelledby','tooltip-msg');
                    divToolTip.setAttribute('role','alertdialog');
                    $(arrowOuterDiv).css({ 'z-index': baseZIndex, 'box-sizing': 'content-box' });
                    $(document.body).append(divToolTip);


                    arrowOuterDiv.id = 'arrowOuterDiv';
                    arrowOuterDiv.style.width = '0px';
                    arrowOuterDiv.style.height = '0px';
                    arrowOuterDiv.style.position = 'absolute';
                    $(arrowOuterDiv).css({ 'z-index': baseZIndex + 1, 'box-sizing': 'content-box' });

                    var arrowInnerDiv = document.createElement("div");
                    arrowInnerDiv.id = 'arrowInnerDiv';
                    arrowInnerDiv.style.width = '0px';
                    arrowInnerDiv.style.height = '0px';
                    arrowInnerDiv.style.position = 'absolute';

                    var contentDiv = document.createElement("div");
                    contentDiv.id = 'contentDiv';
                    contentDiv.style.position = 'absolute';
                    contentDiv.style.borderRadius = '7px';
                    $(contentDiv).css({ 'box-sizing': 'content-box' });

                    $(contentDiv).addClass('jqx-rc-all jqx-button');
                    $(contentDiv).appendTo($(divToolTip));
                    $(arrowOuterDiv).appendTo($(divToolTip));
                    $(arrowInnerDiv).appendTo($(divToolTip));
                    $(arrowInnerDiv).css({ 'z-index': baseZIndex + 2, 'box-sizing': 'content-box' });

                }

                if (!content || content.length == 0) {
                    $(divToolTip).fadeTo(0, 0);
                    return;
                }

                contentDiv = $(divToolTip).find('#contentDiv')[0];
                arrowOuterDiv = $(divToolTip).find('#arrowOuterDiv')[0];
                arrowInnerDiv = $(divToolTip).find('#arrowInnerDiv')[0];
                arrowInnerDiv.style.opacity = arrowOuterDiv.style.opacity = style.fillOpacity;


                // set styles and content
                contentDiv.style.backgroundColor = 'black';
                contentDiv.style.backgroundImage = 'linear-gradient(to bottom, #666 0%, #000 100%)';
                contentDiv.style.borderColor = 'black';
                contentDiv.style.color = 'white';
                contentDiv.style.opacity = style.fillOpacity;
                contentDiv.style.boxShadow = '0 3px 5px rgba(0, 0, 0, 0.65)';

                var html = "<span id='tooltip-msg' style='text-align: left;color:#fff;font-size:14px;display:inline-block;padding:9px 7px 8px 7px;' class='" + style.css + "'>" + content + "</span>";
                $(contentDiv).html(html);

                var size = this._measureHtml(html, 'jqx-rc-all jqx-button');

                // calculate tooltip positioning and arrow location
                var rect = self._plotRect;

                if (size.width > rect.width || size.height > rect.height)
                    return;

                var totalSize = { width: size.width, height: size.height };

                var arrowLocation = '';
                var space = 5;
                var arrowSize = 10;

                var isColumn = self._isColumnType(groupType);

                var x = Math.max(position.x, rect.x);
                var y = Math.max(position.y, rect.y);

                if (self.toolTipAlignment == 'dataPoint') {
                    if (groupType.indexOf('pie') != -1 || groupType.indexOf('donut') != -1) {
                        var midAngle = (position.fromAngle + position.toAngle) / 2;
                        midAngle = midAngle * (Math.PI / 180);

                        var radius = (!isNaN(position.innerRadius) && position.innerRadius > 0) ? (position.innerRadius + position.outerRadius) / 2 : position.outerRadius * 0.75;

                        x = position.x = position.center.x + Math.cos(midAngle) * radius;
                        y = position.y = position.center.y - Math.sin(midAngle) * radius;
                        position.width = position.height = 1;
                    }
                    else if (isColumn && (group.polar || group.spider)) {
                        position.width = position.height = 1;
                    }

                    var ttFit = this._fitTooltip(this._plotRect, position, totalSize, group, style.symbolSize);
                    if (ttFit.arrowLocation != '') {
                        arrowLocation = ttFit.arrowLocation;
                        x = ttFit.x;
                        y = ttFit.y;
                        totalSize.width = ttFit.width;
                        totalSize.height = ttFit.height;
                    }
                }
                else {
                    arrowLocation = '';
                }

                if (arrowLocation == 'top' || arrowLocation == 'bottom') {
                    totalSize.height += arrowSize;
                    x -= arrowSize / 2;
                    if (arrowLocation == 'bottom')
                        y -= arrowSize;
                }
                else if (arrowLocation == 'left' || arrowLocation == 'right') {
                    totalSize.width += arrowSize;
                    y -= arrowSize / 2;
                    if (arrowLocation == 'right')
                        x -= arrowSize;
                }

                if (x + totalSize.width > rect.x + rect.width) {
                    arrowLocation = '';
                    x = rect.x + rect.width - totalSize.width;
                }

                if (y + totalSize.height > rect.y + rect.height) {
                    arrowLocation = '';
                    y = rect.y + rect.height - totalSize.height;
                }

                // set arrow and content position
                var arrowPosition = { x: 0, y: 0 }, contentPosition = { x: 0, y: 0 };
                $(contentDiv).css({ width: size.width, height: size.height, left: 0, top: 0 });

                arrowOuterDiv.style['margin-top'] = arrowOuterDiv.style['margin-left'] = 0;
                arrowInnerDiv.style['margin-top'] = arrowInnerDiv.style['margin-left'] = 0;
                contentDiv.style['margin-top'] = contentDiv.style['margin-left'] = 0;

                var arrowSizeSolid = arrowSize + 'px solid';
                var arrowSizeSolidTransparent = arrowSize + 'px solid transparent';
                style.fill = '#000';
                style.stroke = '#000';
                if (groupType.indexOf('line') != -1) {
                    arrowLocation = 'top';
                }
                if (groupType.indexOf('column') != -1) {
                    arrowLocation = 'top';
                }
                switch (arrowLocation) {
                    case 'left':
                        arrowPosition = { x: 0, y: (size.height - arrowSize) / 2 };
                        contentPosition = { x: arrowSize, y: 0 };
                        contentDiv.style['margin-left'] = arrowSize + 'px';

                        arrowOuterDiv.style['margin-left'] = 1 + 'px';
                        arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                        arrowOuterDiv.style['border-left'] = '';
                        arrowOuterDiv.style['border-right'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-top'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = 1 + 'px';
                        arrowInnerDiv.style['margin-top'] = arrowPosition.y + 'px';
                        arrowInnerDiv.style['border-left'] = '';
                        arrowInnerDiv.style['border-right'] = arrowSizeSolid + ' ' + style.fill;
                        arrowInnerDiv.style['border-top'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-bottom'] = arrowSizeSolidTransparent;
                        break;
                    case 'right':
                        arrowPosition = { x: totalSize.width - arrowSize, y: (size.height - arrowSize) / 2 };
                        contentPosition = { x: 0, y: 0 };

                        arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                        arrowOuterDiv.style['border-left'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-right'] = '';
                        arrowOuterDiv.style['border-top'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = arrowPosition.x - 1 + 'px';
                        arrowInnerDiv.style['margin-top'] = arrowPosition.y + 'px';

                        arrowInnerDiv.style['border-left'] = arrowSizeSolid + ' ' + style.fill;
                        arrowInnerDiv.style['border-right'] = '';
                        arrowInnerDiv.style['border-top'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                        break;
                    case 'top':
                        arrowPosition = { x: totalSize.width / 2 - arrowSize / 2, y: 0 };
                        contentPosition = { x: 0, y: arrowSize };

                        contentDiv.style['margin-top'] = contentPosition.y + 'px';
                        arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';

                        arrowOuterDiv.style['border-top'] = '';
                        arrowOuterDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowInnerDiv.style['margin-top'] = 1 + 'px';
                        arrowInnerDiv.style['border-top'] = '';
                        arrowInnerDiv.style['border-bottom'] = arrowSizeSolid + ' ' + '#666';
                        arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;
                        break;
                    case 'bottom':
                        arrowPosition = { x: totalSize.width / 2 - arrowSize / 2, y: totalSize.height - arrowSize };
                        contentPosition = { x: 0, y: 0 };

                        arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                        arrowOuterDiv.style['border-top'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-bottom'] = '';
                        arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowInnerDiv.style['margin-top'] = arrowPosition.y - 1 + 'px';
                        arrowInnerDiv.style['border-top'] = arrowSizeSolid + ' ' + style.fill;
                        arrowInnerDiv.style['border-bottom'] = '';
                        arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;

                        break;
                }

                if (groupType.indexOf('line') != -1) {
                    if ((this.element.clientWidth - position.x) <= 150) {
                        x = position.x - totalSize.width + arrowSize * 4;
                        y = position.y + 20;
                        arrowPosition = { x: totalSize.width - arrowSize * 5, y: 0 };
                        contentPosition = { x: 0, y: arrowSize };

                        contentDiv.style['margin-top'] = contentPosition.y + 'px';
                        arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';

                        arrowOuterDiv.style['border-top'] = '';
                        arrowOuterDiv.style['margin-top'] = '1px';
                        arrowOuterDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowInnerDiv.style['margin-top'] = 2 + 'px';
                        arrowInnerDiv.style['border-top'] = '';
                        arrowInnerDiv.style['border-bottom'] = arrowSizeSolid + ' ' + '#666';
                        arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;
                    }else {
                        x = position.x - 30;
                        y = position.y + 20;
                        arrowPosition = { x: arrowSize * 2, y: 0 };
                        contentPosition = { x: 0, y: arrowSize };

                        contentDiv.style['margin-top'] = contentPosition.y + 'px';
                        arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';

                        arrowOuterDiv.style['border-top'] = '';
                        arrowOuterDiv.style['margin-top'] = '1px';
                        arrowOuterDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.stroke;
                        arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                        arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                        arrowInnerDiv.style['margin-top'] = 2 + 'px';
                        arrowInnerDiv.style['border-top'] = '';
                        arrowInnerDiv.style['border-bottom'] = arrowSizeSolid + ' ' + '#666';
                        arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                        arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;
                    }
                }

                if (groupType.indexOf('column') != -1) {
                    x = position.x - 30;
                    y = position.y + 20;
                    arrowPosition = { x: totalSize.width - arrowSize * 5, y: 0 };
                    contentPosition = { x: 0, y: arrowSize };

                    contentDiv.style['margin-top'] = contentPosition.y + 'px';
                    arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';

                    arrowOuterDiv.style['border-top'] = '';
                    arrowOuterDiv.style['margin-top'] = '1px';
                    arrowOuterDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.stroke;
                    arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                    arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                    arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                    arrowInnerDiv.style['margin-top'] = 2 + 'px';
                    arrowInnerDiv.style['border-top'] = '';
                    arrowInnerDiv.style['border-bottom'] = arrowSizeSolid + ' ' + '#666';
                    arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                    arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;
                }

                if (arrowLocation == '') {
                    $(arrowOuterDiv).hide();
                    $(arrowInnerDiv).hide();
                }
                else {
                    $(arrowOuterDiv).show();
                    $(arrowInnerDiv).show();
                }

                // update size
                $(divToolTip).css({ width: totalSize.width + 'px', height: totalSize.height + 'px' });

                var hostPosition = self.host.coord();
                if (isNew) {
                    $(divToolTip).fadeOut(0, 0);
                    divToolTip.style.left = x + hostPosition.left + 'px';
                    divToolTip.style.top = y + hostPosition.top - 20 + 'px';
                }

                $(divToolTip).clearQueue();
                // $(divToolTip).animate({ left: x + hostPosition.left, top: y + hostPosition.top - 20, opacity: 1 }, self.toolTipMoveDuration, 'easeInOutCirc');
                $(divToolTip).css({ left: x + hostPosition.left, top: y + hostPosition.top - 20 });
                if ((group.type==="column") && (group.orientation==="horizontal"))
                  $(divToolTip).css({ left: position.x - 23 + position.width/2, top: y + hostPosition.top - 20 });

                $(divToolTip).fadeTo(0, 1);
            },
            _applyPieSelect: function () {
                var selected = this._selected;
                if (!selected)
                    return;
                selected.element.style.strokeWidth = 2;
                selected.element.style.stroke = '#00A1CC';
            },
            _applyPieUnselect: function () {
                var selected = this._selected;
                if (!selected)
                    return;
                selected.element.style.strokeWidth = 0;
            }
            /* jshint ignore:end */
        });
        $.extend($.jqx.svgRenderer.prototype, {
            line: function (x1, y1, x2, y2, params) {
                if (y1 === y2){
                    x2 += 16;
                }
                var line = this.shape('line', { x1: x1, y1: y1, x2: x2, y2: y2 });
                this.attr(line, params);
                if (x1 === x2){
                    this.attr(line,{
                        "stroke-width":"1"
                    });
                }
                return line;
            },
            rect: function (c, j, d, f, i) {
                c = $.jqx._ptrnd(c);
                j = $.jqx._ptrnd(j);
                d = Math.max(1, $.jqx._rnd(d, 1, false));
                f = Math.max(1, $.jqx._rnd(f, 1, false));
                var e = this.shape("rect", { x: c, y: j, width: d, height: f });
                if (i) {
                    this.attr(e, i);
                }
                var round = f > 50 ? 9 : 5;
                this.attr(e, { rx: round });
                return e;
            },
            _toLinearGradient: function (f, k) {
                var d = "grd" + this._id + f.replace("#", "") + (k ? "v" : "h");
                var c = "url(" + this.getWindowHref() + "#" + d + ")";
                if (this._gradients[c]) {
                    return c;
                }

                var e = document.createElementNS(this._svgns, "linearGradient");
                this.attr(e, { x1: "0%", y1: "0%", x2: k ? "0%" : "100%", y2: k ? "100%" : "0%", id: d });
                var j = [0,50,50,100];
                f = ["#0B6DAF","#0B6DAF","#09578C","#09578C"];
                for (var i = 0; i < j.length; i++) {
                    var n = document.createElementNS(this._svgns, "stop");
                    var m = "stop-color:" + f[i];//$.jqx.adjustColor(f, j[1]);
                    this.attr(n, {
                        offset: j[i] + "%", style: m
                    });
                    e.appendChild(n);
                }
                this._defs.appendChild(e);
                this._gradients[c] = true;
                return c;
            },
            /** @private */
            _toRadialGradient: function (color, stops, coords) {
                var id = 'grd' + this._id + color.replace('#', '') + 'r' + (coords != undefined ? coords.key : '');

                var url = 'url(' + this.getWindowHref() + '#' + id + ')';
                if (this._gradients[url])
                    return url;

                var gr = document.createElementNS(this._svgns, 'radialGradient');
                if (coords == undefined)
                    this.attr(gr, { cx: '50%', cy: '50%', r: '100%', fx: '50%', fy: '50%', id: id });
                else
                    this.attr(gr, { cx: coords.x, cy: coords.y, r: coords.outerRadius, id: id, gradientUnits: 'userSpaceOnUse' });
                stops = [
                    [0,0],
                    [80,0],
                    [81,-20],
                    [100,-20]
                ];
                function adjustColor(col, amt) {
                    var usePound = false;

                    if (col[0] == "#") {
                        col = col.slice(1);
                        usePound = true;
                    }

                    var num = parseInt(col,16);

                    var r = (num >> 16) + amt;

                    if (r > 255) r = 255;
                    else if  (r < 0) r = 0;
                    var b = ((num >> 8) & 0x00FF) + amt;

                    if (b > 255) b = 255;
                    else if  (b < 0) b = 0;

                    var g = (num & 0x0000FF) + amt;

                    if (g > 255) g = 255;
                    else if (g < 0) g = 0;
                    return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
                }
                for (var i = 0; i < stops.length; i++) {
                    var stop = stops[i];
                    var s = document.createElementNS(this._svgns, 'stop');
                    var st = 'stop-color:' + adjustColor(color, stop[1]);
                    this.attr(s, { offset: stop[0] + '%', style: st });
                    gr.appendChild(s);
                }
                this._defs.appendChild(gr);
                this._gradients[url] = true;
                return url;
            }
        });
    }
}
));
