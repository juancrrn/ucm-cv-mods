// ==UserScript==
// @name         Mod de nombres de cursos CV UCM (ucm-cv-mod-course-naming)
// @namespace    https://juancrrn.io
// @version      0.1
// @description  Mod de nombres de cursos para el Campus virtual de la Universidad Complutense de Madrid
// @author       juancrrn
// @match        https://cvmdp.ucm.es/moodle/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

/**
 * @var {Object} mod Auxiliar object used as namespace for variables and functions
 */
var mod = {};

/**
 * @var {string} name Name of the current mod, for console debugging.
 */
mod.name = 'ucm-cv-mod-course-naming';

/**
 *
 */
class Course
{

    /**
     * Default constructor.
     */
    constructor(moodleId, ucmCode, fullName, shortName, level = null, group = null, hide = false, year = 2020)
    {
        this.moodleId = moodleId;
        this.ucmCode = ucmCode;
        this.fullName = fullName;
        this.shortName = shortName;
        this.group = group;
        this.level = level;
        this.hide = hide;
        this.year = year;
    }

    /**
     * Fixes a course's name on the main courses list page
     */
    fixOnMainPage()
    {
        // Check if course is marked as hidden
        if (! this.hide) {
            $('.coursebox[data-courseid="' + this.moodleId + '"] .coursename a').html('<span class="badge m-r-1">' + this.shortName + '</span>' + this.fullName);
        } else {
            $('.coursebox[data-courseid="' + this.moodleId + '"]').hide();
        }
    };

    /**
     * Fixes a course's name on the nav drawer (left sidebar menu)
     */
    fixOnNavDrawer()
    {
        // Check if course is marked as hidden
        if (! this.hide) {
            $('#nav-drawer a.list-group-item.list-group-item-action[data-key="' + this.moodleId + '"] div').html('<span class="badge m-r-1">' + this.shortName + '</span>');
        } else {
            $('#nav-drawer a.list-group-item.list-group-item-action[data-key="' + this.moodleId + '"]').hide();
        }
    };

    /**
     * Fixes a course's name on the title of the course view
     */
    fixOnCourseTitle()
    {
        $('body.course-' + this.moodleId + ' header#page-header .page-context-header h1').html('<span class="badge m-r-1">' + this.shortName + '</span>' + this.fullName);

        var badges = '';

        if (this.hide) {
            badges += '<span class="badge badge-warning m-r-1">Oculto</span>';
        }

        if (this.level || this.group) {
            badges += '<span class="badge m-r-1">';
            if (this.level) badges += this.level + 'º';
            if (this.group) badges += ' ' + this.group;
            badges += '</span>';
        }

        $('<div class="clearfix w-100 pull-xs-left">' + badges + '</div>').insertBefore('body.course-' + this.moodleId + ' header#page-header #page-navbar');
        $('body.course-' + this.moodleId + ' header#page-header #page-navbar a:contains(' + this.ucmCode + ')').text(this.shortName);
        $('body.course-' + this.moodleId + ' a[data-key="coursehome"]').text(this.shortName);
    };

    /**
     * Fixes a course's name on the course list nav drawer
     */
    fixOnBlockCourseList()
    {
        var html = '';

        html += '<span class="badge m-r-1">' + this.shortName + '</span>';

        if (this.level || this.group) {
            html += '<span class="badge m-r-1">';
            if (this.level) html += this.level + 'º';
            if (this.group) html += ' ' + this.group;
            html += '</span>';
        }

        html += this.fullName;

        $('.block_course_list a[title="' + this.ucmCode + '"]').html(html);
    };

    /**
     * Calls all fix methods on a course
     */
    fixOnAll()
    {
        this.fixOnMainPage();
        this.fixOnNavDrawer();
        this.fixOnCourseTitle();
        this.fixOnBlockCourseList();
    };
};

/**
 * @var {array} Array containing all the courses to fix
 */
mod.allCourses = [
    // ...
];

// Wait for the document to be loaded
$(() => {
    // Replace body font family
    $('body').css('font-family', '"SF Pro Text", "Segoe UI", "Arial", sans-serif');

    // Apply fixes to each course
    $.each(mod.allCourses, function () {
        this.fixOnAll();
    });

    // Clean course list
    $('.coursebox>.info>.coursename a').css('background-image', 'none');
    $('.coursebox>.info>.coursename a').css('padding-left', 0);

    // Hide teachers from the course list
    $('.coursebox .teachers').hide();

    // Hide main nav bar brand
    $('.navbar-brand').hide();

    // Prepend a Moodle home link to the main nav bar
    $('.nav.navbar-nav.hidden-md-down').prepend('<a class="nav-item nav-link" href="https://cv4.ucm.es/moodle/">Inicio</a>');
});
