$(document).ready(function () {

    // Phần search box
    $('.search-box').click(function () {
        $('.backdrop, .box').animate({ 'opacity': '.50' }, 300, 'linear');
        $('.box').animate({ 'opacity': '1.00' }, 300, 'linear');
        $('.backdrop, .box').css('display', 'block');
    });

    $('.close').click(function () {
        close_box();
    });

    $('.content').click(function () {
        $('.backdrop, .box').css('display', 'none');
    });

    $('.backdrop').click(function () {
        close_box();
    });


    function close_box() {
        $('.backdrop, .box').animate({ 'opacity': '0' }, 300, 'linear', function () {
            $('.backdrop, .box').css('display', 'none');
        });
    }

    // su kien onload(load trang)
    
    // load du lieu trang chu
    fetch('https://gnews.io/api/v4/top-headlines?&lang=en&country=en&token=4afeefb1d4331ec1954c7bce8ca6d262')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var myNews = data.articles;
            var html = "";
            $(myNews).each(function () {
                let titleNews = this.title;
                let descriptionNews = this.description;
                let contentNews = this.content;
                let urlNews = this.url;
                let imageNews = this.image;
                let dateNews = new Date(this.publishedAt);
                const sourceNews = [this.source.name, this.source.url];
                html += '<div class = "content-news col-12" >';
                html += '<div class = "col-4 content-img"><img src = ' + '"' + imageNews + '"' + ' alt = "news"></div>';
                html += '<div class = "chitiet"><div class = "title-news"><a href=' + '"' + urlNews + '"' + 'target="_blank">';
                html += '<h3>' + '"' + titleNews + '"</h3></a></div>';
                html += '<i>' + descriptionNews + '</i><p>' + contentNews + '</p>';
                html += '<a href="' + urlNews + '" target="_blank">Read More</a>';
                html += '<span>' + (dateNews.toUTCString()) + '</span>';
                html += '<div>Source: <a href="' + sourceNews[1] + '" target="_blank">' + sourceNews[0] + '</a></div></div></div>';
                $("section").html(html);
            });
        });
    // $("#myInput").on('keyup', function (event) {
    //     event.preventDefault();
    //     var key = $(this).val().toLowerCase();
    //     $(".content").filter(function () {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(key) > -1);
    //     })
    // });

    // su kien click nut tim kiem
    $("#search-button").on("click", function () {
        let searchText = $("#myInput").val();
        //tìm kiếm dữ liệu trên trang chủ
        fetch('https://gnews.io/api/v4/search?q=' + searchText + '&token=4afeefb1d4331ec1954c7bce8ca6d262')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var myNews = data.articles;
                var html = "";
                $(myNews).each(function () {
                    let titleNews = this.title;
                    let descriptionNews = this.description;
                    let contentNews = this.content;
                    let urlNews = this.url;
                    let imageNews = this.image;
                    let dateNews = new Date(this.publishedAt);
                    const sourceNews = [this.source.name, this.source.url];
                    html += '<div class = "content-news col-12" >';
                    html += '<div class = "col-4 content-img"><img src = ' + '"' + imageNews + '"' + ' alt = "news"></div>';
                    html += '<div class = "chitiet"><div class = "title-news"><a href=' + '"' + urlNews + '"' + 'target="_blank">';
                    html += '<h3>' + '"' + titleNews + '"</h3></a></div>';
                    html += '<i>' + descriptionNews + '</i><p>' + contentNews + '</p>';
                    html += '<a href="' + urlNews + '" target="_blank">Read More</a>';
                    html += '<span>' + (dateNews.toUTCString()) + '</span>';
                    html += '<div>Source: <a href="' + sourceNews[1] + '" target="_blank">' + sourceNews[0] + '</a></div></div></div>';
                    $("section").html(html);
                });
            });
    });
});
