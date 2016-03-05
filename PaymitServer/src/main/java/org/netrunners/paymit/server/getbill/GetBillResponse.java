package org.netrunners.paymit.server.getbill;

public class GetBillResponse {

	private Bill bill;

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	public Bill getBill() {
		return bill;
	}

	@Override
	public String toString() {
		return "GetBillResponse [bill=" + bill + "]";
	}
}
