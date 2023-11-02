class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onButtonClick(event) {
        event.preventDefault();
        this.formButton.value = "Enviando...";
        this.formButton.disabled = true;
        this.sendForm(event);
    }

    async sendForm(event) {
        try {
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) {
            this.formButton.addEventListener("click", (event) => {
                this.onButtonClick(event);
            });
        }
        return this;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const formSubmit = new FormSubmit({
        form: "[data-form]",
        button: "[data-button]",
        success: "<h1 class='success'>Mensagem Enviada com Sucesso!</h1>",
        error: "<h1 class='error'>Não foi possível enviar a mensagem.</h1>",
    });
    formSubmit.init();
});
