package org.netrunners.paymit.server.payment;

import java.math.BigDecimal;

public class PayBillItem {

	private String itemId;
	private BigDecimal quantity;
	
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public BigDecimal getQuantity() {
		return quantity;
	}
	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}
	
	@Override
	public String toString() {
		return "PayBillItem [itemId=" + itemId + ", quantity=" + quantity + "]";
	}
	
	
}
