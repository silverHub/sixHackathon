package org.netrunners.paymit.server.payment;

import java.util.List;

public class PaymentResponse {
	
	private String status;
	private String billId;
	private String clientId;
	private List<PayBillItem> items;

	public PaymentResponse() {
	}
	
	public PaymentResponse(PaymentRequest request){
		this.billId = request.getBillId();
		this.clientId = request.getClientId();
		this.items = request.getItems();
	}
	
	
	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

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
		return "PaymentResponse [status=" + status + ", billId=" + billId
				+ ", clientId=" + clientId + ", items=" + items + "]";
	}
	
	

}
