"use strict";

// VARIABLES COPIED FROM SCSS pre.scss
var $brand = "#abe116",
	$primary = "#abe116",
	$brandDarker = "#99ca13",
	$sphere1BG = "#85b744",
	$sphere2BG = "#37ab5d",
	$sphere3BG = "#03956d",
	$brandContrastDark = "#272c33",
	$brandContrastDarkest = "#1c2127",
	$brandContrastLight = "#EDF5F9",
	$brandContrastLight2 = "#e0e8ea",
	$brandContrastLight3 = "#BCC4C6",
	$brandContrastLight4 = "#A5ABAD";

// ---------------------ADD ALL THE ANIMATIONS TO THE MOTHER TIMELINE
window.onload = function() {

	NINJA_FUNCTIONS.playVideo("heroVideo");

	// Start up functions
	NINJA_FUNCTIONS.startup();
	NINJA_FUNCTIONS.parrallaxHover();
	NINJA_FUNCTIONS.cursorFollower();

	// Listen for button clicks
	// document.querySelector("#startOnTenExplore").addEventListener("click", function(){motherTL.tweenFromTo("exploreonten","donate");})

	// Functions to be called in slider
	var topNavTL = NINJA_FUNCTIONS.topnav();
	var motherTL = NINJA_FUNCTIONS.motherTimeline();

	let titletl;

	// SWIPER SETUP
	const mySwiper = new Swiper('.swiper-container', {

		// Optional parameters
		direction: 'vertical',
		loop: false,
		simulateTouch: false,
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">0' + (index + 1) + '</span>';
			}
		},
		// Keyboard control
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		// Scrolling control
		mousewheel: {
			// invert: true,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			// prevEl: '.swiper-button-prev',
		},
		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		}
	});

	// SWIPER ANIMATIONS - TRANSITION START
	mySwiper.on('slideChangeTransitionStart', function() {
		if (this.realIndex == 1) {
			topNavTL.play();
		}
		// HERO SLIDE
		if (this.realIndex == 0) {
			NINJA_FUNCTIONS.moveStageWrap("stageHolder");
			motherTL.pause();
			motherTL.time(0);
		}
	})
	// SWIPER ANIMATIONS - TRANSITION END
	mySwiper.on('slideChangeTransitionEnd', function() {
		// Pause and rewind any playing title animations
		if (titletl) {
            titletl.pause();
            titletl.time(0);
        };
		// Animate the slide titles for each slide except the hero
		if (this.realIndex >= 1) {
			var title = document.querySelector('.swiper-slide-active .sectionHeadline h1');
			var subtitle = document.querySelector('.swiper-slide-active .subtitle');
			var underline = document.querySelector('.swiper-slide-active .sectionHeadline .underline');
			titletl = NINJA_FUNCTIONS.playTitle(title, subtitle, underline);
			titletl.play();
		}
		// HERO SLIDE
		if (this.realIndex == 0) {
			topNavTL.reverse();
		}
		// IMPACT SLIDE
		if (this.realIndex == 1) {
			NINJA_FUNCTIONS.moveStageWrap("impact-stage");
			motherTL.tweenFromTo("impact","legacy");
		}
		// LEGACY SLIDE
		if (this.realIndex == 2) {
			NINJA_FUNCTIONS.moveStageWrap("legacy-stage");
			motherTL.tweenFromTo("legacy","leaders")
		}
		// LEADERS SLIDE
		if (this.realIndex == 3) {
			NINJA_FUNCTIONS.moveStageWrap("leaders-stage");
			motherTL.tweenFromTo("leaders","anna");
		}
		// ANNA SLIDE
		if (this.realIndex == 4) {
			NINJA_FUNCTIONS.moveStageWrap("anna-stage");
			motherTL.tweenFromTo("anna","joseph");
		}
		// JOSEPH SLIDE
		if (this.realIndex == 5) {
			NINJA_FUNCTIONS.moveStageWrap("joseph-stage");
			motherTL.tweenFromTo("joseph","onten");
		}
		// ON-TEN SLIDE
		if (this.realIndex == 6) {
			NINJA_FUNCTIONS.moveStageWrap("onten-stage");
			motherTL.tweenFromTo("onten","traction");
		}
		// TRACTION SLIDE
		if (this.realIndex == 7) {
			NINJA_FUNCTIONS.moveStageWrap("traction-stage");
			motherTL.tweenFromTo("traction","donate");
		}
		// DONATE SLIDE
		if (this.realIndex == 8) {
			NINJA_FUNCTIONS.moveStageWrap("donate-stage");
			motherTL.tweenFromTo("donate","end");
		}
	});

} //End window.load

// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {

	//Startup functions on page load
	startup: function() {
		var tl = gsap.timeline({
			id: "Landing Scene",
			defaults:{duration:0.5},
		});
		tl.from('#mainHeader nav li', {autoAlpha:0, x:-100, stagger:0.1, ease:"linear"},"<");
		tl.from('#mainHeader .logoWrap .logo', {autoAlpha:0, x:-100, ease:"linear"}, "<");
		tl.from('.introHeadline h1 span', {autoAlpha:0, x:100, stagger:0.1, ease:"linear"},"<" );
		return tl;
	},
	parrallaxHover: function() {
        document.addEventListener("mousemove", parrallax)
        function parrallax(e) {
            this.querySelectorAll('.layer').forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                const x = (window.innerWidth - e.pageX*speed)/100;
                const y = (window.innerHeight - e.pageY*speed)/100;
                gsap.to(layer,{duration:0.3, x:x, y:y});
            })
        }
	},
	cursorFollower: function() {
		gsap.set(".cursorFollower", {xPercent: -50, yPercent: -50});
		gsap.set(".cursorFollowerInner", {xPercent: -50, yPercent: -50});
		const cursorFollower = document.querySelector(".cursorFollower");
		const cursorFollowerInner = document.querySelector(".cursorFollowerInner");
		var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		var pos2 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		var mouse = { x: pos.x, y: pos.y };
		var speed = 0.1;
		var speed2 = 0.8;
		var fpms = 60 / 1000;
		var xSet = gsap.quickSetter(cursorFollower, "x", "px");
		var ySet = gsap.quickSetter(cursorFollower, "y", "px");
		var xSetInner = gsap.quickSetter(cursorFollowerInner, "x", "px");
		var ySetInner = gsap.quickSetter(cursorFollowerInner, "y", "px");
		window.addEventListener("mousemove", e => {
			mouse.x = e.x;
			mouse.y = e.y;
		});
		gsap.ticker.add((time, deltaTime) => {
			var delta = deltaTime * fpms;
			var dt = 1.0 - Math.pow(1.0 - speed, delta);
			pos.x += (mouse.x - pos.x) * dt;
			pos.y += (mouse.y - pos.y) * dt;
			xSet(pos.x + 5);
			ySet(pos.y + 5);

			var delta2 = deltaTime * fpms;
			var dt2 = 1.0 - Math.pow(1.0 - speed2, delta2);
			pos2.x += (mouse.x - pos2.x) * dt2;
			pos2.y += (mouse.y - pos2.y) * dt2;
			xSetInner(pos2.x + 5);
			ySetInner(pos2.y + 5);
		});
		const animateCursor = gsap.timeline({
			paused:true,
			defaults:{duration:0.5},
		});
		animateCursor.add('start');
		animateCursor.to(".cursorFollower",{transformOrigin:"center center", width:100, height:100, ease: "elastic.in(1, 0.5)"},"<");
		animateCursor.to(".cursorFollowerInner",{transformOrigin:"center center", scale:0, ease: "elastic.in(1, 0.5)"},"<");
		animateCursor.add('end');
		const hoverElements = gsap.utils.toArray(['.hoverAnim', '#next1', '#next2', '#next3', '#next4', '#leaderButton-1', '#leaderButton-2', '#leaderButton-3', '#leaderButton-4', '#leaderButton-5', '#leaderButton-6', '#leaderButton-7', '#leaderButton-8', '#leaderButton-9', '#leaderButton-10']);
		hoverElements.forEach((element) => {
			element.addEventListener("mouseenter", () => animateCursor.play());
			element.addEventListener("mouseleave", () => animateCursor.reverse());
		});
	},
	// Play video function
	playVideo: function(vidID) {
		// From google developer docs - must still test - video does not always play on chrome
		var video = document.getElementById(vidID);
		// Show loading animation.
		var playPromise = video.play();

		if (playPromise !== undefined) {
		  playPromise.then(_ => {
			// Automatic playback started!
			// Show playing UI.
			console.log("playing video");
		  })
		  .catch(error => {
			// Auto-play was prevented
			// Show paused UI.
			console.log("error: ", error);
		  });
		}
	},
	//Topnav animates the navigation shrinking
	topnav: function() {
		var tl = gsap.timeline({
			paused: true,
			id: "topNavShrink",
			defaults:{duration:0.3},
			});
			tl.fromTo('#mainHeader.transparent .logoWrap .logo',{height:"80px"}, {duration:1, height:55, ease:"linear"},'<');
			tl.to('#mainHeader.transparent',{boxShadow: "0 1px 7px rgba(0,0,0,0.5)", backdropFilter:"blur(8px)"},"<");
			return tl;
	},
	// Slide title animation
    playTitle: function(title, subtitle, underline) {
        var tl = gsap.timeline({
            paused:true,
            defaults:{duration:2},
        });
        tl.add('start');
        tl.fromTo(title, {y:30, autoAlpha:0}, {y:0, autoAlpha:1, delay:0.1, ease:"expo.out"},">");
        tl.fromTo(subtitle, {y:30, autoAlpha:0}, {y:0, autoAlpha:1, ease:"expo.out"},"<0.1");
        tl.fromTo(underline, {width:0}, {duration:1, width:"100%", ease:"expo.out"},"<");
		tl.add('end');
		return tl;
	},
	// Move the stageWrap using flip plugin
	moveStageWrap: function(newContainerID) {
		let stageWrap = document.querySelector(".stageWrap");
		let state = Flip.getState(stageWrap);
		let newContainer = document.getElementById(newContainerID);
		// console.log("stageWrap parent is: ", newContainer);
		if (stageWrap.parentNode.id != newContainerID) {
			newContainer.prepend(stageWrap);
		};
		Flip.from(state, {
			duration: 0.5,
			scale:true,
			// absolute:true,
			nested: true,
			ease: "linear"
		});
	},

	motherTimeline: function() {

		let tl = gsap.timeline({
			defaults:{duration:0.5},
			paused: true,
		});
		// IMPACT
		tl.addLabel("impact",">")
		tl.from("#impactPendulum",{autoAlpha:0, y:-200},">0.5");
		tl.to(".spherelogo",{rotate:30, yoyo:true, repeat:1, ease:"expo.out", transformOrigin:"50% -50vh"},">");
		tl.to(".sphere3",{rotate:-30, yoyo:true, repeat:1, ease:"expo.out", transformOrigin:"50% -50vh"},">");
		tl.to(".spherelogo",{rotate:30, yoyo:true, repeat:1, ease:"expo.out", transformOrigin:"50% -50vh"},">");
		tl.to(".sphere3",{rotate:-30, yoyo:true, repeat:1, ease:"expo.out", transformOrigin:"50% -50vh"},">");

		// LEGACY
		tl.addLabel("legacy",">")
		tl.to("#impactGraphic .sphereWrap span",{autoAlpha:0},">0.5");
		tl.to("#impactGraphic .spherelogo",{xPercent:150, scale:0.5, force3D:false, transformOrigin:"center center"},"<");
		tl.to("#impactGraphic .sphere1",{xPercent:50, scale:0.5, force3D:false, transformOrigin:"center center"},"<");
		tl.to("#impactGraphic .sphere2",{xPercent:-50, scale:0.7, force3D:false, transformOrigin:"center center"},"<");
		tl.to("#impactGraphic .sphere3",{xPercent:-150, scale:0.9, force3D:false, transformOrigin:"center center"},"<");
		tl.to("#impactGraphic .spherelogo #backgroundSphere",{autoAlpha:0},"<0.3");
		tl.to("#impactGraphic #body", {morphSVG:"#body-2", ease:"expo.out"}, "<");
		tl.to("#impactGraphic #shadow", {morphSVG:"#shadow-2", ease:"expo.out"}, "<");
		tl.from("#planetWrap",{scale:0.3, force3D:false, autoAlpha:0, y:-300, x:300, transformOrigin:"center center"},"<0.2");
		tl.to("#impactPendulum",{scale:0.5, force3D:false, y:"4.5vmax", x:"-1vmax", filter:"drop-shadow(1px 1px rgba(0,0,0,0.1))"},"<");
		tl.to(".spherelogo",{scale:1.2, force3D:false, transformOrigin:"center center"},"<")
		tl.to("#planetWrap .planet",{duration:2, backgroundPosition:"-300px 50%"},"<-0.5");
		tl.to(".sphere1, .sphere2, .sphere3",{autoAlpha:0},">");

		// LEADERS
		tl.addLabel("leaders",">")
		tl.to("#planetWrap", {scale:1, force3D:false, autoAlpha:0, x:0, y:"-4.5vmax"},">0.5");
		tl.to("#impactPendulum",{scale:1, force3D:false, x:0, y:0, filter:"drop-shadow(16px 20px rgba(0,0,0,0.4))"},"<");
		tl.to(".sphere1, .sphere2, .sphere3",{autoAlpha:1},"<");
		tl.to(".spherelogo ",{x:0, y:0, scale:1, force3D:false},"<");
		tl.to("#impactGraphic #body", {morphSVG:"#body", ease:"expo.out"}, "<");
		tl.to("#impactGraphic #shadow", {morphSVG:"#shadow", ease:"expo.out"}, "<");
		tl.to("#impactGraphic #body", {duration:1, morphSVG:"#africaPath", ease:"expo.out"}, ">");
		tl.to("#impactGraphic #shadow", {duration:1, autoAlpha:0, ease:"expo.out"}, "<");
		tl.to("#impactPendulum",{duration:1, filter:"drop-shadow(rgba(0, 0, 0, 0.5) 3px 4px)"},"<");
		tl.to(".spherelogo .sphere",{duration:1, scale:4, force3D:false},"<");
		tl.to(".sphere1, .sphere2, .sphere3",{duration:1, scale:0, force3D:false},"<");
		tl.to("#africaLeader",{autoAlpha:1},"<0.5");

		// ANNA
		tl.addLabel("anna",">")
		tl.to(".spherelogo .sphere",{duration:2, scale:3.5, force3D:false},">");
		tl.to(".spherelogo svg",{duration:2, attr:{viewBox:"209.50 210.50 7 7"}, ease:"power3.inOut"},"<");
		tl.to(".spherelogo .sphere",{duration:2, borderRadius:"50%", ease:"power3.inOut"},"<");
		tl.to(".spherelogo svg",{attr:{viewBox:"203.50 204.50 19 19"}, ease:"power3.inOut"},">");
		tl.to("#impactGraphic #body", {fill:$brandContrastDarkest, ease:"expo.out"}, "<");
		tl.to("#annaLeaders",{autoAlpha:1},"<");
		tl.set("#impactGraphic #body", {morphSVG:"#body", ease:"expo.out"}, ">");
		tl.set("#africaLeader",{autoAlpha:0},"<");
		tl.to("#sphereCountry",{fill:$sphere3BG},"<");
		tl.to("#sphereCommunity",{fill:$sphere2BG},"<0.2");
		tl.to("#sphereFamily",{fill:$sphere1BG},"<0.2");
		tl.to("#sphereAnna",{fill:$brand},"<0.2");

		// JOSEPH
		tl.addLabel("joseph",">");
		tl.to("#impactGraphic #body", {duration:0.01, fill:"#ffffff"}, ">");
		tl.to(".spherelogo",{duration:1, borderRadius:0, ease:"power3.inOut"},">0.4");
		tl.to(".spherelogo svg",{duration:1, attr:{viewBox:"0 0 424 424"}, ease:"power3.inOut"},"<");
		tl.to("#impactPendulum .spherelogo .sphere",{duration:1, scale:2, force3D:false},"<");
		tl.to("#annaLeaders, #annaInLeader, #sphereAnna",{autoAlpha:0},">");
		tl.fromTo("#heart",{autoAlpha:0, scale:1.2}, {autoAlpha:1, scale:0.5, force3D:false, transformOrigin:"50% 50%"},"<");
		tl.to("#heart",{autoAlpha:0, scale:0, force3D:false},"<0.5");
		tl.to("#impactGraphic #body", {morphSVG:"#josephInVillagePath", ease:"expo.out"},">");
		tl.to("#impactGraphic #body", {autoAlpha:0}, "<0.2");
		tl.to("#josephInVillagePic", {autoAlpha:1, ease:"expo.out"}, "<");
		tl.to("#impactPendulum",{filter:"drop-shadow(rgba(0, 0, 0, 0) 0px 0px)"},"<");
		tl.add( function(){var vid = document.getElementById("villageVideo");vid.pause();vid.currentTime = 0;},">");

		// ON-TEN
		tl.addLabel("onten",">");
		tl.add( function(){var vid = document.getElementById("villageVideo");vid.pause();vid.currentTime = 0;},">0.5");
		tl.add( function(){NINJA_FUNCTIONS.playVideo("villageVideo");},">");
		tl.to("#impactPendulum .spherelogo",{yPercent:-40, xPercent:140},">");
		tl.to(".sphere1",{scale:1, force3D:false, autoAlpha:1, rotateX:30, transformOrigin:"50% 50%"},"<0.4");
		tl.to(".sphere2",{scale:1.2, force3D:false, autoAlpha:1, rotateX:30, transformOrigin:"50% 50%"},"<");
		tl.to(".sphere3",{scale:1.4,force3D:false, autoAlpha:1, rotateX:30, transformOrigin:"50% 50%"},"<");
		tl.to("#impactPendulum",{scale:1, force3D:false, filter:"drop-shadow(16px 20px rgba(0,0,0,0.4))"},"<");
		tl.from("#emitNetworkWrap",{autoAlpha:0},">");
		tl.from("#mandatePaths path",{drawSVG:0, autoAlpha:0},"<");
		tl.from("#influencers ellipse",{scale:0, force3D:false, autoAlpha:0, transformOrigin:"50% 50%"},">");

		// TRACTION
		let africaGroups = gsap.utils.toArray('#tractionNetwork g');
		tl.addLabel("traction",">");
		tl.to("#emitNetworkWrap",{autoAlpha:0},">0.5");
		tl.to("#impactPendulum",{scale:0.5, force3D:false},"<");
		tl.to(".sphere1",{autoAlpha:0, rotateX:0, transformOrigin:"50% 50%"},"<");
		tl.to(".sphere2",{autoAlpha:0, rotateX:0, transformOrigin:"50% 50%"},"<");
		tl.to(".sphere3",{autoAlpha:0, rotateX:0, transformOrigin:"50% 50%"},"<");
		tl.to("#impactGraphic #body", {autoAlpha:1}, ">");
		tl.to("#josephInVillagePic", {autoAlpha:0, ease:"expo.out"}, "<");
		tl.to("#impactGraphic .spherelogo #backgroundSphere",{autoAlpha:1, xPercent:0, yPercent:0},">");
		tl.to("#impactGraphic #body", {morphSVG:"#body-2", ease:"expo.out"}, ">");
		tl.to("#impactGraphic #shadow", {morphSVG:"#shadow-2", ease:"expo.out", autoAlpha:1}, "<");
		africaGroups.forEach(group => {
			tl.fromTo(group,{autoAlpha:0}, {duration:0.1, stagger:0.1, autoAlpha:1},">");
		});


		// DONATE
		tl.addLabel("donate",">");
		tl.to("#impactPendulum",{scale:5, opacity:0, force3D:false},">0.5");
		tl.to("#smilingAnna",{duration:1, opacity:1},"<");

		tl.addLabel("end",">")
		return tl;
	}


} //END NINJA FUNCTIONS