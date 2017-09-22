var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        index: {unique: true}
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 16 characters']
        },
    password_confirm: {
        type: String,
        required: [true, 'Password is required']
    },
}, {timestamps: true });

UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', UserSchema);
