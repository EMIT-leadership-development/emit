"use strict";

window.onload = function() {

    introSection();
    eachSection();

    function introSection() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#intro",
                pin: '#intro',
                start: "top top",
                end: "+=500px",
                scrub: 1,
            }
        });
        tl.to(".map", {backgroundPosition:"80% 80%"});
    }

    function eachSection() {
        let tocSections = gsap.utils.toArray('.flow');
        tocSections.forEach(section => {
            let trig = section;
            let endtrig = section.nextElementSibling;
            let line = section.querySelector('.line line');
            let number = section.querySelector('.number');
            drawLine(trig, endtrig, line, number);
        });
    }

    function drawLine(trig, endtrig, line, number) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: trig,
                start: "top center",
                endTrigger: endtrig,
                end: "top center",
                scrub: 1
            }
        });
        tl.from(line, {duration:2, drawSVG: 0});
        tl.from(number,{duration:0.5, autoAlpha:0, scale:0, transformOrigin:"center center", ease:"expo.out"},"<");
    }

}