const dropDownList = document.querySelectorAll(".modal__drop-down-list");
const selectedAll = document.querySelectorAll(".modal__selected-choice");
const returnBtn = document.querySelector(".modal__return-btn");
const confirmSubmitBtn = document.querySelector(".modal__submit-btn");
const submitBtn = document.querySelector(".writing-blog__submit-btn");
const modalWritingPage = document.querySelector(".modal__writing-page-submition-form");
const notificationIcon = document.querySelector(".header__icon__notificartion");
const userAvatar = document.querySelector(".header__icon__user-navbar");
const modalUserNavbar = document.querySelector(".header__modal__user-navbar");
const modalNotification = document.querySelector(".header__modal__notification");

var result = document.querySelector('blog-post-genre modal__selected-choice');

const application = () => {
    dropDownList.forEach((modalSelect) => {
        //optionBox and selectBox is the same;

        modalSelect.addEventListener("click", (e) => {
            if (!e.target.classList.contains("modal__selected-choice")) {
                return;
            }

            const selectBox = modalSelect.firstElementChild;
            const optionBox = modalSelect.firstElementChild.nextElementSibling.firstElementChild;

            if (optionBox.classList.contains("active")) {
                optionBox.classList.remove('active');
            } else {
                let currentlyActive = document.querySelector(".select-box__options.active")

                if (currentlyActive) {
                    currentlyActive.classList.remove('active');
                }

                modalSelect.querySelector(".select-box__options").classList.toggle("active");
            }

            modalSelect.querySelectorAll(".select-box__option")
                .forEach((option) => {
                    option.addEventListener("click", () => {
                        selectBox.innerHTML = option.querySelector("label").innerHTML;
                        // result = selectBox.textContent;
                        optionBox.classList.remove('active');
                    });
                });
        });

        const makeModalHidden = () => {
            modal.classList.remove('visible');
        }

        const makeModalVisible = () => {
        modalWritingPage.classList.add('visible');
        }

        returnBtn.addEventListener('click', makeModalHidden);
        submitBtn.addEventListener('click', makeModalVisible);
    });

    const toggleUserNavbar = () => {
        modalUserNavbar.classList.toggle("active");
    }

    const toggleNotification = () => {
        modalNotification.classList.toggle("active");
    }

    userAvatar.addEventListener("click", toggleUserNavbar)
    notificationIcon.addEventListener("click", toggleNotification)

    BalloonEditor.create(document.querySelector(".editor"), {
        placeholder: "Nội dung bài viết",
    })
        .catch((error) => {
            console.error(error);
        });

    };
    function submitForm() {
        console.log(result);
    };

    confirmSubmitBtn.addEventListener('click', submitForm);

application();
