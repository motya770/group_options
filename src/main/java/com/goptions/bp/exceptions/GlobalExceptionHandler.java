package com.goptions.bp.exceptions;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by matvei on 3/9/15.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private ObjectMapper mapper = new ObjectMapper();

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler
    public
    @ResponseBody
    JsonNode exception(Exception ex) throws IOException {
        logger.error("Error occurred! ", ex);
        String errorCode = "{\"error\": \"" + ex.getClass().getSimpleName() + "\", \"message\" : \"" + ex.getMessage() + "\" }";
        return mapper.readTree(errorCode);
    }
}
