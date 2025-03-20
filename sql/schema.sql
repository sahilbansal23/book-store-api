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

