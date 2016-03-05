package org.netrunners.paymit.server.setbillowner;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.Assert;

public class SetBillOwnerManager {

	private JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void afterPropertiesSet() throws Exception {
		Assert.notNull(jdbcTemplate, "The jdbcTemplate cannot be null");
	}

	public void setBillOwner(String ownerId, String billId) throws SetBillOwnerException {
		int updated = jdbcTemplate.update("UPDATE t_bill SET ownerId = ? WHERE billId = ? AND ownerId IS NULL",
				new Object[] { ownerId, billId });
		if (updated != 1)
			throw new SetBillOwnerException(
					"No bill is available with " + billId + " bill identifier or it is already owned by someone");
	}
}
