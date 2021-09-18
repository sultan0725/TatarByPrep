from aiogram import types

from database import crud
from loader import dp
from utils import switchers
from aiogram.dispatcher import FSMContext


@dp.message_handler(commands=["state"], state="*")
async def start(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        print(data)


@dp.message_handler(commands=["start"], state="*")
async def start(message: types.Message, state: FSMContext):
    user = crud.get_user(user_id=message.from_user.id)

    if not user:
        crud.add_user(user_id=message.from_user.id)
        async with state.proxy() as data:
            data["language"] = 0

    await switchers.main_menu(message, state)
