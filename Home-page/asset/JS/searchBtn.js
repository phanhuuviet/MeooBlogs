var searchBtn = document.querySelector('.header__search-bar .fas.fa-search')

searchBtn.onclick = function () {
    var tab = document.querySelector('.header__search-bar > input').value
    console.log(tab)
}