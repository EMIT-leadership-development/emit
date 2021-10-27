"use strict";

window.onload = function() {

    introSection();
    eachSection();
    animateClouds();

    function introSection() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#intro",
                pin: '#intro',
                start: "top top",
                end: "+=500px",
                scrub: 1,
                pinnedContainer: '#intro .container'
            }
        });
        tl.fromTo(".map", {backgroundPosition:"21% center"}, {backgroundPosition:"80% center"});
    }

    function eachSection() {
        let tocSections = gsap.utils.toArray('.flow');
        tocSections.forEach(section => {
            let trig = section;
            let endtrig = section.nextElementSibling;
            let line = section.querySelector('.line line');
            let imagePath = section.querySelector('.imageWrap svg path');
            let number = section.querySelector('.number');
            drawLine(trig, endtrig, line, imagePath, number);
        });
    }

    function drawLine(trig, endtrig, line, imagePath, number) {
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
        tl.from(imagePath, {duration:2, drawSVG: 0},"<");
        if (number) {
            tl.from(number,{duration:0.5, autoAlpha:0, scale:0, transformOrigin:"center center", ease:"expo.out"},"<");
        }
    }

    function animateClouds() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#emit-network',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
        tl.fromTo('#clouds', {rotate:-5, scale:1.3}, {rotate:10, scale:4, transformOrigin:"center center"});
        // tl.fromTo("#backgroundVillage",{scale: 1}, {scale:1.5, transformOrigin:"center center"},"<");
        // tl.fromTo("#joseph",{scale: 0.5, rotate:0}, {scale:1, rotate:2, transformOrigin:"center center"},"<");
    }

}