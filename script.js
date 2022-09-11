loadHomeworkPage = () => {
    body.innerHTML = "";
    body.classList.add("HomeworkBody");

    //   header on the Homework page
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

    //    Homeworkpage main
    body.appendChild(main);

    //    HomeworkDescription section
    const myHomework = document.createElement("section");
    myHomework.id = "myHomework";
    main.appendChild(myHomework);

    const myHomeworkHeadline = document.createElement("h3");
    myHomeworkHeadline.id = "myHomeworkHeadline";
    myHomeworkHeadline.innerText = "My Homework";
    myHomework.appendChild(myHomeworkHeadline);

    const myHomeworkDiv = document.createElement("div");
    myHomeworkDiv.id = "myHomeworkDiv";
    myHomework.appendChild(myHomeworkDiv);

    const myHomeworkDivDescription = document.createElement("input");
    myHomeworkDivDescription.id = "myHomeworkDivDescription";
    myHomeworkDivDescription.type = "text";
    myHomeworkDivDescription.placeholder = "Describe your Homework";
    myHomeworkDiv.appendChild(myHomeworkDivDescription);

    const myHomeworkDivAdmin = document.createElement("input");
    myHomeworkDivAdmin.id = "myHomeworkDivAdmin";
    myHomeworkDivAdmin.type = "text";
    myHomeworkDivAdmin.placeholder = "Homework Admin:";
    myHomeworkDiv.appendChild(myHomeworkDivAdmin);

    const myHomeworkDivMembers = document.createElement("ul");
    myHomeworkDivMembers.id = "myHomeworkDivMembers";
    myHomeworkDiv.appendChild(myHomeworkDivMembers);

    const myHomeworkDivMember = document.createElement("li");
    myHomeworkDivMember.id = "myHomeworkDivMember";
    myHomeworkDivMember.innerText = "Homework Member";
    myHomeworkDivMembers.appendChild(myHomeworkDivMember);

    //    HomeworkTask section (on the right side of the screen)
    const homeworkTasks = document.createElement("section");
    homeworkTasks.id = "homeworkTasks";
    main.appendChild(homeworkTasks);

    //    Homework tasks - Create a task button
    const homeworkTasksCreateTaskBtn = document.createElement("button");
    homeworkTasksCreateTaskBtn.id = "homeworkTasksCreateTaskBtn";
    homeworkTasksCreateTaskBtn.innerText = "Create A Task";
    homeworkTasksCreateTaskBtn.classList.add("btn");
    homeworkTasks.appendChild(homeworkTasksCreateTaskBtn);

    //    Homework tasks - upcoming tasks 
    const homeworkTasksUpcoming = document.createElement("div");
    homeworkTasksUpcoming.id = "homeworkTasksUpcoming";
    homeworkTasks.appendChild(homeworkTasksUpcoming);

    const homeworkTasksUpcomingHeadline = document.createElement("h4");
    homeworkTasksUpcomingHeadline.id = "homeworkTasksUpcomingHeadline";
    homeworkTasksUpcomingHeadline.innerText = "Upcoming Homework Tasks";
    homeworkTasksUpcoming.appendChild(homeworkTasksUpcomingHeadline);

    const borderHomeworkTasksUpcTop = document.createElement("div");
    borderHomeworkTasksUpcTop.id = "borderHomeworkTasksUpcTop";
    borderHomeworkTasksUpcTop.classList.add("borderHorizontal");
    homeworkTasksUpcoming.appendChild(borderHomeworkTasksUpcTop);


    //   Table to store upcoming tasks
    const homeworkTasksUpcShow = document.createElement("table");
    homeworkTasksUpcShow.id = "homeworkTasksUpcShow";
    homeworkTasksUpcoming.appendChild(homeworkTasksUpcShow);

    const homeworkTasksUpcShowTr = document.createElement("tr");
    homeworkTasksUpcShowTr.id = "homeworkTasksUpcShowTr";
    homeworkTasksUpcShow.appendChild(homeworkTasksUpcShowTr);

    const homeworkTasksUpcShowTaskName = document.createElement("td");
    homeworkTasksUpcShowTaskName.id = "homeworkTasksUpcShowTaskName";
    homeworkTasksUpcShowTaskName.innerText = "Task Name";
    homeworkTasksUpcShowTr.appendChild(homeworkTasksUpcShowTaskName);

    const homeworkTasksUpcShowTaskColor = document.createElement("td");
    homeworkTasksUpcShowTaskColor.id = "homeworkTasksUpcShowTaskColor";
    homeworkTasksUpcShowTaskColor.innerText = "Task Type";
    homeworkTasksUpcShowTr.appendChild(homeworkTasksUpcShowTaskColor);

    const borderHomeworkTasksUpcBottom = document.createElement("div");
    borderHomeworkTasksUpcBottom.id = "borderHomeworkTasksUpcBottom";
    borderHomeworkTasksUpcBottom.classList.add("borderHorizontal");
    homeworkTasksUpcoming.appendChild(borderHomeworkTasksUpcBottom);


    //    Section to store all the homework's tasks
    const allHomeworkTasks = document.createElement("section");
    allHomeworkTasks.id = "allHomeworkTasks";
    main.appendChild(allHomeworkTasks);

    const allHomeworkTasksHeadline = document.createElement("h3");
    allHomeworkTasksHeadline.id = "allHomeworkTasksHeadline";
    allHomeworkTasks.appendChild(allHomeworkTasksHeadline);

    const allHomHomeworkTasksTable = document.createElement("table");
    allHomeworkTasksTable.id = "allHomeworkTasksTable";
    allHomeworkTasks.appendChild(allHomeworkTasksTable);

    const allHomeworkTasksTableTr = document.createElement("tr");
    allHomeworkTasksTableTr.id = "allHomeworkTasksTableTr";
    allHomeworkTasksTable.appendChild(allHomeworkTasksTableTr);

    const allHomeworkTasksTableTaskName = document.createElement("th");
    allHomeworkTasksTableTaskName.id = "allHomeworkTasksTableTaskName";
    allHomeworkTasksTableTaskName.innerText = "Task Name";
    allHomeworkTasksTableTr.appendChild(allHomeworkTasksTableTaskName);

    const allHomeworkTasksTableTaskAssignedTo = document.createElement("th");
    allHomeworkTasksTableTaskAssignedTo.id = "allHomeworkTasksTableTaskAssignedTo";
    allHomeworkTasksTableTaskAssignedTo.innerText = "Assigned To";
    allHomeworkTasksTableTr.appendChild(allHomeworkTasksTableTaskAssignedTo);

    const allHomeworkTasksTableTaskDueDate = document.createElement("th");
    allHomeworkTasksTableTaskDueDate.id = "allHomeworkTasksTableTaskDueDate";
    allHomeworkTasksTableTaskDueDate.innerText = "Due Date";
    allHomeworkTasksTableTr.appendChild(allHomeworkTasksTableTaskDueDate);

    const allHomeworkTasksTableTaskStatus = document.createElement("th");
    allHomeworkTasksTableTaskStatus.id = "allHomeworkTasksTableTaskStatus";
    allHomeworkTasksTableTaskStatus.innerText = "Status";
    allHomeworkTasksTableTr.appendChild(allHomeworkTasksTableTaskStatus);

    const allHomeworkTasksTableTaskLabel = document.createElement("th");
    allHomeworkTasksTableTaskLabel.id = "allHomeworkTasksTableTaskLabel";
    allHomeworkTasksTableTaskLabel.innerText = "Task Label";
    allHomeworkTasksTableTr.appendChild(allHomeworkTasksTableTaskLabel);












    //  aside on the Homework page
    const aside = document.createElement("aside");
    aside.id = "aside";
    body.appendChild(aside);

    const headlineAside = document.createElement("h2");
    headlineAside.id = "operatingBtnsSect";
    headlineAside.innerText = "My Homeworks";
    aside.appendChild(headlineAside);

    const upcomHomeworkSect = document.createElement("section");
    upcomHomeworkSect.id = "upcomHomeworkSect";
    aside.appendChild(upcomHomeworkSect);

    const upComHeadline = document.createElement("h4");
    upComHeadline.id = "upComHeadline";
    upComHeadline.innerText = "Upcoming";
    upcomHomeworkSect.appendChild(upComHeadline);

    const borderUpComTop = document.createElement("div");
    borderUpComTop.id = "borderUpComTop";
    borderUpComTop.classList.add("borderHorizontal");
    upcomHomeworkSect.appendChild(borderUpComTop);

    const upComHomeworks = document.createElement("section");
    upComHomeworks.id = "upComHomeworks";
    upcomHomeworkSect.appendChild(upComHomeworks);

    const borderUpComBottom = document.createElement("div");
    borderUpComBottom.id = "borderUpComBottom";
    borderUpComBottom.classList.add("borderHorizontal");
    upcomHomeworkSect.appendChild(borderUpComBottom);

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
    showAllDone.innerText = "Show All Finished Homeworks";
    showAllDone.classList.add("operBtns");
    operatingBtnsSect.appendChild(showAllDone);


};