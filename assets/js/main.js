/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


/*
    Load Header
*/

document.addEventListener("DOMContentLoaded", function () {

    fetch("includes/header.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Could not load header.html. Status: " + response.status
                );
            }

            return response.text();

        })
        .then(function (html) {

            var placeholder = document.getElementById("header-placeholder");

            if (!placeholder) {
                console.error("ERROR: #header-placeholder was not found.");
                return;
            }

            // Insert header + sidebar
            placeholder.innerHTML = html;


            /*
                Hamburger Menu
            */

            var menuToggle = document.getElementById("menu-toggle");
            var sidebar = document.getElementById("sidebar");

            if (!menuToggle || !sidebar) {
                console.error("ERROR: Menu button or sidebar was not found.");
                return;
            }

            menuToggle.addEventListener("click", function (event) {

                event.stopPropagation();

                sidebar.classList.toggle("menu-open");

                var isOpen = sidebar.classList.contains("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            });


            /*
                Close Menu When Clicking Outside
            */

            document.addEventListener("click", function (event) {

                if (
                    sidebar.classList.contains("menu-open") &&
                    !sidebar.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    sidebar.classList.remove("menu-open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /*
                Projects Submenu
            */

            var menu = document.getElementById("menu");

            if (menu) {

                var menuOpeners = menu.querySelectorAll(".opener");

                menuOpeners.forEach(function (opener) {

                    opener.addEventListener("click", function (event) {

                        event.preventDefault();

                        menuOpeners.forEach(function (otherOpener) {

                            if (otherOpener !== opener) {
                                otherOpener.classList.remove("active");
                            }

                        });

                        opener.classList.toggle("active");

                    });

                });

            }

        })
        .catch(function (error) {

            console.error("HEADER ERROR:", error);

        });

});


/*
    Editorial JavaScript
*/

(function ($) {

    var $window = $(window),
        $head = $('head'),
        $body = $('body');


    /*
        Breakpoints
    */

    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px'],
        'xlarge-to-max': '(min-width: 1681px)',
        'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
    });


    /*
        Stops animations/transitions until the page has loaded
    */

    $window.on('load', function () {

        window.setTimeout(function () {

            $body.removeClass('is-preload');

        }, 100);

    });


    /*
        Stops transitions while resizing
    */

    var resizeTimeout;

    $window.on('resize', function () {

        $body.addClass('is-resizing');

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(function () {

            $body.removeClass('is-resizing');

        }, 100);

    });


    /*
        Object-fit image fix
    */

    if (
        !browser.canUse('object-fit') ||
        browser.name == 'safari'
    ) {

        $('.image.object').each(function () {

            var $this = $(this),
                $img = $this.children('img');

            $img.css('opacity', '0');

            $this
                .css(
                    'background-image',
                    'url("' + $img.attr('src') + '")'
                )
                .css(
                    'background-size',
                    $img.css('object-fit')
                        ? $img.css('object-fit')
                        : 'cover'
                )
                .css(
                    'background-position',
                    $img.css('object-position')
                        ? $img.css('object-position')
                        : 'center'
                );

        });

    }

})(jQuery);