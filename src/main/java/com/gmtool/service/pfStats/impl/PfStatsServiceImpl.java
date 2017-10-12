package com.gmtool.service.pfStats.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gmtool.service.IMemberInfoService;
import com.gmtool.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfStatsService;
import com.google.common.base.Preconditions;


@Service("pfStatsService")
public class PfStatsServiceImpl implements IPfStatsService {

    @Autowired
    private IMemberInfoService memberInfoService;

    @Override
    public Map<String, Object> pfDau(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
                    .toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_DAU, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        return result;
    }

    @Override
    public Map<String, Object> pfPayment(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_PAYMENT, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        return result;
    }

    @Override
    public Map<String, Object> pfReg(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_REG, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        return result;
    }


    @Override
    public Map<String, Object> pfPr(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "returnDays不能为空");
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_PR, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        return result;
    }

    @Override
    public List pfLTV(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "returnDays不能为空");
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_REG, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        List<Map> regList = (List<Map>) result.get("data");

        resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_PR, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
        List<Map> PrList = (List<Map>) result.get("data");
        for (Map mp : PrList) {
            for (Map mr : regList) {

                if ("0".equals(mp.get("appId").toString()))
                    mp.put("appId", "");
                else mp.put("appId", mp.get("appId").toString());
                mp.put("allianceId", mp.get("allianceId").toString());
                mp.put("channelTag", mp.get("channelTag").toString());
                if (mp.get("regDate").equals(mr.get("regDate")) && mp.get("appId").equals(mr.get("appId")) && mp.get
                        ("allianceId").equals(mr.get("allianceId")) && mp.get("channelTag").equals(mr.get
                        ("channelTag"))) {
                    mp.put("gameDeviceCount", mr.get("gameDeviceCount"));
                    mp.put("LTV", (Long.parseLong(mp.get("totalAmount") + "") + 0.0) / Long.parseLong(mr.get("gameDeviceCount")
                            + ""));
                }
            }
        }

        return PrList;
    }

    @Override
    public List pfFirstOrderRR(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Map result = new HashMap<>();
        List<Map> list = new ArrayList<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        pd.put("t1", "3");
        pd.put("t2", "2");
        String params = Utility.getUrlParamsByMap(pd);
        try {
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_RETENTION_RATE, params);
            result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            list = (List<Map>) result.get("data");
        } catch (Exception e) {
            e.printStackTrace();
        }


        return list;
    }

    @Override
    public List pfMonth(PageData pd) {
        List resultList = new ArrayList<>();
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Map result = new HashMap<>();

        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
                    .toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<Map> mauList = new ArrayList<>();
        List<Map> mnuList = new ArrayList<>();
        List<Map> mpayList = new ArrayList<>();
        String params = Utility.getUrlParamsByMap(pd);
        try {
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_MAU, params);
            result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            mauList = (List<Map>) result.get("data");
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_MNU, params);
            result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            mnuList = (List<Map>) result.get("data");
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_MPAY, params);
            result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            mpayList = (List<Map>) result.get("data");
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (int i = 0; i < mauList.size(); i++) {
            Map dataMap = new HashMap<>();
            Map mauMap = (Map) mauList.get(i);
            mauMap.remove("createTs");
            mauMap.remove("id");
            mauMap.remove("deviceCount");
            mauMap.put("mauCount", mauMap.get("uidCount"));
            mauMap.remove("uidCount");
            mauMap.put("date", mauMap.get("activeDate"));
            mauMap.remove("activeDate");
            dataMap.put("mau", mauMap);

            Map mnuMap = (Map) mnuList.get(i);
            mnuMap.remove("channelTagName");
            mnuMap.remove("allianceName");
            mnuMap.remove("appName");
            mnuMap.remove("createTs");
            mnuMap.remove("id");
            mnuMap.put("mnuCount", mnuMap.get("gameUidCount"));
            mnuMap.remove("pfUidCount");
            mnuMap.remove("pfDeviceCount");
            mnuMap.remove("gameDeviceCount");
            mnuMap.remove("gameUidCount");
            mnuMap.put("date", mnuMap.get("regDate"));
            mnuMap.remove("regDate");
            dataMap.put("mnu", mnuMap);

            Map payMap = (Map) mpayList.get(i);
            Map saleMap = new HashMap<>();
            Map payRateMap = new HashMap<>();
            Map arpuMap = new HashMap<>();
            Map arppuMap = new HashMap<>();

            saleMap.put("date", payMap.get("calcDate"));
            saleMap.put("appId", payMap.get("appId"));
            saleMap.put("allianceId", payMap.get("allianceId"));
            saleMap.put("channelTag", payMap.get("channelTag"));
            saleMap.put("totalAmount", payMap.get("totalAmount"));

            payRateMap.put("date", payMap.get("calcDate"));
            payRateMap.put("appId", payMap.get("appId"));
            payRateMap.put("allianceId", payMap.get("allianceId"));
            payRateMap.put("channelTag", payMap.get("channelTag"));
            payRateMap.put("payRate", NumberUtils.getPercent(NumberUtils.getDouble(payMap.get("payRate"),4)) + "%");

            arpuMap.put("date", payMap.get("calcDate"));
            arpuMap.put("appId", payMap.get("appId"));
            arpuMap.put("allianceId", payMap.get("allianceId"));
            arpuMap.put("channelTag", payMap.get("channelTag"));
            arpuMap.put("arpu",  NumberUtils.getDouble((int) saleMap.get("totalAmount") * 1.0 / (int) mauMap.get("mauCount"),2));

            arppuMap.put("date", payMap.get("calcDate"));
            arppuMap.put("appId", payMap.get("appId"));
            arppuMap.put("allianceId", payMap.get("allianceId"));
            arppuMap.put("channelTag", payMap.get("channelTag"));
            String payrate = payRateMap.get("payRate").toString();
            double payr = Double.parseDouble(payrate.substring(0, payrate.length() - 1))/100;
            arppuMap.put("arppu", NumberUtils.getDouble((int) saleMap.get("totalAmount") * 1.0 / (int) mauMap.get("mauCount")/payr,2));

            dataMap.put("sale", saleMap);
            dataMap.put("payRate", payRateMap);
            dataMap.put("arpu", arpuMap);
            dataMap.put("arppu", arppuMap);
            resultList.add(dataMap);
        }

        return resultList;
    }


    @Override
    public List<Map> pfRr(PageData pd) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startD")) && StringUtils.isNotEmpty(pd.getString("endD")), "日期不能为空");
        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("returnDays")), "留存天数不能为空");
        List<Map> r = new ArrayList<>();
        boolean flag = false;
        Map result = new HashMap<>();
        try {
            String[] channelList = memberInfoService.getRoles(pd.getString("token"), pd.get("allianceId") == null ? "" : pd.get("allianceId")
					.toString());
            if (channelList != null && 0 != channelList.length) {
                pd.put("allianceId", channelList[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String params = Utility.getUrlParamsByMap(pd);
        String resultString = Utility.sendPost(SearchConstant.PF_BI_URL + SearchConstant.PF_BI_RR, params);
        result = FastJsonUtils.convertJSONString2Object(resultString, Map.class);


        List<Map> list = (List<Map>) result.get("data");
        for (Map domain : list) {
            String key = "" + domain.get("regDate") + domain.get("appId") + domain.get("allianceId") + domain.get("channelTag");
            flag = false;
            for (Map<String, Object> map : r) {
                if (map.get("key").equals(key)) {
                    getRr(map, domain);
                    flag = true;
                }
            }
            if (!flag) {
                Map<String, Object> m = new HashMap<>();
                m.put("key", key);
                m.put("regDate", domain.get("regDate"));
                m.put("appId", domain.get("appId"));
                m.put("allianceId", domain.get("allianceId"));
                m.put("channelTag", domain.get("channelTag"));
                getRr(m, domain);
                r.add(m);
            }
        }
        for (Map<String, Object> map : r) {
            map.remove("key");
        }

        return r;
    }

    private void getRr(Map<String, Object> map, Map domain) {
        map.put("PfUidReNum" + domain.get("returnDays"), domain.get("visitPfUidCount"));
        map.put("PfUidRePercent" + domain.get("returnDays"), domain.get("pfUidReturnRate"));
        map.put("PfDeviceReNum" + domain.get("returnDays"), domain.get("visitPfDeviceCount"));
        map.put("PfDeviceRePercent" + domain.get("returnDays"), domain.get("pfDeviceReturnRate"));
        map.put("GameUidReNum" + domain.get("returnDays"), domain.get("visitGameUidCount"));
        map.put("GameUidRePercent" + domain.get("returnDays"), domain.get("gameUidReturnRate"));
        map.put("GameDeviceReNum" + domain.get("returnDays"), domain.get("visitGameDeviceCount"));
        map.put("GameDeviceRePercent" + domain.get("returnDays"), domain.get("gameDeviceReturnRate"));
    }


}
