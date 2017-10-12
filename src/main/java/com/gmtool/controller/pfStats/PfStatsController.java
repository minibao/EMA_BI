package com.gmtool.controller.pfStats;

import java.text.SimpleDateFormat;
import java.util.*;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfRealtimeStstsService;
import com.gmtool.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.pfStats.IPfStatsService;

@Controller("pfStatsController")
@RequestMapping("/pf-stats")
public class PfStatsController extends BaseController {

    @Autowired
    private IPfStatsService pfStatsService;
    @Autowired
    private IPfRealtimeStstsService pfRealtimeStstsService;

    @RequestMapping(value = "/pfDau")
    @ResponseBody
    public Object pfDau() {
        logBefore(logger, "pfDau");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            map = pfStatsService.pfDau(pd);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }

        return map;
    }

    @RequestMapping(value = "/pfReg")
    @ResponseBody
    public Object pfReg() {
        logBefore(logger, "pfReg");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            map = pfStatsService.pfReg(pd);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }

        return map;
    }

    @RequestMapping(value = "/pfPr")
    @ResponseBody
    public Object pfPr() {
        logBefore(logger, "pfPr");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            map = pfStatsService.pfPr(pd);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping(value = "/pfLTV")
    @ResponseBody
    public Object pfLTV() {
        logBefore(logger, "pfLTV");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            map.put("data", pfStatsService.pfLTV(pd));
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping(value = "/pfFirstOrderRR")
    @ResponseBody
    public Object pfFirstOrderRR() {
        logBefore(logger, "pfFirstOrderRR");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            pd = this.getPageData();
            map.put("data", pfStatsService.pfFirstOrderRR(pd));
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }


    @RequestMapping(value = "/pfPayment")
    @ResponseBody
    public Object pfPayment() {
        logBefore(logger, "pfPayment");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            map = pfStatsService.pfPayment(pd);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }

        return map;
    }

    @RequestMapping(value = "/pfRr")
    @ResponseBody
    public Object pfRr() {
        logBefore(logger, "pfRr");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            List<Map> rr = pfStatsService.pfRr(pd);
            map.put("data", rr);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }

        return map;
    }

    @RequestMapping(value = "/pfDailyDashboard")
    @ResponseBody
    public Object pfDailyDashboard() {
        logBefore(logger, "pfDailyDashboard");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {

            pd = this.getPageData();
            List<Map> data = new ArrayList<>();
            List<Map> nuul = new ArrayList<>();
            List<Map> daul = new ArrayList<>();
            List<Map> salel = new ArrayList<>();
            List<Map> payRatel = new ArrayList<>();
            List<Map> arpul = new ArrayList<>();
            List<Map> arppul = new ArrayList<>();
            List<Map> firstOrderRRl = new ArrayList<>();
            List<Map> RRl = new ArrayList<>();
            SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd");
            try {
                if (dd.format(new Date()).equals(pd.get("startD").toString().substring(0, 10)) && dd.format(new Date()).equals((pd.get("endD")
                        .toString().substring(0, 10)))) {
                    pd.put("compareD", pd.get("startD") + "");
                    List<Map> realnuuMap = pfRealtimeStstsService.pfRegRealtime(pd);
                    Map realMap = (Map) ((Map) realnuuMap.get(realnuuMap.size() - 1).get("data")).get("result");
                    Map dataMap = new HashMap<>();
                    dataMap.put("date", realMap.get("regDate") + " 00:00:00");
                    dataMap.put("appId", realMap.get("appId"));
                    dataMap.put("allianceId", realMap.get("allianceId"));
                    dataMap.put("channelTag", realMap.get("channelTag"));
                    dataMap.put("nuuCount", realMap.get("gameUidCount"));
                    nuul.add(dataMap);
                } else {
                    Map nuuMap = pfStatsService.pfReg(pd);
                    nuul = (List<Map>) nuuMap.get("data");
                    for (Map nuu : nuul) {
                        nuu.remove("channelTagName");
                        nuu.remove("appName");
                        nuu.remove("id");
                        nuu.remove("createTs");
                        nuu.put("date", nuu.get("regDate"));
                        nuu.remove("regDate");
                        nuu.put("nuuCount", nuu.get("gameUidCount"));
                        nuu.remove("pfUidCount");
                        nuu.remove("gameDeviceCount");
                        nuu.remove("pfDeviceCount");
                        nuu.remove("gameUidCount");
                    }
                }
            } catch (Exception e) {
                map.put("result", 1);
            }
            try {
                if (dd.format(new Date()).equals(pd.get("startD").toString().substring(0, 10)) && dd.format(new Date()).equals(pd.get("endD")
                        .toString().substring(0, 10))) {
                    pd.put("compareD", pd.get("startD") + "");
                    List<Map> realnuuMap = pfRealtimeStstsService.pfDauRealtime(pd);
                    Map realMap = (Map) ((Map) realnuuMap.get(realnuuMap.size() - 1).get("data")).get("result");
                    Map dataMap = new HashMap<>();
                    dataMap.put("date", realMap.get("activeDate") + " 00:00:00");
                    dataMap.put("appId", realMap.get("appId"));
                    dataMap.put("allianceId", realMap.get("allianceId"));
                    dataMap.put("channelTag", realMap.get("channelTag"));
                    dataMap.put("dauCount", realMap.get("uidCount"));
                    daul.add(dataMap);
                } else {
                    Map dauMap = pfStatsService.pfDau(pd);
                    daul = (List<Map>) dauMap.get("data");
                    for (Map dau : daul) {
                        dau.remove("id");
                        dau.remove("createTs");
                        dau.remove("deviceCount");
                        dau.put("dauCount", dau.get("uidCount"));
                        dau.remove("uidCount");
                        dau.put("date", dau.get("activeDate"));
                        dau.remove("activeDate");
                    }
                }

            } catch (Exception e) {
                map.put("result", 1);
            }
            try {
                if (dd.format(new Date()).equals(pd.get("startD").toString().substring(0, 10)) && dd.format(new Date()).equals(pd.get("endD")
                        .toString().substring(0, 10))) {
                    pd.put("compareD", pd.get("startD") + "");
                    List<Map> realnuuMap = pfRealtimeStstsService.pfPaymentRealtime(pd);
                    Map realMap = (Map) ((Map) realnuuMap.get(realnuuMap.size() - 1).get("data")).get("result");
                    Map dataMap = new HashMap<>();
                    dataMap.put("date", realMap.get("calcDate") + " 00:00:00");
                    dataMap.put("appId", realMap.get("appId"));
                    dataMap.put("allianceId", realMap.get("allianceId"));
                    dataMap.put("channelTag", realMap.get("channelTag"));
                    dataMap.put("totalAmount", realMap.get("totalAmount"));
                    salel.add(dataMap);
                    Map ratedataMap = new HashMap<>();
                    ratedataMap.put("date", realMap.get("calcDate") + " 00:00:00");
                    ratedataMap.put("appId", realMap.get("appId"));
                    ratedataMap.put("allianceId", realMap.get("allianceId"));
                    ratedataMap.put("channelTag", realMap.get("channelTag"));
                    ratedataMap.put("payRate", NumberUtils.getPercent(NumberUtils.getDouble(realMap.get("payRate"),4)) + "%");
                    payRatel.add(ratedataMap);
                } else {
                    Map payMap = pfStatsService.pfPayment(pd);
                    List<Map> payl = (List<Map>) payMap.get("data");
                    for (Map pay : payl) {

                        Map sale = new HashMap<>();
                        sale.put("appId", pay.get("appId"));
                        sale.put("allianceId", pay.get("allianceId"));
                        sale.put("channelTag", pay.get("channelTag"));
                        sale.put("date", pay.get("calcDate"));
                        sale.put("totalAmount", pay.get("totalAmount"));
                        salel.add(sale);

                        Map payRate = new HashMap<>();
                        payRate.put("appId", pay.get("appId"));
                        payRate.put("allianceId", pay.get("allianceId"));
                        payRate.put("channelTag", pay.get("channelTag"));
                        payRate.put("date", pay.get("calcDate"));
                        payRate.put("payRate", NumberUtils.getPercent(NumberUtils.getDouble(pay.get("payRate"),4)) + "%");

                        payRatel.add(payRate);

                    }
                }

            } catch (Exception e) {
                map.put("result", 1);
            }

            firstOrderRRl = pfStatsService.pfFirstOrderRR(pd);

            pd.put("returnDays","1");

            RRl = pfStatsService.pfRr(pd);


            for (int i = 0; i < daul.size(); i++) {
                Map dataMap = new HashMap<>();
                Map dauMap = daul.get(i);
                String date = (String)dauMap.get("date");
                dataMap.put("dau", dauMap);

                Map nuuMap = new HashMap<>();
                for(Map nuu :nuul){
                    if(nuu.get("date").toString().equals(date)){
                        nuuMap = nuu;
                        break;
                    }
                }
                if(CommonUtils.isEmpty(nuuMap.get("date"))){
                    nuuMap.put("date",date);
                    nuuMap.put("nuuCount",0);
                    nuuMap.put("allianceId",dauMap.get("allianceId"));
                    nuuMap.put("appId",dauMap.get("appId"));
                    nuuMap.put("channelTag",dauMap.get("channelTag"));
                }
                dataMap.put("nuu", nuuMap);

                Map payRateMap = new HashMap<>();
                for(Map payRate :payRatel){
                    if(payRate.get("date").toString().equals(date)){
                        payRateMap = payRate;
                        break;
                    }
                }

                if(CommonUtils.isEmpty(payRateMap.get("date"))){
                    payRateMap.put("date",date);
                    payRateMap.put("payRate","0%");
                    payRateMap.put("allianceId",dauMap.get("allianceId"));
                    payRateMap.put("appId",dauMap.get("appId"));
                    payRateMap.put("channelTag",dauMap.get("channelTag"));
                }
                dataMap.put("payRate", payRateMap);

                Map saleMap = new HashMap<>();
                Map arppuMap = new HashMap<>();
                Map arpuMap = new HashMap<>();
                for(Map sale :salel){
                    if(sale.get("date").toString().equals(date)){
                        saleMap = sale;

                        arpuMap.put("appId", daul.get(i).get("appId"));
                        arpuMap.put("allianceId", daul.get(i).get("allianceId"));
                        arpuMap.put("channelTag", daul.get(i).get("channelTag"));
                        arpuMap.put("date", daul.get(i).get("date"));
                        arpuMap.put("arpu", NumberUtils.getDouble((int) sale.get("totalAmount") * 1.0 / (int) daul.get(i).get("dauCount"),2));

                        arppuMap.put("appId", daul.get(i).get("appId"));
                        arppuMap.put("allianceId", daul.get(i).get("allianceId"));
                        arppuMap.put("channelTag", daul.get(i).get("channelTag"));
                        arppuMap.put("date", daul.get(i).get("date"));
                        String payrate = payRateMap.get("payRate").toString();
                        double payr = Double.parseDouble(payrate.substring(0, payrate.length() - 1))/100;
                        arppuMap.put("arppu", NumberUtils.getDouble((int) sale.get("totalAmount") * 1.0 / (int) daul.get(i).get("dauCount") / payr,2));

                        break;
                    }
                }

                if(CommonUtils.isEmpty(saleMap.get("date"))){
                    saleMap.put("date",date);
                    saleMap.put("totalAmount","0");
                    saleMap.put("allianceId",dauMap.get("allianceId"));
                    saleMap.put("appId",dauMap.get("appId"));
                    saleMap.put("channelTag",dauMap.get("channelTag"));

                    arpuMap.put("date",date);
                    arpuMap.put("arpu","0");
                    arpuMap.put("allianceId",dauMap.get("allianceId"));
                    arpuMap.put("appId",dauMap.get("appId"));
                    arpuMap.put("channelTag",dauMap.get("channelTag"));

                    arppuMap.put("date",date);
                    arppuMap.put("arppu","0");
                    arppuMap.put("allianceId",dauMap.get("allianceId"));
                    arppuMap.put("appId",dauMap.get("appId"));
                    arppuMap.put("channelTag",dauMap.get("channelTag"));

                }
                dataMap.put("sale",saleMap);
                dataMap.put("arpu", arpuMap);
                dataMap.put("arppu", arppuMap);


                Map firstOrderRRMap = new HashMap<>();
                for(Map firstOrderRR :firstOrderRRl){
                    if(firstOrderRR.get("regDate").toString().equals(date)){
                        firstOrderRRMap.putAll(firstOrderRR);
                        firstOrderRRMap.put("date",firstOrderRR.get("regDate"));
                        firstOrderRRMap.remove("regDate");
                        firstOrderRRMap.remove("count1");
                        firstOrderRRMap.remove("count2");
                        break;
                    }
                }
                if(CommonUtils.isEmpty(firstOrderRRMap.get("date"))){
                    firstOrderRRMap.put("date",date);
                    firstOrderRRMap.put("rate","-");
                    firstOrderRRMap.put("allianceId",dauMap.get("allianceId"));
                    firstOrderRRMap.put("appId",dauMap.get("appId"));
                    firstOrderRRMap.put("channelTag",dauMap.get("channelTag"));
                }
                dataMap.put("firstOrderRR", firstOrderRRMap);


                Map RRMap = new HashMap<>();
                for(Map RR :RRl){
                    if(RR.get("regDate").toString().equals(date)){
                        RRMap.put("date", RR.get("regDate"));
                        RRMap.put("rate",RR.get("GameUidRePercent1"));
                        RRMap.put("allianceId", RR.get("allianceId"));
                        RRMap.put("appId", RR.get("appId"));
                        RRMap.put("channelTag", RR.get("channelTag"));
                        break;
                    }
                }
                if(CommonUtils.isEmpty(RRMap.get("date"))){
                    RRMap.put("date",date);
                    RRMap.put("rate","-");
                    RRMap.put("allianceId",dauMap.get("allianceId"));
                    RRMap.put("appId",dauMap.get("appId"));
                    RRMap.put("channelTag",dauMap.get("channelTag"));
                }
                dataMap.put("RR", RRMap);


                data.add(dataMap);
            }

            map.put("data", data);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }

        return map;
    }


    @RequestMapping(value = "/pfDailyDetail")
    @ResponseBody
    public Object pfDailyDetail() {
        logBefore(logger, "pfDailyDetail");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            Map data = new HashMap<>();

            Integer regCount = 0;
            try {
                Map nuuMap = pfStatsService.pfReg(pd);
                List nuul = (List<Map>) nuuMap.get("data");
                regCount = (int) ((Map) nuul.get(0)).get("gameUidCount");
            } catch (Exception e) {
                map.put("result", 1);
            }

            try {
                Map prMap = pfStatsService.pfPr(pd);
                List<Map> prl = (List<Map>) prMap.get("data");
                List saleList = new ArrayList<>();
                List payRateList = new ArrayList<>();
                List arppuList = new ArrayList<>();
                List arpuList = new ArrayList<>();
                for (Map pr : prl) {
                    Map sale = new HashMap<>();
                    sale.put("appId", pr.get("appId"));
                    sale.put("allianceId", pr.get("allianceId"));
                    sale.put("channelTag", pr.get("channelTag"));
                    sale.put("regDate", pr.get("regDate"));
                    sale.put("returnDays", pr.get("returnDays"));
                    sale.put("amount", pr.get("amount"));
                    saleList.add(sale);
                    Map payRate = new HashMap<>();
                    payRate.put("appId", pr.get("appId"));
                    payRate.put("allianceId", pr.get("allianceId"));
                    payRate.put("channelTag", pr.get("channelTag"));
                    payRate.put("regDate", pr.get("regDate"));
                    payRate.put("returnDays", pr.get("returnDays"));
                    payRate.put("payRate", NumberUtils.getPercent(NumberUtils.getDouble((int) pr.get("payUidCount") * 1.0 / regCount,4)) + "%");
                    payRateList.add(payRate);

                    Map arppu = new HashMap<>();
                    arppu.put("appId", pr.get("appId"));
                    arppu.put("allianceId", pr.get("allianceId"));
                    arppu.put("channelTag", pr.get("channelTag"));
                    arppu.put("regDate", pr.get("regDate"));
                    arppu.put("returnDays", pr.get("returnDays"));
                    arppu.put("arppu", NumberUtils.getDouble(((int) pr.get("amount") * 1.0 / (int) pr.get("payUidCount")),2));
                    arppuList.add(arppu);

                    Map arpu = new HashMap<>();
                    arpu.put("appId", pr.get("appId"));
                    arpu.put("allianceId", pr.get("allianceId"));
                    arpu.put("channelTag", pr.get("channelTag"));
                    arpu.put("regDate", pr.get("regDate"));
                    arpu.put("returnDays", pr.get("returnDays"));
                    arpu.put("arpu", NumberUtils.getDouble(((int) pr.get("amount") * 1.0 / regCount),2));
                    arpuList.add(arpu);
                }
                data.put("sale", saleList);
                data.put("payRate", payRateList);
                data.put("arppu", arppuList);
                data.put("arpu", arpuList);
            } catch (Exception e) {
                map.put("result", 1);
            }
            try {
                List LTVList = new ArrayList<>();
                List<Map> ltvl = pfStatsService.pfLTV(pd);
                for (Map ltv : ltvl) {
                    Map ltvM = new HashMap<>();
                    ltvM.put("appId", ltv.get("appId"));
                    ltvM.put("allianceId", ltv.get("allianceId"));
                    ltvM.put("channelTag", ltv.get("channelTag"));
                    ltvM.put("regDate", ltv.get("regDate"));
                    ltvM.put("returnDays", ltv.get("returnDays"));
                    ltvM.put("LTV",NumberUtils.getDouble(ltv.get("LTV"),2));
                    LTVList.add(ltvM);
                }
                data.put("LTV", LTVList);
            } catch (Exception e) {
                map.put("result", 1);
            }

            try {
                List RRList = new ArrayList<>();
                String params = Utility.getUrlParamsByMap(pd);
                String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_RR, params);
                Map result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
                List<Map> rrl = (List<Map>) result.get("data");
                boolean firstDay = false;
                for (Map rr : rrl) {
                    Map rrM = new HashMap<>();
                    if (!firstDay) {
                        Map rrM0 = new HashMap<>();
                        rrM0.put("appId", rr.get("appId"));
                        rrM0.put("allianceId", rr.get("allianceId"));
                        rrM0.put("channelTag", rr.get("channelTag"));
                        rrM0.put("regDate", rr.get("regDate"));
                        rrM0.put("returnDays", 0);
                        rrM0.put("rr", "100.00%");
                        RRList.add(rrM0);
                        firstDay = true;
                    }
                    rrM.put("appId", rr.get("appId"));
                    rrM.put("allianceId", rr.get("allianceId"));
                    rrM.put("channelTag", rr.get("channelTag"));
                    rrM.put("regDate", rr.get("regDate"));
                    rrM.put("returnDays", rr.get("returnDays"));
                    rrM.put("rr", NumberUtils.getPercent(NumberUtils.getDouble(rr.get("gameUidReturnRate"),4)) + "%");

                    RRList.add(rrM);
                }
                data.put("RR", RRList);
            } catch (Exception e) {
                map.put("result", 1);
            }
            map.put("data", data);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }


    @RequestMapping(value = "/pfMonth")
    @ResponseBody
    public Object pfMonth() {
        logBefore(logger, "pfMonth");
        PageData pd = new PageData();
        Map<String, Object> map = new HashMap<String, Object>();

        try {
            pd = this.getPageData();
            List data = pfStatsService.pfMonth(pd);
            map.put("data", data);
            map.put("result", 0);
        } catch (Exception e) {
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }

}
