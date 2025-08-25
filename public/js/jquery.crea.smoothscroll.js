/*! このファイルはUTF-8のBOMなし(UTF-8N)で保存しています
 *
 * Smooth Scroll 1.0 - jQuery plugin
 *
 * Copyright 2016, CrEa Inc.
 * http://www.creaman.com/
 *
 * Built for jQuery library
 * http://jquery.com/
 */
;(function($, window, document, undefined) {
    'use strict';

    /**
     * プラグイン名
     *
     * @var string
     */
    var pluginName = 'smoothscroll';

    /**
     * デフォルト設定
     *
     * @var object
     */
    var defaults = {
        // カスタムデータ属性セレクタ(aタグに付与するdata-**という属性の**の部分)
        dataSelector  : 'scroll',
        // アニメーション時間
        duration      : 500,
        // イージング(デフォルトは "linear" または "swing" のみ指定可。その他の種類はjQuery Easing Pluginを読み込むことで指定可になる)
        easing        : 'linear',
        // URLハッシュを付けるかどうか
        updateUrlHash : false,
        // 固定ヘッダー
        // ※セレクタ文字列かjQueryオブジェクトを指定
        fixedHeader   : null,
        // スクロール完了時のイベント
        callback      : function(){}
    };

    /**
     * 設定
     *
     * @var object
     */
    var settings;

    /**
     * コンストラクタ
     */
    function Plugin(element, options) {
        this.element   = element;
        this.settings  = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        // 初期化
        init: function(){
            if (null != this.settings.fixedHeader) {
                if (this.settings.fixedHeader instanceof jQuery) {
                    this.settings.fixedHeader = this.settings.fixedHeader;
                } else if ('string' === typeof this.settings.fixedHeader) {
                    this.settings.fixedHeader = $(this.settings.fixedHeader);
                } else {
                    throw new TypeError("Argument 'fixedHeader' must be string or jQuery object.");
                }
            }
            if ('undefined' === typeof $(this.element).data(this.settings.dataSelector)) {
                return;
            }

            settings = this.settings;

            var isEnabledHtmlScroll = this.isEnabledHtmlScroll;

            var offset = this.settings.fixedHeader instanceof jQuery && 0 < this.settings.fixedHeader.size() ? this.settings.fixedHeader.outerHeight() : 0;

            $(this.element).on('click', function(){
                // アンカーのターゲット要素が存在しない場合はhtml要素を指定
                var target = $($(this).attr('href'));
                if (0 >= target.size()) {
                    target = $('html');
                }

                // スクロールポジションを取得
                var position = target.offset().top;
                position -= offset;

                // スクロール実行
                $(isEnabledHtmlScroll ? 'html' : 'body').animate({
                    scrollTop: position
                }, settings.duration, settings.easing, settings.callback);

                if (! settings.updateUrlHash) {
                    return false;
                }
            });
        },
        // HTML要素のスクロールが可能かどうかを返す
        isEnabledHtmlScroll: (function(){
            var html = $('html'), top = html.scrollTop();
            var top  = html.scrollTop();
            var element = $('<div/>').height(10000).prependTo('body');
            html.scrollTop(10000);
            var result = !! html.scrollTop();
            html.scrollTop(top);
            element.remove();
            return result;
        })()
    });

    $.fn[pluginName] = function(options) {
        return this.each(function(){
            if (! $.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery, window, document));