/* このファイルはUTF-8のBOMなし(UTF-8N)で保存しています */
/**
 * 初期化スクリプト
 *
 * DOMの読み込み・構築が完了した時に自動実行する。
 *
 * 画像の読み込みまで処理を待つ場合は
 *   $(window).load(function(){ // Do something. });
 * として、readyではなくloadイベントを登録して実行タイミングを制御する。
 */
;(function($){
    'use strict';

    /**
     * レスポンシブデザインのブレークポイントチェック用要素の追加
     */
    var initBreakpointChecker = function() {
        $('body').append(
            $('<div>').attr('id', 'js-breakpointChecker')
                      .append($('<div>').addClass('wide'))
                      .append($('<div>').addClass('medium'))
                      .append($('<div>').addClass('narrow'))
        );

        // jQueryの機能拡張
        $.getCurrentLayoutName = function(){
            return $('#js-breakpointChecker').find('div:visible').attr('class');
        };
    };

    /**
     * ナビゲーション
     */
    var initNavigation = function() {
        $(document).on('click', '[data-navHandler]', function(){
            switch ($(this).attr('data-navHandler')) {
                // 水平方向(左右)
                case 'horizontal':
                    $('body').toggleClass('is-panelopened');
                    break;
                // 垂直方向(上下)
                case 'vertical':
                    $('#nav').slideToggle(200);
                    break;
                // フェード
                case 'fade':
                    $('#nav').fadeToggle(200);
                    break;
                default:
                    $('#nav').fadeToggle(200);
                    break;
            }

            return false;
        });
    };

    /**
     * スムーズスクロール
     */
    var initSmoothScroll = function() {
        if (typeof $.fn.smoothscroll === 'function') {
            $('a[href^="#"]').smoothscroll();
        } else {
            console.log('Smooth Scroll Plugin is not loaded.');
        }
    };

    /**
     * TOPへ戻るリンク
     */
    var initPageTopLink = function() {
        var $pageTop = $('#js-pagetop'),
            offset   = 100;

        if (offset < $(window).scrollTop()) {
            $pageTop.fadeIn();
        }
        $(window).scroll(function (){
            if (offset < $(this).scrollTop()) {
                $pageTop.fadeIn();
            } else {
                $pageTop.fadeOut();
            }
        });
    };

    /**
     * リンクエフェクト
     */
    var initLinkEffect = function() {
        $(document)
            .on('mouseenter', '[data-effect]', function(){
                switch ($(this).attr('data-effect')) {
                    // ブリンク(点滅)
                    case 'blink':
                        $(this).css({'opacity': '0.2', 'filter': 'alpha(opacity=20)'}).fadeTo('slow', 0.9);
                        break;
                    default:
                        // Do nothing...
                        break;
                }
            })
            .on('mouseleave', '[data-effect]', function(){
                switch ($(this).attr('data-effect')) {
                    // ブリンク(点滅)
                    case 'blink':
                        $(this).fadeTo('fast', 1.0);
                        break;
                    default:
                        // Do nothing...
                        break;
                }
            });
    };


    /**
     * 初期化処理を一括で自動実行
     */
    $(function(){
        initBreakpointChecker();
        initNavigation();
        initSmoothScroll();
        initPageTopLink();
        initLinkEffect();
    });
}(jQuery));
