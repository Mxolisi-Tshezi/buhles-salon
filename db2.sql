-- Table create scripts here
CREATE TABLE client(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE treatment(
    id SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    code VARCHAR(4) NOT NULL,
    price VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE stylist(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    commission_percentage numeric (3,2)
);

CREATE TABLE booking(
    id SERIAL NOT NULL PRIMARY KEY,
    bookind_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    client_id integer not null,
    foreign key (client_id) references client(id),
    treatment_id integer not null,
    foreign key (treatment_id) references treatment(id),
    stylist_id integer not null,
    foreign key (stylist_id) references stylist(id)  
);