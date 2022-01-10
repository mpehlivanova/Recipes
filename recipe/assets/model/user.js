class User {
    constructor() {
        this.liked = [];
        this.cooked = [];
    }
    like(recepta) {
        let index = this.liked.indexOf(recepta);
        if (index === -1) {
            this.liked.push(recepta);
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
        console.log(index);
        if (index === -1) {
            this.cooked.push(recepta);

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