
define('main',[], function() {
    require.config({
            baseUrl: '/js',
            paths: {
                'angular': 'lib/angular',
                'bootstrap': 'lib/bootstrap',
                'underscore': 'lib/underscore',
                'common': 'lib/common',
                'moment': 'lib/moment',
                'validator': 'lib/validator',
                'pager': 'lib/pager',
                'jquery': 'lib/jquery',
                'hashChange': 'lib/hashChange',
                'md5': 'md5',
                'commonDirect': 'common/directive',
                'commonFilter': 'common/filter',
            },
            shim: {
                'angular': {
                    exports: 'angular'
                },
                'underscore': {
                    exports: '_'
                },
                'common': {
                    exports: 'common',
                    deps: ['jquery', 'bootstrap']
                },
                'hashChange': {
                    exports: 'hashChange',
                    deps: ['jquery']
                },
                'pager': {
                    exports: 'pager',
                    deps: ['hashChange']
                },
                'moment': {
                    exports: 'moment'
                },
                'validator': {
                    exports: 'validator',
                    deps: ['jquery', 'common']
                },
                'bootstrap': ['jquery'],
                'commonDirect': {
                    exports: 'commonDirect',
                    deps: [
                        'angular',
                        'common'
                    ]
                },
                'commonFilter': {
                    exports: 'commonFilter',
                    deps: [
                        'angular',
                        'moment'
                    ]
                }
            }
        });
})
;

var common = (function() {
    /* bootstrap popover */
    function popBy(obj, message, direct) {
        $(obj).popover('destroy');
        $(obj).popover({
            placement: direct ||'bottom',
            trigger: 'manual',
            content: message,
            container: 'body'
        });

        clearTimeout($(obj).data('timeout1986'));
        $(obj).popover('show');
        var timeout = setTimeout(function () { $(obj).popover('hide'); }, 3000);
        $(obj).data('timeout1986',timeout);
    }

    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    };

    String.format = function() {
        if (arguments.length == 0)
            return null;

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }

        return str;
    };

    function getQueryString(key) {
        var value = "";
        var sURL = window.document.URL.split('#')[0];

        if (sURL.indexOf("?") > 0) {
            var arrayParams = sURL.split("?");
            var arrayURLParams = arrayParams[1].split("&");

            for (var i = 0; i < arrayURLParams.length; i++) {
                var sParam = arrayURLParams[i].split("=");

                if ((sParam[0] == key) && (sParam[1] != "")) {
                    value = sParam[1];
                    break;
                }
            }
        }

        return decodeURI(value);
    }

    /* checkbox start */
    function selectAllChk(all, item) {
        $(item).prop('checked', $(all).prop('checked'));
    }

    function selectItemChk(item, all) {
        $(all).prop('checked', $(item + ":checked").length === $(item).length);
    }

    /* checkbox end */

    /* scroll start */
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    function getScrollTopBy(name) {
        var tag = document.getElementById(name);
        return tag.scrollTop;
    }

    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }


    function getClientHeightBy(name) {

        var tag = document.getElementById(name);
        var clientHeight = 0;
        return tag.clientHeight;
    }

    function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    function getScrollHeightBy(name) {
        var tag = document.getElementById(name);
        return tag.scrollHeight;
    }


    function reachBottom() {
        if ((getScrollTop() + getClientHeight()) / getScrollHeight() >= 1 && getScrollTop()>0) return true;
        else return false;
    }

    function reachBottomBy(name) {
        if ((getScrollTopBy(name) + getClientHeightBy(name)) / getScrollHeightBy(name) >= 1 && getScrollTopBy(name)>0)
            return true;
        else return false;
    }
    /* scroll end */

    /* offset start */
    function getOffset(evt) {
        var target = evt.target;
        if (target.offsetLeft == undefined) {
            target = target.parentNode;
        }
        var pageCoord = getPageCoord(target);
        var eventCoord = {
            x: window.pageXOffset + evt.clientX,
            y: window.pageYOffset + evt.clientY
        };
        var offset = {
            offsetX: eventCoord.x - pageCoord.x,
            offsetY: eventCoord.y - pageCoord.y
        };
        evt.offsetX = offset.offsetX;
        evt.offsetY = offset.offsetY;
        return offset;
    }

    function getPageCoord(element) {
        var coord = {x: 0, y: 0};
        while (element) {
            coord.x += element.offsetLeft;
            coord.y += element.offsetTop;
            element = element.offsetParent;
        }
        return coord;
    }
    /* offset end */

    function HTMLEncode(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }

    function HTMLDecode(text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }

    //textarea移动光标
    function insertText(obj,str) {
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = str;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;

        } else {
            obj.value += str;
        }

    }

    //textarea移动光标
    function moveCursor(obj, length){
        obj.focus();
        var len = length || obj.value.length;
        if (document.selection) {
            var sel = obj.createTextRange();
            sel.moveStart('character',len);
            sel.collapse();
            sel.select();
        } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
            obj.selectionStart = obj.selectionEnd = len;
        }
    }

    return {
        popBy: popBy,
        getQueryString: getQueryString,
        selectAllChk: selectAllChk,
        selectItemChk: selectItemChk,
        getScrollTop: getScrollTop,
        getScrollTopBy: getScrollTopBy,
        getClientHeight: getClientHeight,
        getClientHeightBy: getClientHeightBy,
        getScrollHeight: getScrollHeight,
        getScrollHeightBy: getScrollHeightBy,
        reachBottom: reachBottom,
        reachBottomBy: reachBottomBy,
        getOffset: getOffset,
        getPageCoord: getPageCoord,
        HTMLEncode: HTMLEncode,
        HTMLDecode: HTMLDecode,
        insertText: insertText,
        moveCursor: moveCursor
    }
})();



 if (typeof define === "function" && define.amd) {
     define('common',['bootstrap', 'jquery'], function() {
         return common;
     });
 }




;
 var validator = (function() {
     return {
         className: 'validator',
         compareMode: {
             lt: function(org, target) {
                 return org < target;
             },
             eq: function(org, target) {
                 return org === target;
             },
             gt: function(org, target) {
                 return org > target;
             },
             le: function(org, target) {
                 return org <= target;
             },
             ge: function(org, target) {
                 return org >= target;
             },
             ne: function(org, target) {
                 return org !== target;
             }
         },
         actions: {
             email: {
                 reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                 err: '格式不正确'
             },
             phone: {
                 reg: /^(1(([358][0-9])|(47)|[8][01236789]))\d{8}$/,
                 err: '格式不正确'
             },
             tel: {
                 reg: /^(\+?\d{1,3})?\s*(0\d{2,3}(\-)?)?\d{7,8}$/,
                 err: '格式不正确'
             },
             specialChar: {
                 reg: /^[a-zA-Z0-9_\(\)\-\u4e00-\u9fa5《》,，]+$/,
                 err: '格式不正确, 只能为字母、数字、汉字、下划线、《、》等'
             },
             "!htmlChar": {
                 reg: /[<>]+/,
                 err: '含有特殊字符'
             },
             password: {
                 reg: /^.{4,18}$/,
                 err: '长度必须为4到18个字符'
             },
             housePhone: {
                 reg: /\d{1,6}/,
                 err: '格式不正确, 只能为6位以内的数字'
             },
             bookingDate: {
                 reg: /^((0?\d)|(1\d)|(2[0-3])):([0-5]\d)$/,
                 err: '格式不正确, 时间格式为00:00'
             },
             "Number": {
                 reg: /^\d+(\.\d+)?$/,
                 err: '格式不正确, 必须为数字'
             },
             strLen: {
                 reg: /^[^\<\>]{1,30}$/,
                 err: '长度必须小于30个字符'
             }
         },

         validate: function(obj) {
             var p = $(obj).attr(this.className) || '';
             var des = $(obj).attr('description') || '';

             var txt = arguments[1] || $(obj).val() || $(obj).html();

             var isRequired = $(obj).get(0).hasAttribute('required') || $(obj).get(0).hasAttribute('xrequired'); //是否必须
             var isCompare = $(obj).attr('compare'); //是否比较

             if (txt.trim().length === 0) {
                 if (isRequired) {
                     common.popBy(obj, des + "不能为空");
                     return false;
                 }

                 if (isCompare && !this.compare(obj, isCompare.split('|')[0], isCompare.split('|')[1])) {
                     common.popBy(obj, des + "输入不匹配");
                     return false;
                 }

                 return true;
             }


             if (p.length === 0) return true;

             var action = this.actions[p];

             if (action == null) {
                 //common.popBy(obj, '对应的正则表达式不存在');
                 return true;
             }

             if (action.reg.constructor !== RegExp) action.reg = new RegExp(action.reg);

             //如果验证的类型是以!开头的 则表示相反的情况
             if (p.indexOf('!') == 0) {
                 if (action.reg.test(txt)) {
                     common.popBy(obj, des + action.err);
                     return false;
                 }
             } else {
                 if (!action.reg.test(txt)) {
                     common.popBy(obj, des + action.err);
                     return false;
                 }
             }



             if (isCompare && !this.compare(obj, isCompare.split('|')[0], isCompare.split('|')[1])) {
                 common.popBy(obj, des + "输入不匹配");
                 return false;
             }

             return true;

         },
         /*mode: lt*/
         compare: function(obj, target, mode) {
             if ($(obj).length == 0 || $(target).length == 0) return false;

             mode = mode || 'eq';

             var objVal = $(obj).val() || $(obj).html();
             var targetVal = $(target).val() || $(target).html();
             return this.compareMode[mode](objVal, targetVal);
         },

         bind: function(parent) {
             var obj = parent ? $(parent).find('.validator') : $('.validator');
             var _this = this;
             obj.blur(function() {
                 _this.validate(this)
             })
         },

         delegate: function(parent) {
             var _this = this;
             $(parent).delegate('.validator', 'blur', function() {
                 _this.validate(this);
             })
         },

         validateAll: function(parent) {
             var _this = this;
             var ret = 0;
             var obj = parent ? $(parent).find('.validator') : $('.validator');

             obj.each(function(i, o) {
                 if (!_this.validate(o)) ret++;
             });

             return ret === 0;
         }
     };

 })();

 if (typeof define === "function" && define.amd) {
     define('validator',['common'], function() {
         return validator;
     });
 };
define('article/service',[
    'angular'
], function() {
    var moduleSvc = angular.module('moduleSvc', []);
    var apiUrl = '/article';

    //$http参数 params -> query data -> body
    moduleSvc.factory('svc', [
        '$http',
        function($http) {
            return {
                delete: function(ids) {
                    var def = $.Deferred();
                    var promise = def.promise();

                    $.ajax({
                        type: "DELETE",
                        url: apiUrl,
                        data: JSON.stringify(ids),
                        dataType: "json",
                        contentType: "application/json"
                    }).success(function(json, status, headers, config) {
                        if (!json) return def.reject('未知的错误');
                        if (!json.code || json.code == 'error') return def.reject(json.message);
                        def.resolve();
                    }).error(function(data, status, headers, config) {
                        def.reject(data);
                    });

                    return promise;
                },

                update: function(model) {
                    var def = $.Deferred();
                    var promise = def.promise();
                    $http.put(apiUrl, model).success(function(json) {
                        if (!json.code || json.code == 'error') return def.reject(json ? json.message : '未知的错误');
                        def.resolve(json.result);
                    }).error(function(data, status, headers, config) {
                        def.reject(data);
                    });

                    return promise;
                },

                create: function(model) {
                    var def = $.Deferred();
                    var promise = def.promise();
                    $http.post(apiUrl, model).success(function(json) {
                        if (!json.code || json.code == 'error') return def.reject(json ? json.message : '未知的错误');
                        def.resolve(json.result);
                    }).error(function(data, status, headers, config) {
                        def.reject(data);
                    });

                    return promise;
                },

                retrieve: function(condition) {
                    var def = $.Deferred();
                    var promise = def.promise();
                    $http.get('/articles', {
                        params: condition
                    }).success(function(json) {

                        if (!json) return def.reject('未知的错误');
                        if (!json.code || json.code == 'error') return def.reject(json.message);
                        def.resolve(json);
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                        def.reject(data);
                    });

                    return promise;
                },

                page: function(condition) {
                    var def = $.Deferred();
                    var promise = def.promise();

                    $http.get('/articles/page', {
                        params: condition
                    }).success(function(json) {
                        if (!json) return def.reject('未知的错误');
                        if (!json.code || json.code === 'error') return def.reject(json.message);
                        def.resolve(json);
                    }).error(function(data, status, headers, config) {
                        def.reject(data);
                    });

                    return promise;
                }
            };
        }
    ]);

});
/**
 * jQuery hashchange 1.0.0
 * 
 * (based on jquery.history)
 *
 * Copyright (c) 2008 Chris Leishman (chrisleishman.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('hashChange',[
            'jquery'
        ], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.fn.extend({
        hashchange: function (callback) { this.bind('hashchange', callback) },
        openOnClick: function (href) {
            if (href === undefined || href.length == 0)
                href = '#';
            return this.click(function (ev) {
                if (href && href.charAt(0) == '#') {
                    // execute load in separate call stack
                    window.setTimeout(function () { $.locationHash(href) }, 0);
                } else {
                    window.location(href);
                }
                ev.stopPropagation();
                return false;
            });
        }
    });

    // IE 8 introduces the hashchange event natively - so nothing more to do
    if ($.support.leadingWhitespace && document.documentMode && document.documentMode >= 8) {
        $.extend({
            locationHash: function (hash) {
                if (!hash) hash = '#';
                else if (hash.charAt(0) != '#') hash = '#' + hash;
                location.hash = hash;
            }
        });
        return;
    }

    var curHash;
    // hidden iframe for IE (earlier than 8)
    var iframe;

    $.extend({
        locationHash: function (hash) {
            if (curHash === undefined) return;

            if (!hash) hash = '#';
            else if (hash.charAt(0) != '#') hash = '#' + hash;

            location.hash = hash;

            if (curHash == hash) return;
            curHash = hash;

            if ($.support.leadingWhitespace) updateIEFrame(hash);
            $.event.trigger('hashchange');
        }
    });

    $(document).ready(function () {
        curHash = location.hash;
        if ($.support.leadingWhitespace) {
            // stop the callback firing twice during init if no hash present
            if (curHash == '') curHash = '#';
            // add hidden iframe for IE
            iframe = $('<iframe />').hide().get(0);
            $('body').prepend(iframe);
            updateIEFrame(location.hash);
            setInterval(checkHashIE, 100);
        } else {
            setInterval(checkHash, 100);
        }
    });
    $(window).unload(function () { iframe = null });

    function checkHash() {
        var hash = location.hash;
        if (hash != curHash) {
            curHash = hash;
            $.event.trigger('hashchange');
        }
    }

    if ($.support.leadingWhitespace) {
        // Attach a live handler for any anchor links
        $('a[href^=#]').on('click', function () {
            var hash = $(this).attr('href');
            // Don't intercept the click if there is an existing anchor on the page
            // that matches this hash
            if ($(hash).length == 0 && $('a[name=' + hash.slice(1) + ']').length == 0) {
                $.locationHash(hash);
                return false;
            }
        });
    }

    function checkHashIE() {
        // On IE, check for location.hash of iframe
        var idoc = iframe.contentDocument || iframe.contentWindow.document;
        var hash = idoc.location.hash;
        if (hash == '') hash = '#';

        if (hash != curHash) {
            if (location.hash != hash) location.hash = hash;
            curHash = hash;
            $.event.trigger('hashchange');
        }
    }

    function updateIEFrame(hash) {
        if (hash == '#') hash = '';
        var idoc = iframe.contentWindow.document;
        idoc.open();
        idoc.close();
        if (idoc.location.hash != hash) idoc.location.hash = hash;
    }

}));



//(function () {
//    var scriptNode = document.createElement('script');
//
//    scriptNode.type = "text/javascript";
//    scriptNode.src = "/lib/hashchange.js";
//
//    document.getElementsByTagName("head")[0].appendChild(scriptNode);
//})();

function pagerDelegate(obj, method, mode) {
    var delegate = function () {
        var args = [];
        args.push(mode);
        method.apply(obj, args);
    };

    return delegate;
}

function Pager(pageSize, recordCount, pageindex, _condition, callBack) {
    this.pageSize = pageSize;
    this.recordcount = recordCount;
    this.pageIndex = pageindex;
    this.temppage = this.pageIndex;
    this.callback = callBack;
    this.condition = _condition;

    this.interval = 3;
    this.absdiff = (this.interval - 1) / 2;

    this.pagecount = Math.ceil(this.recordcount / this.pageSize);
    if (this.pageIndex > this.pagecount)
        this.pageIndex = this.pagecount;

    this.create = function () {
        return function () {
            this.renderHtml.apply(this, arguments);
        }
    }


    if (this.pagecount == 0)
        this.pagecount = 1;

    if (this.pageIndex == 0)
        this.pageIndex = 1;

    this.flag = false;
    var aaaa = this;

    this.pref = (arguments.length > 5) ? arguments[5] : "";

    if (typeof ($(window).hashchange) != "undefined") {
        $(window).hashchange(function () {
            var hashPage = location.hash.substr(location.hash.indexOf("page") + 4);

            if (hashPage.length <= 0)
                hashPage = 1;

            var tt = pagerDelegate(aaaa, callBack, { "mode": "nums", "val": parseInt(hashPage) });

            if (aaaa.flag != true && (("#" + aaaa.pref + "page" + hashPage == location.hash) || (hashPage == 1 && location.hash == "#"))) {
                tt();
            }


            aaaa.flag = false;
        });
    }
}

Pager.prototype.getDefaultIndex = function () {
    var hashPage = location.hash.substr(location.hash.indexOf("page") + 4);
    if (hashPage.length <= 0)
        return 1;
    else
        return parseInt(hashPage);
}

Pager.prototype.renderHtml = function () {
    var _container = arguments[0];
    _container.innerHTML = "";
    _container.appendChild(document.createTextNode(String.format("共{0}条数据 {1} / {2}页 ",
        this.recordcount, this.pageIndex, this.pagecount)));

    // 第一页
    var firstA = document.createElement("A");

    firstA.appendChild(document.createTextNode("首页"));
    firstA.setAttribute("href", "javascript:void(0)");
    firstA.onclick = pagerDelegate(this, this.callback, { "mode": "first" });

    _container.appendChild(firstA);
    _container.appendChild(document.createTextNode(" "));

    // 上一页
    var previousA = document.createElement("A");

    previousA.appendChild(document.createTextNode("上一页"));
    previousA.setAttribute("href", "javascript:void(0)");
    previousA.onclick = pagerDelegate(this, this.callback, { "mode": "previous" });

    _container.appendChild(previousA);
    _container.appendChild(document.createTextNode(" "));

    // 下一页
    var nextA = document.createElement("A");

    nextA.appendChild(document.createTextNode("下一页"));
    nextA.setAttribute("href", "javascript:void(0)");
    nextA.onclick = pagerDelegate(this, this.callback, { "mode": "next" });

    _container.appendChild(nextA);
    _container.appendChild(document.createTextNode(" "));

    // 末页
    var lastA = document.createElement("A");

    lastA.appendChild(document.createTextNode("末页"));
    lastA.setAttribute("href", "javascript:void(0)");
    lastA.onclick = pagerDelegate(this, this.callback, { "mode": "last" });

    _container.appendChild(lastA);
    _container.appendChild(document.createTextNode(" "));

}

Pager.prototype.renderNumberStyleHtml = function () {
    var _container = arguments[0];
    _container.innerHTML = "";

    var _containerUl = $("<ul></ul>").get(0)
    $(_containerUl).addClass("pagination");


    var _liele = $("<li></li>").get(0)
    var _spanele = $("<span></span>").get(0)

    $(_spanele).addClass("pageinfo");
    _liele.appendChild(_spanele);


    var allStrong1 = $("<strong></strong>").get(0);
    var allStrong2 = $("<strong></strong>").get(0);

    allStrong1.appendChild(document.createTextNode(String.format(" {2} ",
        this.recordcount, this.pageIndex, this.pagecount)));
    allStrong2.appendChild(document.createTextNode(String.format(" {0} ",
        this.recordcount, this.pageIndex, this.pagecount)));
    _spanele.appendChild(document.createTextNode("共"));
    _spanele.appendChild(allStrong1);
    _spanele.appendChild(document.createTextNode("页"));
    _spanele.appendChild(allStrong2);
    _spanele.appendChild(document.createTextNode("条"));

    _containerUl.appendChild(_liele);


    // 第一页
    var firstLi = $("<li></li>").get(0)
    var firstA = $("<a></a>").get(0)


    firstA.appendChild(document.createTextNode("首页"));
    firstA.setAttribute("href", "javascript:void(0)");
    firstA.onclick = pagerDelegate(this, this.callback, { "mode": "first" });
    firstLi.appendChild(firstA);

    _containerUl.appendChild(firstLi);
    _containerUl.appendChild(document.createTextNode(" "));

    // 上一页
    var previousLi = $("<li></li>").get(0);
    var previousA = $("<a></a>").get(0)

    previousA.appendChild(document.createTextNode(" 上一页 "));
    previousA.setAttribute("href", "javascript:void(0)");
    previousA.onclick = pagerDelegate(this, this.callback, { "mode": "previous" });
    previousLi.appendChild(previousA);

    _containerUl.appendChild(previousLi);
    _containerUl.appendChild(document.createTextNode(" "));

    // 此处开始渲染中间页码串
    if (this.pageIndex + this.absdiff > this.interval && this.pageIndex + this.absdiff <= this.pagecount)
        this.generateNumsText(this.pageIndex - this.absdiff, this.pageIndex + this.absdiff, _containerUl);
    else if (this.pageIndex + this.absdiff <= this.interval)
        this.generateNumsText(1, this.interval, _containerUl);
    else if (this.pageIndex + this.absdiff > this.pagecount)
        this.generateNumsText(this.pagecount - this.interval + 1, this.pagecount, _containerUl);

    // 下一页
    var nextLi = $("<li></li>").get(0);
    var nextA = $("<a></a>").get(0)

    nextA.appendChild(document.createTextNode(" 下一页 "));
    nextA.setAttribute("href", "javascript:void(0)");
    nextA.onclick = pagerDelegate(this, this.callback, { "mode": "next" });

    nextLi.appendChild(nextA);
    _containerUl.appendChild(nextLi);
    _containerUl.appendChild(document.createTextNode(" "));

    // 末页
    var lastLi = $("<li></li>").get(0);
    var lastA = $("<a></a>").get(0)


    lastA.appendChild(document.createTextNode("末页"));
    lastA.setAttribute("href", "javascript:void(0)");
    lastA.onclick = pagerDelegate(this, this.callback, { "mode": "last" });

    lastLi.appendChild(lastA);
    _containerUl.appendChild(lastLi);
    _containerUl.appendChild(document.createTextNode(" "));

    // 页码输入框
    var txtLi = $("<li></li>").get(0);
    var txtSpan = $("<span></span>").get(0)

    $(txtSpan).addClass("pageinput");
    txtLi.appendChild(txtSpan);
    var txtGo = $("<INPUT />").get(0)

    $(txtGo).addClass("pagetxt")
    txtGo.setAttribute("type", "text");
    txtGo.setAttribute("name", "gopage");
    txtGo.setAttribute("id", "gopage");
    txtGo.setAttribute("size", "2");
    txtGo.setAttribute("value", this.pageIndex);
    txtGo.onchange = pagerDelegate(this, this.handleTextChanged, { "objRef": txtGo });

    txtSpan.appendChild(txtGo);

    // Go按钮
    var btnGo = $("<a></a>").get(0)
    btnGo.setAttribute("href", "javascript:void(0)");
    btnGo.appendChild(document.createTextNode(" GO "));

    btnGo.onclick = pagerDelegate(this, this.callback, { "mode": "inputnums" });
    txtSpan.appendChild(btnGo);
    _containerUl.appendChild(txtLi);
    _containerUl.appendChild(document.createTextNode(""));


    _container.appendChild(_containerUl);
}

Pager.prototype.renderSimpleNumberStyleHtml = function () {
    var _container = arguments[0];
    _container.innerHTML = "";

    var _containerUl = document.createElement("<span>");

    // 此处开始渲染中间页码串
    if (this.pageIndex + this.absdiff > this.interval && this.pageIndex + this.absdiff <= this.pagecount)
        this.generateNumsText_1(this.pageIndex - this.absdiff, this.pageIndex + this.absdiff, _containerUl);
    else if (this.pageIndex + this.absdiff <= this.interval)
        this.generateNumsText_1(1, this.interval, _containerUl);
    else if (this.pageIndex + this.absdiff > this.pagecount)
        this.generateNumsText_1(this.pagecount - this.interval + 1, this.pagecount, _containerUl);

    // 上一页

    var previousA = document.createElement("A");

    previousA.appendChild(document.createTextNode(" 上一页 "));
    previousA.setAttribute("href", "javascript:void(0)");
    previousA.setAttribute("className", "wy_pr_bn");
    previousA.onclick = pagerDelegate(this, this.callback, { "mode": "previous" });


    _containerUl.appendChild(previousA);
    _containerUl.appendChild(document.createTextNode(" "));
    // 下一页

    var nextA = document.createElement("A");

    nextA.appendChild(document.createTextNode(" 下一页 "));
    nextA.setAttribute("href", "javascript:void(0)");
    nextA.setAttribute("className", "wy_next_bn");
    nextA.onclick = pagerDelegate(this, this.callback, { "mode": "next" });

    _containerUl.appendChild(nextA);
    _containerUl.appendChild(document.createTextNode(" "));


    var _containerSpan = document.createElement("<span>");
    _containerSpan.setAttribute("className", "span_wy01");


    _containerSpan.appendChild(document.createTextNode(String.format("共{2}页 ",
        this.recordcount, this.pageIndex, this.pagecount)));

    _container.appendChild(_containerSpan);
    _container.appendChild(_containerUl);
}

Pager.prototype.moveIndicator = function () {
    if (arguments.length != 1 || arguments[0] == null || arguments[0].mode == null)
        return;

    switch (arguments[0].mode) {
        case "first":
            this.pageIndex = 1;

            break;
        case "previous":
            this.pageIndex -= 1;

            if (this.pageIndex < 1)
                this.pageIndex = 1;

            break;
        case "next":
            this.pageIndex += 1;

            if (this.pageIndex > this.pagecount)
                this.pageIndex = this.pagecount;

            break;
        case "last":
            this.pageIndex = this.pagecount;

            break;
        case "nums":
            this.pageIndex = arguments[0].val;

            break;
        case "inputnums":
            this.pageIndex = this.temppage;

            break;
    }

    if (this.condition && this.condition.pageIndex) {
        this.flag = true;

        this.condition.pageIndex = this.pageIndex;

        var pageHash = "#" + this.pref + "page" + this.pageIndex.toString();

        window.navigator.userAgent.toLowerCase().indexOf('msie') > -1 ? $.locationHash(pageHash) : location.hash = pageHash;
    }
}

Pager.prototype.setRecordCount = function () {
    this.recordcount = arguments[0];

    this.pagecount = Math.ceil(this.recordcount / this.pageSize);
    if (this.pageIndex > this.pagecount)
        this.pageIndex = this.pagecount;

    if (this.pagecount == 0)
        this.pagecount = 1;

    if (this.pageIndex == 0)
        this.pageIndex = 1;
}

Pager.prototype.setInterval = function () {
    this.interval = arguments[0];
    this.absdiff = (this.interval - 1) / 2;
}

Pager.prototype.generateNumsText = function () {
    var _container = arguments[2];
    if (arguments[0] < 1)
        arguments[0] = 1;
    if (arguments[1] > this.pagecount)
        arguments[1] = this.pagecount;

    for (var i = arguments[0]; i <= arguments[1]; i++) {

        var numsLi = $("<li></li>").get(0);
        var numsA = $("<a></a>").get(0);

        if (i == this.pageIndex) {
            $(numsLi).addClass("thisclass");
            numsA.appendChild(document.createTextNode(String.format(" {0} ", i)));
        }
        else
            numsA.appendChild(document.createTextNode(i.toString()));

        numsA.setAttribute("href", "javascript:void(0)");
        numsA.onclick = pagerDelegate(this, this.callback, { "mode": "nums", "val": i });

        numsLi.appendChild(numsA);
        _container.appendChild(numsLi);
        _container.appendChild(document.createTextNode(" "));
    }
}

Pager.prototype.generateNumsText_1 = function () {
    var _container = arguments[2];
    if (arguments[0] < 1)
        arguments[0] = 1;
    if (arguments[1] > this.pagecount)
        arguments[1] = this.pagecount;

    for (var i = arguments[0]; i <= arguments[1]; i++) {

        var numsA = $("<a></a>").get(0);
        if (i == this.pageIndex) {
            $(numsA).addClass("seleced");

            numsA.appendChild(document.createTextNode(String.format(" {0} ", i)));
        }
        else
            numsA.appendChild(document.createTextNode(i.toString()));

        numsA.setAttribute("href", "javascript:void(0)");
        numsA.onclick = pagerDelegate(this, this.callback, { "mode": "nums", "val": i });

        _container.appendChild(numsA);
        _container.appendChild(document.createTextNode(" "));
    }
}

Pager.prototype.handleTextChanged = function () {
    this.temppage = arguments[0].objRef.value;
}


if ( typeof define === "function" && define.amd ) {
    define('pager',['hashChange'], function () { return Pager; } );
}



;
define('article/controller',[
    'angular',
    'common',
    'underscore',
    'pager'
], function() {
    var moduleListCtrl = angular.module('moduleCtrl', []);
    moduleListCtrl.controller('controller', ['$scope', '$window', 'svc', controller]);

    function controller($scope, $window, svc) {
        $scope.models = [];
        $scope.model = {};
        $scope.saveType = ''; //弹出框保存model模式 : create , update

        $scope.pageCondition = {
            keyword : '',
            pageSize: 10,
            pageIndex: 1,
            uid : common.getQueryString('uid')
        };

        $scope.$on('$destroy', function() {
            console.log($scope.models.length + '..');
        });


        $scope.remove = function(scope, obj) {
            if (!confirm('确认删除项目吗？')) return;

            svc.delete([scope.model.id]).done(function() {
                $scope.$broadcast('page');
            }).fail(function(msg) {
                common.popBy(obj, msg);
            });
        };

        $scope.removeBatch = function(scope, obj) {
            if ($scope.selectItems.length == 0) return common.popBy(obj, '请选择要删除的项目');
            if (!confirm('确认删除选中的项目吗？')) return '';

            svc.delete($scope.selectItems).done(function() {
                $scope.$broadcast('page');
            }).fail(function(msg) {
                common.popBy(obj, msg);
            });

        };

        $scope.$on('preSave', function(evt, args) {
            args = args || {};
            $scope.model = adapter(args.model);
            $scope.saveType = args.saveType;
        });

        $scope.save = function(scope, obj) {
            var mothodMap = {
                'create': create,
                'update': update
            };
            if (!mothodMap[$scope.saveType]) return console.log('saveType is  invalid');

            mothodMap[$scope.saveType]();
        };

        $scope.search = function () {
            $scope.pageCondition.pageIndex = 1;
            $scope.$broadcast('page');
        };

        function create() {
            svc.create($scope.model).done(function(p) {
                $scope.models.push(adapter(p));
                $scope.$broadcast('postSave');
            }).fail(function() {
                $scope.$broadcast('postSave');
            });
        }

        function update() {
            svc.update($scope.model).done(function() {
                var model = _.find($scope.models, function(item) { return item.id === $scope.model.id; });

                for (var each in $scope.model)
                    if ($scope.model.hasOwnProperty(each)) model[each] = $scope.model[each];

                $scope.$broadcast('postSave');
            }).fail(function() {
                $scope.$broadcast('postSave');
            });
        }

        function adapter(obj) {
            obj = obj || {};
            return {
                id: obj.id || 0,
                title: obj.title || '',
                content: obj.content || '',
                status: obj.status || '',
                uid : obj.uid || common.getQueryString('uid')
            }
        }
    }
});
define('commonFilter',[
    'moment',
    'angular'
], function () {
    var commonFilter = angular.module('commonFilter', []);
    commonFilter.filter('dateFilter', function () {
        return function (input) {
            return moment(parseInt(input) * 1000).format('YYYY-MM-DD HH:mm');
        }
    });

    commonFilter.filter('searchFilter', function () {
        return function (items, keyword) {
            if (!keyword) return items;
            return _.filter(items, function (item) {
                return item.name.indexOf(keyword) > -1;
            });
        }
    });
});
//controller最先运行,通过$scope.$parent与页面controller交互
//compile阶段进行标签解析和变换，link阶段进行数据绑定等操作
//当complie存在的时候，link会被屏蔽
//通过require属性可以指定关联的controller

//如果scope是bool值的时候 指令的$scope指向controller的$scope
//如果scope是对象的时候 指令的$scope.$parent指向controller的$scope

//$emit向父级发送事件 $broadcast向子级发送事件

//@:引用 =:双向绑定 &:以wrapper function形式引用
// restrict 的取值可以有三种：

// A 用于元素的 Attribute，这是默认值
// E 用于元素的名称
// C 用于 CSS 中的 class

define('commonDirect',[
	'angular',
	'pager',
	'bootstrap',
	'underscore',
	'jquery'
], function() {
	var commonDirect = angular.module('commonDirect', []);

	// commonDirect.directive('datetimepicker',
	// 	function() {
	// 		return {
	// 			priority: 0,
	// 			template: '',
	// 			replace: false,
	// 			transclude: false,
	// 			restrict: 'A',
	// 			scope: false,
	// 			link: function postLink(scope, iElement, iAttrs, ctrl) {
	// 				$(iElement).val('').datetimepicker({
	// 					format: 'yyyy-mm',
	// 					autoclose: true,
	// 					language: 'zh-CN',
	// 					startView: 'year',
	// 					minView: 'year',
	// 					minuteStep: 1,
	// 					endDate: new Date()
	// 				});
	// 			}
	// 		};
	// 	});

	// modal-dialog
	commonDirect.directive('modalDialog',
		function() {
			return {
				priority: 0,
				template: '',
				replace: false,
				transclude: false,
				restrict: 'A',
				scope: {},
				controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
					$scope.$on('postSave', function() {
						setTimeout(function() {
							$($element).modal('hide');
						});
					});
				}],
				link: function postLink(scope, iElement, iAttrs, ctrl) {
					$(iElement).on('hidden.bs.modal', function(e) {
						scope.$parent.model = {};
						scope.$apply();
					});
				}
			};
		});

	commonDirect.directive('pager', ['svc', function(svc) {
		return {
			priority: 0,
			template: '',
			replace: false,
			transclude: false,
			restrict: 'A',
			scope: {
				targetEle:'@'
			},
			controller:['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

				$scope.pageList = function() {
					$scope.pager.moveIndicator(arguments[0]);
					svc.page($scope.pager.condition)
						.done(function(json) {
							$scope.$parent.models = json.result || [];
							$($scope.targetEle).show();
							$scope.pager.setRecordCount(json.total || 0);
							$scope.pager.renderNumberStyleHtml($($element).get(0));
						}).fail(function() {
							console.log('数据获取失败');
						});
				}

				$scope.$on('page', function() {
					setTimeout(function() {
						$scope.pageList({
							mode: 'nums',
							val: 1
						});
					});
				});

				$scope.pager = new Pager($scope.$parent.pageCondition.pageSize, 0, 1, $scope.$parent.pageCondition, $scope.pageList, -1);
			}],
			link: function postLink($scope, iElement, iAttrs, ctrl) {
				$scope.pager.renderNumberStyleHtml($(iElement).get(0));
				$scope.pageList({
					mode: 'nums',
					val: 1
				});
			}
		};
	}]);

	commonDirect.directive('chkItem',
		function() {
			return {
				priority: 0,
				template: '',
				replace: false,
				transclude: false,
				restrict: 'A',
				scope: {
					chkType: '@' //全选框：chk-type='all'
				},
				controller:['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
					$scope.$parent.selectItems = $scope.$parent.selectItems || [];

					$scope.$on('chkAll', function(evt, args) {
						if (args) {
							$scope.$parent.selectItems = _.pluck($scope.$parent.models, 'id');
						} else {
							$scope.$parent.selectItems = [];
						}

						_.each($scope.$parent.models, function(item) {
							item.selStatus = $scope.$parent.selectItems.indexOf(item.id) > -1;
						});

						$scope.$parent.$apply()
					});

					$scope.$on('chkItem', function(evt, args) {
						if (args.val) {
							$scope.$parent.selectItems.push(args.id);
							$scope.$parent.selectItems = _.uniq($scope.$parent.selectItems);
						} else {
							$scope.$parent.selectItems = _.without($scope.$parent.selectItems, args.id);
						}

						$(':checkbox[chk-type="all"]').prop('checked', $scope.$parent.selectItems.length === $scope.$parent.models.length)
					});
				}],
				link: function postLink(scope, iElement, iAttrs, ctrl) {
					var chkType = scope.chkType || '';

					$(iElement).on('click', function(e) {
						if (chkType === 'all') {
							scope.$broadcast('chkAll', $(iElement).prop('checked'))
						} else {
							var args = {
								id: scope.$parent.model.id,
								val: $(iElement).prop('checked')
							}
							scope.$broadcast('chkItem', args)
						}
					});
				}
			};
		});

	// commonDirect.directive('fileupload',
	// 	function() {
	// 		return {
	// 			priority: 0,
	// 			template: '',
	// 			replace: false,
	// 			transclude: false,
	// 			restrict: 'A',
	// 			scope: false,
	// 			link: function postLink(scope, iElement, iAttrs, ctrl) {
	// 				var url = '/api/user/portrait';
	// 				$(iElement).fileupload({
	// 					url: url,
	// 					dataType: 'json',
	// 					add: function(e, data) {
	// 						data.submit();
	// 					},
	// 					done: function(e, data) {
	// 						if (!data.result) return console.log('未知的错误');
	// 						if (data.result.state === 'fail') return console.log('fail');

	// 						console.log(data.result.result, scope);
	// 						scope.$apply(function() {
	// 							scope.model.portrait = data.result.result;
	// 						});
	// 					},
	// 					progressall: function(e, data) {}
	// 				}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
	// 			}
	// 		};
	// 	});

	

	commonDirect.directive('showModal',
		function() {
			return {
				priority: 0,
				template: '',
				replace: false,
				transclude: false,
				restrict: 'A',
				scope: {
					saveType: '@',
					targetModal: '@'
				},
				controller:['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
					//console.log('showmodal ->',$scope)
				}],
				link: function postLink(scope, iElement, iAttrs, ctrl) {
					$(iElement).on('click', function() {
						scope.$apply(function() {
							var model = scope.saveType == 'update' ? scope.$parent.model : {};
							scope.$emit('preSave', {
								model: model,
								saveType: scope.saveType
							});
							$(scope.targetModal).modal('show');
						});
					});
				}
			};
		});
});
require.config({
	baseUrl: '/js'
});

require(['main'], function() {
	require(['jquery', 'validator', 'bootstrap', 'article/service', 'article/controller', 'commonFilter', 'commonDirect'], function() {
		validator.bind();
		angular.module('myApp', ['moduleCtrl', 'moduleSvc', 'commonFilter', 'commonDirect']);
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['myApp']);
		});
	});
});
define("article/app", function(){});
