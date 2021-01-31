// ==UserScript==
// @name         Mod de modo oscuro CV UCM (ucm-cv-mod-dark-mode)
// @namespace    https://juancrrn.io
// @version      0.2
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
    }
    a {
      color: var(--mod-accent-color) !important;
    }
    body {
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
    `;

    var cssTag = $('<style>' + cssText + '</style>')
    $('html > head').append(cssTag);

    /* Fix logo */
    $('#page-header .card .card-body .logo img, .path-login.pagelayout-login #page-content #region-main h2.card-header img').attr('src', 'https://biblioteca.ucm.es/data/cont/media/www/pag-123043/Marca%20UCM%20Secundaria%20Monocromo%20Blanco.png');
});
