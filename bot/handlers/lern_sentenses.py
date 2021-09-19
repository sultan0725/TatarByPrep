from random import choice

from aiogram import types

from database import crud, data
from loader import dp, bot
from states.states import User
from utils import switchers, service_api
from aiogram.dispatcher import FSMContext

from view import messages, keyboards, buttons


async def switch_to_sentences(message: types.Message, state: FSMContext):
    await User.TRANSLATE_SENTENSE.set()
    await message.answer(messages.SENTANSES_RULES, reply_markup=keyboards.lern_keyboard)
    await send_question(message, state)


async def send_question(message: types.Message, state: FSMContext, category=None):
    async with state.proxy() as fsm_data:
        fsm_data["category"] = category if category else choice(list(data.sentinses.keys()))
        fsm_data["sentinse"] = choice(list(data.sentinses[fsm_data["category"]].keys()))
    await message.answer(data.sentinses[fsm_data["category"]][fsm_data["sentinse"]]["tat"])


@dp.message_handler(state=User.TRANSLATE_SENTENSE)
async def set_number(message: types.Message, state: FSMContext):
    fsm_data = await state.get_data()
    answer = message.text
    if message.text == buttons.break_lern:
        await switchers.main_menu(message, state)
        return

    if message.text == buttons.skip:
        await message.answer("ответ: <b>" + data.sentinses[fsm_data["category"]][fsm_data["sentinse"]]["rus"] +
                             f"</b>\n Вам стоит повторить тему: <i>{fsm_data['category']}</i>")
        await state.set_data(fsm_data)
        await send_question(message, state, fsm_data["category"])
        return

    if data.sentinses[fsm_data["category"]][fsm_data["sentinse"]]["rus"].strip(" ").lower() == answer.strip(
            " ").lower():
        await message.answer("Правильно!")
        await state.set_data(fsm_data)
        await send_question(message, state)
    else:
        await message.answer(
            "Неправильно! правильный ответ: <b>" + data.sentinses[fsm_data["category"]][fsm_data["sentinse"]]["rus"] +
            f"</b>\n Вам стоит повторить тему: <i>{fsm_data['category']}</i>")
        await state.set_data(fsm_data)
        await send_question(message, state, fsm_data["category"])
