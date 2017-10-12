package com.gmtool.controller.pfStats;

import com.alibaba.fastjson.JSONObject;
import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.TokenModel;
import com.gmtool.service.IAuthService;
import com.gmtool.service.pfStats.IPfUserService;
import com.gmtool.util.PageData;
import com.gmtool.util.ServiceHelper;
import com.gmtool.util.StringUtils;
import com.google.common.base.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xianglong on 2017/3/3.
 */
@Controller("pfUserController")
@RequestMapping("/pf-user")
public class PfUserController extends BaseController{

    @Autowired
    private IPfUserService pfUserService;

    @Autowired
    private IAuthService iAuthService;

    @RequestMapping(value="/getUserLevelByDate")
    @ResponseBody
    public Object getUserLevelByDate(){
        logBefore(logger, "getUserLevelByDate");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            pd = this.getPageData();
            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startDate")), "时间不能为空");
            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endDate")), "时间不能为空");
            PageData pd1 = new PageData();
            pd1.put("startDate", pd.getString("startDate"));
            pd1.put("endDate", pd.getString("endDate"));
            map.put("data", pfUserService.getUserLevelByDate(pd1));
            map.put("result", 0);
        }catch(Exception e){
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping(value="/getUserLevelAppInformation")
    @ResponseBody
    public Object getUserLevelAppInformation(){
        logBefore(logger, "getUserLevelAppInformation");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            pd = this.getPageData();
//            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startDate")), "时间不能为空");
//            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endDate")), "时间不能为空");
            PageData pd1 = new PageData();
//            pd1.put("startDate", pd.getString("startDate"));
//            pd1.put("endDate", pd.getString("endDate"));
            map.put("data", pfUserService.getUserLevelAppInformation(pd1));
            map.put("result", 0);
        }catch(Exception e){
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }
    @RequestMapping(value="/getCompanyPayInformation")
    @ResponseBody
    public Object getCompanyPayInformation(){
        logBefore(logger, "getCompanyPayInformation");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            pd = this.getPageData();
            String token = pd.getString("token");
            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("startDate")), "时间不能为空");
            Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("endDate")), "时间不能为空");
            PageData pd1 = new PageData();
            pd1.put("startDate", pd.getString("startDate"));
            pd1.put("endDate", pd.getString("endDate"));
            pd1.put("appId", pd.getString("appId"));
            pd1.put("allianceId", pd.getString("allianceId"));
            pd1.put("channelTag", pd.getString("channelTag"));
            pd1 = iAuthService.verification(pd1,token);
            map.put("data", pfUserService.getCompanyPayInformation(pd1));
            map.put("result", 0);
        }catch(Exception e){
            map.put("result", 1);
            e.printStackTrace();
        }
        return map;
    }
}
