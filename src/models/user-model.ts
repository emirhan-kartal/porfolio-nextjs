import { getDatabase } from "@/lib/db";
import { User, UserWithId } from "@/types";
import bcrypt from "bcrypt";

async function addUser(data: User) {
    const db = await getDatabase();
    const users = db.collection("users");
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
    return users.insertOne(data);
}
async function findUserByEmail(email: string) {
    const db = await getDatabase();

    const desiredUser = (await db
        .collection("users")
        .findOne({ email })) as UserWithId;

    if (!desiredUser) {
        return null;
    }

    return desiredUser;
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
