package com.gmtool.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.gmtool.util.Const;
import com.gmtool.util.Logger;
/**
 * 

* @version 1.0
 */
public class WebAppContextListener implements ServletContextListener {
    protected Logger logger = Logger.getLogger(this.getClass());
    
    private static WebApplicationContext springContext;

	public void contextDestroyed(ServletContextEvent event) {
	}

	public void contextInitialized(ServletContextEvent event) {
		springContext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
	}
	
	public static ApplicationContext getApplicationContext() {
        return springContext;
    }


}
