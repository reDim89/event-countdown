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
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          button_color: string;
          button_text_color: string;
        };
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
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<'tbilisi' | 'baku'>('tbilisi');
  const [themeParams, setThemeParams] = useState({
    bg_color: '#131313',
    button_color: '#4667fb',
    button_text_color: 'white',
    text_color: 'white',
    hint_color: 'rgba(255, 255, 255, 0.8)',
  });

  useEffect(() => {
    // Initialize Telegram WebApp and set theme parameters
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      if (window.Telegram.WebApp.themeParams) {
        setThemeParams(window.Telegram.WebApp.themeParams);
      }
    }
  }, []); // We don't need themeParams in dependencies as it's only used for fallback

  const currentEvent = EVENTS[selectedCity];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[url('https://imagedelivery.net/gW1GbbOAwqUR1gYscngw2Q/b457ddb9-f720-4698-4fc4-d1459cff8600/public')] bg-cover bg-center">
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1
            className="text-3xl sm:text-6xl font-bold tracking-tight"
            style={{ color: themeParams.text_color }}
          >
            Концерты Джастина&nbsp;Тимберлейка<br />в Тбилиси и Баку
          </h1>
          <p className="text-xl" style={{ color: themeParams.hint_color }}>
            {currentEvent.city}:{' '}
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
              className="appearance-none w-full px-6 py-3 pr-10 rounded-lg bg-black/20 border border-white/20 focus:outline-none focus:border-white/40 text-lg text-center"
              style={{ color: themeParams.text_color }}
            >
              <option value="tbilisi">Тбилиси</option>
              <option value="baku">Баку</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
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

        <div className="bg-black/20 p-8 rounded-2xl backdrop-blur-sm">
          <CountdownTimer targetDate={currentEvent.date} />
        </div>
      </main>
    </div>
  );
}