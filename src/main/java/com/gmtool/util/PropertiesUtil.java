package com.gmtool.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
/**
 * 读取config.properties配置
 * @Author zxl
 */
public class PropertiesUtil {

	private static Properties properties = new Properties();
	static {
		InputStream in = PropertiesUtil.class.getResourceAsStream("/url.properties");
		try {
			properties.load(in); 
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
    public static String get(String key) {  
    	return properties.getProperty(key).trim();
    }  
    
    public static Properties loadConfig(String path) {
		Properties p = new Properties();
		InputStream in = null;
		try {
			ClassLoader cl = PropertiesUtil.class.getClassLoader();
			if (cl != null) {
				in = cl.getResourceAsStream(path);
			} else {
				in = ClassLoader.getSystemResourceAsStream(path);
			}
			p.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != in) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return p;
	}
}
