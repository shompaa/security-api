import { createUser, findUserById, findUsers, removeUser, editUser } from "../services/index.service.js";


export const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    const search = req.params.search?.toString() || "";
    const {data, total} = await findUsers({ from, limit, search });
    
    res.json({
        status: 200,
        data,
        total,
    });
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await findUserById(id);
    res.json({
        status: 200,
        data: user,
    });
}


export const addUser = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        return res.json({
            status: 200,
            message: 'User created successfully',
            data: user
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await editUser(id, req.body);
        return res.json({
            status: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = await removeUser(id);
        return res.json({
            status: 200,
            message: `${email} deleted successfully`
        });
    } catch (e) {
        next(e);
        return
    }
}