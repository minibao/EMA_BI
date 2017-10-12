package com.gmtool.constant;

import static com.gmtool.util.ConstantUtils.getConstantValue;

import com.gmtool.util.PropertiesUtil;

public class SearchConstant {
	
	
	 //无尽BI
	 public static final String BI_URL = PropertiesUtil.get("hope.bi.url");
    //平台BI
    public static final String PF_BI_URL = PropertiesUtil.get("pf.bi.url"); 
	//次元BI
	public static final String CIYUAN_URL = PropertiesUtil.get("ciyuan.bi.url"); 
    // 热云
    public static final String AD_URL = PropertiesUtil.get("reyun.url");
	//无尽API
	public static final String HOPE_URL = PropertiesUtil.get("hope.server.url");
	//无尽关联平台账号
    public static final String HOPE_LOGIN_URL = PropertiesUtil.get("hope.login.url");
	//平台admin
    public static final String PF_ADMIN_URL = PropertiesUtil.get("pf.admin.url");
    
    
    
	//无尽BI 
    public static final String BI_BATTLE_SEARCH = getConstantValue("battleSearch"); //无尽战斗统计
    public static final String BI_RESOURCE_SEARCH = getConstantValue("resourceSearch");//无尽资源统计
    public static final String BI_LOG = getConstantValue("log/detail");//日志
    public static final String BI_USERLIST = getConstantValue("user/userBasicList");//用户列表
    public static final String BI_USERIP = getConstantValue("user/userBasicInfo");//用户ip
   
    //无尽API
    public static final String HOPE_MUTE = getConstantValue("users/mute");//禁言玩家
    public static final String HOPE_QUIT = getConstantValue("users/quit");//踢出玩家
    public static final String HOPE_UID = getConstantValue("users/uid");//name查询uid
    public static final String HOPE_NAME = getConstantValue("users/name");//uid查询name
    public static final String HOPE_INFO = getConstantValue("users/info");//uid查询玩家信息
    public static final String HOPE_MAIL = getConstantValue("mailsadd");//发送邮件
    public static final String HOPE_ANNOUNCE_ADD = getConstantValue("announceadd");//添加跑马灯
    public static final String HOPE_ANNOUNCE_DEL = getConstantValue("announcedel");//删除跑马灯
    public static final String HOPE_ANNOUNCE_GET = getConstantValue("announces");//获得跑马灯
	//无尽关联平台账号
    public static final String HOPE_LOGIN_EMALOOKUP = getConstantValue("emalookup");//玩家
    
    
    //平台BI
    public static final String PF_BI_DAU = getConstantValue("statistics/activeUsers");//平台活跃用户统计
    public static final String PF_BI_REG = getConstantValue("statistics/newUsers");//平台新用户统计
    public static final String PF_BI_PAYMENT = getConstantValue("statistics/usersFee");//平台付费统计
    public static final String PF_BI_RR = getConstantValue("statistics/userRetention");//平台留存统计
    public static final String PF_BI_PR = getConstantValue("statistics/userPayRetention");//平台付费留存统计
    public static final String AD_BI_PR = getConstantValue("statistics/reyunPayRetention");//广告付费留存统计
    public static final String PF_BI_RETENTION_RATE = getConstantValue("statistics/retentionRate");//留存比统计
    public static final String PF_BI_MAU = getConstantValue("statistics/mau");//平台月活跃用户统计
    public static final String PF_BI_MNU = getConstantValue("statistics/mnu");//平台月新增用户统计
    public static final String PF_BI_MPAY = getConstantValue("statistics/mpay");//平台月付费用户统计

    public static final String PF_BI_DAUREALTIME = getConstantValue("statistics/userDauRealTime"); //实时活跃用户统计
    public static final String PF_BI_REGREALTIME = getConstantValue("statistics/userRegRealTime");//平台实时新用户统计
    public static final String PF_BI_PAYMENTREALTIME = getConstantValue("statistics/userPaymentRealTime");//平台付费实时统计
    public static final String PF_BI_RETENTIONREALTIME = getConstantValue("statistics/userRetentionRealTime");//平台留存实时统计

    public static final String PF_BI_PAYMENTSTATICS = getConstantValue("statistics/userPaymentStatics");//平台付费统计

    public static final String PF_BI_DICT = getConstantValue("dictionaries/selectChannel");//平台渠道字典表
    public static final String PF_BI_USERLEVEL = getConstantValue("userLevel/getUserLevelByDate");//平台用户升级
    public static final String PF_BI_USERAPPLICATION = getConstantValue("userLevel/getUserLevelAppInformation");//平台用户升级
    public static final String PF_BI_COMPANYPAYINFORMATION = getConstantValue("company/getCompanyPayInformation");//平台用户升级
    
    //热云
    public static final String AD_SEARCH = getConstantValue("hotkey/search");//短链表
    public static final String AD_INFO = getConstantValue("hotkey/info");//添加短链
    public static final String AD_SHORTKEY = getConstantValue("hotkey/updateShortKey");//修改短链信息
    public static final String AD_DAILYCOST = getConstantValue("hotkey/updateDailyCost");//修改每日短链花费
    public static final String AD_RR = getConstantValue("hotkey/getReturn");//留存信息
    public static final String AD_UserRR = getConstantValue("hotkey/getRr");//留存信息
    public static final String AD_REG = getConstantValue("hotkey/getReg");//新增
    public static final String AD_PAYMENT = getConstantValue("hotkey/getPayment");//付费
    public static final String AD_ADPF = getConstantValue("hotkey/adPf");//广告平台
    
    //次元
    public static final String CIYUAN_DICT_SERVER = getConstantValue("dictionaries/getServiceAndAlliance");//服务器渠道列表
    public static final String CIYUAN_DICT_SKIN = getConstantValue("dictionaries/getAllSkinDictionary");//皮肤列表
    public static final String CIYUAN_DICT_HERO = getConstantValue("dictionaries/getAllHeroDictionary");//英雄列表
    public static final String CIYUAN_DICT_TASK = getConstantValue("dictionaries/getTaskDictionary");//任务列表
    public static final String CIYUAN_DICT_MAP = getConstantValue("dictionaries/getMapDictionary");//地图列表
    public static final String CIYUAN_DICT_GOODS = getConstantValue("dictionaries/getCommodityDictionary");//商品列表
    
    public static final String CIYUAN_NEW_TASK = getConstantValue("userTask/getNewbieTaskStatistics");//新手任务
    public static final String CIYUAN_ONLINE_TIME = getConstantValue("onlineStatistics/getStatisticsOnlineTime");//在线时长
    public static final String CIYUAN_USER_ONLINE_NUM = getConstantValue("userReal/selectUserOnlineNum");//在线人数
    public static final String CIYUAN_USER_ONLINE_TIME = getConstantValue("onlineStatistics/getAllUserOnlineTime");//在线时间
    public static final String CIYUAN_DAU = getConstantValue("dailyData/getStatisticsDauData");//Dau
    public static final String CIYUAN_REG = getConstantValue("userRegister/getUserRegisterStatistics");//注册用户
    public static final String CIYUAN_USER_GOLD = getConstantValue("userResources/selectUserGoldStatistics");//用户金币消耗
    public static final String CIYUAN_USER_DIAMOND = getConstantValue("userResources/selectUserDiamondsStatistics");//用户钻石消耗
    public static final String CIYUAN_USER_HERO_SKIN = getConstantValue("userHero/selectUserBuySkinStatistics");//购买皮肤统计
    public static final String CIYUAN_USER_HERO = getConstantValue("userHero/selectUserBuyHeroStatistics");//购买英雄统计
    public static final String CIYUAN_TASK_EVERYDAY = getConstantValue("userTask/getEveryDayTaskStatistics");//每日任务统计
    public static final String CIYUAN_HERO_WIN = getConstantValue("userHero/selectHeroWinProbabilityStatistics");//英雄胜率 统计
    public static final String CIYUAN_BATTLE_STATS = getConstantValue("userBattle/selectBattleStatistics");//场内数据
    public static final String CIYUAN_RETENTION = getConstantValue("userRetained/selectRetainedData");//留存统计
    public static final String CIYUAN_PACKAGE = getConstantValue("userBuy/selectUserBuyPackageInformation");//礼包数据查询
    public static final String CIYUAN_DIAMOND_COST = getConstantValue("userResources/selectUserNewDiamondsDetailsStatisticsForReason");//钻石消耗查询
    public static final String CIYUAN_LOTTERY = getConstantValue("userResources/selectUserLotteryStatistics");// 祈愿获得奖品接口
    public static final String CIYUAN_ACTIVITY = getConstantValue("userActivity/selectUserActivityOneTwoThree");// 活动接口
    public static final String CIYUAN_SKIN_AWAKEN = getConstantValue("userHero/selectUserAwkenSkinStatistics");// 皮肤觉醒接口
    public static final String CIYUAN_RECHARGE_RECORD = getConstantValue("userResources/selectUserRechargeRecord");// 人民币充值记录
    
    
    
    //平台admin
    public static final String PF_ADMIN_QUERY_BASIC_INFO = getConstantValue("admin/queryByParams");//查询用户
    public static final String PF_ADMIN_CHANGE_BASIC_INFO = getConstantValue("admin/changeMemberBasicInfo");//更新用户信息
    public static final String PF_ADMIN_GET_ORDER = getConstantValue("admin/selectOrder");//获得订单列表
    public static final String PF_ADMIN_SUPPLY_ORDER_AGAIN = getConstantValue("admin/supplyOrderAgainforAdmin");//补单
    public static final String PF_ADMIN_USER_STATUS = getConstantValue("admin/selectPfInfo");//获得用户状态
    public static final String PF_ADMIN_CHANGE_USER_PF_STATUS = getConstantValue("admin/updatePfStatus");//更新用户平台状态
    public static final String PF_ADMIN_CHANGE_USER_PAY__STATUS = getConstantValue("admin/updatePfBillingStatus");//更新用户支付状态
    public static final String PF_ADMIN_TRANSACTION = getConstantValue("admin/selectAllTransaction");//支付查询
    public static final String PF_ADMIN_QUERY_ALIPAY = getConstantValue("admin/queryAliPay");//支付宝查询
    public static final String PF_ADMIN_CHANNELPID = getConstantValue("admin/channelPid");//渠道商品
    public static final String PF_ADMIN_RESET_PFADMIN = getConstantValue("admin/resetPfAdmin");//更新平台缓存
    public static final String PF_ADMIN_WHITE_LIST_ALLIANCE = getConstantValue("admin/whiteListAlliance");//白名单渠道App
    public static final String PF_ADMIN_CHANGE_WHITE_LIST_ALLIANCE = getConstantValue("admin/changeWhiteListAlliance");//白名单渠道更新
    public static final String PF_ADMIN_WHITE_LIST_UID = getConstantValue("admin/whiteListUid");//白名uid
    public static final String PF_ADMIN_CHANGE_WHITE_LIST_UID = getConstantValue("admin/changeWhiteListUid");//白名单uid更新

    //TODO 新版admin
    public static final String PF_ADMIN_GET_ORDER_INFO = getConstantValue("admin/getOrderInfo");//获取订单信息
    public static final String PF_ADMIN_SUPPLY_ORDER_FOR_GAME = getConstantValue("admin/supplyOrderAgainforGame");//强制补单
    public static final String PF_ADMIN_USER_INFO = getConstantValue("admin/userInfo");//获取用户信息
    public static final String PF_ADMIN_UPDATE_USER_INFO = getConstantValue("admin/updateUserInfo");//更新用户信息
}
  