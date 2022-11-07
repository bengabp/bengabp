let githubChart = document.getElementById("my-github-chart");

anime.timeline({loop: false})
  .add({
    targets: '.animate-show',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  });

let menuButtonsContainer = document.getElementById("menu-buttons");
let avatarContainer = document.getElementById("avatar-container");
let section_container = document.querySelector("section");
let horizontalPageScrollProgress = document.getElementById("hpsp")
// Event Listener to check if page is idle to shrink buttons and avatar
section_container.addEventListener("scroll",(event)=>{
    console.log("Scrolling..")
    let container_height = section_container.offsetHeight;
    let maxScrollTop = section_container.scrollHeight - container_height
    let offset = section_container.scrollTop/maxScrollTop
    let scrollPercentage = 100*offset;
    horizontalPageScrollProgress.style.width = scrollPercentage+"%";

    if (section_container.scrollTop > 50){
        menuButtonsContainer.style.transform = "translateY(0px)"
    } else {
        menuButtonsContainer.style.transform = "translateY(100px)"
    }
})


var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7,8,8,9,9,9,10,11,14,14,15];

let githubActivityChart = new Chart("my-github-chart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
        label:"Commits Per Month",
        borderDash:[5,5],
        backgroundColor: "#004c99",
        borderColor: "#001933",
        pointStyle:'circle',
        pointRadius:4,
        pointHoverRadius:8,
        data: yValues,
    }]
  },
  options:{
    responsive:true,
    plugins:{
        title:{
            display:true,
            text:"Github Activity",
            font:{
                size:20,
                family:'Signika'
            }
        },
        subtitle:{
            display:true,
            text:"My Github activity - Commits Per month",
            font:{
                size:16,
                family:"Signika"
            }
        }
    },
    interaction:{
        mode:"index",
        intersect:false,
    },
    scales:{
        x:{
            type:'linear',
            easing:'linear'
        },
    }
  }
});

console.log(githubActivityChart);
console.dir(githubActivityChart);