package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.getbill.Bill;
import org.netrunners.paymit.server.getbill.BillManager;
import org.netrunners.paymit.server.getbill.GetBillException;
import org.netrunners.paymit.server.getbill.GetBillRequest;
import org.netrunners.paymit.server.getbill.GetBillResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetBillController {

	private Logger logger = LoggerFactory.getLogger(GetBillController.class);

	@Autowired
	private BillManager billManager;

	@RequestMapping(value = "/getBill.json", method = RequestMethod.POST)
	@ResponseBody
	public GetBillResponse getBill(@RequestBody GetBillRequest request) {
		logger.info("Getting bill with {} identifier", request.getBillId());
		GetBillResponse response = new GetBillResponse();
		try {
			Bill bill = billManager.getBill(request.getBillId());
			response.setBill(bill);
			response.setStatus("OK");

		} catch (GetBillException e) {
			logger.error("Unexpected error occurred during getting bill", e);
			response.setStatus("NOK");
		}

		return response;
	}
}
