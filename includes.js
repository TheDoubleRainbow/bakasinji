'use strict';

module.exports = {
    newName: function(text) { return check(text, "називай мене", "Називай мене", "отнине я", "мене звать", "Мене звать") },
    botName: function(text) { return check(text, "Сінзі", "Сіндзі", "Бака", "бака", "сінзі", "сіндзі") },
    greeting: function(text) { return check(text, "хай", "Хай", "хааай", "хаай", "Прівет", "прівет", "привет", "прівет", "Ку", "ку", "Шо как", "шо как", "як сам") },
    whatRUDoin: function(text) { return check(text, "шо робиш", "шо ти робиш")},
    whatDoULike: function(text) { return check(text, "шо ти любиш")}
}

function check(text) {
    for(let i = 1; i < arguments.length; i++ ) {
        if(text.includes(arguments[i])) return arguments[i];
    }

    return false;
}
