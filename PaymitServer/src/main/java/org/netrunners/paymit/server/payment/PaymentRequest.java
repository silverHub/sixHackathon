package org.netrunners.paymit.server.payment;

import java.util.List;

public class PaymentRequest {

	private String billId;
	private String clientId;
	private List<PayBillItem> items;
	
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public List<PayBillItem> getItems() {
		return items;
	}
	public void setItems(List<PayBillItem> items) {
		this.items = items;
	}
	
	@Override
	public String toString() {
		return "PaymentRequest [billId=" + billId + ", clientId=" + clientId
				+ ", items=" + items + "]";
	}
	
	
}
