from loader import *
from database import crud
from view import messages, keyboards

from utils.service_api import get_n_random_words
import asyncio


async def main():
    word = get_n_random_words(1)[0]
    all_users = crud.get_all_users()
    for user in all_users:
        user_id = user.telegram_id
        await bot.send_message(user_id, text=messages.DO_U_REMEMBER.format(word=word["name_origin"]),
                               reply_markup=keyboards.remember_check(word["id"]))


event_loop = asyncio.get_event_loop()
event_loop.run_until_complete(main())
