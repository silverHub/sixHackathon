package org.netrunners.paymit.server.payment;

public class CreatePaymentException extends Exception {

	private static final long serialVersionUID = 1L;

	public CreatePaymentException(String message) {
		super(message);
	};

	public CreatePaymentException(String message, Exception cause) {
		super(message, cause);
	};
}
