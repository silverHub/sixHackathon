package org.netrunners.paymit.server.getbill;

public class GetBillResponse {

	private String status;
	private Bill bill;

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	public Bill getBill() {
		return bill;
	}

	@Override
	public String toString() {
		return "GetBillResponse [status=" + status + ", bill=" + bill + "]";
	}

}
