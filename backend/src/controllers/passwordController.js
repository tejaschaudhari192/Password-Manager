const Password = require('../models/Password');

exports.getPasswords = async (req, res) => {
	// console.log(req.query);
	const userId = req.query.id;

	try {
		const passwords = await Password.find({ userId });
		console.log('sending...');

		return res.status(201).json(passwords);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

exports.getPassword = async (req, res) => {
	const id = req.query.id;
	try {
		const password = await Password.findById(id);
		console.log('sending...');

		return res.status(201).json(password);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
}

exports.setFavorite = async (req, res) => {
	const id = req.query.id;
	const {isFavorite} = req.body;

	console.log(req.body);

	return Password.findByIdAndUpdate(id, { isFavorite:isFavorite })
		.then((result) => {
			return res.status(201).json(result);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		})


}

exports.createPassword = async (req, res) => {
	const { name, site, username, email, password, category, notes, isFavorite } = req.body;
	console.log('adding...');

	try {
		const newPassword = await Password.create({
			userId: req.query.id,
			name,
			site,
			username,
			email,
			password,
			category,
			notes,
			isFavorite,
		});

		return res.status(201).json(newPassword);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ message: error.message });
	}
};


exports.updatePassword = async (req, res) => {
	// console.log(req.body);
	const { id, name, site, username, email, password, category, notes, isFavorite, lastModified } = req.body;
	console.log('updating...');

	return Password.findByIdAndUpdate(id, { name, site, username, email, password, category, notes, isFavorite, lastModified }, { new: true, runValidators: true })
		.then((result) => {
			// console.log(result);
			return res.status(201).json(result);
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
			return res.status(201).json(result);
		})
		.catch((error) => {
			// console.log(error);
			return res.status(500).json({ message: error.message });
		})
}