class ManagerRecepti {
    constructor() {
        this.recepti = [];
        this.created = [];
        if (localStorage.getItem("creat")) {
            this.created = JSON.parse(localStorage.getItem("creat"))
        } else {
            this.created = [
                new Recepta("create", "create", "create", "create")
            ];
            localStorage.setItem("creat", JSON.stringify(this.created));
        }
    }
    add(recepta) {
        if (this.recepti.indexOf(recepta) === -1) {
            this.recepti.push(recepta);
        }
    }
    addCreated(recepta) {
        if (this.created.indexOf(recepta) === -1) {
            this.created.push(recepta);
        }
    }
    filter(text) {
        let filtered = [];
        text = text.toLowerCase()
        if (typeof(text) === "string" && text.trim().length > 0) {
            this.recepti.filter(e => {
                if (e.title.toLowerCase().includes(text)) {
                    filtered.push(e)
                }
            });

        }
        return filtered;
    }
    filterIng() {
        let arrIngForAllRecept = [];
        let ingArr = this.recepti.map(e => {
            return e.ingredients.split(", ")
        });
        ingArr.map(e => e.forEach(ing => {
            arrIngForAllRecept.push(ing)
        }));
        return arrIngForAllRecept;

    };
    filterSelectRecepti(option) {
        let selectFilter = [];
        this.recepti.map(e => {
            return e.ingredients.split(", ").forEach(arrIng => {
                if (arrIng === option) {
                    selectFilter.push(e);
                }
            });
        });
        return selectFilter;

    };





}