
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    name: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        max: 100
    },

    bio: {
        type: String,
        required: true
    },

    mobile:{
        type: Number,
        max: 14,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    logo:{
        type: String,
        required: true
    },
    brandName:{
        type: String,
        required: true
    },
    priceRange:{
        type: Number,
        required: true
    },
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        name: this.name,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Users', UserSchema);