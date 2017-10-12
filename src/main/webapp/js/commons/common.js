var requires = {
    // 服务器地址
    HOME: 'http://localhost:8080/gmtool',

    SYS_LOAD_DICT: '/sys/loadDict.do',
    SYS_LOAD_DICTRESOURCE: '/sys/loadDictResource.do',
    SYS_LOAD_CONTAINERINFO: '/sys/loadContainerInfo.do',
    SYS_LOAD_PLANTFORM_CONTAINERINFO: '/pf-sys/loadAppInfo.do',
    SYS_LOAD_DICTIONARY_CHENNEL: '/dictionary/findAllDictionaryChannel.do',
    //次元
    STATS_LOAD_CIYUAN_DICT: '/ciyuan-dict/serverAlliance.do',      //次元服务器渠道字典
    STATS_ONLONE_AVEAGE: '/ciyuan-stats/onlineTime.do',           //次元用户即时在线
    STATS_ONLINE: '/ciyuan-stats/onlineNum.do',                   //次元用户在线数
    MOBA_ONLINE_TIME: '/ciyuan-stats/userOnlineTime.do',          //次元用户在线时长
    MOBA_GET_DAU: '/ciyuan-stats/getDauData.do',					 //次元用户活跃
    MOBA_NEW_GROW: '/ciyuan-stats/getRegData.do',                 //次元新增用户
    MOBA_GET_GOLD: '/ciyuan-stats/getUserGold.do',              	 //次元玩家金币信息
    MOBA_GET_DIAMOND: '/ciyuan-stats/getUserDiamond.do',          //次元玩家钻石信息
    MOBA_SALES_HERO: '/ciyuan-stats/getUserHero.do',              //次元英雄销售
    MOBA_SALES_HERO_SKIN: '/ciyuan-stats/getUserHeroSkin.do',     //次元英雄皮肤销售
    MOBA_GET_HERO_SKIN_DIC: '/ciyuan-dict/getSkin.do',            //次元英雄皮肤字典
    MOBA_GET_HERO_DIC: '/ciyuan-dict/getHero.do',                 //次元英雄字典
    MOBA_GET_TSAK_DI: '/ciyuan-dict/getTask.do',                  //次元任务字典
    MOBA_GET_DAILY_TASK: '/ciyuan-stats/getTaskEveryDay.do',      //次元每日任务
    MABA_GET_MAP_DIC: '/ciyuan-dict/getMap.do',                   //次元地图字典
    MABA_GET_HERO_WIN: '/ciyuan-stats/getHeroWin.do',             //次元英雄胜率
    MABA_GET_BATTLE_AVE: '/ciyuan-stats/getBattleStats.do',       //次元场内数据
    MOBA_GET_RETENTION: '/ciyuan-stats/getRetentionStats.do',     //次元留存
    MOBA_GET_GOODS_DIC: '/ciyuan-dict/getGoods.do',              //祈愿及礼包字典
    MOBA_GET_PACKAGE: '/ciyuan-stats/getPackageInformation.do',  //礼包销售信息
    MOBA_GET_DIAMOND_COST: '/ciyuan-stats/getDiamondCost.do',    //祈愿消费
    MOBA_GET_LOTTERY: '/ciyuan-stats/getLottery.do',            //祈愿获得
    MOBA_GET_SKIN_AWAKEN: '/ciyuan-stats/getSkinAwaken.do',    //皮肤觉醒
    MOBA_GET_ACTIVITY: '/ciyuan-stats/getActivity.do',        //次元活动数据
    MOBA_PAYRECORD: '/ciyuan-stats/getUserRechargeRecord.do', //次元充值记录

    AUTH_GROUP_ADD: '/auth/group-add.do',
    AUTH_GROUP_LIST: '/auth/group-list.do',
    AUTH_GROUP_DETAIL: '/auth/group-detail.do',
    AUTH_GROUP_EDIT: '/auth/group-edit.do',
    AUTH_GROUP_DELETE: '/auth/group-delete.do',
    AUTH_GROUP_MEMBER: '/auth/group-member.do',
    AUTH_GROUP_MEMBER_EDIT: '/auth/group-member-edit.do',
    AUTH_ADMIN_ADD: '/auth/admin-add.do',
    AUTH_ADMIN_LIST: '/auth/admin-list.do',
    AUTH_ADMIN_EDIT: '/auth/admin-edit.do',
    AUTH_ADMIN_DELETE: '/auth/admin-delete.do',

    AUTH_LOG_ALL: '/auth/log-all.do',
    AUTH_LOG_MY: '/auth/log-my.do',

    STATS_ONLINE_REAL_TIME: '/game-stats/real-time/realtime-online.do',
    STATS_ONLINE_HIST: '/game-stats/real-time/day-online.do',
    STATS_RETENTION: '/game-stats/user/retention.do',
    STATS_LEVEL: '/game-stats/user/level.do',
    STATS_MISSION: '/game-stats/user/mission.do',
    STATS_CONSUME_DIAMOND: '/game-stats/consume/getUserRechargeRecord .do',
    STATS_CONSUME_GLOD: '/game-stats/consume/gold.do',
    STATS_AUCTION_ANALYZE: '/game-stats/auction/analyze.do',
    STATS_DAILYNEW: '/game-stats/daily/new.do',
    STATS_DAILYACTIVE: '/game-stats/daily/active.do',
    STATS_CONSUME_DETAIL: '/game-stats/consume/detail.do',
    STATS_BATTLE: '/battle/battleSearch.do',
    STATS_RESOURCE: '/resource/resourceSearch.do',
    STATS_MANAGE: '/dictionary/updateDic.do',
    STATS_FIND_MANAGE: '/dictionary/findAllDictionary.do',
    STATS_NEWROLE_REALTIME: '/game-stats/newRole/realTime.do',
    STATS_NEWROLE_DAYGAMETIME: '/game-stats/newRole/dayGameTime.do',
    STATS_PLANTFORM_ACTIVE_USER: '/pf-stats/pfDau.do',
    STATS_PLANTFORM_NEW_GROW: '/pf-stats/pfReg.do',
    STATS_PLANTFORM_USER_PAY: '/pf-stats/pfPayment.do',
    STATS_PLANTFORM_RETENTION: '/pf-stats/pfRr.do',
    STATS_PLANTFORM_ACTIVE_USER_REALTIME: '/pf-realtime/pfDau.do',
    STATS_PLANTFORM_NEW_GROW_REALTIME: '/pf-realtime/pfReg.do',
    STATS_PLANTFORM_USER_PAY_REALTIME: '/pf-realtime/pfPayment.do',
    STATS_PLANTFORM_RETRNTION_COMP: '/pf-realtime/pfRr.do',
    STATS_PLANTFORM_YANDI: '/pf-stats/pfPr.do',
    STATS_PLANTFORM_LTV: '/pf-stats/pfLTV.do',
    STATS_PLANTFORM_YANDI_HOTCLOUD: '/hotCloud/adPr.do',
    STATS_USERS_INFO_SEARCH: '/hope-api/users/userInfoSearch.do',
    STATS_USERS_INFO_DETAILS: '/hope-api/users/info.do',
    STATS_USERS_INFO_DETAILS_LOG_DIAMOND: '/hope-log/diamond.do',
    STATS_USERS_INFO_DETAILS_LOG_GOLD: '/hope-log/gold.do',
    STATS_USERS_INFO_DETAILS_LOG_LOGIN: '/hope-log/login.do',
    STATS_USERS_INFO_DETAILS_LOG_LOGOUT: '/hope-log/logout.do',
    STATS_USERS_INFO_DETAILS_GM_QUIT: '/hope-api/users/quit.do',
    STATS_USERS_INFO_DETAILS_GM_MUTE: '/hope-api/users/mute.do',
    STATS_GAME_MANAGE_ANNOUNCE_ADD: '/hope-api/announceAdd.do',
    STATS_GAME_MANAGE_ANNOUNCE_DEL: '/hope-api/announceDel.do',
    STATS_GAME_MANAGE_ANNOUNCE_GET: '/hope-api/announceGet.do',
    STATS_GAME_MANAGE_EMAIL: '/hope-api/mail.do',
    STATS_GAME_MANAGE_USER_LIST: '/hope-user/userList.do',
    STATS_GAME_MANAGE_EMAIL_SENT: '/hope-api/mail.do',
    STATS_AD_CONFIG: '/hotCloud/addKey.do',
    STATS_AD_CONFIG_LIST: '/hotCloud/adSearch.do',
    STATS_AD_NEW_ADD: '/hotCloud/adRr.do',
    STATS_AD_UPDATE_COST: '/hotCloud/updateKey.do',
    STATS_AD_UPDATE_Daily_COST: '/hotCloud/updateDailyCost.do',
    STATS_USERLEVEL_GET_DATE: '/pf-user/getUserLevelByDate.do',
    STATS_USERLEVEL_GET_APP_INFO: '/pf-user/getUserLevelAppInformation.do',
    SUPPLIER_SHOW: '/pf-user/getCompanyPayInformation.do',
    //平台下面的日统计和月统计
    STATS_pfDailyDashboard: '/pf-stats/pfDailyDashboard.do',
    STATS_pfDailyDetail: '/pf-stats/pfDailyDetail.do',
    STATS_pfMonth: '/pf-stats/pfMonth.do',

    //admin 管理
    PF_MANAGE_USER_SEARCH: '/pf-admin/userInfo.do',
    PF_MANAGE_USER_CHANGE: '/pf-admin/changeUserInfo.do',
    PF_MANAGE_ORDER_MISS: '/pf-admin/orderMiss.do',
    PF_MANAGE_ORDER_SUPPLY: '/pf-admin/supplyOrderAgain.do',
    PF_MANAGE_JIEFENG_SEO: '/pf-admin/userStatus.do',
    PF_MANAGE_JIEFENG_JIEFENG: '/pf-admin/changeUserStatus.do',
    PF_MANAGE_ZHIFU_SEO: '/pf-admin/getTransaction.do',
    PF_MANAGE_ZHIFUBAO_SEO: '/pf-admin/queryAliPay.do',

    PF_ADMIN_GET_ORDERINFO: '/pf-admin/getOrderInfo.do',
    PF_ADMIN_SUPPLY_ORDERFORGAME: '/pf-admin/supplyOrderForGame.do',
    PF_ADMIN_GET_USERINFO: '/pf-admin/getUserInfo.do',
    PF_ADMIN_UPDATE_USERINFO: '/pf-admin/updateUserInfo.do'
};

/**
 * 定义验证各种格式类型的正则表达式对象
 */
var Regexs = {
    email: (/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i),//邮箱
    phone: (/^0[0-9]{2,3}[2-9][0-9]{6,7}$/),//座机手机号码
    ydphpne: (/^((13[4-9])|(15[012789])|147|182|187|188)[0-9]{8}$/),//移动手机号码
    allphpne: (/^((13[0-9])|(15[0-9])|(18[0-9]))[0-9]{8}$/),//所有手机号码
    ltphpne: (/^((13[0-2])|(15[56])|(186)|(145))[0-9]{8}$/),//联通手机号码
    dxphpne: (/^((133)|(153)|(180)|(189))[0-9]{8}$/),//电信手机号码
    phone1: (/^0[0-9]{2,3}-{0,1}[2-9][0-9]{6,7}$/),  //区号中间的'-'座机号码
    url: (/^http:\/\/([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}(:\d+)?\/[0-9a-z%\-_\/\.]+/i),//网址
    num: (/[^0-9]/),//数字
    cnum: (/[^0-9a-zA-Z_.-]/),
    photo: (/\.jpg$|\.jpeg$|\.gif$/i),//图片格式
    tif: (/\.tif$/i),//图片格式
    row: (/\n/ig)
};


/*!
 * jQuery UI Widget @VERSION
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/
( function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "./version"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var widgetUuid = 0;
    var widgetSlice = Array.prototype.slice;

    $.cleanData = (function (orig) {
        return function (elems) {
            var events, elem, i;
            for (i = 0; ( elem = elems[i] ) != null; i++) {
                try {

                    // Only trigger remove when necessary to save time
                    events = $._data(elem, "events");
                    if (events && events.remove) {
                        $(elem).triggerHandler("remove");
                    }

                    // Http://bugs.jquery.com/ticket/8235
                } catch (e) {
                }
            }
            orig(elems);
        };
    })($.cleanData);

    $.widget = function (name, base, prototype) {
        var existingConstructor, constructor, basePrototype;

        // ProxiedPrototype allows the provided prototype to remain unmodified
        // so that it can be used as a mixin for multiple widgets (#8876)
        var proxiedPrototype = {};

        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        var fullName = namespace + "-" + name;

        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }

        if ($.isArray(prototype)) {
            prototype = $.extend.apply(null, [{}].concat(prototype));
        }

        // Create selector for plugin
        $.expr[":"][fullName.toLowerCase()] = function (elem) {
            return !!$.data(elem, fullName);
        };

        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function (options, element) {

            // Allow instantiation without "new" keyword
            if (!this._createWidget) {
                return new constructor(options, element);
            }

            // Allow instantiation without initializing for simple inheritance
            // must use "new" keyword (the code above always passes args)
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };

        // Extend with the existing constructor to carry over any static properties
        $.extend(constructor, existingConstructor, {
            version: prototype.version,

            // Copy the object used to create the prototype in case we need to
            // redefine the widget later
            _proto: $.extend({}, prototype),

            // Track widgets that inherit from this widget in case this widget is
            // redefined after a widget inherits from it
            _childConstructors: []
        });

        basePrototype = new base();

        // We need to make the options hash a property directly on the new instance
        // otherwise we'll modify the options hash on the prototype that we're
        // inheriting from
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function (prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function () {
                function _super() {
                    return base.prototype[prop].apply(this, arguments);
                }

                function _superApply(args) {
                    return base.prototype[prop].apply(this, args);
                }

                return function () {
                    var __super = this._super;
                    var __superApply = this._superApply;
                    var returnValue;

                    this._super = _super;
                    this._superApply = _superApply;

                    returnValue = value.apply(this, arguments);

                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;
                };
            })();
        });
        constructor.prototype = $.widget.extend(basePrototype, {

            // TODO: remove support for widgetEventPrefix
            // always use the name + a colon as the prefix, e.g., draggable:start
            // don't prefix for widgets that aren't DOM-based
            widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });

        // If this widget is being redefined then we need to find all widgets that
        // are inheriting from it and redefine all of them so that they inherit from
        // the new version of this widget. We're essentially trying to replace one
        // level in the prototype chain.
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function (i, child) {
                var childPrototype = child.prototype;

                // Redefine the child widget using the same prototype that was
                // originally used, but inherit from the new version of the base
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor,
                    child._proto);
            });

            // Remove the list of existing child constructors from the old constructor
            // so the old child constructors can be garbage collected
            delete existingConstructor._childConstructors;
        } else {
            base._childConstructors.push(constructor);
        }

        $.widget.bridge(name, constructor);

        return constructor;
    };

    $.widget.extend = function (target) {
        var input = widgetSlice.call(arguments, 1);
        var inputIndex = 0;
        var inputLength = input.length;
        var key;
        var value;

        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {

                    // Clone objects
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ?
                            $.widget.extend({}, target[key], value) :

                            // Don't extend strings, arrays, etc. with objects
                            $.widget.extend({}, value);

                        // Copy everything else by reference
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };

    $.widget.bridge = function (name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function (options) {
            var isMethodCall = typeof options === "string";
            var args = widgetSlice.call(arguments, 1);
            var returnValue = this;

            if (isMethodCall) {
                this.each(function () {
                    var methodValue;
                    var instance = $.data(this, fullName);

                    if (options === "instance") {
                        returnValue = instance;
                        return false;
                    }

                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " +
                        "attempted to call method '" + options + "'");
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }

                    methodValue = instance[options].apply(instance, args);

                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ?
                            returnValue.pushStack(methodValue.get()) :
                            methodValue;
                        return false;
                    }
                });
            } else {

                // Allow multiple hashes to be passed on init
                if (args.length) {
                    options = $.widget.extend.apply(null, [options].concat(args));
                }

                this.each(function () {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {});
                        if (instance._init) {
                            instance._init();
                        }
                    } else {
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }

            return returnValue;
        };
    };

    $.Widget = function (/* options, element */) {
    };
    $.Widget._childConstructors = [];

    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",

        options: {
            classes: {},
            disabled: false,

            // Callbacks
            create: null
        },

        _createWidget: function (options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = widgetUuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;

            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            this.classesElementLookup = {};

            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ?

                    // Element within the document
                    element.ownerDocument :

                    // Element is window or document
                element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }

            this.options = $.widget.extend({},
                this.options,
                this._getCreateOptions(),
                options);

            this._create();

            if (this.options.disabled) {
                this._setOptionDisabled(this.options.disabled);
            }

            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },

        _getCreateOptions: function () {
            return {};
        },

        _getCreateEventData: $.noop,

        _create: $.noop,

        _init: $.noop,

        destroy: function () {
            var that = this;

            this._destroy();
            $.each(this.classesElementLookup, function (key, value) {
                that._removeClass(value, key);
            });

            // We can probably remove the unbind calls in 2.0
            // all event bindings should go through this._on()
            this.element
                .off(this.eventNamespace)
                .removeData(this.widgetFullName);
            this.widget()
                .off(this.eventNamespace)
                .removeAttr("aria-disabled");

            // Clean up events and states
            this.bindings.off(this.eventNamespace);
        },

        _destroy: $.noop,

        widget: function () {
            return this.element;
        },

        option: function (key, value) {
            var options = key;
            var parts;
            var curOption;
            var i;

            if (arguments.length === 0) {

                // Don't return a reference to the internal hash
                return $.widget.extend({}, this.options);
            }

            if (typeof key === "string") {

                // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }

            this._setOptions(options);

            return this;
        },

        _setOptions: function (options) {
            var key;

            for (key in options) {
                this._setOption(key, options[key]);
            }

            return this;
        },

        _setOption: function (key, value) {
            if (key === "classes") {
                this._setOptionClasses(value);
            }

            this.options[key] = value;

            if (key === "disabled") {
                this._setOptionDisabled(value);
            }

            return this;
        },

        _setOptionClasses: function (value) {
            var classKey, elements, currentElements;

            for (classKey in value) {
                currentElements = this.classesElementLookup[classKey];
                if (value[classKey] === this.options.classes[classKey] || !currentElements || !currentElements.length) {
                    continue;
                }

                // We are doing this to create a new jQuery object because the _removeClass() call
                // on the next line is going to destroy the reference to the current elements being
                // tracked. We need to save a copy of this collection so that we can add the new classes
                // below.
                elements = $(currentElements.get());
                this._removeClass(currentElements, classKey);

                // We don't use _addClass() here, because that uses this.options.classes
                // for generating the string of classes. We want to use the value passed in from
                // _setOption(), this is the new value of the classes option which was passed to
                // _setOption(). We pass this value directly to _classes().
                elements.addClass(this._classes({
                    element: elements,
                    keys: classKey,
                    classes: value,
                    add: true
                }));
            }
        },

        _setOptionDisabled: function (value) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);

            // If the widget is becoming disabled, then nothing is interactive
            if (value) {
                this._removeClass(this.hoverable, null, "ui-state-hover");
                this._removeClass(this.focusable, null, "ui-state-focus");
            }
        },

        enable: function () {
            return this._setOptions({disabled: false});
        },

        disable: function () {
            return this._setOptions({disabled: true});
        },

        _classes: function (options) {
            var full = [];
            var that = this;

            options = $.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, options);

            function processClassString(classes, checkOption) {
                var current, i;
                for (i = 0; i < classes.length; i++) {
                    current = that.classesElementLookup[classes[i]] || $();
                    if (options.add) {
                        current = $($.unique(current.get().concat(options.element.get())));
                    } else {
                        current = $(current.not(options.element).get());
                    }
                    that.classesElementLookup[classes[i]] = current;
                    full.push(classes[i]);
                    if (checkOption && options.classes[classes[i]]) {
                        full.push(options.classes[classes[i]]);
                    }
                }
            }

            if (options.keys) {
                processClassString(options.keys.match(/\S+/g) || [], true);
            }
            if (options.extra) {
                processClassString(options.extra.match(/\S+/g) || []);
            }

            return full.join(" ");
        },

        _removeClass: function (element, keys, extra) {
            return this._toggleClass(element, keys, extra, false);
        },

        _addClass: function (element, keys, extra) {
            return this._toggleClass(element, keys, extra, true);
        },

        _toggleClass: function (element, keys, extra, add) {
            add = ( typeof add === "boolean" ) ? add : extra;
            var shift = ( typeof element === "string" || element === null ),
                options = {
                    extra: shift ? keys : extra,
                    keys: shift ? element : keys,
                    element: shift ? this.element : element,
                    add: add
                };
            options.element.toggleClass(this._classes(options), add);
            return this;
        },

        _on: function (suppressDisabledCheck, element, handlers) {
            var delegateElement;
            var instance = this;

            // No suppressDisabledCheck flag, shuffle arguments
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }

            // No element argument, shuffle and use this.element
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }

            $.each(handlers, function (event, handler) {
                function handlerProxy() {

                    // Allow widgets to customize the disabled handling
                    // - disabled as an array instead of boolean
                    // - disabled class as method for disabling individual parts
                    if (!suppressDisabledCheck &&
                        ( instance.options.disabled === true ||
                        $(this).hasClass("ui-state-disabled") )) {
                        return;
                    }
                    return ( typeof handler === "string" ? instance[handler] : handler )
                        .apply(instance, arguments);
                }

                // Copy the guid so direct unbinding works
                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid =
                        handler.guid || handlerProxy.guid || $.guid++;
                }

                var match = event.match(/^([\w:-]*)\s*(.*)$/);
                var eventName = match[1] + instance.eventNamespace;
                var selector = match[2];

                if (selector) {
                    delegateElement.on(eventName, selector, handlerProxy);
                } else {
                    element.on(eventName, handlerProxy);
                }
            });
        },

        _off: function (element, eventName) {
            eventName = ( eventName || "" ).split(" ").join(this.eventNamespace + " ") +
                this.eventNamespace;
            element.off(eventName).off(eventName);

            // Clear the stack to avoid memory leaks (#10056)
            this.bindings = $(this.bindings.not(element).get());
            this.focusable = $(this.focusable.not(element).get());
            this.hoverable = $(this.hoverable.not(element).get());
        },

        _delay: function (handler, delay) {
            function handlerProxy() {
                return ( typeof handler === "string" ? instance[handler] : handler )
                    .apply(instance, arguments);
            }

            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },

        _hoverable: function (element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function (event) {
                    this._addClass($(event.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function (event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-hover");
                }
            });
        },

        _focusable: function (element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function (event) {
                    this._addClass($(event.currentTarget), null, "ui-state-focus");
                },
                focusout: function (event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-focus");
                }
            });
        },

        _trigger: function (type, event, data) {
            var prop, orig;
            var callback = this.options[type];

            data = data || {};
            event = $.Event(event);
            event.type = ( type === this.widgetEventPrefix ?
                type :
            this.widgetEventPrefix + type ).toLowerCase();

            // The original event may come from any element
            // so we need to reset the target on the new event
            event.target = this.element[0];

            // Copy original event properties over to the new event
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!( prop in event )) {
                        event[prop] = orig[prop];
                    }
                }
            }

            this.element.trigger(event, data);
            return !( $.isFunction(callback) &&
            callback.apply(this.element[0], [event].concat(data)) === false ||
            event.isDefaultPrevented() );
        }
    };

    $.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
        $.Widget.prototype["_" + method] = function (element, options, callback) {
            if (typeof options === "string") {
                options = {effect: options};
            }

            var hasOptions;
            var effectName = !options ?
                method :
                options === true || typeof options === "number" ?
                    defaultEffect :
                options.effect || defaultEffect;

            options = options || {};
            if (typeof options === "number") {
                options = {duration: options};
            }

            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;

            if (options.delay) {
                element.delay(options.delay);
            }

            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else if (effectName !== method && element[effectName]) {
                element[effectName](options.duration, options.easing, callback);
            } else {
                element.queue(function (next) {
                    $(this)[method]();
                    if (callback) {
                        callback.call(element[0]);
                    }
                    next();
                });
            }
        };
    });

    return $.widget;

}) );


var app = {
    /**
     * 获取今天的日期.
     */
    todayFun : function () {
        var yesterday = new Date(new Date().getTime());
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        yesterday = yesterday.Format("yyyy-MM-dd");
        return yesterday;
    },
    /**
     * 获取昨天的日期.
     */
    yesterdayFun : function () {
        var yesterday = new Date(new Date()-24*60*60*1000); //取前一天的时间
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        yesterday = yesterday.Format("yyyy-MM-dd");
        return yesterday;
    }

}

