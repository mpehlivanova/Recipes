class Recepta {

    constructor(href, ingredients, thumbnail, title) {
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
        this.title = title;
        this.cook = 0;
    }
}
class Potrebitel {
    constructor(name, age, address, img) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.img = img;
    }
}