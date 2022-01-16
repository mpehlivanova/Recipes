class Recepta {

    constructor(href, ingredients, thumbnail, title) {
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
        this.title = title;
        this.cook = 0;
    }
}
class UserRecept {
    constructor() {
        // this.liked = [];
        if (localStorage.getItem("like")) {
            this.liked = JSON.parse(localStorage.getItem("like"))
        } else {
            this.liked = [
                new Recepta("testLike", "testLike", "testLike", "testLike")
            ];
            localStorage.setItem("like", JSON.stringify(this.liked));
        }
        // this.cooked = [];
        if (localStorage.getItem("cook")) {
            this.cooked = JSON.parse(localStorage.getItem("cook"))
        } else {
            this.cooked = [
                new Recepta("testcook", "testcook", "testcook", "testcook")
            ];
            localStorage.setItem("cook", JSON.stringify(this.cooked));
        }

    }
    like(recepta) {
        let index = this.liked.indexOf(recepta);
        if (index === -1) {
            this.liked.push(recepta);
            localStorage.setItem("like", JSON.stringify(this.liked));
        }

    }
    isLike(recepta) {
        return this.liked.indexOf(recepta) !== -1

    }
    unlike(recepta) {
        let index = this.liked.indexOf(recepta);
        if (index !== -1)
            this.liked.splice(index, 1);


    }

    cook(recepta) {
        let index = this.cooked.indexOf(recepta);
        if (index === -1) {
            this.cooked.push(recepta);
            localStorage.setItem("cook", JSON.stringify(this.cooked));
        }
    }
    isCook(recepta) {
        return this.cooked.indexOf(recepta) !== -1

    }
    unCook(recepta) {
        let index = this.cooked.indexOf(recepta);
        if (index !== -1)
            this.cooked.splice(index, 1);


    }

}