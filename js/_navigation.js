window.addEventListener('load',function(){
    initNavAnimation();
    initNavClick();
    // initHoverActive();
})

// Click to show the subnav
function initNavClick() {
    const submenuItems = document.querySelectorAll(".hasSubMenu");
    submenuItems.forEach((item, index) => {
        let button = item.querySelector(".subnavBtn");
        let closeBtn = item.querySelector(".closeSubMenu");
        let activeIndicator = item.querySelector(".activeIndicator");
        let chevron = item.querySelector(".subnavBtn").getElementsByTagName("svg");
        let subMenu = item.querySelector(".subMenu");

        // timeline setup
        let tl = gsap.timeline({paused: true, defaults: {duration: .3, ease: "expo.inOut"},})
        tl.to(subMenu, {autoAlpha:1, scaleY:1, transformOrigin:"center top"},">");
        tl.to(chevron,{rotate:180, transformOrigin:"center center" },"<");

        button.addEventListener("click", openUp);
        function openUp(e) {
            // Add noscroll to body
            document.body.classList.add('noscroll');
            // TODO: close any subnavs that are open
            item.classList.add('subnavOpen');
            tl.play()
            button.addEventListener("click", closeAgain);
            closeBtn.addEventListener("click", closeAgain);
        }

        function closeAgain(e) {
            document.body.classList.remove('noscroll');
            tl.reverse()
            button.removeEventListener("click", closeAgain);
        }
    });
}

// Nav height on scroll
function initNavAnimation() {
    var scrolltl = gsap.timeline({
        defaults:{duration:1},
        scrollTrigger: {
            trigger: "body",
            start: 0,
            end: 130,
            toggleActions: "play complete reverse reverse",
            scrub: 1
        }
    });
    scrolltl.fromTo('.logoWrap .logo',{height:"80px"}, {duration:1, height:55, ease:"linear"},'<');
    scrolltl.to('.defaultheader',{
        duration:1,
        boxShadow: "0 1px 15px rgba(0,0,0, .15)"
    },'<');
    return scrolltl;
}

// Moving the indicator when you hover over a menu item
// Development on hold! See Trello
function initHoverActive() {
    const navItems = document.querySelectorAll(".level1, .actionButton");
    // let navParent = document.getElementById("mainHeader");
    let topNav = document.querySelector('.topLevel');
    let actionsNav = document.querySelector('.actions');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', e => {
            doFlip(e.target);
        });
        topNav.addEventListener('mouseleave', e => {
            revertFlip();
        });
        actionsNav.addEventListener('mouseleave', e => {
            revertFlip();
        });

        function doFlip(hoveredItem) {
            let activeIndicator = document.querySelector('.activeIndicator');
            let activeContainer = activeIndicator.parentElement;
            let newContainer = hoveredItem;

            const state = Flip.getState(activeIndicator);
            if (activeContainer != newContainer) {
                newContainer.append(activeIndicator);
            };
            Flip.from(state, {duration: 0.3, ease: "power1.inOut"});
        }

        function revertFlip() {
            let activeIndicator = document.querySelector('.activeIndicator');
            let activeContainer = activeIndicator.parentElement;
            let activeMenuItem = document.querySelector('nav').querySelector('li.active');

            const state = Flip.getState(activeIndicator);
            if (activeContainer != activeMenuItem) {
                activeMenuItem.append(activeIndicator);
            };
            Flip.from(state, {duration: 0.3, ease: "power1.inOut"});
        }

    });
};