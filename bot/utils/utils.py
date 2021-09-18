from loader import log
from aiogram import types


async def error_except(user_id: int, error: Exception):
    log.info(f"Ошибка у пользователя {user_id}")
    log.exception(error)


def check_email(message: types.Message):
    if not message.entities:
        return False

    if len(message.entities) != 1:
        return False

    return message.entities[0].type == "email" and len(message.text) == message.entities[0].length
