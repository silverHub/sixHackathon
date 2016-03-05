package org.netrunners.paymit.server.getbill;

public class GetBillRequest {

	private String billId;

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getBillId() {
		return billId;
	}

	@Override
	public String toString() {
		return "GetBillRequest [billId=" + billId + "]";
	}
}
