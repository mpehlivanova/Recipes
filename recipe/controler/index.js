(function() {

    let all = document.getElementById("all");
    let favorite = document.getElementById("favorite");
    let create = document.getElementById("create");
    let profil = document.getElementById("myProfil");
    let error = document.getElementById("error");
    let allCard = document.getElementById("allCards");

    let user = new User();
    let manager = new ManagerRecepti();
    for (let i = 0; i < inputOfAllRecipes.length; i++) {
        let obj = inputOfAllRecipes[i];
        let recepta = new Recepta(
            obj.href,
            obj.ingredients,
            obj.thumbnail,
            obj.title
        );
        manager.add(recepta);
    }

    console.log(manager.recepti);

    //рутер

    let hasChangePage = function() {
        let hash = location.hash.slice(1);
        switch (hash) {
            case "allReceptPage":
                all.style.display = "flex";
                favorite.style.display = "none";
                create.style.display = "none";
                profil.style.display = "none";
                error.style.display = "none";
                printRecepti(manager.recepti, allCard);
                break;
            case "favoriteReceptPage":
                all.style.display = "none";
                favorite.style.display = "flex";
                create.style.display = "none";
                profil.style.display = "none";
                error.style.display = "none";
                printRecepti(user.liked, favorite);
                break;
            case "createReceptPage":
                all.style.display = "none";
                favorite.style.display = "none";
                create.style.display = "flex";
                profil.style.display = "none";
                error.style.display = "none";
                break;
            case "myProfilPage":
                all.style.display = "none";
                favorite.style.display = "none";
                create.style.display = "none";
                profil.style.display = "flex";
                error.style.display = "none";

                break;
            default:
                all.style.display = "flex";
                favorite.style.display = "none";
                create.style.display = "none";
                profil.style.display = "none";
                error.style.display = "none";
                printRecepti(manager.recepti, allCard);
                break;
        }
    };
    window.addEventListener("load", hasChangePage);
    window.addEventListener("hashchange", hasChangePage);
    //debugger;

    // създаване на рецепта

    let recepts = document.getElementById("cardRecepti").innerHTML;




    function printRecepti(recepti, conteiner) {
        let template = Handlebars.compile(recepts);
        conteiner.innerHTML = "";
        for (let i = recepti.length - 1; i >= 0; i--) {

            // let recepta = recepti[i];

            // let card = document.createElement("div");
            // card.id = "oneCard";

            // let img = document.createElement("img");
            // img.src = recepta.thumbnail;
            // img.alt = "photo";

            // let link = document.createElement("a");
            // link.href = recepta.href;

            // link.append(img)

            // let h3 = document.createElement("h3");
            // h3.innerHTML = recepta.title;


            // let p = document.createElement("p");
            // p.innerText = recepta.ingredients;

            // let cardButton = document.createElement("div");
            // cardButton.id = "cardButton";

            // let buttonFavorite = document.createElement("button");

            // buttonFavorite.id = "addLikeButton";
            let recepta = recepti[i];
            let htmlRecept = template(recepta);
            conteiner.innerHTML += htmlRecept;
            let buttonFavorite = document.getElementById("addLikeButton");
            // debugger;
            if (user.isLike(recepta)) {
                buttonFavorite.innerText = "Премахни от любими";
                buttonFavorite.addEventListener("click", function() {
                    debugger;
                    user.unlike(recepta);
                    hasChangePage();
                });
            } else {
                buttonFavorite.innerText = "Добави в любими";
                buttonFavorite.addEventListener("click", function() {
                    user.like(recepta);
                    hasChangePage();
                });
            }
            // let buttonCook = document.createElement("button");
            // buttonCook.classList.add = "receptButton";
            // buttonCook.id = "cookButton";

            // buttonCook.innerText = "Сготви";
            let buttonCook = document.getElementById("cookButton");
            buttonCook.addEventListener("click", function() {
                user.cook(recepta);
                recepta.cook++;
                cookRecept();
                hasChangePage();
            });


            // cardButton.append(buttonFavorite, buttonCook);
            // card.append(link, h3, p, cardButton);
            // conteiner.append(card);

        }
    }
    // таблица със сготвени ястия
    function cookRecept() {
        let tableCook = document.getElementById("tableCook");

        tableCook.innerHTML = `<tr>
        <th>Име на сготвените ястия</th>
        <th>Брой готвения</th>
        <th>Снимка</th>
        </tr>`;
        for (let i = 0; i < user.cooked.length; i++) {
            let tr = document.createElement("tr");
            tableCook.appendChild(tr);
            tr.innerHTML = `
                <td>${user.cooked[i].title}</td>
                <td>${user.cooked[i].cook}</td>
                <td><img src=${user.cooked[i].thumbnail} alt="photo" width="50px"</td>
            `
        }
    }

    // филтър по име на рецепта
    let filter = document.getElementById("inputName")
    filter.addEventListener("keyup", function(ev) {
        let text = ev.target.value;
        let filterd = manager.filter(text);
        printRecepti(filterd, allCard)
    });

    // филтър съставки

    let select = document.getElementById("select")
    select.addEventListener("click", function() {
        manager.filterIng();
    });
    //debugger;

    select.addEventListener("change", function(ev) {
        let index = ev.target.selectedIndex
        if (ev.target.options[index].text === "Всички съставки") {
            printRecepti(manager.recepti, allCard)
        } else {
            let option = ev.target.options[index].text;
            let rezult = manager.filterSelectRecepti(option);
            // let rezult = manager.recepti.filter(e => e.ingredients.includes(option));
            printRecepti(rezult, allCard);
        }
    });

    // създаване на профил
    function createProfil() {
        let button = document.getElementById("creatProfilBtn");
        let editProfil = document.getElementById("editProfil");
        editProfil.innerHTML = "";

        let name = document.getElementById("profilName").value.trim();
        let age = document.getElementById("profilAge").value.trim();
        let address = document.getElementById("profilAddress").value.trim();
        let img = document.getElementById("profilPhoto").value.trim();

        let headerImg = document.getElementById("headerImg");
        headerImg.setAttribute("src", img);
        let myProfilPhoto = document.getElementById("myProfilPhoto");

        myProfilPhoto.setAttribute("src", img);
        editProfil.innerHTML = `
                   <tr><td><h3>Име: ${name}</h3></td></tr>
                   <tr><td><p>Години: ${age}</p></td></tr>
                   <tr><td><p>Адрес: ${address}</p></td></tr>
                   `
        checkProfil(name, age, address, img, button);


    }
    // редактране на профил
    function editProfil() {
        let editProfil = document.getElementById("editProfil");
        let name = document.getElementById("profilName").value = "";
        let age = document.getElementById("profilAge").value = "";
        let address = document.getElementById("profilAddress").value = "";
        let img = document.getElementById("profilPhoto").value = "";
        editProfil.innerHTML = `
        <tr><td><h3>Име: ${name}</h3></td></tr>
        <tr><td><p>Години: ${age}</p></td></tr>
        <tr><td><p>Адрес: ${address}</p></td></tr>
        <tr><td><p>Адрес: ${img}</p></td></tr>
        `

    }


    let formProfil = document.getElementById("formProfil");
    formProfil.addEventListener("keyup", function() {
        let buttonCreat = document.getElementById("creatProfilBtn");
        let buttonEdit = document.getElementById("editProfilBtn");
        let name = document.getElementById("profilName").value.trim();
        let age = document.getElementById("profilAge").value.trim();
        let address = document.getElementById("profilAddress").value.trim();
        let img = document.getElementById("profilPhoto").value.trim();
        manager.checkProfil(name, age, address, img, buttonCreat);
        manager.checkProfil(name, age, address, img, buttonEdit);

    });
    let creatProfilBtn = document.getElementById("creatProfilBtn");
    creatProfilBtn.addEventListener("click", function(ev) {
        ev.preventDefault();
        createProfil();
    });

    let editProfilBtn = document.getElementById("editProfilBtn");
    editProfilBtn.addEventListener("click", function(ev) {
        ev.preventDefault();
        editProfil();

    });

    // съзадаване на рецепта
    function submitRecepta() {
        let addReceptaBtn = document.getElementById("addReceptaBtn");
        let createReceptaForm = document.getElementsByClassName("createReceptaForm");
        let newRecepta = new Recepta(
            createReceptaForm[2].value.trim(),
            createReceptaForm[1].value.trim(),
            createReceptaForm[3].value.trim(),
            createReceptaForm[0].value.trim(),
        );
        manager.add(newRecepta);
        // manager.checkAddReceptaBtn(createReceptaForm, addReceptaBtn);

    }


    let addReceptaBtn = document.getElementById("addReceptaBtn");
    let formCreateRecepta = document.getElementById("createRecepta");
    formCreateRecepta.addEventListener("keyup", function() {
        let createReceptaForm = document.getElementsByClassName("createReceptaForm");
        manager.checkAddReceptaBtn(createReceptaForm, addReceptaBtn);
    });

    addReceptaBtn.addEventListener("click", function(ev) {
        ev.preventDefault();
        submitRecepta();
    });


})();