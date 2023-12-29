CREATE DATABASE klontong_db;
\c klontong_db;

CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;

CREATE TABLE auth_user (
	user_id BIGSERIAL PRIMARY KEY,
	email VARCHAR (255) UNIQUE NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    name VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE category (
	category_id BIGSERIAL PRIMARY KEY,
	name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE product_meta (
    product_meta_id BIGSERIAL PRIMARY KEY,
    width INT4 NULL,
    height INT4 NULL,
    weight INT4 NULL,
    length INT4 NULL,
    image TEXT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE product (
    product_id BIGSERIAL PRIMARY KEY,
    price BIGINT NOT NULL CHECK (price > 0),
    name VARCHAR (255) NOT NULL,
    description TEXT NULL,
    category_id BIGSERIAL,
    product_meta_id BIGSERIAL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(category_id),
    CONSTRAINT fk_product_meta FOREIGN KEY(product_meta_id) REFERENCES product_meta(product_meta_id)
);
