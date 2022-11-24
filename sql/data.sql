-- Add insert scripts here
insert into client(first_name,last_name,phone_number)
 values('Mxolisi','Tshezi','0763112245');
insert into client(first_name,last_name,phone_number)
 values('Mark','Musk','0114527654');
insert into client(first_name,last_name,phone_number)
 values('Steve','Jobs','0731602587');
insert into client(first_name,last_name,phone_number)
 values('Chris','Hanis','0126729988');
insert into client(first_name,last_name,phone_number)
 values('Juju','Lamela','0767879012');
insert into client(first_name,last_name,phone_number)
 values('Cereal','Butterphosa','0119037845');
insert into client(first_name,last_name,phone_number)
 values('Jakobe','Zama','0312346734');

insert into treatment(type,code,price) 
values('Pedicure','Ped1',175.00);
insert into treatment(type,code,price)
 values('Manicure','Man1',215.00);
insert into treatment(type,code,price)
 values('Make up','Mak1',185.00);
insert into treatment(type,code,price)
 values('Brows & Lashes','brow1',240.00);

insert into stylist(first_name,last_name,phone_number,commission_percentage)
 values('Eskoma','Wafa','0213004444',0.11);
insert into stylist(first_name,last_name,phone_number,commission_percentage) 
values('Politika','Madlala','021400555',0.15);
insert into stylist(first_name,last_name,phone_number,commission_percentage) 
values('Janusa','Walusa','0712345678',0.17);
insert into stylist(first_name,last_name,phone_number,commission_percentage) 
values('Satafrika','Drama','0216728901',0.20);

insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time)
values ('1', '2', '2','24 November 2022', '10:30');
insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time) 
values ('2', '2', '3','24 November 2022', '11:30');
insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time)
values ('2', '2', '3','24 November 2022', '14:30');
insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time)
values ('2', '2', '3','24 November 2022', '15:30');