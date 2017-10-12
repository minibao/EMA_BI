package com.gmtool.util.redis;

import java.io.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * User: karl
 * Date: 2016/7/13
 * Time: 14:10
 */
public class SerializeUtils {
	private static Logger logger = LoggerFactory.getLogger(SerializeUtils.class);
	
	/**
	 * 反序列化
	 * @param bytes
	 * @return
	 */
	public static Object deserialize(byte[] bytes) {
		Object result = null;
		if (isEmpty(bytes)) {
			return null;
		}
		try {
			ByteArrayInputStream byteStream = new ByteArrayInputStream(bytes);
			try {
				ObjectInputStream objectInputStream = new ObjectInputStream(byteStream);
				try {
					result = objectInputStream.readObject();
					objectInputStream.close();
					byteStream.close();
				}
				catch (ClassNotFoundException ex) {
					throw new Exception("Failed to deserialize object type", ex);
				}
			}
			catch (Throwable ex) {
				throw new Exception("Failed to deserialize", ex);
			}
		} catch (Exception e) {
			logger.error("Failed to deserialize",e);
		}
		return result;
	}
	
	public static boolean isEmpty(byte[] data) {
		return (data == null || data.length == 0);
	}

	/**
	 * 序列化
	 * @param object
	 * @return
	 */
	public static byte[] serialize(Object object) {
		byte[] result = null;
		if (object == null) {
			return new byte[0];
		}
		try {
			ByteArrayOutputStream byteStream = new ByteArrayOutputStream(128);
			try  {
				if (!(object instanceof Serializable)) {
					throw new IllegalArgumentException(SerializeUtils.class.getSimpleName() + " requires a Serializable payload " +
							"but received an object of type [" + object.getClass().getName() + "]");
				}
				ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteStream);
				objectOutputStream.writeObject(object);
				objectOutputStream.flush();
				result = byteStream.toByteArray();

				objectOutputStream.close();
				byteStream.close();
			}
			catch (Throwable ex) {
				ex.printStackTrace();
				//throw new Exception("Failed to serialize", ex);
			}
		} catch (Exception ex) {
			logger.error("Failed to serialize",ex);
		}
		return result;
	}

	/**
	 * @return
	 * @throws IOException
	 * @throws UnsupportedEncodingException
	 * @描述 —— 将对象序列化成byte[]
	 */
	public static byte[] getBytesFromObj(Object obj){
		byte[] result = null;
		if (obj == null) {
			return new byte[0];
		}
		try {
			if (!(obj instanceof Serializable)) {
				throw new IllegalArgumentException(SerializeUtils.class.getSimpleName() + " requires a Serializable payload " +
						"but received an object of type [" + obj.getClass().getName() + "]");
			}
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
			objectOutputStream.writeObject(obj);
			objectOutputStream.flush();
			result = byteArrayOutputStream.toByteArray();
			//String serStr = byteArrayOutputStream.toString("ISO-8859-1");
			//serStr = java.net.URLEncoder.encode(serStr, "UTF-8");

			objectOutputStream.close();
			byteArrayOutputStream.close();
		}
		catch (Exception ex) {
			logger.error("Failed to serialize",ex);
		}
		return result;
	}

	/**
	 * @param bytes
	 * @throws UnsupportedEncodingException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @描述 —— 将字符串反序列化成对象
	 */
	public static Object getObjFromBytes(byte[] bytes){
		Object result = null;
		if (isEmpty(bytes)) {
			return null;
		}
		try {
			//String redStr = java.net.URLDecoder.decode(serStr, "UTF-8");
			//ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(redStr.getBytes("ISO-8859-1"));
			ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
			ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayInputStream);
			result = objectInputStream.readObject();

			objectInputStream.close();
			byteArrayInputStream.close();
		} catch (Exception e) {
			logger.error("Failed to deserialize",e);
		}
		return result;
	}
}
