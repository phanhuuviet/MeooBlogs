const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const actionList = $('.container__action-list');
const action = $('.container__action');

action.onclick = function() {
    actionList.classList.toggle('appear-block');
}