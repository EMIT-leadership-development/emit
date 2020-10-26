"use strict";
// ---------------------ADD ALL THE ANIMATIONS TO THE MOTHER TIMELINE
window.onload = function() {
	startup();
	topnav();
	storyNav();
	pinDonation();
	initialSettings();

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
	tl_mother.add(NINJA_FUNCTIONS.ifWeCan());
	tl_mother.addLabel("ifWeCan");
	tl_mother.add(NINJA_FUNCTIONS.imagineIntro());
	tl_mother.addLabel("imagineIntro");
	tl_mother.add(NINJA_FUNCTIONS.villageReveal());
	tl_mother.addLabel("villageReveal");
	tl_mother.add(NINJA_FUNCTIONS.meetJoseph());
	tl_mother.addLabel("meetJoseph");
	tl_mother.add(NINJA_FUNCTIONS.transformedHisLife());
	tl_mother.addLabel("transformedHisLife");
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
	// Empty scrolling for 100vh
	tl_mother.addLabel("emitImpact","+=5");
	tl_mother.add(NINJA_FUNCTIONS.waitingList(),"+=5");
	tl_mother.addLabel("waitingList");
	tl_mother.add(NINJA_FUNCTIONS.makeADifference());
	tl_mother.addLabel("makeADifference");
	tl_mother.add(NINJA_FUNCTIONS.largerLife());
	tl_mother.addLabel("largerLife");
	tl_mother.add(NINJA_FUNCTIONS.sadAnna());
	tl_mother.addLabel("sadAnna");
	tl_mother.add(NINJA_FUNCTIONS.donate());
	tl_mother.addLabel("donate");

	const myST = ScrollTrigger.create({
		animation: tl_mother,
		id: "myST",
		trigger: "#yourStoryTitle",
		start: "top bottom",
		endTrigger: "main.content",
		end: "bottom bottom",
		onUpdate: self => scrollProgress(self.progress),
		toggleActions: "play complete reverse reverse",
		scrub: 1
	});
	console.log("LABELS", tl_mother.labels);
	// console.log("DURATION", tl_mother.totalDuration());
	// -------SCROLL PROGRESS INDICATOR
	function scrollProgress(progress) {
		// console.log(progress);
		let progressTween = gsap.fromTo("#progressIndicator",
			{height: 0 },
			{height: "100%",
			duration: 5,
			ease: "none",
			paused: true
			});
		progressTween.progress(progress);
	}
	//--------STORY NAV : LEFT LINKS THAT NAVIGATE THE HOME PAGE STORY -------------------------------------
	function storyNav() {
		// Also slipped the scrolldown link in here
		gsap.utils.toArray(".storyNav li a span, #scrollDown").forEach(function(a) {
			a.addEventListener("click", function(e) {
				e.preventDefault();
				var label = e.target.closest("a").getAttribute("data-jump");
				console.log("clicked: ", label);
				if (label) {
					const percent = tl_mother.labels[label] / tl_mother.totalDuration();
					const scrollPos = myST.start + (myST.end - myST.start) * percent;
					gsap.to(window, {duration: 1, scrollTo: scrollPos});
				}else {
					const section = document.querySelector(a.closest("a").getAttribute("href"));
					gsap.to(window, {duration: 1, scrollTo: section});
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
		tl.to('#scrollDown',{duration:1, yoyo:true, y:-10, repeat:-1},'<');
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
		gsap.set('#clusterOfLeaders svg, #overlayCircleWrap svg', {xPercent:-50, yPercent:-50, left:"50%", top:"50%", transformOrigin:"50% 50%", scale:1});
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
	$brandContrastLight4 = "#A5ABAD";

// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {
	// --------YOUR STORY TITLE: WHO YOU ARE, YOUR CHOICES... -----------------------------------
	yourStoryTitle: function() {
		var tl = gsap.timeline({
		});
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
	ifWeCan: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_ifWeCan', {duration:1, scale:0, delay:1, autoAlpha:0});
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
		tl.set('#annasLeadersWrap',{scale:0, autoAlpha:0});
		tl.set("#annaAtTheCenter", {scale:0, autoAlpha:0});
		tl.set("#spheresWrap", {scale:0.4, autoAlpha:0});
		tl.set('#animatedLogoWrap', {x:0, autoAlpha:0});
		tl.to('#villageVideoWrap', {duration:5, autoAlpha:1},"<");
		tl.to('#text_ifWeCan', {duration:3, scale:0, autoAlpha:0, delay:1},"<");
		tl.to('#annaInAfrica', {duration:5, background:"transparent"},"<");
		tl.to('.singleLeader', {duration:5, scale:0, stagger:0.1, rotation:0.01, force3D:true, autoAlpha:0},"<");
		tl.totalDuration(5);
		return tl;
	},
	// --------HELPER FUNCTION: VIDEO SCRUB -------------------------------------
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
		// console.log(progress);
		videoTween.progress(progress);
	},
	// --------MEET JOSEPH (ZOOM IN TO VILLAGE)-------------------------------------
	meetJoseph: function() {
		var tl = gsap.timeline({
			onUpdate: function() {
				NINJA_FUNCTIONS.scrubVideo(this.progress(), "reverse");
			}
		});
		tl.from('#text_joseph',{duration:1, delay:9, scale:0, autoAlpha:0},">");
		tl.totalDuration(10);
		return tl;
	},
	// --------EMIT HAS TRANSFORMED HIS LIFE -------------------------------------
	transformedHisLife: function() {
		var tl = gsap.timeline({
		});
		tl.set('#josephAtTheCenter',{scale:1, autoAlpha:1, });
		tl.to('#text_joseph',{duration:2, scale:0, autoAlpha:0},+2);
		tl.to('#animatedLogoWrap', {duration:2, x:-130, ease:"expo.out"},"<");
		tl.to("#svg_body", {duration:2, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:2, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.to('#spheresWrap', {duration:1, autoAlpha:1, scale:1});
		tl.to('#spheresWrap .sphere1', {duration:2, backgroundColor:$sphere1BG, border:"1px solid #86b744"},"<");
		tl.to('#spheresWrap .sphere2', {duration:2, backgroundColor:$sphere2BG, border:"1px solid #86b744"},"<1");
		tl.to('#spheresWrap .sphere3', {duration:2, backgroundColor:$sphere3BG, border:"1px solid #86b744"},"<1");
		tl.totalDuration(10);
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
	// --------EMIT TRAINING CONTENT-------------------------------------
	emitTrainingContent: function() {
		var tl = gsap.timeline({
		});
		tl.from('#text_josephTraining1',{duration:1, delay:3, scale:0, autoAlpha:0});
		tl.from('#text_josephTraining2',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining3',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining4',{duration:1, scale:0, autoAlpha:0},">");
		tl.from('#text_josephTraining5',{duration:1, scale:0, autoAlpha:0},">");
		tl.totalDuration(10);
		return tl;
	},
	// --------TRANSFORM INTRO: WITH RENEWED VISION THEY BEGIN... -------------------------------------
	transformIntro: function() {
		var tl = gsap.timeline({
		});
		tl.to('.whamBam2', {duration:1, scale:0, autoAlpha:0});
		tl.from('#text_josephTransformationIntro',{duration:3, scale:0, autoAlpha:0},">");
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
		tl.set('#josephOnTenPeople', {scale:0, autoAlpha:0},"<");
		tl.set('#josephAtTheCenter', {scale:0, autoAlpha:0},"<");
		tl.set('#spheresWrap',{autoAlpha:0, scale: 0},'<');
		tl.to('#text_josephTransformationIntro', {duration:1, delay:1, scale:0, autoAlpha:0},"<");
		tl.from('.overlayCircle',{duration:5, delay:4, scale:0, autoAlpha:0, transformOrigin:"center center"},">");
		tl.totalDuration(5);
		return tl;
	},

	// -------- EMIT IMPACT: Empty scrolling for 5s / 100vh : Emit has already infulenced

	// -------- WE HAVE A WAITING LIST-------------------------------------
	waitingList: function() {
		var tl = gsap.timeline({
		});
		tl.to('#villageVideoWrap',{duration:5, autoAlpha:0});
		tl.totalDuration(5);
		return tl;
	},
	// --------MAKE A DIFFERENCE : CHANGE TO GREEN LEADERS-------------------------------------
	makeADifference: function() {
		var emitLeaders = gsap.utils.toArray(".singleLeader");
		let fillColors = ["#03956d", "#37ab5d", "#85b744", "rgba(255,255,255,0.2)"];
		var tl = gsap.timeline({
		});
		tl.fromTo('#annaInAfrica', {background:$brandContrastDark}, {duration:5, background:$sphere3BG, immediateRender:false});
		tl.to('.singleLeader',{duration:2, scale:10, autoAlpha:1, transformOrigin:"center"},"<");
		tl.to('#animatedLogoWrap', {duration:0.6, autoAlpha:1, scale:0.7},"<");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.to('#spheresWrap', {duration:1, scale:0.7, autoAlpha:1}, "<");
		// YOU CAN
		tl.from("#makeDif1", {duration:1, delay:2, autoAlpha:0, scale:0}, ">");
		tl.to("#makeDif1", {duration:1, delay:3, autoAlpha:0, scale:0}, "<");
		tl.add("textAnimate");
		emitLeaders.forEach(leader => {
			var leaderSpheres = leader.getElementsByTagName("circle");
			tl.to(leaderSpheres, {
				stagger:0.1,
				// amount: 0.1,
				fill: function(index, elem) { return fillColors[index] }
			},"<+0.1");
		}); //End forEach leader
		// BE THE
		tl.to("#animatedLogoWrap", {duration:0.6, x:-150, ease:"expo.out"}, "textAnimate");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body-2", ease:"expo.out"}, "textAnimate");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow-2", ease:"expo.out"}, "textAnimate");
		tl.to('#spheresWrap', {duration:1, scale:0.8}, "textAnimate");
		tl.from("#makeDif2", {duration:1, autoAlpha:0, scale:0}, "textAnimate");
		tl.to("#makeDif2", {duration:1, delay:3, autoAlpha:0, scale:0}, "textAnimate");
		tl.add("textAnimate2");
		// CHANGE
		tl.to("#animatedLogoWrap", {duration:0.6, x:-190, ease:"expo.out"}, ">");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body", ease:"expo.out"}, "<");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow", ease:"expo.out"}, "<");
		tl.to('#spheresWrap', {duration:1, scale:0.9}, "<");
		tl.from("#makeDif3", {duration:1, autoAlpha:0, scale:0}, "<");
		tl.totalDuration(10);
		return tl;
	},
	// --------LARGER LIFE-------------------------------------
	largerLife: function() {
		var tl = gsap.timeline({
		});
		tl.to('#annaInAfrica', {duration:1, delay:4, background:$brandContrastLight2});
		tl.totalDuration(5);
		return tl;
	},
	// --------SAD ANNA TO SMILING ANNA -------------------------------------
	sadAnna: function() {
		var tl = gsap.timeline({
		});
		tl.set('#smilingAnnaInAfrica', {x:5, y:35, transformOrigin: "50% 50%"});
		tl.to('#animatedLogoWrap', {duration:0.1, x:-130}, 0);
		tl.to('#sadAnnaInAfrica', {duration:0.1, autoAlpha:1, filter:"grayscale(100%)"}, 0);
		tl.to("#makeDif3", {duration:1, autoAlpha:0, scale:0}, "textAnimate", ">");
		tl.to('.singleLeader',{autoAlpha:0, scale:0, xPercent:"random(-3000, 3000)", yPercent:"random(-1500, 1500)", transformOrigin:"center"},"<");
		tl.to("#animatedLogoWrap", {duration:0.6, ease:"expo.out", scale:0.6},"<");
		tl.to("#spheresWrap", {duration:0.5, x:-130, ease:"expo.out", scale:0.30},"<");
		tl.to("#svg_body", {duration:0.6, morphSVG:"#svg_body-2", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:0.6, morphSVG:"#svg_shadow-2", ease:"expo.out"},"<");

		tl.to('#spheresWrap .sphere',{duration:2, scale:5, stagger:0.1, autoAlpha:0},">");
		tl.to('#annaInAfrica', {duration:1, delay:1, background:$brandContrastLight},"<");
		tl.from('#smilingAnnaInAfrica', {duration:2, autoAlpha:0, ease:"linear"},"<");

		tl.totalDuration(10);
		return tl;
	},
	// --------DONATE BUTTON-------------------------------------
	donate: function() {
		var tl = gsap.timeline({
		});
		tl.to('#animatedLogoWrap',{duration:3, ease:"circ.out", scale:1.5, top:0, right:0, autoAlpha:"0"},">");
		tl.to("#svg_body", {duration:3, morphSVG:"#svg_body", ease:"expo.out"},"<");
		tl.to("#svg_shadow", {duration:3, morphSVG:"#svg_shadow", ease:"expo.out"},"<");
		tl.to('#donateBtn', {duration:0.5, repeat:1, scale:1.2, opacity:0.7, yoyo:true},"<2.5");
		tl.totalDuration(5);
		return tl;
	}


} //END NINJA FUNCTIONS