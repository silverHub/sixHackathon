package org.netrunners.paymit.server.setbillowner;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class SetBillOwnerManager extends JdbcDaoSupport {

	public void setBillOwner(String ownerId, String billId) throws SetBillOwnerException {
		int updated = getJdbcTemplate().update("UPDATE t_bill SET ownerId = ? WHERE billId = ? AND ownerId IS NULL",
				new Object[] { ownerId, billId });
		if (updated != 1)
			throw new SetBillOwnerException(
					"No bill is available with " + billId + " bill identifier or it is already owned by someone");
	}
}
