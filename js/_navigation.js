window.addEventListener('load',function(){
    initNavAnimation();
    initNavClick();
})

function initNavClick() {
    const submenuItems = document.querySelectorAll(".hasSubMenu");

    submenuItems.forEach((item, index) => {
        let button = item.querySelector(".subnavBtn");
        let closeBtn = item.querySelector(".closeSubMenu");
        let subMenu = item.querySelector(".subMenu");

        // timeline setup
        let tl = gsap.timeline({
            paused: true,
            defaults: {
                duration: .3,
                ease: "power2.out"
            },
        })
        tl.to(subMenu, {autoAlpha:1, scale:1})

        button.addEventListener("click", openUp);
        function openUp(e) {
            tl.play()
            closeBtn.addEventListener("click", closeAgain);
        }

        function closeAgain(e) {
            tl.reverse()
            closeBtn.removeEventListener("click", closeAgain);
        }
    });
}

function initNavAnimation() {
    var scrolltl = gsap.timeline({
        defaults:{duration:1},
        scrollTrigger: {
            trigger: "body",
            start: 0,
            end: 130,
            // onEnter: changeColor,
            // onLeaveBack: changeColor,
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