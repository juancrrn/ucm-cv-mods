// ==UserScript==
// @name         Mod de redirección automática del CV al SSO UCM
//               (ucm-cv-mod-autologin)
// @namespace    https://juancrrn.io
// @version      0.1
// @description  Mod de redirección de la página de matrícula en curso, cuando
//               no se ha iniciado sesión, al inicio de sesión del Campus
//               virtual y, de ahí, al inicio de sesión único (SSO) de la
//               Universidad Complutense de Madrid, con vuelta automática a la
//               página del curso. Esto permite, entre otras cosas, que, cuando
//               se hace clic en un enlace de un email de Moodle, se reduzcan
//               los pasos hasta llegar al contenido deseado.
// @author       juancrrn
// @match        https://cvmdp.ucm.es/moodle/enrol/index.php?id=*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-start
// ==/UserScript==

/**
 * @var {Object} mod Auxiliar object used as namespace for variables and functions
 */
var mod = {};

/**
 * @var {string} name Name of the current mod, for console debugging.
 */
mod.name = 'ucm-cv-mod-autologin';

/* Wait for the document to be loaded */
$(() => {
    /* Get Moodle course identifier */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const moodleCourseId = urlParams.get('id');

    /* Generate URL to go to when login is successfull */
    const autoUrl = 'https://cvmdp.ucm.es/moodle/course/view.php?id=' + moodleCourseId;

    /* Generate full Moodle SSO URL */
    const ssoIdp = 'e78505e2f935fb6b1f051035c553ed4a';
    const ssoUrl = 'https://cvmdp.ucm.es/moodle/auth/saml2/login.php?wants=' + encodeURIComponent(autoUrl) + '&idp=' + ssoIdp + '&passive=off';

    window.location.replace(ssoUrl);
});
