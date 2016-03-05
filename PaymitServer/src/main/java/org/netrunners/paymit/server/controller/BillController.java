package org.netrunners.paymit.server.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;

import org.netrunners.paymit.server.dao.Bill;
import org.netrunners.paymit.server.dao.BillItem;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillController {

	@RequestMapping(value = "/getBillDetails/{billId}")
	@ResponseBody
	public Bill test(@PathVariable String billId) {
		Bill bill = new Bill();
		bill.setBillId("1234");
		bill.setCreatedTimestamp(new Date());
		bill.setOwner("+41781234567");
		bill.setContent(Arrays.asList(getItem(1), getItem(2)));
		return bill;
	}

	private BillItem getItem(int i) {
		BillItem item = new BillItem();
		item.setItemId("1234-" + i);
		item.setItemName("Pizza");
		item.setPrice(new BigDecimal("24.3").setScale(2));
		item.setQuantity(BigDecimal.ONE.setScale(2));
		item.setTotalPrice(new BigDecimal("24.3").setScale(2));
		return item;
	}
}
