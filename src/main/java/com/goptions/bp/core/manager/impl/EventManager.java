package com.goptions.bp.core.manager.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.core.manager.IQuoteManager;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.entity.IEntity;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.service.IQuotesService;
import com.goptions.bp.utils.rabbit.RabbitConstants;
import com.rabbitmq.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;

/**
 * Created by matvei on 1/3/15.
 */
public class EventManager implements IEventManager {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IQuoteManager quoteManager;

    @Autowired
    private IQuotesService quotesService;

    @Resource(name = "generalSettings")
    private Map<String, String> generalSettings;

    private Channel channel = null;
    private ConnectionFactory connectionFactory = null;
    private Connection connection = null;
    private ObjectMapper mapper = new ObjectMapper();


    @PostConstruct
    public void init() {
        try {
            connectionFactory = new ConnectionFactory();
            connectionFactory.setAutomaticRecoveryEnabled(true);

            String host = generalSettings.get(RabbitConstants.RABBIT_HOST_CONSTRAINT_NAME);

            log.info("rabbit hos " + host);

            connectionFactory.setHost(host);
            if(!host.equals("localhost")) {
                connectionFactory.setUsername("test");
                connectionFactory.setPassword("test");
            }

            connection = connectionFactory.newConnection();
            channel = connection.createChannel();
            channel.exchangeDeclare(RabbitConstants.EXCHANGE_NAME, "direct");
            String queueName = channel.queueDeclare().getQueue();
            receiveMessage(queueName, "asset");
        } catch (Exception e) {
            log.error("Can't init messaging", e);
        }
    }

    private void receiveMessage(String queueName, String routingKey) {
        log.debug("receiving new quotes 1");
        try {
            channel.queueBind(queueName, RabbitConstants.EXCHANGE_NAME, routingKey);

            channel.basicConsume(queueName, true,
                    new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag,
                                                   Envelope envelope,
                                                   AMQP.BasicProperties properties,
                                                   byte[] body)
                                throws IOException {
                            //String routingKey = envelope.getRoutingKey();
                            //String contentType = properties.getContentType();
                            //long deliveryTag = envelope.getDeliveryTag();
                            String message = new String(body, "UTF-8");

                            String[] parsedMessage = message.split("\\|");


                            // asset|JPMORGAN_CHASE|85|1423756806640

                            //TODO remove this worthless code
                            /*if(parsedMessage[1].equals("EURUSD")) {
                                System.out.println(" [x] Received asset '" + parsedMessage[1] + ": time: '" + new Date(Long.parseLong(parsedMessage[3])) + "'" + message);
                            }*/

                            quoteManager.createCreateQuoteJob(parsedMessage[1],
                                    new BigDecimal(parsedMessage[2]),
                                    Long.parseLong(parsedMessage[3]));

                            //quotesService.create(parsedMessage[1], new BigDecimal(Double.parseDouble(parsedMessage[2])), Long.parseLong(parsedMessage[3]));

                            //System.out.println("message1: " + message);
                            //System.out.println("routingKey2 : " + routingKey);
                        }
                    });
        } catch (Exception e) {
            log.error("Exception writing quote occurred!", e);
        }
    }


    @Override
    public void sendNewQuote(String externalId, BigDecimal value, Long timestamp) {
        try {

            String entity = "asset";
            String message = "asset|" + externalId + "|" + value + "|" + timestamp;

            channel.basicPublish(RabbitConstants.EXCHANGE_NAME, entity, null, message.getBytes());

            /*
            TODO remove this worthless code
            if(externalId.equals("EURUSD")) {
                System.out.println(" [x] Sending asset '" + externalId + ": time: '" + new Date(timestamp) + "'" + message);
            }
            */
        } catch (Exception e) {
            log.error("Error sending... ", e);
        }
    }

    @PreDestroy
    public void destroy() {
        try {
            channel.close();
            connection.close();
        } catch (Exception e) {
            log.error("Error closing ... ", e);
        }
    }

    @Override
    public void receiveNewQuote() {
        //TODO
    }

    /*
    @Override
    public void sendNewQuote(){

    }

    @Override
    public void sendNewOption(){

    }*/

    @Override
    public void sendPositionUpdate(Position position) {
        sendUpdate("position", position);
    }


    @Override
    public void sendOptionUpdate(Option option) {
        //log.debug("sending option update {}", option);
        sendUpdate("option", option);
    }

    @Override
    public void sendAccountUpdate(Account account) {
        sendUpdate("account", account);
    }

    /* @Override
    public void sendNewPosition(Position position){
        sendUpdate("option_new_position", position.getOption().getId(), position);
    }*/

    private void sendUpdate(String entityName, IEntity entity) {
        sendUpdate(entityName, entity.getId(), entity);
    }

    private void sendUpdate(String entityName, Long entityId, IEntity entity) {
        try {

            String message = entityName + "|" + entityId + "|" + mapper.writeValueAsString(entity);
            channel.basicPublish(RabbitConstants.EXCHANGE_NAME, entityName, null, message.getBytes());

            ///log.info("Sending entity {} update: {}", entity.getClass().getSimpleName(), message);
        } catch (Exception e) {
            log.error("Error sending update ... ", e);
        }
    }

}
