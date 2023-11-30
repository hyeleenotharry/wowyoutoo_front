(()=>{"use strict";var t=new Request("https://newsapi.org/v2/top-headlines?country=us&apiKey=10f9117a3d0b46af95b5e6f734c8c638");fetch(t).then((function(t){return t.json()})).then((function(t){let n=t.articles;$("#articles").empty(),n.forEach((t=>{let n=t.title,a=t.description,e=t.urlToImage,i=t.url;t.content,null==a&&(a="");let r=`<article class="art">\n            <div class="article-wrapper">\n                <figure>\n                    <img src="${e}" alt="" />\n                </figure>\n                <div class="article-body">\n                    <h2>${n}</h2>\n                    <p>\n                        ${a}\n                    </p>\n                    <a href="${i}" class="read-more">\n                        Read more <span class="sr-only">about this is some title</span>\n                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">\n                            <path fill-rule="evenodd"\n                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"\n                                clip-rule="evenodd" />\n                        </svg>\n                    </a>\n                </div>\n            </div>\n        </article>`;$("#articles").append(r)}));var a={startPos:function(t,n){return t*n},getPage:function(t,n,a){var e=[];t=t.slice(n,t.length);for(var i=0;i<a;i++)e.push(t[i]);return e},totalPages:function(t,n){return Math.ceil(t.length/n)},createBtns:function(t,n){var a=$('<div class="pagination" />');a.append('<span class="pagination-button">&laquo;</span>');for(var e=1;e<=t;e++){if(t>5&&n!==e)if(1===n||2===n){if(e>5)continue}else if(n===t||n===t-1){if(e<t-4)continue}else if(e<n-2||e>n+2)continue;var i=$('<span class="pagination-button page-num" />');e==n&&i.addClass("active"),i.text(e),a.append(i)}return a.append($('<span class="pagination-button">&raquo;</span>')),a},createPage:function(t,n,a){console.log("createPage"),$(".pagination").remove();var e=t.parent(),i=(t=t.detach().toArray(),this.startPos(n-1,a)),r=this.getPage(t,i,a);$.each(r,(function(){e.append($(this))}));var s=this.totalPages(t,a),o=this.createBtns(s,n);e.after(o)}};$.fn.paginate=function(t){var n=$(this);if((isNaN(t)||void 0===t)&&(t=6),n.length<=t)return!0;n.length!==n.parent()[0].children.length&&n.wrapAll('<div class="pagination-items" />'),a.createPage(n,1,t),$(document).on("click",".pagination-button",(function(e){var i=parseInt($(".pagination-button.active").text(),10),r=a.totalPages(n,t),s=$(e.target);i=parseInt(s.text(),10),"«"==s.text()&&(i=1),"»"==s.text()&&(i=r),i>0&&i<=r&&a.createPage(n,i,t)}))},$(".art").paginate(6)})).catch((function(t){console.error("데이터를 가져오는 중 오류가 발생했습니다.",t)}))})();