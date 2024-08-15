import { getDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export interface User {
    email: string;
    password: string;
}
export interface UserWithId extends User {
    _id: ObjectId;
}

async function addUser(data: User) {
    const db = await getDatabase();
    const users = db.collection("users");
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
    console.log(data.email,"user created")
    return users.insertOne(data);
}
async function findUserByEmail(email: string) {
    console.log("fstart1")
    const db = await getDatabase();
    console.log("fstart2")

    const desiredUser = await db.collection("users").findOne({ email }) as UserWithId;
    console.log("fstart3")

    if (!desiredUser) {
        return null;
    }

    return desiredUser ;
}
async function updateUser(email: string, data: Partial<User>) {
    const db = await getDatabase();
    const users = db.collection("users");
    return users.updateOne({ email }, { $set: data });
}
async function removeUser(email: string) {
    const db = await getDatabase();
    const users = db.collection("users");
    return users.deleteOne({ email });
}
export { addUser, findUserByEmail, updateUser, removeUser };
