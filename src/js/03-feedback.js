import throttle from 'lodash.throttle';

const refs = {
    feedbackForm: document.querySelector(".feedback-form"),
    textArea: document.querySelector(".feedback-form textarea"),
    input: document.querySelector(".feedback-form input"),
    button: document.querySelector("button"),
}


const storage = {
    addItem(key, value) {
        const result = JSON.stringify(value);
        localStorage.setItem(key, result);
    },

    getItem(key) {
        try {
            const payLoad = localStorage.getItem(key);
            return JSON.parse(payLoad)
        } catch (error) {
            console.log("error parse");
        }
    }
}


refs.feedbackForm.addEventListener("input", handleSubmit);
refs.feedbackForm.addEventListener("input", throttle(handleSubmit, 500));

function handleSubmit(event) {
    event.preventDefault();
    
    const inputValue = refs.input.value;
    const messageValue = refs.textArea.value;

    storage.addItem("feedback-form-state", {email:inputValue,  message:messageValue});
}


storageItem();

function storageItem() {
    if (storage.getItem("feedback-form-state")) {
    refs.input.value = storage.getItem("feedback-form-state").email;
    refs.textArea.textContent = storage.getItem("feedback-form-state").message;    
    }
};


const removeDate = (event) => {
    event.preventDefault();
    const textInput = storage.getItem("feedback-form-state");
    console.log(textInput);

    refs.input.value = "";
    refs.textArea.value = "";

    localStorage.removeItem("feedback-form-state")
}

refs.button.addEventListener("click", removeDate);
