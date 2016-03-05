package org.netrunners.paymit.server.getbill;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class GetBillManager extends JdbcDaoSupport {

	private static final String SQL;

	static {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append(
				"SELECT b.billId, b.ownerId, i.itemId, i.itemName, i.quantity, i.price, p.clientId, p.quantity ");
		stringBuilder.append("FROM t_bill b ");
		stringBuilder.append("LEFT OUTER JOIN t_billitems i ON b.billId = i.billId ");
		stringBuilder.append("LEFT OUTER JOIN t_payments p ON i.itemId = p.itemId ");
		stringBuilder.append("WHERE b.billId = ? ");
		stringBuilder.append("ORDER BY b.billId, i.itemId, p.itemId");
		SQL = stringBuilder.toString();
	}

	public Bill getBill(String billId) throws GetBillException {
		try {
			BillRowCallbackHandler billRowCallbackHandler = new BillRowCallbackHandler();
			getJdbcTemplate().query(SQL, billRowCallbackHandler, billId);
			return billRowCallbackHandler.getBill();

		} catch (DataAccessException e) {
			throw new GetBillException("Unable to query the bill details for the " + billId + " identified bill", e);
		}
	}
}
