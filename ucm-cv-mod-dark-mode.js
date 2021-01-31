// ==UserScript==
// @name         Mod de modo oscuro CV UCM (ucm-cv-mod-dark-mode)
// @namespace    https://juancrrn.io
// @version      0.3
// @description  Mod de modo oscuro para el Campus virtual de la Universidad Complutense de Madrid
// @author       juancrrn
// @match        https://cvmdp.ucm.es/moodle/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-start
// ==/UserScript==

/**
 * @var {string} Accent color
 *
 * Suggestions:
 * - Blue: #4479cc
 * - Red: #bd4a6a
 */
const mod_accent_color = '#4479cc';

/**
 * @var {Object} mod Auxiliar object used as namespace for variables and functions
 */
var mod = {};

/**
 * @var {string} name Name of the current mod, for console debugging.
 */
mod.name = 'ucm-cv-mod-dark-mode';

/* Wait for the document to be loaded */
$(() => {
    /* Fix CSS styling */
    var cssText = `
    :root {
      --light-background: #2D2D31;
      --dark-background: #1f2022;
      --lighter-background: #404046;
      --mod-accent-color: ${ mod_accent_color };
      --mod-graded-green: #49734f;
      --mod-submitted-green: #334836;
    }
    a {
      color: var(--mod-accent-color) !important;
    }
    html, body {
      background-color:  var(--dark-background) !important;
      color: #eee;
    }
    .card, #page-enrol-users #filterform, .que .history, .userprofile .profile_tree section, .groupinfobox, .well {
      background-color: var(--light-background) !important;
    }
    #region-main {
      background-color: var(--light-background) !important;
    }
    [data-region="drawer"] {
      background-color: var(--dark-background) !important;
    }
    #page-course-view-topics {
    }
    .course-content ul li.section.main {
      border-bottom-color: var(--lighter-background);
    }
    .bg-white {
      background-color: var(--light-background) !important;
    }
    .list-group-item.active {
      background-color:  var(--lighter-background) !important;
      border-color: var(--lighter-background) !important;
    }
    .list-group-item {
      background-color: var(--light-background) !important;
    }
    .navbar-light .navbar-nav .nav-link {
      color: var(--light) !important;
    }
    .courses .coursebox, .courses .coursebox.even, .courses .coursebox.odd {
      border-bottom-color: var(--lighter-background) !important;
    }
    .bg-gray {
      background-color: var(--lighter-background) !important;
      border-color: var(--lighter-background) !important;
      color: var(--light) !important;
    }

    /* Submission page*/

    .table, table.collection, table.flexible, .generaltable {
      color: var(--light) !important;
    }
    .table-hover tbody tr:hover, table.grading-report tbody tr:hover, .forumheaderlist tbody tr:hover, .generaltable tbody tr:hover, table.flexible tbody tr:hover, .category_subcategories tbody tr:hover, table#modules tbody tr:hover, table#permissions tbody tr:hover {
      color: var(--light) !important;
      background-color: var(--lighter-background);
    }
    .table th, table.collection th, table.flexible th, .generaltable th, .table td, table.collection td, table.flexible td, .generaltable td {
      border-top-color: var(--lighter-background) !important;
    }
    .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted {
      color: var(--light) !important;
      background-color: var(--mod-submitted-green) !important;
    }
    .path-mod-assign td.earlysubmission, .path-mod-assign div.earlysubmission {
      color: var(--light) !important;
      background-color: var(--mod-submitted-green) !important;
    }
    .path-mod-assign td.submissionnotgraded, .path-mod-assign div.submissionnotgraded {
      color: var(--light) !important;
      background-color: var(--lighter-background) !important;
    }
    .path-mod-assign td.submissiongraded, .path-mod-assign div.submissiongraded {
        color: var(--light) !important;
        background-color: var(--mod-ok-green) !important;
    }

    /* Adaptable Moodle Theme (green one) */

    h1, h2, h3, h4, h5, h6 {
        color: var(--light) !important;
    }

    #adaptable-page-header-wrapper #main-navbar {
        background-color: var(--light-background) !important;
        border-bottom-color: var(--lighter-background) !important;
    }

    #above-header {
        background-color: var(--dark-background) !important;
        border-bottom-color: var(--lighter-background) !important;
    }

    #adaptable-page-header-wrapper {
        background-color: var(--light-background) !important;
    }

    #page .course-content ul li.section.main {
        background-color: var(--light-background) !important;
        border-color: var(--light-background) !important;
    }

    .section li.modtype_quiz div.activity-wrapper {
        background-color: var(--lighter-background) !important;
        border-bottom-color: var(--dark-background) !important;
    }

    .section li.modtype_assign div.activity-wrapper {
        background-color: var(--lighter-background) !important;
        border-bottom-color: var(--dark-background) !important;
    }

    .sectionname {
        background-color: transparent !important;
        color: var(--light) !important;
    }

    .breadcrumb {
        background-color: var(--light-background) !important;
    }

    .breadcrumb ul i, .breadcrumb li.lastli span {
        color: var(--light) !important;
    }
    `;

    var cssTag = $('<style>' + cssText + '</style>')
    $('html > head').append(cssTag);

    /* Fix logo */
    $('#page-header .card .card-body .logo img, .path-login.pagelayout-login #page-content #region-main h2.card-header img').attr('src', 'https://biblioteca.ucm.es/data/cont/media/www/pag-123043/Marca%20UCM%20Secundaria%20Monocromo%20Blanco.png');
});
