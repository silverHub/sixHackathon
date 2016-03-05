package org.netrunners.paymit.server.getbill;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.Assert;

public class BillManager implements InitializingBean {

	private static final String SQL = "select * from t_billitems where billid = ?";
	private JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void afterPropertiesSet() throws Exception {
		Assert.notNull(jdbcTemplate, "The jdbcTemplate cannot be null");
	}

	public Bill getBill(String billId) throws GetBillException {
		try {
			Bill bill = this.jdbcTemplate.queryForObject(
					"select billId, ownerId, createdTimestamp from t_bill where billId = ?", new Object[] { billId },
					new BillRowMapper());

			List<BillItem> billItems = jdbcTemplate.query(SQL, new Object[] { billId }, new BillItemRowMapper());
			bill.setBillItems(billItems);
			return bill;

		} catch (DataAccessException e) {
			throw new GetBillException("Unable to query the bill details for the " + billId + " identified bill", e);
		}
	}
}
