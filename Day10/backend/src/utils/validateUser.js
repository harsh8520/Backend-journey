import userModel from "../models/userModel.js";

export const userExists = async (userId) => {
    const user = await userModel.findById(userId)

    return user
}
