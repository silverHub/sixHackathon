package org.netrunners.paymit.server.setbillowner;

public class SetBillOwnerRequest {

	private String billId;
	private String clientId;

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getBillId() {
		return billId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getClientId() {
		return clientId;
	}

	@Override
	public String toString() {
		return "SetBillOwnerRequest [billId=" + billId + ", clientId=" + clientId + "]";
	}
}
