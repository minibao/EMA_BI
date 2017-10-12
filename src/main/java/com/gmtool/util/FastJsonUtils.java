package com.gmtool.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.*;

/**
 *  JsonUtil杞寲澶勭悊
 */
public final class FastJsonUtils {
    private FastJsonUtils() {

    }

    /**
     * 灏嗗璞¤浆鎹负json瀛楃涓�.
     *
     * @param obj 琚浆鎹㈢殑瀵硅薄
     * @param <T> 绫诲瀷鍙傛暟
     * @return json瀛楃涓�
     */
    public static <T> String convertObject2JSONString(T obj) {
        return JSON.toJSONString(obj, SerializerFeature.WriteMapNullValue, SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.WriteNullNumberAsZero,
                SerializerFeature.WriteDateUseDateFormat, SerializerFeature.WriteNullListAsEmpty);//.replaceAll("null","\"\"");
    }

    /**
     * 灏嗗璞¤浆鎹负json瀛楃涓�.
     *
     * @param obj 琚浆鎹㈢殑瀵硅薄
     * @param <T> 绫诲瀷鍙傛暟
     * @return json瀛楃涓�
     */
    public static <T> String convertObject2JSONString2(T obj) {
        return JSON.toJSONString(obj, SerializerFeature.WriteMapNullValue, SerializerFeature.WriteNullStringAsEmpty,
                SerializerFeature.WriteDateUseDateFormat, SerializerFeature.WriteNullListAsEmpty);
    }

    /**
     * 閫氳繃鎸囧畾搴忓垪鍖栧弬鏁帮紝灏嗗璞¤浆鎹负json瀛楃涓�
     * @param obj 琚浆鎹㈢殑瀵硅薄
     * @param features 搴忓垪鍖栧弬鏁�
     * @param <T> 绫诲瀷鍙傛暟
     * @return json瀛楃涓�
     */
    public static <T> String convert2FormatJSONString(T obj, SerializerFeature... features) {
        return JSON.toJSONString(obj, features);
    }

    /**
     * 灏唈son涓茶浆鎹负绫诲瀷涓篶lassName鐨勫璞�.
     * 澶勭悊濡備笅json锛歿'field1':1,'field2':'a'}
     *
     * @param <T> 绫诲瀷鍙傛暟
     * @param jsonString json瀛楃涓�
     * @param className 瀵硅薄鐨凜lass绫诲瀷瀵硅薄
     * @return 瀵硅薄
     */
    public static <T> T convertJSONString2Object(String jsonString, Class<T> className) {
        return JSON.parseObject(jsonString, className);
    }

    /**
     * 灏唈son涓茶浆鎹负绫诲瀷涓篶lassName鐨勫璞�.
     * 澶勭悊濡備笅json锛歿'field1':1,'field2':'a'}
     *
     * @param <T> 绫诲瀷鍙傛暟
     * @param jsonString json瀛楃涓�
     * @param type TypeReference<T>
     * @return 瀵硅薄
     */
    public static <T> T convertJSONString2Object(String jsonString, TypeReference<T> type) {
        return JSON.parseObject(jsonString, type);
    }

    /**
     * 灏唈son涓茶浆鎹负绫诲瀷涓篶lassName鐨勫璞￠泦鍚�.
     * 澶勭悊濡備笅json锛歔{'field1':1,'field2':'a'},{'field1':2,'field2':'b'}]
     *
     * @param <T> 绫诲瀷鍙傛暟
     * @param jsonString json瀛楃涓�
     * @param className Class绫诲瀷瀵硅薄
     * @return 杞崲鎴愮殑list
     */
    public static <T> List<T> convertJSONString2Collection(String jsonString, Class<T> className) {
        return JSON.parseArray(jsonString, className);
    }

    /**
     * JSONObject杞琈ap<String,String>.
     *
     * @param jsonObject jsonObject
     * @return map
     */
    public static Map<String, String> convertJSONObject2Map(JSONObject jsonObject) {
        if (jsonObject != null) {
            Map<String, String> result = new HashMap<String, String>();
            Iterator<String> iterator = jsonObject.keySet().iterator();
            String key;
            String value;
            while (iterator.hasNext()) {
                key = iterator.next();
                value = jsonObject.getString(key);
                result.put(key, value);
            }
            return result;
        }
        return null;
    }

    /**
     * jsonArray杞琇ist<Map<String, String>>.
     *
     * @param jsonArray json鏁扮粍
     * @return 杞崲鍚庣殑list
     */
    public static List<Map<String, String>> convertJSONArray2ListMap(JSONArray jsonArray) {
        List<Map<String, String>> result = new ArrayList<Map<String, String>>();
        for (int i = 0, len = jsonArray.size(); i < len; i++) {
            result.add(convertJSONObject2Map(jsonArray.getJSONObject(i)));
        }
        return result;
    }

    /**
     * Map<String, String>杞瓧绗︿覆.
     *
     * @param map Map<String, String>瀵硅薄
     * @return json瀛楃涓�
     */
    public static String convertMapToJSONString(Map<String, String> map) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        for (String key : map.keySet()) {
            stringBuilder.append("\"");
            stringBuilder.append(key);
            stringBuilder.append("\"");
            stringBuilder.append(":");
            stringBuilder.append("\"");
            stringBuilder.append(map.get(key));
            stringBuilder.append("\"");
            stringBuilder.append(",");
        }
        String result = stringBuilder.toString();
        if (result.endsWith(",")) {
            result = result.substring(0, result.length() - 1);
        }
        return result + "}";
    }

    /**
     * Map<String, String>杞瓧绗︿覆.
     *
     * @param map Map<String, Object>瀵硅薄
     * @return json瀛楃涓�
     */
    public static String convertObjectMapToJSONString(Map<String, Object> map) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        for (String key : map.keySet()) {
            stringBuilder.append("\"");
            stringBuilder.append(key);
            stringBuilder.append("\"");
            stringBuilder.append(":");
            stringBuilder.append("\"");
            stringBuilder.append(map.get(key));
            stringBuilder.append("\"");
            stringBuilder.append(",");
        }
        String result = stringBuilder.toString();
        if (result.endsWith(",")) {
            result = result.substring(0, result.length() - 1);
        }
        return result + "}";
    }
}
