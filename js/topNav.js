// Thanks to: https://github.com/mrwweb/clicky-menus for original clicky-menu

 (function() {
	'use strict';
    // 1. THE CLICKY MENU SUBMENUS - THANKS TO mrwweb
	const ClickyMenus = function( menu ) {
		// DOM element(s)
		let	container = menu.parentElement,
			currentMenuItem,
			i,
			len;
		this.init = function() {
			menuSetup();
			document.addEventListener( 'click', closeOpenMenu );
		}
		// ------Menu Open / Close Functions
		function toggleOnMenuClick( e ) {
			const button = e.currentTarget;
			// close open menu if there is one
			if ( currentMenuItem && button !== currentMenuItem ) {
				toggleSubmenu( currentMenuItem );
			}
			toggleSubmenu( button );
		};
		function toggleSubmenu( button ) {
			const submenu = document.getElementById( button.getAttribute( 'aria-controls' ) );
			if ( 'true' === button.getAttribute( 'aria-expanded' ) ) {
				button.setAttribute( 'aria-expanded', false );
				submenu.setAttribute( 'aria-hidden', true );
				currentMenuItem = false;
			} else {
				button.setAttribute( 'aria-expanded', true );
				submenu.setAttribute( 'aria-hidden', false );
				preventOffScreenSubmenu( submenu );
				currentMenuItem = button;
			}
		};
		function preventOffScreenSubmenu( submenu ) {
			const 	screenWidth =	window.innerWidth ||
									document.documentElement.clientWidth ||
									document.body.clientWidth,
					parent = submenu.offsetParent,
					menuLeftEdge = parent.getBoundingClientRect().left,
					menuRightEdge = menuLeftEdge + submenu.offsetWidth;

			if ( menuRightEdge + 32 > screenWidth ) { // adding 32 so it's not too close
				submenu.classList.add( 'sub-menu--right' );
			}
		}
		function closeOnEscKey(e) {
			if(	27 === e.keyCode ) {
				// we're in a submenu item
				if( null !== e.target.closest('ul[aria-hidden="false"]') ) {
					currentMenuItem.focus();
					toggleSubmenu( currentMenuItem );
				// we're on a parent item
				} else if ( 'true' === e.target.getAttribute('aria-expanded') ) {
					toggleSubmenu( currentMenuItem );
				}
			}
		}
		function closeOpenMenu( e ) {

			if ( currentMenuItem && ! e.target.closest( '#' + container.id ) ) {
				toggleSubmenu( currentMenuItem );
			}
		};
		// Modify Menu Markup & Bind Listeners
		function menuSetup() {
			menu.classList.remove('no-js');
			menu.querySelectorAll('ul').forEach( ( submenu ) => {
				const menuItem = submenu.parentElement;
				if ( 'undefined' !== typeof submenu ) {
					let button = convertLinkToButton( menuItem );
					setUpAria( submenu, button );
					// bind event listener to button
					button.addEventListener( 'click', toggleOnMenuClick );
					menu.addEventListener( 'keyup', closeOnEscKey );
				}
			});
		};
		// Why do this? See https://justmarkup.com/articles/2019-01-21-the-link-to-button-enhancement/
		function convertLinkToButton( menuItem ) {
			const 	link = menuItem.getElementsByTagName( 'a' )[0],
					linkHTML = link.innerHTML,
					linkAtts = link.attributes,
					button = document.createElement( 'button' );
			if( null !== link ) {
				// set button content and attributes
				button.innerHTML = linkHTML.trim();
				for( i = 0, len = linkAtts.length; i < len; i++ ) {
					let attr = linkAtts[i];
					if( 'href' !== attr.name ) {
						button.setAttribute( attr.name, attr.value );
					}
				}
				menuItem.replaceChild( button, link );
			}
			return button;
		}
		function setUpAria( submenu, button ) {
			const submenuId = submenu.getAttribute( 'id' );
			let id;
			if( null === submenuId ) {
				id = button.textContent.trim().replace(/\s+/g, '-').toLowerCase() + '-submenu';
			} else {
				id = menuItemId + '-submenu';
			}
			// set button ARIA
			button.setAttribute( 'aria-controls', id );
			button.setAttribute( 'aria-expanded', false );
			// set submenu ARIA
			submenu.setAttribute( 'id', id );
			submenu.setAttribute( 'aria-hidden', true );
		}
	}
    // 2. SHOW HIDE THE MOBILE MENU
    function mobileNav() {
        const body = document.body;
        body.classList.toggle("showNav");
        console.log('clicked navButton');
    }
    // 3. GSAP TIMELINE FOR SCROLL ANIMATION (NAV HEIGHT, SHADOW, AND BACKGROUND COLOR)
    function scrollAnimation() {
        var links = gsap.utils.toArray(".topLevel");
		var isTransparent = document.querySelector(".transparentNav");
        const siteNav = document.getElementById('site-navigation');
        const logo = document.getElementById('headerLogo').getElementsByTagName('svg')[0];

        // Change links color for transparent nav
        function changeColor() {
            links.forEach(link => link.classList.toggle("blackText") )
        }

        var tl = gsap.timeline({defaults:{duration:1}, scrollTrigger: {trigger: "body", start: 0, end: 130, onEnter: changeColor, onLeaveBack: changeColor, toggleActions: "play complete reverse reverse", scrub: 1 } });
        // If the screen is larger call scroll animation else size the nav for mobile
        function screenSize(x) {
            if (x.matches) { // If media query matches
                tl.fromTo('#headerLogo .logo',{height:80}, {duration:1, height:55, ease:"linear"},'<');
                tl.to('.mainNavigation',{duration:1, boxShadow: "0 1px 15px rgba(0,0,0, .15)"},'<');
                if (isTransparent) {
                    tl.to('.mainNavigation',{duration:1,backgroundImage:"linear-gradient(90deg, #89b412 5%, transparent 30%)", backgroundColor:"#abe116"},"<");
                }
                // return tl;
            } else {
                // tl.to(logo,{height:55},0);
                tl.pause();
                logo.style.height = '55px';
            }
        }
        var x = window.matchMedia("(min-width: 540px)")
        screenSize(x) // Call listener function at run time
        x.addListener(screenSize) // Attach listener function on state changes
    }

	document.addEventListener('DOMContentLoaded', function(){
        // Vars
		const menus = document.querySelectorAll( '.clicky-menu' );
        const navButton = document.querySelector(".navButton");

        // Create a ClickMenus object and initiate menu for any menu with .clicky-menu class */
		menus.forEach( menu => {
			let clickyMenu = new ClickyMenus(menu);
			clickyMenu.init();
		});
        // Sonya: added mobile hamburger nav button - NB: ToDo: this has no no-js fallback!
        navButton.addEventListener("click", function() {
            mobileNav();
        });
        // scroll animation
        scrollAnimation();

	});
}());