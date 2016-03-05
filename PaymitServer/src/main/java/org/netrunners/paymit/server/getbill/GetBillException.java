package org.netrunners.paymit.server.getbill;

public class GetBillException extends Exception {

	private static final long serialVersionUID = 1L;

	public GetBillException(String message) {
		super(message);
	};

	public GetBillException(String message, Exception cause) {
		super(message, cause);
	};
}
