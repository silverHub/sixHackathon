package org.netrunners.paymit.server.getbill;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.springframework.jdbc.core.RowMapper;

public class BillRowMapper implements RowMapper<Bill> {

	public Bill mapRow(ResultSet rs, int rowNum) throws SQLException {
		Bill bill = new Bill();
		bill.setBillId(rs.getString("billId"));
		Timestamp timestamp = rs.getTimestamp("createdTimestamp");
		String formatted = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").format(timestamp);
		bill.setCreatedTimestamp(formatted);
		bill.setOwnerId(rs.getString("ownerId"));
		return bill;
	}

}
