class Check {
    isFullFilds(arr, button) {
        let IsEverythingFilled = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value.trim().length === 0) {
                IsEverythingFilled = false;
            }
        }
        IsEverythingFilled ?
            button = button.disabled = false :
            button = button.disabled = true;
    }
    loginCheck(user, pass, button) {
        if (user.value.trim() && pass.value.trim()) {
            button = button.disabled = false;
        }
    }
    clearInput(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].value = ""
        }

    }
}