drop table t_billitems;
drop table t_bill;

create table t_bill
(
	billId				varchar(20) primary key,
	ownerId				varchar(256),
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
