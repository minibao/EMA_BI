package com.gmtool.controller.pfStats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.pfStats.IPfRealtimeStstsService;
import com.gmtool.util.PageData;


@Controller("pfRealtimeStstsController")
@RequestMapping("/pf-realtime")
public class PfRealtimeStstsController extends BaseController{
	
	@Autowired 
	private IPfRealtimeStstsService pfRealtimeStstsService;

	
	@RequestMapping(value="/pfDau")
	@ResponseBody
	public Object pfDau(){
		logBefore(logger, "pfDauRealtime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map> list = new ArrayList<Map>();
		try {
			pd = this.getPageData();
			list = pfRealtimeStstsService.pfDauRealtime(pd);
			map.put("dau", list);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return map;
	}
	
	@RequestMapping(value="/pfReg")
	@ResponseBody
	public Object pfReg(){
		logBefore(logger, "pfRegRealtime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map> list = new ArrayList<Map>();
		try {
			pd = this.getPageData();
			list = pfRealtimeStstsService.pfRegRealtime(pd);
			map.put("reg", list);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return map;
	}
	
	
	@RequestMapping(value="/pfPayment")
	@ResponseBody
	public Object pfPayment(){
		logBefore(logger, "pfPaymentRealtime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map> list = new ArrayList<Map>();
		try {
			pd = this.getPageData();
			list = pfRealtimeStstsService.pfPaymentRealtime(pd);
			map.put("payment", list);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return map;
	}
	
	@RequestMapping(value="/pfRr")
	@ResponseBody
	public Object pfRr(){
		logBefore(logger, "pfRetentionRealtime");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map> list = new ArrayList<Map>();
		try {
			pd = this.getPageData();
			pd.put("returnDays", "1");
			list = pfRealtimeStstsService.pfRetentionRealtime(pd);
			map.put("payment", list);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}

	@RequestMapping(value="/pfPaymentStatics")
	@ResponseBody
	public Object pfPaymentStatics(){
		logBefore(logger, "pfPaymentStatics");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map> list = new ArrayList<Map>();
		try {
			pd = this.getPageData();
			list = pfRealtimeStstsService.pfUserPaymentStatics(pd);
			map.put("payment", list);
			map.put("result", 0);
		}catch (Exception e) {
			map.put("result", 1);
			e.printStackTrace();
		}
		return map;
	}
}
