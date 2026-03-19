import crypto from 'node:crypto'

import { getUsers } from '../services/database/login.js';

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const hashedPassword = crypto
			.createHash('md5')
			.update(password)
			.digest("hex");

		const users = await getUsers();

		const user = users.find(u => u.username === username);

		if (!user) {
			return res.status(401).json({
				error: "Usuario no existe"
			});
		}

		if (user.password !== hashedPassword) {
			return res.status(401).json({
				error: "Password incorrecto"
			});
		}
	
		const isAdmin = user.is_admin === 1;

		res.cookie('isAdmin', isAdmin, {
			httpOnly: true,
			maxAge: 3600000
		});

		return res.json({
			success: true,
			isAdmin: isAdmin
		});

	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Server error"
		});
	}
}
