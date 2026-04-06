import Joi from 'joi'
import AppError from '../utils/AppError.js'

// Схема валидации для регистрации
const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
})

// Схема валидации для входа
const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
})

// Возвращает middleware, который валидирует тело запроса по переданной схеме
export function validate(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body)
		if (error) {
			return next(new AppError(error.details[0].message, 400))
		}
		next()
	}
}

export { registerSchema, loginSchema }
