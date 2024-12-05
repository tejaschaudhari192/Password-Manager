const Password = require('../models/Password');

exports.getPasswords = async (req, res) => {
	console.log('sending...');

	try {
		const passwords = await Password.find({ userId: req.user.id });
		res.json(passwords);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createPassword = async (req, res) => {
	const { _id, name, site, username, email, password, category, notes, isFavorite } = req.body;
	console.log('adding...');

	try {
		const newPassword = await Password.create({
			userId: req.user.id,
			name,
			site,
			username,
			email,
			password,
			category,
			notes,
			isFavorite,
		});

		res.status(201).json(newPassword);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


exports.updatePassword = async (req, res) => {
	// console.log(req.body);
	const { id, name, site, username, email, password, category, notes, isFavorite } = req.body;
	console.log('updating...');

	const updatedPassword = Password.findByIdAndUpdate(id, { name, site, username, email, password, category, notes, isFavorite }, { new: true, runValidators: true })
		.then((result) => {
			// console.log(result);
			return res.status(201);
		})
		.catch((error) => {
			// console.log(error);
			return res.status(500).json({ message: error.message });
		})
}

exports.deletePassword = async (req, res) => {
	const { id } = req.query;
	console.log('deleting...');

	return Password.findByIdAndDelete(id)
		.then((result) => {
			// console.log(result);
			return res.status(201);
		})
		.catch((error) => {
			// console.log(error);
			return res.status(500).json({ message: error.message });
		})
}