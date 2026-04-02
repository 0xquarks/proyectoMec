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
	
		res.cookie('userId', user.id, {
			httpOnly: true,
			sameSite: 'Strict',
			maxAge: 3600000
		});

		return res.json({
			success: true
		});

	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Server error"
		});
	}
}

export const logout = (req, res) => {
	res.clearCookie('userId');
	res.json({ success: true });
};
