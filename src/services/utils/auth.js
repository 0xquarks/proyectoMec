import { getUserById } from "../database/login.js";

export const isAdminMiddleware = async (req, res, next) => {
	try {
		const userId = req.cookies.userId;

		if (!userId) {
			return res.redirect('/login');
		}

		const user = await getUserById(userId);

		if (!user || user.is_admin !== 1) {
			return res.redirect('/login')
		}

		next();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Error en middleware' })
	}
};

