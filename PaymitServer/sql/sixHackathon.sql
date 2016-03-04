drop table t_billitems;
drop table t_bill;


create table t_bill
(
	billId				varchar(20) primary key,
	primaryId			varchar(256),
    state               char(1),
    createdTimestamp	timestamp DEFAULT CURRENT_TIMESTAMP
);
 
 create table t_billitems
 (
	billId				varchar(20) , FOREIGN KEY (billId) REFERENCES t_bill (billId) ON UPDATE CASCADE ON DELETE RESTRICT,
    itemId				varchar(20) primary key,
    itemName			varchar(256) not null,
    quantity			numeric(15,2) not null,
    price				numeric(15,2) not null,
	totalPrice			numeric(15,2) not null
 );
 
insert into t_bill (billId) values ('123456789');
insert into t_bill (billId) values ('417265124');
insert into t_bill (billId) values ('125125263');

insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-1', 'Hawaii pizza', 2, 8, 16);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-2', 'Duff beer', 6, 1.5, 9);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('123456789', '123456789-3', 'Some dessert', 1, 4.5, 4.5);

insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('417265124', '417265124-1', 'Hamburger', 3, 14, 42);
insert into t_billitems (billId, itemId, itemName, quantity, price, totalPrice) values ('417265124', '417265124-2', 'Cola', 4, 2, 8);