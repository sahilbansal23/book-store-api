
# ATMS

Develop a simplified bookstore API that allows users to browse books, add books to a cart, and place
orders. The system should support user authentication and authorization.


## Tech Stack

**Server:** Node, Express

**Database:** postgreSQL


## Dependecies


**pino-pretty:** For better logging and error logging

**ulid:** To generate the unique ids

**jsonwebtoken:** To create the signed authentication token 

**bcrypt:** to safely store the user password



## Run Locally

To deploy this project run

- STEP 1
```bash
  git clone https://github.com/sahilbansal23/ATMS.git
```

- STEP 2
Install the Dependencies
```bash
  npm install
```
- STEP 3
create environment file
```bash
touch .env
vi .env 

#add variable 

DBUSER= [YOUR DATABASE USER]
DBHOST = [YOUR HOST URL]
DB = [YOUR DATABASE NAME]
DBPASSWORD =[YOUR DATABASE PASSWORD]
DBPORT = [YOUR DATABASE PORT]
PORT = [YOUR SERVER PORT]
JWT_SECRET = [YOUR JWT SECRET KEY]
```

- STEP 4
Crate your database
```bash
CREATE TABLE public.users
(
    id character varying NOT NULL,
    username character varying,
    hashpass character varying,
    name character varying,
    email character varying,
    phone character varying,
    PRIMARY KEY (id)
);
CREATE TABLE public.books
(
    id character varying NOT NULL,
    title character varying,
    author character varying,
    price character varying,
    "desc" character varying,
    status boolean,
    PRIMARY KEY (id)
);

CREATE TABLE public.carts
(
    id character varying NOT NULL,
    user_id character varying,
    created_at bigint,
    updated_at bigint,
    PRIMARY KEY (id)
);

CREATE TABLE public.cart_items
(
    id character varying NOT NULL,
    cart_id character varying NOT NULL,
    book_id character varying NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (id, quantity)
);
CREATE TABLE public.orders
(
    id character varying NOT NULL,
    order_no character varying,
    user_id character varying,
    created_at bigint,
    updated_at bigint,
    status boolean,
    remark character varying,
    PRIMARY KEY (id)
);
CREATE TABLE public.order_items
(
    id character varying NOT NULL,
    book_id character varying NOT NULL,
    order_id character varying NOT NULL,
    rate double precision,
    qty integer,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.cart_items
    ADD FOREIGN KEY (book_id)
    REFERENCES public.books (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    NOT VALID;

ALTER TABLE IF EXISTS public.carts
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    NOT VALID;
ALTER TABLE IF EXISTS public.order_items
    ADD FOREIGN KEY (book_id)
    REFERENCES public.books (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    NOT VALID;

ALTER TABLE IF EXISTS public.order_items
    ADD FOREIGN KEY (order_id)
    REFERENCES public.orders (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    NOT VALID;
ALTER TABLE IF EXISTS public.orders
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT
    NOT VALID;
```

## Screenshot
 ERD Diagram
[App Screenshot](https://drive.google.com/file/d/1BN97jLqbmOLvtJL59GB0nQlVjE41jxfO/view?usp=sharing)


- STEP 5
Create Sample books Data
```bash
Copy the script from sql/samplebook.sql
```

- STEP 6
Start your Backend Server
```bash
npm start
```


## Features


- Implemented logging for API requests and errors.
- use bcrypt to safely store the user password
- Use JWT (JSON Web Tokens) for authentication. 
- proper error handling for each api with proper response status

## Author

- [@sahilbansal23](https://www.linkedin.com/in/sahilbansal23/)

