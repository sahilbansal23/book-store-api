const orderList = `SELECT id, order_no, user_id, created_at, updated_at, status, remark
	FROM public.orders WHERE user_id = $1 ORDER BY created_at DESC`;

const orderDetails = `
SELECT
    o.id AS order_id,
    o.order_no,
    o.user_id,
    o.created_at,
    o.updated_at,
    o.status AS order_status,
    o.remark,
    oi.id AS order_item_id,
    oi.book_id,
    oi.rate,
    oi.qty,
    b.title AS book_title,
    b.author AS book_author,
    b.price AS book_price,
    b."desc" AS book_description
FROM
    orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN books b ON oi.book_id = b.id
WHERE
    o.id = $1;
`;
const addOrder = `INSERT INTO public.orders(
	id, order_no, user_id, created_at, updated_at, status, remark)
	VALUES ($1, $2, $3, $4, $5, $6, $7);`;
const addOrderItem = `INSERT INTO public.order_items(
	id, book_id, order_id, rate, qty)
	VALUES ($1, $2, $3, $4, $5);`;
module.exports = {
  orderList,
  orderDetails,
  addOrder,
  addOrderItem,
};
