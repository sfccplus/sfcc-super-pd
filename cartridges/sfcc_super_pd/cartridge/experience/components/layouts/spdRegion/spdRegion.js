'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Logger = require('dw/system/Logger');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for Super Region component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge (must be serializable). This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var content = context.content;
    var component = context.component;
    var regionEditor = content.regionEditor.value;
    var componentId = component.ID;
    var regionClassName = 'spdlayout-region';
    
    var cssSelectorByEditor = 'region-' + regionEditor.key;
    var cssSelectorForIndividualRegion = 'region-' + componentId;
    
    if (regionEditor) {
        regionClassName += ' ' + cssSelectorForIndividualRegion;
    }

    var componentRenderSettings = context.componentRenderSettings;
    componentRenderSettings.setAttributes({
        class: regionClassName,
    });

    model.regionsCss = regionEditor ? regionEditor.regionRawCss.replace(cssSelectorByEditor,cssSelectorForIndividualRegion) : '';

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/layouts/spdRegion').render(model).text;
};
