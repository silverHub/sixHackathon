package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.bill.Bill;
import org.netrunners.paymit.server.bill.BillManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillController {

	@Autowired
	private BillManager billManager;
	
	@RequestMapping(value = "/getBillDetails/{billId}")
	@ResponseBody
	public Bill test(@PathVariable String billId) {
		Bill bill = billManager.getBillDetails(billId);
		return bill;
	}

}
