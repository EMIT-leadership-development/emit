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
		smooth: true,
		multiplier: 5
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
	// Scrollytelling functions from here
	NINJA_FUNCTIONS.yourImpact()
	NINJA_FUNCTIONS.yourLegacy();
	NINJA_FUNCTIONS.africaStory();
	NINJA_FUNCTIONS.meetAnna();
	NINJA_FUNCTIONS.zoomVillage();

	//--------MOTHER OF ALL TIMELINES : MAIN SCROLLING ANIMATION-------------------------------------
	// const tl_mother = gsap.timeline({
	// 	paused: true,
	// 	onUpdate() { scrollProgress(this.progress()) }
	// });
	// tl_mother.add(NINJA_FUNCTIONS.funtionname());

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
				trigger: "#yourImpact .spheresWrapResponsive",
				scroller: ".scrollContainer",
				start: "top, 90%",
				end: "top, 10%",
				scrub: 1,
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
				trigger: "#yourLegacy #planetWrap",
				scroller: ".scrollContainer",
				start: "top 90%",
				endTrigger: "#yourLegacy",
				end: "bottom center",
				scrub: 1,
			}
		});
		// tl.to('#spinningPlanet', {duration:1, autoAlpha:1});
		tl.fromTo('#planetWrap',{scale:0.1, autoAlpha:0, x:500, y:-300, rotate:50}, {duration: 2.5, scale:1, autoAlpha:1, x:0, y:0, rotate:0},"<");
		tl.to('#countries',{duration:2, xPercent:"-65", transformOrigin:"50% 50%"},"<");
		tl.fromTo('#planetNetwork',{rotate:40},{duration:2, rotate:0, transformOrigin:"50% 50%"},"<");
		return tl;
	},
	// --------AFRICA STORY-------------------------------------
	africaStory: function() {
		let tl;

		ScrollTrigger.matchMedia({
			// desktop
			"(min-width: 900px)": function() {
				tl = gsap.timeline({
					scrollTrigger: {
						trigger: "#africaStory .sectionContent",
						scroller: ".scrollContainer",
						start: "center center",
						// end: "center 30%",
						end: "+=1000",
						pin: "#africaStory",
						pinSpacing: true,
						scrub: 1,
					}
				});
				// tl.from(".leaderRow", {duration:0.5, stagger:0.1, x:-300, autoAlpha:0});
				tl.to(".transformer",{duration:0.5, width:"20%", borderRadius:"50%"});
				tl.to(".symptom",{duration:0.5, scale:0},"<");
				tl.to(".transformer svg",{duration:0.5, scale:1, transformOrigin:"50% 50%", autoAlpha:1 },"<0.5");
				tl.to(".africaLeader.reveal", {duration:0.5, width:"20%", transformOrigin:"50% 50%"},"<-0.5");
			},
			// mobile
			"(max-width: 899px)": function() {
				tl = gsap.timeline({
					scrollTrigger: {
						trigger: "#africaStory .sectionContent",
						scroller: ".scrollContainer",
						start: "top 65px",
						// end: "bottom top",
						end: "+=1000",
						pin: "#africaStory",
						pinSpacing: true,
						scrub: 1,
					}
				});
				// tl.from(".leaderRow", {duration:0.5, stagger:0.1, x:-300, autoAlpha:0});
				tl.to(".transformer",{duration:0.5, width:"20%", borderRadius:"50%"});
				tl.to(".symptom",{duration:0.5, scale:0},"<");
				tl.to(".transformer svg",{duration:0.5, scale:1, transformOrigin:"50% 50%", autoAlpha:1 },"<0.5");
				tl.to(".africaLeader.reveal", {duration:0.5, width:"20%", transformOrigin:"50% 50%"},"<-0.5");
			},
		  });
		  return tl;
	},
	// --------MEET ANNA-------------------------------------
	meetAnna: function() {
		let tl;

		ScrollTrigger.matchMedia({
			// desktop (layout breaks into columns)
			"(min-width: 900px)": function() {
				tl = gsap.timeline({
					scrollTrigger: {
						trigger: "#meetAnna .sectionContent",
						scroller: ".scrollContainer",
						start: "center center",
						// end: "center 10%",
						end: "+=1000",
						pin: "#meetAnna",
						pinSpacing: true,
						scrub: 1
					}
				});
				tl.from('#meetAnna .l1',{duration:1, y:-800});
				tl.fromTo('#meetAnna .sphere1', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.fromTo('#meetAnna .annaInTheCenter', {width:"100%", height:"100%"}, {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.from("#religious, #polititians",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l1',{duration:1, scale:0},">");

				tl.from('#meetAnna .l2',{duration:1, y:-800},">0.3");
				tl.fromTo('#meetAnna .sphere2', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.to('#meetAnna .sphere1', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .annaInTheCenter', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
				tl.from("#community, #teachers",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l2',{duration:1, scale:0},">");

				tl.from('#meetAnna .l3',{duration:1, y:-800},">0.3");
				tl.fromTo('#meetAnna .sphere3', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.to('#meetAnna .sphere2', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .sphere1', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .annaInTheCenter', {duration:1, width:"40%", height:"40%", transformOrigin:"center center"},"<");
				tl.from("#peers, #parents",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l3',{duration:1, scale:0},">");
				return tl;
			},
			// mobile (single column)
			"(max-width: 899px)": function() {
				tl = gsap.timeline({
					scrollTrigger: {
						trigger: "#meetAnna .sectionContent",
						scroller: ".scrollContainer",
						start: "bottom bottom",
						// end: "bottom top",
						end: "+=1000",
						pin: "#meetAnna",
						pinSpacing: true,
						scrub: 1
					}
				});
				tl.from('#meetAnna .l1',{duration:1, y:-800});
				tl.fromTo('#meetAnna .sphere1', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.fromTo('#meetAnna .annaInTheCenter', {width:"100%", height:"100%"}, {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.from("#religious, #polititians",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l1',{duration:1, scale:0},">");

				tl.from('#meetAnna .l2',{duration:1, y:-800},">0.3");
				tl.fromTo('#meetAnna .sphere2', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.to('#meetAnna .sphere1', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .annaInTheCenter', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
				tl.from("#community, #teachers",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l2',{duration:1, scale:0},">");

				tl.from('#meetAnna .l3',{duration:1, y:-800},">0.3");
				tl.fromTo('#meetAnna .sphere3', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
				tl.to('#meetAnna .sphere2', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .sphere1', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
				tl.to('#meetAnna .annaInTheCenter', {duration:1, width:"40%", height:"40%", transformOrigin:"center center"},"<");
				tl.from("#peers, #parents",{duration:1, scale:1.5, autoAlpha:0 },"<");
				tl.to('#meetAnna .l3',{duration:1, scale:0},">");
				return tl;
			}

		});
	},

	// --------ZOOM VILLAGE -------------------------------------
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
				start: "bottom bottom",
				// endTrigger: ".spacer200",
				// end: "bottom bottom",
				end: "+=5000",
				pin: true,
				pinSpacing: true,
				// toggleActions: "play none none reverse reverse",
				scrub: 1,
				// snap: {
				// 	snapTo: "labels", // snap to the closest label in the timeline
				// 	duration: {min: 2, max: 4}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
				// 	delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
				// 	ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
				// 	onSnapComplete: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
				// },
			}
		});

		// ZOOM VIDEO
		tl.addLabel("zoom", 0);
		tl.to(airpods, {
			duration: 1,
			frame: frameCount - 1,
			snap: "frame",
			onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
		});

		// MEET JOSEPH
		tl.addLabel("meetJoseph", 2);
		tl.to("#josephVillageWrap",{duration:1, scale:3, xPercent:90.74, yPercent:-77.26},"meetJoseph");
		tl.to("#josephOnTenWrap",{duration:1, backgroundColor:"rgba(0,0,0,0.6)"},"<");
		tl.from("#villagePosterImage, #josephAndShadow",{duration:1, autoAlpha:0, scale:0, transformOrigin:"center center", ease:"power2.out"},"<");
		tl.from("#text1",{duration:0.5, autoAlpha:0, x:-20, ease:"power2.in"},"<");

		// EMIT is increasing...
		tl.addLabel("josephImpact", 4);
		tl.to("#josephVillageWrap",{duration:1, x:-250},"josephImpact");
		tl.from("#s1, #s2, #s3",{duration:1, autoAlpha:0, scale:0, stagger:0.1, transformOrigin:"center center"},"<");
		tl.from("#text2",{duration:0.3, autoAlpha:0, scale:0},"<");
		tl.to("#text1",{duration:0.3, autoAlpha:0, xPercent:-100 },"<");

		// Training Books...
		tl.addLabel("books", 6);
		tl.to("#josephVillageWrap",{duration:1, x:-380},"books");
		tl.from("#trainingBooks",{duration:0.3, autoAlpha:0, yPercent:-100, ease:"power.out"},"<");

		// Our leadership programs...
		tl.addLabel("ourPrograms", 8);
		tl.from("#text3",{duration:0.3, autoAlpha:0, scale:0},"ourPrograms");
		tl.to("#text2",{duration:0.3, autoAlpha:0, xPercent:-100 },"<");


		// Three training focus areas
		tl.addLabel("trainingFocus", 10);
		tl.from("#text4",{duration:0.3, autoAlpha:0, scale:0},"trainingFocus");
		tl.to("#text3",{duration:0.3, autoAlpha:0, xPercent:-100 },"<");

		// Scale in Training sphere
		tl.addLabel("trainingSphere", 12);
		tl.to("#s1, #s2, #s3",{duration:1, scale:0.3, transformOrigin:"center center"},"trainingSphere");
		tl.to("#villagePosterImage",{duration:1, scale:0, transformOrigin:"center center"},"<");
		tl.from("#trainingSphere",{duration:1, scale:0, autoAlpha:0, transformOrigin:"center center"},"<");

		// Training blips
		tl.addLabel("Blips", 14);
		tl.to("#trainingBlip1",{duration:0.3, autoAlpha:1},"Blips");
		tl.to("#trainingBooks",{duration:0.3, autoAlpha:0},">");
		tl.to("#trainingBlip1", {duration:0.3, morphSVG:"#trainingBlipMorph1", ease:"expo.out"},">");
		tl.from("#trainingBlip2", {duration:0.3, autoAlpha:0, y:-50, ease:"expo.out"},"<");
		// 0.9

		tl.to("#trainingBlip2", {duration:0.3, morphSVG:"#trainingBlipMorph2", ease:"expo.out"},">");
		tl.to("#trainingBlip1",{duration:0.3, y:20},"<");
		tl.from("#trainingBlip3", {duration:0.3, autoAlpha:0, y:-50, ease:"expo.out"},"<");
		// 0.12

		tl.to("#trainingBlip3", {duration:0.3, morphSVG:"#trainingBlipMorph3", ease:"expo.out"},">");
		tl.to("#trainingBlip2",{duration:0.3, y:20},"<");
		tl.to("#trainingBlip1",{duration:0.3, y:40, x:-4},"<");
		// 0.15


		// Scale the trainingSphereGroup
		tl.addLabel("trainingShrink", 16);
		tl.to("#josephVillageWrap",{duration:1, x:-50},"trainingShrink");
		tl.to("#trainingSphere",{duration:1, rx:75, ry:75, transformOrigin:"center center", ease:"none"},"<");
		tl.to("#trainingBlip3", {duration:1, x:-100, ease:"none"},"<");
		tl.to("#trainingBlip2", {duration:1, x:-103, ease:"none"},"<");
		tl.to("#trainingBlip1", {duration:1, x:-110, ease:"none"},"<");
		tl.to("#text4",{duration:0.3, autoAlpha:0},"<");

		// Rotate the trainingSphereGroup
		tl.addLabel("trainingRotate", 18);
		tl.to("#trainingSphereGroup",{duration:1, rotate:250, transformOrigin:"75 75"},"trainingRotate");



		// tl.to("#text3",{duration:0.3, autoAlpha:0, xPercent:100 },3);
		// tl.from("#text4",{duration:0.3, autoAlpha:0, scale:0},"<");
		// tl.from("#josephSpheres ellipse",{duration:0.3, scale:0, autoAlpha:0, transformOrigin:"center center" },"<");

		// Mandate
		// tl.from("#trainingSphere",{duration:1, scale:0, autoAlpha:0, transformOrigin:"center center"},3.5);
		// tl.to("#josephVillageWrap",{duration:0.7, y:1000, x:-300, scale:3.5},"<+0.3");
		// tl.from("#trainingBooks, #text5",{duration:0.3, autoAlpha:0},"<");

		// Start Training Elipse journey
		// tl.to("#trainingBlip",{duration:0.3, autoAlpha:1, fill:$brand},4.5);
		// tl.to("#text5",{duration:0.3, autoAlpha:0},"<");
		// tl.to("#trainingBooks",{duration:0.3, scale:0, autoAlpha:0, transformOrigin:"center center"},">");
		// tl.to("#trainingBlip", {duration:0.3, morphSVG:"#trainingBlipMorph", ease:"expo.out"},"<");

		// Animate the training blip along two paths
		// tl.to("#trainingBlip", {
		// 	motionPath: {
		// 		path: "#path1",
		// 		align: "#path1",
		// 		alignOrigin: [0.5, 0.5],
		// 		autoRotate: true
		// 	},
		// 	transformOrigin: "50% 50%",
		// 	duration: 1,
		// 	ease: "power1.inOut"
		// }),5;
		// tl.to("#josephVillageWrap",{duration:0.5, x:-1500, scale:2},"<");
		// tl.from("#wlToConnection",{duration:0.5, drawSVG:0},"<+0.5");

		return tl;
	},


} //END NINJA FUNCTIONS