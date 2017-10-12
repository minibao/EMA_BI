package com.gmtool.util;

import java.math.BigDecimal;

/**
 * Created by Leon on 2017/6/30.
 */
public class NumberUtils {

    public static double getDouble(Object num,int n) {
        double result = 0;
        if (num instanceof Integer) {
            Integer integer = (Integer) num;
            result =  integer.doubleValue();
        }
        if (num instanceof BigDecimal) {
            BigDecimal bigDecimal = (BigDecimal) num;
            result =  bigDecimal.setScale(n, BigDecimal.ROUND_HALF_UP).doubleValue();
        }
        if (num instanceof Double) {
            Double doublen = (Double) num;
            double t = Math.pow(10,n);
            result =  ((int)(doublen*t))/t;
        }
        return result;
    }

    public static double getPercent(double num) {
        return ((int)(num*10000))*1.0/100;
    }
}
