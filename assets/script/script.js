//attempting to follow Zuza's approach here.. Not sure if i have succeeded but i hope so
const body = document.querySelector("body");
const main = document.createElement("main");
const logInSect = document.createElement("form");
const signUnSect = document.createElement("form");
const borderLogIn = document.createElement("div");
const signUpBtn = document.createElement("a");
const ls = window.localStorage;
let baseUrl;
const fetchUrl = `http://127.0.0.1:8746`;

window.addEventListener("DOMContentLoaded", (e) => {
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

        default:
          break;
      }
    }
  }
});

loadLogInPage = () => {
  // create main
  body.appendChild(main);
  main.appendChild(logInSect);
  main.appendChild(borderLogIn);
  main.appendChild(signUnSect);
  main.classList.add("flex");
  main.id = "main";

  //   create log in section

  logInSect.classList.add("logIn");
  logInSect.classList.add("flex_column");
  logInSect.id = "logInSect";

  const signInIcon = document.createElement("img");
  signInIcon.id = "signInIcon";
  signInIcon.src = "./assets/svg/logIn.svg";
  logInSect.appendChild(signInIcon);

  const userNameInp = document.createElement("input");
  userNameInp.type = "text";
  userNameInp.placeholder = "username";
  userNameInp.id = "userNameInp";
  logInSect.appendChild(userNameInp);

  const passwordInp = document.createElement("input");
  passwordInp.type = "password";
  passwordInp.placeholder = "password";
  passwordInp.id = "passwordInp";
  logInSect.appendChild(passwordInp);

  const signInBtn = document.createElement("a");
  signInBtn.classList.add("btn");
  signInBtn.innerText = "log in";
  signInBtn.id = "signInBtn";
  logInSect.appendChild(signInBtn);

  signInBtn.addEventListener("click", (e) => {
    const payload = {
      email: userNameInp.value,
      password: passwordInp.value,
    };

    const fetchOpt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`${fetchUrl}/api/accounts/login`, fetchOpt)
      .then((res) => {
        const token = res.headers.get("x-authToken");
        ls.setItem("token", token);
        console.log(`this is token: ${ls.getItem("token")}`);
        return res.json();
      })
      .then((data) => {
        ls.setItem("account", JSON.stringify(data));
        console.log(ls.getItem("account"));
        window.location.reload();
        console.log(`this is the account ${account}`);
      });

    if (ls.getItem("account")) {
        window.location.href = `${baseUrl}?page=profile`;
    }
  });

  // style border

  borderLogIn.classList.add("border_perpendicular");
  borderLogIn.id = "borderLogIn";

  //   create sign un section
  signUnSect.classList.add("logIn");
  signUnSect.classList.add("flex_column");
  signUnSect.id = "signUpSect";

  const signUpIcon = document.createElement("img");
  signUpIcon.id = "signUpIcon";
  signUpIcon.src = "./assets/svg/signUp.svg";
  signUnSect.appendChild(signUpIcon);

  const signUpInvTxt = document.createElement("h2");
  signUpInvTxt.innerText = "Become a member today !";
  signUnSect.appendChild(signUpInvTxt);

  signUpBtn.classList.add("btn");
  signUpBtn.innerText = "sign up";
  signUpBtn.id = "signUpBtn";
  signUpBtn.href = `${baseUrl}?page=signUp`;
  signUnSect.appendChild(signUpBtn);
};
loadSignUpPage = () => {
  body.innerHTML = "";

  const mainSignUp = document.createElement("form");
  mainSignUp.id = "mainSignUp";
  mainSignUp.classList.add("flex_column");
  body.appendChild(mainSignUp);

  const exitIconLink = document.createElement("a");
  exitIconLink.id = "exitIcon";
  exitIconLink.href = baseUrl;
  mainSignUp.appendChild(exitIconLink);

  const exitIcon = document.createElement("img");
  exitIcon.src = "./assets/svg/exitIcon.svg";
  exitIconLink.appendChild(exitIcon);

  const creatAccountIcon = document.createElement("img");
  creatAccountIcon.id = "creatAccountIcon";
  creatAccountIcon.src = "./assets/svg/logIn.svg";
  mainSignUp.appendChild(creatAccountIcon);

  const creatAccountTxt = document.createElement("h2");
  creatAccountTxt.innerText = "Create account";
  mainSignUp.appendChild(creatAccountTxt);

  const emailInput = document.createElement("input");
  emailInput.id = "emailSignUp";
  emailInput.type = "email";
  emailInput.placeholder = "email";
  emailInput.classList.add("signUpInput");
  mainSignUp.appendChild(emailInput);

  const userNameInput = document.createElement("input");
  userNameInput.id = "usernameSignUp";
  userNameInput.type = "text";
  userNameInput.placeholder = "username";
  userNameInput.classList.add("signUpInput");
  mainSignUp.appendChild(userNameInput);

  const passwordInput = document.createElement("input");
  passwordInput.id = "pasSignUp";
  passwordInput.type = "password";
  passwordInput.placeholder = "password";
  passwordInput.classList.add("signUpInput");
  mainSignUp.appendChild(passwordInput);

  const repeatInput = document.createElement("input");
  repeatInput.id = "pasSignUpRepeat";
  repeatInput.type = "password";
  repeatInput.placeholder = "repeat password";
  repeatInput.classList.add("signUpInput");
  mainSignUp.appendChild(repeatInput);

  const creatAccountBtn = document.createElement("button");
  creatAccountBtn.id = "creatAccountBtn";
  creatAccountBtn.innerText = "create account";
  creatAccountBtn.classList.add("btn");
  mainSignUp.appendChild(creatAccountBtn);
};
loadProfilePage = () => {
  body.innerHTML = "";
  body.classList.add("profileBody");

  //   header
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

  //   const userAccount = document.createElement("a");
  //   userAccount.id = "userAccountBtn";
  //   nav.appendChild(userAccount);

  const userAccountIcon = document.createElement("img");
  userAccountIcon.id = "userAccountIcon";
  userAccountIcon.src = "./assets/svg/logIn.svg";
  nav.appendChild(userAccountIcon);

  //   main
  body.appendChild(main);

  const myBoard = document.createElement("section");
  myBoard.id = "myBoard";
  main.appendChild(myBoard);

  const myBoardHeadline = document.createElement("h3");
  myBoardHeadline.id = "myBoardHeadline";
  myBoardHeadline.innerText = "My Board";
  myBoard.appendChild(myBoardHeadline);

  const myBoardDiv = document.createElement("div");
  myBoardDiv.id = "myBoardDiv";
  myBoard.appendChild(myBoardDiv);

  const myBoardDivTXT = document.createElement("input");
  myBoardDivTXT.id = "myBoardDivTXT";
  myBoardDivTXT.type = "text";
  myBoardDivTXT.placeholder = "Your board is empty";
  myBoardDiv.appendChild(myBoardDivTXT);

  const recentGroups = document.createElement("section");
  recentGroups.id = "recentGroups";
  main.appendChild(recentGroups);

  const recentGroupsHeadline = document.createElement("h4");
  recentGroupsHeadline.id = "recentGroupsHeadline";
  recentGroupsHeadline.innerText = "My Groups";
  recentGroups.appendChild(recentGroupsHeadline);

  const borderRecGroupTop = document.createElement("div");
  borderRecGroupTop.id = "borderRecGroupTop";
  borderRecGroupTop.classList.add("borderHorizontal");
  recentGroups.appendChild(borderRecGroupTop);

  const recentGroupsShow = document.createElement("section");
  recentGroupsShow.id = "recentGroupsShow";
  recentGroups.appendChild(recentGroupsShow);

  const borderRecGroupBottom = document.createElement("div");
  borderRecGroupBottom.id = "borderRecGroupBottom";
  borderRecGroupBottom.classList.add("borderHorizontal");
  recentGroups.appendChild(borderRecGroupBottom);

  const createBtns = document.createElement("section");
  createBtns.id = "createBtnSect";
  createBtns.classList.add("flex_column");
  main.appendChild(createBtns);

  const createTask = document.createElement("button");
  createTask.id = "createTaskBtn";
  createTask.innerText = "create task";
  createTask.classList.add("btn");
  createBtns.appendChild(createTask);

  const createGroup = document.createElement("button");
  createGroup.id = "createGroupBtn";
  createGroup.innerText = "create group";
  createGroup.classList.add("btn");
  createBtns.appendChild(createGroup);

  const showAllBtns = document.createElement("section");
  showAllBtns.id = "showAllBtns";
  showAllBtns.classList.add("flex_column");
  main.appendChild(showAllBtns);

  const showAllTasks = document.createElement("a");
  showAllTasks.id = "showAllTasksBtn";
  showAllTasks.innerText = "show all tasks";
  showAllTasks.classList.add("btnREVERSE");
  showAllBtns.appendChild(showAllTasks);

  const showAllGroups = document.createElement("a");
  showAllGroups.id = "showAllGroupsBtn";
  showAllGroups.innerText = "show all groups";
  showAllGroups.classList.add("btnREVERSE");
  showAllBtns.appendChild(showAllGroups);

  // aside
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

  //Homework
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

// getUrl();


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
