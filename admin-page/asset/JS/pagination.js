const numberOfPaginations = $$('.container__pagination-item');
const paginationList = $('.container__pagination-lists');
const firstBtn = $('.firstBtn');
const prevBtn = $('.prevBtn');
const nextBtn = $('.nextBtn');
const lastBtn = $('.lastBtn');
const paginationBar = $('.container__pagination');
const totalPages = $('.container__pagination__total-page');

const pagination = {
    currentIndex: 0,
    currentPage: 0,
    paginations: function () {
        if (totalPages) {
            const pages = totalPages.getAttribute('value');
            let pagesArray = [];
            for (let i = 1; i <= pages; ++i) {
                pagesArray.push(i);
            }
            return pagesArray;
        }
    },

    render: function () {
        if (this.paginations()) {
            const htmls = this.paginations().map((pagination, index) => {
                return `
                <li class="container__pagination-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">${pagination}</li>
            `;
            })

            paginationList.innerHTML = htmls.join('');
        }

    },

    renderPagi: function () {
        if (paginationBar) {
            paginationBar.classList.add('appear-flex');
        }
    },

    handleEvents: function () {
        nextBtn.onclick = function () {
            pagination.nextPage();
        }

        //Xu ly khi bam vao nut prev page
        prevBtn.onclick = function () {
            pagination.prevPage();
        }

        //Xu ly khi bam vao nut last page
        lastBtn.onclick = function () {
            pagination.lastPage();
        }

        //Xu ly khi bam vao nut first page
        firstBtn.onclick = function () {
            pagination.firstPage();
        }

        //Lang nghe hanh vi click vao pagination list
        paginationList.onclick = function (e) {

            if (!e.target.classList.contains('container__pagination-item')) return;

            const paginationNode = e.target.closest('.container__pagination-item:not(.active)');
            pagination.currentPage = parseInt(e.target.dataset.index);

            // let hrefIndexPage = pagination.currentPage + 1;
            // window.location.href = 'localHost' + hrefIndexPage;

            pagination.currentIndex = Number(paginationNode.dataset.index);
            pagination.render();

            if (paginationNode) {
                pagination.currentIndex = Number(paginationNode.dataset.index);
                pagination.render();
            }
        }
    },
    nextPage: function () {
        this.currentIndex++;
        this.currentPage++;
        if (this.currentIndex >= this.paginations().length) {
            this.currentPage = 0;
            this.currentIndex = 0;
        }

        this.render();
    },

    prevPage: function () {
        this.currentIndex--;
        this.currentPage--;

        if (this.currentIndex < 0) {
            this.currentPage = this.paginations().length - 1;
            this.currentIndex = this.paginations().length - 1;
        }

        this.render();
    },

    lastPage: function () {
        this.currentIndex = this.paginations().length - 1;
        this.render();
    },

    firstPage: function () {
        this.currentIndex = 0;
        this.render();
    },

    start: function() {
        this.render();
        this.renderPagi();
        
        //xu ly cac thao tac bang tay
        this.handleEvents();
    }
}

pagination.start();