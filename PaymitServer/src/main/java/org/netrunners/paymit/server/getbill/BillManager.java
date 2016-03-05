package org.netrunners.paymit.server.getbill;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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

	public Bill getBillDetails(String billId) {
		Bill bill = this.jdbcTemplate.queryForObject(
				"select billId, createdTimestamp, ownerId from t_bill where billId = ?", new Object[] { billId },
				new RowMapper<Bill>() {
					public Bill mapRow(ResultSet rs, int rowNum) throws SQLException {
						Bill bill = new Bill();
						bill.setBillId(rs.getString("billId"));
						Timestamp timestamp = rs.getTimestamp("createdTimestamp");
						String formatted = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").format(timestamp);
						bill.setCreatedTimestamp(formatted);
						bill.setOwnerId(rs.getString("ownerId"));
						return bill;
					}
				});

		List<BillItem> billItems = jdbcTemplate.query(SQL, new Object[] { billId }, new BillItemRowMapper());
		bill.setBillItems(billItems);
		return bill;

	}

}
