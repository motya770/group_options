package com.goptions.bp.utils;

import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by matvei on 3/23/15.
 */
public class JspHelper {

    private static UrlPathHelper urlPathHelper = new UrlPathHelper();

    public static String getCurrentUrl(HttpServletRequest request) {
        return urlPathHelper.getOriginatingRequestUri(request);
    }
}
