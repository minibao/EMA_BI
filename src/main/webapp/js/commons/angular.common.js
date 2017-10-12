/**
 *AngularJS扩展库
 */
angular.module("ngCommon", ['ngCookies', 'ngStorage', 'ngSanitize', 'ui.select', 'ui.grid', 'ui.grid.selection',
    'ui.grid.exporter', 'ui.grid.grouping', 'ui.grid.resizeColumns', 'ui.grid.moveColumns',
    'angular-bootstrap-select', 'angular-bootstrap-select.extra'])
/**
 * 使用方法： 直接引入该模块
 * 改变ContentType 并转换提交参数
 */
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }])
/**
 * 解决ie8placeholder兼容问题
 * author:cober
 * 使用方法：<element placehold="this is placehold text"  ng-model="keyWords"/>
 */
    .directive('placehold', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {

                var value;
                var PLACE_HOLDER_COLOR = "rgb(169,169,169)";
                var EHSY_COLOR = "#333";

                var placehold = function () {
                    element.val(attr.placehold);
                    element.css('color', PLACE_HOLDER_COLOR);
                };
                var unplacehold = function () {
                    element.val('');
                    element.css("color", EHSY_COLOR);
                };

                scope.$watch(attr.ngModel, function (val) {
                    value = val || '';
                });

                element.bind('focus', function () {
                    if (value == '') unplacehold();
                });

                element.bind('blur', function () {
                    if (element.val() == '') placehold();
                });

                ctrl.$formatters.unshift(function (val) {
                    if (!val) {
                        placehold();
                        value = '';
                        return attr.placehold;
                    }
                    return val;
                });
            }
        };
    })

/**
 *提示信息扩展，直接调用。
 */
    .config(["$sceProvider", function ($sceProvider) {
        $sceProvider.enabled(false);
    }])
    .service("tips", ["$timeout", function ($timeout) {
        function show(content, time, callback) {
            var $body = angular.element(document.getElementsByTagName("body")[0]);
            var tpl = angular.element('<div class="angular-tip-modal"></div><div class="angular-tip">' + content + '</div>');
            $body.append(tpl);
            $tip = angular.element($($body).find(".angular-tip"));
            $tip.css("margin-left", -1 * $($tip).outerWidth() / 2);
            if (time) {
                $timeout(function () {
                    hide(callback);
                }, time);
            }
        };
        function hide(callback) {
            $("[class^='angular-tip']").remove();
            if (callback) {
                callback();
            }
        };
        return {
            show: show,
            hide: hide
        };
    }])

//添加一个分组信息
/**
 * 使用方法：
 * <div li-tip="提示" li-tip-place="top" >这是内容</div>
 *  其中place默认是bottom
 */
    .directive("liTip", [function () {
        return {
            restrict: "A",
            scope: {
                tip: "@liTip",
                place: "@liTipPlace"
            },
            link: function (scope, element, attrs) {
                element.tooltip({
                    title: scope.tip,
                    placement: scope.place || "bottom"
                })
            }
        }
    }])
    .directive('watch', [function () {
        return {
            link: function (scope, element) {
                scope.$watch(scope.method, function (newValue, oldValue, scope) {
                    if (newValue && !oldValue) {
                        element[0].focus(); //获取焦点
                    }
                }, true);
                ;
            }
        };
    }])

//过滤器
    .filter("emoji", ["$sce", function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input.emoji().toString());
        };
    }])

//提示组件
    .factory("alertTip", ["$timeout", function ($timeout) {
        function show(content, auto_close_time) {
            var $body = $("body");    //获取一个body
            hide();
            var tpl = "<div class='ng-alert-tip loading-wrap'><div class='loading loading-txt'>" + content + "</div></div>";
            $(tpl).appendTo($body);
            if (!isNaN(auto_close_time)) {
                $timeout(hide, auto_close_time);
            }
        }

        function hide() {
            $(".ng-alert-tip").remove();
        }

        return {
            show: show,
            hide: hide
        }
    }])
/**分页组件
 *属性主要包括pageNumber,totalPage
 *<paginate ng-model="page" change="load(page.pageNumber)"/>
 */
    .directive("paginate", function () {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: window.ctx + '/js/angular/template/paginate.html',
            require: "?ngModel",
            scope: {
                page: "=ngModel",
                change: "&change"    //带表页面切换时间
            },
            link: function (scope, element, attrs, ngModelController) {
                function setPage() {
                    if (scope.page == undefined || scope.page.totalPage == undefined) {
                        return;
                    }
                    var totalPage = scope.page.totalPage;
                    var pn = scope.page.pageNumber;
                    scope.pageNumber = pn;
                    scope.newpage = new Array();
                    if (totalPage <= 10) {
                        for (var i = 0; i < totalPage; i++) {
                            scope.newpage.push(i + 1);        //创建新页面
                        }
                    }
                    ;
                    if (totalPage > 10) {
                        if (pn > 5) {
                            //判断是不是最后5页
                            if (pn <= totalPage - 5) {
                                for (var i = pn - 4; i < pn + 6; i++) {
                                    scope.newpage.push(i);        //未到右侧边界
                                }
                            } else {
                                for (var i = totalPage - 9; i <= totalPage; i++) {
                                    scope.newpage.push(i);        //到达右侧边界
                                }
                            }
                        } else {
                            //显示前10页
                            for (var i = 1; i < 11; i++) {
                                scope.newpage.push(i);
                            }
                        }
                    }
                }

                //切换页面
                scope.load = function (n) {
                    var pn = parseInt(n, 10);
                    if (pn > scope.page.totalPage) {
                        pn = scope.page.totalPage;
                    }
                    if (scope.page.pageNumber == pn) {
                        return;
                    }
                    scope.page.pageNumber = pn;
                    //调用方法
                    scope.change({"$pageNumber": scope.page.pageNumber});
                };
                scope.$watch("page.pageNumber", setPage);

            }
        };
    })
/**
 * 自动给http请求增加等待功能，门限是500ms
 */
    .config(['$httpProvider', function ($httpProvider) {

        var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, cfpLoadingBar) {

            /**
             * The total number of requests made
             */
            var reqsTotal = 0;

            /**
             * The number of requests completed (either successfully or not)
             */
            var reqsCompleted = 0;

            /**
             * The amount of time spent fetching before showing the loading bar
             */
            var latencyThreshold = cfpLoadingBar.latencyThreshold;

            /**
             * $timeout handle for latencyThreshold
             */
            var startTimeout;


            /**
             * calls cfpLoadingBar.complete() which removes the
             * loading bar from the DOM.
             */
            function setComplete() {
                $timeout.cancel(startTimeout);
                cfpLoadingBar.complete();
                reqsCompleted = 0;
                reqsTotal = 0;
            }

            /**
             * Determine if the response has already been cached
             * @param  {Object}  config the config option from the request
             * @return {Boolean} retrns true if cached, otherwise false
             */
            function isCached(config) {
                var cache;
                var defaultCache = $cacheFactory.get('$http');
                var defaults = $httpProvider.defaults;

                // Choose the proper cache source. Borrowed from angular: $http service
                if ((config.cache || defaults.cache) && config.cache !== false &&
                    (config.method === 'GET' || config.method === 'JSONP')) {
                    cache = angular.isObject(config.cache) ? config.cache
                        : angular.isObject(defaults.cache) ? defaults.cache
                        : defaultCache;
                }

                var cached = cache !== undefined ?
                cache.get(config.url) !== undefined : false;

                if (config.cached !== undefined && cached !== config.cached) {
                    return config.cached;
                }
                config.cached = cached;
                return cached;
            }


            return {
                'request': function (config) {
                    // Check to make sure this request hasn't already been cached and that
                    // the requester didn't explicitly ask us to ignore this request:

                    if (config && config.url.indexOf('/customer/followInfo') == -1 && !config.ignoreLoadingBar && !isCached(config)) {
                        $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
                        if (reqsTotal === 0) {
                            startTimeout = $timeout(function () {
                                cfpLoadingBar.start();
                            }, latencyThreshold);
                        }
                        reqsTotal++;
                        cfpLoadingBar.set(reqsCompleted / reqsTotal);
                    }
                    return config;
                },

                'response': function (response) {
                    if (response.config && response.config.url.indexOf('/customer/followInfo') == -1 && !response.config.ignoreLoadingBar && !isCached(response.config)) {
                        reqsCompleted++;
                        $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
                        if (reqsCompleted >= reqsTotal) {
                            setComplete();
                        } else {
                            cfpLoadingBar.set(reqsCompleted / reqsTotal);
                        }
                    }
                    return response;
                },

                'responseError': function (rejection) {
                    if (rejection.config && !rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                        reqsCompleted++;
                        $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
                        if (reqsCompleted >= reqsTotal) {
                            setComplete();
                        } else {
                            cfpLoadingBar.set(reqsCompleted / reqsTotal);
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }];

        $httpProvider.interceptors.push(interceptor);
    }])
    .provider('cfpLoadingBar', function () {
        this.includeSpinner = true;
        this.includeBar = true;
        this.latencyThreshold = 100;
        this.startSize = 0.02;
        this.parentSelector = 'body';
        this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
        this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

        this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
            var $animate;
            var $parentSelector = this.parentSelector,
                loadingBarContainer = angular.element(this.loadingBarTemplate),
                loadingBar = loadingBarContainer.find('div').eq(0),
                spinner = angular.element(this.spinnerTemplate);

            var incTimeout,
                completeTimeout,
                started = false,
                status = 0;

            var includeSpinner = this.includeSpinner;
            var includeBar = this.includeBar;
            var startSize = this.startSize;

            /**
             * Inserts the loading bar element into the dom, and sets it to 2%
             */
            function _start() {
                if (!$animate) {
                    $animate = $injector.get('$animate');
                }

                var $parent = $document.find($parentSelector).eq(0);
                $timeout.cancel(completeTimeout);

                // do not continually broadcast the started event:
                if (started) {
                    return;
                }

                $rootScope.$broadcast('cfpLoadingBar:started');
                started = true;

                if (includeBar) {
                    $animate.enter(loadingBarContainer, $parent);
                }

                if (includeSpinner) {
                    $animate.enter(spinner, $parent);
                }

                _set(startSize);
            }

            /**
             * Set the loading bar's width to a certain percent.
             *
             * @param n any value between 0 and 1
             */
            function _set(n) {
                if (!started) {
                    return;
                }
                var pct = (n * 100) + '%';
                loadingBar.css('width', pct);
                status = n;

                // increment loadingbar to give the illusion that there is always
                // progress but make sure to cancel the previous timeouts so we don't
                // have multiple incs running at the same time.
                $timeout.cancel(incTimeout);
                incTimeout = $timeout(function () {
                    _inc();
                }, 250);
            }

            /**
             * Increments the loading bar by a random amount
             * but slows down as it progresses
             */
            function _inc() {
                if (_status() >= 1) {
                    return;
                }

                var rnd = 0;

                // TODO: do this mathmatically instead of through conditions

                var stat = _status();
                if (stat >= 0 && stat < 0.25) {
                    // Start out between 3 - 6% increments
                    rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
                } else if (stat >= 0.25 && stat < 0.65) {
                    // increment between 0 - 3%
                    rnd = (Math.random() * 3) / 100;
                } else if (stat >= 0.65 && stat < 0.9) {
                    // increment between 0 - 2%
                    rnd = (Math.random() * 2) / 100;
                } else if (stat >= 0.9 && stat < 0.99) {
                    // finally, increment it .5 %
                    rnd = 0.005;
                } else {
                    // after 99%, don't increment:
                    rnd = 0;
                }

                var pct = _status() + rnd;
                _set(pct);
            }

            function _status() {
                return status;
            }

            function _completeAnimation() {
                status = 0;
                started = false;
            }

            function _complete() {
                if (!$animate) {
                    $animate = $injector.get('$animate');
                }

                $rootScope.$broadcast('cfpLoadingBar:completed');
                _set(1);

                $timeout.cancel(completeTimeout);

                // Attempt to aggregate any start/complete calls within 500ms:
                completeTimeout = $timeout(function () {
                    var promise = $animate.leave(loadingBarContainer, _completeAnimation);
                    if (promise && promise.then) {
                        promise.then(_completeAnimation);
                    }
                    $animate.leave(spinner);
                }, 500);
            }

            return {
                start: _start,
                set: _set,
                status: _status,
                inc: _inc,
                complete: _complete,
                includeSpinner: this.includeSpinner,
                latencyThreshold: this.latencyThreshold,
                parentSelector: this.parentSelector,
                startSize: this.startSize
            };


        }];     //
    })

    /*ng-repeat执行完毕后回调*/
    .directive('onNgRepeatFinished', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    })
    /*ng-options执行完毕后回调*/
    .directive('onNgOptionsFinished', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                $timeout(function () {
                    scope.$emit('ngOptionsFinished');
                });
            }
        };
    })
    .factory('cartsFactory', function () {
        var _cart_num = 0;
        var _carts_list = [];

        function setCartNum(cart_num) {
            _cart_num = cart_num;
        }

        function getCartNum() {
            return _cart_num;
        }

        function setCartsList(carts_list) {
            _carts_list = carts_list;
        }

        function getCartsList() {
            return _carts_list;
        }

        return {
            setCartNum: setCartNum,
            getCartNum: getCartNum,
            setCartsList: setCartsList,
            getCartsList: getCartsList
        }
    })
//头部controller
    .controller('headerCtrl', ['$scope', '$cookieStore', '$http',
        function ($scope, $cookieStore, $http) {
//	$scope.ehsy_token = $cookieStore.get('ehsy-token');
//	$scope.nick_name = '';
//	if($scope.ehsy_token!=undefined){
//		$http.post('/uc'+requires.USERCOUNT_INFO,'token='+$scope.ehsy_token)
//		.success(function(r){
//				if(r.mark=='0'){
//					$scope.isLogin = true;
//					$scope.nick_name = r.data.user_phone;
//				}else{
//					$scope.isLogin = false;
//				}
//			})
//			.error(function(r){
//				$scope.isLogin = false;
//				layer.msg('请求异常！');
//			});
//	}else{
//		$scope.isLogin = false;
//	}
        }])
    .controller('MainController', ['$scope', '$http', '$location', '$cookies', 'dictionaryService', '$sessionStorage',
        function ($scope, $http, $location, $cookies, dictionaryService, $sessionStorage) {


            //be sure to inject $scope and $location
            $scope.changeLocation = function (url, forceReload) {
                $scope = $scope || angular.element(document).scope();
                if (forceReload || $scope.$$phase) {
                    window.location = url;
                }
                else {
                    //only use this if you want to replace the history stack
                    //$location.path(url).replace();

                    //this this if you want to change the URL and add it to the history stack
                    $location.path(url);
                    $scope.$apply();
                }
            };

            $scope.updateInput = function (target, value, name, element) {
                var inputCel = $(target).parent("li").parent("ul").prev();
                inputCel.val(value);
                inputCel.prev("a").text(name);
            }
            $scope.reqDelay = 2000;
            $scope.date = new Date();

            $scope.message = {};
            $scope.message.token = sessionStorage.userToken;
            $scope.message.mid = $location.search().mid || 0;
            //职业列表
            $scope.vocations = [
                {value: undefined, name: "全部职业"},
                {value: 1, name: "双手战士"},
                {value: 2, name: "法师"},
                {value: 3, name: "猎人"},
                {value: 4, name: "刺杀者"},
                {value: 5, name: "牧师"},
                {value: 6, name: "气拳师"},
                {value: 7, name: "骑士"},
            ];
            //职业MAP数组
            $scope.vocationName = ['职业', '双手战士', '法师', '猎人', '刺杀者', '牧师', '气拳师', '骑士'];

            //留存状态
            $scope.retain = [
                {value: undefined, name: "留存状态"},
                {value: 0, name: "流失"},
                {value: 1, name: "留存"},
                {value: 2, name: "灰度"}
            ];
            //留存状态MAP数组
            $scope.retainName = ['流失', '留存', '灰度'];

            //付费状态
            $scope.pay = [
                {value: undefined, name: "付费状态"},
                {value: 0, name: "未付费"},
                {value: 1, name: "付费"}
            ];
            //付费状态MAP数组
            $scope.payName = ['未付费', '付费'];

            dictionaryService.reloadDict(function (navTree) {
                $scope.navTree = navTree;
                //重写navtree
                var d = [];
                var temp;
                temp = clone(navTree);//clone为复制对象的方法;
                buildMenus(temp);
                d[0] = temp;
                // var tree[0]=navTree;
                var options = {
                    showBorder: true,
                    showTags: true,
                    levels: 1,
                    enableLinks: true,
                    highlightSelected: true,
                    data: d
                };
                $('#ng-nav-tree').treeview(options);
                $('#ng-nav-tree').treeview('expandAll', {levels: 2, silent: true});
            });
            //获取sys_containerInfo
            dictionaryService.reloadContainerInfo(function (data) {
                $scope.sysContainerInfo = data;
            });
            //获取pf containerInfo
            dictionaryService.reloadPlantFormContainerInfo(function (data) {
                $scope.sysPlantformContainerInfo = data;
                window.select2data = data;
                window.appid_name = [];
                _.each(data, function (item) {
                    appid_name.push({
                        "appId": item.appId,
                        "appName": item.appName
                    });
                });
            });
            ////获取 权限修改渠道 dic
            dictionaryService.reloadGroupChannelDic(function (data) {
                $scope.sysGroupdDictionary = data;
            });
            //获取次元渠道数据
            dictionaryService.reloadCiyuanDic(function (data) {
                $scope.sysCiyuanDictionary = data.data;
                //存储翻译字典
                var ciyuanServiceDic = [[], []];
                var ciyuanAllianceDic = [[], []];
                _.each(data.data.serviceList, function (item) {
                    ciyuanServiceDic[0].push(item.serverKey);
                    ciyuanServiceDic[1].push(item.serverName);
                })
                _.each(data.data.allianceList, function (item) {
                    ciyuanAllianceDic[0].push(item.allianceKey);
                    ciyuanAllianceDic[1].push(item.allianceName);
                })
                $sessionStorage.ciyuanSerAlicDic = {
                    service: ciyuanServiceDic,
                    alliance: ciyuanAllianceDic
                }
            });
            $scope.ciyuanSerAlicDic = $sessionStorage.ciyuanSerAlicDic;
        }])
    .filter('add$', function () {
        return function (val) {
            return '￥' + val;
        };
    })
    .filter('imgFilter', function () {
        return function (val) {
            var imgArr = '';
            if (typeof val === 'string') {
                if (val === 'null') {

                } else {
                    imgArr = val.slice(1, val.length - 1).split(',')[0];
                }
            }
            return imgArr;
        };
    })
    .filter('imgUrlSplit', function () {
        //split imgUrl, get the first img url
        return function (val) {
            var url = '';
            var i = 0;
            var arr = val.split(',');
            var ret = '';
            for (; i < arr.length; i++) {
                if (arr[i].split('.').pop().toLowerCase !== 'tif') {
                    ret = arr[i];
                    break;
                }
            }
            return ret;
        };
    })

    .factory('echartsService', function () {

        function setOption(myChart, type, titleText, legendData, seriesName) {
            myChart.setOption({
                title: {
                    text: titleText
                },
                tooltip: {
                    trigger: 'axis'
                },
                //legend: {
                //    data:legendData
                //},
                xAxis: {
                    //data: []
                },
                yAxis: {},
                //series: [{
                //    name: seriesName,
                //   type: type,
                //    data: []
                //}]
            });
            return myChart
        }

        return {
            bar: function (elementId, titleText, legendData, seriesName) {
                var myChart = echarts.init(document.getElementById(elementId));
                return setOption(myChart, 'bar', titleText, legendData, seriesName);
            },
            line: function (elementId, titleText, legendData, seriesName) {
                var myChart = echarts.init(document.getElementById(elementId));
                return setOption(myChart, 'line', titleText, legendData, seriesName);
            }


        };


    })

//utils function
    .factory('utils', ['$cookieStore', '$rootScope', function ($cookieStore, $rootScope) {
        //global init
        var city_id = '321';
        $cookieStore.get('city_id') && ( city_id = $cookieStore.get('city_id') );
        var token;
        $cookieStore.get('ehsy-token') && ( token = $cookieStore.get('eksy-token') );

        return {
            getParamsValueByName: function (paramName) {
                var arr = window.location.search.substr(1).split('&');
                var i = 0;
                var length = arr.length;
                var eachItem;
                if (length === 0) {
                    return;
                } else {
                    for (; i < length; i++) {
                        eachItem = arr[i].split('=');
                        if (eachItem[0] === paramName) {
                            return decodeURIComponent(eachItem[1]);
                        }
                    }
                }
            },
            serializeWord: function (obj) {
                var str = '';
                if ($.type(obj) === 'object') {
                    for (var i in obj) {
                        str = str + i + '=' + obj[i] + '&';
                    }
                }
                return encodeURIComponent(str.substr(0, str.length - 1));
            },
            getToken: function () {
                return $cookieStore.get('ehsy-token');
            },
            filterTifImg: function (urlData) {
                var str; //filte img whose suffix is .tif no matter orgin is string or Array
                if (typeof urlData === 'string') {
                    if (urlData.charAt(0) === '[' && urlData.charAt(urlData.length - 1) === ']') {
                        var arr = urlData.slice(1, urlData.length - 1).split(',');
                        str = "[";
                        for (var i = 0; i < arr.length; i++) {
                            str = str + ( /\.tif$/.test(arr[i]) ? '' : ( arr[i] + ',') );
                        }
                        if (str.charAt(str.length - 1) === ',') {
                            str = str.slice(0, str.length - 1);
                        }
                        str += ']';
                    } else {
                        var arr = urlData.split(',');
                        str = '';
                        for (var i = 0; i < arr.length; i++) {
                            str = str + ( /\.tif$/.test(arr[i]) ? '' : ( arr[i] + ',' ) );
                        }
                        if (str.charAt(str.length - 1) === ',') {
                            str = str.slice(0, str.length - 1);
                        }
                    }
                } else if ($.type(urlData) === 'array') {
                    var j = 0;
                    str = [];
                    for (var i = 0; i < urlData.length; i++) {
                        if (/\.tif$/.test(urlData[i] === false)) {
                            str[j] = urlData[i];
                            j++;
                        }
                    }
                }
                return str;
            },
            globalVariable: {
                cityId: city_id,
                token: token,
            },

        };

    }])

//user logging status
    .factory('authStatus', function () {
        var auth = {
            isLogged: false
        };
        return auth;
    })
    .factory('userService', ['$http', '$cookieStore', '$cookies', 'utils', function ($http, $cookieStore, $cookies, utils) {
        var user = {
            needLogin: function () {
                var redUrl = encodeURIComponent(window.location.href);
                window.location.href = '/ehsy/jsp/login_register.jsp?redirect=' + redUrl;
            },
            autoLogin: function ($scope, calSuccess, calError) {
                $scope || ($scope = {})
                if (localStorage && localStorage.getItem('userCountRemeber')) {
                    var loginMessage = localStorage.getItem('userCountRemeber');
                    try {
                        loginMessage = JSON.parse(loginMessage);
                    } catch (e) {
                        console.warn('解析用户信息失败~');
                    }
                    if (loginMessage.isRememberCount) { //auto login
                        $http({
                            method: 'POST',
                            url: '/uc/user/login.action',
                            params: loginMessage
                        }).success(calSuccess).error(calError);
                    }
                    $scope.login.messageName = loginMessage.user_email ? loginMessage.user_email : loginMessage.user_phone;
                    $scope.login.messagePassword = loginMessage.login_password;
                    $scope.login.isRememberCount = loginMessage.isRememberCount;
                }
            },
            loginSuccess: function (data, status, headers, config, params, $scope) {
                $cookieStore.set('ehsy-token', data.sys.token, {'path': '/ehsy/'});
                // $cookieStore.put( 'ehsy-token' , data.sys.token ) ;
                if ($scope) {
                    if ($scope.login.isRememberCount && localStorage) {
                        localStorage.setItem('userCountRemeber', JSON.stringify(params));
                    } else {
                        localStorage && localStorage.removeItem('userCountRemeber');
                    }
                }
                var jumpUrl = '/ehsy/index.jsp';
                var redUrl = utils.getParamsValueByName('redirect');
                if (redUrl) {
                    jumpUrl = redUrl;
                }
                window.location.href = jumpUrl;
            },
            login: function () {

                $rootScope.global.isLogin = true;

            },
        };
        return user;
    }])
    .directive("errSrc", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                scope.flag = true;
                var oldSrc = attrs.src;        //获取原始图片
                var holderSrc = attrs.errSrc;
                element.bind("error", function () {
                    element.attr("src", holderSrc);
                });
                if (angular.isUndefined(oldSrc)) {
                    element.attr("src", holderSrc);
                } else if (oldSrc.isEmpty()) {
                    element.attr("src", holderSrc);
                }
            }
        };
    }])
//dictionaryService
    .service('dictionaryService', ['$http', '$cookies', '$location', '$sessionStorage',
        function ($http, $cookies, $location, $sessionStorage) {
            var dictionary = {
                reloadDict: function (callback) {
                    if ($sessionStorage.alldic) {
                        callback($sessionStorage.alldic);
                    } else {
                        $http({
                            method: 'GET',
                            url: '/gmtool' + requires.SYS_LOAD_DICT,
                            params: {token: sessionStorage.userToken}
                        }).success(function (data, status, headers, config) {
                            if (data.result == 0) {
                                $sessionStorage.alldic = data.sysMenus;
                                callback($sessionStorage.alldic);
                            }
                        }).error(function (data, status, headers, config) {
                            console.log(status);
                        });
                    }
                },
                reloadContainerInfo: function (callback) {
                    if ($sessionStorage.sys_containerInfo) {
                        callback($sessionStorage.sys_containerInfo);
                        return false;
                    } else {
                        var message = {
                            token: sessionStorage.userToken,
                            mid: 1
                        }
                        $http({
                            method: 'GET',
                            url: '/gmtool' + requires.SYS_LOAD_CONTAINERINFO,
                            params: message
                        }).success(function (data, status, headers, config) {
                            if (data.result == 0) {
                                $sessionStorage.sys_containerInfo = data.data;
                                callback($sessionStorage.sys_containerInfo);
                            }
                        }).error(function (data, status, headers, config) {
                            console.log(status);
                        });
                    }
                },
                reloadPlantFormContainerInfo: function (callback) {
                    if ($sessionStorage.pfDic) {
                        callback($sessionStorage.pfDic);
                    } else {
                        var message = {
                            token: sessionStorage.userToken,
                            mid: $location.search().mid || 0
                        }
                        $http({
                            method: 'GET',
                            url: '/gmtool' + requires.SYS_LOAD_PLANTFORM_CONTAINERINFO,
                            params: message
                        }).success(function (data, status, headers, config) {
                            if (data.result == 0) {
                                $sessionStorage.pfDic = data.data;
                                callback($sessionStorage.pfDic);

                            }
                        }).error(function (data, status, headers, config) {
                            console.log(status);
                        });
                    }
                },
                reloadGroupChannelDic: function (callback) {
                    if ($sessionStorage.groupDic) {
                        callback($sessionStorage.groupDic);
                    } else {
                        var message = {
                            token: sessionStorage.userToken,
                            mid: $location.search().mid || 0
                        };
                        $http({
                            method: 'GET',
                            url: '/gmtool' + requires.SYS_LOAD_DICTIONARY_CHENNEL,
                            params: message
                        }).success(function (data, status, headers, config) {
                            if (data.result == 0) {
                                $sessionStorage.groupDic = data.data;
                                callback($sessionStorage.groupDic);
                            }
                        }).error(function (data, status, headers, config) {
                            console.log(status);
                        });
                    }
                },
                reloadCiyuanDic: function (callback) {
                    if ($sessionStorage.ciyuanDic) {
                        callback($sessionStorage.ciyuanDic);
                    } else {
                        var message = {
                            token: sessionStorage.userToken,
                            mid: $location.search().mid || 7
                        };
                        $http({
                            method: 'GET',
                            url: '/gmtool' + requires.STATS_LOAD_CIYUAN_DICT,
                            params: message
                        }).success(function (data, status, headers, config) {
                            if (data.result == 0) {
                                $sessionStorage.ciyuanDic = data;
                                callback($sessionStorage.ciyuanDic);
                            } else {
                                console.log('获取次元渠道信息失败，请退出登陆后重试');
                                return false;
                            }

                        }).error(function (data, status, headers, config) {
                            console.log(status);
                        });
                    }
                }
            };
            return dictionary;
        }])

function buildMenus(menus) {
    for (var item in menus) {
        switch (item) {
            case "subMenus":
                if (menus[item] == null) {
                    delete menus[item];
                    break;
                }
                for (var i = 0; i < menus[item].length;) {
                    if (menus[item][i]["menuShow"] == 0) {
                        menus[item].splice(i, 1);
                    }
                    else {
                        buildMenus(menus[item][i]);
                        i++;
                    }
                }
                if (menus[item].length != 0) {
                    menus["nodes"] = menus[item];
                }
                delete menus[item];
                break;
            case "menuUrl":
                if (menus["menuUrl"] != null) {
                    menus["href"] = window.ctx + "/" + menus[item] + "?mid=" + menus["id"] + "&token=" + sessionStorage.userToken;
                    delete menus[item];
                }
                break;
            case "menuName":
                menus["text"] = menus[item];
                delete menus[item];
                break;
            case "id":
                break;
            default:
                delete menus[item];
        }
    }
}

function clone(obj) {
    var o;
    switch (typeof obj) {
        case 'undefined':
            break;
        case 'string'   :
            o = obj + '';
            break;
        case 'number'   :
            o = obj - 0;
            break;
        case 'boolean'  :
            o = obj;
            break;
        case 'object'   :
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}  

