package org.netrunners.paymit.server.bill;

import java.util.Date;
import java.util.List;

public class Bill {

	private String billId;
	private String owner;
	private String createdTimestamp;
	private List<BillItem> content;
	
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwnerId(String owner) {
		this.owner = owner;
	}
	public String getCreatedTimestamp() {
		return createdTimestamp;
	}
	public void setCreatedTimestamp(String createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}
	public List<BillItem> getContent() {
		return content;
	}
	public void setContent(List<BillItem> content) {
		this.content = content;
	}
	
	
	
}
