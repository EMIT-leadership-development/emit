"use strict";

window.onload = function() {

    introSection();
    eachSection();
    // theorySection();
    // activitiesSection();

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
    }

    function eachSection() {
        let tocSections = gsap.utils.toArray('section');
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