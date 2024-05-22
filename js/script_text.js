/* ----- メモ帳アプリ部分 -----*/

// グローバル変数
let count = 0;

// データ格納を関数化
function displayMemo(count, title, body, date) {
    const html= `
    <div class="item" id="${count}">
        <div class="item-data-wrap">
            <p class="item-title">${title}</p>
            <p class="item-text">${body}</p>
            <p class="item-date">${date}</p>
        </div>
        <div class="item-btn-wrap">
            <button id="delete" class="delete-btn" data-id="${count}">削除</button>
        </div>
    </div>
    `;

    $("#storage").prepend(html);
}

// Saveボタンクリック
$("#save").on("click", function(){

    // 入力データ取得
    let titleText = $("#input-title").val();
    let bodyText = $("#input-text").val();

    // アラート分岐
    if (titleText === "" || bodyText === "") {
        alert("入力してから保存してください");
    }else if(count === 99){
        alert("これ以上保存できません");
    }else{

    // 日付取得
    let date = new Date;
    let dateText = date.toLocaleString();

    // カウント＆０埋め
    count += 1;
    let countText = "item" + String(count).padStart(2,'0');

    //HTMLに格納（リロードするまでは追加順に並ぶのでソートは不要）
    displayMemo(count, titleText, bodyText, dateText);

    //送信したらクリアする
    $("#input-title").val("");
    $("#input-text").val("");

    // memoオブジェクト
    const memo = {'count':count,'countText':countText,'date': dateText, 'title': titleText, 'body': bodyText};
    console.log(memo,"memo");

    // memoオブジェクトをlocalStrageに格納
    localStorage.setItem(count , JSON.stringify(memo));

    }

});

//リロード時の動き

    // まず並び替えをする
    // Step1:全てのキーを取得
    const keys = Object.keys(localStorage);

    // Step2;キーを名前順に並び替え
    keys.sort();

    // Step3:並び替えたキーに基づいて値を取得して画面表示
    keys.forEach(key => {
        let memoData = JSON.parse(localStorage.getItem(key));
        console.log(memoData,"メモデータ確認");

        //HTMLに格納
        displayMemo(memoData.count, memoData.title, memoData.body, memoData.date);

        // countの一番大きい数字を取りたい
        console.log(count,"countは？");
        console.log(memoData.count,"メモのカウントは？");

        if ( memoData.count > count){
            count = memoData.count;
            console.log(count,"count更新後の数値");
        }
    });


// クリックしたものだけ削除
$("#storage").on("click", ".delete-btn", function(){
        
        let deleteId = $(this).data('id');
        console.log(deleteId,"deleteId取れてるか");

        $(`#${deleteId}`).remove();
        localStorage.removeItem(deleteId);

});


/* ----- PageTop部分 -----*/
// 関数化
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600){
        $('.pagetop').removeClass('pt-down');
        $('.pagetop').addClass('pt-up');
    }else{
        if($('.pagetop').hasClass('pt-up')){
        $('.pagetop').removeClass('pt-up');
        $('.pagetop').addClass('pt-down');
        }
    }
}

$('.pagetop').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

// 呼び出し
var windowWidth = $(window).width();
var windowSp = 768;
if (windowWidth <= windowSp) {
//横幅768px以下（スマホ）に適用させるJavaScriptを記述
    $(window).scroll(function () {
        PageTopAnime();
    });

    $(window).on('load', function () {
        PageTopAnime();
    });

} else {
//横幅768px以上（PC、タブレット）に適用させるJavaScriptを記述
    $(window).scroll(function () {
        PageTopAnime();
    });

    $(window).on('load', function () {
        PageTopAnime();
    });
}