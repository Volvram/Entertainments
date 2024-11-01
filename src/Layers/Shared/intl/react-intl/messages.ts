import { defineMessages } from 'react-intl';

import { ELocales } from '../Locales.types';

export const messages = {
  [ELocales.RUSSIAN]: {
    welcomeToCenterOfAllThings: 'Добро пожаловать в центр всякой всячины',
    error: 'Ошибка',
    somethingWentWrongTryLater: 'Что-то пошло не так, пропробуйте позже',
    jokeUploading: 'Шутка подгружается',
    Update: 'Обновить',
    gettingIpAddressError: 'Ошибка получения данных IP-адреса',
    yourIpAddress: 'Ваш IP-адрес',
    IpAddressDataIsSearched: 'Данные IP-адреса ищутся',
    IpUploading: 'Идет подгрузка IP',
    city: 'Город',
    region: 'Регион',
    country: 'Страна',
    coordinates: 'Координаты',
    organization: 'Организация',
    index: 'Индекс',
    timeZone: 'Часовой пояс',
    moreDetailsAt: 'Подробнее на',
    IP: 'IP',
    find: 'Найти',
    game: 'Игра',
    blackJack: 'Блэк-Джек',
    menu: 'Меню',
    startGame: 'Начать игру',
    startNewGame: 'Начать новую игру',
    continueGame: 'Продолжить игру',
    drawCard: 'Потянуть карту',
    yourScore: 'Ваш счет',
    botScore: 'Счет бота',
    stop: 'Остановиться',
    awaitingForBotMove: 'Ожидание хода бота',
    youWon: 'Вы победили',
    tie: 'Ничья',
    youLost: 'Вы проиграли',
  },
};

export const messagesWithVariables = defineMessages({});
