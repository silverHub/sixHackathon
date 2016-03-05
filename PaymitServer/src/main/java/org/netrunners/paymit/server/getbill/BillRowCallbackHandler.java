package org.netrunners.paymit.server.getbill;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowCallbackHandler;

public class BillRowCallbackHandler implements RowCallbackHandler {

	private Bill bill;
	private BillItem currentBillItem;

	public void processRow(ResultSet rs) throws SQLException {
		// Bill
		if (bill == null) {
			bill = new Bill();
			bill.setBillId(rs.getString("b.billId"));
			bill.setOwnerId(rs.getString("b.ownerId"));
		}

		// BillItem
		String itemId = rs.getString("i.itemId");
		if (itemId == null) {
			return;
		}
		if (currentBillItem == null || !itemId.equals(currentBillItem.getItemId())) {
			currentBillItem = new BillItem();
			currentBillItem.setItemId(itemId);
			currentBillItem.setItemName(rs.getString("i.itemName"));
			currentBillItem.setQuantity(rs.getBigDecimal("i.quantity"));
			currentBillItem.setPrice(rs.getBigDecimal("i.price"));
			bill.addBillItem(currentBillItem);
		}

		// BillPayment
		String clientId = rs.getString("p.clientId");
		BigDecimal quantity = rs.getBigDecimal("p.quantity");
		if (clientId == null || quantity == null) {
			return;
		}
		BillPayment billPayment = new BillPayment();
		billPayment.setClientId(clientId);
		billPayment.setQuantity(quantity);
		currentBillItem.addBillPayment(billPayment);
	}

	public Bill getBill() {
		return bill;
	}
}
