
let hamburgerMenuIcon = document.getElementById("hamburger-menu");
let menuBar = document.getElementById("menu-bar");
let menuCloseBtn = document.getElementById("menu-close-btn");


let navDrawerOpen = false;

anime.timeline({loop: false})
  .add({
    targets: '.animate-show',
    opacity: [0,1],
    easing: "linear",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  });

let menuButtonsContainer = document.getElementById("menu-buttons");
let sectionContainer = document.querySelector("section");
// let horizontalPageScrollProgress = document.getElementById("hpsp")
// Event Listener to check if page is idle to shrink buttons and avatar
sectionContainer.addEventListener("scroll",(event)=>{
    let containerHeight = sectionContainer.offsetHeight;
    let maxScrollTop = sectionContainer.scrollHeight - containerHeight
    let offset = sectionContainer.scrollTop/maxScrollTop
    let scrollPercentage = 100*offset;
    horizontalPageScrollProgress.style.width = scrollPercentage+"%";

    if (sectionContainer.scrollTop > 50){
        menuButtonsContainer.style.transform = "translateY(0px)"
    } else {
        menuButtonsContainer.style.transform = "translateY(100px)"
    }
})


hamburgerMenuIcon.addEventListener("click",(event)=>{
    menuBar.style.transform = "translateX(0px)";
    navDrawerOpen = true;
});

menuCloseBtn.addEventListener("click",(event)=>{
    menuBar.style.transform = "translateX(130%)";
    navDrawerOpen = false;
});

menuBar.addEventListener("scroll",(event)=>{
    menubar.scrollTop = 0;
});


// Implement Scroll To functionalities using Element.scrollIntoView()
function scrollToElement (elementId){
    console.log(navDrawerOpen)
    if (navDrawerOpen){
        menuCloseBtn.click();
    }
    document.getElementById(elementId).scrollIntoView({behavior:"smooth"})
}


function validateEmail(email){
    let emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    let result = email.match(emailRegex);
    return true ? result !== null && result.length > 0 : false;
}



// function showToast(message){
//     Toastify({
//         text: message,
//         duration:1000,
//         destination: null,
//         newWindow: true,
//         close: true,
//         oldestFirst:false,
//         gravity: "top", // `top` or `bottom`
//         position: "center", // `left`, `center` or `right`
//         stopOnFocus: false,// Prevents dismissing of toast on hover
//         style: {
//           background: "linear-gradient(36deg, rgba(76,33,87,1) 29%, rgba(49,29,124,1) 78%)",
//           borderRadius:"10px",
//           maxWidth:"250px",
//           border:"1px solid var(--border-color)"
//         },
//         onClick: function(){} // Callback after click
//     }).showToast();
// }
