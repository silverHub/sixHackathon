package org.netrunners.paymit.server.setbillowner;

import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class SetBillOwnerManager extends JdbcDaoSupport {

	private PlatformTransactionManager transactionManager;

	public void setTransactionManager(PlatformTransactionManager txManager) {
		this.transactionManager = txManager;
	}

	public void setBillOwner(String ownerId, String billId) throws SetBillOwnerException {
		TransactionDefinition txDef = new DefaultTransactionDefinition();
		TransactionStatus txStatus = transactionManager.getTransaction(txDef);
		try {
			doSetBillOwner(ownerId, billId);
			transactionManager.commit(txStatus);
		} catch (SetBillOwnerException e) {
			transactionManager.rollback(txStatus);
			throw e;
		}
	}

	public void doSetBillOwner(String ownerId, String billId) throws SetBillOwnerException {
		int updated = getJdbcTemplate().update("UPDATE t_bill SET ownerId = ? WHERE billId = ? AND ownerId IS NULL",
				new Object[] { ownerId, billId });
		if (updated != 1)
			throw new SetBillOwnerException(
					"No bill is available with " + billId + " bill identifier or it is already owned by someone");
	}
}
