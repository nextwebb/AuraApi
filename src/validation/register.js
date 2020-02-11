const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.bio = !isEmpty(data.bio) ? data.bio : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.logo = !isEmpty(data.logo) ? data.logo : '';
    data.brandName = !isEmpty(data.brandName) ? data.brandName : '';
    data.priceRange = !isEmpty(data.priceRange) ? data.priceRange : '';
    data.mobile = !isEmpty(data.mobile) ? data.mobile : '';


    let subString = 'gmail.com';
    let acct = 'yahoo.com'

	if (!Validator.isLength(data.name, {min: 4, max: 20})) {
		errors.name = 'Name must be between 4 and 15 characters';
	}
	if (Validator.isEmpty(data.lastname)) {
		errors.name = 'Name is required';
	}
	if (!(Validator.isEmail(data.email) && data.email.split('@')[1] === subString || acct)) {
		errors.email = 'Email Domain Invalid';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}
	if (!Validator.isLength(data.password, {min: 8, max: 20})) {
		errors.password = 'Password must be at least 8 characters';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
    }
    if(Validator.isEmpty(data.bio)){
        errors.bio = 'Bio is important'
    }
    if (Validator.isEmpty(data.brandName)) {
		errors.brandName = 'Brand name is neccesary';
    }
    if (Validator.isEmpty(data.priceRange)) {
		errors.priceRange = 'Price range is required';
    }
    if (Validator.isEmpty(data.gender)) {
		errors.gender = 'Gender is required';
    }
    if (Validator.isEmpty(data.logo)) {
		errors.logo= 'Logo is required';
    }
    if (Validator.isEmpty(data.mobile)) {
		errors.mobile = 'Mobile number is required';
	}

	return {
		errors,
		isValid : isEmpty(errors)
	};
};