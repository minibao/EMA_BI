package com.gmtool.controller.stats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.entity.DayResourceCirculate;
import com.gmtool.entity.ResourceInOutAmount;
import com.gmtool.service.IUserStatsService;
import com.gmtool.util.AppUtil;
import com.gmtool.util.PageData;

@Controller("consumeController")
@RequestMapping("/game-stats/consume")
public class ConsumeController extends BaseController{
	
	@Autowired
	private IUserStatsService userStatsService;
	
	
	@RequestMapping(value="/diamond")
	@ResponseBody
	public Object diamond(){
		logBefore(logger, "diamond consume");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		
		try {
			pd = this.getPageData();
			pd.put("resouceType", "CATEGORY");
			pd.put("resouceName", "钻石");
			List<DayResourceCirculate> resourceList = userStatsService.findResourceCirculate(pd);
			map.put("consume", resourceList);
			//map.put("remain", null);
			
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return AppUtil.returnObject(pd, map);
	}

	@RequestMapping(value="/gold")
	@ResponseBody
	public Object gold(){
		logBefore(logger, "gold consume");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", 0);
		
		try {
			pd = this.getPageData();
			pd.put("resouceType", "CATEGORY");
			pd.put("resouceName", "金币");
			List<DayResourceCirculate> resourceList = userStatsService.findResourceCirculate(pd);
			map.put("consume", resourceList);
			//map.put("remain", null);
			
		}catch(Exception e){
			map.put("result", 1);
	        e.printStackTrace(); 			
		}
		
		return AppUtil.returnObject(pd, map);
	}
	
	@RequestMapping(value="/detail")
    @ResponseBody
    public Object detail(){
        logBefore(logger, "detail");
        PageData pd = new PageData();
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("result", 0);
        
        try {
            pd = this.getPageData();
            List<ResourceInOutAmount> resourceList = userStatsService.findResourceDetail(pd);
            map.put("detail", resourceList);
            //map.put("remain", null);
            
        }catch(Exception e){
            map.put("result", 1);
            e.printStackTrace();            
        }
        
        return AppUtil.returnObject(pd, map);
    }
	

}
