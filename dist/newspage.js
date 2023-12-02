import config from '/APIkey.js'


const API_KEY = config.apikey
var url = 'https://api.nytimes.com/svc/topstories/v2/world.json?' +
    `api-key=${API_KEY}`;
var req = new Request(url);


await fetch(req).then(function (response) {
    return response.json(); // response.json()은 Promise를 반환
}).then(function (data) {
    // console.log(data); // 비동기 처리가 끝나면 data 를 출력
    let rows = data["results"]
    $('#articles').empty()
    rows.forEach((a) => {
        let title = a['title']
        let desc = a['abstract']
        let image = a['multimedia'][0]['url']
        let url = a['url']

        if (desc == null) {
            desc = ''
        }
        //id 아래에 붙여야 하로 <div class = "col"> 부터
        let temp_html = `<article class="art">
        <div class="article-wrapper">
            <figure>
                <img src="${image}" alt="" />
            </figure>
            <div class="article-body">
                <h2>${title}</h2>
                <p>
                    ${desc}
                </p>
                <a href="${url}" class="read-more">
                    Read more <span class="sr-only">about this is some title</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    </article>`
        $('#articles').append(temp_html)
    })
    var paginate = {
        startPos: function (pageNumber, perPage) {
            return pageNumber * perPage;
        },
        getPage: function (items, startPos, perPage) {
            var page = [];
            items = items.slice(startPos, items.length);  // 이 페이지에 어떤 아이템이 들어갈 것인지 slice
            // loop remaining items until max per page
            for (var i = 0; i < perPage; i++) {
                page.push(items[i]);  // 아이템을 perPage 개수 만큼 페이지에 넣기
            }
            return page;
        },
        totalPages: function (items, perPage) {
            return Math.ceil(items.length / perPage);  // 총 몇 페이지로 할 것인지 정하기
        },
        createBtns: function (totalPages, currentPage) {
            var pagination = $('<div class="pagination" />'); // 페이지네이션 요소 가져오기
            // add a "first" button
            pagination.append('<span class="pagination-button">&laquo;</span>');  // html 붙이기
            // 전부 페이지네이션 하기
            for (var i = 1; i <= totalPages; i++) {
                // max 페이지를 넘어가는 아이템이면 자르기
                if (totalPages > 5 && currentPage !== i) {
                    if (currentPage === 1 || currentPage === 2) {
                        // max 를 넘어가면 그대로 통과
                        if (i > 5) continue;
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        // 5를 넘어간 나머지 페이지
                        if (i < totalPages - 4) continue;
                        // 아니라면 평소에는 5개까지만 보여주기
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue;
                        }
                    }
                }
                // 페이지 버튼 요소
                var pageBtn = $('<span class="pagination-button page-num" />');
                // 해당 버튼을 눌렀으면 active class 활성화
                if (i == currentPage) {
                    pageBtn.addClass('active');
                }
                // 숫자 추가
                pageBtn.text(i);
                // 버튼 삽입
                pagination.append(pageBtn);
            }
            // >>(마지막)
            pagination.append($('<span class="pagination-button">&raquo;</span>'));
            return pagination;
        },
        createPage: function (items, currentPage, perPage) {
            console.log("createPage")
            // 페이지가 갱신될 때마다 이전 페이지네이터 지우기
            $('.pagination').remove();
            // 페이지네이터 공간 생성
            var container = items.parent(),
                // item 배열로 정렬
                items = items.detach().toArray(),
                // 시작 위치 정하고 해당 페이지에 넣을 item 가져오기
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);
            // 루프 돌면서 페이지 읽고 페이지네이션
            $.each(page, function () {
                // prevent empty items that return as Window  // 이 부분 때문에 마지막 버튼을 누르면 Undefined type error 가 났음
                // if (this.window === undefined) {
                //     // console.log($(this))
                //     container.append($(this));
                // }
                container.append($(this));
            });
            // 전체 페이지 개수 구하고 버튼 생성
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);
            container.after(pageButtons);
        }
    };

    $.fn.paginate = function (perPage) {

        var items = $(this);

        // default perPage 5
        if (isNaN(perPage) || perPage === undefined) {
            perPage = 6;
        }


        if (items.length <= perPage) {
            return true;
        }


        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        paginate.createPage(items, 1, perPage);  // 처음 시작은 1, perPage 는 설정해준 대로 6

        // click event
        $(document).on('click', '.pagination-button', function (e) {
            // active btn 으로 현재 페이지 get
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            // 현재 페이지가 아닌 다른 페이지
            newPage = parseInt(target.text(), 10);
            if (target.text() == '«') newPage = 1;
            if (target.text() == '»') {
                // console.log('Last button clicked.');
                newPage = totalPages;
                // console.log(totalPages)
            }

            // 다른 페이지가 범위 안에 있다면
            if (newPage > 0 && newPage <= totalPages) {
                // console.log(newPage, totalPages)
                paginate.createPage(items, newPage, perPage);
            }
        });
    };

    $('.art').paginate(6);

})
    .catch(function (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    });

