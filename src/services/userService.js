import {
	getAllUsers as getAllUsersModel,
	findUserById,
} from '../models/user.model.js'

// Возвращает список всех пользователей
export async function getAllUsers() {
	return getAllUsersModel()
}

// Возвращает пользователя по id или null
export async function getUserById(id) {
	return findUserById(id)
}
