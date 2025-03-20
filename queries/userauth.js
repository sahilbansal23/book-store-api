const adduser = `INSERT INTO public.users(
	id, username, hashpass, name, email, phone)
	VALUES ($1, $2, $3, $4, $5, $6);`;
const getUserFromUsername = `SELECT id, username, hashpass, name, email, phone,status
	FROM public.users WHERE username = $1;`;
const getUserFromUserid = ` SELECT id, username, hashpass, name, email, phone,status
	FROM public.users WHERE id = $1; `;
module.exports = {
  adduser,
  getUserFromUsername,
  getUserFromUserid,
};
