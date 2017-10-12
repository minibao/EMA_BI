package com.gmtool.controller.ciyuan;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.ciyuan.ICiyuanDictService;
import com.gmtool.util.PageData;


@Controller("ciyuanDictController")
@RequestMapping("/ciyuan-dict")
public class CiyuanDictController extends BaseController{
	
	@Autowired
	private ICiyuanDictService ciyuanDictService;
	
	/**
	 * 次元服务器渠道表
	 * @return
	 */
	@RequestMapping(value="/serverAlliance")
	@ResponseBody
	public Object serverAlliance(){
		logBefore(logger, "serverAlliance");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getServiceAndAlliance(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}		
		
		return map;
	}

	/**
	 * 皮肤字典
	 * @return
	 */
	@RequestMapping(value="/getSkin")
	@ResponseBody
	public Object getSkin(){
		logBefore(logger, "getSkin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getSkin(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}
	
	/**
	 * 英雄字典
	 * @return
	 */
	@RequestMapping(value="/getHero")
	@ResponseBody
	public Object getHero(){
		logBefore(logger, "getHero");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getHero(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}
	
	/**
	 * 任务字典
	 * @return
	 */
	@RequestMapping(value="/getTask")
	@ResponseBody
	public Object getTask(){
		logBefore(logger, "getTask");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getTask(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}
	
	
	/**
	 * 地图字典
	 * @return
	 */
	@RequestMapping(value="/getMap")
	@ResponseBody
	public Object getMap(){
		logBefore(logger, "getMap");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getMap(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}
	
	/**
	 * 商品字典
	 * @return
	 */
	@RequestMapping(value="/getGoods")
	@ResponseBody
	public Object getGoods(){
		logBefore(logger, "getGoods");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", ciyuanDictService.getGoods(pd));
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		return map;
	}
}
