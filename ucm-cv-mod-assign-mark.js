// ==UserScript==
// @name         Mod de marcas de entregas realizadas CV UCM (ucm-cv-mod-assign-mark)
// @namespace    https://juancrrn.io
// @version      0.2
// @description  Mod de marcas de entregas realizadas para el Campus virtual de la Universidad Complutense de Madrid
// @author       juancrrn
// @match        https://cvmdp.ucm.es/moodle/course/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

/**
 * @var {Object} mod Auxiliar object used as namespace for variables and functions
 */
var mod = {};

/**
 * @var {string} name Name of the current mod, for console debugging.
 */
mod.name = 'ucm-cv-mod-assign-mark';

/**
 * @var {string} storageName Name of the stored assignments cookie.
 */
mod.storageName = 'ucm_cvmdp_stored_submitted_assignments_data_v0.2';

/**
 * Retrieves a client cookie by its name.
 *
 * @param {string} name Name of the cookie to retrieve.
 *
 * @return {string} Content of the retrieved cookie.
 */
mod.readCookie = function (name) {
    var nameEQ = name + '=';

    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

// Wait for the document to be loaded
$(() => {
    // Get stored assignments cookie
    var storedAssignmentsRaw = mod.readCookie(mod.storageName);

    console.log(mod.name + ': Currently stored assignments are ' + storedAssignmentsRaw);

    // Parse cookie
    var storedAssignments = storedAssignmentsRaw.split('-');

    $.each(storedAssignments, function (k, v) {
        var id = '#module-' + v;

        console.log(mod.name + ': ' + id + ' is stored as submitted.');

        var badgeHtml = '<span style="text-indent: 0; color: #398439; vertical-align: middle;"><i class="icon fa fa-check fa-fw " title="Entregado"></i></span>';

        // Mark the assignments
        $(badgeHtml).insertBefore(id + ' .instancename');

        $(id + ' .instancename').css('vertical-align', 'middle');
    });
});
