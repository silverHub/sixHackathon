package org.netrunners.paymit.server.payment;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class PaymentManager extends JdbcDaoSupport {

	private static final Logger LOGGER = LoggerFactory.getLogger(PaymentManager.class);

	private PlatformTransactionManager transactionManager;

	public void setTransactionManager(PlatformTransactionManager txManager) {
		this.transactionManager = txManager;
	}

	public PaymentResponse createPayment(PaymentRequest request) throws CreatePaymentException {
		TransactionDefinition txDef = new DefaultTransactionDefinition();
		TransactionStatus txStatus = transactionManager.getTransaction(txDef);
		PaymentResponse paymentResponse;
		try {
			doCreatePayment(request);
			transactionManager.commit(txStatus);
			paymentResponse = new PaymentResponse(request);
			paymentResponse.setStatus("OK");
			return paymentResponse;
		} catch (CreatePaymentException e) {
			paymentResponse = new PaymentResponse();
			transactionManager.rollback(txStatus);
			paymentResponse.setStatus("NOK");
			throw e;
		}
	}

	public void doCreatePayment(PaymentRequest request) throws CreatePaymentException {
		String billId = request.getBillId();
		String clientId = request.getClientId();
		for (PayBillItem item : request.getItems()) {
			String itemId = item.getItemId();
			BigDecimal quantity = item.getQuantity();

			int updated = getJdbcTemplate().update(
					"update t_billitems set paidQuantity = paidQuantity + ? where paidQuantity + ? <= quantity and billId = ? and itemId = ?",
					new Object[] { quantity, quantity, billId, itemId });
			if (updated != 1) {
				throw new CreatePaymentException("Cannot create payment because increasing paidQuantity with "
						+ quantity + " failed for itemId " + itemId);
			} else {
				LOGGER.info("Paidquantity has been updated by {} for itemId = {}", quantity, itemId);
			}

			int inserted = getJdbcTemplate().update(
					"insert into t_payments (itemid, clientId, quantity) values (?,?,?)",
					new Object[] { itemId, clientId, quantity });
			if (inserted != 1) {
				throw new CreatePaymentException(
						"Cannot create payment because saving payment caused a problem for itemid: " + itemId);
			} else {
				LOGGER.info("New payment has been created for {} in item {} with {} quantity", clientId, itemId,
						quantity);
			}
		}

	}

}
