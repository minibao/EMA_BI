package com.gmtool.controller.pfStats;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gmtool.controller.base.BaseController;
import com.gmtool.service.pfStats.IPfAdminService;
import com.gmtool.util.PageData;
import com.gmtool.util.StringUtils;
import com.google.common.base.Preconditions;

@Controller("pfAdminController")
@RequestMapping("/pf-admin")
public class PfAdminController extends BaseController{
	@Autowired 
	private IPfAdminService pfAdminService;
	
	/**
	 * uid email mobile deviceId
	 * @return
	 */
	@RequestMapping(value="/userInfo")
	@ResponseBody
	public Object userInfo(){
		logBefore(logger, "userInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid"))
	        		||StringUtils.isNotEmpty(pd.getString("email"))
	        		||StringUtils.isNotEmpty(pd.getString("mobile"))
	        		||StringUtils.isNotEmpty(pd.getString("deviceId")), "参数不能为空");
			map.put("data", pfAdminService.userInfo(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * uid email mobile password
	 * @return
	 */
	@RequestMapping(value="/changeUserInfo")
	@ResponseBody
	public Object changeUserInfo(){
		logBefore(logger, "changeUserInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid"))
	        		&&(StringUtils.isNotEmpty(pd.getString("email"))
	        		||StringUtils.isNotEmpty(pd.getString("mobile"))
	        		||StringUtils.isNotEmpty(pd.getString("password"))), "参数不能为空");
			map.put("data", pfAdminService.changeUserInfo(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/orderMiss")
	@ResponseBody
	public Object getOrderMiss(){
		logBefore(logger, "orderMiss");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.getOrderMiss(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	
	/**
	 * uid orderId allianceUid
	 * @return
	 */
	@RequestMapping(value="/supplyOrderAgain")
	@ResponseBody
	public Object supplyOrderAgain(){
		logBefore(logger, "supplyOrderAgain");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("orderId")), "订单号不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("allianceUid")), "渠道uid不能为空");
			map.put("data", pfAdminService.supplyOrderAgain(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	
	/**
	 * uid 
	 * @return
	 */
	@RequestMapping(value="/userStatus")
	@ResponseBody
	public Object userStatus(){
		logBefore(logger, "userStatus");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
			map.put("data", pfAdminService.userStatus(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * uid frozen  type
	 * @return 
	 */
	@RequestMapping(value="/changeUserStatus")
	@ResponseBody
	public Object changeUserStatus(){
		logBefore(logger, "changeUserStatus");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("type")), "type不能为空");
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("frozen")), "frozen不能为空");
	        pd.put("forzen", pd.getString("frozen"));
			map.put("data", pfAdminService.changeUserStatus(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	
	/**
	 * uid
	 * @return 
	 */
	@RequestMapping(value="/getTransaction")
	@ResponseBody
	public Object getTransaction(){
		logBefore(logger, "getTransaction");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("uid")), "uid不能为空");
			map.put("data", pfAdminService.getTransaction(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * tradeNo
	 * @return 
	 */
	@RequestMapping(value="/queryAliPay")
	@ResponseBody
	public Object queryAliPay(){
		logBefore(logger, "queryAliPay");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("tradeNo")), "tradeNo不能为空");
			map.put("data", pfAdminService.queryAliPay(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * adminKey emaAdmin-12345678
	 * @return 
	 */
	@RequestMapping(value="/resetPfAdmin")
	@ResponseBody
	public Object resetPfAdmin(){
		logBefore(logger, "resetPfAdmin");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
	        //Preconditions.checkArgument(StringUtils.isNotEmpty(pd.getString("adminKey")), "adminKey不能为空");
			map.put("data", pfAdminService.resetPfAdmin(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}

	
	/**
	 * 查询白名单渠道
	 * @return 
	 */
	@RequestMapping(value="/whiteListAlliance")
	@ResponseBody
	public Object whiteListAlliance(){
		logBefore(logger, "whiteListAlliance");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.whiteListAlliance(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * 更新白名单渠道 0 增加 1更新 2删除
	 * @return 
	 */
	@RequestMapping(value="/changeWhiteListAlliance")
	@ResponseBody
	public Object changeWhiteListAlliance(){
		logBefore(logger, "changeWhiteListAlliance");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.changeWhiteListAlliance(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	

	/**
	 * 查询白名单uid
	 * @return 
	 */
	@RequestMapping(value="/whiteListUid")
	@ResponseBody
	public Object whiteListUid(){
		logBefore(logger, "whiteListUid");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.whiteListUid(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}
	
	/**
	 * 更新白名单uid 0 增加 1更新 2删除
	 * @return 
	 */
	@RequestMapping(value="/changeWhiteListUid")
	@ResponseBody
	public Object changeWhiteListUid(){
		logBefore(logger, "changeWhiteListUid");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.changeWhiteListUid(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
	        e.printStackTrace();  
	    }
		return map;
	}



	@RequestMapping(value="/getOrderInfo")
		 @ResponseBody
		 public Object getOrderInfo(){
		logBefore(logger, "getOrderInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map.put("data", pfAdminService.getOrderInfo(pd));
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
			map.put("msg",e.getMessage());
			e.printStackTrace();
		}
		return map;
	}

	@RequestMapping(value="/supplyOrderForGame")
	@ResponseBody
	public Object supplyOrderForGame(){
		logBefore(logger, "supplyOrderForGame");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map=pfAdminService.supplyOrderForGame(pd);
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
			map.put("msg",e.getMessage());
			e.printStackTrace();
		}
		return map;
	}

	@RequestMapping(value="/getUserInfo")
	@ResponseBody
	public Object getUserInfo(){
		logBefore(logger, "getUserInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map=pfAdminService.getUserInfo(pd);
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
			map.put("msg",e.getMessage());
			e.printStackTrace();
		}
		return map;
	}

	@RequestMapping(value="/updateUserInfo")
	@ResponseBody
	public Object updateUserInfo(){
		logBefore(logger, "updateUserInfo");
		PageData pd = new PageData();
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			pd = this.getPageData();
			map=pfAdminService.updateUserInfo(pd);
			map.put("result", 0);
		}catch(Exception e) {
			map.put("result", 1);
			map.put("msg",e.getMessage());
			e.printStackTrace();
		}
		return map;
	}
}
