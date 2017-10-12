package com.gmtool.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Utils {
    private final static String[] hexDigits = {"0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "a", "b", "c", "d", "e", "f"};

    /**
     * 转换字节数组为16进制字串
     * @param b 字节数组
     * @return 16进制字串
     */
    public static String byteArrayToHexString(byte[] b) {
        StringBuilder resultSb = new StringBuilder();
        for (byte aB : b) {
            resultSb.append(byteToHexString(aB));
        }
        return resultSb.toString();
    }

    /**
     * 转换byte到16进制
     * @param b 要转换的byte
     * @return 16进制格式
     */
    private static String byteToHexString(byte b) {
        int n = b;
        if (n < 0) {
            n = 256 + n;
        }
        int d1 = n / 16;
        int d2 = n % 16;
        return hexDigits[d1] + hexDigits[d2];
    }

    /**
     * MD5编码1:字母为小写（暂定使用大写转换方法）
     * @param origin 原始字符串
     * @return 经过MD5加密之后的结果
     */
    private static String encode2(String origin) {
        String resultString = null;
        try {
            resultString = origin;
            MessageDigest md = MessageDigest.getInstance("MD5");
            resultString = byteArrayToHexString(md.digest(resultString.getBytes("utf-8")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultString;
    }

    /**
     * MD5加密2:字母为大写
     * @param origin
     * @return
     * @throws Exception
     */
    public static String encode(String origin){
        StringBuilder sb = null;
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(origin.getBytes("utf-8"));
            sb = new StringBuilder();
            for (byte b :  md5.digest()) {
                // 使用两位表示，不足补零
                sb.append(String.format("%02X", b));
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception{
        String str1 ="ema640625";
        System.out.println(encode(str1));
    }

    private static String qafMd5() throws Exception {
        String key="549F23ED0A65DC390E0C0A2B906794EE";
        String strSrc="[{\"productSku\": \"601060101389\",\"changeStock\": \"46\" },{\"productSku\": \"601060101390\",\"changeStock\": \"47\"}]";
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(strSrc.getBytes("UTF-8"));

        String result="";
        byte[] temp;
        temp=md5.digest(key.getBytes("UTF-8"));
        for (int i=0; i<temp.length; i++){
            result+=Integer.toHexString((0x000000ff & temp[i]) | 0xffffff00).substring(6);
        }
//	            result="88781DB8A7B7E0E2B22C408554C9850E";
        return result;
    }
}
