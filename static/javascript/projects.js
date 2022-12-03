let searchBar = document.getElementById("searchbar");
let projectsContainer = document.getElementById("projects-container");
let searchClearedOnce = true;
let initialType = true;
let currentProjects = null;

searchBar.addEventListener("input",(event)=>{
    let current_text = searchBar.value.trim().toLowerCase();
    if (current_text.length > 0){
        if (current_text.length === 1 && searchClearedOnce === true){
            searchClearedOnce = false;
            currentProjects = document.querySelectorAll(".project-card");
        }
        if (currentProjects){
            let projectsSearchResults = new Array();
            currentProjects.forEach(currentProject => {
                let projectName = currentProject.querySelector(".heading span");
                let details = currentProject.querySelector(".project-card-details p");
                let tagsContainer = currentProject.querySelectorAll(".tags-container span");
                if (projectName.innerText.trim().toLowerCase().includes(current_text)){
                    if (!projectsSearchResults.includes(currentProject)){
                        projectsSearchResults.push(currentProject)
                    }
                }
                if (details.innerText.trim().toLowerCase().includes(current_text)){
                    if (!projectsSearchResults.includes(currentProject)){
                        projectsSearchResults.push(currentProject)
                    }
                }
                tagsContainer.forEach(element => {
                    if (element.innerText.trim().toLowerCase().includes(current_text)){
                        if (!projectsSearchResults.includes(currentProject)){
                            projectsSearchResults.push(currentProject)
                        }
                    }
                })
            });
            
            projectsContainer.replaceChildren()
            projectsSearchResults.forEach(projectSearchResult => {
                projectsContainer.append(projectSearchResult);
            });
        }
        
    } else {
        searchClearedOnce = true;
        if (currentProjects){
            projectsContainer.replaceChildren()
            currentProjects.forEach(currentProject => {
                projectsContainer.append(currentProject);
            });
        }
    }
});