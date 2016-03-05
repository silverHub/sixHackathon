insert into t_bill (billId) values ('261616136624');
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('261616136624', '261616136624-1', 'Hawaii pizza', 2, 8);
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('261616136624', '261616136624-2', 'Duff beer', 6, 1.5);
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('261616136624', '261616136624-3', 'Some dessert', 1, 4.5);

insert into t_bill (billId) values ('83827217131');
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('83827217131', '83827217131-1', 'Hamburger', 4, 14);
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('83827217131', '83827217131-2', 'Cola', 4, 4);
insert into t_billitems (billId, itemId, itemName, quantity, price) values ('83827217131', '83827217131-3', 'Greek Salad', 2, 8);
insert into t_payments (itemId, clientId, quantity) values ('83827217131-1', '08798765432',2);
insert into t_payments (itemId, clientId, quantity) values ('83827217131-1', '08748576754',1);
insert into t_payments (itemId, clientId, quantity) values ('83827217131-3', '08773838633',1);

