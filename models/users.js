var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var user = new Schema({
  public:{
    email:{
      type: String,
      required: true,
      minLength: 6,
      maxLength: 32,
      validate: /[A-Za-z0-9@.]/,
      unique: true,
    },
    company:{
      type: String,
      required: true,
      minLength: 2,
      maxLength: 32,
      validate: /[A-Za-z0-9@.]/,
      unique: true,
    },
    type:{
    	type: String, 
    	required: true,
    	enum : [ 'company', 'freelancer'],  
    },
    // Connect gvatar, an npm module to do that!
    // gravatar is installed, dependancy is saved
    picture:{
      type: String,
      match: /^http:\/\//i,
    },
  },
  private:{
    password:{
      type: String,
      required: true,
      minLength: 6,
      maxLength: 32,
    },
    role:{
      type: String,
      required: true,
      enum: ['member', 'moderator', 'admin'],
    },
  },
});

// Export the user model
mongoose.model('User', user);