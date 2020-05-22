// ==UserScript==
// @name         Mod de recolección de entregas realizadas CV UCM (ucm-cv-mod-assign-rec)
// @namespace    https://juancarrion.xyz
// @version      0.1
// @description  Mod de recolección de entregas realizadas para el Campus virtual de la Universidad Complutense de Madrid
// @author       juancrrn
// @match        https://cv4.ucm.es/moodle/mod/assign/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

/**
 * @var {Object} mod Auxiliar object used as namespace for variables and functions
 */
var mod = {};

/**
 * @var {string} name Name of the current mod, for console debugging.
 */
mod.name = 'ucm-cv-mod-assign-rec';

/**
 * @var {string} storageName Name of the stored assignments cookie.
 */
mod.storageName = 'ucm_cv4_stored_submitted_assignments_data_v0.0.1';

/**
 * Retrieves the value of a param of the current URL by its name.
 *
 * @param {string} name Name of the param to retrieve.
 *
 * @return {string} Value of the retrieved param.
 */
mod.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

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

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

// Wait for the document to be loaded
$(() => {
    // Get the Moodle id of the current assignment
    var currentAssignmentId = mod.urlParam('id');

    console.log(mod.name + ': Assignment ' + currentAssignmentId + ' detected');

    // Check if assignment is submitted in Moodle
    if ($(".submissionstatussubmitted").length) {
        console.log(mod.name + ': Assignment ' + currentAssignmentId + ' detected as submitted.');

        //  Get stored assignments
        var storedAssignmentsRaw = mod.readCookie(mod.storageName);

        // Check if cookie exists
        if (storedAssignmentsRaw === null) {
            // If cookie does not exist, then create it
            document.cookie = mod.storageName + '=' + currentAssignmentId + '-; expires=Thu, 18 Dec 2090 12:00:00 UTC; domain=; path=/';

            console.log(mod.name + ': Stored assignment ' + currentAssignmentId + ' as submitted.');
        } else {
            // Check if this assignment was already stored
            var storedAssignments = storedAssignmentsRaw.split('-');

            if ($.inArray(currentAssignmentId, storedAssignments) == -1) {
                // Else, store this assignment
                document.cookie = mod.storageName + '=' + storedAssignmentsRaw + currentAssignmentId + '-; expires=Thu, 18 Dec 2090 12:00:00 UTC; domain=; path=/';

                console.log(mod.name + ': Stored assignment ' + currentAssignmentId + ' as submitted.');
            } else {
                console.log(mod.name + ': Assignment ' + currentAssignmentId + ' had already been stored as submitted.');
            }
        }

        console.log(mod.name + ': Currently stored submitted assignments are ' + mod.readCookie(mod.storageName));
    } else {
        console.log(mod.name + ': Assignment ' + currentAssignmentId + ' has not yet been submitted.');
    }
});
