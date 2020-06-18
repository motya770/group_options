package com.goptions.plat;

import java.math.BigDecimal;

/**
 * Created by matvei on 6/23/15.
 */
public class Test {
    public static void main(String[] args){
        BigDecimal v = new BigDecimal("1.1234");
        BigDecimal result = v.setScale(2, BigDecimal.ROUND_DOWN);

        System.out.println("res: " + result + " "  + System.currentTimeMillis());
    }
}
