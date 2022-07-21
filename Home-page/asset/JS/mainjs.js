const topicSlide = document.querySelector(".header__navbar-topic-list");
const topicSlidePrevBtn = document.querySelector(".header__topic-list-prev-button");
const topicSlideNextBtn = document.querySelector(".header__topic-list-next-button");
const topicItems = document.querySelectorAll(".header__topic-list-item");
const followedList = document.querySelector(".followed-list");
const listNavbar = document.querySelector(".header__navbar-followed-list");
const header = document.querySelector(".header");
const headerTopSection = document.querySelector(".header__top-section");
const headerItems = document.querySelectorAll(".header__top-item");
const headerSearchIcon = document.querySelector(
    ".header__search-icon"
);
const headerCloseSearchButton = document.querySelector(
    ".header__search-bar .header__search-bar__back-button"
);
const arrowToTop = document.querySelector(".goToHeader");

// ==== Personal Page Variable ====
const chooseContents = document.querySelectorAll('.content__header-choose');
const modalBtn = document.querySelector('.modal__btn');
const modalChangePswBtn = document.querySelector('.modal__change-psw');
const modalCancelBtn = document.querySelector('.modal__cancel-btn');
const modalEdit = document.querySelector('.modal__edit');
const containerContent = document.querySelector('.container__content');
const userEdit = document.querySelector('.user__edit');
const scrollHeader = document.querySelector('.header__navbar-topic-list-warrper');
const headerLinks = document.querySelectorAll('.header__topic-list-item a');
const userTable = document.querySelector('.container__user');

const app = function () {
    // ======= Variable =======
    let flag = false;
    let isDown = false;
    let lastScrollValue = window.scrollY;
    let isOpen = false;
    let startX;
    let scrollLeft;
    const topicSlideWidth = topicSlide.clientWidth;
    const firstTopicWidth = topicItems[0].clientWidth;
    // const topicItemsLength = topicItems.length - 1;
    // const lastTopicWidth = topicItems[topicItemsLength].clientWidth;
    
    // ======= Functions =======
    const openLists = function () {
        flag = !flag;
        if (flag) {
            listNavbar.classList.add("open");
            listNavbar.style.animation = "dropDown 0.3s ease-in-out";
        } else {
            listNavbar.style.animation = "goUp 0.3s ease-in-out";
            setTimeout(() => {
                listNavbar.classList.remove("open");
            }, 250);
        }
    }

    const customStickyNav = function () {
        if (lastScrollValue < window.scrollY) {
            header.style.top = `-${headerTopSection.clientHeight}px`;
            // userTable.style.top = `${headerTopSection.clientHeight}px`;
        } else {
            header.style.top = 0;
        }

        lastScrollValue = window.scrollY;
    }

    const openSearchBar = function (e) {
        console.log(e.target);
        headerItems.forEach((headerItem) => {
            if (headerItem.classList.contains("header__search-bar")) {
                setTimeout(() => {
                    headerItem.style.display = "flex";
                    headerItem.parentNode.style.flexDirection = "row-reverse";

                    setTimeout(() => {
                        headerItem.style.opacity = "1";
                        headerItem.style.width = "100%";
                    }, 100);
                }, 150);
                return;
            }

            headerItem.style.opacity = "0";
            setTimeout(() => {
                headerItem.style.display = "none";
            }, 150);
        });
    }

    const closeSearchBar = function () {
        headerItems.forEach((headerItem) => {
            if (headerItem.classList.contains("header__search-bar")) {
                headerItem.style.width = "40%";
                headerItem.style.opacity = "0";

                setTimeout(() => {
                    headerItem.parentNode.style.flexDirection = "";
                    headerItem.style.display = "none";
                }, 150);
                return;
            }

            setTimeout(() => {
                headerItem.style.display = "flex";
                setTimeout(() => {
                    headerItem.style.opacity = "1";
                }, 151);
            }, 150);
        });
    }

    // disable button till transition end
    const disableBtn = (currentBtn) => {
        currentBtn.disabled = true;
        setTimeout(() => {
            currentBtn.disabled = false;
        }, 350);
    }

    const moveToRight = (e) => {
        const style = window.getComputedStyle(topicSlide);
        const matrix = new WebKitCSSMatrix(style.transform);
        const currentTranslate = -matrix.m41;
        let moveToRight = 0;
        disableBtn(topicSlideNextBtn);
        if ((currentTranslate + 800) >= topicSlideWidth) {
            // moveToRight = currentTranslate + lastTopicWidth;
            // topicSlide.style.transform = `translateX(-${moveToRight}px)`;
            return;
        }
        else {
            moveToRight = currentTranslate + 100;
            topicSlide.style.transform = `translateX(-${moveToRight}px)`;
        }
    }

    const moveToLeft = (e) => {
        const style = window.getComputedStyle(topicSlide);
        const matrix = new WebKitCSSMatrix(style.transform);
        const currentTranslate = matrix.m41;
        let moveToLeft = 0;
        disableBtn(topicSlidePrevBtn);
        if (currentTranslate >= -firstTopicWidth) {
            // moveToLeft = currentTranslate + firstTopicWidth;
            // topicSlide.style.transform = `translateX(-${moveToLeft}px)`;
            return;
        } else {
            moveToLeft = currentTranslate + 100;
            topicSlide.style.transform = `translateX(${moveToLeft}px)`;
        }
    }

    // Slider (using slick slider libary)
    $(document).ready(function () {
        $('.slider').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
        });
    });

    const styleChangePsw = function () {
        if (isOpen) {
            modalChangePswBtn.style.opacity = 0;
            modalChangePswBtn.style.transform = `translateY(-15px)`;
            isOpen = !isOpen;
            setTimeout(() => {
                modalChangePswBtn.style.display = 'none';
            }, 301);
            return;
        }
        modalChangePswBtn.style.display = 'block';
        modalChangePswBtn.style.opacity = 0;
        setTimeout(() => {
            modalChangePswBtn.style.opacity = 1;
            modalChangePswBtn.style.transform = `translateY(0)`;
            isOpen = !isOpen;
        }, 0.1);

        // modalChangePswBtn.style.display = 'block';
    };

    const hideModalEdit = function () {
        modalEdit.classList.remove('appear-block');
        containerContent.classList.add('appear-block');
    };

    const hideContainerContent = function () {
        modalEdit.classList.add('appear-block');
        containerContent.classList.remove('appear-block');
    };

    // test click and drag slider in header
    const mouseDownFunc = function (e) {
        isDown = true;
        topicSlide.classList.add('active');
        startX = e.pageX - topicSlide.offsetLeft;
        scrollLeft = scrollHeader.scrollLeft;
        console.log(scrollLeft);
    };

    const mouseUpFunc = function () {
        isDown = false;
        topicSlide.classList.remove('active');
    };

    const mouseLeaveFunc = function () {
        isDown = false;
        topicSlide.classList.remove('active');

    };
    
    const mouseMoveFunc = function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - topicSlide.offsetLeft;
        const walk = x - startX;
        scrollHeader.scrollLeft = scrollLeft - walk;
    };

    const waitASec = function (e) {
        const hrefLink = this.href;
        const textcontentLink = this.textContent;
        this.onmousemove = function (e) {
            this.href = "#";
            this.onmouseup = function (e) {
                this.parentNode.innerHTML = `<a href="${hrefLink}">${textcontentLink}</a>`;
            }
        }
        this.onmouseleave = function () {
            this.parentNode.innerHTML = `<a href="${hrefLink}">${textcontentLink}</a>`;
        }
    };

    const goToTop = function () {
        window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: "smooth",
        })
    };

    // topicSlide.addEventListener("")
    topicSlideNextBtn.addEventListener("click", moveToRight);
    topicSlidePrevBtn.addEventListener("click", moveToLeft);
    headerCloseSearchButton.addEventListener("click", closeSearchBar);
    headerSearchIcon.addEventListener("click", openSearchBar);
    window.addEventListener("scroll", customStickyNav);
    followedList.addEventListener("click", openLists);
    arrowToTop.addEventListener("click", goToTop);

    // Event in personal page
    chooseContents.forEach(chooseContent => {
        chooseContent.onclick = function () {
            document.querySelector('.content__header span.active').classList.remove('active');
            chooseContent.classList.add('active');
        }
    });
    // modalBtn.addEventListener('click', styleChangePsw);
    // modalCancelBtn.addEventListener('click', hideModalEdit);
    // userEdit.addEventListener('click', hideContainerContent);
    // topicSlide.addEventListener('mousedown', mouseDownFunc);
    // topicSlide.addEventListener('mouseup', mouseUpFunc);
    // topicSlide.addEventListener('mouseleave', mouseLeaveFunc);
    // topicSlide.addEventListener('mousemove', mouseMoveFunc);
    // headerLinks.forEach(headerLink => {
    //     headerLink.addEventListener('mousedown', waitASec);
    // });
}


app();
