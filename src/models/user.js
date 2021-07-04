const mongoose = require('mongoose');
const validator = require('validator');
const assert = require('assert')
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate(value) {
            if (!/^[a-zA-Z\s]+$/i.test(value)) {
                throw new Error('only letters!');
            }
        }
    },
    age: {
        type: Number,
        min: [18, 'must be 18 - at list , got {VALUE} instead '],
        max: 99,
        default: 18,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        immutable:true,
        unique:true,
        validate(value) {
            assert.strictEqual(validator.isEmail(value), true);
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            assert.notStrictEqual(value, 'password')
        }

    },

    

})

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch) throw new Error('Incorrect password!  ')
    console.log(user)
    return user;
}


// Hash password before save/update
userSchema.pre('save',async function(next){
    console.log('pre user schema')
    user = this ;
    if (this.isModified('password')) {
        const val =  await saltNhash(user.password);
        user.password = val ;
    }
    next();
})


async function saltNhash(value)  {
    try{
    const salt = await bcrypt.genSalt()
    const hashValue = await bcrypt.hash(value,salt)
    
    return hashValue ;
    }  catch(err){
        console.log(err)
    }
}

const User = mongoose.model('User',userSchema);

module.exports= User ;






