package com.gmtool.util;


import net.sf.json.JSONObject;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.params.HttpMethodParams;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


public class Utility {
	
	public static String getUrlParamsByMap(Map<String, Object> map) {  
	    if (map == null) {  
	        return "";  
	    }  
	    map.remove("mid");
	    StringBuffer sb = new StringBuffer();  
	    for (Map.Entry<String, Object> entry : map.entrySet()) {  
			sb.append(entry.getKey() + "=" + entry.getValue().toString());
		    sb.append("&");  

	    }  
	    String s = sb.toString();  
	    if (s.endsWith("&")) {  
	        s = org.apache.commons.lang.StringUtils.substringBeforeLast(s, "&");  
	    }  
	    return s;  
	}  
	
	   public static String MD5(String str, String charset) throws Exception {
	        System.out.println("Before MD5: " + str);
	        MessageDigest md = MessageDigest.getInstance("MD5");
	        md.update(str.getBytes(charset));
	        byte[] result = md.digest();
	        StringBuffer sb = new StringBuffer(32);
	        for (int i = 0; i < result.length; i++) {
	            int val = result[i] & 0xff;
	            if (val <= 0xf) {
	                sb.append("0");
	            }
	            sb.append(Integer.toHexString(val));
	        }

	        System.out.println("Atfer MD5: " + sb.toString().toLowerCase());
	        return sb.toString().toLowerCase();
	    }

	    /**
	     * base64
	     * @param str 
	     * @param charset 
	     * @throws UnsupportedEncodingException
	     */
	    /*public static String base64(String str, String charset) throws UnsupportedEncodingException{
	        System.out.println("Before Base64: " + str);
	        System.out.println("Before Base64 and charset: " + str);
	        String encoded = Base64Encoder.encode(str.getBytes(charset));

	        System.out.println("After Base64: " + encoded);
	        return encoded;
	    }*/

	    public static String urlEncoder(String str, String charset) throws UnsupportedEncodingException{
	        String result = URLEncoder.encode(str, charset);
	        return result;
	    }



	    public static String sendGet(String strurl) {
	        System.out.println("sendGet: " + strurl);

	        String result = "";
	        HttpClient httpClient = new HttpClient();

	        //用get方法发送http请求
	        GetMethod get = new GetMethod(strurl);

	        try {
	            if (HttpStatus.SC_OK == httpClient.executeMethod(get)) {
	                result = get.getResponseBodyAsString();
	                System.out.println("response: " + result);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }


	        //System.out.println("Response Data: " + result.toString());
	        return result.toString();
	    }

	  
	    
	    @SuppressWarnings("deprecation")
	    public static String sendPost(String url, String postData) {
	        System.out.println("sendPost --- url: " + url);
	        System.out.println("sendPost --- postData: " + postData);
            StringBuffer result = new StringBuffer(); 

	        HttpClient httpClient =new HttpClient();

	        httpClient.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

	        List<Header> headers = new ArrayList<Header>();
	        headers.add(new Header("User-Agent", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)"));
	        headers.add(new Header("server", "ema-bi"));
	        httpClient.getHostConfiguration().getParams().setParameter("http.default-headers", headers);

	        PostMethod postMethod = new PostMethod(url);


	        if (postData.contains("=")) {
	            String[] sList=postData.split("&");//以","为分隔符，截取上面的字符串。结果为三段

	            for(int i=0;i<sList.length;i++){
	                try {
	                    if (sList[i].split("=").length > 1) {
	                        postMethod.addParameter(sList[i].split("=")[0], sList[i].split("=")[1]);
	                    }
	                    else {
	                        postMethod.addParameter(sList[i].split("=")[0], "");
	                    }
	                } catch (IllegalArgumentException e) {
	                    // TODO Auto-generated catch block
	                    e.printStackTrace();
	                }
	            }
	            System.out.println("----------------------------------------------");
	            NameValuePair[] pairs = postMethod.getParameters();
	            for (int j=0;j<pairs.length;j++)
	            {
	                System.out.println(pairs[j].getName() + "=" + pairs[j].getValue());
	            }

	        }
	        else {
	            StringRequestEntity requestEntity;
	            try {
					requestEntity = new StringRequestEntity(postData,
							"application/x-www-form-urlencoded", "UTF-8");
	                postMethod.setRequestEntity(requestEntity);
	            } catch (UnsupportedEncodingException e) {
	                // TODO Auto-generated catch block
	                e.printStackTrace();
	            }

	        }

	        try {
	            if (HttpStatus.SC_OK == httpClient.executeMethod(postMethod)) {
	                InputStream inputStream = postMethod.getResponseBodyAsStream();
	                BufferedReader br = new BufferedReader(new InputStreamReader(inputStream,"UTF-8"));
	                String str= "";  
	                while((str = br.readLine()) != null){
						result .append(str);
	                }  
	               // System.out.println("response: " + result);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        } finally {
	            postMethod.releaseConnection();

	        }
	        return result.toString();
	    }






	    @SuppressWarnings("deprecation")
	    public static String sendPostJSON(String url, String postData) {
	        System.out.println("sendPost --- url: " + url);
	        System.out.println("sendPost --- postData: " + postData);
	        String result = "";

	        HttpClient httpClient =new HttpClient();

	        httpClient.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");

	        List<Header> headers = new ArrayList<Header>();
	        headers.add(new Header("User-Agent", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)"));

	        httpClient.getHostConfiguration().getParams().setParameter("http.default-headers", headers);

	        PostMethod postMethod = new PostMethod(url);



	        if (postData.length() > 1) {

	            // 将json字符串转换成jsonObject
	            JSONObject jsonObject = JSONObject.fromObject(postData);
	            Iterator it = jsonObject.keys();
	            // 遍历jsonObject数据，添加到Map对象
	            while (it.hasNext())
	            {
	                String key = String.valueOf(it.next());
	                String value = (String) jsonObject.get(key);
	                postMethod.addParameter(key, value);
	            }

	        }
	        else {
	            StringRequestEntity requestEntity;
	            try {
	                requestEntity = new StringRequestEntity(postData,
	                        "application/x-www-formurlencoded", "UTF-8");
	                postMethod.setRequestEntity(requestEntity);
	            } catch (UnsupportedEncodingException e) {
	                // TODO Auto-generated catch block
	                e.printStackTrace();
	            }

	        }

	        try {
	            if (HttpStatus.SC_OK == httpClient.executeMethod(postMethod)) {
	                result = postMethod.getResponseBodyAsString();
	                System.out.println("response: " + result);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }


	        return result.toString();
	    }

	    /**
	     * 单位缩进字符串。
	     */
	    private static String SPACE = "   ";

	    /**
	     * 返回格式化JSON字符串。
	     *
	     * @param json 未格式化的JSON字符串。
	     * @return 格式化的JSON字符串。
	     */
	    public static String formatJson(String json)
	    {
	        StringBuffer result = new StringBuffer();

	        int length = json.length();
	        int number = 0;
	        char key = 0;

	        //遍历输入字符串。
	        for (int i = 0; i < length; i++)
	        {
	            //1、获取当前字符。
	            key = json.charAt(i);

	            //2、如果当前字符是前方括号、前花括号做如下处理：
	            if((key == '[') || (key == '{') )
	            {
	                //（1）如果前面还有字符，并且字符为“：”，打印：换行和缩进字符字符串。
	                if((i - 1 > 0) && (json.charAt(i - 1) == ':'))
	                {
	                    result.append('\n');
	                    result.append(indent(number));
	                }

	                //（2）打印：当前字符。
	                result.append(key);

	                //（3）前方括号、前花括号，的后面必须换行。打印：换行。
	                result.append('\n');

	                //（4）每出现一次前方括号、前花括号；缩进次数增加一次。打印：新行缩进。
	                number++;
	                result.append(indent(number));

	                //（5）进行下一次循环。
	                continue;
	            }

	            //3、如果当前字符是后方括号、后花括号做如下处理：
	            if((key == ']') || (key == '}') )
	            {
	                //（1）后方括号、后花括号，的前面必须换行。打印：换行。
	                result.append('\n');

	                //（2）每出现一次后方括号、后花括号；缩进次数减少一次。打印：缩进。
	                number--;
	                result.append(indent(number));

	                //（3）打印：当前字符。
	                result.append(key);

	                //（4）如果当前字符后面还有字符，并且字符不为“，”，打印：换行。
	                if(((i + 1) < length) && (json.charAt(i + 1) != ','))
	                {
	                    result.append('\n');
	                }

	                //（5）继续下一次循环。
	                continue;
	            }

	            //4、如果当前字符是逗号。逗号后面换行，并缩进，不改变缩进次数。
	            if((key == ','))
	            {
	                result.append(key);
	                result.append('\n');
	                result.append(indent(number));
	                continue;
	            }

	            //5、打印：当前字符。
	            result.append(key);
	        }

	        return result.toString();
	    }

	    /**
	     * 返回指定次数的缩进字符串。每一次缩进三个空格，即SPACE。
	     *
	     * @param number 缩进次数。
	     * @return 指定缩进次数的字符串。
	     */
	    private static String indent(int number)
	    {
	        StringBuffer result = new StringBuffer();
	        for(int i = 0; i < number; i++)
	        {
	            result.append(SPACE);
	        }
	        return result.toString();
	    }

	    /**
	     * 将json格式的字符串解析成Map对象 <li>
	     * json格式：{"name":"admin","retries":"3fff","testname"
	     * :"ddd","testretries":"fffffffff"}
	     */
	    private static HashMap<String, String> toHashMap(Object object)
	    {
	        HashMap<String, String> data = new HashMap<String, String>();
	        // 将json字符串转换成jsonObject
	        JSONObject jsonObject = JSONObject.fromObject(object);
	        Iterator it = jsonObject.keys();
	        // 遍历jsonObject数据，添加到Map对象
	        while (it.hasNext())
	        {
	            String key = String.valueOf(it.next());
	            String value = (String) jsonObject.get(key);
	            data.put(key, value);
	        }
	        return data;
	    }

}
