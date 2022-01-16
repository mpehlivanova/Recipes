//Login
let loginName = getById("loginName");
let loginPass = getById("loginPass");
let loginForm = getById("loginProfil");
let loginButton = getById("loginProfilBtn");
let errorPassLoginText = getById("errorPassLogin");


//register
let registerButton = getById("regisretButton");
let regForm = getById("registerProfil")
let createRegButton = getById("creatProfilBtn");
let inPrifilButton = getById("inProfilBtn");
let regErrorPassText = getById("regErrorPass");
let arrRegister = getByClass("register");

let [regName, regAge, regAddress, pass1, pass2, url] = arrRegister;
console.log(url);
console.log(url.value);

let loginDiv = getById("loginDiv");
let myProfilPageDiv = getById("myProfilPage");
let registerPageDiv = getById("registerDiv");


myProfilPageDiv.style.display = "none";
registerPageDiv.style.display = "none";
regErrorPassText.style.display = "none";
errorPassLoginText.style.display = "none";

//проверка за бутона, ако се полълнение полетата да стане активен
loginForm.addEventListener("keyup", function() {
    check.loginCheck(loginName, loginPass, loginButton)
});
// логване на потребител
loginButton.addEventListener("click", function(ev) {
    ev.preventDefault();

    let myProfilSrc = getById("myProfilSrc");
    let headerImg = getById("headerImg");
    let username = loginName.value.trim();
    let pass = loginPass.value.trim();
    if (userStorage.extractUser(username)) {
        pass = loginPass.value.trim();
        if (userStorage.validadteUser(username, pass)) {
            errorPassLoginText.style.display = "none";
            registerPageDiv.style.display = "none";
            myProfilPageDiv.style.display = "flex";
            loginDiv.style.display = "none";
            headerImg.src = url.value;
            myProfilSrc.src = url.value;



        } else {
            errorPassLoginText.style.display = "block";
            errorPassLoginText.innerHTML = "Невалидна парола";
        }
    } else {
        errorPassLoginText.style.display = "block";
        errorPassLoginText.innerHTML = "Не съществува потебител с това име";
    }
});
// при натискае на бутон регистрация - показва полетат за регистрация
registerButton.addEventListener("click", function(ev) {
    ev.preventDefault();
    registerPageDiv.style.display = "block";

});

//прверка дали всички полета са запълнени 
regForm.addEventListener("keyup", function() {
    check.isFullFilds(arrRegister, createRegButton)
});
//създаване на профил
createRegButton.addEventListener("click", function(ev) {
    ev.preventDefault();
    if (pass1.value.trim() !== pass2.value.trim()) {
        regErrorPassText.style.display = "block";
        regErrorPassText.innerHTML = "Грешна парола";
    } else {
        if (userStorage.extractUser(regName.value.trim())) {
            regErrorPassText.style.display = "block";
            regErrorPassText.innerHTML = "Съществува потребил с това име";
        } else {
            let user = regName.value.trim();
            let pass = pass1.value.trim();
            userStorage.addUser(user, pass);
            // check.clearInput(arrRegister);
            registerPageDiv.style.display = "none";


        }
    }

});