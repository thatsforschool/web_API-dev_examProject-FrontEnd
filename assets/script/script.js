//attempting to follow Zuza's approach here.. Not sure if i have succeeded but i hope so
const body = document.querySelector("body");
const main = document.createElement("main");
const logInSect = document.createElement("form");
const signUnSect = document.createElement("form");
const borderLogIn = document.createElement("div");
const signUpBtn = document.createElement("a");
let baseUrl;

window.addEventListener("load", () => {
    const currentUrl = window.location.href;
    console.log(currentUrl);

    if (currentUrl.indexOf("?")) {
        const currentUrlSplit = currentUrl.split("?");
        baseUrl = currentUrlSplit[0];
    } else {
        baseUrl = window.location.href;
    }

    if (currentUrl.indexOf("page") == -1) {
        console.log("there is no page");
        loadLogInPage();
    } else {
        const currentUrlSplit = currentUrl.split("?");
        console.log(currentUrlSplit);
        console.log("there is a page");
        if (currentUrlSplit[1].indexOf("&") == -1) {
            const nameSplit = currentUrlSplit[1].split("=");
            const pageName = (pageId = nameSplit[1]);
            console.log(pageName);

            switch (pageName) {
                case "signUp":
                    loadSignUpPage();
                    break;

                case "profile":
                    console.log("you are on profile page");
                    loadProfilePage();
                    break;

                case "GroupPage":
                    console.log("you are on a group page");
                    loadGroupPage();
                    break;

                default:
                    break;
            }
        }
    }
});

//    GroupPage setup - based on loadProfilePage()
loadGroupPage = () => {
    body.innerHTML = "";
    body.classList.add("profileBody");//intentional to add profileBody class here.

    //   header on the Group page
    const header = document.createElement("header");
    header.id = "header";
    body.appendChild(header);

    const nav = document.createElement("nav");
    header.appendChild(nav);

    const AbTheApp = document.createElement("a");
    AbTheApp.innerText = "about the app";
    AbTheApp.classList.add("navLink");
    nav.appendChild(AbTheApp);

    const userGuide = document.createElement("a");
    userGuide.innerText = "user guide";
    userGuide.classList.add("navLink");
    nav.appendChild(userGuide);

    const help = document.createElement("a");
    help.innerText = "help";
    help.classList.add("navLink");
    nav.appendChild(help);

    const userAccountIcon = document.createElement("img");
    userAccountIcon.id = "userAccountIcon";
    userAccountIcon.src = "./assets/svg/logIn.svg";
    nav.appendChild(userAccountIcon);

    //    Grouppage main
    body.appendChild(main);

    //    GroupDescription section
    const myGroup = document.createElement("section");
    myGroup.id = "myGroup";
    main.appendChild(myGroup);

    const myGroupHeadline = document.createElement("h3");
    myGroupHeadline.id = "myGroupHeadline";
    myGroupHeadline.innerText = "My Group";
    myGroup.appendChild(myGroupHeadline);

    const myGroupDiv = document.createElement("div");
    myGroupDiv.id = "myGroupDiv";
    myGroup.appendChild(myGroupDiv);

    const myGroupDivDescription = document.createElement("input");
    myGroupDivDescription.id = "myGroupDivDescription";
    myGroupDivDescription.type = "text";
    myGroupDivDescription.placeholder = "Describe your group";
    myGroupDiv.appendChild(myGroupDivDescription);

    const myGroupDivAdmin = document.createElement("input");
    myGroupDivAdmin.id = "myGroupDivAdmin";
    myGroupDivAdmin.type = "text";
    myGroupDivAdmin.placeholder = "Group Admin:";
    myGroupDiv.appendChild(myGroupDivAdmin);

    const myGroupDivMembers = document.createElement("ul");
    myGroupDivMembers.id = "myGroupDivMembers";
    myGroupDiv.appendChild(myGroupDivMembers);

    const myGroupDivMember = document.createElement("li");
    myGroupDivMember.id = "myGroupDivMember";
    myGroupDivMember.innerText = "Group Member";
    myGroupDivMembers.appendChild(myGroupDivMember);

    //    GroupTasks section (on the right side of the screen)
    const groupTasks = document.createElement("section");
    groupTasks.id = "groupTasks";
    main.appendChild(groupTasks);

    //    Group tasks - Create a task button
    const groupTasksCreateTaskBtn = document.createElement("button");
    groupTasksCreateTaskBtn.id = "groupTasksCreateTaskBtn";
    groupTasksCreateTaskBtn.innerText = "Create A Task";
    groupTasksCreateTaskBtn.classList.add("btn");
    groupTasks.appendChild(groupTasksCreateTaskBtn);

    //    Group tasks - upcoming tasks 
    const groupTasksUpcoming = document.createElement("div");
    groupTasksUpcoming.id = "groupTasksUpcoming";
    groupTasks.appendChild(groupTasksUpcoming);

    const groupTasksUpcomingHeadline = document.createElement("h4");
    groupTasksUpcomingHeadline.id = "groupTasksUpcomingHeadline";
    groupTasksUpcomingHeadline.innerText = "Upcoming Group Tasks";
    groupTasksUpcoming.appendChild(groupTasksUpcomingHeadline);

    const borderGroupTasksUpcTop = document.createElement("div");
    borderGroupTasksUpcTop.id = "borderGroupTasksUpcTop";
    borderGroupTasksUpcTop.classList.add("borderHorizontal");
    groupTasksUpcoming.appendChild(borderGroupTasksUpcTop);

    //   Table to store upcoming tasks
    const groupTasksUpcShow = document.createElement("table");
    groupTasksUpcShow.id = "groupTasksUpcShow";
    groupTasksUpcoming.appendChild(groupTasksUpcShow);

    const groupTasksUpcShowTr = document.createElement("tr");
    groupTasksUpcShowTr.id = "groupTasksUpcShowTr";
    groupTasksUpcShow.appendChild(groupTasksUpcShowTr);

    const groupTasksUpcShowTaskName = document.createElement("td");
    groupTasksUpcShowTaskName.id = "groupTasksUpcShowTaskName";
    groupTasksUpcShowTaskName.innerText = "Task Name";
    groupTasksUpcShowTr.appendChild(groupTasksUpcShowTaskName);

    const groupTasksUpcShowTaskColor = document.createElement("td");
    groupTasksUpcShowTaskColor.id = "groupTasksUpcShowTaskColor";
    groupTasksUpcShowTaskColor.innerText = "Task Type";
    groupTasksUpcShowTr.appendChild(groupTasksUpcShowTaskColor);

    const borderGroupTasksUpcBottom = document.createElement("div");
    borderGroupTasksUpcBottom.id = "borderGroupTasksUpcBottom";
    borderGroupTasksUpcBottom.classList.add("borderHorizontal");
    groupTasksUpcoming.appendChild(borderGroupTasksUpcBottom);

    //    Section to store all the group's tasks
    const allGroupTasks = document.createElement("section");
    allGroupTasks.id = "allGroupTasks";
    main.appendChild(allGroupTasks);

    const allGroupTasksHeadline = document.createElement("h3");
    allGroupTasksHeadline.id = "allGroupTasksHeadline";
    allGroupTasks.appendChild(allGroupTasksHeadline);

    const allGroupTasksTable = document.createElement("table");
    allGroupTasksTable.id = "allGroupTasksTable";
    allGroupTasks.appendChild(allGroupTasksTable);

    const allGroupTasksTableTr = document.createElement("tr");
    allGroupTasksTableTr.id = "allGroupTasksTableTr";
    allGroupTasksTable.appendChild(allGroupTasksTableTr);
    
    const allGroupTasksTableTaskName = document.createElement("th");
    allGroupTasksTableTaskName.id = "allGroupTasksTableTaskName";
    allGroupTasksTableTaskName.innerText = "Task Name";
    allGroupTasksTableTr.appendChild(allGroupTasksTableTaskName);
    
    const allGroupTasksTableTaskAssignedTo = document.createElement("th");
    allGroupTasksTableTaskAssignedTo.id = "allGroupTasksTableTaskAssignedTo";
    allGroupTasksTableTaskAssignedTo.innerText = "Assigned To";
    allGroupTasksTableTr.appendChild(allGroupTasksTableTaskAssignedTo);
    
    const allGroupTasksTableTaskDueDate = document.createElement("th");
    allGroupTasksTableTaskDueDate.id = "allGroupTasksTableTaskDueDate";
    allGroupTasksTableTaskDueDate.innerText = "Due Date";
    allGroupTasksTableTr.appendChild(allGroupTasksTableTaskDueDate);
    
    const allGroupTasksTableTaskStatus = document.createElement("th");
    allGroupTasksTableTaskStatus.id = "allGroupTasksTableTaskStatus";
    allGroupTasksTableTaskStatus.innerText = "Status";
    allGroupTasksTableTr.appendChild(allGroupTasksTableTaskStatus);
    
    const allGroupTasksTableTaskLabel = document.createElement("th");
    allGroupTasksTableTaskLabel.id = "allGroupTasksTableTaskLabel";
    allGroupTasksTableTaskLabel.innerText = "Task Label";
    allGroupTasksTableTr.appendChild(allGroupTasksTableTaskLabel);


    //  aside on the group page
    const aside = document.createElement("aside");
    aside.id = "aside";
    body.appendChild(aside);

    const headlineAside = document.createElement("h2");
    headlineAside.id = "operatingBtnsSect";
    headlineAside.innerText = "My Tasks";
    aside.appendChild(headlineAside);

    const upcomTaskSect = document.createElement("section");
    upcomTaskSect.id = "upcomTaskSect";
    aside.appendChild(upcomTaskSect);

    const upComHeadline = document.createElement("h4");
    upComHeadline.id = "upComHeadline";
    upComHeadline.innerText = "Upcoming";
    upcomTaskSect.appendChild(upComHeadline);

    const borderUpComTop = document.createElement("div");
    borderUpComTop.id = "borderUpComTop";
    borderUpComTop.classList.add("borderHorizontal");
    upcomTaskSect.appendChild(borderUpComTop);

    const upComTasks = document.createElement("section");
    upComTasks.id = "upComTasks";
    upcomTaskSect.appendChild(upComTasks);

    const borderUpComBottom = document.createElement("div");
    borderUpComBottom.id = "borderUpComBottom";
    borderUpComBottom.classList.add("borderHorizontal");
    upcomTaskSect.appendChild(borderUpComBottom);

    const operatingBtnsSect = document.createElement("section");
    operatingBtnsSect.id = "operatingBtnsSect";
    operatingBtnsSect.classList.add("flex_column");
    aside.appendChild(operatingBtnsSect);

    const homeworkBtn = document.createElement("a");
    homeworkBtn.id = "homeworkBtn";
    homeworkBtn.innerText = "My Homework";
    homeworkBtn.classList.add("operBtns");
    operatingBtnsSect.appendChild(homeworkBtn);

    const projectsBtn = document.createElement("a");
    projectsBtn.id = "projectsBtn";
    projectsBtn.innerText = "My Projects";
    projectsBtn.classList.add("operBtns");
    operatingBtnsSect.appendChild(projectsBtn);

    const assigmentsBtn = document.createElement("a");
    assigmentsBtn.id = "assigmentsBtn";
    assigmentsBtn.innerText = "My Assigments";
    assigmentsBtn.classList.add("operBtns");
    operatingBtnsSect.appendChild(assigmentsBtn);

    const showAllDone = document.createElement("a");
    showAllDone.id = "showAllDone";
    showAllDone.innerText = "Show All Finished Tasks";
    showAllDone.classList.add("operBtns");
    operatingBtnsSect.appendChild(showAllDone);
};

getUrl();
