from states.states import User
from aiogram import types
from view import messages
from aiogram.dispatcher import FSMContext
from view import buttons, keyboards


async def main_menu(message: types.Message, state: FSMContext):
    await User.MAIN_MENU.set()
    async with state.proxy() as data:
        if "language" not in data.keys():
            data["language"] = 0
        text = messages.MAIN_MENU.format(translator={
            0: buttons.from_russian_to_tatar,
            1: buttons.from_tatar_to_russian
        }[data["language"]])
        print("text")
        kb = keyboards.main_menu_kb(data["language"])
        print("kb")
        await message.answer(
            text=text,
            reply_markup=kb)
