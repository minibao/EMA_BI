//doUndefined
function doUndefined(eve) {
    eve == undefined ? eve = 0 : eve = eve;
    return eve;
}

function buildExcelData(excel_data, e_data, excellength) {
    //构建excel数据
    if (excel_data.length == 0) {
        for (var x in e_data) {
            excel_data.push(e_data[x]);
        }
    }
    else {
        var i = 0;
        var j = 0;
        while ((e_data[i] != undefined) || (excel_data[j] != undefined)) {
            if (excel_data[j] == undefined) {
                var excel_line = [];
                for (var x = 0; x < excellength; x++) {
                    excel_line.push(0);
                }
                excel_line[0] = e_data[i][0];
                excel_line[excel_line.length - 1] = e_data[i][1];
                excel_data.push(excel_line);
                i++;
                j++;
            }
            else if (e_data[i] == undefined) {
                excel_data[j].push(0);
                j++;
            }
            else {
                if (e_data[i][0] == excel_data[j][0]) {
                    excel_data[j].push(e_data[i][1]);
                    i++;
                    j++;
                }
                else if (e_data[i][0] > excel_data[j][0]) {
                    excel_data[j].push(0);
                    j++;
                }
                else if (e_data[i][0] < excel_data[j][0]) {
                    var excel_line = [];
                    for (var x = 0; x < excellength; x++) {
                        excel_line.push(0);
                    }
                    excel_line[0] = e_data[i][0];
                    excel_line[excel_line.length - 1] = e_data[i][1];
                    excel_data.splice(j, 0, excel_line);
                    i++;
                }
            }
        }
    }

    return;
}

function excelOption(title, data, excelId) {
    var excelName = title.join('-');
    var table = '<table id="' + excelId + '" data-name="' + excelName + '" class="table table-striped text-center"><thead><tr>';
    var tbody = '<tbody>';

    //生成thead
    for (var i in title) {
        table += ('<th>' + title[i] + '</th>');
    }
    table += '</tr></thead>';

    for (var i in data) {
        tbody += '<tr>'
        for (var j in data[i]) {
            tbody += ('<td>' + data[i][j] + '</td>');
        }
        tbody += '</tr>';
    }

    tbody += '</tbody>';
    table += tbody;
    table += '</table>'

    //抛出table;
    return table;
}

//显示下载按键
function showDownBtn(id, _css) {
    var toggle = true;
    var _this = $('#' + id);
    if (_css == 'dis')  toggle = toggle;
    if (_css == 'vis')  toggle = false;
    toggle ? _this.show() : _this.css('visibility', 'visible');
}
//色板
var color = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0',
    '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff5566',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'];

//保留%两位小数
function returnFloat(value) {
    var value = Math.round(parseFloat(value) * 10000) / 100;
    var valStr = value.toString().split(".");
    if (valStr.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (valStr.length > 1) {
        if (valStr[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}

//date-time-picker 初始化
function initializationDateRange() {
    $(".date-range").datetimepicker({
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minView: 2
    });

    $('.startDate').datetimepicker().on('changeDate', function (ev) {
        $('.endDate').datetimepicker('setStartDate', ev.date);
    });
    $('.endDate').datetimepicker().on('changeDate', function (ev) {
        $('.startDate').datetimepicker('setEndDate', ev.date);
    });
};
function initializationDatesingel() {
    $(".date-singel").datetimepicker({
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minView: 2
    });
};
function initializationDateHour() {
    $(".date-hour").datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        todayBtn: true,
        autoclose: true,
        minView: 0
    })
}
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
function initializationdDefaultValue() {
    $('input[name="date-range"]:eq(0)').attr('value', function () {
        var startD = new Date();
        startD = startD.getFullYear() + '-' + addO(startD.getMonth() + 1) + '-' + addO(startD.getDate());
        startD = getPreMonth(startD);
        return startD;
    });
    $('input[name="date-range"]:eq(1)').attr('value', function () {
        var endD = new Date();
        endD = endD.getFullYear() + '-' + addO(endD.getMonth() + 1) + '-' + addO(endD.getDate());
        return endD;
    });
    $('input[name="date-singel"]').attr('value', function () {
        var today = new Date();
        today = today.getFullYear() + '-' + addO(today.getMonth() + 1) + '-' + addO(today.getDate());
        return today;
    });
    $('.date-hour:eq(0)').attr('value', function () {
        var startD = new Date();
        startD = startD.getFullYear() + '-' + addO(startD.getMonth() + 1) + '-' + addO(startD.getDate());
        startD = getPreMonth(startD);
        var startD1 = new Date();
        startD = startD + ' ' + addO(startD1.getHours()) + ':' + addO(startD1.getMinutes()) + ':' + addO(startD1.getSeconds());
        return startD;
    });
    $('.date-hour:eq(1)').attr('value', function () {
        var endD = new Date();
        endD = endD.getFullYear() + '-' + addO(endD.getMonth() + 1) + '-' + addO(endD.getDate()) + ' ' + addO(endD.getHours()) + ':' +
            addO(endD.getMinutes()) + ':' + addO(endD.getSeconds());
        return endD;
    });

}
function addO(e) {
    return (e < 10 ? '0' + e : e);
};
function layMsg(msg) {
    var sqoury = '<div id="newAppendMsg" style="position: absolute;top: 50%;left: 50%;transform:translate(-50%,-50%);width: 20%;height:40px;background: rgba(0,0,0,0.4);z-index: 9999;border-radius: 6px;font-size: 16px;font-weight: bold;padding: 5px 12px;text-align: center;line-height: 40px;">' + msg + '</div>';
    $('body').append(sqoury);
    setTimeout(function () {
        $('#newAppendMsg').remove();
    }, 1200)
};
