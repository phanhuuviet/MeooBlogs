const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const numberOfPaginations = $$('.container__pagination-item');
const paginationList = $('.container__pagination-lists');
const firstBtn = $('.firstBtn');
const prevBtn = $('.prevBtn');
const nextBtn = $('.nextBtn');
const lastBtn = $('.lastBtn');
const memberList = $('.container__table');
const iconEyes = $$('.container__table-icon:nth-child(1)');
const iconEdits = $$('.container__table-icon:nth-child(2)');
const iconDeletes = $$('.container__table-icon:nth-child(3)');
const modalTable = $('.modal');
const modalTableDelete = $('.modal__wrap--delete');
const chooseYes = $('.modal__choose--yes');
const chooseNo = $('.modal__choose--no');


const app = {
    currentIndex: 0,

    paginations: [1, 2, 3, 4, 5, 6],

    render: function () {
        const htmls = this.paginations.map((pagination, index) => {
            return `
                <li class="container__pagination-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">${pagination}</li>
            `;
        })

        paginationList.innerHTML = htmls.join('');
    },

    handleEvents: function () {
        //Xu ly khi bam vao nut next page
        nextBtn.onclick = function () {
            app.nextPage();
        }

        //Xu ly khi bam vao nut prev page
        prevBtn.onclick = function() {
            app.prevPage();
        }

        //Xu ly khi bam vao nut last page
        lastBtn.onclick = function() {
            app.lastPage();
        }

        //Xu ly khi bam vao nut first page
        firstBtn.onclick = function() {
            app.firstPage();
        }

        //Lang nghe hanh vi click vao pagination list
        paginationList.onclick = function(e) {
            const paginationNode = e.target.closest('.container__pagination-item:not(.active)');
            if (paginationNode) {
                app.currentIndex = Number(paginationNode.dataset.index);
                app.render();
            }
        }

        //Lang nghe hanh vi click vao detele btn
        iconDeletes.forEach((iconDelete, index) => {
            iconDelete.onclick = function() {
                app.appearModal();
                app.appearDeleteTable();
            }
        })

        //Lang nghe hanh vi click vao eye btn
        iconEyes.forEach((iconEye, index) => {
            iconEye.onclick = function() {
                app.appearModal();
            }
        })

        //Lang nghe hanh vi click vao edit btn
        iconEdits.forEach((iconEdit, index) => {
            iconEdit.onclick = function() {
                app.appearModal();
            }
        })

        //Lang nghe hanh vi click vao yes or no trong modal delete
        chooseYes.onclick = function() {
            app.hideDeleteTable();
        }

        chooseNo.onclick = function() {
            app.hideDeleteTable();
        }
    },

    nextPage: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.paginations.length) {
            this.currentIndex = 0;
        }

        this.render();
    },

    prevPage: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.paginations.length - 1;
        }

        this.render();
    },

    lastPage: function() {
        this.currentIndex = this.paginations.length - 1;
        
        this.render();
    },

    firstPage: function() {
        this.currentIndex = 0;
        
        this.render();
    },

    appearModal: function() {
        modalTable.classList.add('appear-flex');
    },

    hideDeleteTable: function() {
        modalTable.classList.remove('appear-flex');
        modalTableDelete.classList.remove('appear-flex');
    },

    appearDeleteTable: function() {
        modalTableDelete.classList.add('appear-flex');
    },

    start: function () {
        // render cac trang trong list ra html
        this.render();

        //xu ly cac thao tac bang tay
        this.handleEvents();
    }
}

app.start();

