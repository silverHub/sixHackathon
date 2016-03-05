package org.netrunners.paymit.server.dao;

import java.util.Date;
import java.util.List;

public class Bill {

	private String billId;
	private String primaryId;
	private Date cratedTimestamp;
	private List<BillItem> content;
	
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getPrimaryId() {
		return primaryId;
	}
	public void setPrimaryId(String primaryId) {
		this.primaryId = primaryId;
	}
	public Date getCratedTimestamp() {
		return cratedTimestamp;
	}
	public void setCratedTimestamp(Date cratedTimestamp) {
		this.cratedTimestamp = cratedTimestamp;
	}
	public List<BillItem> getContent() {
		return content;
	}
	public void setContent(List<BillItem> content) {
		this.content = content;
	}
	
	
	
}
