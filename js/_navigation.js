window.addEventListener('load',function(){
    initNavAnimation();
    initNavClick();
    initHoverActive();
})

function initNavClick() {
    const submenuItems = document.querySelectorAll(".hasSubMenu");

    submenuItems.forEach((item, index) => {
        let button = item.querySelector(".subnavBtn");
        let closeBtn = item.querySelector(".closeSubMenu");
        let activeIndicator = item.querySelector(".activeIndicator");
        let subMenu = item.querySelector(".subMenu");

        // timeline setup
        let tl = gsap.timeline({
            paused: true,
            defaults: {
                duration: .3,
                ease: "expo.inOut"
            },
        })
        // tl.to(activeIndicator,{width:"100vw", transformOrigin:"center center"},">");
        tl.to(subMenu, {autoAlpha:1, scaleY:1, position:"fixed", left:0, transformOrigin:"center top"},">")

        button.addEventListener("click", openUp);
        function openUp(e) {
            tl.play()
            button.addEventListener("click", closeAgain);
        }

        function closeAgain(e) {
            tl.reverse()
            button.removeEventListener("click", closeAgain);
        }
    });
}

// Moving the indicator when you hover over a menu item
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
    scrolltl.to('.logoWrap .logo', {duration:1, height:55, ease:"linear"},'<');
    scrolltl.to('.defaultheader',{
        duration:1,
        boxShadow: "0 1px 15px rgba(0,0,0, .15)"
    },'<');
    return scrolltl;
}