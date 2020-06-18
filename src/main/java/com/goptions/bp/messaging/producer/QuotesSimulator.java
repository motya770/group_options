package com.goptions.bp.messaging.producer;

import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.service.IAssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class QuotesSimulator {

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IAssetService assetService;

    public void produce() {
        Thread thread = new Thread() {
            @Override
            public void run() {

                while (true) {
                    //send quotes
                    try {
                        List<Asset> assets = assetService.listAll();
                        assets.parallelStream().forEach((asset) -> {
                            String externalId = asset.getExternalId();

                            BigDecimal value = new BigDecimal(Math.ceil(Math.random() * 100));
                            Integer pipSize = asset.getPipSize();
                            BigDecimal price = value.setScale(pipSize, BigDecimal.ROUND_DOWN);
                            Long timestamp = System.currentTimeMillis();

                            eventManager.sendNewQuote(externalId, price, timestamp);
                        });
                        Thread.sleep(3500);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        thread.start();
    }
}
