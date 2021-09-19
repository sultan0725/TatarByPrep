from states.states import User
from aiogram import types
from view import messages
from aiogram.dispatcher import FSMContext
from view import buttons, keyboards


async def main_menu(message: types.Message, state: FSMContext):
    await User.MAIN_MENU.set()
    await message.answer(
        text=messages.MAIN_MENU,
        reply_markup=keyboards.main_menu_kb)
