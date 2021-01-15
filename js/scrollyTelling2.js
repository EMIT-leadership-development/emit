"use strict";
// VARIABLES COPIED FROM SCSS pre.scss
// BRAND COLORS
var $brand = "#abe116",
	$primary = "#abe116",
	$brandDarker = "#99ca13",
// COLORS FOR FONTS
	$brandTDark = "rgba(0,0,0,0.8)",
	$brandTLight = "rgba(255,255,255,0.8)",

	// SPHERES
	$sphere1BG = "#85b744",
	$sphere2BG = "#37ab5d",
	$sphere3BG = "#03956d",

// $brandContrastDark: #272D32;
	$brandContrastDark = "#272c33",
	$brandContrastDarkest = "#1c2127",

// PALE GRAYISH-BLUEISH COLORS FOR BG'S
	$brandContrastLight = "#EDF5F9",
	$brandContrastLight2 = "#e0e8ea",
	$brandContrastLight3 = "#BCC4C6",
	$brandContrastLight4 = "#A5ABAD",

// WIDTHS
	$annaInTheCenterWidth = 200,
	$sphere1Width = 300,
	$sphere2Width = 400,
	$sphere3Width = 500;

// ---------------------ADD ALL THE ANIMATIONS TO THE MOTHER TIMELINE
window.onload = function() {

	// -------------------LOCOMOTIVE.JS SCROLLING HOOKED UP TO SCROLLTRIGGER
	const locoScroll = new LocomotiveScroll({
		el: document.querySelector(".scrollContainer"),
		smooth: true
	});

	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy(".scrollContainer", {
		scrollTop(value) {
			return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
	});

	//------------------ Start up functions
	NINJA_FUNCTIONS.startup();
	NINJA_FUNCTIONS.topnav();
	NINJA_FUNCTIONS.pinDonation();

	//--------MOTHER OF ALL TIMELINES : MAIN SCROLLING ANIMATION-------------------------------------
	const tl_mother = gsap.timeline({
		paused: true,
		onUpdate() { scrollProgress(this.progress()) }
	});
	tl_mother.add(NINJA_FUNCTIONS.yourImpact());
	tl_mother.add(NINJA_FUNCTIONS.yourLegacy());
	tl_mother.add(NINJA_FUNCTIONS.africaStory());
	tl_mother.add(NINJA_FUNCTIONS.meetAnna());
	tl_mother.add(NINJA_FUNCTIONS.zoomVillage());

	// ----------------- REFRESH AND UPDATE FOR LOCOMOTIVE AND SCROLLTRIGGER
	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();

} //End window.load




// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {

	//--------STARTUP: ANIMATIONS ON PAGE LOAD -------------------------------------
	startup: function() {
		var tl = gsap.timeline({
			id: "Landing Scene",
			defaults:{duration:0.5},
		});
		tl.from('.nav-link a.topLevel', {autoAlpha:0, x:-100, stagger:0.1, ease:"linear"},"<");
		tl.from('#headerLogo', {autoAlpha:0, x:-100, ease:"linear"}, "<");
		tl.from('.introHeadline h1 span', {autoAlpha:0, x:100, stagger:0.1, ease:"linear"},"<" );
		tl.to('#scrollDown',{duration:1, yoyo:true, y:-10, repeat:-1},'<');
		return tl;
	},
	//--------TOPNAV: ANIMATE THE TOP NAV SHRINKING -------------------------------------
	topnav: function() {
		const links = gsap.utils.toArray(".topLevel");
		function changeColor() {
			links.forEach(link => link.classList.toggle("blackText") )
		}
		var tl = gsap.timeline({
			id: "topNavShrink",
			defaults:{duration:1},
			scrollTrigger: {
				trigger: "body",
				scroller: ".scrollContainer",
				start: 0,
				end: 130,
				toggleActions: "play complete reverse reverse",
				onEnter: changeColor,
				onLeaveBack: changeColor,
				scrub: 1
			}
			});
			tl.to('#headerLogo .logo', {duration:1, height:55, ease:"linear"});
			tl.to('.mainNavigation',{
				duration:1,
				boxShadow: "0 1px 15px rgba(0,0,0, .15)",
				backgroundImage:"linear-gradient(90deg, #89b412 5%, transparent 30%)",
				backgroundColor:$brand},"<");
			return tl;
	},
	//--------PIN DONATION : FAKE PINS THE BUTTON TOP RIGHT OF THE SCREEN-------------------------------------
	pinDonation: function() {
		var tl = gsap.timeline({
			id: "Pin Donate Btn",
			scrollTrigger: {
				trigger: "#introCTA",
				scroller: ".scrollContainer",
				start: "top 100px",
				end: "top 7px",
				toggleActions: "play complete none reverse",
				scrub: true
			}
		});
        tl.to('#introCTA', {duration:1, autoAlpha:0});
		tl.from('#donateBtn', {duration:1, autoAlpha:0},"<");
		tl.from('#loginBtn', {duration:1, background:"transparent", border:"1px solid #fff", color:"#ffffff", x:108},"<");
		tl.to('.ctaTitle', {duration:1, autoAlpha:0},"<");
		return tl;
	},



	// SCROLLY-TELLING SECTIONS
	// **************************************************************************************
	// --------YOUR IMPACT - ENTER THE SPHERES AND LOGO -------------------------------------
	yourImpact: function () {
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#yourImpact .spheresWrap",
				scroller: ".scrollContainer",
				start: "top, 90%",
				end: "top, 10%",
				scrub: 1
			}
		});
		tl.to('.introHeadline h1', {duration:1, autoAlpha:0, rotateX:10});
		tl.fromTo('#yourImpact .sphere, .animatedLogoWrap', {scale:0, autoAlpha:0, x:0, y:0}, {stagger:0.1, scale:1, autoAlpha:1, transformOrigin:"50% 50%"},"<").duration(5);
		tl.totalDuration(1);
		return tl;
	},
	// --------YOUR LEGACY ANIMATION: SPINNING PLANET-------------------------------------
	yourLegacy: function() {
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#yourLegacy",
				scroller: ".scrollContainer",
				start: "top 50%",
				end: "bottom center",
				scrub: 1
			}
		});
		// tl.to('#spinningPlanet', {duration:1, autoAlpha:1});
		tl.fromTo('#planetWrap',{scale:0.1, autoAlpha:0, x:500, y:-300, rotate:50}, {duration: 2.5, scale:1, autoAlpha:1, x:0, y:0, rotate:0},"<");
		tl.to('#countries',{duration:10, xPercent:"-65", transformOrigin:"50% 50%"},"<");
		tl.fromTo('#planetNetwork',{rotate:40},{duration:10, rotate:0, transformOrigin:"50% 50%"},"<");
		tl.totalDuration(1);
		return tl;
	},
	// --------AFRICA STORY-------------------------------------
	africaStory: function() {
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#africaStory",
				scroller: ".scrollContainer",
				start: "center center",
				scrub: 1,
				pinSpacing: true,
				pin: true,
				anicipatePin: 1,
			}
		});
		tl.set('#africaStory .transformer', {width:500});
		tl.from('#africaStory .leaderRow',{duration:1, stagger:0.5, x:-500, opacity:0, color:"transparent"});
		tl.to('#africaStory .symptom',{duration:1, stagger:0.3, scale:0, opacity:0},'>0.3');
		tl.to('#africaStory .africaLeader',{duration:1, stagger:0.3, autoAlpha:1, width:100, height:100, transformOrigin:"50% 50%", border:"1px solid #ffffff", borderRadius:"50%", background:$brandContrastDarkest},'<');
		tl.to('#africaStory .africaLeader svg',{duration:1, stagger:0.3, scale:1},"<");

		return tl;
	},
	// --------MEET ANNA-------------------------------------
	meetAnna: function() {
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#meetAnna",
				scroller: ".scrollContainer",
				start: "center center",
				end: "+=1500",
				scrub: 1,
				pinSpacing: true,
				pin: true,
				anicipatePin: 1,
			}
		});
		tl.from('#meetAnna .l1',{duration:1, y:-800});
		tl.to('#meetAnna .sphere1', {duration:1, width:$sphere3Width, height:$sphere3Width, autoAlpha:1, transformOrigin:"center center"},">");
		tl.to('#meetAnna .annaInTheCenter', {duration:1, width:$sphere2Width, height:$sphere2Width, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .l1',{duration:1, scale:0},">");

		tl.from('#meetAnna .l2',{duration:1, y:-800},">0.3");
		tl.to('#meetAnna .sphere2', {duration:1, width:$sphere3Width, height:$sphere3Width, autoAlpha:1, transformOrigin:"center center"},">");
		tl.to('#meetAnna .sphere1', {duration:1, width:$sphere2Width, height:$sphere2Width, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .annaInTheCenter', {duration:1, width:$sphere1Width, height:$sphere1Width, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .l2',{duration:1, scale:0},">");

		tl.from('#meetAnna .l3',{duration:1, y:-800},">0.3");
		tl.to('#meetAnna .sphere3', {duration:1, width:$sphere3Width, height:$sphere3Width, autoAlpha:1, transformOrigin:"center center"},">");
		tl.to('#meetAnna .sphere2', {duration:1, width:$sphere2Width, height:$sphere2Width, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .sphere1', {duration:1, width:$sphere1Width, height:$sphere1Width, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .annaInTheCenter', {duration:1, width:$annaInTheCenterWidth, height:$annaInTheCenterWidth, transformOrigin:"center center"},"<");
		tl.to('#meetAnna .l3',{duration:1, scale:0},">");

		tl.from('#annasLeadersWrap svg',{duration:2, stagger:0.5, autoAlpha:0, rotate:-10},'<');
		return tl;
	},
	// --------ZOOM VILLAGE-------------------------------------
	zoomVillage: function() {
		// Get ready for playing the canvas
		const canvas = document.getElementById("hero-lightpass");
		const context = canvas.getContext("2d");

		canvas.width = 1920;
		canvas.height = 1088;

		const frameCount = 254;
		const currentFrame = index => (
		`/video/africanVillage/${(index + 1).toString().padStart(4, '0')}.jpg`
		);

		const images = []
		const airpods = {
		frame: 0
		};

		for (let i = 0; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
		images.push(img);
		}

		images[0].onload = render;
		function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(images[airpods.frame], 0, 0);
		// console.log(airpods.frame);
		}

		// TIMELINE
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#zoomVillage",
				scroller: ".scrollContainer",
				start: "center center",
				// end: "+=1000",
				scrub: 1,
				pinSpacing: true,
				pin: true,
				anicipatePin: 1,
			}
		});

		tl.to(airpods, {
			frame: frameCount - 1,
			snap: "frame",
			onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
			});

		return tl;
	},


} //END NINJA FUNCTIONS