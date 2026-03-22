export type VoiceResult = {
  text: string;
  response: string;
  isOffline: boolean;
};

const OFFLINE_COMMANDS: { pattern: RegExp; response: string }[] = [
  { pattern: /активир|броня|доспех/i, response: 'Активирую броню, сэр. Все сегменты зафиксированы. Реактор на 100%.' },
  { pattern: /диагностик|статус систем/i, response: 'Диагностика завершена. Все системы в норме. Реактор: стабилен. Броня: целостность 100%.' },
  { pattern: /запуст|реактор/i, response: 'Реактор на дуговой технологии запущен. Мощность: 3 гигаджоуля. Готов к работе, сэр.' },
  { pattern: /сканир|угроз|анализ/i, response: 'Сканирование завершено. Угроз в радиусе 500 метров не обнаружено. Небо чисто.' },
  { pattern: /маршрут|навигац|куда/i, response: 'Прокладываю оптимальный маршрут. Расчётное время прибытия — 4 минуты.' },
  { pattern: /взлёт|полёт|лети/i, response: 'Включаю реактивные двигатели. Взлёт разрешён. Приятного полёта, сэр.' },
  { pattern: /посад|приземл/i, response: 'Выполняю посадочную последовательность. Стабилизаторы активированы.' },
  { pattern: /пеппер|потts|связь/i, response: 'Устанавливаю защищённый канал связи с мисс Поттс. Одну секунду, сэр.' },
  { pattern: /шифр|засекреч|защит/i, response: 'Канал зашифрован протоколом АЕС-256. Прослушивание невозможно.' },
  { pattern: /репульс|оружи|пушк/i, response: 'Репульсоры заряжены до 100%. Цель захвачена. Жду команды, сэр.' },
  { pattern: /бастион|протокол/i, response: 'Протокол "Бастион" активирован. Все системы переведены в режим максимальной защиты.' },
  { pattern: /время|час|сколько/i, response: `Текущее время: ${new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}, сэр.` },
  { pattern: /дат|число|сегодня/i, response: `Сегодня ${new Date().toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}, сэр.` },
  { pattern: /привет|здравств|добр/i, response: 'Добрый день, сэр. Все системы в норме. Чем могу помочь?' },
  { pattern: /спасибо|благодар/i, response: 'Всегда к вашим услугам, сэр.' },
  { pattern: /стоп|отмен|хватит/i, response: 'Выполнение прервано. Все системы переведены в режим ожидания.' },
  { pattern: /энерги|заряд|батаре/i, response: 'Уровень заряда реактора: 94%. Запаса хватит на 12 часов активной работы.' },
  { pattern: /темп|погод/i, response: 'Для получения данных о погоде требуется подключение к сети, сэр.' },
  { pattern: /музык|песн|трек/i, response: 'Запускаю музыкальную библиотеку. AC/DC — Back in Black. Отличный выбор, сэр.' },
  { pattern: /ярк|экран|дисплей/i, response: 'Регулирую яркость дисплея до оптимального уровня.' },
];

function getOfflineResponse(text: string): string {
  for (const cmd of OFFLINE_COMMANDS) {
    if (cmd.pattern.test(text)) return cmd.response;
  }
  return `Команда "${text}" принята. Офлайн-режим: выполнение локальной обработки. Для расширенных возможностей подключите сеть, сэр.`;
}

export class VoiceEngine {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis = window.speechSynthesis;
  private onResult: (result: VoiceResult) => void;
  private onStateChange: (listening: boolean) => void;
  private isListening = false;

  constructor(
    onResult: (result: VoiceResult) => void,
    onStateChange: (listening: boolean) => void,
  ) {
    this.onResult = onResult;
    this.onStateChange = onStateChange;
    this.initRecognition();
  }

  private initRecognition() {
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition })
        .webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = 'ru-RU';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const isOnline = navigator.onLine;
      const response = getOfflineResponse(text);
      this.onResult({ text, response, isOffline: !isOnline });
      this.speak(response);
      this.isListening = false;
      this.onStateChange(false);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onStateChange(false);
    };

    this.recognition.onerror = () => {
      this.isListening = false;
      this.onStateChange(false);
    };
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  toggle() {
    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (!this.recognition || this.isListening) return;
    this.isListening = true;
    this.onStateChange(true);
    this.recognition.start();
  }

  stop() {
    if (!this.recognition || !this.isListening) return;
    this.recognition.stop();
    this.isListening = false;
    this.onStateChange(false);
  }

  speak(text: string) {
    if (!this.synthesis) return;
    this.synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.95;
    utterance.pitch = 0.85;
    this.synthesis.speak(utterance);
  }

  processText(text: string): VoiceResult {
    const isOnline = navigator.onLine;
    const response = getOfflineResponse(text);
    this.speak(response);
    return { text, response, isOffline: !isOnline };
  }
}
