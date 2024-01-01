import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ROLE_ENUM, STATUS } from "src/constants/app.enum";
import { Address, AddressSchema } from "../common/Address.schema";
import * as mongoose from "mongoose";
import { hash, compare } from "bcrypt";

export type UserDocument = User & mongoose.Document;

@Schema({
    collection: 'users'
})
export class User extends mongoose.Document{
    @Prop({
        required: true
    })
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        type: String,
        enum: ROLE_ENUM,
        required: true
    })
    role: ROLE_ENUM;

    @Prop({
        required: true
    })
    refreshToken: string;

    verifyPassword: (password: string) => Promise<boolean>;
}

export const UserModel = SchemaFactory.createForClass(User);

UserModel.pre("save", async function (next){
    const password = this.password;
    const hashedPassword = await hash(password, 10);
    this.password = hashedPassword;
    next();
})

UserModel.methods.verifyPassword = async function(password) : Promise<boolean> {
    const hashedPassword = this.password;
    const isPwdMatched = await compare(password, hashedPassword);
    return !!isPwdMatched;
}

UserModel.set('timestamps', true);
UserModel.set('toJSON', {
    transform: function (doc, obj, opt){
        delete obj['__v'];
        return obj;
    }
})