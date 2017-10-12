package com.gmtool.constant;

import static com.gmtool.util.ConstantUtils.getConstantValue;


/**
 * 鐢ㄦ埛鍩烘湰淇℃伅甯搁噺
 * User: Karl
 * Date: 2016/7/14
 * Time: 10:46
 */
public class MemberInfoConstant {

    /**
     * 缁戝畾骞冲彴
     */
    public static final String BUNDLE_TYPE_QQ = getConstantValue("0");//QQ
    public static final String BUNDLE_TYPE_WINXIN = getConstantValue("1");//寰俊
    public static final String BUNDLE_TYPE_360 = getConstantValue("2");//360

    /**
     * 璐﹀彿鐘舵��
     */
    public static final String STATUS_TEMP = getConstantValue("0");//涓存椂
    public static final String STATUS_NORMAL = getConstantValue("1");//姝ｅ父
    public static final String STATUS_SUSPENDED = getConstantValue("2");//灏佸仠
    public static final String STATUS_TO_BE_DELETED = getConstantValue("3");//寰呭垹
    public static final String STATUS_TO_VOID = getConstantValue("4");//浣滃簾
    public static final String STATUS_SUSPICIOUS = getConstantValue("5");//鍙枒
    public static final String STATUS_SILENT = getConstantValue("6");//娌夐粯

    /**
     * 璐﹀彿绫诲瀷
     */
    public static final String ACCOUNT_TYPE_WEAK = "0";//寮辫处鍙�
    public static final String ACCOUNT_TYPE_MOBILE = "1";//鎵嬫満璐﹀彿
    public static final String ACCOUNT_TYPE_EMAIL = "2";//閭璐﹀彿
    public static final String ACCOUNT_TYPE_UNION = "3";//鑱斿悎璐﹀彿

    /**
     * 鎬у埆
     */
    public static final String GENDER_FEMALE = getConstantValue("0");//濂�
    public static final String GENDER_MALE = getConstantValue("1");//鐢�
    public static final String GENDER_NULL = getConstantValue("2");//鏈～鍐�

    /**
     * redis key鍓嶇紑
     */
    public static final String PREFIX_AUTHCODE = getConstantValue("authCode");//authCode key鍓嶇紑
    public static final String PREFIX_TOKEN = getConstantValue("token");//token 鍙互鍓嶇紑

    /**
     * token榛樿鏈夋晥鏈�
     */
    public static final int TOKEN_DEFAULT_EXP_DATE = 60 * 60 * 24 * 14;//(14澶�)鍗曚綅绉�
    /**
     * 榛樿鏄电О鍓嶇紑
     */
    public static final String PREFIX_NICKNAME = getConstantValue("ema");
    public static final String PREFIX_DEFAULT_PWD = getConstantValue("ema");
}
