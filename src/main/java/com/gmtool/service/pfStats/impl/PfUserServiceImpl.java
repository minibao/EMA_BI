package com.gmtool.service.pfStats.impl;

import com.alibaba.fastjson.JSONObject;
import com.gmtool.constant.SearchConstant;
import com.gmtool.service.pfStats.IPfUserService;
import com.gmtool.service.pfStats.sortClass;
import com.gmtool.util.*;
import com.google.common.base.Preconditions;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

/**
 * Created by xianglong on 2017/3/3.
 */
@Service("pfUserService")
public class PfUserServiceImpl implements IPfUserService {
    @Override
    public List<Map<String,Object>> getUserLevelByDate(PageData pd) {
        List<Map<String,Object>> result = new ArrayList<>();
        try{
            DESUtil.getCiyuanToken(pd);
            String params = Utility.getUrlParamsByMap(pd);
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_USERLEVEL, params);
            Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            if(call.get("resultCode").toString().equals("200")){
                result = (List)call.get("data");
            }
        }catch(Exception e){
            result = new ArrayList<>();
        }
        return result;
    }

    @Override
    public List<Map<String,Object>> getUserLevelAppInformation(PageData pd) {
        List<Map<String,Object>> result = new ArrayList<>();
        try{
            DESUtil.getCiyuanToken(pd);
            String params = Utility.getUrlParamsByMap(pd);
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_USERAPPLICATION, params);
            Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            if(call.get("resultCode").toString().equals("200")){
                result = (List)call.get("data");
            }
        }catch(Exception e){
            result = new ArrayList<>();
        }
        return result;
    }

    @Override
    public Object getCompanyPayInformation(PageData pd) {

        List<Map<String,Object>> result = new ArrayList<>();
        try{
            DESUtil.getCiyuanToken(pd);
            String params = Utility.getUrlParamsByMap(pd);
            String resultString = Utility.sendPost(SearchConstant.PF_BI_URL+SearchConstant.PF_BI_COMPANYPAYINFORMATION, params);
            Map<String,Object> call = FastJsonUtils.convertJSONString2Object(resultString, Map.class);
            if(call.get("resultCode").toString().equals("200")){
                result = (List)call.get("data");
            }
        }catch(Exception e){
            result = new ArrayList<>();
        }
        return result;
    }
}
