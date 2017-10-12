package com.gmtool.service;

/**
 * User: Karl
 * Date: 2016/8/17
 * Time: 10:20
 */
public interface IRedisService {

    /**
     * 鏌ョ湅鏄惁瀛樺湪
     * @param key
     * @return
     */
    boolean exists(String key);

    /**
     * 璁剧疆鍊�(榛樿鏈夋晥鏈�)
     * @param key
     * @param value
     * @param <T>
     * @return
     */
    <T> String set(String key, T value);
    
    <T> Long hset(String key, String field, T value);
    
    <T> Long append(String key, T value);
    
    <T> Long sadd(String key, String value);

    /**
     * 璁剧疆鍊�
     * @param key
     * @param value
     * @param expire 鏈夋晥鏃堕棿锛堝崟浣嶇锛�
     * @param <T>
     * @return
     */
    <T> String set(String key, T value, int expire);
    /**
     * 鑾峰彇鍊�
     * @param key
     * @param clazz
     * @param <T>
     * @return
     */
    <T> T get(String key, Class<T> clazz);
    
    <T> T hget(String key, String field, Class<T> clazz);
    
    <T> T keys(String key,  Class<T> clazz);
    
    <T> T smembers(String key,  Class<T> clazz);

    /**
     * 鍒犻櫎鍊�
     * @param key
     * @return
     */
    Long delete(String key);

}
