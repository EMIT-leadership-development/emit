window.addEventListener('load',function(){
    initNavAnimation();
    initNavClick();
    // initHoverActive();
})

// Click to show the subnav
function initNavClick() {
    const submenuItems = document.querySelectorAll(".subnavBtn");
    submenuItems.forEach((button, index) => {
        // let chevron = button.getElementsByTagName("svg");
        let subMenuID = button.getAttribute('data-subnavID');
        let subMenu = document.getElementById(subMenuID);
        let closeBtn = subMenu.querySelector(".closeSubMenu");

        // timeline setup
        let tl = gsap.timeline({paused: true, defaults: {duration: .3, ease: "expo.inOut"},})
        tl.fromTo(subMenu, {autoAlpha:0, scaleY:0}, {autoAlpha:1, scaleY:1, transformOrigin:"center top"},">");

        button.addEventListener("click", openUp);

        function openUp(e) {
            // Add noscroll to body
            document.body.classList.add('noscroll');
            // TODO: close any subnavs that are open
            button.classList.add('subnavOpen');
            tl.play()
            button.addEventListener("click", closeAgain);
            closeBtn.addEventListener("click", closeAgain);
            subMenu.addEventListener("click", closeAgain);
            document.addEventListener('keydown', function(event){
                if(event.key === "Escape"){
                    closeAgain();
                }
            });
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
    scrolltl.fromTo('.defaultheader #logoWrap',{height:100}, {duration:1, height:60, ease:"linear"},'<');
    scrolltl.to('.defaultheader', {duration:1, boxShadow:"0 2px 9px rgba(0,0,0,0.7)"},'<');
    // scrolltl.to('.defaultheader #topLevel, .defaultheader #logoWrap, .defaultheader #actions', {duration:1, color:"rgba(0,0,0,0.8)", backgroundColor:"#abe116"},'<');
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