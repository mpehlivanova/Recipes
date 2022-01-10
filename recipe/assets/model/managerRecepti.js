class ManagerRecepti {
    constructor() {
        this.recepti = [];
    }
    add(recepta) {
        if (this.recepti.indexOf(recepta) === -1) {
            this.recepti.push(recepta);
        }
    }
    filter(text) {
        let filtered = [];
        text = text.toLowerCase()
        if (typeof(text) === "string" && text.trim().length > 0) {
            for (let i = 0; i < this.recepti.length; i++) {
                let recepta = this.recepti[i];
                if (recepta.title.toLowerCase().includes(text)) {
                    filtered.push(recepta)
                }

            }
        }
        return filtered;
    }
    filterIng() {
        let filteredIng = [];
        for (let i = 0; i < this.recepti.length; i++) {
            let ingredients = this.recepti[i].ingredients.split(", ")
            for (let j = 0; j < ingredients.length; j++) {
                if (filteredIng.indexOf(ingredients[j]) === -1) {
                    filteredIng.push(ingredients[j]);
                }
            }
        }
        for (let k = 0; k < filteredIng.length; k++) {
            let option = document.createElement("option")
            let select = document.getElementById("select")
            option.innerHTML = filteredIng[k];
            select.appendChild(option);
        }
    }

    filterSelectRecepti(option) {
        let selectFilter = [];
        for (let i = 0; i < this.recepti.length; i++) {
            let recepta = this.recepti[i];
            let ingredients = recepta.ingredients.split(", ")
            for (let j = 0; j < ingredients.length; j++) {
                if (ingredients[j] === option) {
                    selectFilter.push(recepta);
                }
            }
        }
        return selectFilter;
    }

    checkProfil(name, age, address, img, button) {
        if (name.length != 0 && age.length != 0 &&
            address.length != 0 && img.length != 0) {
            if (typeof name != "string") {
                name = document.getElementById("profilName").style.color = "red";
                button = button.disabled = true;
            }
            if (typeof age != "number" && age < 0) {
                age = document.getElementById("profilAge").style.color = "red";
                button = button.disabled = true;
            }
            button = button.disabled = false;
        }

    }

    checkAddReceptaBtn(arr, button) {
        let IsEverythingFilled = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value.length === 0) {
                IsEverythingFilled = false;
            }
        }
        if (IsEverythingFilled) {
            button = button.disabled = false;
        } else {
            button = button.disabled = true;
        }
    }

}