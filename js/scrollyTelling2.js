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
	// Start up functions
	NINJA_FUNCTIONS.startup();
	NINJA_FUNCTIONS.parrallaxHover();
	NINJA_FUNCTIONS.cursorFollower();
	NINJA_FUNCTIONS.noticeMe();


	// The little navigation control for joseph infographic
	var josephControlLinks = gsap.utils.toArray("#infographicControls ul li");
	josephControlLinks.forEach(link => {
		var timelineLabel = link.getAttribute("data-link");
		link.addEventListener("click", function(){josephTL.tweenTo(timelineLabel)});
		// link.addEventListener("click", function(){josephTL.seek(timelineLabel)});
	});

	// Functions to be called in slider
	var topNavTL = NINJA_FUNCTIONS.topnav();
	var africaTL = NINJA_FUNCTIONS.africa();
	var annaTL = NINJA_FUNCTIONS.anna();
	let josephTL = NINJA_FUNCTIONS.joseph();
	let noticeMeTL = NINJA_FUNCTIONS.noticeMe();
	let titletl;

	console.log(josephTL);

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
			// Nothing to do here - pendulaum animation is using css
		}
		// AFRICA SLIDE
		if (this.realIndex == 2) {
			africaTL.play();
		}
		if (this.realIndex != 2) {
			africaTL.pause();
			africaTL.time(0);
		}
		// ANNA SLIDE
		if (this.realIndex == 3) {
			annaTL.play();
		}
		if (this.realIndex != 3) {
			annaTL.pause();
			annaTL.time(0);
		}
		// JOSEPH SLIDE
		if (this.realIndex == 4) {
			josephTL.tweenFromTo("enterIntro","zoom");
			noticeMeTL.play();
		}
		if (this.realIndex != 4) {
			josephTL.pause();
			josephTL.time(0);
			noticeMeTL.pause();
			var canvasWrapper = document.getElementById("introduceCanvas");
			var canvas = document.getElementById("hero-lightpass");
			if (canvas.parentNode != canvasWrapper) {
				canvasWrapper.prepend(canvas)
			};
		}
	});

	// Click interactions for Joseph inforgraphic
	document.getElementById("startJoseph").addEventListener("click", function(){josephTL.tweenFromTo('zoom','josephImpact')});
	document.getElementById("next1").addEventListener("click", function(){josephTL.tweenFromTo('josephImpact','enterPrograms')});
	document.getElementById("next2").addEventListener("click", function(){josephTL.tweenFromTo('enterPrograms','enterMandate')});
	document.getElementById("next3").addEventListener("click", function(){josephTL.tweenFromTo('enterMandate','leaderAnimations')});
	// Animate each leader sequence
	document.getElementById("next4").addEventListener("click", function(){josephTL.tweenFromTo('womenLeaders','spiritualLeaders')});
	document.getElementById("leaderButton-1").addEventListener("click", function(){josephTL.tweenFromTo('spiritualLeaders','youthLeaders')});
	document.getElementById("leaderButton-2").addEventListener("click", function(){josephTL.tweenFromTo('youthLeaders','healthLeaders')});
	document.getElementById("leaderButton-3").addEventListener("click", function(){josephTL.tweenFromTo('healthLeaders','businessLeaders')});
	document.getElementById("leaderButton-4").addEventListener("click", function(){josephTL.tweenFromTo('businessLeaders','educators')});
	document.getElementById("leaderButton-5").addEventListener("click", function(){josephTL.tweenFromTo('educators','politicalLeaders')});
	document.getElementById("leaderButton-6").addEventListener("click", function(){josephTL.tweenFromTo('politicalLeaders','sportsLeaders')});
	document.getElementById("leaderButton-7").addEventListener("click", function(){josephTL.tweenFromTo('sportsLeaders','lawLeaders')});
	document.getElementById("leaderButton-8").addEventListener("click", function(){josephTL.tweenFromTo('lawLeaders','mediaLeaders')});
	document.getElementById("leaderButton-9").addEventListener("click", function(){josephTL.tweenFromTo('mediaLeaders','transform')});
	document.getElementById("leaderButton-10").addEventListener("click", function(){josephTL.tweenFromTo('transform','end')});

} //End window.load




// ALL THE ANIMATION NINJA_FUNCTIONS IN A NAMESPACE
var NINJA_FUNCTIONS = {

	//Startup functions on page load
	startup: function() {
		var tl = gsap.timeline({
			id: "Landing Scene",
			defaults:{duration:0.5},
		});
		tl.from('.nav-link a.topLevel', {autoAlpha:0, x:-100, stagger:0.1, ease:"linear"},"<");
		tl.from('#headerLogo', {autoAlpha:0, x:-100, ease:"linear"}, "<");
		tl.from('.introHeadline h1 span', {autoAlpha:0, x:100, stagger:0.1, ease:"linear"},"<" );
		// tl.to('#scrollDown',{duration:1, yoyo:true, y:-10, repeat:-1},'<');
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
	noticeMe: function() {
		// looping animated sphere for buttons
		// var noticeMeSphere = gsap.utils.toArray([".noticeMe"])
		var tl = gsap.timeline({paused:true});
		tl.fromTo(".noticeMe",
			{opacity:1, scale:0, background:$brand, fill:$brand},
			{duration:3, opacity:0, scale:1,  background:"transparent", fill:"transparent", transformOrigin:"center center", repeat:-1});
		return tl;
	},
	//Topnav animates the navigation shrinking
	topnav: function() {
		var tl = gsap.timeline({
			paused: true,
			id: "topNavShrink",
			defaults:{duration:0.3},
			});
			tl.to('#headerLogo .logo', {height:55, ease:"linear"});
			tl.to('.mainNavigation',{boxShadow: "0 1px 15px rgba(0,0,0, .15)", backgroundImage:"linear-gradient(90deg, #89b412 5%, transparent 30%)", backgroundColor:$brand},"<");
			tl.to('.topLevel',{color:"#000000"},"<");
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
	//--------SLIDE: AFRICA -------------------------------------
	africa: function() {
		let tl = gsap.timeline({
			defaults:{duration:0.5},
			paused: true,
			delay:0.5,
		});
		tl.from(".leaderRow", {duration:0.5, stagger:0.3, x:-300, autoAlpha:0});
		tl.to(".transformer",{width:"20%", borderRadius:"50%", delay:0.2});
		tl.to(".symptom",{scale:0},"<");
		tl.to(".transformer svg",{scale:1, transformOrigin:"50% 50%", autoAlpha:1 },"<0.5");
		tl.to(".africaLeader.reveal", {width:"20%", transformOrigin:"50% 50%"},"<-0.5");
		tl.totalDuration(1);
		return tl;
	},
	//--------SLIDE: ANNA -------------------------------------
	anna: function() {
		let tl = gsap.timeline({
			defaults:{duration:0.5},
			paused: true,
			delay:0.5,
		});
		tl.from('#anna .l1',{duration:1, y:-800});
		tl.fromTo('#anna .sphere1', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
		tl.fromTo('#anna .annaInTheCenter', {width:"100%", height:"100%"}, {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
		tl.from("#religious, #polititians",{duration:1, scale:1.5, autoAlpha:0 },"<");
		tl.to('#anna .l1',{duration:1, scale:0},">");

		tl.from('#anna .l2',{duration:1, y:-800},">0.3");
		tl.fromTo('#anna .sphere2', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
		tl.to('#anna .sphere1', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
		tl.to('#anna .annaInTheCenter', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
		tl.from("#community, #teachers",{duration:1, scale:1.5, autoAlpha:0 },"<");
		tl.to('#anna .l2',{duration:1, scale:0},">");

		tl.from('#anna .l3',{duration:1, y:-800},">0.3");
		tl.fromTo('#anna .sphere3', {width:"150%", height:"150%"}, {duration:1, width:"100%", height:"100%", autoAlpha:1, transformOrigin:"center center"},">");
		tl.to('#anna .sphere2', {duration:1, width:"80%", height:"80%", transformOrigin:"center center"},"<");
		tl.to('#anna .sphere1', {duration:1, width:"60%", height:"60%", transformOrigin:"center center"},"<");
		tl.to('#anna .annaInTheCenter', {duration:1, width:"40%", height:"40%", transformOrigin:"center center"},"<");
		tl.from("#peers, #parents",{duration:1, scale:1.5, autoAlpha:0 },"<");
		tl.to('#anna .l3',{duration:1, scale:0},">");
		tl.totalDuration(1);
		return tl;
	},
	//--------SLIDE: JOSEPH -------------------------------------
	joseph: function() {
		const canvas = document.getElementById("hero-lightpass");
		const context = canvas.getContext("2d");
		canvas.width = 1920;
		canvas.height = 1088;
		const frameCount = 254;
		const currentFrame = index => (`/video/africanVillage/${(index + 1).toString().padStart(4, '0')}.jpg`);
		const images = []
		const airpods = {frame: 0};

		const trainingBlips = gsap.utils.toArray(["#blip4, #blip5, #blip6, #blip7, #blip8, #blip9, #blip10, #blip1, #blip2, #blip3"]);
		const endPositions = [0.18, 0.4, 0.48, 0.55, 0.61, 0.68, 0.85];

		var gradientStops = gsap.utils.toArray("#Gradient-0 stop");
		var satelitePaths = gsap.utils.toArray("#satelites g path");
		var sateliteSpheres = gsap.utils.toArray("#satelites g ellipse");

		// Create Leaders Array
		var leaders = [
			{label:'womenLeaders', position:'428 688 570 323', gradientfx:680, gradientfy:895, startTime:10.5},
			{label:'spiritualLeaders', position:'97 655 570 323', gradientfx:330, gradientfy:840, startTime:13.5},
			{label:'youthLeaders', position:'58 420 570 323', gradientfx:280, gradientfy:580, startTime:16.5},
			{label:'healthLeaders', position:'38 207 570 323', gradientfx:255, gradientfy:350, startTime:19.5},
			{label:'businessLeaders', position:'450 148 570 323', gradientfx:720, gradientfy:280, startTime:22.5},
			{label:'educators', position:'760 145 570 323', gradientfx:1050, gradientfy:280, startTime:25.5},
			{label:'politicalLeaders', position:'1355 210 570 323', gradientfx:1695, gradientfy:360, startTime:28.5},
			{label:'sportsLeaders', position:'1200 435 570 323', gradientfx:1530, gradientfy:605, startTime:31.5},
			{label:'lawLeaders', position:'1355 635 570 323', gradientfx:1695, gradientfy:815, startTime:34.5},
			{label:'mediaLeaders', position:'900 740 570 323', gradientfx:1200, gradientfy:930, startTime:37.5},
		]

		// African Village "video"
		for (let i = 0; i < frameCount; i++) {
			const img = new Image();
			img.src = currentFrame(i);
			images.push(img);
		}
		images.reverse();
		images[0].onload = render;
		function render() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(images[airpods.frame], 0, 0);
		}
		// gsap flip animation moving canvas to different wrapper in dom
		function doFlip() {
			const state = Flip.getState(canvas);
			const infographicWrapper = document.getElementById("infographicWrapper");
			canvas.parentNode.id != "introduceCanvas" ? canvas.parentNode.prepend(canvas) : infographicWrapper.prepend(canvas);
			Flip.from(state, {duration: 0.5, scale:true, absolute:true, ease: "power1.inOut"});
		};

		// -------Main Timeline for this slide --------
		var tl = gsap.timeline({
			defaults: {
				duration: 0.5
			},
		});
		// Intro Start button
		tl.addLabel("enterIntro", 0);
		tl.from(".buttonRow .underline",{width:0, ease:"expo.out", transformOrigin:"0 50%" },"<");

		// Zoom Village
		tl.addLabel("zoom",">");
		tl.to(airpods, {duration: 1, frame: frameCount - 1, snap: "frame", onUpdate: render},">");
		tl.fromTo("#infographicWrapper",{autoAlpha:0, scale:0}, {autoAlpha:1, scale:1, transformOrigin:"center center"},"<");
		tl.to("#joseph .sectionContent .contentWrap",{rotateY:0, rotateX:0},">");
		tl.to("#joseph .sectionIntro",{autoAlpha:0},"<");
		tl.call(doFlip, null,">");
		tl.to("#infographicWrapper", {backgroundColor: $brandContrastDark},"<");
		tl.to("#joseph #infographicWrapper .overlay", {background: "radial-gradient(circle 20vmax at 50% 50%,rgba(0,0,0,0) 0%,rgba(0,0,0,.5) 80%,rgba(0,0,0,0.75) 100%)",autoAlpha:1},">");
		tl.to("#infographicWrapper svg", {duration:0.5, attr:{viewBox:"645 425 655 371.17"}, ease:"power3.inOut"}, "<");
		tl.from("#joseph #infographicWrapper #josephInVillageTransparent",{scale:0, autoAlpha:0, transformOrigin:"center center"},">");
		tl.from("#joseph #infographicWrapper #TextMeetJoseph",{scale:0, autoAlpha:0},">");

		// Joseph Impact
		tl.addLabel("josephImpact",">");
		tl.to(canvas,{autoAlpha:0},">");
		tl.to("#next1",{autoAlpha:0, scale:0},"<");
		tl.from("#s3, #s2, #s1",{autoAlpha:0, scale:0, stagger:0.2, transformOrigin:"50% 50%"},"<");
		tl.to("#infographicWrapper svg", {duration:0.5, attr:{viewBox:"870 444 570 323"}, ease:"power3.inOut"}, "<");
		tl.from("#trainingBooks",{scale:0, autoAlpha:0, transformOrigin:"center center"},"<");
		tl.from("#josephImpactText",{scale:0, autoAlpha:0, transformOrigin:"center" },"<");
		tl.from("#expandingCircle",{autoAlpha:0, scale:0, stagger:0.2, transformOrigin:"50% 50%"},">");
		// tl.to("#joseph .overlay", {background: "radial-gradient(circle 16vmax at  50% 50%, rgba(0,0,0,0) 0%,rgba(0,0,0,.5) 80%,rgba(0,0,0,0.75) 100%)"},"<");

		// Enter Programs
		tl.addLabel("enterPrograms",">");
		tl.to("#next2",{autoAlpha:0, scale:0},">");
		tl.to("#expandingCircle",{rx:297, ry:297, transformOrigin:"50% 50%"},"<");
		tl.to("#infographicWrapper svg", {duration:0.5, attr:{viewBox:"1030 451 570 323"}, ease:"power3.inOut"}, "<");
		tl.from("#G3_OurPrograms",{scale:0, autoAlpha:0, transformOrigin:"center center" },"<");
		tl.from("#trainingBlips",{autoAlpha:0},"<");

		// Enter Mandate
		tl.addLabel("enterMandate",">");
		tl.to("#G3_OurPrograms",{autoAlpha:0, scale:0, transformOrigin:"center center"},">");
		tl.to("#infographicWrapper svg", {duration:1, attr:{viewBox:"676 452 570 323"}, ease:"power3.inOut"}, ">");
		tl.to("#expandingCircle",{duration: 2, rx:75, ry:75, transformOrigin:"50% 50%", ease:"power1.inOut"},"<-0.5");
		tl.to("#blip1", {duration:2, rx:7, ry:7, motionPath: {path:"#blip1ToJospeh", align:"#blip1ToJospeh", alignOrigin: [0.5, 0.5], autoRotate: true}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		tl.to("#blip2", {duration:2, rx:7, ry:7, motionPath: {path:"#blip2ToJospeh", align:"#blip2ToJospeh", alignOrigin: [0.5, 0.5], autoRotate: true}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		tl.to("#blip3", {duration:2, rx:7, ry:7, motionPath: {path:"#blip3ToJospeh", align:"#blip3ToJospeh", alignOrigin: [0.5, 0.5], autoRotate: true}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		tl.to("#G2_josephImpact",{autoAlpha:0, scale:0, transformOrigin:"center center"},"<+1");
		tl.to("#TextMeetJoseph",{autoAlpha:0, scale:0, transformOrigin:"center center"},">");
		tl.from("#G4_Mandate",{scale:0, autoAlpha:0},">");
		tl.to("#blip1", {motionPath: {path:"#path-0", align:"#path-0", alignOrigin:[0.5, 0.5], autoRotate:true, start:0.2, end:1,}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		tl.to("#blip2", {motionPath: {path:"#path-0", align:"#path-0", alignOrigin:[0.5, 0.5], autoRotate:true, start:0.1, end:0.90,}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		tl.to("#blip3", {motionPath: {path:"#path-0", align:"#path-0", alignOrigin:[0.5, 0.5], autoRotate:true, start:0, end:0.80,}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");

		// for (let index = 0; index < 7; index++) {
		// 	const blip = trainingBlips[index];
		// 	const endPos = endPositions[index];
		// 	tl.to(blip, {autoAlpha:1, motionPath: {path:"#path1", align:"#path1", alignOrigin:[0.5, 0.5], autoRotate:true, start: (endPos - 0.2), end:endPos,}, transformOrigin: "50% 50%", ease: "power1.inOut"},"<");
		// }

		// Start Loop through leader Animations
		tl.addLabel("leaderAnimations",">");
		tl.to("#village, #villageOverlay",{autoAlpha:1 },10.5);

		for (let index = 0; index < leaders.length; index++) {
			var thisCount = index+1;
			let leader = document.getElementById(leaders[index].label);
			let leaderSphere = document.getElementById("leaderSphere-" + thisCount);
			let leaderImage = leader.getElementsByTagName("image");
			let leaderTitle = document.getElementById("leaderTitle-" + thisCount);
			let leaderPath = document.getElementById("path-" + thisCount);
			let leaderPathB = document.getElementById("path-" + thisCount +"B");
			let leaderPrevButton;
			if (index > 0) {
				leaderPrevButton = document.getElementById("leaderButton-" + index);
			} else {
				leaderPrevButton = "#next4";
			}
			// // Add label
			tl.addLabel(leaders[index].label,leaders[index].startTime);
			// // Hide the prev button
			tl.to(leaderPrevButton,{scale:0, autoAlpha:0}, leaders[index].startTime);
			// // Move to leader position
			tl.to("#infographicWrapper svg", {attr:{viewBox:leaders[index].position}, ease:"power3.inOut"}, leaders[index].startTime);
			// // Move village gradiant focus
			tl.to("#Gradient-0",{attr:{fy:leaders[index].gradientfy, fx:leaders[index].gradientfx}, transformOrigin:"50% 50%"}, leaders[index].startTime);
			// // Draw path line
			tl.fromTo(leaderPath, {drawSVG:0}, {duration:0.2, drawSVG:"100%", ease:"power1.inOut"}, leaders[index].startTime +0.1);
			// Draw the sphere
			tl.fromTo(leaderSphere, {drawSVG:0}, {drawSVG:"100%", ease:"power1.inOut"}, ">");
			// Move the blips
			tl.to("#blip1, #blip2, #blip3", {stagger:0.1, motionPath:{path:leaderPath, align:leaderPath, alignOrigin: [0.5, 0.5], autoRotate: true}, transformOrigin: "50% 50%", ease: "power1.inOut"}, "<");
			tl.to("#blip1, #blip2, #blip3", {stagger:0.1, motionPath:{path:leaderPathB, align:leaderPathB, alignOrigin: [0.5, 0.5], autoRotate: true}, transformOrigin: "50% 50%", ease: "power1.inOut"}, ">");
			// // Show the leader
			tl.fromTo([leaderImage, leaderTitle], {scale:0, autoAlpha:0}, {scale:1, autoAlpha:1}, "<+0.2");
		}

		// Transform
		tl.addLabel("transform",40.5);
		tl.to("#infographicWrapper svg", {duration:1, attr:{viewBox:"0 0 1920 1088"}, ease:"power3.inOut"},40.5);
		tl.to("#Gradient-0",{attr:{fy:544, fx:960}, transformOrigin:"50% 50%"},"<");
		tl.to("#Gradient-0",{attr:{cy:544, cx:960, cr:960, fx:960, fy:544}},">+1");
		tl.to("#joseph #infographicWrapper .overlay",{background:"radial-gradient(20vmax at 50% 50%, rgba(0, 0, 0, 0.29) 50%, rgba(0, 0, 0, 0.47) 95%, rgba(0, 0, 0, 0.48) 100%)"},"<");
		tl.to(gradientStops[0],{attr:{"stop-opacity":0}},"<");
		tl.to(gradientStops[1],{attr:{"stop-color":"green"}},"<");
		tl.to(gradientStops[2],{attr:{"offset":1}},"<");
		tl.to(gradientStops[2],{attr:{"offset":1}},"<");
		tl.to("#leaderButton-10, #G4_Mandate",{scale:0, autoAlpha:0},"<");
		tl.fromTo("#mandatePaths path",{drawSVG:"0"}, {drawSVG:"100%", ease:"power1.inOut", strokeWidth:2},"<+0.8");
		tl.to("#joseph svg ellipse, #joseph svg path",{strokeWidth:2},"<");

		for (let index = 0; index < leaders.length; index++) {
			var thisCount = index+1;
			var leader = document.getElementById(leaders[index].label);
			var leaderTitles = document.getElementById("leaderTitle-" + thisCount);
			var leaderBlips = document.getElementById("leaderBlips-" + thisCount);
			var leaderBlips = leaderBlips.querySelectorAll("ellipse");
			var leaderSpheresGroup = document.getElementById("leaderSpheres-" + thisCount);
			var leaderSpheres = leaderSpheresGroup.querySelectorAll("ellipse");

			tl.to(leaderBlips,{stagger:0.3, autoAlpha:1},42);
			tl.to(leaderTitles,{stagger:0.3, autoAlpha:0},"<");
			tl.from(leaderSpheres,{rx:0, ry:0, autoAlpha:0, transformOrigin:"50% 50%"},"<");
		}
		tl.fromTo(satelitePaths,{drawSVG:"0"}, { drawSVG:"100%", ease:"power1.inOut"},43);
		tl.to(sateliteSpheres,{ autoAlpha:1, ease:"power1.inOut"},"<");

		tl.addLabel("end");

		// Nested Timelines
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