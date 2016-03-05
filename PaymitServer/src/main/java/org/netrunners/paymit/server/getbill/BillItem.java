package org.netrunners.paymit.server.getbill;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

public class BillItem {

	private String itemId;
	private String itemName;
	private BigDecimal quantity;
	private BigDecimal price;
	private List<BillPayment> billPayments = new LinkedList<BillPayment>();

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public BigDecimal getTotalPrice() {
		if (price == null || quantity == null)
			return null;
		return price.multiply(quantity);
	}

	public void addBillPayment(BillPayment billPayment) {
		this.billPayments.add(billPayment);
	}

	public List<BillPayment> getBillPayments() {
		return billPayments;
	}

	@Override
	public String toString() {
		return "BillItem [itemId=" + itemId + ", itemName=" + itemName + ", quantity=" + quantity + ", price=" + price
				+ ", totalPrice=" + getTotalPrice() + ", billPayments=" + billPayments + "]";
	}

}
