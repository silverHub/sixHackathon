package org.netrunners.paymit.server.getbill;

import java.util.LinkedList;
import java.util.List;

public class Bill {

	private String billId;
	private String ownerId;
	private List<BillItem> billItems = new LinkedList<BillItem>();

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getBillId() {
		return billId;
	}

	public void setOwnerId(String owner) {
		this.ownerId = owner;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void addBillItem(BillItem billItem) {
		this.billItems.add(billItem);
	}

	public List<BillItem> getBillItems() {
		return billItems;
	}

	@Override
	public String toString() {
		return "Bill [billId=" + billId + ", ownerId=" + ownerId + ", billItems=" + billItems + "]";
	}

}
