package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.IAuctionDetailInfoService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("auctionController")
@RequestMapping("/game-stats/auction")
public class AuctionController extends BaseController{
	
	@Autowired
	private IAuctionDetailInfoService auctionDetailInfoService;

	@RequestMapping(value="/analyze")
	@ResponseBody
	public Object analyze(){
		logBefore(logger, "auction analyze");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();

		try {
			pd = this.getPageData();
			map = auctionDetailInfoService.findGoldAuctionDetail(pd);
			map.put("result", 0);
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return AppUtil.returnObject(pd, map);
	}

	

}
