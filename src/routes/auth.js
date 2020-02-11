
const express = require('express');
// const {check} = require('express-validator');
const Auth = require('../controllers/auth');
const User = require('../models/user');
// const validate = require('../middlewares/validate');
// const validateRegisterInput = require('../validation/register');
const router = express.Router();
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', (req, res) => {
	// const {errors, isValid} = validateRegisterInput(req.body);
	console.log(req.body)
	//Check Validation
	// if (!isValid) {
	// 	return res.status(400).json(errors);
	// }
	User.findOne({
		email : req.body.email
	}).then((user) => {
		if (user) {
			errors.email = 'Email already exist';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                bio:req.body.bio,
                priceRange:req.body.priceRange,
                logo:req.body.logo,
                mobile:req.body.mobile,
                brandName:req.body.brandName,
				gender: req.body.gender,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						throw err;
					}
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json({status: user.email + ' Registered!!'}))
						.catch((err) => res.status(400).json('Error: ' + err));
					console.log('User added');
				});
			});
		}
	});
});

// router.post("/login", [
//     check('email').isEmail().withMessage('Enter a valid email address'),
//     check('password').not().isEmpty(),
// ], validate, Auth.login);

module.exports = router;