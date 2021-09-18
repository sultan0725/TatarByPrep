from aiogram import types

from loader import dp
from states.states import User
from aiogram.dispatcher import FSMContext
from view import buttons, messages, keyboards
from utils import tatarby_api


@dp.message_handler(state=User.MAIN_MENU, content_types=['text'])
async def main_menu(message: types.Message, state: FSMContext):
    if message.text == buttons.from_tatar_to_russian:
        async with state.proxy() as data:
            data["language"] = 1

        return await message.answer(
            text=messages.MAIN_MENU.format(translator={
                0: buttons.from_russian_to_tatar,
                1: buttons.from_tatar_to_russian
            }[data["language"]]),
            reply_markup=keyboards.main_menu_kb(data["language"]))

    if message.text == buttons.from_russian_to_tatar:
        async with state.proxy() as data:
            data["language"] = 0

        return await message.answer(
            text=messages.MAIN_MENU.format(translator={
                0: buttons.from_russian_to_tatar,
                1: buttons.from_tatar_to_russian
            }[data["language"]]),
            reply_markup=keyboards.main_menu_kb(data["language"]))

    async with state.proxy() as data:
        # Если ввели одно слово
        if len(message.text.split()) != 1:
            text = message.text + " - " + tatarby_api.translate_phrase(phrase=message.text, language=data["language"])
            await message.answer(
                text=text)
        else:
            answer = tatarby_api.translate_word(word=message.text, language=data["language"])
            print(answer)
            text = messages.TRANSLATED_WORD_SNIPPET.format(
                word_from_user=message.text,
                word_from_api=answer["translation"]
            )

            if answer["examples"]:
                print(answer["examples"])
                text += messages.EXAMPLES.format(
                    examples=" ".join(answer["examples"])
                )

            await message.answer(text=text)
