from aiogram import types

from database import crud
from loader import dp, bot
from states.states import User
from utils import switchers, service_api
from aiogram.dispatcher import FSMContext

from view import messages, keyboards, buttons


@dp.callback_query_handler(state="*", text_contains="remember")
async def delete_order_callback(query: types.CallbackQuery, state: FSMContext):
    if state == User.SEND_TRASLATIONS:
        return
    word_id = int(query.data.split("_")[-1])

    async with state.proxy() as data:
        data["current_word"] = word_id
        data["message_id"] = query.message.message_id
    await User.SEND_TRASLATIONS.set()
    await query.message.answer(messages.SEND_TRASLATIONS, reply_markup=keyboards.back)


@dp.message_handler(state=User.SEND_TRASLATIONS, content_types=["text"])
async def check_is_correct(message: types.Message, state: FSMContext):
    if message.text == buttons.back:
        await switchers.main_menu(message, state)
        return
    async with state.proxy() as data:
        word = service_api.get_word(data["current_word"])
        if word["word_rus"] == message.text:
            await message.answer(messages.CORRECT)
            await switchers.main_menu(message, state)

        else:
            category_name = service_api.get_category(word["group_id"])["name_origin"]
            await message.answer(messages.WRONG.format(word=word["word_rus"], category_name=category_name))
            await switchers.main_menu(message, state)

        await bot.edit_message_reply_markup(message.from_user.id, data["message_id"], reply_markup=None)
