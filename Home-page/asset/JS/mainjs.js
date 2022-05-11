const followedList = document.querySelector(".followed-list");
const listNavbar = document.querySelector(".header__navbar-followed-list");
const header = document.querySelector(".header");
const headerTopSection = document.querySelector(".header__top-section");
const headerItems = document.querySelectorAll(".header__top-item");
const headerSearchIcon = document.querySelector(
    ".header__top-item .header__search-icon"
);
const headerCloseSearchButton = document.querySelector(
    ".header__search-bar .header__search-bar__back-button"
);

const app = function () {
    let flag = false;
    let lastScrollValue = window.scrollY;
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
            
        } else {
            header.style.top = 0;
        }
    
        lastScrollValue = window.scrollY;
    }
    
    const openSearchBar = function () {
        headerItems.forEach((headerItem) => {
            if (headerItem.classList.contains("header__search-bar")) {
                setTimeout(() => {
                    headerItem.style.display = "flex";
                    headerItem.parentNode.style.flexDirection = "row-reverse";
    
                    setTimeout(() => {
                        headerItem.style.opacity = "1";
                        headerItem.style.width = "100%";
                    }, 100);
                }, 200);
                return;
            }
    
            headerItem.style.opacity = "0";
            setTimeout(() => {
                headerItem.style.display = "none";
            }, 200);
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
                }, 300);
                return;
            }
    
            setTimeout(() => {
                headerItem.style.display = "flex";
                setTimeout(() => {
                    headerItem.style.opacity = "1";
                }, 301);
            }, 300);
        });
    }
    
    headerCloseSearchButton.addEventListener("click", closeSearchBar);
    headerSearchIcon.addEventListener("click", openSearchBar);
    window.addEventListener("scroll", customStickyNav);
    followedList.addEventListener("click", openLists);
}

$(document).ready(function() {
    $('.slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
    });
});

app();
