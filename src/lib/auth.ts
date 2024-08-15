import bcrypt from "bcrypt";

async function passwordCheck(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
export { passwordCheck };