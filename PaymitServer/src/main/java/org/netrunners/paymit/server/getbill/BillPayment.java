package org.netrunners.paymit.server.getbill;

import java.math.BigDecimal;

public class BillPayment {

	private String clientId;
	private BigDecimal quantity;

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	@Override
	public String toString() {
		return "BillPayment [clientId=" + clientId + ", quantity=" + quantity + "]";
	}
}
