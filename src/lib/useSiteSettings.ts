'use client';

import { useEffect, useState } from 'react';
import { SiteSettings } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getSettings } from '@/lib/dataService';

/** Settings from Admin → Settings: the published copy first, then the latest. */
export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(initialDatabase.settings);
  useEffect(() => {
    let alive = true;
    getSettings()
      .then((s) => alive && s && setSettings(s))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return settings;
}
