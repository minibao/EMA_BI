package com.gmtool.service.impl;

import com.gmtool.constant.MemberInfoConstant;
import com.gmtool.service.IRedisService;
import com.gmtool.util.redis.JedisUtils;
import com.gmtool.util.redis.SerializeUtils;

import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;




@Service("redisService")
public class RedisServiceImpl implements IRedisService {


    /**
     * 鏌ョ湅鏄惁瀛樺湪
     * @param key
     * @return
     */
    @Override
    public boolean exists(String key) {
        Jedis jedis = null;
        boolean flag = false;
        for(int i=0;i<10;i++) {
            try {
                jedis = JedisUtils.getInstance().getJedis();
                flag = jedis.exists(key);
                JedisUtils.getInstance().closeJedis(jedis);
                break;
            } catch (Exception e) {
                if(i==9){
                    e.printStackTrace();
                }
                JedisUtils.getInstance().returnBrokenResource(jedis);
            }
        }
        return flag;
    }

    /**
     * 璁剧疆鍊�(榛樿鏈夋晥鏈�)
     * @param key
     * @param value
     * @param <T>
     * @return
     */
    @Override
    public <T> String set(String key, T value) {
        Jedis jedis = null;
        String result = null;
        for(int i=0;i<10;i++) {
            try {
                jedis = JedisUtils.getInstance().getJedis();
                result = jedis.setex(key.getBytes(), MemberInfoConstant.TOKEN_DEFAULT_EXP_DATE, SerializeUtils.serialize(value));
                JedisUtils.getInstance().closeJedis(jedis);
                break;
            } catch (Exception e) {
                if(i==9){
                    e.printStackTrace();
                }
                JedisUtils.getInstance().returnBrokenResource(jedis);
            }
        }
        return result;
    	
    }

    /**
     * 璁剧疆鍊�
     * @param key
     * @param value
     * @param expire
     * @param <T>
     * @return
     */
    @Override
    public <T> String set(String key, T value, int expire) {
        Jedis jedis = null;
        String result = null;
        for(int i=0;i<10;i++) {
            try {
                jedis = JedisUtils.getInstance().getJedis();
                result = jedis.setex(key.getBytes(), expire, SerializeUtils.serialize(value));
                JedisUtils.getInstance().closeJedis(jedis);
                break;
            }catch(Exception e){
                String message = e.getMessage();
                if(i==9){
                    e.printStackTrace();
                }
                JedisUtils.getInstance().returnBrokenResource(jedis);
            }
        }
        return result;
    }
    
    

    /**
     * 鑾峰彇鍊�
     * @param key
     * @param clazz
     * @param <T>
     * @return
     */
    @Override
    public <T> T get(String key, Class<T> clazz) {
        Jedis jedis = null;
    	 T result = null;
         for(int i=0;i<10;i++) {
             try {
                 jedis = JedisUtils.getInstance().getJedis();
                 result = (T) SerializeUtils.deserialize(jedis.get(key.getBytes()));
                 JedisUtils.getInstance().closeJedis(jedis);
                 break;
             }catch(Exception e){
                 String message = e.getMessage();
                 if(i==9){
                     e.printStackTrace();
                 }
                 JedisUtils.getInstance().returnBrokenResource(jedis);
             }
         }
         return result;
    }

    /**
     * 鍒犻櫎鍊�
     * @param key
     * @return
     */
    @Override
    public Long delete(String key) {
        Jedis jedis = null;
        jedis = JedisUtils.getInstance().getJedis();
        Long result = jedis.del(key);
        JedisUtils.getInstance().closeJedis(jedis);
        return result;
    }

	@Override
	public <T> Long hset(String key, String field, T value) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		Long result =  jedis.hset(key.getBytes(), field.getBytes(), SerializeUtils.serialize(value));
        JedisUtils.getInstance().closeJedis(jedis);
        return result;
	}


	@Override
	public <T> T hget(String key, String field, Class<T> clazz) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		T result = (T) SerializeUtils.deserialize(jedis.hget(key.getBytes(), field.getBytes()));
		JedisUtils.getInstance().closeJedis(jedis);
		return result;
	}

	@Override
	public <T> Long append(String key, T value) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		Long result = jedis.append(key.getBytes(), SerializeUtils.serialize(value));
		JedisUtils.getInstance().closeJedis(jedis);
		return result;
	}

	@Override
	public <T> T keys(String key, Class<T> clazz) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		T result = (T) jedis.keys(key+"*");
		JedisUtils.getInstance().closeJedis(jedis);
		return result;
	}

	@Override
	public <T> Long sadd(String key, String value) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		Long result = jedis.sadd(key, value);
		JedisUtils.getInstance().closeJedis(jedis);
		return result;
	}

	@Override
	public <T> T smembers(String key, Class<T> clazz) {
        Jedis jedis = null;
		// TODO Auto-generated method stub
		jedis = JedisUtils.getInstance().getJedis();
		T result = (T) jedis.smembers(key);
		JedisUtils.getInstance().closeJedis(jedis);
		return result;
	}


}
