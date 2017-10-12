package com.gmtool.controller.ad;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.ad.IHotCloudService;
import com.gmtool.util.PageData;

@Controller("hotCloudController")
@RequestMapping("/hotCloud")
public class HotCloudController extends BaseController{
	
	@Autowired
	private IHotCloudService hotCloudService;
	
	@RequestMapping(value="/adSearch")
	@ResponseBody
	public Object adSearch(){
		logBefore(logger, "adSearch");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudList(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/adPf")
	@ResponseBody
	public Object adPf(){
		logBefore(logger, "adPf");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudAdPf(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	@RequestMapping(value="/addKey")
	@ResponseBody
	public Object addKey(){
		logBefore(logger, "addKey");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.addKey(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	@RequestMapping(value="/updateKey")
	@ResponseBody
	public Object updateKey(){
		logBefore(logger, "updateKey");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.updateShortKey(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping(value="/updateDailyCost")
	@ResponseBody
	public Object updateDailyCost(){
		logBefore(logger, "updateDailyCost");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.updateDailyCost(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
			e.printStackTrace();
		}

		return map;
	}


	@RequestMapping(value="/adPayment")
	@ResponseBody
	public Object adPayment(){
		logBefore(logger, "adPayment");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudPayment(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}
	
	
	@RequestMapping(value="/adRr")
	@ResponseBody
	public Object adRr(){
		logBefore(logger, "adRr");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudRr(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	@RequestMapping(value="/adUserRr")
	@ResponseBody
	public Object adUserRr(){
		logBefore(logger, "adRr");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudUserRr(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
			e.printStackTrace();
		}

		return map;
	}

	@RequestMapping(value="/adReg")
	@ResponseBody
	public Object adReg(){
		logBefore(logger, "adReg");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudReg(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		return map;
	}

	@RequestMapping(value="/adPr")
	@ResponseBody
	public Object adPr(){
		logBefore(logger, "adPr");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", hotCloudService.hotCloudPr(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
			e.printStackTrace();
		}
		return map;
	}

}

