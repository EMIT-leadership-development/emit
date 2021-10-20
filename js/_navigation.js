window.onload = function() {
    console.log("hello nav!");
    // var links = gsap.utils.toArray(".topLevel li");
    // var isTransparent = document.querySelector(".transparentNav");

    // function changeColor() {
    //     links.forEach(link => link.classList.toggle("blackText") )
    // }
    var tl = gsap.timeline({
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
    tl.to('.logoWrap .logo', {duration:1, height:55, ease:"linear"},'<');
    tl.to('.defaultheader',{
        duration:1,
        boxShadow: "0 1px 15px rgba(0,0,0, .15)"
    },'<');

    // if (isTransparent) {
    //     tl.to('.mainNavigation',{duration:1,backgroundImage:"linear-gradient(90deg, #89b412 5%, transparent 30%)", backgroundColor:"#abe116"},"<");
    // }
    return tl;
}