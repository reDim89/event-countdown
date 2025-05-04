'use client';

import { useState, useEffect } from 'react';

import CountdownTimer from '../components/CountdownTimer';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };
        expand: () => void;
      };
    };
  }
}

const EVENTS = {
  tbilisi: {
    city: 'Тбилиси',
    date: new Date('2025-07-23T00:00:00+03:00'), // Moscow timezone
  },
  baku: {
    city: 'Баку',
    date: new Date('2025-07-27T00:00:00+03:00'), // Moscow timezone
  },
  stambul: {
    city: 'Стамбул',
    date: new Date('2025-07-30T00:00:00+03:00'), // Moscow timezone
  },
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<'tbilisi' | 'baku'>('tbilisi');

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }    
  }, []);

  const currentEvent = EVENTS[selectedCity];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[url('https://storage.yandexcloud.net/redim/jt_countdown.jpg')] bg-cover bg-center">
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <main className="w-full max-w-4xl space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white">
            Концерты Джастина&nbsp;Тимберлейка<br />
          </h1>
          <p className="text-xl text-gray-300">
            {currentEvent.city}{' – '}
            {currentEvent.date.toLocaleString('ru-RU', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Europe/Moscow'
            })}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value as 'tbilisi' | 'baku')}
              className="w-full px-6 py-3 rounded-lg bg-black/40 border border-white/30 text-lg text-center text-white select-none cursor-pointer focus:outline-none focus:border-white/60 focus-visible:ring-2 focus-visible:ring-white/40 transition-colors"
            >
              <option value="tbilisi" className="bg-gray-900 text-white">Тбилиси</option>
              <option value="baku" className="bg-gray-900 text-white">Баку</option>
              <option value="stambul" className="bg-gray-900 text-white">Стамбул</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
          <CountdownTimer targetDate={currentEvent.date} />
        </div>
      </main>
    </div>
  );
}