package org.netrunners.paymit.server.dao;

import java.util.Date;
import java.util.List;

public class Bill {

	private String billId;
	private String owner;
	private Date createdTimestamp;
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
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}
	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}
	public List<BillItem> getContent() {
		return content;
	}
	public void setContent(List<BillItem> content) {
		this.content = content;
	}
	
	
	
}
