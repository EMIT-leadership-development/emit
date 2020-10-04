window.onload = function() {
    var tl = gsap.timeline({
        id: "topNavShrink",
        defaults:{duration:1},
        scrollTrigger: {
            trigger: "body",
            start: 0,
            end: 130,
            toggleActions: "play complete reverse reverse",
            scrub: 1
        }
    });
    tl.to('#headerLogo .logo', {duration:1, height:55, ease:"linear"},'<');
    tl.to('.mainNavigation',{
        duration:1,
        boxShadow: "0 1px 15px rgba(0,0,0, .15)"
    },'<');
    return tl;
}