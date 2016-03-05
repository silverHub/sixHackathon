package org.netrunners.paymit.server.getbill;

import java.util.List;

public class Bill {

	private String billId;
	private String ownerId;
	private String createdTimestamp;
	private List<BillItem> billItems;

	public String getBillId() {
		return billId;
	}

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String owner) {
		this.ownerId = owner;
	}

	public String getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(String createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public List<BillItem> getBillItems() {
		return billItems;
	}

	public void setBillItems(List<BillItem> billItems) {
		this.billItems = billItems;
	}
}
