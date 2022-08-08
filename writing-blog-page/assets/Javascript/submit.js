const submitBtn = document.querySelector(".writing-blog__submit-btn");

const submit = {
    handleEvent: function() {
        confirmSubmitBtn.addEventListener('click', application.submitForm);

    },

    submitForm: function () {
        var result = document.querySelector('.select-box__option.selected');
        console.log(result);
        return result;
    },

    start: function() {
        application.handleEvent();
    }
}

submit.start();