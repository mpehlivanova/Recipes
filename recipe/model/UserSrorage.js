let userStorage = (function() {
    class User {
        constructor(username, password) {
            this.username = username;
            this.password = password;
        }
    }
    class UserSrorage {

        constructor() {
            if (localStorage.getItem("user")) {
                this.users = JSON.parse(localStorage.getItem("user"))
            } else {
                this.users = [
                    new User("test", "123")
                ];
                localStorage.setItem("user", JSON.stringify(this.users));
            }
        }
        addUser(username, password) {
            //добвяне на потебител
            if (!this.extractUser(username)) {
                this.users.push(new User(username, password));
                localStorage.setItem("user", JSON.stringify(this.users));
            }
        }

        validadteUser(username, password) {
            return this.users.some(us => us.username === username &&
                us.password === password);
            //проверява дали има човек с това потребителско име и парола
        }
        extractUser(username) {
            return this.users.some(us => us.username === username);
            //ще се извиква при проверка в контролера дали  лог.потр. вече е регистриран
        }

    }
    return new UserSrorage();
})();