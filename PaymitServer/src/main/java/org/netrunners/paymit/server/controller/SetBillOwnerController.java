package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.setbillowner.SetBillOwnerException;
import org.netrunners.paymit.server.setbillowner.SetBillOwnerManager;
import org.netrunners.paymit.server.setbillowner.SetBillOwnerRequest;
import org.netrunners.paymit.server.setbillowner.SetBillOwnerResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SetBillOwnerController {

	private Logger logger = LoggerFactory.getLogger(SetBillOwnerController.class);

	@Autowired
	private SetBillOwnerManager setBillOwnerManager;

	@RequestMapping(value = "/setBillOwner.json", method = RequestMethod.POST)
	@ResponseBody
	public SetBillOwnerResponse setBillOwner(@RequestBody SetBillOwnerRequest request) {
		logger.info("Setting owner of {} bill to {} client", request.getBillId(), request.getClientId());
		SetBillOwnerResponse response = new SetBillOwnerResponse();
		try {
			setBillOwnerManager.setBillOwner(request.getClientId(), request.getBillId());
			response.setStatus("OK");
		} catch (SetBillOwnerException e) {
			logger.error("Unexpected error occurred during setting bill owner", e);
			response.setStatus("NOK");
		}
		return response;
	}
}
