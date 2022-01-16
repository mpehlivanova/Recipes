let all = getById("all");
let favorite = getById("favorite");
let create = getById("create");
let profil = getById("myProfil");
let error = getById("error");
let allCard = getById("allCards");
let conteinerCreatetRecept = getById("tableCookRecept")



function hasChangePage() {

    let hash = location.hash.slice(1);

    switch (hash) {
        case "":
            all.style.display = "flex";
            favorite.style.display = "none";
            create.style.display = "none";
            profil.style.display = "none";
            error.style.display = "none";
            printRecepti(manager.recepti, allCard)
            break;

        case "allReceptPage":
            all.style.display = "flex";
            favorite.style.display = "none";
            create.style.display = "none";
            profil.style.display = "none";
            error.style.display = "none";
            printRecepti(manager.recepti, allCard)
            break;
        case "favoriteReceptPage":
            all.style.display = "none";
            favorite.style.display = "flex";
            create.style.display = "none";
            profil.style.display = "none";
            error.style.display = "none";
            printRecepti(userRecept.liked, favorite)
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
            // printRecepti(userRecept.created, conteinerCreatetRecept)
            break;
        default:
            all.style.display = "flex";
            favorite.style.display = "none";
            create.style.display = "none";
            profil.style.display = "none";
            error.style.display = "none";
            printRecepti(manager.recepti, allCard);
            break;

    };
};
window.addEventListener("load", hasChangePage);
window.addEventListener("hashchange", hasChangePage);