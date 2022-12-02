let githubChart = document.getElementById("my-github-chart");
let githubChart2 = document.getElementById("my-github-chart2");

let GITHUB_INFO_API = "http://127.0.0.1:8090/github-info";

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(GITHUB_INFO_API, requestOptions)
    .then(response => response)
    .then(async (result) => {
        let response = await result.json();
        let commits_history = response.commits_history;
        let language_information = response.languages_information;
        let languages_arrary = Object.entries(language_information.languages);
        let total_count = language_information.total_counts

        let skills_rank_pie_chart_labels = [];

        let skills_rank_pie_chart_datas = languages_arrary.map((element)=>{
            let fraction = (element[1]/total_count)*100
            skills_rank_pie_chart_labels.push(element[0]);          
            return fraction
        }) 

        console.log(commits_history);

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
                borderColor: "rgba(2, 255, 255, 0.12)",
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

        const footer = (tooltipItems) => {
            let text = "0"+"%";
            tooltipItems.forEach(function(tooltipItem) {
                text = tooltipItem.parsed.toFixed(3) + "%";
            });
            return text
        };

        
        let githubActivityChart2 = new Chart("my-github-chart2", {
            type: "doughnut",
            data: {
                labels: skills_rank_pie_chart_labels,
                datasets: [{
                    label:"Skills",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    width:100,
                    height:200,
                  data: skills_rank_pie_chart_datas,
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
                legend:{
                    // display:false
                },
                tooltip:{
                    callbacks:{
                      footer:footer
                    },
                },

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
              scales:{
                  x:{
                    ticks:{
                        callback: (value, index, ticks) => "",
                    },
                      grid:{
                        display:false
                        },
                    border:{
                        display:false,
                    }
                  },
                  y:{
                    ticks:{
                        callback:(value,index,ticks) => ""
                    },
                    grid:{
                        display:false
                        },
                    border:{
                        display:false,
                    }
                  }
              },
              elements:{
                bar:{
                    backgroundHeight:100,
                    minHeight:100,
                    Width:200
                }
              }
            }
          });
    })
    .catch(error => console.log('error', error));

