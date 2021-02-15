// ==UserScript==
// @name         Mod de redirección automática del CV al SSO UCM (ucm-cv-mod-autologin)
// @namespace    https://juancrrn.io
// @version      0.2
// @description  Mod de redirección de las páginas de inicio o de matrícula en curso, cuando no se ha iniciado sesión, al inicio de sesión del Campus virtual y, de ahí, al inicio de sesión único (SSO) de la Universidad Complutense de Madrid, con vuelta automática a la página de inicio o del curso. Esto permite, entre otras cosas, que, cuando se hace clic en un enlace de un email de Moodle, se reduzcan los pasos hasta llegar al contenido deseado.
// @author       juancrrn
// @match        https://cvmdp.ucm.es/moodle/*
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

    /* Check if user is already logged in */
    if ($('.navbar .nav .usermenu .login').length) {
        /* Identify redirectable pages */
        if ($('body#page-site-index').length || $('body#page-enrol-index').length) {
            var autoUrl = '';

            if ($('body#page-site-index').length) {
                /* (Site index) */
                console.log(mod.name + ': Redirecting from site index.');

                /* Generate URL to go to when login is successfull */
                autoUrl = 'https://cvmdp.ucm.es/moodle/';
            } else if ($('body#page-enrol-index').length) {
                /* (Enrol index) */
                console.log(mod.name + ': Redirecting from enrol index.');

                /* Get Moodle course identifier */
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const moodleCourseId = urlParams.get('id');

                /* Generate URL to go to when login is successfull */
                autoUrl = 'https://cvmdp.ucm.es/moodle/course/view.php?id=' + moodleCourseId;
            }

            /* Generate full Moodle SSO URL */
            const ssoIdp = 'e78505e2f935fb6b1f051035c553ed4a';
            const ssoUrl = 'https://cvmdp.ucm.es/moodle/auth/saml2/login.php?wants=' + encodeURIComponent(autoUrl) + '&idp=' + ssoIdp + '&passive=off';

            /* Redirect */
            window.location.replace(ssoUrl);
        } else {
            console.log(mod.name + ': No redirectable pages found.');
        }
    } else {
        console.log(mod.name + ': Already logged in.');

        /* If user is already logged in and enroled in a course, Moodle automatically redirects them to the course index. Else, the user stays in the enrol page. */
    }
});
