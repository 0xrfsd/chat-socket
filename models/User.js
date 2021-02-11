import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const USER_TYPES = {
    CONSUMER: 'consumer',
    SUPPORT: 'support'
};

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        firstName: String,
        lastName: String,
        type: String,
    },
    {
        timestamps: true,
        collection: "users",
    }
);

userSchema.statics.createUser = async function (
	firstName, 
    	lastName, 
    	type
) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }

  userSchema.statics.deleteByUserById = async function (id) {
    try {
      const result = await this.remove({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

// We are telling mongoose to create a data structure like this
// {
//	    id: String // will get random string by default thanks to uuidv4
//    	firstName: String,
//    	lastName: String,
//    	type: String // this can be of 2 types consumer/support
// }

// In the second part of the schema we have timestamped and a collection called users
// {
//      timestamps: true,
//      collection: "users",
// }

export default mongoose.moodel("User", userSchema);