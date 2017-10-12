<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>
    .select2-container--default .select2-selection--single .select2-selection__arrow{
        top: 5px;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 37px;
    }
    .select2-container .select2-selection--single {
        height: 37px;
    }
</style>
<div style="width:100%;" class="btn-group">
    <div class="dropdown ">
        <!-- appID 选择 -->
        <label style="width:20%;float:left;" for="id_label_single">
            <select style="width:100%;" class="js-example-basic-single js-states form-control" id="id_label_single">
                <option value="">请选择appID</option>
            </select>
        </label>
        <!-- 渠道选择 -->
        <label style="width:40%;float:left;" for="id_label_multiple1">
            <select style="width:100%;" id="id_label_multiple1" multiple="multiple">
            </select>
            <input id="selectallchannel" style="margin-left:-45px;position: relative;width: 15px;" type="checkbox">
        </label>
        <!-- 子渠道选择 -->
        <label style="width:40%;float:left;" for="select2_channeltag">
            <select style="width:100%;" id="select2_channeltag" multiple="multiple">
            </select>
            <input id="selectallchanneltag" style="margin-left:-45px;position: relative;width: 15px;" type="checkbox">
        </label>

    </div>
</div>

<script>
    $(document).ready(function () {
        window.inputappId = "";
        window.inputchannel = "";
        window.inputchanneltag = "";

        /***初始化select2-start***/
        var selectdata = window.select2data;
        var appid = [];
        var channel = [];
        for (var i = 0; i < selectdata.length; i++) {
            var obj1 = {};
            obj1.id = selectdata[i].appId;
            obj1.text = selectdata[i].appName;
            obj1.allianceData = selectdata[i].allianceData;
            appid[i] = obj1;
        }
        /***初始化select2-end***/

        /***服务器选择-start***/
        var $eventSelect = $("#id_label_single");
        $eventSelect.on("select2:select", function (e) {
            log("select2:select", e);
        });
        var arraychannel = [];

        function log(name, evt) {
            if (!evt) {
                var args = "{}";
            } else {
                var args = JSON.stringify(evt.params, function (key, value) {
                    if (value && value.nodeName) return "[DOM node]";
                    if (value instanceof $.Event) return "[$.Event]";
                    return value;
                });

            }
            args = JSON.parse(args);
            try {
                channel = args.data.allianceData;
                for (var i = 0; i < channel.length; i++) {
                    var obj2 = {};
                    obj2.id = channel[i].allianceId;
                    obj2.text = channel[i].allianceName;
                    obj2.allianceData = channel[i].chnTag;
                    channel[i] = obj2;
                }
                $("#id_label_multiple1").empty();
                channelselect2(channel);
                window.inputappId = args.data.id;
            }
            catch (err) {
                $("#id_label_multiple1").empty();
            }

        }

        $("#id_label_single").select2({
            minimumResultsForSearch: Infinity,
            data: appid
        });

        /***服务器选择-end***/


        /***渠道事件-start***/
            //渠道全选
        $("#selectallchannel").click(function () {
            if ($('#selectallchannel').prop("checked")) {
                selectchannel.select2("open");
                try {
                    channel.length;
                } catch (e) {
                    layMsg("请先选择appID!");
                    return false;
                }
                if (channel.length < 1 || typeof(channel) == "undefined") {
                    layMsg("请先选择appID!");
                    return false;
                }
                var all = [];
                for (var i = 0; i < channel.length; i++) {
                    all[i] = channel[i].id;
                }
                selectchannel.val(all).trigger("change");
                var reslist = $("#id_label_multiple1").select2("data");
                window.inputchannel = [];
                for (var i = 0; i < reslist.length; i++) {
                    window.inputchannel[i] = reslist[i].id;
                }
                if (reslist.length > 1) {
                    window.inputchanneltag=[];
                    $("#select2_channeltag").parent().hide();
                } else {
                    $("#select2_channeltag").parent().show();
                }

            }
            else {
                selectchannel.val(null).trigger("change");
                $("#select2_channeltag").parent().show();

            }

        })
        channelselect2(channel);//初始化渠道select2
        var channeltag = [];
        var $channelevent = $("#id_label_multiple1");
        //注册渠道勾选事件
        $channelevent.on("select2:select", function (e) {
            log2("select2:select", e);
        });
        //注册渠道删除事件
        $channelevent.on("select2:unselect", function (e) {
            log2("select2:select", e);
        });
        function log2(name, evt) {
            if (!evt) {
                var args = "{}";
            } else {
                var args = JSON.stringify(evt.params, function (key, value) {
                    if (value && value.nodeName) return "[DOM node]";
                    if (value instanceof $.Event) return "[$.Event]";
                    return value;
                });
            }
            args = JSON.parse(args);
            try {
                channeltag = args.data.allianceData;
                for (var i = 0; i < channeltag.length; i++) {
                    var obj3 = {};
                    obj3.id = channeltag[i].channeltagValue;
                    obj3.text = channeltag[i].channeltagName;
                    channeltag[i] = obj3;
                }
                $("#select2_channeltag").empty();
                channeltagselect2(channeltag);
                var reslist = $("#id_label_multiple1").select2("data");
                window.inputchannel = [];
                for (var i = 0; i < reslist.length; i++) {
                    window.inputchannel[i] = reslist[i].id;
                }
                if (reslist.length > 1) {
                    window.inputchanneltag=[];
                    $("#select2_channeltag").parent().hide();
                } else {
                    $("#select2_channeltag").parent().show();
                }

            } catch (e) {
                $("#select2_channeltag").empty();
                try {
                    var reslist = $("#id_label_multiple1").select2("data");
                    window.inputchannel = [];
                    for (var i = 0; i < reslist.length; i++) {
                        window.inputchannel[i] = reslist[i].id;
                    }
                    if (reslist.length > 1) {
                        $("#select2_channeltag").parent().hide();
                    } else {
                        $("#select2_channeltag").parent().show();
                    }
                } catch (e) {

                }

            }
        }

        function channelselect2(data) {
            window.selectchannel=$('#id_label_multiple1').select2({
                placeholder: "选择渠道",
                allowClear: true,
                data: data
            });

        }

        /***渠道事件-end***/

        /***子渠道事件-start***/
            //子渠道全选
        $("#selectallchanneltag").click(function () {
            var $example = $("#select2_channeltag").select2();
            if ($('#selectallchanneltag').prop("checked")) {
                $example.select2("open");
                console.log(channeltag);
                try {
                    channeltag.length;

                } catch (e) {
                    layMsg("请先选择渠道!");
                    return false;
                }
                if (channeltag.length == 0) {
                    layMsg("请先选择渠道!");
                }
                if (typeof(channeltag) == "undefined") {
                    layMsg("请先选择渠道!");
                    return false;
                }
                var all = [];
                for (var i = 0; i < channeltag.length; i++) {
                    all[i] = channeltag[i].id;
                }
                $example.val(all).trigger("change");
                var reslist = $("#select2_channeltag").select2("data");
                window.inputchanneltag = [];
                for (var i = 0; i < reslist.length; i++) {
                    window.inputchanneltag[i] = reslist[i].id;
                }
            }
            else {
                $example.val(null).trigger("change");
            }
        })
        channeltagselect2(channeltag);//初始化子渠道select2
        var $channeltagevent = $("#select2_channeltag");
        $channeltagevent.on("select2:select", function (e) {
            log3("select2:select", e);
        });
        $channeltagevent.on("select2:unselect", function (e) {
            log3("select2:select", e);
        });
        function log3(name, evt) {
            if (!evt) {
                var args = "{}";
            } else {
                var args = JSON.stringify(evt.params, function (key, value) {
                    if (value && value.nodeName) return "[DOM node]";
                    if (value instanceof $.Event) return "[$.Event]";
                    return value;
                });
            }
            args = JSON.parse(args);
            try {
                var reslist = $("#select2_channeltag").select2("data");
                window.inputchanneltag = [];
                for (var i = 0; i < reslist.length; i++) {
                    window.inputchanneltag[i] = reslist[i].id;
                }
            } catch (e) {

            }
        }

        function channeltagselect2(data) {
            $('#select2_channeltag').select2({
                placeholder: "选择子渠道",
                allowClear: true,
                data: data
            });
        }

        /***子渠道事件-end***/

    });
</script>






















