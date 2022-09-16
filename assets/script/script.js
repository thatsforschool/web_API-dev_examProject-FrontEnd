const body = document.querySelector("body");
const main = document.createElement("main");
const logInSect = document.createElement("form");
const signUnSect = document.createElement("form");
const borderLogIn = document.createElement("div");
const signUpBtn = document.createElement("a");
const ls = window.localStorage;
let baseUrl;
const fetchUrl = `http://127.0.0.1:8746`;
const errMes = document.createElement("div");
const mainToken = ls.getItem("token");

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
    errMes.innerText = "";
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
        if (res.status == 200) {
          const token = res.headers.get("x-authToken");
          ls.setItem("token", token);
          console.log(`this is token: ${ls.getItem("token")}`);
        }
        return res.json();
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          ls.setItem("account", JSON.stringify(data));
          console.log(ls.getItem("account"));
          console.log(`this is the account ${ls.getItem("account")}`);
          window.location.href = `${baseUrl}?page=profile`;
        } else {
          const errorMes = document.createElement("p");
          errorMes.innerText = "Invalid username or password";
          logInSect.appendChild(errorMes);
        }
      });

    console.log(`account in the ls: ${ls.getItem("account")}`);
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
  let account;
  account = JSON.parse(ls.getItem("account"));
  console.log(ls.getItem("account"));

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

  const userAccSet = document.createElement("div");
  userAccSet.id = "userAccSet";
  userAccSet.classList.add("navLink");
  nav.appendChild(userAccSet);

  const userAccountIcon = document.createElement("img");
  userAccountIcon.id = "userAccountIcon";
  userAccountIcon.src = "./assets/svg/logIn.svg";
  userAccSet.appendChild(userAccountIcon);

  //   account settings

  const accSideBar = document.createElement("div");
  accSideBar.classList.add("hidden");
  accSideBar.id = "accountSet";
  body.appendChild(accSideBar);

  userAccSet.addEventListener("click", (e) => {
    accSideBar.classList.remove("hidden");

    const exitIconLink = document.createElement("a");
    const exitIcon = document.createElement("img");

    exitIcon.src = "./assets/svg/exitIcon.svg";
    exitIcon.id = "exitIconSet";
    accSideBar.appendChild(exitIconLink);
    exitIconLink.appendChild(exitIcon);

    exitIconLink.addEventListener("click", (e) => {
      accSideBar.classList.add("hidden");
      accSideBar.innerHTML = "";
    });
    const pDivAccSet = document.createElement("section");
    pDivAccSet.id = "pDivAccSet";
    accSideBar.appendChild(pDivAccSet);

    const userNamep = document.createElement("p");
    userNamep.innerText = `username: ${account.displayName}`;
    pDivAccSet.appendChild(userNamep);

    const emailp = document.createElement("p");
    emailp.innerText = `email: ${account.email}`;
    pDivAccSet.appendChild(emailp);

    const descriptionp = document.createElement("p");
    descriptionp.innerText = `bio: ${account.accountDescription}`;
    pDivAccSet.appendChild(descriptionp);

    // buttons

    const btnAccSet = document.createElement("section");
    pDivAccSet.id = "btnAccSet";
    accSideBar.appendChild(btnAccSet);

    const changeUsername = document.createElement("button");
    changeUsername.innerText = `Change Username`;
    changeUsername.classList.add("btn");
    btnAccSet.appendChild(changeUsername);

    changeUsername.addEventListener("click", () => {
      accSideBar.innerHTML = "";
      const changeUserNameDiv = document.createElement("div");
      changeUserNameDiv.id = "changeUserNameDiv";
      accSideBar.appendChild(changeUserNameDiv);

      const changeUserNameInpDiv = document.createElement("div");
      changeUserNameInpDiv.id = "changeUserNameCur";
      changeUserNameDiv.appendChild(changeUserNameInpDiv);

      const changeUserNameCur = document.createElement("p");
      changeUserNameCur.id = "changeUserNameCur";
      changeUserNameCur.innerText = `current username: ${account.displayName}`;
      changeUserNameInpDiv.appendChild(changeUserNameCur);

      const changeUserNameInp = document.createElement("input");
      changeUserNameInp.id = "changeUserNameInp";
      changeUserNameInp.type = "text";
      changeUserNameInp.placeholder = "new username";
      changeUserNameInpDiv.appendChild(changeUserNameInp);

      const changeUserCancel = document.createElement("button");
      changeUserCancel.id = "changeUserCancel";
      changeUserCancel.innerText = "cancel";
      changeUserCancel.classList.add("btn");
      changeUserNameDiv.appendChild(changeUserCancel);

      changeUserCancel.addEventListener("click", () => {
        window.location.reload();
      });

      const changeUserSubmit = document.createElement("button");
      changeUserSubmit.id = "changeUserSubmit";
      changeUserSubmit.innerText = "submit";
      changeUserSubmit.classList.add("btn");
      changeUserNameDiv.appendChild(changeUserSubmit);

      changeUserSubmit.addEventListener("click", () => {
        const payload = {
          displayName: changeUserNameInp.value,
        };

        const fetchOpt = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "x-authToken": mainToken,
          },
          body: JSON.stringify(payload),
        };

        fetch(`${fetchUrl}/api/accounts/${account.accountId}`, fetchOpt)
          .then((res) => {
            if (res.status == 200) {
              console.log("succes");
            } else {
              console.log("not a succes");
            }
            return res.json();
          })

          .then((data) => {
            if (!data.statusCode && Object.keys(data).length != 0) {
              ls.setItem("account", JSON.stringify(data));
              console.log(ls.getItem("account"));
              console.log(`this is the account ${ls.getItem("account")}`);
            }

            changeUserNameDiv.innerHTML = "";
            changeUserNameDiv.innerText = `Your username has been updated`;

            reloadWINDOW = () => {
              window.location.reload();
            };

            setTimeout(reloadWINDOW, 1500);
          });
      });
    });

    const logOff = document.createElement("button");
    logOff.innerText = `Log Off`;
    logOff.classList.add("btn");
    btnAccSet.appendChild(logOff);

    logOff.addEventListener("click", () => {
      ls.clear();
      window.location.href = baseUrl;
    });

    const deletaAcc = document.createElement("button");
    deletaAcc.innerText = `Delate Account`;
    deletaAcc.classList.add("btn");
    btnAccSet.appendChild(deletaAcc);

    deletaAcc.addEventListener("click", (e) => {
      body.innerHTML = "";
      const deleteConfirm = document.createElement("div");
      deleteConfirm.id = "deleteConfirm";
      deleteConfirm.classList.add("deleteConfirm");
      body.appendChild(deleteConfirm);

      const deleteConfirmText = document.createElement("p");
      deleteConfirm.id = "deleteConfirmText";
      deleteConfirmText.innerText =
        "Are you sure you want to delete your account?";
      deleteConfirm.appendChild(deleteConfirmText);

      const deleteConfirmBtnDiv = document.createElement("div");
      deleteConfirmBtnDiv.id = "deleteConfirmBtnDiv";
      deleteConfirmBtnDiv.classList.add("flex");
      deleteConfirm.appendChild(deleteConfirmBtnDiv);

      const deleteConfirmCancelBtn = document.createElement("button");
      deleteConfirm.id = "deleteConfirmCancelBtn";
      deleteConfirmCancelBtn.innerText = "cancel";
      deleteConfirmCancelBtn.classList.add("btn");
      deleteConfirmBtnDiv.appendChild(deleteConfirmCancelBtn);
      deleteConfirmCancelBtn.addEventListener("click", () => {
        window.location.reload();
      });

      const deleteConfirmBtn = document.createElement("button");
      deleteConfirmBtn.id = "deleteConfirmCancelBtn";
      deleteConfirmBtn.innerText = "delete";
      deleteConfirmBtn.classList.add("btn");
      deleteConfirmBtnDiv.appendChild(deleteConfirmBtn);
      deleteConfirmBtn.addEventListener("click", () => {
        const fetchOpt = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "x-authToken": mainToken,
          },
        };

        fetch(`${fetchUrl}/api/accounts/${account.accountId}`, fetchOpt).then(
          (res) => {
            if (res.status == 200) {
              console.log("succes");
            } else {
              console.log("not a succes");
            }
            return res.json();
          }
        );

        ls.clear();
        window.location.href = baseUrl;
      });
    });
  });

  //   main

  //   const accountInfo = ls.getItem('account')
  console.log(account.displayName);
  body.appendChild(main);
  const myBoard = document.createElement("section");
  myBoard.id = "myBoard";
  main.appendChild(myBoard);

  const myBoardHeadline = document.createElement("h3");
  myBoardHeadline.id = "myBoardHeadline";
  myBoardHeadline.innerText = `Hello ${account.displayName}`;
  myBoard.appendChild(myBoardHeadline);

  const myBoardDiv = document.createElement("div");
  myBoardDiv.id = "myBoardDiv";
  myBoard.appendChild(myBoardDiv);

  const myBoardDivTXT = document.createElement("input");
  myBoardDivTXT.id = "myBoardDivTXT";
  myBoardDivTXT.type = "text ";
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

      switch (true) {
        case pageName == "signUp":
          loadSignUpPage();
          break;

        case pageName == "profile" && ls.getItem("token") != "":
          console.log("you are on profile page");
          loadProfilePage();
          console.log(`this is token ${ls.getItem("token")}`);
          break;

        default:
          break;
      }
    }
  }
});
// getUrl();
