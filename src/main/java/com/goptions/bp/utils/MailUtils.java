package com.goptions.bp.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.StringTokenizer;

/**
 * Created by matvei on 6/29/15.
 *
 * copy paste from http://stackoverflow.com/questions/4521557/automatically-convert-style-sheets-to-inline-style
 *
 */
public class MailUtils {

    public static String inlineCss(String html){

        final String style = "style";

        // Document doc = Jsoup.connect("http://mypage.com/inlineme.php").get();
        Document doc = Jsoup.parse(html);
        Elements els = doc.select(style);// to get all the style elements
        for (Element e : els) {
            String styleRules = e.getAllElements().get(0).data().replaceAll(
                    "\n", "").trim(), delims = "{}";
            StringTokenizer st = new StringTokenizer(styleRules, delims);
            while (st.countTokens() > 1) {
                String selector = st.nextToken(), properties = st.nextToken();
                Elements selectedElements = doc.select(selector);
                for (Element selElem : selectedElements) {
                    String oldProperties = selElem.attr(style);
                    selElem.attr(style,
                            oldProperties.length() > 0 ? concatenateProperties(
                                    oldProperties, properties) : properties);
                }
            }
            e.remove();
        }
        System.out.println(doc);// now we have the result html without the
        // styles tags, and the inline css in each
        // element
        return doc.toString();
    }

    private static String concatenateProperties(String oldProp, String newProp) {
        oldProp = oldProp.trim();
        if (!newProp.endsWith(";"))
            newProp += ";";
        return newProp + oldProp; // The existing (old) properties should take precedence.
    }
}
