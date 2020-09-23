
window.onload = function() {

    function name(params) {
    }
    numbers = gsap.utils.toArray(".number");
    var tl = gsap.timeline({
        id: "counters",
        defaults:{duration:1},
        scrollTrigger: {
            trigger: ".counters",
            start: "top bottom",
            end: "center center",
            toggleActions: "play none none play",
        }
    });
    numbers.forEach(countAnimation);
    function countAnimation(number) {
        var Cont={val:0} , NewVal = number.innerHTML;
        tl.to(Cont,2,{val:NewVal,roundProps:"val",onUpdate:function(){number.innerHTML=Cont.val}}),"<-2";
    }
    return tl;
}
