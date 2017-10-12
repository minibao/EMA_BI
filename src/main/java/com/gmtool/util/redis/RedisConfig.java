package com.gmtool.util.redis;

import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;


/**
 * redis 缓存配置
 * User: Karl
 * Date: 2016/7/13
 * Time: 18:28
 */
public class RedisConfig {
    public static int MaxActive = 10;  //连接池中最大活动对象数
    public static int MaxIdle = 10;    //连接池中最大空闲对象数
    public static long MaxWait = 3000; //获取value时的最长等待毫秒数
    public static int RetryNum = 3;     //连接redis服务器时的失败重连次数

    public static int EXPIRE = 0;     // 0 - never expire
    public static String HOST = "";
    public static int PORT = 0;
    public static int TIMEOUT = 0;      //连接redis服务器的等待超时时间

    static{
        Resource resource = new ClassPathResource("conf.properties");
        try {
            Properties props = PropertiesLoaderUtils.loadProperties(resource);
            HOST = props.getProperty("redis.host");
            PORT = Integer.parseInt(props.getProperty("redis.port").trim());
            TIMEOUT = Integer.parseInt(props.getProperty("redis.timeout").trim());
            EXPIRE = Integer.parseInt(props.getProperty("redis.expire").trim());
            
            MaxActive = Integer.parseInt(props.getProperty("redis.maxactive").trim());
            MaxIdle = Integer.parseInt(props.getProperty("redis.maxidle").trim());
            MaxWait = Integer.parseInt(props.getProperty("redis.maxwait").trim());
            RetryNum = Integer.parseInt(props.getProperty("redis.retrynum").trim());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
