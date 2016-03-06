package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.payment.CreatePaymentException;
import org.netrunners.paymit.server.payment.PaymentManager;
import org.netrunners.paymit.server.payment.PaymentRequest;
import org.netrunners.paymit.server.payment.PaymentResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PayController {

	private Logger logger = LoggerFactory.getLogger(PayController.class);
	
	@Autowired
	private PaymentManager paymentManager;

	@RequestMapping(value = "/pay.json", method = RequestMethod.POST)
	@ResponseBody
	public PaymentResponse pay(@RequestBody PaymentRequest request) {
		logger.info("Creating payment", request);
		PaymentResponse response;
		try{
			response = paymentManager.createPayment(request);
			logger.info("Pay was successful: {}", response);
		} catch (CreatePaymentException e) {
			logger.error("Unexpected error occurred during setting bill owner", e);
			response = new PaymentResponse();
			response.setStatus("NOK");
		}
		return response;
	}
}
