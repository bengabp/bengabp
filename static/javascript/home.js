let githubChart = document.getElementById("my-github-chart");
let githubChart2 = document.getElementById("my-github-chart2");

var xValues = [50,60,70,80,90,100,110,120,130,140,150,165,180];
var yValues = [7,8,8,9,9,9,10,11,14,14,15,16,17];

let githubActivityChart = new Chart("my-github-chart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
        label:"Commits Per Month",
        borderDash:[5,5],
        backgroundColor: "#36e04d",
        borderColor: "rgba(255, 255, 255, 0.12)",
        pointStyle:'circle',
        pointRadius:4,
        pointHoverRadius:8,
        data: yValues,
        tensor:0.1
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
                family:'Signika',
                backgroundColor:"red"
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

let githubActivityChart2 = new Chart("my-github-chart2", {
    type: "doughnut",
    data: {
        labels: ['Python',"Javascript","Html & Css","Dart","Jupyter Notebook"],
        datasets: [{
            label:"Skills",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            pointStyle:'circle',
            pointRadius:4,
            pointHoverRadius:8,
            borderRadius:2,
          data: [
            40,
            20,
            30,
            5,
            5
          ],
          backgroundColor:[
            '#3572A5',
            '#f1e05a',
            '#e34c26',
            '#00B4AB',
            '#DA5B0B'
          ]
      }]
    },
    options:{
      responsive:true,
      plugins:{
          title:{
              display:true,
              text:"Skills Ranking",
              font:{
                  size:20,
                  family:'Signika'
              }
          },
          subtitle:{
              display:true,
              text:"My skills rank",
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
