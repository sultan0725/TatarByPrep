from random import choice

from aiogram import types

from database import crud
from loader import dp, bot
from states.states import User
from utils import switchers, service_api
from aiogram.dispatcher import FSMContext

from view import messages, keyboards, buttons


async def switch_to_repeat(message: types.Message, state: FSMContext):
    await User.CHOOSE_CATEGORY.set()
    await message.answer(messages.REPEATS_RULES, reply_markup=keyboards.back)
    await message.answer(messages.CHOOSE_CATEGORY, reply_markup=keyboards.all_categories())


@dp.callback_query_handler(state=User.CHOOSE_CATEGORY, text_contains="lern")
async def delete_order_callback(query: types.CallbackQuery, state: FSMContext):
    category_id = int(query.data.split("_")[-1])
    async with state.proxy() as data:
        data["category"] = category_id
        data['repits'] = 1
        data["key_words"] = list(map(lambda x: x["id"], service_api.get_all_words_in_category(category_id)))
        data["correct_check"] = [0 for i in range(len(data["key_words"]))]
    await send_question(query.message, state)


async def send_question(message: types.Message, state: FSMContext, is_new=True):
    data = await state.get_data()
    if sum(data["correct_check"]) >= len(data["key_words"]) * data["repits"]:
        await message.answer(
            "Поздравляю, вы выучили все данной категории! При желании вы можете пройти эту категорию еще раз или попробовать свои силы в другой категории")
        await switchers.main_menu(message, state)
        return
    if is_new:
        data["q_id"] = choice(data["key_words"])
        while data["correct_check"][data["q_id"] - 1] >= data["repits"]:
            data["q_id"] = choice(data["key_words"])
        data["flag"] = True
    await state.set_data(data)
    await message.answer(service_api.get_word(data["q_id"])["name_origin"], reply_markup=keyboards.lern_keyboard)
    await User.WAIT_FOR_ANSWER_FOR_TEST.set()


@dp.message_handler(state=User.WAIT_FOR_ANSWER_FOR_TEST)
async def set_number(message: types.Message, state: FSMContext):
    data = await state.get_data()
    answer = message.text
    if message.text == buttons.break_lern:
        await message.answer(f"Вы запомнили "
                             f"{sum(list(map(lambda x: 1 if x > 0 else 0, data['correct_check'])))} из "
                             f"{len(data['correct_check'])} слов")
        await switchers.main_menu(message, state)
        return

    word = service_api.get_word(data["q_id"])
    if message.text == buttons.skip:
        if data["flag"]:
            if data["correct_check"][data["key_words"].index(data["q_id"])] <= 0:
                data["correct_check"][data["key_words"].index(data["q_id"])] -= 1
            else:
                data["correct_check"][data["key_words"].index(data["q_id"])] = 0
        await message.answer("ОТВЕТ: " + word["name_rus"])
        data["flag"] = False
        await state.set_data(data)
        await send_question(message, state, False)
        return

    if word["name_rus"].strip(" ").lower() == answer.strip(" ").lower():
        if data["flag"]:
            data["correct_check"][data["q_id"] - 1] += 1
        temp_res = sum(data["correct_check"].copy())
        target = len(data["key_words"]) * data["repits"]
        if temp_res < 0:
            # минус потому что отрицательное число
            target -= temp_res
            temp_res = 0
        await message.answer(
            f"ВЕРНО! \n{target - temp_res} из {target} осталось")
        await state.set_data(data)
        await send_question(message, state)
    else:
        if data["flag"]:
            if data["correct_check"][data["key_words"].index(data["q_id"])] <= 0:
                data["correct_check"][data["key_words"].index(data["q_id"])] -= 1
            else:
                data["correct_check"][data["key_words"].index(data["q_id"])] = 0
        await message.answer("НЕВЕРНО! ПРАВИЛЬНЫЙ ОТВЕТ: " + word["name_rus"])
        data["flag"] = False
        await state.set_data(data)
        await send_question(message, state, False)
