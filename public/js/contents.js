/* このファイルはUTF-8のBOMなし(UTF-8N)で保存しています */
/**
 * 各コンテンツごとの処理を記述
 *
 * DOMの読み込み・構築が完了した時にbodyのID属性ごとの処理を自動実行する。
 */
;(function($){
    'use strict';

    var Controller = new Array();

    /**
     * トップページ用処理
     */
    Controller.homeAction = function() {
        console.log('homeAction runs.');
    };

    /**
     * テストページ用処理
     */
    Controller.testAction = function() {
        console.log('testAction runs.');
    };

    /**
     * ニュースページ用処理
     */
    Controller.newsAction = function() {
        console.log('newsAction runs.');
    };


    /**
     * bodyのID属性ごとの処理を自動実行
     */
    $(function(){
        var action = $('body').attr('id');
        if (typeof Controller[action + 'Action'] == 'function') {
            Controller[action + 'Action']();
        } else {
            console.log(action + 'Action is not defined.');
        }
    });
}(jQuery));
