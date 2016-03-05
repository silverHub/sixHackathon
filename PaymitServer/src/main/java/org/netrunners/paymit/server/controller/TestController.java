package org.netrunners.paymit.server.controller;

import org.netrunners.paymit.server.Test.Test;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@RequestMapping(value = "/test.json")
	@ResponseBody
	public Test test() {
		Test test = new Test();
		test.setName("apple");
		test.setPrice(14.5);
		return test;
	}
}
