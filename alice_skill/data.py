facts = [
    """Татарский известен многочисленными диалектами, в которых выделяют два или три основных (иногда пять) в зависимости от классификации:
средний (казанский);
западный (мишерский);
восточный (сибирский).
Восточный разделяется на тоболо-иртышский, барабинский и томский. Тоболо-иртышский – в свою очередь ещё на несколько диалектов. Смешанные диалекты: астраханский, касимовский, тептярский и уральский. Диалекты характеризуются значительными особенностями, которые можно определить по фонетическому строю.
""",
    """Письменный татарский развился в 19 веке, ранние его формы находились под влиянием чагатайского (или староузбекского). До 1927 года письменность была арабской, затем на латинице, с 1939 года – на кириллице. Официальный алфавит основан на кириллице с некоторыми дополнительными буквами. Однако в случаях, когда он не имеет официального статуса, использование латиницы или кириллицы зависит от предпочтений автора.""",
    """Татарский язык развивался на основе как родственных, так и неродственных языков Приволжья и Предуралья. Большое влияние на него оказали марийский, мордовский, удмуртский, арабский, персидский, русский.""",
    """По лексике наиболее близкие к татарскому: башкирский, ногайский, каракалпакский, казахский, балкарский, узбекский, уйгурский и кумыкский. Лингвистический аспект: схожесть татарского и башкирского почти на 95% обусловлено историческими причинами (некоторые различия в фонетике и грамматике).""",
    """Раннее сохранившееся литературное наследие татарского языка датируется 13 веком, Сказание о Юсуфе (Кысса-и Йусуф), поэта Волжской Булгарии Кул Гали. Поэма, написана на языке, который объединяет элементы булгарского и кипчакского.""",
    """Габдулла Тукай считается отцом современного татарского языка. День рождения народного поэта, 26 апреля, сегодня является Днем татарского языка. Стихотворение Тукая «Родной язык» – неофициальный гимн республики.""",
    """Выдающимся исследователем татарского языка и его диалектов был советский ученый Габдулхай Хурамович Ахатов – лингвист, тюрколог. Основатель ряда научных учреждений, в числе которых татарская диалектологическая и фразеологическая школа. Первым в тюркологии дал теоретически последовательное описание идиоматических выражений волжско-татарского. Хотя Габдулхай Хурамович был волжским татарином, он тщательно изучал фонетические особенности сибирского татарского."""
]

excess = [
    {"question": ["көз", "кыш", "гыйнвар", "җәй"], "answer": "гыйнвар", "id": 1},
    {"question": ["кыз", "курчак", "малай", "әни"], "answer": "курчак", "id": 2},
    {"question": ["тәлинкә", "кәстрүл", "урындык", "чәйнек"], "answer": "урындык", "id": 3},
    {"question": ["гөлчәчәк", "төлке", "кыңгырау", "лалә"], "answer": "төлке", "id": 4},
    {"question": ["тавык", "сыер", "сарык", "ат"], "answer": "тавык", "id": 5},
    {"question": ["букча", "китап", "дәфтәр", "блоклык"], "answer": "портфель", "id": 6},
    {"question": ["чыпчык", "карлыгач", "карга", "шөпшә"], "answer": "шөпшә", "id": 7},
    {"question": ["сөт", "чәй", "су", "икмәк"], "answer": "икмәк", "id": 8},
    {"question": ["карбыз", "кара", "кура", "алма"], "answer": "алма", "id": 9},
    {"question": ["туп", "даирә", "тартма", "баш"], "answer": "тартма", "id": 10}
]

proverb = [
    {"question": "Авызың кыек булса,", "choice": ["көзгегә үпкәләмә", "көзгегә түгел", "син гаепле түгел", "башы да кыек"], "answer": "көзгегә үпкәләмә", "id": 1, "meaning":""},
    {"question": "Ил төкерсә,", "choice": ["күл була", "шәргә берни дә юк", "барысы да мөмкин", "гел сугышалар"], "answer": "күл була", "id": 2},
    {"question": "Туган җирне сакларга кирәк", "choice": ["аны яратып кына булмый", "җимерергә түгел", "һәм үсәргә кирәк", "һәм АКШка китмәскә"], "answer": "аны яратып кына булмый", "id": 3},
    {"question": "Гомер итү - ", "choice": ["кырны узу гына түгел.", "күпсанлы вакыйгалар сайлау", "гаилә булу һәм бәхетле булу", "улын үстерергә һәм агач утыртырга"], "answer": "кырны узу гына түгел.", "id": 4},
    {"question": "Зирәклек туганнан ук бирелми,", "choice": ["кибеттән сатып алына", "тәҗрибә белән барлыкка килә", "укудан алына", "аны тәрбияләргә кирәк."], "answer": "аны тәрбияләргә кирәк.", "id": 5},
    {"question": "Әгәр кочерга озын икән,", "choice": ["димәк, авыр", "начар мастер ясаган, аны", "мич зур", "кулларны яндырмыйсың"], "answer": "кулларны яндырмыйсың", "id": 6},
    {"question": " Ул эшли - эшли,", "choice": ["ә барысы да ул ялкау, диләр.", "ә арттыру юк", "ә акча юк", "ә бурычлары арта бара"], "answer": "ә бурычлары арта бара", "id": 7},
    {"question": "Эшли белсәң,", "choice": ["дөрес тәрбия", "ял итә беләсең", "эшләмәсәң тагын да җиңелрәк", "эшләргә дә ансат"], "answer": "эшләргә дә ансат", "id": 8},
    {"question": "Ашап тормыйм,", "choice": ["чөнки постны тотам", "әмма продуктларны өйгә алып кайтам", "ә эчәм", "акчалата гына алам"], "answer": "акчалата гына алам", "id": 9},
    {"question": "Я үләсең,", "choice": ["әмма күрәм бала", "яки йоклыйсың", "яки яшисең", "я каласың"], "answer": "я каласың", "id": 10}
]
