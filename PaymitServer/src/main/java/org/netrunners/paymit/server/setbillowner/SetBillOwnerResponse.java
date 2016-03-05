package org.netrunners.paymit.server.setbillowner;

public class SetBillOwnerResponse {

	private String status;

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	@Override
	public String toString() {
		return "SetBillOwnerResponse [status=" + status + "]";
	}

}
