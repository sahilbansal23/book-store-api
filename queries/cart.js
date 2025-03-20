const userCart = `SELECT 
 cart.id as cart_id,
 ci.id as cart_item_id,
 ci.book_id as book_id,
 ci.quantity as qty,
 bk.title as title,
 bk.author as author,
 bk.desc as dessc
 FROM 
 	public.carts cart
JOIN 
 public.cart_items ci ON ci.cart_id = cart.id
JOIN 
 public.books bk ON ci.book_id = bk.id
WHERE 
	cart.user_id = $1;`;

const getcart = `SELECT id, user_id, created_at, updated_at
	FROM public.carts WHERE user_id = $1`;
const addBok = `INSERT INTO public.cart_items(
	id, cart_id, book_id, quantity)
	VALUES ($1, $2, $3, $4);`;

const deleteCartItem = `DELETE FROM public.cart_items
	WHERE id = $1`
const createCart = `INSERT INTO public.carts(
	id, user_id, created_at, updated_at)
	VALUES ($1, $2, $3, $4);`
module.exports = {
  userCart,
  getcart,
  addBok,
  deleteCartItem,
  createCart
};
