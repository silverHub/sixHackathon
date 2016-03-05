package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.setbillowner.SetBillOwnerRequest;
import org.netrunners.paymit.server.setbillowner.SetBillOwnerResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SetBillOwnerController {

	@RequestMapping(value = "/setBillOwner.json", method = RequestMethod.POST)
	@ResponseBody
	public SetBillOwnerResponse setBillOwner(@RequestBody SetBillOwnerRequest request) {
		SetBillOwnerResponse response = new SetBillOwnerResponse();
		response.setStatus("OK");
		return response;
	}
}
