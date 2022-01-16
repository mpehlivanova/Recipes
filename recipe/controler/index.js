let userRecept = new UserRecept();
let manager = new ManagerRecepti();
let check = new Check();
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
console.log(manager.created);

// създаване на рецепта
//............tempalyt...........?
// let recepts = document.getElementById("cardRecepti").innerHTML;
//............tempalyt...........?

function printRecepti(recepti, conteiner) {
    //............tempalyt...........
    // let template = Handlebars.compile(recepts);
    //............tempalyt...........
    conteiner.innerHTML = "";
    for (let i = recepti.length - 1; i >= 0; i--) {

        let recepta = recepti[i];

        let card = createElement("div");
        card.id = "oneCard";

        let img = createElement("img");
        img.src = recepta.thumbnail;
        img.alt = "photo";

        let link = createElement("a");
        link.href = recepta.href;

        link.append(img)

        let h3 = createElement("h3");
        h3.innerHTML = recepta.title;


        let p = createElement("p");
        p.innerText = recepta.ingredients;

        let cardButton = createElement("div");
        cardButton.id = "cardButton";

        let buttonFavorite = createElement("button");

        buttonFavorite.id = "addLikeButton";
        //............tempalyt...........
        // let recepta = recepti[i];
        // let htmlRecept = template(recepta);
        // conteiner.innerHTML += htmlRecept;
        // let buttonFavorite = document.getElementById("addLikeButton");
        //............tempalyt...........

        if (userRecept.isLike(recepta)) {
            buttonFavorite.innerText = "Премахни от любими";
            buttonFavorite.addEventListener("click", function() {
                userRecept.unlike(recepta);
                hasChangePage();
            });
        } else {
            buttonFavorite.innerText = "Добави в любими";
            buttonFavorite.addEventListener("click", function() {
                userRecept.like(recepta);
                hasChangePage();
            });
        }
        let cookButton = createElement("button");
        cookButton.classList.add = "receptButton";
        cookButton.id = "cookButton";
        cookButton.innerText = "Сготви";
        cookButton.addEventListener("click", function() {
            userRecept.cook(recepta);
            recepta.cook++;
            cookRecept();
            hasChangePage();
        });


        cardButton.append(buttonFavorite, cookButton);
        card.append(link, h3, p, cardButton);
        conteiner.append(card);

    }
}
// таблица със сготвени ястия - tempalyt?
function cookRecept() {
    let tableCook = getById("tableCook");

    tableCook.innerHTML = `<tr>
        <th>Име на сготвените ястия</th>
        <th>Брой готвения</th>
        <th>Снимка</th>
        </tr>`;
    for (let i = 0; i < userRecept.cooked.length; i++) {
        let tr = createElement("tr");
        tableCook.appendChild(tr);
        tr.innerHTML = `
                <td>${userRecept.cooked[i].title}</td>
                <td>${userRecept.cooked[i].cook}</td>
                <td><img src=${userRecept.cooked[i].thumbnail} alt="photo" width="50px"</td>
            `
    }
}

// филтър по име на рецепта
let filter = getById("inputName")
filter.addEventListener("keyup", function(ev) {
    let text = ev.target.value;
    let filterd = manager.filter(text);
    printRecepti(filterd, allCard)
});

// филтър съставки

let select = getById("select");
let addAllIngInSelection = false;
select.addEventListener("click", function() {

    if (!addAllIngInSelection) {
        let ing = manager.filterIng();
        ing.forEach(element => {
            let option = createElement("option")
            option.innerHTML = element;
            select.appendChild(option);
        });
    }
    addAllIngInSelection = true;
});

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


// съзадаване на рецепта
function submitRecepta() {
    let createReceptaForm = getByClass("createReceptaForm");
    let newRecepta = new Recepta(
        createReceptaForm[2].value.trim(),
        createReceptaForm[1].value.trim(),
        createReceptaForm[3].value.trim(),
        createReceptaForm[0].value.trim(),
    );
    manager.addCreated(newRecepta);
    manager.add(newRecepta);

}
//Бутона остава не актвен докато не са запълнени всички полетата 
let addReceptaBtn = getById("addReceptaBtn");
let formCreateRecepta = getById("createRecepta");
formCreateRecepta.addEventListener("keyup", function() {
    let createReceptaForm = getByClass("createReceptaForm");
    check.isFullFilds(createReceptaForm, addReceptaBtn);
});

addReceptaBtn.addEventListener("click", function(ev) {
    submitRecepta();
});