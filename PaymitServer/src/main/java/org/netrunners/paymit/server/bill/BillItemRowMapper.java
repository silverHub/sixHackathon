package org.netrunners.paymit.server.bill;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

public class BillItemRowMapper implements RowMapper<BillItem>  {

	public BillItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		BillItem item = new BillItem();
		item.setItemId(rs.getString(2));
		item.setItemName(rs.getString(3));
		item.setQuantity(rs.getBigDecimal(4));
		item.setPrice(rs.getBigDecimal(5));
		item.setTotalPrice(rs.getBigDecimal(6));
		return item;
	}

}
