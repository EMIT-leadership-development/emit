
  var buttons = document.querySelectorAll(".modalBtn");
  var modals = document.querySelectorAll(".modal");

  if(typeof(buttons) != 'undefined' && buttons != null){
    // This line was causing error: gsap register plugin
    // gsap.set([modals], { autoAlpha: 0, scale: 0 });
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", popUp);
    }
    function popUp() {
      var parent = this.parentElement;
      var thisModal = parent.querySelector(".modal");
      var thisModalContent = thisModal.querySelector(".modalContent");
      // console.log(modalContent);
      gsap.to(thisModal, {duration: 0.2, scale:1, autoAlpha:1,
      });
    }
    for (var i = 0; i < modals.length; i++) {
      modals[i].addEventListener("click", hide);
    }
    function hide() {
      var parent = this.parentElement;
      var thisModal = parent.querySelector(".modal");
      gsap.to(thisModal, {duration: 0.2, scale:0, autoAlpha:0,
      });
    }
  }
