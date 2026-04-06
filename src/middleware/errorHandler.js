// Глобальный обработчик ошибок: различает операционные и непредвиденные ошибки
const errorHandler = (err, req, res, next) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		})
	}

	console.error('Необработанная ошибка:', err)
	res.status(500).json({
		status: 'error',
		message: 'Что-то пошло не так. Пожалуйста, попробуйте позже.',
	})
}

export default errorHandler
