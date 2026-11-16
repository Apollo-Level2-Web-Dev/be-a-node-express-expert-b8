import { pool } from "../../db";
import bcrypt from "bcryptjs";
const createUserIntoDB = async (payload) => {
    //   console.log(req.body);
    const { name, email, password, age, role } = payload;
    //   console.log(password);
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const result = await pool.query(`
  INSERT INTO users (name,email,password,age,role) VALUES
  ($1,$2,$3,$4,COALESCE($5,'user')) RETURNING * 
    `, [name, email, hashPassword, age, role]);
    // console.log(result);
    delete result.rows[0].password;
    return result;
};
const getAllUsersFromDB = async () => {
    const result = await pool.query(`
    SELECT * FROM users  
      `);
    return result;
};
const getSingleUserFromDB = async (id) => {
    const result = await pool.query(`
    SELECT * FROM users WHERE id=$1  
      `, [id]);
    return result;
};
const updateUserFromDB = async (payload, id) => {
    const { name, password, age, is_Active } = payload;
    const result = await pool.query(`
    UPDATE users 
    SET
    name = COALESCE($1, name),  
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    is_Active = COALESCE($4, is_Active),
    updated_at = NOW() 
    WHERE id=$5 RETURNING *
      `, [name ?? null, password ?? null, age ?? null, is_Active ?? null, id]);
    return result;
};
const deleteUserFromDB = async (id) => {
    const result = await pool.query(`
    DELETE FROM users WHERE id=$1  
      `, [id]);
    return result;
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
};
//# sourceMappingURL=user.service.js.map