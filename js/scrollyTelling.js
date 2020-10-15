"use strict";
// ---------------------ADD ALL THE ANIMATIONS TO THE MOTHER TIMELINE
window.onload = function() {
	startup();
	topnav();
	storyNav();
	pinDonation();
	initialSettings();
	// videoScrub();
	// videoScrubReverse();

	//--------MOTHER OF ALL TIMELINES : MAIN SCROLLING ANIMATION-------------------------------------
	const tl_mother = gsap.timeline({});
	tl_mother.add(NINJA_FUNCTIONS.yourStoryTitle());
	tl_mother.addLabel("yourStoryTitle");
	tl_mother.add(NINJA_FUNCTIONS.yourImpact());
	tl_mother.addLabel("yourImpact");
	tl_mother.add(NINJA_FUNCTIONS.whoDoYouImpactEntrance());
	tl_mother.addLabel("whoDoYouImpactEntrance");
	tl_mother.add(NINJA_FUNCTIONS.whoDoYouImpactExit());
	tl_mother.addLabel("whoDoYouImpactExit");
	tl_mother.add(NINJA_FUNCTIONS.yourPeopleImpact());
	tl_mother.addLabel("yourPeopleImpact");
	tl_mother.add(NINJA_FUNCTIONS.yourLegacy());
	tl_mother.addLabel("yourLegacy");
	tl_mother.add(NINJA_FUNCTIONS.africaProblem());
	tl_mother.addLabel("africaProblem");
	tl_mother.add(NINJA_FUNCTIONS.africaProblemSymptoms());
	tl_mother.addLabel("africaProblemSymptoms");
	tl_mother.add(NINJA_FUNCTIONS.africanLeaders());
	tl_mother.addLabel("africanLeaders");
	tl_mother.add(NINJA_FUNCTIONS.solution());
	tl_mother.addLabel("solution");
	tl_mother.add(NINJA_FUNCTIONS.meetAnna());
	tl_mother.addLabel("meetAnna");
	tl_mother.add(NINJA_FUNCTIONS.annasLeaders());
	tl_mother.addLabel("annasLeaders");
	tl_mother.add(NINJA_FUNCTIONS.ifOnly());
	tl_mother.addLabel("ifOnly");
	tl_mother.add(NINJA_FUNCTIONS.imagineIntro());
	tl_mother.addLabel("imagineIntro");
	tl_mother.add(NINJA_FUNCTIONS.villageReveal());
	tl_mother.addLabel("villageReveal");
	tl_mother.add(NINJA_FUNCTIONS.meetJoseph());
	tl_mother.addLabel("meetJoseph");
	tl_mother.add(NINJA_FUNCTIONS.transformedHisLife());
	tl_mother.addLabel("transformedHisLife");
	tl_mother.add(NINJA_FUNCTIONS.transformedHisLife2());
	tl_mother.addLabel("transformedHisLife2");
	tl_mother.add(NINJA_FUNCTIONS.josephMandate());
	tl_mother.addLabel("josephMandate");
	tl_mother.add(NINJA_FUNCTIONS.josephOnTen());
	tl_mother.addLabel("josephOnTen");
	tl_mother.add(NINJA_FUNCTIONS.emitTrainingIntro());
	tl_mother.addLabel("emitTrainingIntro");
	tl_mother.add(NINJA_FUNCTIONS.emitTrainingContent());
	tl_mother.addLabel("emitTrainingContent");
	tl_mother.add(NINJA_FUNCTIONS.transformIntro());
	tl_mother.addLabel("transformIntro");
	tl_mother.add(NINJA_FUNCTIONS.transformation());
	tl_mother.addLabel("transformation");
	// tl_mother.add(NINJA_FUNCTIONS.emitImpact);
	// tl_mother.add(NINJA_FUNCTIONS.waitingList);
	// tl_mother.add(NINJA_FUNCTIONS.makeADifference);
	// tl_mother.add(NINJA_FUNCTIONS.smilingAnna);
	// tl_mother.add(NINJA_FUNCTIONS.donate);

	const myST = ScrollTrigger.create({
		animation: tl_mother,
		id: "myST",
		trigger: "#yourStoryTitle",
		start: "top bottom",
		endTrigger: "main.content",
		end: "bottom bottom",
		// onUpdate: self => console.log("direction:", self.direction),
		toggleActions: "play complete reverse reverse",
		scrub: 1
	});
	// console.log("LABELS", tl_mother.labels);
	// console.log("DURATION", tl_mother.totalDuration());

	//--------STORY NAV : LEFT LINKS THAT NAVIGATE THE HOME PAGE STORY -------------------------------------
	function storyNav() {
		gsap.utils.toArray(".storyNav li a").forEach(function(a) {
			a.addEventListener("click", function(e) {
				e.preventDefault();
				var label = e.target.getAttribute("data-jump")
				if (label) {
					const percent = tl_mother.labels[label] / tl_mother.totalDuration();
					const scrollPos = myST.start + (myST.end - myST.start) * percent;
					gsap.to(window, {duration: 1, scrollTo: scrollPos});
				} else {
					const section = document.querySelector(a.getAttribute("href"));
					gsap.to(window, {scrollTo: section});
				}
			});
		});
	}
	//--------STARTUP: ANIMATIONS ON PAGE LOAD -------------------------------------
	function startup() {
		var tl = gsap.timeline({
			id: "Landing Scene",
			defaults:{duration:0.5},
		});
		tl.from('.nav-link a.topLevel', {autoAlpha:0, x:-100, stagger:0.1, ease:"linear"});
		tl.from('#headerLogo', {autoAlpha:0, x:-100, ease:"linear"}, "<");
		tl.from('.introHeadline h1 span', {autoAlpha:0, x:"100", stagger:0.1, ease:"linear"},"<" );
		return tl;
	}
	//--------TOPNAV: ANIMATE THE TOP NAV SHRINKING -------------------------------------
	function topnav() {
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
	}
	//--------PIN DONATION : FAKE PINS THE BUTTON TOP RIGHT OF THE SCREEN-------------------------------------
	function pinDonation() {
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
        tl.to('#introCTA', {duration:1, autoAlpha:0});
		tl.from('#donateBtn', {duration:1, autoAlpha:0},"<");
		tl.from('#loginBtn', {duration:1, background:"transparent", border:"1px solid #fff", color:"#ffffff", x:108},"<");
		tl.to('.ctaTitle', {duration:1, autoAlpha:0},"<");
		return tl;
	}
	//--------INITIAL SETTINGS -------------------------------------
	function initialSettings() {
		var bgVideo = document.querySelector("#vid_village");
		bgVideo.currentTime = 20;
		gsap.set('#clusterOfLeaders svg, .overlayCircleWrap svg', {xPercent:-50, yPercent:-50, left:"50%", top:"50%", transformOrigin:"50% 50%", scale:1});
		gsap.set('.singleLeader',{x:1000, y:600, scale:0.5, transformOrigin:"50% 50%", autoAlpha:0});
	}

} //End window.load

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

// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {
	// --------YOUR STORY TITLE: WHO YOU ARE, YOUR CHOICES... -----------------------------------
	yourStoryTitle: function() {
		var tl = gsap.timeline({
		});
		// 1.5
		tl.fromTo('.introHeadline h1',{autoAlpha:1, rotateX:0}, {duration:5, autoAlpha:0, rotateX:10});
		tl.from('#yourStoryTitle .sectionHeading span', {duration:3, autoAlpha:0, y:"300", stagger:"0.2", ease:"Sine.easeOut"},"<+1");
		tl.totalDuration(5);
		return tl;
	},
	// --------YOUR IMPACT - ENTER THE SPHERES AND LOGO -------------------------------------
	yourImpact: function () {
		var tl = gsap.timeline({
		});
		tl.fromTo('.sphere, #animatedLogoWrap', {scale:0, autoAlpha:0, x:0, y:0}, {stagger:0.1, scale:1, autoAlpha:1, transformOrigin:"50% 50%"}).duration(5);
		tl.totalDuration(5);
		return tl;
	},
	// --------WHO ARE THE PEOPLE YOU IMPACT -------------------------------------
	whoDoYouImpactEntrance: function () {
		var tl = gsap.timeline({
		});
		tl.from('#text_yourImpact',{duration:5, scale:0, autoAlpha:0},">");
		tl.totalDuration(5);
		return tl;
	},
	// --------WHO ARE THE PEOPLE YOU IMPACT -------------------------------------
	whoDoYouImpactExit: function () {
		var tl = gsap.timeline({
		});
		tl.to('#text_yourImpact', {duration:3, delay: 2, scale:0, autoAlpha:0},">");
		tl.totalDuration(5);
		return tl;
	},
	// --------THE PEOPLE YOU IMPACT: SPOUSE, FAMILY, COMMUNITY...THE CURVED TEXT IN SPHERES -------------------------------------
	yourPeopleImpact: function() {
		var tl = gsap.timeline({
		});
		tl.from('.yourPeople',{autoAlpha:0, ease:"linear", stagger:{amount:5}, rotate:-30, transformOrigin:"50% 50%"});
		tl.from('.impactTitle',{duration:2, autoAlpha:0, x:-20},"<");
		tl.totalDuration(5);
		return tl;
	},
	// --------YOUR LEGACY ANIMATION: SPINNING PLANET-------------------------------------
	yourLegacy: function() {
		var tl = gsap.timeline({
		});
		tl.to('#spinningPlanet', {duration:1, autoAlpha:1});
		tl.to('.impactTitle',{duration:0.5, autoAlpha:0, x:-20},">");
		tl.fromTo('#planetWrap',{scale:0.5, autoAlpha:0, x:200, y:-300}, {duration: 2.5, scale:1, autoAlpha:1, x:0, y:0},"<");
		tl.to('#animatedLogoWrap', {duration:1.5, scale: 0.4, y:105, x:-20, transformOrigin:"50% 50%"},"<");
		tl.to('#logoBorder', {duration:1.5, autoAlpha:0},"<");
		tl.to("#svg_body", {duration: 1.5, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration: 1.5, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");
		tl.to('#spheresWrap, #thePeopleYouImpactWrap', {duration:2.5, y:105, x:-15, autoAlpha:0, transformOrigin:"50% 50%", scale:0.2},"<");
		tl.to('#countries',{duration:10, xPercent:"-65", transformOrigin:"50% 50%"},">");
		tl.from('.circle2',{duration:2, autoAlpha: 0, y:-10, transformOrigin:"50% 50%"},"<4");
		tl.from('.circleShadow',{duration:3, autoAlpha: 0, y:-20, transformOrigin:"50% 50%"},"<3");
		tl.totalDuration(10);
		return tl;
	},
	// --------AFRICA PROBLEM -------------------------------------
	africaProblem: function () {
		var tl = gsap.timeline({
		});
		tl.to('#spinningPlanet', {duration:3, autoAlpha:0});
		tl.fromTo('#sadAnnaInAfrica', {scale:0.43, x:5, y:35, autoAlpha:0, transformOrigin: "50% 50%"}, {duration:2, scale:1, autoAlpha:1, transformOrigin: "50% 50%"},"<");
		tl.to('#annaInAfrica', {duration:2, backgroundColor:$brandContrastLight2},"<");
		tl.to('#animatedLogoWrap', {duration:1, autoAlpha:0},"<");
		tl.from('#text_africaProblem',{duration:2, scale:0, autoAlpha:0},">");
		tl.totalDuration(5);
		return tl;
	},
	// --------THE AFRICA PROBLEM ENDING - WHAMBAM TEXT -------------------------------------
	africaProblemSymptoms: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_africaProblem2',{duration:1.5, scale:0, autoAlpha:0, delay:3},">");
		tl.from('#text_africaProblem3',{duration:1.5, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem4',{duration:1.5, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem5',{duration:1.5, scale:0, autoAlpha:0},">");
		tl.from('#text_africaProblem6',{duration:1.5, scale:0, autoAlpha:0},">");
		tl.to('.whamBam', {duration:0.3, scale:0, autoAlpha:0},">");
		tl.totalDuration(10);
		return tl;
	},
	// --------AFRICAN LEADERS: CLUSTER OF DARK SPHERES OVER AFRICA-------------------------------------
	africanLeaders: function() {
		var container = document.querySelector('#clusterOfLeaders'),
			maxY = container.getBoundingClientRect().height /2,
			maxX = container.getBoundingClientRect().width /2;
		var tl = gsap.timeline({
		});
		tl.to('#annaInAfrica', {duration:5, background:$brandContrastDarkest});
		tl.to('#sadAnnaInAfrica', {duration:5, autoAlpha:0},"<")
		// tl.fromTo('.singleLeader',{autoAlpha:0, scale:0}, {stagger:0.1, autoAlpha:1, scale:0.8, ease:"bounce-out", x:"random(-" + maxX + ", " + maxX + ")", y:"random(-" + maxY + ", " + maxY + ")", transformOrigin:"center"},"<");
		tl.to('.singleLeader',{duration:5, stagger:0.1, scale:10, ease:"bounce-out", autoAlpha:1, xPercent:"random(-3000, 3000)", yPercent:"random(-1500, 1500)", transformOrigin:"center"},"<");
		tl.totalDuration(5);
		return tl;
	},
	// --------SOLUTION: EMIT BELIEVES TEXT-------------------------------------
	solution: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_solution',{duration:1, scale:0, autoAlpha:0});
		tl.totalDuration(5);
		return tl;
	},
	// --------MEET ANNA -------------------------------------
	meetAnna: function() {
		var tl = gsap.timeline({
		});
		tl.to('#text_solution',{duration:1, x:300, autoAlpha:0, delay:3});
		tl.to('#animatedLogoWrap',{duration:1, x:0, y:0, scale:1, autoAlpha:1},"<");
		tl.to('#spheresWrap', {duration:1, x:0, y:0, scale:0.5, autoAlpha:1},"<");
		tl.to("#svg_body", {duration:1, morphSVG:"#svg_body", ease:"expo.out"});
		tl.to("#svg_shadow", {duration:1, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.to('#animatedLogoWrap', {duration:1, x:-130, ease:"expo.out"},"<");
		tl.to('#animatedLogoWrap linearGradient #offsetEnd', {duration:1, attr: {'offset': 0.6, 'stop-opacity':0.01}, ease:"expo.out"},"<");
		tl.fromTo('#annaAtTheCenter',{scale:0, autoAlpha:0}, {duration:1.5, ease:"expo.out", scale:1.5, autoAlpha:1},'<');
		tl.from('#text_meetAnna',{duration:3.5, scale:0, autoAlpha:0},">");
		tl.totalDuration(10);
		return tl;
	},
	// --------ANNA'S LEADERS : ANIMATED CURVED TITLES IN SPHERES-------------------------------------
	annasLeaders: function() {
		var tl = gsap.timeline({
		});
		tl.to('#text_meetAnna',{duration:3.5, x:1000, scale:0, delay:2, autoAlpha:0},">");
		tl.set('#spheres .sphere3, #spheres .sphere2, #spheres .sphere1',{autoAlpha:0, scale:1.8, backgroundColor:"rgba(0,0,0,0.7)", border:"1px solid rgba(255,255,255,0.2)", immediateRender:false});
		tl.set('#spheresWrap',{x:0, y:0, scale:1, autoAlpha:1, transformOrigin:"50% 50%", immediateRender:false});
		tl.set('.annasLeaders',{scale:0.95});
		tl.to('#annaAtTheCenter',{duration:2, scale:1},"<");
		tl.to('#spheres .sphere1', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},"<");
		tl.to('#spheres .sphere2', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},">");
		tl.to('#spheres .sphere3', {duration:2, scale:1, autoAlpha:1, border:"0.5px solid rgba(255,255,255,0.3)", backgroundColor:"#1c2127"},">");
		tl.from('.annasLeaders',{autoAlpha:0, ease:"linear", stagger:2, rotate:-30, transformOrigin:"50% 50%"},'<-4');
		tl.totalDuration(10);
		return tl;
	},
	// --------IF WE CAN EQUIP HER LEADERS WE CAN CHANGE HER LIFE -------------------------------------
	ifOnly: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_ifOnly', {duration:1, scale:0, delay:1, autoAlpha:0});
		tl.totalDuration(5);
		return tl;
	},
	// --------IMAGINE IF YOU COULD-------------------------------------
	imagineIntro: function() {
		var tl = gsap.timeline({
		});
		tl.from('#imagineIntro .sectionHeading span ', {duration:3, autoAlpha:0, y:"300", stagger:"0.5"});
		tl.totalDuration(5);
		return tl;
	},
	// --------REVEAL VILLAGE -------------------------------------
	villageReveal: function() {
		var tl = gsap.timeline({
		});
		tl.to('#villageVideoWrap', {duration:5, autoAlpha:1},"<");
		tl.to('#text_ifOnly', {duration:3, scale:0, autoAlpha:0, delay:1},"<");
		tl.to('#annaInAfrica', {duration:5, background:"transparent"},"<");
		tl.to('.singleLeader', {duration:5, scale:0, stagger:0.1, rotation:0.01, force3D:true, autoAlpha:0},"<");
		tl.totalDuration(5);
		return tl;
	},


	scrubVideo: function(progress, scrubDir) {
		var bgVideo = document.querySelector("#vid_village");
		if (scrubDir == "reverse") {
			var progress = 1 - progress
		} else {
			var progress = progress;
		}
		let videoTween = gsap.fromTo(bgVideo,
			{currentTime: 0 },
			{currentTime: 20,
			duration: 5,
			ease: "none",
			paused: true
			});
		console.log(progress);
		videoTween.progress(progress);
	},

	// --------MEET JOSEPH (ZOOM IN TO VILLAGE)-------------------------------------
	meetJoseph: function() {
		var tl = gsap.timeline({
			onUpdate: function() {
				NINJA_FUNCTIONS.scrubVideo(this.progress(), "reverse");
			}
		});
		tl.to('#annasLeadersWrap',{duration:4, scale:0.3, autoAlpha:0},"<");
		tl.to("#annaAtTheCenter", {duration:4, scale:0, autoAlpha:0},"<");
		tl.to("#spheresWrap", {duration:4, scale:0.4},"<");
		tl.to('#animatedLogoWrap', {duration:2, x:0, ease:"expo.out"},"<");
		tl.to("#svg_body", {duration:2, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:2, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");
		tl.from('#text_joseph',{duration:1, scale:0, autoAlpha:0},">");
		tl.totalDuration(10);
		return tl;
	},
	// --------EMIT HAS TRANSFORMED HIS LIFE -------------------------------------
	transformedHisLife: function() {
		var tl = gsap.timeline({
		});
		tl.to('#text_joseph',{duration:2, scale:0, autoAlpha:0},+2);
		tl.from('#josephAtTheCenter',{duration: 3, scale:0, autoAlpha:0, },"<");
		tl.to('#animatedLogoWrap', {duration:2, x:-130, ease:"expo.out"},"<");
		tl.to("#svg_body", {duration:2, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:2, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.totalDuration(5);
		return tl;
	},
	// --------EMIT HAS TRANSFORMED HIS LIFE -------------------------------------
	transformedHisLife2: function() {
		var tl = gsap.timeline({
		});
		tl.to('#spheresWrap', {duration:1, scale:1});
		tl.to('#spheresWrap .sphere1', {duration:2, backgroundColor:"#85b744", border:"1px solid #86b744"},"<");
		tl.to('#spheresWrap .sphere2', {duration:2, backgroundColor:"#37ab5d", border:"1px solid #86b744"},"<1");
		tl.to('#spheresWrap .sphere3', {duration:2, backgroundColor:"#03956d", border:"1px solid #86b744"},"<1");
		tl.totalDuration(5);
		return tl;
	},




	// --------JOSEPH MANDATE-------------------------------------
	josephMandate: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_josephOnTenIntro',{duration:1, scale:2, autoAlpha:0});
		tl.totalDuration(5);
		return tl;
	},
	// --------JOSEPH ON TEN -------------------------------------
	josephOnTen: function() {
		var tl = gsap.timeline({
		});
		tl.to('#text_josephOnTenIntro',{duration:2, scale:0, delay:2, autoAlpha:0});
		tl.from('#josephOnTenPeople', {duration:3, scale:0, rotate:360, autoAlpha:0},">");
		tl.to('#josephAtTheCenter', {duration:3, filter:"drop-shadow(2px 2px 5px rgba(0,0,0,0.5)"},"<");
		tl.to("#svg_body", {duration:2, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:2, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");
		tl.totalDuration(5);
		return tl;
	},
	// --------EMIT TRAINING INTRO -------------------------------------
	emitTrainingIntro: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_josephTrainingIntro',{duration:2.5, delay:2.5, scale:0, autoAlpha:0});
		tl.totalDuration(5);
		return tl;
	},
	// --------EMIT TRAINING CONTENT -------------------------------------
	emitTrainingContent: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_josephTraining1',{duration:1, scale:0, autoAlpha:0});
		tl.from('#text_josephTraining2',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining3',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining4',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining5',{duration:1, scale:0, autoAlpha:0},">");
		tl.totalDuration(5);
		return tl;
	},
	// --------TRANSFORM INTRO -------------------------------------
	transformIntro: function() {
		var tl = gsap.timeline({
		});
		tl.to('.whamBam2', {duration:1, scale:0, autoAlpha:0});
		tl.from('#text_josephTransformationIntro',{duration:4, scale:0, autoAlpha:0},">");
		tl.totalDuration(5);
		return tl;
	},
	// --------TRANSFORMATION-------------------------------------
	transformation: function() {
		var tl = gsap.timeline({
			onUpdate: function() {
				NINJA_FUNCTIONS.scrubVideo(this.progress(), "forward");
			}
		});
		tl.to('#text_josephTransformationIntro', {duration:1, delay:1, scale:0, autoAlpha:0});
		tl.to('#josephOnTenPeople', {duration:2, scale:3, rotate:360, autoAlpha:0},"<");
		tl.from('.overlayCircleWrap svg',{duration:2, scale:0, autoAlpha:0},'>');
		tl.to('#villageVideoWrap video',{duration:2.5, filter: "saturate(5)"},'<+0.5');
		tl.totalDuration(10);
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