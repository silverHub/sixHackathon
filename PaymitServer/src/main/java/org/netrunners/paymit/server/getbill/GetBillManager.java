package org.netrunners.paymit.server.getbill;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.Assert;

public class GetBillManager implements InitializingBean {

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

	private JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void afterPropertiesSet() throws Exception {
		Assert.notNull(jdbcTemplate, "The jdbcTemplate cannot be null");
	}

	public Bill getBill(String billId) throws GetBillException {
		try {
			BillRowCallbackHandler billRowCallbackHandler = new BillRowCallbackHandler();
			jdbcTemplate.query(SQL, billRowCallbackHandler, billId);
			return billRowCallbackHandler.getBill();

		} catch (DataAccessException e) {
			throw new GetBillException("Unable to query the bill details for the " + billId + " identified bill", e);
		}
	}
}
