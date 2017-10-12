package com.gmtool.service.pfStats;

import com.alibaba.fastjson.JSONObject;
import com.gmtool.util.PageData;

import java.util.List;
import java.util.Map;

/**
 * Created by xianglong on 2017/3/3.
 */
public interface IPfUserService {
    List<Map<String,Object>> getUserLevelByDate(PageData pd);

    List<Map<String,Object>> getUserLevelAppInformation(PageData pd1);

    Object getCompanyPayInformation(PageData pd1);
}
