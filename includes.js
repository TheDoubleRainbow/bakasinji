'use strict';

module.exports = {
    newName: function(text) { return check(text, "називай мене", "Називай мене", "отнине я") },
    whatsMyName: function(text) { return check(text, "як мене звуть", "яке моє імя", "хто я", "як ти мене називаєш", "як мене звуть")},
    botName: function(text) { return check(text, "Сінзі", "Сіндзі", "Бака", "бака", "сінзі", "сіндзі", "наблюдатель", "наблюдатель ОБСЕ") },
    greeting: function(text) { return check(text, "хай", "Хай", "хааай", "хаай", "Прівет", "прівет", "привет", "прівет", "Ку", "ку", "Шо как", "шо как", "як сам") },
    whatRUDoin: function(text) { return check(text, "шо робиш", "шо ти робиш", "чим занятий", "шо нового", "є шо сказать?")},
    whatDoULike: function(text) { return check(text, "шо ти любиш")},
    showYourself: function(text) { return check(text, "як ти виглядиш", "як ти виглядаєш", "вийди з сумрака", "ти хто", "хто ти")},
    catGirl: function(text) { return check(text, "кошкодевочки", "Кошкодевочки", "Кошкодевочка", "кошкодевочка", "некотянучка", "неко", "некотян", "кошкодевочек", "некотянучки", "некодевочки")},
    football: function(text) { return check(text, "футбол", "футзал", "очко")},
    boomer: function(text) { return check(text, "бумер", "Бумер", "зумер", "думер", "танец", "танцювати", "пляс")},
    topWaifu: function(text) { return check(text, "топ вайфу", "лучша вайфу", "бест вайфу")},
    y2007: function(text) { return check(text, "2007", "2к7")},
    roma: function(text) { return check(text, "Рома", "рома", "футболіст", "футзаліст", "рамен", "роман", "Рамен", "Роман", "ромка", "Ромка")},
}

function check(text) {
    for(let i = 1; i < arguments.length; i++ ) {
        if(text.includes(arguments[i])) return arguments[i];
    }

    return false;
}
