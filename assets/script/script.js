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
const createBtns = document.createElement("section");

loadLogInPage = () => {
  // create main
  body.appendChild(main);
  main.appendChild(logInSect);
  main.appendChild(borderLogIn);
  main.appendChild(signUnSect);
  main.classList.add("flex");
  main.id = "main";
  const errorMes = document.createElement("p");

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
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    e.preventDefault();
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
        switch (res.status) {
          case 200:
            console.log("status 200");
            const token = res.headers.get("x-authToken");
            ls.setItem("token", token);
            console.log(`this is token: ${ls.getItem("token")}`);
            return res.json();
          case 400:
            console.log("status 400");
            errorMes.innerText = "Incorrect email or password";
            logInSect.appendChild(errorMes);
            break;
          case 401:
            console.log("status 401");
            errorMes.innerText = "Incorrect email or password";
            logInSect.appendChild(errorMes);
            break;
          case 404:
            console.log("status 404");
            errorMes.innerText = "Incorrect email or password";
            logInSect.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect email or password";
            logInSect.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect email or password";
            logInSect.appendChild(errorMes);
            break;
        }
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          ls.setItem("account", JSON.stringify(data));
          console.log(ls.getItem("account"));
          console.log(`this is the account ${ls.getItem("account")}`);
          window.location.href = `${baseUrl}?page=profile`;
        } else {
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

  const creatUserBtn = document.createElement("button");
  creatUserBtn.id = "creatUserBtn";
  creatUserBtn.innerText = "create user";
  creatUserBtn.classList.add("btn");
  mainSignUp.appendChild(creatUserBtn);

  creatUserBtn.addEventListener("click", (e) => {
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    e.preventDefault();
    const payload = {
      email: emailInput.value,
      userName: userNameInput.value,
    };

    const fetchOpt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`${fetchUrl}/api/users`, fetchOpt)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 400:
            console.log("status 400");
            errorMes.innerText = "Badly formatted request payload";
            mainSignUp.appendChild(errorMes);
            break;
          case 401:
            console.log("status 401");
            errorMes.innerText = "cannot use this email";
            mainSignUp.appendChild(errorMes);
            break;
          case 404:
            console.log("status 404");
            errorMes.innerText = "action failed";
            mainSignUp.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;
        }
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          ls.setItem("userObj", JSON.stringify(data));
          console.log(`this is the account ${ls.getItem("userObj")}`);
          window.location.href = `${baseUrl}?page=createAccount`;
        } else {
          const errorMes = document.createElement("p");
          errorMes.innerText = "Invalid username or email format";
          mainSignUp.appendChild(errorMes);
        }
      });

    console.log(`account in the ls: ${ls.getItem("userObj")}`);
  });
};

loadCreateAccountPage = () => {
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

  let user;
  user = JSON.parse(ls.getItem("userObj"));
  console.log(user);

  creatAccountBtn.addEventListener("click", (e) => {
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    e.preventDefault();

    if (passwordInput.value == repeatInput.value) {
      const payload = {
        password: passwordInput.value,
        userId: user.userId,
        userName: user.userName,
      };

      console.log(payload);

      const fetchOpt = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      fetch(`${fetchUrl}/api/accounts`, fetchOpt)
        .then((res) => {
          switch (res.status) {
            case 200:
              console.log("status 200");
              return res.json();

            case 400:
              console.log("status 400");
              errorMes.innerText = "Badly formatted request payload";
              mainSignUp.appendChild(errorMes);
              break;
            case 401:
              console.log("status 401");
              errorMes.innerText = "cannot use this email";
              mainSignUp.appendChild(errorMes);
              break;
            case 404:
              console.log("status 404");
              errorMes.innerText = "action failed";
              mainSignUp.appendChild(errorMes);
              break;
            case 500:
              console.log("status 500");
              errorMes.innerText = "Incorrect data";
              mainSignUp.appendChild(errorMes);
              break;

            default:
              errorMes.innerText = "Incorrect data";
              mainSignUp.appendChild(errorMes);
              break;
          }
        })

        .then((data) => {
          if (!data.statusCode && Object.keys(data).length != 0) {
            console.log(`account created`);
            ls.removeItem("userObj");
            window.location.href = `${baseUrl}?page=signIn`;
          } else {
            const errorMes = document.createElement("p");
            errorMes.innerText = "Invalid username or password";
            mainSignUp.appendChild(errorMes);
          }
        });
    }
  });
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
    if (account.accountDescription && account.accountDescription != null) {
      descriptionp.innerText = `bio: ${account.accountDescription}`;
      pDivAccSet.appendChild(descriptionp);
    } else {
      const changeAccountDescription = document.createElement("button");
      changeAccountDescription.innerText = `Add Bio`;
      changeAccountDescription.classList.add("btn");
      pDivAccSet.appendChild(changeAccountDescription);

      changeAccountDescription.addEventListener("click", () => {
        accSideBar.innerHTML = "";
        const changeAccountDescriptionDiv = document.createElement("div");
        changeAccountDescriptionDiv.id = "changeUserNameDiv";
        accSideBar.appendChild(changeAccountDescriptionDiv);

        const changeDescriptionInpDiv = document.createElement("div");
        changeDescriptionInpDiv.id = "changeUserNameCur";
        changeAccountDescriptionDiv.appendChild(changeDescriptionInpDiv);

        const changeDescriptionCur = document.createElement("p");
        changeDescriptionCur.id = "changeUserNameCur";
        if (account.accountDescription && account.accountDescription != null) {
          changeDescriptionCur.innerText = `current bio: ${account.accountDescription}`;
        } else {
          changeDescriptionCur.innerText = `no bio`;
        }

        changeDescriptionInpDiv.appendChild(changeDescriptionCur);

        const changeDescriptionInp = document.createElement("input");
        changeDescriptionInp.id = "changeUserNameInp";
        changeDescriptionInp.type = "text";
        changeDescriptionInp.placeholder = "new bio";
        changeDescriptionInpDiv.appendChild(changeDescriptionInp);

        const changeUserCancel = document.createElement("button");
        changeUserCancel.id = "changeUserCancel";
        changeUserCancel.innerText = "cancel";
        changeUserCancel.classList.add("btn");
        changeAccountDescriptionDiv.appendChild(changeUserCancel);

        changeUserCancel.addEventListener("click", () => {
          window.location.reload();
        });

        const changeBioSubmit = document.createElement("button");
        changeBioSubmit.id = "changeUserSubmit";
        changeBioSubmit.innerText = "submit";
        changeBioSubmit.classList.add("btn");
        changeAccountDescriptionDiv.appendChild(changeBioSubmit);

        changeBioSubmit.addEventListener("click", () => {
          const errorMes = document.createElement("p");
          errorMes.innerHTML = "";
          const payload = {
            newDescription: changeDescriptionInp.value,
          };

          const fetchOpt = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "x-authToken": mainToken,
            },
            body: JSON.stringify(payload),
          };

          fetch(`${fetchUrl}/api/accounts/own/description`, fetchOpt)
            .then((res) => {
              switch (res.status) {
                case 200:
                  console.log("status 200");
                  return res.json();
                case 400:
                  console.log("status 400");
                  errorMes.innerText = "Badly formatted request payload";
                  pDivAccSet.appendChild(errorMes);
                  break;
                case 404:
                  console.log("status 404");
                  errorMes.innerText = "action failed";
                  pDivAccSet.appendChild(errorMes);
                  break;
                case 500:
                  console.log("status 500");
                  errorMes.innerText = "Incorrect data";
                  pDivAccSet.appendChild(errorMes);
                  break;

                default:
                  errorMes.innerText = "Incorrect data";
                  pDivAccSet.appendChild(errorMes);
                  break;
              }
            })

            .then((data) => {
              if (!data.statusCode && Object.keys(data).length != 0) {
                ls.setItem("account", JSON.stringify(data));
                console.log(ls.getItem("account"));
                console.log(`this is the account ${ls.getItem("account")}`);
              }

              changeUserNameDiv.innerHTML = "";
              changeUserNameDiv.innerText = `Your bio has been updated`;

              reloadWINDOW = () => {
                window.location.reload();
              };

              setTimeout(reloadWINDOW, 1500);
            });
        });
      });
    }

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
        const errorMes = document.createElement("p");
        errorMes.innerHTML = "";
        const payload = {
          newDisplayName: changeUserNameInp.value,
        };

        const fetchOpt = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "x-authToken": mainToken,
          },
          body: JSON.stringify(payload),
        };

        fetch(`${fetchUrl}/api/accounts/own/name`, fetchOpt)
          .then((res) => {
            switch (res.status) {
              case 200:
                console.log("status 200");
                return res.json();
              case 400:
                console.log("status 400");
                errorMes.innerText = "Badly formatted request payload";
                changeUserNameDiv.appendChild(errorMes);
                break;
              case 404:
                console.log("status 404");
                errorMes.innerText = "action failed";
                changeUserNameDiv.appendChild(errorMes);
                break;
              case 500:
                console.log("status 500");
                errorMes.innerText = "Incorrect data";
                changeUserNameDiv.appendChild(errorMes);
                break;

              default:
                errorMes.innerText = "Incorrect data";
                changeUserNameDiv.appendChild(errorMes);
                break;
            }
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

    if (!account.accountDescription && account.accountDescription == null) {
      console.log("no bio");
    } else {
      const changeAccountDescription = document.createElement("button");
      changeAccountDescription.innerText = `Change Bio`;
      changeAccountDescription.classList.add("btn");
      btnAccSet.appendChild(changeAccountDescription);

      changeAccountDescription.addEventListener("click", () => {
        accSideBar.innerHTML = "";
        const changeAccountDescriptionDiv = document.createElement("div");
        changeAccountDescriptionDiv.id = "changeUserNameDiv";
        accSideBar.appendChild(changeAccountDescriptionDiv);

        const changeDescriptionInpDiv = document.createElement("div");
        changeDescriptionInpDiv.id = "changeUserNameCur";
        changeAccountDescriptionDiv.appendChild(changeDescriptionInpDiv);

        const changeDescriptionCur = document.createElement("p");
        changeDescriptionCur.id = "changeUserNameCur";
        if (account.accountDescription && account.accountDescription != null) {
          changeDescriptionCur.innerText = `current bio: ${account.accountDescription}`;
        } else {
          changeDescriptionCur.innerText = `no bio`;
        }

        changeDescriptionInpDiv.appendChild(changeDescriptionCur);

        const changeDescriptionInp = document.createElement("input");
        changeDescriptionInp.id = "changeUserNameInp";
        changeDescriptionInp.type = "text";
        changeDescriptionInp.placeholder = "new bio";
        changeDescriptionInpDiv.appendChild(changeDescriptionInp);

        const changeUserCancel = document.createElement("button");
        changeUserCancel.id = "changeUserCancel";
        changeUserCancel.innerText = "cancel";
        changeUserCancel.classList.add("btn");
        changeAccountDescriptionDiv.appendChild(changeUserCancel);

        changeUserCancel.addEventListener("click", () => {
          window.location.reload();
        });

        const changeBioSubmit = document.createElement("button");
        changeBioSubmit.id = "changeUserSubmit";
        changeBioSubmit.innerText = "submit";
        changeBioSubmit.classList.add("btn");
        changeAccountDescriptionDiv.appendChild(changeBioSubmit);

        changeBioSubmit.addEventListener("click", () => {
          const errorMes = document.createElement("p");

          const payload = {
            newDescription: changeDescriptionInp.value,
          };

          const fetchOpt = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "x-authToken": mainToken,
            },
            body: JSON.stringify(payload),
          };

          fetch(`${fetchUrl}/api/accounts/own/description`, fetchOpt)
            .then((res) => {
              switch (res.status) {
                case 200:
                  console.log("status 200");
                  return res.json();
                case 400:
                  console.log("status 400");
                  errorMes.innerText = "Badly formatted request payload";
                  changeAccountDescriptionDiv.appendChild(errorMes);
                  break;
                case 404:
                  console.log("status 404");
                  errorMes.innerText = "action failed";
                  changeAccountDescriptionDiv.appendChild(errorMes);
                  break;
                case 500:
                  console.log("status 500");
                  errorMes.innerText = "Incorrect data";
                  changeAccountDescriptionDiv.appendChild(errorMes);
                  break;

                default:
                  errorMes.innerText = "Incorrect data";
                  changeAccountDescriptionDiv.appendChild(errorMes);
                  break;
              }
            })

            .then((data) => {
              if (!data.statusCode && Object.keys(data).length != 0) {
                ls.setItem("account", JSON.stringify(data));
                console.log(ls.getItem("account"));
                console.log(`this is the account ${ls.getItem("account")}`);
              }

              changeUserNameDiv.innerHTML = "";
              changeUserNameDiv.innerText = `Your bio has been updated`;

              reloadWINDOW = () => {
                window.location.reload();
              };

              setTimeout(reloadWINDOW, 1500);
            });
        });
      });
    }

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
        const errorMes = document.createElement("p");
        errorMes.innerHTML = "";
        const fetchOpt = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "x-authToken": mainToken,
          },
        };

        fetch(`${fetchUrl}/api/accounts/${account.accountId}`, fetchOpt).then(
          (res) => {
            switch (res.status) {
              case 200:
                return res.json();
              case 404:
                console.log("status 404");
                errorMes.innerText = "action [DELETE] failed";
                deleteConfirm.appendChild(errorMes);
                break;
              case 500:
                console.log("status 500");
                errorMes.innerText = "Incorrect data";
                deleteConfirm.appendChild(errorMes);
                break;

              default:
                errorMes.innerText = "Incorrect data";
                deleteConfirm.appendChild(errorMes);
                break;
            }
          }
        );

        ls.clear();
        window.location.href = baseUrl;
      });
    });

    if (account.role.roleId == 1) {
      const adminButton = document.createElement("button");
      adminButton.innerText = `Admin`;
      adminButton.classList.add("btn");
      btnAccSet.appendChild(adminButton);

      adminButton.addEventListener("click", (e) => {
        body.innerHTML = "";
        const adminChange = document.createElement("div");
        adminChange.id = "adminChange";
        adminChange.classList.add("adminChange");
        body.appendChild(adminChange);

        const adminChangeText = document.createElement("p");
        adminChange.id = "adminChangeText";
        adminChangeText.innerText =
          "Who do you want to have admin role?";
        adminChange.appendChild(adminChangeText);

        const adminChangeEmail = document.createElement("input");
        adminChange.type = "text";
        adminChangeEmail.placeholder = "Email";
        adminChangeEmail.id = "adminChangeEmail";
        adminChange.appendChild(adminChangeEmail);

        const adminChangeRole = document.createElement("input");
        adminChange.type = "text";
        adminChangeRole.placeholder = "1 = admin";
        adminChangeRole.id = "adminCHangeRole";
        adminChange.appendChild(adminChangeRole);

        const adminChangeConfirm = document.createElement("button");
        adminChangeConfirm.id = "adminChangeConfirm";
        adminChangeConfirm.innerText = "Submit";
        adminChangeConfirm.classList.add("btn");
        adminChange.appendChild(adminChangeConfirm);
        adminChangeConfirm.addEventListener("click", () => {


          const email = adminChangeEmail.value

          const payload = {
            role: {
              roleId: adminChangeRole.value,
            }
          };
          console.log(payload);
          const fetchOpt = {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "x-authToken": mainToken,
            },
            body: JSON.stringify(payload),
          };
          console.log(fetchOpt);

          fetch(`${fetchUrl}/api/accounts/email/${email}`, fetchOpt)
            .then(
              (res) => {
                if (res.status == 200) {
                  console.log("GREAT success");
                } else {
                  console.log("he can afford clock radio now");
                }
                return res.json();
              })

            .then((data) => {
              if (!data.statusCode && Object.keys(data).length != 0) {
                ls.setItem("account", JSON.stringify(data));
                console.log(ls.getItem("account"));
                console.log(`this is the account ${ls.getItem("account")}`);
              }

              adminChange.innerHTML = "";
              adminChange.innerText = "The Role has been changed";

              reloadWINDOW = () => {
                window.location.reload();
              };

              setTimeout(reloadWINDOW, 1500);
            });
          console.log(`${fetchUrl}/api/accounts/email/${email}`);
        });
      });
    }
    else {

    }

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
  recentGroupsHeadline.innerText = "All Groups";
  recentGroups.appendChild(recentGroupsHeadline);

  const borderRecGroupTop = document.createElement("div");
  borderRecGroupTop.id = "borderRecGroupTop";
  borderRecGroupTop.classList.add("borderHorizontal");
  recentGroups.appendChild(borderRecGroupTop);

  const recentGroupsShow = document.createElement("section");
  recentGroupsShow.id = "recentGroupsShow";
  recentGroupsShow.classList.add("flex_column");
  recentGroups.appendChild(recentGroupsShow);

  const fetchOpt = {
    headers: {
      "Content-type": "application/json",
      "x-authToken": mainToken,
    },
  };
  console.log(mainToken);
  const errorMes = document.createElement("p");
  window.addEventListener("load", (e) => {
    errorMes.innerHTML = "";
  });

  fetch(`${fetchUrl}/api/groupmembers/membership`, fetchOpt)
    .then((res) => {
      switch (res.status) {
        case 200:
          console.log("status 200 on membership");
          return res.json();
        case 404:
          console.log("status 404");
          errorMes.innerText = "you are not a member of any group ";
          recentGroupsShow.appendChild(errorMes);
          break;
        case 500:
          console.log("status 500");
          errorMes.innerText = "Incorrect data";
          recentGroupsShow.appendChild(errorMes);
          break;

        default:
          errorMes.innerText = "Incorrect data";
          recentGroupsShow.appendChild(errorMes);
          break;
      }
    })
    .then((data) => {
      if (!data.statusCode && Object.keys(data).length != 0) {
        console.log(data);
        data.forEach((group) => {
          if (group.FK_userId != account.userId) {
            console.log("group");
            console.log(group);
            const groupMembershipLink = document.createElement("a");
            groupMembershipLink.id = "groupMembershipLink";
            groupMembershipLink.innerText = group.groupName;
            recentGroupsShow.appendChild(groupMembershipLink);
            groupMembershipLink.addEventListener("click", () => {
              ls.setItem("currentOwnGroup", JSON.stringify(group));
              console.log("currentOwnGroup");
              console.log(ls.getItem("currentOwnGroup"));
              window.location.href = `${baseUrl}?page=group`;
            });
          }
        });
      } else {
        console.log("error on membership");
        errorMes.innerText = "Invalid response from server";
        recentGroupsShow.appendChild(errorMes);
      }
    });

  const borderRecGroupBottom = document.createElement("div");
  borderRecGroupBottom.id = "borderRecGroupBottom";
  borderRecGroupBottom.classList.add("borderHorizontal");
  recentGroups.appendChild(borderRecGroupBottom);

  createBtns.id = "createBtnSect";
  createBtns.classList.add("flex_column");
  main.appendChild(createBtns);

  const createTask = document.createElement("button");
  createTask.id = "createTaskBtn";
  createTask.innerText = "create task";
  createTask.classList.add("btn");
  createBtns.appendChild(createTask);

  //create task here
  createTask.addEventListener("click", (e) => {
    myBoardDiv.innerHTML = "";
    myBoardHeadline.innerText = `Hello ${account.displayName}. You can create a task here`;

    const defineTask = document.createElement("form");
    defineTask.id = "defineTask";
    myBoardDiv.appendChild(defineTask);

    const defineTaskSubj = document.createElement("input");
    defineTaskSubj.id = "defineTaskSubj";
    defineTaskSubj.type = "text";
    defineTaskSubj.placeholder = "Describe your task";
    defineTask.appendChild(defineTaskSubj);

    const defineTaskDropdownLabel = document.createElement("label");
    defineTaskDropdownLabel.id = "defineTaskDropdownLabel";
    defineTaskDropdownLabel.for = "defineTaskDropdown";
    defineTaskDropdownLabel.innerText = "Choose task category:";
    defineTask.appendChild(defineTaskDropdownLabel);

    const defineTaskDropdown = document.createElement("select");
    defineTaskDropdown.id = "defineTaskDropdown";
    defineTaskDropdown.name = "Task label";
    defineTask.appendChild(defineTaskDropdown);
    let taskLabel = 1;

    defineTaskDropdown.addEventListener("change", (e) => {
      switch (defineTaskDropdown.value) {
        case "Homework":
          taskLabel = 1;
          break;
        case "Project":
          taskLabel = 2;
          break;
        case "Assignment":
          taskLabel = 3;
          break;

        default:
          taskLabel = 1;
          break;
      }

      console.log(taskLabel);
    });

    const defineTaskHw = document.createElement("option");
    defineTaskHw.id = "defineTaskHw";
    defineTaskHw.value = "Homework";
    defineTaskHw.innerText = "Homework";
    defineTaskDropdown.appendChild(defineTaskHw);

    const defineTaskProj = document.createElement("option");
    defineTaskProj.id = "defineTaskProj";
    defineTaskProj.value = "Project";
    defineTaskProj.innerText = "Project";
    defineTaskDropdown.appendChild(defineTaskProj);

    const defineTaskAs = document.createElement("option");
    defineTaskAs.id = "defineTaskAs";
    defineTaskAs.value = "Assignment";
    defineTaskAs.innerText = "Assignment";
    defineTaskDropdown.appendChild(defineTaskAs);

    const defineTaskDateLab = document.createElement("label");
    defineTaskDateLab.id = "defineTaskDateLabel";
    defineTaskDateLab.for = "TaskDueDate";
    defineTaskDateLab.innerText = "Task due date:";
    defineTask.appendChild(defineTaskDateLab);

    let taskDate;
    const defineTaskDate = document.createElement("input");
    defineTaskDate.id = "defineTaskDate";
    defineTaskDate.type = "date";
    defineTaskDate.name = "TaskDueDate";
    defineTask.appendChild(defineTaskDate);
    defineTask.addEventListener("change", (e) => {
      taskDate = Date.parse(defineTaskDate.value);
      console.log(`taskDate`);
      console.log(taskDate);
    });

    const defineTaskBtn = document.createElement("input");
    defineTaskBtn.id = "defineTaskBtn";
    defineTaskBtn.type = "submit";
    defineTaskBtn.value = "Add task";
    defineTaskBtn.classList.add("btn");
    defineTask.appendChild(defineTaskBtn);

    //create the new task
    defineTaskBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // myBoardDiv.classList.add("hideMyBoardDiv");
      const payload = {
        labelId: taskLabel,
        taskdueDate: taskDate,
        tasksubject: defineTaskSubj.value,
      };

      console.log(payload);

      const fetchOpt = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-authToken": mainToken,
        },
        body: JSON.stringify(payload),
      };

      fetch(`${fetchUrl}/api/tasks`, fetchOpt)
        .then((res) => {
          if (res.status == 200) {
            console.log("status 200");
            return res.json();
          }
        })
        .then((data) => {
          myBoardDiv.innerHTML = "";
          const sucessMes = document.createElement("p");
          sucessMes.innerText = "task created succesfuly";
          myBoardDiv.appendChild(sucessMes);

         // reload = () => {
          //  window.location.reload();
         // };
         // setTimeout(reload, 1500);
        });
    });
  });

  const createGroup = document.createElement("button");
  createGroup.id = "createGroupBtn";
  createGroup.innerText = "create group";
  createGroup.classList.add("btn");
  createBtns.appendChild(createGroup);

  createGroup.addEventListener("click", (e) => {
    createGroupFunction();
  });

  const showAllBtns = document.createElement("section");
  showAllBtns.id = "showAllBtns";
  showAllBtns.classList.add("flex_column");
  main.appendChild(showAllBtns);

  const showAllTasks = document.createElement("a");
  showAllTasks.id = "showAllTasksBtn";
  showAllTasks.innerText = "show all tasks";
  showAllTasks.classList.add("btnREVERSE");
  showAllBtns.appendChild(showAllTasks);

  // Generate all own tasks here
  showAllTasks.addEventListener("click", (e) => {
    const errorMes = document.createElement("p");
    myBoardDiv.innerHTML = "";
    myBoardHeadline.innerText = `Hello ${account.displayName}. These are all your tasks`;
    const fetchOpt = {
      headers: {
        "Content-type": "application/json",
        "x-authToken": ls.getItem("token"),
      },
    };

    fetch(`${fetchUrl}/api/tasks/own`, fetchOpt)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 404:
            console.log("status 404");
            errorMes.innerText = "you do not have any tasks in the database";
            myBoardDiv.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;
        }
      })
      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          console.log(data);
          myBoardDiv.innerHTML = "";

          const showAllTasksList = document.createElement("ul");
          showAllTasksList.id = "showAllTasksList";
          myBoardDiv.appendChild(showAllTasksList);

          data.forEach((task) => {
            const showAllTasksListItem = document.createElement("li");
            showAllTasksListItem.id = "showAllTasksList";
            showAllTasksListItem.innerText = task.tasksubject;
            switch (task.FK_labelId) {
              case 1:
                showAllTasksListItem.classList.add("labelId1");
                break;
              case 2:
                showAllTasksListItem.classList.add("labelId2");
                break;
              case 3:
                showAllTasksListItem.classList.add("labelId3");
                break;
              default:
                break;
            }
            showAllTasksList.appendChild(showAllTasksListItem);

            const deleteTask = document.createElement("button");
            deleteTask.id = "deleteTask";
            deleteTask.innerText = "Delete task";
            deleteTask.classList.add("btn");
            deleteTask.classList.add("deleteTaskBtn");
            showAllTasksListItem.appendChild(deleteTask);

            deleteTask.addEventListener("click", () => {
              myBoardDiv.innerHTML = "";
              const confirmDeleteTask = document.createElement("p");
              confirmDeleteTask.id = "confirmDeleteTask";
              confirmDeleteTask.innerText = `Are you sure you want to delete the task: "${task.tasksubject}"?`;

              myBoardDiv.appendChild(confirmDeleteTask);

              const annulDelTask = document.createElement("button");
              annulDelTask.id = "annulDelTask";
              annulDelTask.innerText = "Cancel";
              annulDelTask.classList.add("btn");
              myBoardDiv.appendChild(annulDelTask);
              annulDelTask.addEventListener("click", () => {
                window.location.reload();
              });

              const yesDelTask = document.createElement("button");
              yesDelTask.id = "yesDelTask";
              yesDelTask.innerText = "Continue";
              yesDelTask.classList.add("btn");
              myBoardDiv.appendChild(yesDelTask);

              yesDelTask.addEventListener("click", () => {
                const fetchOpt = {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                    "x-authtoken": mainToken,
                  },
                };
                fetch(`${fetchUrl}/api/tasks/${task.taskId}`, fetchOpt)
                  .then((res) => {
                    if (res.status == 200) {
                      console.log("status: 200");
                      return res.json();
                    }
                  })
                  .then((data) => {
                    myBoardDiv.innerHTML = "";
                    const removedTask = document.createElement("p");
                    removedTask.id = "removedTask";
                    removedTask.innerText = `Removed the task: "${task.tasksubject}".`;
                    myBoardDiv.appendChild(removedTask);

                    reloadWINDOW = () => {
                      window.location.reload();
                    };

                    setTimeout(reloadWINDOW, 3000);
                  });
              });
            });
          });
        }
      });
  });

  const showAllGroups = document.createElement("a");
  showAllGroups.id = "showAllGroupsBtn";
  showAllGroups.innerText = "show my groups";
  showAllGroups.classList.add("btnREVERSE");
  showAllBtns.appendChild(showAllGroups);

  showAllGroups.addEventListener("click", (e) => {
    getAllGroupsFunction(showAllBtns);
  });

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
  fetch(`${fetchUrl}/api/tasks/own`, fetchOpt)
    .then((res) => {
      switch (res.status) {
        case 200:
          console.log("status 200");
          return res.json();
        case 404:
          console.log("status 404");
          errorMes.innerText = "you do not have any tasks in the database";
          upComTasks.appendChild(errorMes);
          break;
        case 500:
          console.log("status 500");
          errorMes.innerText = "Incorrect data";
          upComTasks.appendChild(errorMes);
          break;

        default:
          errorMes.innerText = "Incorrect data";
          upComTasks.appendChild(errorMes);
          break;
      }
    })
    .then((data) => {
      if (!data.statusCode && Object.keys(data).length != 0) {
        console.log(data);
        upComTasks.innerHTML = "";

        const showAllTasksList = document.createElement("ul");
        showAllTasksList.id = "showAllTasksList";
        upComTasks.appendChild(showAllTasksList);

        sortDates = (a, b) => {
          if (a.taskdueDate < b.taskdueDate) {
            return 1;
          }
          if (a.taskdueDate > b.taskdueDate) {
            return -1;
          }
          return 0;
        };

        let sorted = data.sort(sortDates);
        console.log("sorted");
        console.log(sorted);

        for (let i = 0; i < 3; i++) {
          const showAllTasksListItem = document.createElement("li");
          showAllTasksListItem.id = "showAllTasksList";
          //   showAllTasksListItem.classList.add("flex");
          const showAllTasksListItemp = document.createElement("p");
          showAllTasksListItemp.id = "showAllTasksListp";
          showAllTasksListItemp.innerText = sorted[i].tasksubject;

          const showAllTasksListItemDate = document.createElement("p");
          showAllTasksListItemDate.id = "showAllTasksListp";
          const dueDate = sorted[i].taskdueDate;
          const curentDate = new Date();
          const curent = curentDate.getTime();
          let timeDiffrence;
          let dayDifference;
          let daysUntil;
          switch (true) {
            case dueDate - curent < 86400000:
              timeDiffrence = curent - dueDate;
              dayDifference = timeDiffrence / (1000 * 3600);
              daysUntil = Math.round(dayDifference);
              PdaysUntil = Math.abs(daysUntil);
              showAllTasksListItemDate.innerText = `${PdaysUntil} hours left`;
              break;
            case dueDate > curent:
              timeDiffrence = dueDate - curent;
              dayDifference = timeDiffrence / (1000 * 3600 * 24);
              daysUntil = Math.round(dayDifference);
              showAllTasksListItemDate.innerText = `${daysUntil} days`;
              break;
            case dueDate == null:
              showAllTasksListItemDate.innerText = `no due date defined`;
              break;
            case dueDate < curent:
              timeDiffrence = curent - dueDate;
              dayDifference = timeDiffrence / (1000 * 3600 * 24);
              daysUntil = Math.round(dayDifference);
              PdaysUntil = Math.abs(daysUntil);
              console.log(PdaysUntil);
              showAllTasksListItemDate.innerText = `${PdaysUntil} days past duedate`;
              break;

            default:
              break;
          }

          switch (sorted[i].FK_labelId) {
            case 1:
              showAllTasksListItem.classList.add("labelId1");
              break;
            case 2:
              showAllTasksListItem.classList.add("labelId2");
              break;
            case 3:
              showAllTasksListItem.classList.add("labelId3");
              break;
            default:
              break;
          }

          showAllTasksListItem.appendChild(showAllTasksListItemp);
          showAllTasksListItem.appendChild(showAllTasksListItemDate);
          showAllTasksList.appendChild(showAllTasksListItem);
        }
      }
    });

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

  //  Generate all own tasks with labelId = 1 (homework) here
  homeworkBtn.addEventListener("click", (e) => {
    //window.location.replace(`${baseUrl}?page=homework`);
    myBoardDiv.classList.add("hideMyBoardDiv");
    const errorMes = document.createElement("p");
    myBoardDiv.innerHTML = "";
    myBoardHeadline.innerText = `Hello ${account.displayName}. This is all your homework`;
    const fetchOpt = {
      headers: {
        "Content-type": "application/json",
        "x-authToken": ls.getItem("token"),
      },
    };
    fetch(`${fetchUrl}/api/tasks/own/1`, fetchOpt)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 404:
            console.log("status 404");
            errorMes.innerText = "you do not have any tasks in Homework";
            myBoardDiv.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;
        }
      })
      .then((data) => {
        myBoardDiv.classList.remove("hideMyBoardDiv");
        myBoardDiv.innerHTML = "";
        const showAllHomework = document.createElement("ul");
        showAllHomework.id = "showAllHomework";
        myBoardDiv.appendChild(showAllHomework);
        data.forEach((task) => {
          const showAllHomeworkListItem = document.createElement("li");
          showAllHomeworkListItem.id = "showAllHomeworkListItem";
          showAllHomeworkListItem.innerText = task.tasksubject;
          showAllHomeworkListItem.classList.add("labelId1");
          showAllHomework.appendChild(showAllHomeworkListItem);
        });
     });
  });

  const projectsBtn = document.createElement("a");
  projectsBtn.id = "projectsBtn";
  projectsBtn.innerText = "My Projects";
  projectsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(projectsBtn);

  //  Generate all own tasks with labelId = 2 (projects) here
  projectsBtn.addEventListener("click", (e) => {

   // window.location.replace(`${baseUrl}?page=projects`);
    const errorMes = document.createElement("p");
    myBoardDiv.innerHTML = "";
    // myBoardDiv.classList.add("hideMyBoardDiv");

    myBoardHeadline.innerText = `Hello ${account.displayName}. This is all your project tasks`;
    const fetchOpt = {
      headers: {
        "Content-type": "application/json",
        "x-authToken": ls.getItem("token"),
      },
    };
    fetch(`${fetchUrl}/api/tasks/own/2`, fetchOpt)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }

        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 404:
            console.log("status 404");
            errorMes.innerText = "you do not have any tasks in Projects";
            myBoardDiv.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;
        }
      })
      .then((data) => {
        myBoardDiv.classList.remove("hideMyBoardDiv");
        myBoardDiv.innerHTML = "";
        const showAllProjects = document.createElement("ul");
        showAllProjects.id = "showAllProjects";
        myBoardDiv.appendChild(showAllProjects);
        data.forEach((task) => {
          const showAllProjectsListItem = document.createElement("li");
          showAllProjectsListItem.id = "showAllProjectsListItem";
          showAllProjectsListItem.innerText = task.tasksubject;
          showAllProjectsListItem.classList.add("labelId2");
          showAllProjects.appendChild(showAllProjectsListItem);
        });
      });
  });

  const assigmentsBtn = document.createElement("a");
  assigmentsBtn.id = "assigmentsBtn";
  assigmentsBtn.innerText = "My Assigments";
  assigmentsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(assigmentsBtn);

  //  Generate all own tasks with labelId = 3 (assignments) here
  assigmentsBtn.addEventListener("click", (e) => {
   // window.location.replace(`${baseUrl}?page=assigments`);
    myBoardDiv.classList.add("hideMyBoardDiv");

    const errorMes = document.createElement("p");
    myBoardDiv.innerHTML = "";
    // myBoardDiv.classList.add("hideMyBoardDiv");

    myBoardHeadline.innerText = `Hello ${account.displayName}. This is all your assignment tasks`;
    const fetchOpt = {
      headers: {
        "Content-type": "application/json",
        "x-authToken": ls.getItem("token"),
      },
    };
    fetch(`${fetchUrl}/api/tasks/own/3`, fetchOpt)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }

        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 404:
            console.log("status 404");
            errorMes.innerText = "you do not have any tasks in Assigments";
            myBoardDiv.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            myBoardDiv.appendChild(errorMes);
            break;
        }
      })
      .then((data) => {
        myBoardDiv.classList.remove("hideMyBoardDiv");
        myBoardDiv.innerHTML = "";
        const showAllAssignments = document.createElement("ul");
        showAllAssignments.id = "showAllAssignments";
        myBoardDiv.appendChild(showAllAssignments);
        data.forEach((task) => {
          const showAllAssignmentsListItem = document.createElement("li");
          showAllAssignmentsListItem.id = "showAllAssignmentsListItem";
          showAllAssignmentsListItem.innerText = task.tasksubject;
          showAllAssignmentsListItem.classList.add("labelId3");
          showAllAssignments.appendChild(showAllAssignmentsListItem);
        });
      });
  });

  const showAllDone = document.createElement("a");
  showAllDone.id = "showAllDone";
  showAllDone.innerText = "Show All Finished Tasks";
  showAllDone.classList.add("operBtns");
  operatingBtnsSect.appendChild(showAllDone);
};

loadSinglelogPage = () => {
  // create main
  body.appendChild(main);
  main.appendChild(logInSect);
  main.appendChild(borderLogIn);
  main.appendChild(signUnSect);
  main.classList.add(".flex_column");
  main.id = "mainLogIn";
  const errorMes = document.createElement("p");

  //   create log in section

  logInSect.classList.add("logInSingle");
  logInSect.classList.add("flex_column");
  logInSect.id = "logInSect";

  const signInIcon = document.createElement("img");
  signInIcon.id = "signInIconSingle";
  signInIcon.src = "./assets/svg/logIn.svg";
  logInSect.appendChild(signInIcon);

  const userNameInp = document.createElement("input");
  userNameInp.type = "text";
  userNameInp.placeholder = "email";
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
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    e.preventDefault();
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
        switch (res.status) {
          case 200:
            console.log("status 200");
            const token = res.headers.get("x-authToken");
            ls.setItem("token", token);
            console.log(`this is token: ${ls.getItem("token")}`);
            return res.json();
          case 400:
            console.log("status 400");
            errorMes.innerText = "Badly formatted request payload";
            mainSignUp.appendChild(errorMes);
            break;
          case 401:
            console.log("status 401");
            errorMes.innerText = "cannot use this email";
            mainSignUp.appendChild(errorMes);
            break;
          case 404:
            console.log("status 404");
            errorMes.innerText = "action failed";
            mainSignUp.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;
        }
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          ls.setItem("account", JSON.stringify(data));
          console.log(ls.getItem("account"));
          console.log(`this is the account ${ls.getItem("account")}`);
          window.location.href = `${baseUrl}?page=profile`;
        } else {
          errorMes.innerText = "Invalid username or password";
          logInSect.appendChild(errorMes);
        }
      });

    console.log(`account in the ls: ${ls.getItem("account")}`);
  });
};

createGroupFunction = () => {
  createBtns.innerHTML = "";
  createBtns.id = "";
  createBtns.classList.add("createGroupDiv");

  const groupNameInp = document.createElement("input");
  groupNameInp.type = "text";
  groupNameInp.id = "groupNameInp";
  groupNameInp.placeholder = "group name";
  createBtns.appendChild(groupNameInp);

  const groupDescriptionInp = document.createElement("input");
  groupDescriptionInp.type = "text";
  groupDescriptionInp.id = "groupDescription";
  groupDescriptionInp.placeholder = "group description";
  createBtns.appendChild(groupDescriptionInp);

  const groupCreateBtn = document.createElement("button");
  groupCreateBtn.innerText = "create group";
  groupCreateBtn.id = "groupCreateBtn";
  groupCreateBtn.classList.add("btn");
  createBtns.appendChild(groupCreateBtn);

  groupCreateBtn.addEventListener("click", (e) => {
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    createBtns.innerHTML = "";

    const payload = {
      groupName: groupNameInp.value,
      groupDescription: groupDescriptionInp.value,
    };

    const fetchOpt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-authtoken": mainToken,
      },
      body: JSON.stringify(payload),
    };

    fetch(`${fetchUrl}/api/groups`, fetchOpt)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 400:
            console.log("status 400");
            errorMes.innerText = "Badly formatted request payload";
            createBtns.appendChild(errorMes);
            break;
          case 401:
            console.log("status 401");
            errorMes.innerText = "this group already exists in the database";
            createBtns.appendChild(errorMes);
            break;
          case 404:
            console.log("status 404");
            errorMes.innerText = "action failed";
            createBtns.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            createBtns.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            createBtns.appendChild(errorMes);
            break;
        }
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          addGroupMembers(createBtns, data);
        } else {
          errorMes.innerText = "Invalid input";
          logInSect.appendChild(errorMes);
        }
      });
  });
};

getAllGroupsFunction = (div) => {
  div.innerHTML = "";
  div.id = "";
  div.classList.add("showGroupsDiv");
  const errorMes = document.createElement("p");
  errorMes.innerHTML = "";

  const exitIconLink = document.createElement("a");
  exitIconLink.id = "exitIconSet";
  const exitIcon = document.createElement("img");
  exitIcon.src = "./assets/svg/exitIcon.svg";
  div.appendChild(exitIconLink);
  exitIconLink.appendChild(exitIcon);

  exitIconLink.addEventListener("click", (e) => {
    window.location.reload();
  });
  const fetchOpt = {
    headers: {
      "Content-type": "application/json",
      "x-authtoken": mainToken,
    },
  };

  fetch(`${fetchUrl}/api/groups/own`, fetchOpt)
    .then((res) => {
      switch (res.status) {
        case 200:
          console.log("status 200");
          return res.json();
        case 404:
          console.log("status 404");
          errorMes.innerText = "no group found for this user id";
          div.appendChild(errorMes);
          break;
        case 500:
          console.log("status 500");
          errorMes.innerText = "Incorrect data";
          div.appendChild(errorMes);
          break;

        default:
          errorMes.innerText = "Incorrect data";
          div.appendChild(errorMes);
          break;
      }
    })

    .then((data) => {
      if (!data.statusCode && Object.keys(data).length != 0) {
        data.forEach((group) => {
          const newGroup = document.createElement("a");
          newGroup.innerText = group.groupName;
          newGroup.id = "groupLink";
          div.appendChild(newGroup);

          newGroup.addEventListener("click", () => {
            div.innerHTML = "";
            const fetchOpt = {
              headers: {
                "Content-type": "application/json",
                "x-authtoken": mainToken,
              },
            };

            fetch(`${fetchUrl}/api/groupmembers/${group.groupId}`, fetchOpt)
              .then((res) => {
                if (res.status == 200) {
                  console.log("status: 200");
                }
                return res.json();
              })

              .then((data) => {
                ls.setItem("currentOwnGroup", JSON.stringify(data));

                if (!data.statusCode && Object.keys(data).length != 0) {
                  const exitIconLink = document.createElement("a");
                  const exitIcon = document.createElement("img");
                  exitIcon.src = "./assets/svg/exitIcon.svg";
                  exitIcon.id = "exitIconSet";
                  div.appendChild(exitIconLink);
                  exitIconLink.appendChild(exitIcon);
                  exitIconLink.addEventListener("click", (e) => {
                    window.location.reload();
                  });

                  const groupTitle = document.createElement("a");
                  groupTitle.href = `${baseUrl}?page=group`;
                  groupTitle.innerText = data.groupName;
                  div.appendChild(groupTitle);

                  const groupMembers = document.createElement("div");
                  groupMembers.id = "groupMembers";
                  div.appendChild(groupMembers);

                  data.groupMembers.forEach((member) => {
                    const memberItem = document.createElement("p");
                    memberItem.innerText = member.userName;
                    groupMembers.appendChild(memberItem);
                  });

                  const addmemberBtn = document.createElement("button");
                  addmemberBtn.classList.add("btn");
                  addmemberBtn.innerText = "add member";
                  div.appendChild(addmemberBtn);
                  addmemberBtn.addEventListener("click", (e) => {
                    div.innerHTML = "";
                    addGroupMembers(div, data.groupName);
                  });
                } else {
                  const exitIconLink = document.createElement("a");
                  const exitIcon = document.createElement("img");

                  exitIcon.src = "./assets/svg/exitIcon.svg";
                  exitIcon.id = "exitIconSet";
                  div.appendChild(exitIconLink);
                  exitIconLink.appendChild(exitIcon);
                  exitIconLink.addEventListener("click", (e) => {
                    window.location.reload();
                  });


                  const groupTitle = document.createElement("a");
                  groupTitle.href = `${baseUrl}?page=group`;
                  groupTitle.innerText = group.groupName;
                  div.appendChild(groupTitle);

                  const message404 = document.createElement("p");
                  message404.id = "message404";
                  message404.innerText = "this group has no members";
                  div.appendChild(message404);

                  const addmemberBtn = document.createElement("button");
                  addmemberBtn.classList.add("btn");
                  addmemberBtn.innerText = "add member";
                  div.appendChild(addmemberBtn);
                  addmemberBtn.addEventListener("click", (e) => {
                    div.innerHTML = "";
                    addGroupMembers(div, group);
                  });
                }
              });
          });
        });
      } else {
        errorMes.innerText = "Invalid input";
        logInSect.appendChild(errorMes);
      }
    });
};

addGroupMembers = (div, group) => {
  const exitIconLink = document.createElement("a");
  const exitIcon = document.createElement("img");

  exitIcon.src = "./assets/svg/exitIcon.svg";
  exitIcon.id = "exitIconSet";
  div.appendChild(exitIconLink);
  exitIconLink.appendChild(exitIcon);

  exitIconLink.addEventListener("click", (e) => {
    window.location.reload();
  });

  const groupTitle = document.createElement("h4");
  groupTitle.innerText = group.groupName;
  div.appendChild(groupTitle);

  const addMembersInp = document.createElement("input");
  addMembersInp.type = "text";
  addMembersInp.id = "addMembersInp";
  addMembersInp.placeholder = "email";
  div.appendChild(addMembersInp);

  const addMembersBtn = document.createElement("button");
  addMembersBtn.classList.add("btn");
  addMembersBtn.id = "addMembersBtn";
  addMembersBtn.innerText = "add";
  div.appendChild(addMembersBtn);

  addMembersBtn.addEventListener("click", () => {
    const errorMes = document.createElement("p");
    errorMes.innerHTML = "";
    const memberEmail = addMembersInp.value;
    const fetchOpt = {
      headers: {
        "Content-type": "application/json",
        "x-authtoken": mainToken,
      },
    };

    fetch(`${fetchUrl}/api/users/email/${memberEmail}`, fetchOpt)
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log("status 200");
            return res.json();
          case 400:
            console.log("status 400");
            errorMes.innerText = "Badly formatted request payload";
            mainSignUp.appendChild(errorMes);
            break;
          case 401:
            console.log("status 401");
            errorMes.innerText = "cannot use this email";
            mainSignUp.appendChild(errorMes);
            break;
          case 404:
            console.log("status 404");
            errorMes.innerText = "action failed";
            mainSignUp.appendChild(errorMes);
            break;
          case 500:
            console.log("status 500");
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;

          default:
            errorMes.innerText = "Incorrect data";
            mainSignUp.appendChild(errorMes);
            break;
        }
      })

      .then((data) => {
        if (!data.statusCode && Object.keys(data).length != 0) {
          const payload = {
            newMember: data.userId,
          };

          const fetchOpt = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "x-authtoken": mainToken,
            },
            body: JSON.stringify(payload),
          };
          fetch(`${fetchUrl}/api/groupmembers/${group.groupId}`, fetchOpt)
            .then((res) => {
              switch (res.status) {
                case 200:
                  console.log("status 200");
                  return res.json();
                case 400:
                  console.log("status 400");
                  errorMes.innerText = "Badly formatted request payload";
                  mainSignUp.appendChild(errorMes);
                  break;
                case 401:
                  console.log("status 401");
                  errorMes.innerText = "user already exists in the group";
                  mainSignUp.appendChild(errorMes);
                  break;
                case 404:
                  console.log("status 404");
                  errorMes.innerText = "action failed";
                  mainSignUp.appendChild(errorMes);
                  break;
                case 500:
                  console.log("status 500");
                  errorMes.innerText = "Incorrect data";
                  mainSignUp.appendChild(errorMes);
                  break;

                default:
                  errorMes.innerText = "Incorrect data";
                  mainSignUp.appendChild(errorMes);
                  break;
              }
            })
            .then((data) => {
              const memberName = data.userName;
              const memberPName = document.createElement("p");
              memberPName.innerText = memberName;
              div.appendChild(memberPName);
            });
        } else {
          errorMes.innerText = "Invalid input";
          logInSect.appendChild(errorMes);
        }
      });
  });
};



//    GroupPage setup - based on loadProfilePage()
loadGroupPage = () => {
  body.innerHTML = "";
  body.classList.add("profileBody"); //intentional to add profileBody class here.

  const OwnGroup = JSON.parse(ls.getItem("currentOwnGroup"));
  console.log("currentOwnGroup");
  console.log(OwnGroup);
  console.log(OwnGroup.FK_userId);

  const account = JSON.parse(ls.getItem("account"));
  console.log("account");
  console.log(account);

  const fetchOpt = {
    headers: {
      "Content-type": "application/json",
      "x-authtoken": mainToken,
    },
  };

  const errorMes = document.createElement("p");
  errorMes.innerHTML = "";

  fetch(`${fetchUrl}/api/groups/${OwnGroup.groupId}`, fetchOpt)
    .then((res) => {
      switch (res.status) {
        case 200:
          console.log("status 200");
          return res.json();
        case 401:
          console.log("status 401");
          errorMes.innerText = "conflicting data";
          main.appendChild(errorMes);
          break;
        case 404:
          console.log("status 404");
          errorMes.innerText = "action failed";
          main.appendChild(errorMes);
          break;
        case 500:
          console.log("status 500");
          errorMes.innerText = "Incorrect data";
          main.appendChild(errorMes);
          break;

        default:
          errorMes.innerText = "Incorrect data";
          main.appendChild(errorMes);
          break;
      }
    })

    .then((data) => {
      console.log(data);

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

      const goBack = document.createElement("a");
      goBack.id = "goBack";
      goBack.innerText = "goBack";
      myGroup.appendChild(goBack);
      goBack.addEventListener("click", () => {
        ls.removeItem("currentOwnGroup");
        window.location.href = `${baseUrl}?page=profile`;
      });

      const myGroupHeadline = document.createElement("h3");
      myGroupHeadline.id = "myGroupHeadline";
      myGroupHeadline.innerText = OwnGroup.groupName;
      myGroup.appendChild(myGroupHeadline);

      const myGroupDiv = document.createElement("div");
      myGroupDiv.id = "myGroupDiv";
      myGroup.appendChild(myGroupDiv);

      const myGroupDivDescription = document.createElement("p");
      myGroupDivDescription.id = "myGroupDivDescription";
      myGroupDivDescription.innerText = data.groupDescription;
      myGroupDiv.appendChild(myGroupDivDescription);

      const myGroupDivAdmin = document.createElement("p");
      myGroupDivAdmin.id = "myGroupDivAdmin";
      myGroupDivAdmin.innerText = `admin: ${data.userName}`;
      myGroupDiv.appendChild(myGroupDivAdmin);

      const myGroupDivMembers = document.createElement("ul");
      myGroupDivMembers.id = "myGroupDivMembers";
      myGroupDiv.appendChild(myGroupDivMembers);

      if (data.userId == account.userId) {
        const fetchOpt = {
          headers: {
            "Content-type": "application/json",
            "x-authtoken": mainToken,
          },
        };
        fetch(`${fetchUrl}/api/groupmembers/${OwnGroup.groupId}`, fetchOpt)
          .then((res) => {
            if (res.status == 200) {
              console.log("status: 200");
              return res.json();
            }
          })
          .then((data) => {
            if (data.groupMembers) {
              data.groupMembers.forEach((member) => {
                const myGroupDivMember = document.createElement("li");
                myGroupDivMember.id = "myGroupDivMember";
                myGroupDivMembers.appendChild(myGroupDivMember);
                const myGroupDivMemberLink = document.createElement("a");
                myGroupDivMemberLink.id = "myGroupDivMemberLink";
                myGroupDivMemberLink.innerText = member.userName;
                myGroupDivMember.appendChild(myGroupDivMemberLink);

                myGroupDivMemberLink.addEventListener("click", () => {
                  myGroupDivMembers.innerHTML = "";
                  const groupMemberElm = document.createElement("div");
                  groupMemberElm.id = "groupMemberElm";
                  myGroupDivMembers.appendChild(groupMemberElm);

                  const groupMemberElmUsername = document.createElement("p");
                  groupMemberElmUsername.id = "groupMemberElmUsername";
                  groupMemberElmUsername.innerText = member.userName;
                  groupMemberElm.appendChild(groupMemberElmUsername);

                  const groupMemberEmail = document.createElement("p");
                  groupMemberEmail.id = "groupMemberEmail";
                  groupMemberEmail.innerText = member.email;
                  groupMemberElm.appendChild(groupMemberEmail);

                  const removeMemberBtn = document.createElement("button");
                  removeMemberBtn.id = "groupMemberEmail";
                  removeMemberBtn.innerText = "remove member";
                  removeMemberBtn.classList.add("btn");
                  groupMemberElm.appendChild(removeMemberBtn);

                  removeMemberBtn.addEventListener("click", () => {
                    groupMemberElm.innerHTML = "";

                    const areYouSure = document.createElement("p");
                    areYouSure.id = "areYouSure";
                    areYouSure.innerText = `are you sured you want to remove ${member.userName} from the group ?`;
                    groupMemberElm.appendChild(areYouSure);

                    const cancelBtn = document.createElement("button");
                    cancelBtn.id = "cancelBtn";
                    cancelBtn.innerText = "cancel";
                    cancelBtn.classList.add("btn");
                    groupMemberElm.appendChild(cancelBtn);
                    cancelBtn.addEventListener("click", () => {
                      window.location.reload();
                    });

                    const removeBtn = document.createElement("button");
                    removeBtn.id = "removeBtn";
                    removeBtn.innerText = "confirm";
                    removeBtn.classList.add("btn");
                    groupMemberElm.appendChild(removeBtn);
                    removeBtn.addEventListener("click", () => {
                      const fetchOpt = {
                        method: "DELETE",
                        headers: {
                          "Content-type": "application/json",
                          "x-authtoken": mainToken,
                        },
                      };
                      fetch(
                        `${fetchUrl}/api/groupmembers/${OwnGroup.groupId}/${member.email}`,
                        fetchOpt
                      )
                        .then((res) => {
                          if (res.status == 200) {
                            console.log("status: 200");
                            return res.json();
                          }
                        })
                        .then((data) => {
                          groupMemberElm.innerHTML = "";
                          const removedMemberCOn = document.createElement("p");
                          removedMemberCOn.id = "removedMember";
                          removedMemberCOn.innerText = `removed ${member.userName} from the group`;
                          groupMemberElm.appendChild(removedMemberCOn);

                          reloadWINDOW = () => {
                            window.location.reload();
                          };

                          setTimeout(reloadWINDOW, 3000);
                        });
                    });
                  });
                });
              });
            }
          });

        const deleteGroupBtn = document.createElement("button");
        deleteGroupBtn.id = "leaveBtn";
        deleteGroupBtn.classList.add("btn");
        deleteGroupBtn.innerText = "delete the group";
        myGroupDiv.appendChild(deleteGroupBtn);

        deleteGroupBtn.addEventListener("click", () => {
          const confirmLeaveDiv = document.createElement("div");
          confirmLeaveDiv.id = "confirmLeaveDiv";
          myGroupDiv.appendChild(confirmLeaveDiv);

          const confirmLeaveP = document.createElement("p");
          confirmLeaveP.id = "confirmLeaveP";
          confirmLeaveP.innerText =
            "Are you sure you want to delete this group?";
          confirmLeaveDiv.appendChild(confirmLeaveP);

          const cancelBtn = document.createElement("button");
          cancelBtn.id = "cancelBtn";
          cancelBtn.innerText = "cancel";
          cancelBtn.classList.add("btn");
          confirmLeaveDiv.appendChild(cancelBtn);
          cancelBtn.addEventListener("click", () => {
            window.location.reload();
          });

          const confirmBtn = document.createElement("button");
          confirmBtn.id = "confirmBtn";
          confirmBtn.innerText = "confirm";
          confirmBtn.classList.add("btn");
          confirmLeaveDiv.appendChild(confirmBtn);
          goBackProfile = () => {
            window.location.href = `${baseUrl}?page=profile`;
          };
          confirmBtn.addEventListener("click", () => {
            const fetchOpt = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                "x-authtoken": mainToken,
              },
            };

            fetch(`${fetchUrl}/api/groups/${OwnGroup.groupId}`, fetchOpt)
              .then((res) => {
                if (res.status == 200) {
                  console.log("status: 200");
                  return res.json();
                }
              })

              .then((data) => {
                const confirmLeaveP = document.createElement("p");
                confirmLeaveP.id = "confirmLeaveP";
                confirmLeaveP.innerText = `deleted ${data.groupName}`;
                confirmLeaveDiv.appendChild(confirmLeaveP);

                ls.removeItem("currentOwnGroup");
                setTimeout(goBackProfile(), 1000);
              });
          });
        });
      }

      if (data.userId != account.userId) {
        console.log(data.FK_userId);
        console.log("not an admin");
        const leaveBtn = document.createElement("button");
        leaveBtn.id = "leaveBtn";
        leaveBtn.classList.add("btn");
        leaveBtn.innerText = "leave the group";
        myGroupDiv.appendChild(leaveBtn);

        leaveBtn.addEventListener("click", () => {
          const confirmLeaveDiv = document.createElement("div");
          confirmLeaveDiv.id = "confirmLeaveDiv";
          myGroupDiv.appendChild(confirmLeaveDiv);

          const confirmLeaveP = document.createElement("p");
          confirmLeaveP.id = "confirmLeaveP";
          confirmLeaveP.innerText =
            "Are you sure you want to leave this group?";
          confirmLeaveDiv.appendChild(confirmLeaveP);

          const cancelBtn = document.createElement("button");
          cancelBtn.id = "cancelBtn";
          cancelBtn.innerText = "cancel";
          cancelBtn.classList.add("btn");
          confirmLeaveDiv.appendChild(cancelBtn);
          cancelBtn.addEventListener("click", () => {
            window.location.reload();
          });

          const confirmBtn = document.createElement("button");
          confirmBtn.id = "confirmBtn";
          confirmBtn.innerText = "confirm";
          confirmBtn.classList.add("btn");
          confirmLeaveDiv.appendChild(confirmBtn);
          goBackProfile = () => {
            window.location.href = `${baseUrl}?page=profile`;
          };
          confirmBtn.addEventListener("click", () => {
            const fetchOpt = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                "x-authtoken": mainToken,
              },
            };

            fetch(
              `${fetchUrl}/api/groupmembers/${OwnGroup.groupId}/${account.userId}`,
              fetchOpt
            )
              .then((res) => {
                if (res.status == 200) {
                  console.log("status: 200");
                  return res.json();
                }
              })

              .then((data) => {
                const confirmLeaveP = document.createElement("p");
                confirmLeaveP.id = "confirmLeaveP";
                confirmLeaveP.innerText = `Left ${data.groupName}`;
                confirmLeaveDiv.appendChild(confirmLeaveP);

                ls.removeItem("currentOwnGroup");
                setTimeout(goBackProfile(), 1000);
              });
          });
        });
      }

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

      //  aside on the Homework page
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

      const upComTaskList = document.createElement("li");
      //console.log(task.displayName)
      upComTaskList.id = "upComTaskList";
      upComTasks.appendChild(upComTaskList);

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

      homeworkBtn.addEventListener("click", (e) => {
        window.location.replace(`${baseUrl}?page=homework`);
      });
      const projectsBtn = document.createElement("a");
      projectsBtn.id = "projectsBtn";
      projectsBtn.innerText = "My Projects";
      projectsBtn.classList.add("operBtns");
      operatingBtnsSect.appendChild(projectsBtn);

      projectsBtn.addEventListener("click", (e) => {
        window.location.replace(`${baseUrl}?page=projects`);
      });

      const assigmentsBtn = document.createElement("a");
      assigmentsBtn.id = "assigmentsBtn";
      assigmentsBtn.innerText = "My Assigments";
      assigmentsBtn.classList.add("operBtns");
      operatingBtnsSect.appendChild(assigmentsBtn);

      assigmentsBtn.addEventListener("click", (e) => {
        window.location.replace(`${baseUrl}?page=assigments`);
      })

      const showAllDone = document.createElement("a");
      showAllDone.id = "showAllDone";
      showAllDone.innerText = "Show All Finished Tasks";
      showAllDone.classList.add("operBtns");
      operatingBtnsSect.appendChild(showAllDone);
    });
};

//getUrl();


//Homework
loadHomeworkPage = () => {
  let account;
  account = JSON.parse(ls.getItem("account"));
  console.log(ls.getItem("account"));

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
  userAccountIcon.src = "./assets/svg/signUp.svg";
  nav.appendChild(userAccountIcon);

  //    Homeworkpage main
  console.log(account.displayName);
  body.appendChild(main);

  //    Homework section
  const myHomework = document.createElement("section");
  myHomework.id = "myHomework";
  main.appendChild(myHomework);

  const myHomeworkHeadline = document.createElement("h3");
  myHomeworkHeadline.id = "myHomeworkHeadline";
  myHomeworkHeadline.innerText = `${account.displayName}'s Homework`;
  myHomework.appendChild(myHomeworkHeadline);

  const myHomeworkDiv = document.createElement("div");
  myHomeworkDiv.id = "myHomeworkDiv";
  myHomework.appendChild(myHomeworkDiv);

  const myHomeworkDivMembers = document.createElement("ul");
  myHomeworkDivMembers.id = "myHomeworkList";
  myHomeworkDiv.appendChild(myHomeworkDivMembers);

  const myHomeworkDivMember = document.createElement("li");
  myHomeworkDivMember.id = "myHomeworkDivMember";
  myHomeworkDivMember.innerText = "Homework List";
  myHomeworkDivMembers.appendChild(myHomeworkDivMember);

  //    HomeworkTask section (on the right side of the screen)
  const homeworkTasks = document.createElement("section");
  homeworkTasks.id = "homeworkTasks";
  main.appendChild(homeworkTasks);

  //    Homework tasks - Create a task button
  const homeworkTasksCreateTaskBtn = document.createElement("button");
  homeworkTasksCreateTaskBtn.id = "homeworkTasksCreateTaskBtn";
  homeworkTasksCreateTaskBtn.innerText = "Create Homework";
  homeworkTasksCreateTaskBtn.classList.add("btn");
  homeworkTasks.appendChild(homeworkTasksCreateTaskBtn);

  //    Homework tasks - upcoming tasks 
  const homeworkTasksUpcoming = document.createElement("div");
  homeworkTasksUpcoming.id = "homeworkTasksUpcoming";
  homeworkTasks.appendChild(homeworkTasksUpcoming);

  const homeworkTasksUpcomingHeadline = document.createElement("h4");
  homeworkTasksUpcomingHeadline.id = "homeworkTasksUpcomingHeadline";
  homeworkTasksUpcomingHeadline.innerText = "Upcoming Homework";
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

  const allHomeworkTasksTable = document.createElement("table");
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

  const upComTaskList = document.createElement("li");
  //console.log(task.displayName);
  upComTaskList.id = "upComTaskList";
  upComTasks.appendChild(upComTaskList);

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

  homeworkBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=homework`);
  });
  const projectsBtn = document.createElement("a");
  projectsBtn.id = "projectsBtn";
  projectsBtn.innerText = "My Projects";
  projectsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(projectsBtn);

  projectsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=projects`);
  });

  const assigmentsBtn = document.createElement("a");
  assigmentsBtn.id = "assigmentsBtn";
  assigmentsBtn.innerText = "My Assigments";
  assigmentsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(assigmentsBtn);

  assigmentsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=assigments`);
  })

  const showAllDone = document.createElement("a");
  showAllDone.id = "showAllDone";
  showAllDone.innerText = "Show All Finished Tasks";
  showAllDone.classList.add("operBtns");
  operatingBtnsSect.appendChild(showAllDone);
};
//My Projects
loadMyProjects = () => {

  body.innerHTML = "";
  body.classList.add("myProjectBody");

  //HEADER
  //   header on the My project page
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
  userAccountIcon.src = "./web_API-dev_examProject-FrontEnd/assets/svg/signUp.svg";
  nav.appendChild(userAccountIcon);


  body.appendChild(main);

  //    Projects section
  const myProject = document.createElement("section");
  myProject.id = "myProject";
  main.appendChild(myProject);

  const myProjectHeadline = document.createElement("h3");
  myProjectHeadline.id = "myProjectHeadline";
  myProjectHeadline.innerText = "My Project";
  myProject.appendChild(myProjectHeadline);

  const myProjectDiv = document.createElement("div");
  myProjectDiv.id = "myProjectDiv";
  myProject.appendChild(myProjectDiv);

  const myProjectDivMembers = document.createElement("ul");
  myProjectDivMembers.id = "myProjectList";
  myProjectDiv.appendChild(myProjectDivMembers);

  const myProjectDivMember = document.createElement("li");
  myProjectDivMember.innerText = "Project List";
  myProjectDivMember.id = "myProjectDivMember";
  myProjectDivMembers.appendChild(myProjectDivMember);

  //    HomeworkTask section (on the right side of the screen)
  const projectTasks = document.createElement("section");
  projectTasks.id = "projectTasks";
  main.appendChild(projectTasks);

  //    Homework tasks - Create a task button
  const projectTasksCreateTaskBtn = document.createElement("button");
  projectTasksCreateTaskBtn.id = "projectTasksCreateTaskBtn";
  projectTasksCreateTaskBtn.innerText = "Create Project";
  projectTasksCreateTaskBtn.classList.add("btn");
  projectTasks.appendChild(projectTasksCreateTaskBtn);

  //    Homework tasks - upcoming tasks 
  const projectTasksUpcoming = document.createElement("div");
  projectTasksUpcoming.id = "projectTasksUpcoming";
  projectTasks.appendChild(projectTasksUpcoming);

  const projectTasksUpcomingHeadline = document.createElement("h4");
  projectTasksUpcomingHeadline.id = "projectTasksUpcomingHeadline";
  projectTasksUpcomingHeadline.innerText = "Upcoming Homework";
  projectTasksUpcoming.appendChild(projectTasksUpcomingHeadline);

  const borderProjectTasksUpcTop = document.createElement("div");
  borderProjectTasksUpcTop.id = "borderProjectTasksUpcTop";
  borderProjectTasksUpcTop.classList.add("borderHorizontal");
  projectTasksUpcoming.appendChild(borderProjectTasksUpcTop);


  //   Table to store upcoming tasks
  const projectTasksUpcShow = document.createElement("table");
  projectTasksUpcShow.id = "projectTasksUpcShow";
  projectTasksUpcoming.appendChild(projectTasksUpcShow);

  const projectTasksUpcShowTr = document.createElement("tr");
  projectTasksUpcShowTr.id = "projectTasksUpcShowTr";
  projectTasksUpcShow.appendChild(projectTasksUpcShowTr);

  const projectTasksUpcShowTaskName = document.createElement("td");
  projectTasksUpcShowTaskName.id = "projectTasksUpcShowTaskName";
  projectTasksUpcShowTaskName.innerText = "Task Name";
  projectTasksUpcShowTr.appendChild(projectTasksUpcShowTaskName);

  const projectTasksUpcShowTaskColor = document.createElement("td");
  projectTasksUpcShowTaskColor.id = "projectTasksUpcShowTaskColor";
  projectTasksUpcShowTaskColor.innerText = "Task Type";
  projectTasksUpcShowTr.appendChild(projectTasksUpcShowTaskColor);

  const borderProjectTasksUpcBottom = document.createElement("div");
  borderProjectTasksUpcBottom.id = "borderProjectTasksUpcBottom";
  borderProjectTasksUpcBottom.classList.add("borderHorizontal");
  projectTasksUpcoming.appendChild(borderProjectTasksUpcBottom);


  //    Section to store all the homework's tasks
  const allProjectTasks = document.createElement("section");
  allProjectTasks.id = "allProjectTasks";
  main.appendChild(allProjectTasks);

  const allProjectTasksHeadline = document.createElement("h3");
  allProjectTasksHeadline.id = "allProjectTasksHeadline";
  allProjectTasks.appendChild(allProjectTasksHeadline);

  const allProjectTasksTable = document.createElement("table");
  allProjectTasksTable.id = "allProjectTasksTable";
  allProjectTasks.appendChild(allProjectTasksTable);

  const allProjectTasksTableTr = document.createElement("tr");
  allProjectTasksTableTr.id = "allProjectTasksTableTr";
  allProjectTasksTable.appendChild(allProjectTasksTableTr);

  const allProjectTasksTableTaskName = document.createElement("th");
  allProjectTasksTableTaskName.id = "allProjectTasksTableTaskName";
  allProjectTasksTableTaskName.innerText = "Task Name";
  allProjectTasksTableTr.appendChild(allProjectTasksTableTaskName);

  const allProjectTasksTableTaskAssignedTo = document.createElement("th");
  allProjectTasksTableTaskAssignedTo.id = "allProjectTasksTableTaskAssignedTo";
  allProjectTasksTableTaskAssignedTo.innerText = "Assigned To";
  allProjectTasksTableTr.appendChild(allProjectTasksTableTaskAssignedTo);

  const allProjectTasksTableTaskDueDate = document.createElement("th");
  allProjectTasksTableTaskDueDate.id = "allProjectTasksTableTaskDueDate";
  allProjectTasksTableTaskDueDate.innerText = "Due Date";
  allProjectTasksTableTr.appendChild(allProjectTasksTableTaskDueDate);

  const allProjectTasksTableTaskStatus = document.createElement("th");
  allProjectTasksTableTaskStatus.id = "allProjectTasksTableTaskStatus";
  allProjectTasksTableTaskStatus.innerText = "Status";
  allProjectTasksTableTr.appendChild(allProjectTasksTableTaskStatus);

  const allProjectTasksTableTaskLabel = document.createElement("th");
  allProjectTasksTableTaskLabel.id = "allProjectTasksTableTaskLabel";
  allProjectTasksTableTaskLabel.innerText = "Task Label";
  allProjectTasksTableTr.appendChild(allProjectTasksTableTaskLabel);





  //  aside on the Homework page
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

  const upComTaskList = document.createElement("li");
  //console.log(task.displayName)
  upComTaskList.id = "upComTaskList";
  upComTasks.appendChild(upComTaskList);

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

  homeworkBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=homework`);
  });
  const projectsBtn = document.createElement("a");
  projectsBtn.id = "projectsBtn";
  projectsBtn.innerText = "My Projects";
  projectsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(projectsBtn);

  projectsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=projects`);
  });

  const assigmentsBtn = document.createElement("a");
  assigmentsBtn.id = "assigmentsBtn";
  assigmentsBtn.innerText = "My Assigments";
  assigmentsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(assigmentsBtn);

  assigmentsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=assigments`);
  })

  const showAllDone = document.createElement("a");
  showAllDone.id = "showAllDone";
  showAllDone.innerText = "Show All Finished Tasks";
  showAllDone.classList.add("operBtns");
  operatingBtnsSect.appendChild(showAllDone);
};

//Assignemts
loadAssigments = () => {

  body.innerHTML = "";
  body.classList.add("assigmentsBody");

  //HEADER
  //   header on the Assigment page
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
  userAccountIcon.src = "./assets/svg/signUp.svg";
  nav.appendChild(userAccountIcon);


  body.appendChild(main);

  //    Assigment section
  const myAssigment = document.createElement("section");
  myAssigment.id = "myAssigment";
  main.appendChild(myAssigment);

  const myAssigmentHeadline = document.createElement("h3");
  myAssigmentHeadline.id = "myAssigmentHeadline";
  myAssigmentHeadline.innerText = "My Assigment";
  myAssigment.appendChild(myAssigmentHeadline);

  const myAssigmentDiv = document.createElement("div");
  myAssigmentDiv.id = "myAssigmentDiv";
  myAssigment.appendChild(myAssigmentDiv);

  const myAssigmentDivMembers = document.createElement("ul");
  myAssigmentDivMembers.id = "myAssigmentList";
  myAssigmentDiv.appendChild(myAssigmentDivMembers);

  const myAssigmentDivMember = document.createElement("li");
  myAssigmentDivMember.id = "myAssigmentDivMember";
  myAssigmentDivMember.innerText = "Assigment List";
  myAssigmentDivMembers.appendChild(myAssigmentDivMember);

  //     section (on the right side of the screen)
  const assigmentTasks = document.createElement("section");
  assigmentTasks.id = "assigmentTasks";
  main.appendChild(assigmentTasks);

  //    Create a task button
  const assigmentTasksCreateTaskBtn = document.createElement("button");
  assigmentTasksCreateTaskBtn.id = "assigmentTasksCreateTaskBtn";
  assigmentTasksCreateTaskBtn.innerText = "Create Assign";
  assigmentTasksCreateTaskBtn.classList.add("btn");
  assigmentTasks.appendChild(assigmentTasksCreateTaskBtn);

  //   tasks - upcoming tasks 
  const assigmentTasksUpcoming = document.createElement("div");
  assigmentTasksUpcoming.id = "assigmentTasksUpcoming";
  assigmentTasks.appendChild(assigmentTasksUpcoming);

  const assigmentTasksUpcomingHeadline = document.createElement("h4");
  assigmentTasksUpcomingHeadline.id = "assigmentTasksUpcomingHeadline";
  assigmentTasksUpcomingHeadline.innerText = "Upcoming Homework";
  assigmentTasksUpcoming.appendChild(assigmentTasksUpcomingHeadline);

  const borderAssigmentTasksUpcTop = document.createElement("div");
  borderAssigmentTasksUpcTop.id = "borderAssigmentTasksUpcTop";
  borderAssigmentTasksUpcTop.classList.add("borderHorizontal");
  assigmentTasksUpcoming.appendChild(borderAssigmentTasksUpcTop);


  //   Table to store upcoming tasks
  const assigmentTasksUpcShow = document.createElement("table");
  assigmentTasksUpcShow.id = "assigmentTasksUpcShow";
  assigmentTasksUpcoming.appendChild(assigmentTasksUpcShow);

  const assigmentTasksUpcShowTr = document.createElement("tr");
  assigmentTasksUpcShowTr.id = "assigmentTasksUpcShowTr";
  assigmentTasksUpcShow.appendChild(assigmentTasksUpcShowTr);

  const assigmentTasksUpcShowTaskName = document.createElement("td");
  assigmentTasksUpcShowTaskName.id = "assigmentTasksUpcShowTaskName";
  assigmentTasksUpcShowTaskName.innerText = "Task Name";
  assigmentTasksUpcShowTr.appendChild(assigmentTasksUpcShowTaskName);

  const assigmentTasksUpcShowTaskColor = document.createElement("td");
  assigmentTasksUpcShowTaskColor.id = "assigmentTasksUpcShowTaskColor";
  assigmentTasksUpcShowTaskColor.innerText = "Task Type";
  assigmentTasksUpcShowTr.appendChild(assigmentTasksUpcShowTaskColor);

  const borderAssigmentTasksUpcBottom = document.createElement("div");
  borderAssigmentTasksUpcBottom.id = "borderAssigmentTasksUpcBottom";
  borderAssigmentTasksUpcBottom.classList.add("borderHorizontal");
  assigmentTasksUpcoming.appendChild(borderAssigmentTasksUpcBottom);


  //    Section to store all the homework's tasks
  const allAssigmentTasks = document.createElement("section");
  allAssigmentTasks.id = "allAssigmentTasks";
  main.appendChild(allAssigmentTasks);

  const allAssigmentTasksHeadline = document.createElement("h3");
  allAssigmentTasksHeadline.id = "allAssigmentTasksHeadline";
  allAssigmentTasks.appendChild(allAssigmentTasksHeadline);

  const allAssigmentTasksTable = document.createElement("table");
  allAssigmentTasksTable.id = "allAssigmentTasksTable";
  allAssigmentTasks.appendChild(allAssigmentTasksTable);

  const allAssigmentTasksTableTr = document.createElement("tr");
  allAssigmentTasksTableTr.id = "allAssigmentTasksTableTr";
  allAssigmentTasksTable.appendChild(allAssigmentTasksTableTr);

  const allAssigmentTasksTableTaskName = document.createElement("th");
  allAssigmentTasksTableTaskName.id = "allAssigmentTasksTableTaskName";
  allAssigmentTasksTableTaskName.innerText = "Task Name";
  allAssigmentTasksTableTr.appendChild(allAssigmentTasksTableTaskName);

  const allAssigmentTasksTableTaskAssignedTo = document.createElement("th");
  allAssigmentTasksTableTaskAssignedTo.id = "allAssigmentTasksTableTaskAssignedTo";
  allAssigmentTasksTableTaskAssignedTo.innerText = "Assigned To";
  allAssigmentTasksTableTr.appendChild(allAssigmentTasksTableTaskAssignedTo);

  const allAssigmentTasksTableTaskDueDate = document.createElement("th");
  allAssigmentTasksTableTaskDueDate.id = "allAssigmentTasksTableTaskDueDate";
  allAssigmentTasksTableTaskDueDate.innerText = "Due Date";
  allAssigmentTasksTableTr.appendChild(allAssigmentTasksTableTaskDueDate);

  const allAssigmentTasksTableTaskStatus = document.createElement("th");
  allAssigmentTasksTableTaskStatus.id = "allAssigmentTasksTableTaskStatus";
  allAssigmentTasksTableTaskStatus.innerText = "Status";
  allAssigmentTasksTableTr.appendChild(allAssigmentTasksTableTaskStatus);

  const allAssigmentTasksTableTaskLabel = document.createElement("th");
  allAssigmentTasksTableTaskLabel.id = "allAssigmentTasksTableTaskLabel";
  allAssigmentTasksTableTaskLabel.innerText = "Task Label";
  allAssigmentTasksTableTr.appendChild(allAssigmentTasksTableTaskLabel);



  //  aside on the Homework page
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

  const upComTaskList = document.createElement("li");
  //console.log(task.displayName)
  upComTaskList.id = "upComTaskList";
  upComTasks.appendChild(upComTaskList);

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

  homeworkBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=homework`);
  });
  const projectsBtn = document.createElement("a");
  projectsBtn.id = "projectsBtn";
  projectsBtn.innerText = "My Projects";
  projectsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(projectsBtn);

  projectsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=projects`);
  });

  const assigmentsBtn = document.createElement("a");
  assigmentsBtn.id = "assigmentsBtn";
  assigmentsBtn.innerText = "My Assigments";
  assigmentsBtn.classList.add("operBtns");
  operatingBtnsSect.appendChild(assigmentsBtn);

  assigmentsBtn.addEventListener("click", (e) => {
    window.location.replace(`${baseUrl}?page=assigments`);
  })

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

      switch (pageName) {
        case "login":
          loadSinglelogPage();
          break;

        case "signUp":
          loadSignUpPage();
          break;

        case "createAccount":
          console.log("you are on create account page");
          loadCreateAccountPage();
          break;

        case "signIn":
          loadSinglelogPage();
          break;

        case "profile":
          console.log("you are on profile page");
          loadProfilePage();
          break;

        case "group":
          console.log("you are on group page");
          loadGroupPage();
          break;
        case "homework":
          console.log("you are on homework page");
          loadHomeworkPage();
          break;
        case "assigments":
          console.log("you are on assigments page");
          loadAssigments();
          break;
        case "projects":
          console.log("you are on projects page");
          loadMyProjects();
          break;

        default:
          break;
      }
    }
  }
});
