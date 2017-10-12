package com.gmtool.util;


/**
 * 生成token工具类
 * User: Karl
 * Date: 2016/7/15
 * Time: 18:36
 */
public class TokenUtils {

    /**
     * 生成token方法1：DES加密
     * @param source
     * @return
     */
    public static String geTokenMd5(String source) {
        return DesUtils.encode(source);
    }

    /**
     * 生成token方法2：先MD5加密，再DES加密
     * @param source
     * @return
     */
    public static String geTokenMd5Des(String source) {
         return DesUtils.encode(Md5Utils.encode(source));
    }

    /**
     * 生成token方法3：先MD5加密，再加上6位随机数字，再MD5加密，再DES加密
     * @param source
     * @return
     */
    public static String geTokenMd5Md5Des(String source) {
        return DesUtils.encode(Md5Utils.encode(Md5Utils.encode(source) + StringUtils.random6()));
    }

}
