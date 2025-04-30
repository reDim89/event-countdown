import { useEffect, useState } from 'react';

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  formatDuration,
} from 'date-fns';
import { ru } from 'date-fns/locale';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now >= targetDate) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center p-1 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10"
        >
          <span className="text-lg sm:text-3xl font-bold tracking-tight">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-sm text-white/80 uppercase tracking-wider mt-0.5 sm:mt-1">
            {formatDuration({ [unit]: value }, { locale: ru, zero: true }).split(' ')[1]}
          </span>
        </div>
      ))}
    </div>
  );
}