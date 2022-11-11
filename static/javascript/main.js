
let hamburgerMenuIcon = document.getElementById("hamburger-menu");
let menuBar = document.getElementById("menu-bar");
let menuCloseBtn = document.getElementById("menu-close-btn");

let emailInput = document.querySelector("#form input[type='email']");
let subjectInput = document.querySelector("#form input[type='text']")
let messageInput = document.querySelector("#form textarea")
let sendMessageBtn = document.querySelector("#form button")


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

emailInput.addEventListener("input",(event)=>{
    if(emailInput.value.trim().length > 0){
        if(validateEmail(emailInput.value.trim())){
            emailInput.style.borderColor = "green";
        } else {
            emailInput.style.borderColor = "red";
        }
    } else {
        emailInput.style.borderColor = "var(--border-color)";

    }
})


sendMessageBtn.addEventListener("click",(event)=>{
    sendMessageBtn.disabled = true;
    sendMessageBtn.style.backgroundColor = "rgb(91 155 221 / 50%)"
    sendMessageBtn.style.color =  "rgb(255 255 255 / 50%)"
    sendMessageBtn.style.boxShadow = "none"

    sendMessageBtn.querySelector('i').style.visibility = "visible";

    if (validateEmail(emailInput.value.trim())){
        if (subjectInput.value.trim().length >= 5){
            if (messageInput.value.trim().length >= 20){
                
                let data = new FormData();
                data.append('email', emailInput.value.trim());
                data.append('subject', subjectInput.value.trim());
                data.append("message",messageInput.value.trim());
                // add form input from hidden input elsewhere on the page
                data.append('csrfmiddlewaretoken', document.querySelector('input[name="csrfmiddlewaretoken"]').value);
                
                fetch("/message", {
                    method: 'POST',
                    body: data,
                    credentials: 'same-origin',
                })
                .then(result => result)
                .then(async response => {
                    response =  await response.json();
                    console.log(response);
                    
                })
                .catch(error => {})
                .finally(() => {
                    sendMessageBtn.disabled = false;
                    sendMessageBtn.style.backgroundColor = "var(--button-light-bg-color)"
                    sendMessageBtn.style.color =  "var(--color-light-theme)"
                    sendMessageBtn.style.boxShadow = "initial"
                    sendMessageBtn.querySelector('i').style.visibility = "hidden";
                    subjectInput.value = ""
                    messageInput.value =  ""

                })
            } else {
                alert("Message must be 20 characters or more")
                sendMessageBtn.disabled = false;
                sendMessageBtn.style.backgroundColor = "var(--button-light-bg-color)"
                sendMessageBtn.style.color =  "var(--color-light-theme)"
                sendMessageBtn.style.boxShadow = "initial"
                sendMessageBtn.querySelector('i').style.visibility = "hidden";
            }
        } else {
            alert("Subject must be 5 characters or more");
            sendMessageBtn.disabled = false;
            sendMessageBtn.style.backgroundColor = "var(--button-light-bg-color)"
            sendMessageBtn.style.color =  "var(--color-light-theme)"
            sendMessageBtn.style.boxShadow = "initial"
            sendMessageBtn.querySelector('i').style.visibility = "hidden";
        }
    } else {
        alert("Please enter  valid email");
        sendMessageBtn.disabled = false;
        sendMessageBtn.style.backgroundColor = "var(--button-light-bg-color)"
        sendMessageBtn.style.color =  "var(--color-light-theme)"
        sendMessageBtn.style.boxShadow = "initial"
        sendMessageBtn.querySelector('i').style.visibility = "hidden";
    }
});

