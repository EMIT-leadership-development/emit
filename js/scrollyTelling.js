"use strict";
// ---------------------ADD ALL THE ANIMATIONS TO THE MOTHER TIMELINE
window.onload = function() {
	var tl_mother = gsap.timeline();
	tl_mother.call(NINJA_FUNCTIONS.startup);
	tl_mother.call(NINJA_FUNCTIONS.topNav);
	tl_mother.call(NINJA_FUNCTIONS.storyNav);
	tl_mother.call(NINJA_FUNCTIONS.pinDonation);
	tl_mother.call(NINJA_FUNCTIONS.yourStoryTitle);
	tl_mother.call(NINJA_FUNCTIONS.yourImpact);
	// tl_mother.call(NINJA_FUNCTIONS.whoDoYouImpact);
	// tl_mother.call(NINJA_FUNCTIONS.yourPeopleImpact);
	// tl_mother.call(NINJA_FUNCTIONS.yourLegacy);
	// tl_mother.add(NINJA_FUNCTIONS.zoomInToAfrica);
	// tl_mother.add(NINJA_FUNCTIONS.africaProblem);
	// tl_mother.add(NINJA_FUNCTIONS.africaProblemEnding);
	// tl_mother.add(NINJA_FUNCTIONS.africanLeaders);
	// tl_mother.add(NINJA_FUNCTIONS.solution);
	// tl_mother.add(NINJA_FUNCTIONS.logoReappears);
	// tl_mother.add(NINJA_FUNCTIONS.meetAnna);
	// tl_mother.add(NINJA_FUNCTIONS.annasLeaders);
	// tl_mother.add(NINJA_FUNCTIONS.ifOnly);
	// tl_mother.add(NINJA_FUNCTIONS.imagineIntro);
	// tl_mother.add(NINJA_FUNCTIONS.imagine);
	// tl_mother.add(NINJA_FUNCTIONS.joseph);
	// tl_mother.add(NINJA_FUNCTIONS.josephOnTenIntro);
	// tl_mother.add(NINJA_FUNCTIONS.josephOnTen);
	// tl_mother.add(NINJA_FUNCTIONS.josephTrainingIntro);
	// tl_mother.add(NINJA_FUNCTIONS.josephTraining);
	// tl_mother.add(NINJA_FUNCTIONS.josephEquipped);
	// tl_mother.add(NINJA_FUNCTIONS.josephTransformIntro);
	// tl_mother.add(NINJA_FUNCTIONS.josephTransformation);
	// tl_mother.add(NINJA_FUNCTIONS.emitImpact);
	// tl_mother.add(NINJA_FUNCTIONS.waitingList);
	// tl_mother.add(NINJA_FUNCTIONS.makeADifference);
	// tl_mother.add(NINJA_FUNCTIONS.smilingAnna);
	// tl_mother.add(NINJA_FUNCTIONS.donate);
}

// VARIABLES COPIED FROM SCSS pre.scss
// BRAND COLORS
var $brand = "#abe116",
	$primary = "#abe116",
	$brandDarker = "#99ca13",
// COLORS FOR FONTS
	$brandTDark = "rgba(0,0,0,0.8)",
	$brandTLight = "rgba(255,255,255,0.8)",

// $brandContrastDark: #272D32;
	$brandContrastDark = "#272c33",
	$brandContrastDarkest = "#1c2127",

// PALE GRAYISH-BLUEISH COLORS FOR BG'S
	$brandContrastLight = "#EDF5F9",
	$brandContrastLight2 = "#e0e8ea",
	$brandContrastLight3 = "#BCC4C6",
	$brandContrastLight4 = "#A5ABAD";


	ScrollTrigger.defaults({
		scrub: 1
	});

// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {
	//--------STARTUP: ANIMATIONS ON PAGE LOAD -------------------------------------
	startup: function() {
		var tl = gsap.timeline({
			id: "Landing Scene",
			defaults:{duration:0.5},
		});
		tl.from('.nav-link a.topLevel', {autoAlpha:0, x:-100, stagger:0.1, ease:"power.out"});
		tl.from('#headerLogo', {autoAlpha:0, x:-100}, "<");
		tl.from('.introHeadline h1 span', {autoAlpha:0, x:"100", stagger:0.1, ease:"power.out"},"<" );
		return tl;
	},
	//--------TOPNAV: ANIMATE THE TOP NAV SHRINKING -------------------------------------
	topNav: function() {
		const links = gsap.utils.toArray(".topLevel");
		function changeColor() {
			links.forEach(link => link.classList.toggle("blackText") )
		}
		var tl = gsap.timeline({
			id: "topNavShrink",
			defaults:{duration:1},
			scrollTrigger: {
				trigger: "body",
				start: 0,
				end: 130,
				toggleActions: "play complete reverse reverse",
				onEnter: changeColor,
				onEnterBack: changeColor,
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
				start: "top 100px",
				end: "top 7px",
				toggleActions: "play complete none reverse",
				scrub: true
			}
		});
        tl.to('#introCTA', {duration:0.5, autoAlpha:0});
		tl.from('#donateBtn', {duration:0.5, autoAlpha:0},"<");
		tl.from('#loginBtn', {duration:0.5, background:"transparent", border:"1px solid #fff", color:"#ffffff", x:108},"<");
		tl.to('.ctaTitle', {duration:0.5, autoAlpha:0},"<");
		return tl;
	},
	storyNav: function() {
		const navLinks = gsap.utils.toArray(".storyNav li a");
		navLinks.forEach(link => {
			link.addEventListener("click", e => {
				e.preventDefault();
				const section = document.querySelector(link.getAttribute("href"));
				gsap.to(window, {scrollTo: section});
			});
		});
	},
	// --------YOUR STORY TITLE: WHO YOU ARE, YOUR CHOICES... -----------------------------------
	yourStoryTitle: function() {
		var tl = gsap.timeline({
			id: "YourStory Title",
			defaults:{duration:1},
			// paused: true,
			scrollTrigger: {
				trigger: "#yourStoryTitle",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",			}
		});
		tl.to('.introHeadline h1', {duration: 1, autoAlpha:0, rotateX:10},"<");
		tl.from('#yourStoryTitle .sectionHeading span ', {autoAlpha:0, y:"300", stagger:"0.2"},">");
		return tl;
	},
	// --------YOUR IMPACT - ENTER THE SPHERES AND LOGO -------------------------------------
	yourImpact: function () {
		var tl = gsap.timeline({
			id: "Impact Entrance",
			defaults:{duration:1},
			// paused: true,
			scrollTrigger: {
				trigger: "#yourImpact",
				start: "top center",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse"		}
		});
		// tl.from('#animatedLogoWrap',{duration:0.3, scale:0, autoAlpha:0, transformOrigin:"50% 50%"});
		tl.from('.sphere, #animatedLogoWrap',{stagger:-0.3, scale:0, autoAlpha:0, transformOrigin:"50% 50%"},"<-0.3");

		return tl;
	},
	// --------WHO ARE THE PEOPLE YOU IMPACT -------------------------------------
	whoDoYouImpact: function () {
		var tl = gsap.timeline({
			id: "Impact Question",
			defaults:{duration:1},
			scrollTrigger: {
				trigger: "#whoDoYouImpact",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",			}
		});
		tl.from('#text_yourImpact',{duration:1.5, scale:0, autoAlpha:0, immediateRender:false},">");
		tl.to('#text_yourImpact', {duration:1.5, delay: 3, scale:0, autoAlpha:0},">");
		return tl;
	},
	// --------THE PEOPLE YOU IMPACT: SPOUSE, FAMILY, COMMUNITY...THE CURVED TEXT IN SPHERES -------------------------------------
	yourPeopleImpact: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "yourPeopleImpact",
				// markers: true,
				trigger: "#yourPeopleImpact",
				endTrigger: "#yourPeopleImpactEnding",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		tl.from('.yourPeople',{autoAlpha:0, ease:"linear", stagger:1, rotate:-30, transformOrigin:"50% 50%"});
		tl.from('.impactTitle',{duration:1, autoAlpha:0, x:-20},"<1")
		return tl;
	},
	// --------YOUR LEGACY ANIMATION: SPINNING PLANET-------------------------------------
	yourLegacy: function() {
		var tl = gsap.timeline({
			scrollTrigger: {
				id: "Legacy",
				// markers: true,
				trigger: "#yourLegacy",
				endTrigger: "#yourLegacyEnding",
				start: "top top",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			},
		});
		tl.to('#spinningPlanet', {duration:1, autoAlpha:1});
		tl.to('.impactTitle',{duration:0.5, autoAlpha:0, x:-20},">");
		tl.fromTo('#planetWrap',{scale:0.5, autoAlpha:0, x:200, y:-300}, {duration: 2.5, scale:1, autoAlpha:1, x:0, y:0},"<");

		tl.to('#animatedLogoWrap', {duration:1.5, scale: 0.4, y:105, x:-20, transformOrigin:"50% 50%"},"<");
		tl.to('#logoBorder', {duration:1.5, autoAlpha:0},"<");
		tl.to("#svg_body", {duration: 1.5, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration: 1.5, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");

		tl.to('#spheresWrap, #thePeopleYouImpactWrap', {duration:2.5, y:105, x:-15, autoAlpha:0, transformOrigin:"50% 50%", scale:0.2},"<");

		// Spin planet
		tl.to('#countries',{duration:10, xPercent:"-65", transformOrigin:"50% 50%"},">");
		tl.from('.circle2',{duration:2, autoAlpha: 0, y:-10, transformOrigin:"50% 50%"},"<4");
		tl.from('.circleShadow',{duration:3, autoAlpha: 0, y:-20, transformOrigin:"50% 50%"},"<3");

		return tl;
	},
	// --------ZOOM IN TO AFRICA ON MAP -------------------------------------
	zoomInToAfrica: function() {
		var tl = gsap.timeline({
			paused: true,
			defaults:{duration:1},
			scrollTrigger: {
				id: "Introduce Anna",
				// markers: true,
				trigger: "#zoomInToAfrica",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",			}
		});
		tl.to('#spinningPlanet', {duration:3, autoAlpha:0});
		tl.fromTo('#sadAnnaInAfrica', {scale:0.43, x:5, y:35, autoAlpha:0, transformOrigin: "50% 50%"}, {duration:2, scale:1, autoAlpha:1, transformOrigin: "50% 50%"},"<");
		tl.to('#annaInAfrica', {duration:2, backgroundColor:$brandContrastLight2},"<");
		tl.to('#animatedLogoWrap', {duration:1, autoAlpha:0},"<");
		return tl;
	},
	// --------THE AFRICA PROBLEM: AFTER DECADES OF SUPPORT -------------------------------------
	africaProblem: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Africa Problem",
				// markers: true,
				trigger: "#africaProblem",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_africaProblem',{duration:1, scale:0, autoAlpha:0},">");
		return tl;
	},
	// --------THE AFRICA PROBLEM ENDING - WHAMBAM TEXT -------------------------------------
	africaProblemEnding: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Africa Problem Ending",
				// markers: true,
				trigger: "#africaProblemEnding",
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_africaProblem2',{duration:2, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem3',{duration:2, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem4',{duration:2, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem5',{duration:2, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem6',{duration:2, scale:0, autoAlpha:0},">");

		// Center the logo behind the text in preparation for solution scene
		// tl.set('#animatedLogoWrap',{x:0, y:0, scale:1});
		// tl.set('#spheresWrap', {x:0, y:0, scale:0.3},"<");
		// tl.set("#svg_body", {morphSVG:"#svg_body-2", ease:"expo.out"},">");
		// tl.set("#svg_shadow", {smorphSVG:"#svg_shadow-2", ease:"expo.out"},"<");
		// Exit the text
		tl.to('.whamBam', {duration:0.3, scale:0, autoAlpha:0},">");
		return tl;
	},

	// --------AFRICAN LEADERS: CLUSTER OF DARK SPHERES OVER AFRICA-------------------------------------
	africanLeaders: function() {

		// gsap.set('#leaderStuff', {xPercent:-50, yPercent:-50, left:"50%", top:"50%", transformOrigin:"50% 50%", scale:1});
		// gsap.set('.leader',{x:1000, y:600, scale:0.5, transformOrigin:"50% 50%", autoAlpha:0});
		var container = document.querySelector('#clusterOfLeaders'),
			maxY = container.getBoundingClientRect().height /2,
			maxX = container.getBoundingClientRect().width /2;


		console.log(maxY, "by", maxX);


		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "African Leaders",
				// markers: true,
				trigger: "#africanLeaders",
				endTrigger: "#africanLeadersEnding",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		tl.fromTo('.singleLeader',{autoAlpha:0, scale:0}, {stagger:0.1, duration:3, autoAlpha:1, scale:0.8, ease:"bounce-out", x:"random(-" + maxX + ", " + maxX + ")", y:"random(-" + maxY + ", " + maxY + ")", transformOrigin:"center"}).duration(3);
		tl.to('#clusterOfLeaders',{duration:3, background:$brandContrastDarkest},'>');
		tl.to('#sadAnnaInAfrica', {duration:1, autoAlpha:0},"<")
		return tl;
	},

	// --------SOLUTION: EMIT BELIEVES TEXT-------------------------------------
	solution: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Solution",
				// markers: true,
				trigger: "#solution",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_solution',{duration:0.3, scale:0, autoAlpha:0},">");

		// EXIT THE TEXT
		tl.to('#text_solution',{duration:0.5, x:300, delay:3, autoAlpha:0},">");

		return tl;
	},
	// --------LOGO REAPPEARS-------------------------------------
	logoReappears: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "logoReappears",
				// markers: true,
				trigger: "#logoReappears",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// Scale up spheres and logo
		tl.to('#animatedLogoWrap',{duration:1, x:0, y:0, scale:1, autoAlpha:1},"<");
		tl.to('#spheresWrap', {duration:1, x:0, y:0, scale:0.5, autoAlpha:1},"<");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body", ease:"expo.out"},">");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow", ease:"expo.out"},"<");

		return tl;
	},
	// --------MEET ANNA -------------------------------------
	meetAnna: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Meet Anna",
				// markers: true,
				trigger: "#meetAnna",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// Animate little logo
		// tl.to('#svg-impactRingCircle',{duration:0.3, autoAlpha:0});
		tl.to("#svg_body", {duration:0.4, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:0.4, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");
		tl.to('.you', {duration:0.4, x:-130, ease:"expo.out"},"<");
		// Show annaAtTheCentre
		tl.fromTo('#annaAtTheCenter',{scale:0, autoAlpha:0}, {duration:0.6, ease:"expo.out", scale:1.5, autoAlpha:1},'<');
		// ENTRANCE THE TEXT
		tl.from('#text_meetAnna',{duration:1, scale:0, autoAlpha:0},">");
		// EXIT THE MEET ANNA TEXT
		tl.to('#text_meetAnna',{duration:1, x:1000, scale:0, delay:2, autoAlpha:0},">");
		return tl;

	},

	// --------ANNA'S LEADERS : ANIMATED CURVED TITLES IN SPHERES-------------------------------------
	annasLeaders: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Annas Leaders",
				// markers: true,
				trigger: "#annasleaders",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// Set starting values for this scene
		tl.set('.sphere3, .sphere2, .sphere1',{autoAlpha:0, scale:1.8, backgroundColor:"rgba(0,0,0,0.7)", border:"1px solid rgba(255,255,255,0.2)", immediateRender:false});
		tl.set('.yourImpactBackgrounds',{x:0, y:0, scale:1, autoAlpha:1, transformOrigin:"50% 50%", immediateRender:false});
		tl.set('.annasLeaders',{scale:0.95});
		tl.to('#annaAtTheCenter',{duration:2, scale:1},"<");
		// SPHERES
		
		tl.to('.sphere1', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},"<");
		tl.to('.sphere2', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},">");
		tl.to('.sphere3', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},">");

		// Reveal Leader Titles
		tl.from('.annasLeaders',{autoAlpha:0, ease:"linear", stagger:2, rotate:-30, transformOrigin:"50% 50%"},'<-4');

		return tl;
	}, //END ANNA'S STORY

	// --------IF WE CAN IMPACT HER LEADERS WE CAN CHANGE HER LIFE -------------------------------------
	ifOnly: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "If Only",
				// markers: true,
				trigger: "#ifOnly",
				start: "top bottom",
				endTrigger: "#imagineIntro",
				end: "center center",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_ifOnly', {duration:1, scale:0, delay:1, autoAlpha:0});
		tl.to('#text_ifOnly', {duration:1, scale:0, autoAlpha:0, delay:3},">");
		return tl;
	},

	// --------IMAGINE - INTRO (TEXT)-------------------------------------
	imagineIntro: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Imagine Intro",
				// markers: true,
				trigger: "#imagineIntro",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#imagineIntro .sectionHeading span ', {autoAlpha:0, y:"300", stagger:"0.2"});
		return tl;
	},

	// --------IMAGINE ANIMATION: ZOOM INTO THE VILLAGE -------------------------------------
	imagine: function() {
		var vd = document.getElementById("vid_josephZoomIn");
		function playVideo(progress) {
			var progress = (progress / 1 * 100);
			var vdProgress = (progress / 100) * vd.duration;
			vd.currentTime = vdProgress;
		}
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Imagine",
				// markers: true,
				trigger: "#imagine",
				start: "top bottom",
				end: "bottom bottom",
				onUpdate: st => {
					playVideo(st.progress)
				},
				toggleActions: "play complete reverse reverse",
			}
		});
		tl.to('#josephZoomIn', {duration:0.3, autoAlpha:1});
		tl.to('.leader', {scale:0, stagger:{amount:0.3}, autoAlpha:0},"<");
		tl.to('#annasLeadersWrap',{duration:0.3, scale:0.3, autoAlpha:0},"<");

		tl.to(".yourImpactBackgrounds", {duration:1, scale:0.4},"<");
		tl.to('.you', {duration:1, x:0, ease:"expo.out"},"<");
		tl.to("#svg_body", {duration:1, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:1, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		return tl;
	},

	// --------MEET JOSEPH -------------------------------------
	joseph: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph",
				// markers: true,
				trigger: "#joseph",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_joseph',{duration:1, scale:0, autoAlpha:0},">");
		tl.set('#josephAtTheCenter',{autoAlpha:1, border:"1px solid #86b744"},'>');
		// EXIT THE TEXT
		tl.to('#text_joseph',{duration:1, scale:0, delay:1, autoAlpha:0},">");

		tl.to('.you', {duration:1, x:-130, ease:"expo.out"},"<");
		tl.to("#svg_body", {duration:1, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:1, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");

		// tl.add('colorChange',"<0.3");
		tl.to('.yourImpactBackgrounds', {duration:1, scale:1},"<");
		tl.to('.sphere3, .sphere2, .sphere1',{duration: 1, border:"1px solid #86b744"},"<");

		// SPHERES
		tl.to('.sphere1', {duration:1, backgroundColor:"#85b744"},"colorChange");
		tl.to('.sphere2', {duration:1, backgroundColor:"#37ab5d"},"<0.5");
		tl.to('.sphere3', {duration:1, backgroundColor:"#03956d"},"<0.5");
		return tl;
	},

	// JOSEPH ON TEN INTRO - TEXT ONLY
	josephOnTenIntro: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph",
				// markers: true,
				trigger: "#josephOnTenIntro",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_josephOnTenIntro',{duration:1, scale:2, autoAlpha:0});

		// EXIT THE TEXT
		tl.to('#text_josephOnTenIntro',{duration:1, scale:0, delay:3, autoAlpha:0},">");

		return tl;
	},

	// --------JOSEPH ON TEN: ANIMATION ONLY-------------------------------------
	josephOnTen: function() {
		var allLeaders = gsap.utils.toArray(".leader");
		var onTenLeaders = allLeaders.slice([0], [10]);
		var vd = document.getElementById("vid_josephZoomIn");
		function playVideo(progress) {
			var progress = 1-progress / 2;
			// console.log(progress);
			progress = (progress / 1 * 100);
			var vdProgress = (progress / 100) * vd.duration;
			vd.currentTime = vdProgress;
		}
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph On Ten",
				// markers: true,
				trigger: "#josephOnTen",
				start: "top bottom",
				end: "bottom bottom",
				onUpdate: st => {
					playVideo(st.progress)
				},
				toggleActions: "play complete reverse reverse",
			}
		});

		// tl.set('.leader',{xPercent:0, yPercent:0, scale:2, autoAlpha:1, transformOrigin:"50% 50%", rotation:angle + 'rad'});
		tl.set('.leader', {scale:5, xPercent:0, yPercent:0, scale:2, autoAlpha:0});
		tl.set(onTenLeaders, {rotation:angle + 'rad'},"<");

		tl.to('.yourImpactBackgrounds',{duration:0.5, scale:0.6},"<");
		tl.to('#josephAtTheCenter',{duration:0.5, scale:0.6},"<");

		// Loop through OnTen leaders and animate them
		var rads = 36  * (Math.PI / 180);
		var angle = 0;
		var distance = 750;
		onTenLeaders.forEach(leader => {
			angle = angle + rads;
			tl.to(leader, {
				scale: 5,
				duration:0.3,
				autoAlpha:1,
				rotation:angle + 'rad',
				transformOrigin:"center",
				autoAlpha:1,
				xPercent: Math.cos(angle) * distance,
				yPercent: Math.sin(angle) * distance
			},">");
		});
		//End forEach onTenLeader loop

		return tl;
	},

	// --------JOSEPH AND TEAM TRAINING - WHAMBAM TEXT -------------------------------------
	josephTrainingIntro: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph Training Intro",
				// markers: true,
				trigger: "#josephTrainingIntro",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_josephTrainingIntro',{duration:1, scale:0, autoAlpha:0},">");
		return tl;
	},

	// --------JOSEPH AND TEAM TRAINING - WHAMBAM TEXT -------------------------------------
	josephTraining: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph Training",
				// markers: true,
				trigger: "#josephTraining",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_josephTraining1',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining2',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining3',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining4',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining5',{duration:1, scale:0, autoAlpha:0},">");

		// Exit the text
		tl.to('.whamBam2', {duration:0.3, scale:0, autoAlpha:0},">");
		return tl;
	},


	// --------JOSEPH AND TEAM EQUIPPED: ANIMATION ONLY-------------------------------------
	josephEquipped: function() {
		var allLeaders = gsap.utils.toArray(".leader");
		var onTenLeaders = allLeaders.slice([0], [10]);
		let fillColors = ["#03956d", "#37ab5d", $brandDarker, $brand];
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph equipped",
				// markers: true,
				trigger: "#josephEquipped",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		onTenLeaders.forEach(leader => {
			var leaderSpheres = leader.getElementsByTagName("ellipse");
			tl.to(leaderSpheres, {
				fill: function(index, elem) { return fillColors[index] }
			},0);
		});
		//End forEach leader
		return tl;
	},

	// --------JOSEPH AND TEAM TRANSFORM INTRO -------------------------------------
	josephTransformIntro: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph Transform Intro",
				// markers: true,
				trigger: "#josephTransformationIntro",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		// ENTRANCE THE TEXT
		tl.from('#text_josephTransformationIntro',{duration:1, scale:0, autoAlpha:0},">");

		// Exit the text
		tl.to('#text_josephTransformationIntro', {duration:1, delay:1, scale:0, autoAlpha:0},">");
		return tl;
	},


	// --------JOSEPH AND HIS TEAM TRANSFORM COMMUNITY : ANIMATION ONLY-------------------------------------
	josephTransformation: function() {

		var vd = document.getElementById("vid_josephZoomIn");
		function playVideo(progress) {
			var progress = 0.5-progress / 2;
			// console.log(progress);
			progress = (progress / 1 * 100);
			var vdProgress = (progress / 100) * vd.duration;
			vd.currentTime = vdProgress;
		}

		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Joseph and Team Transformation",
				// markers: true,
				trigger: "#josephTransformation",
				start: "top bottom",
				end: "bottom bottom",
				onUpdate: st => {
					playVideo(st.progress)
				},
				toggleActions: "play complete reverse reverse",
			}
		});
		// color change
		tl.from('.overlay2', { duration:1, autoAlpha:0, scale:0, ease: "linear"},"<");
		tl.to('.leader',{scale:0.3, autoAlpha:0, xPercent:"random(-3000, 3000)", yPercent:"random(-1500, 1500)", transformOrigin:"center"},"<");
		tl.to('#vid_josephZoomIn',{duration:1, filter:"grayscale(0)", filter: "saturate(5)"},'<0.3');
		return tl;
	},

	// SONYA - ADD HERE - SPINNING PLANET AGAIN?

	// --------EMIT IMPACT-------------------------------------
	emitImpact: function() {
		var allLeaders = gsap.utils.toArray(".leader");
		var onTenLeaders = allLeaders.slice([0], [10]);
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "EMIT impact",
				// markers: true,
				trigger: "#emitImpact",
				start: "top center",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});

		// ENTRANCE THE TEXT
		tl.from('#emitImpact .sectionHeading span, .exploreDescription, #explorebtn', {autoAlpha:0, y:"300", stagger:"0.2"});
		// ENTRANCE THE BUTTON
		// tl.from('#explorebtn',{duration:1, y:50, autoAlpha:0},'>');
		// prepare for next scene
		tl.set('.leader',{scale:10, autoAlpha:1, xPercent:"random(-3000, 3000)", yPercent:"random(-1500, 1500)", transformOrigin:"center"});
		tl.set('.leader ellipse', {fill:"#1c2127", stroke:"rgba(255,255,255,0.5)"});
		return tl;
	},

	// --------WAITING LIST-------------------------------------
	waitingList: function() {
		// var allLeaders = gsap.utils.toArray(".leader");
		// var onTenLeaders = allLeaders.slice([0], [10]);

		var tl = gsap.timeline({
			scrollTrigger: {
				id: "EMIT waitingList",
				// markers: true,
				trigger: "#waitingList",
				start: "top 10%",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		tl.to('#josephAtTheCenter',{autoAlpha:0},"<");
		tl.set('#josephZoomIn', {autoAlpha:0},"<");
		// tl.set('.overlay', { autoAlpha:1, scale:1, backgroundColor:"#678220"},"<");

		return tl;
	},

	// --------MAKE A DIFFERENCE : CHANGE TO GREEN LEADERS-------------------------------------
	makeADifference: function() {
		var emitLeaders = gsap.utils.toArray(".leader");
		let fillColors = ["#03956d", "#37ab5d", "#85b744", "rgba(255,255,255,0.2)"];
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Make a Difference",
				// markers: true,
				trigger: "#makeADifference",
				start: "top center",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});

		// YOU CAN
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body", ease:"expo.out"});
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.to('.yourImpactBackgrounds', {duration:1, scale:0.7}, "<");
		tl.from("#makeDif1", {duration:1, autoAlpha:0, scale:0}, "<");
		tl.to("#makeDif1", {duration:1, delay:3, autoAlpha:0, scale:0}, "<");
		tl.add("textAnimate");

		emitLeaders.forEach(leader => {
			var leaderSpheres = leader.getElementsByTagName("ellipse");
			tl.to(leaderSpheres, {
				stagger:0.1,
				// amount: 0.1,
				fill: function(index, elem) { return fillColors[index] }
			},"<+0.1");
		}); //End forEach leader

		// BE THE
		tl.to(".you", {duration:0.6, x:-150, ease:"expo.out"}, "textAnimate");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body-2", ease:"expo.out"}, "textAnimate");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow-2", ease:"expo.out"}, "textAnimate");
		tl.to('.yourImpactBackgrounds', {duration:1, scale:0.8}, "textAnimate");
		tl.from("#makeDif2", {duration:1, autoAlpha:0, scale:0}, "textAnimate");
		tl.to("#makeDif2", {duration:1, delay:3, autoAlpha:0, scale:0}, "textAnimate");
		// tl.add("textAnimate2");


		// CHANGE
		tl.to(".you", {duration:0.6, x:-190, ease:"expo.out"}, ">");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body", ease:"expo.out"}, "<");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow", ease:"expo.out"}, "<");
		tl.to('.yourImpactBackgrounds', {duration:1, scale:0.9}, "<");
		tl.from("#makeDif3", {duration:1, autoAlpha:0, scale:0}, "<");

		// PREPARE FOR NEXT SCENE
		tl.to('.backgroundLayer.colorBG', {duration:1, backgroundColor:"#04956D"}, 0);

		return tl;
	},


	// LIVE A LARGER LIFE: NO ANIMATION FOR ONE SCROLLING SECTION

	// --------SMILING ANNA-------------------------------------
	smilingAnna: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Smiling Anna",
				// markers: true,
				trigger: "#smilingAnna",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});
		tl.to('.you', {duration:0.1, x:-130}, 0);
		tl.to('#sadAnnaInAfrica', {duration:0.1, autoAlpha:1, filter:"grayscale(100%)"}, 0);
		tl.to('#smilingAnnaInAfrica', {duration:0.1, x:5, y:35, transformOrigin: "50% 50%"}, 0);
		tl.to("#makeDif3", {duration:1, autoAlpha:0, scale:0}, "textAnimate", ">");

		tl.to('.backgroundLayer.colorBG', {duration:0.5, backgroundColor: $brandContrastLight4},0);
		tl.to('.leader',{autoAlpha:0, scale:0, xPercent:"random(-3000, 3000)", yPercent:"random(-1500, 1500)", transformOrigin:"center"},"<");

		tl.to(".you", {duration:0.6, ease:"expo.out", scale:0.6},"<");
		tl.to(".yourImpactBackgrounds", {duration:0.5, x:-130, ease:"expo.out", scale:0.30},"<");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");

		return tl;
	},

	// --------DONATE BUTTON-------------------------------------
	donate: function() {
		var tl = gsap.timeline({
			defaults:{duration:1},
			scrollTrigger: {
				id: "Donate now",
				// markers: true,
				trigger: "#donate",
				start: "top bottom",
				end: "bottom bottom",
				toggleActions: "play complete reverse reverse",
			}
		});

		// Pulse out the yourImpact spheres
		tl.to('.yourImpactBackgrounds .sphere',{duration:2, scale:5, stagger:0.1, autoAlpha:0});
		// tl.to('.overlay', { duration:1, autoAlpha:1, scale:1, backgroundColor:"#678220", ease:"linear"},"<");
		// tl.to('.backgroundLayer.colorBG', {duration:1, ease:"linear", backgroundColor:"#678220"},"<");

		// ANNA SMILING CHANGE HERE
		tl.from('#smilingAnnaInAfrica', {duration:1, autoAlpha:0, ease:"linear"},"<");
		tl.to('.backgroundLayer.colorBG', {duration:1, backgroundColor: $brandContrastLight3}, 0);

		// tl.to('.overlay', {duration:1, ease:"linear", backgroundColor:"#A5ABAD"},"<");

		// Logo animates to top right of screen and donate button pulses
		tl.to('.you',{duration:3, ease:"circ.out", scale:1.5, top:0, x:450, autoAlpha:"0"},">");
		tl.to("#svg_body", {duration:3, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:3, morphSVG:"#svg_shadow", ease:"expo.out"},"<");

		tl.to('#donateBtn', {duration:0.5, repeat:1, scale:1.1, opacity:0.7, yoyo:true},"<2.5");
		return tl;
	}


} //END NINJA FUNCTIONS