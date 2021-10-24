"use strict";

window.onload = function() {

    introSection();

    function introSection() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#planetWrap",
                pin: '#intro',
                start: "center center",
                end: "bottom top",
                scrub: 1,
            }
        });
        tl.to(".planet", {backgroundPosition:"80% 85%" });
        tl.to("body#theoryOfChange",{backgroundColor:"#EDF5F9"},"<");
        tl.to("#intro p, #intro h2",{color:"rgba(0,0,0,0.8)"},"<");
    }
}