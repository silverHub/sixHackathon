insert into t_bill (billId) values ('123456789');
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-1', 'Hawaii pizza', 2, 8, 16);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-2', 'Duff beer', 6, 1.5, 9);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-3', 'Some dessert', 1, 4.5, 4.5);

insert into t_bill (billId) values ('417265124');
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('417265124', '417265124-1', 'Hamburger', 3, 14, 42);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('417265124', '417265124-2', 'Cola', 4, 2, 8);
insert into t_payments (itemId, clientId, quantity) values ('417265124-1', '08798765432',2);

insert into t_bill (billId) values ('125125263');