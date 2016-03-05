package org.netrunners.paymit.server.setbillowner;

public class SetBillOwnerException extends Exception {

	private static final long serialVersionUID = 1L;

	public SetBillOwnerException(String message) {
		super(message);
	};

	public SetBillOwnerException(String message, Exception cause) {
		super(message, cause);
	};
}
