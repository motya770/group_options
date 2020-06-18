package com.goptions.bp.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by matvei on 12/22/14.
 */
public class DateUtils {
    public static final String FULL_DATE_FORMAT = "dd/MM/yyyy HH:mm";
    public static final String FULL_DATE_SECONDS_FORMAT = "dd/MM/yyyy HH:mm:ss";

    public static String format(Long time) {
        return format(time, false);
    }

    private static ThreadLocal<DateFormat> dateFormatter = new ThreadLocal<DateFormat>(){
        @Override
        public DateFormat get() {
            return  new SimpleDateFormat(DateUtils.FULL_DATE_FORMAT);
        }
    };

    public static Date parse(String str) throws ParseException {
        return dateFormatter.get().parse(str);
    }

    public static String format(Long time, boolean seconds) {
        if (time == null) {
            return "";
        }
        DateFormat format  = null;

        if(seconds) {
             format = new SimpleDateFormat(FULL_DATE_SECONDS_FORMAT);
        }else {
             format = new SimpleDateFormat(FULL_DATE_FORMAT);
        }

        String result = format.format(new Date(time));
        return result;
    }
}
