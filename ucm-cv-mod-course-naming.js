// ==UserScript==
// @name         Mod de nombres de cursos CV UCM (ucm-cv-mod-course-naming)
// @namespace    https://juancrrn.io
// @version      0.2
// @description  Mod de nombres de cursos para el Campus virtual de la Universidad Complutense de Madrid
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
mod.name = 'ucm-cv-mod-course-naming';

/**
 *
 */
class Course
{

    /**
     * Default constructor.
     */
    constructor(moodleId, ucmCode, fullName, shortName, level = null, group = null, hide = false, year = 2020, grayOut = false)
    {
        this.moodleId = moodleId;
        this.ucmCode = ucmCode;
        this.fullName = fullName;
        this.shortName = shortName;
        this.group = group;
        this.level = level;
        this.hide = hide;
        this.year = year;
        this.grayOut = grayOut;
    }

    /**
     * Fixes a course's name on the main courses list page
     */
    fixOnMainPage()
    {
        // Check if course is marked as hidden
        if (! this.hide) {
            if (this.grayOut) {
                $('.coursebox[data-courseid="' + this.moodleId + '"] .coursename a').addClass('mod-gray-out');
            }

            $('.coursebox[data-courseid="' + this.moodleId + '"] .coursename a').html('<span class="badge badge-secondary ucm-cv-mod-badge ucm-cv-mod-badge-list-shortname-fixed-w m-r-1">' + this.shortName + '</span>' + this.fullName);
        } else {
            $('.coursebox[data-courseid="' + this.moodleId + '"]').remove();
        }
    };

    /**
     * Fixes a course's name on the nav drawer (left sidebar menu)
     */
    fixOnNavDrawer()
    {
        // Pre-hide everything
        $('#nav-drawer a.list-group-item.list-group-item-action[data-key="' + this.moodleId + '"]').closest('li').remove();

        if (! this.hide) {
            var newItemHtml = `
            <li>
            <a class="list-group-item list-group-item-action" href="https://cvmdp.ucm.es/moodle/course/view.php?id=${ this.moodleId }" data-key="${ this.moodleId }" data-isexpandable="1" data-indent="1" data-showdivider="0" data-type="20" data-nodetype="1" data-collapse="0" data-forceopen="0" data-isactive="0" data-hidden="0" data-preceedwithhr="0" data-parent-key="mycourses">
            <div class="ml-1"><span class="badge badge-secondary ucm-cv-mod-badge ucm-cv-mod-badge-shortname-fixed-w m-r-1">${ this.shortName }</span></div>
            </a>
            </li>`;

            $('#nav-drawer > nav.list-group > ul').append($(newItemHtml));
        }
    };

    /**
     * Fixes a course's name on the title of the course view
     */
    fixOnCourseTitle()
    {
        $('body.course-' + this.moodleId + ' header#page-header .page-context-header h1').html('<span class="badge badge-secondary ucm-cv-mod-badge m-r-1">' + this.shortName + '</span>' + this.fullName);

        var badges = '';

        if (this.hide) {
            badges += '<span class="badge badge-warning ucm-cv-mod-badge m-r-1"><i class="icon fa fa-eye-slash fa-fw"></i> Oculto</span>';
        }

        if (this.level || this.group) {
            badges += '<span class="badge badge-secondary ucm-cv-mod-badge m-r-1">';
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

        html += '<span class="badge badge-secondary ucm-cv-mod-badge ucm-cv-mod-badge-shortname-fixed-w m-r-1">' + this.shortName + '</span>';

        if (this.level || this.group) {
            html += '<span class="badge badge-secondary ucm-cv-mod-badge m-r-1">';
            if (this.level) html += this.level + 'º';
            if (this.group) html += ' ' + this.group;
            html += '</span>';
        }

        if (this.hide) {
            html += '<i class="icon fa fa-eye-slash fa-fw"></i>';
        }

        html += this.fullName;

        $('.block_course_list a[title="' + this.ucmCode + '"]').html(html);
    };

    /**
     * Fixes a course's name on the sidebar nav tree
     */
    fixOnSidebarNavTree()
    {
        const currentThis = this;

        const treeCourseSelector = '#block-region-side-pre .block_navigation .content .block_tree.list .type_course';

        if (this.hide) {
            $(treeCourseSelector + ' .tree_item a').filter(function() {
                return $(this).text() == currentThis.ucmCode;
            }).closest(treeCourseSelector).remove();
        } else {
            const fullHtml = '<span class="badge badge-secondary ucm-cv-mod-badge ucm-cv-mod-badge-shortname-fixed-w m-r-1">' + currentThis.shortName + '</span>';

            $(treeCourseSelector + ' .tree_item a').filter(function() {
                return $(this).text() == currentThis.ucmCode;
            }).html(fullHtml);
        }
    };

    /**
     * Fixes a course's name on dashboard cards
     */
    /*fixOnDashboardCards()
    {
        $('.dashboard-card[data-course-id="' + this.moodleId + '"] .course-info-container .coursename .multilne').text(this.fullName);
    }*/

    /**
     * Calls all fix methods on a course
     */
    fixOnAll()
    {
        this.fixOnMainPage();
        this.fixOnNavDrawer();
        this.fixOnCourseTitle();
        this.fixOnBlockCourseList();
        this.fixOnSidebarNavTree();
    };
};

/**
 * @var {array} Array containing all the courses to fix
 */
mod.allCourses = [
    
];

/* Wait for the document to be loaded */
$(() => {
    /* Fix CSS styling */
    var cssText = `
    :root {
        --gray-out-color: #8c8c8c;
        --gray-out-badge-color: #e6e6e6;
        --gray-out-badge-text-color: #8a8a8a;
    }
    /* Replace body font family */
    body {
        font-family: "SF Pro Text", "Segoe UI", "Arial", sans-serif !important;
    }
    /* Fix header background */
    .bg-white {
        background-color: #ffffff !important;
    }
    /* Hide main nav bar brand */
    .navbar .navbar-brand {
        display: none !important;
    }
    /* Badges */
    .ucm-cv-mod-badge {
        border-radius: 5px;
    }
    .ucm-cv-mod-badge-shortname-fixed-w {
        width: 42px;
    }
    .ucm-cv-mod-badge-list-shortname-fixed-w {
        width: 88px;
    }
    /* Home course list */
    .courses .coursebox,
    .courses .coursebox.even,
    .courses .coursebox.odd {
        border-bottom: 1px solid #eee;
        background-color: transparent !important;
    }
    /* Gray out courses */
    .coursebox .coursename a.mod-gray-out {
        color: var(--gray-out-color);
    }
    .coursebox .coursename a.mod-gray-out .ucm-cv-mod-badge {
        background-color: var(--gray-out-badge-color);
        color: var(--gray-out-badge-text-color);
    }
    `;

    var cssTag = $('<style>' + cssText + '</style>')
    $('html > head').append(cssTag);

    /* Clean main navbar */
    $('.navbar .navbar-nav:nth-child(3)').empty();
    $('.navbar .navbar-nav:nth-child(3)').append('<li class="nav-item"><a class="nav-item nav-link" href="https://cvmdp.ucm.es/moodle/">Inicio</a></li>');

    /* Apply fixes to each course */
    $.each(mod.allCourses, function () {
        this.fixOnAll();
    });

    /* Clean course list */
    $('.coursebox>.info>.coursename a').css('background-image', 'none');
    $('.coursebox>.info>.coursename a').css('padding-left', 0);

    /* Hide teachers from the course list */
    $('.coursebox .teachers').remove();
});
