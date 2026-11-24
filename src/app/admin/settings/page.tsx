'use client';

import HindiFields from '@/components/admin/HindiFields';
import React, { useState, useEffect } from 'react';
import {
  Settings,
  Megaphone,
  User,
  Building2,
  Phone,
  Mail,
  Save,
  Loader2
} from 'lucide-react';
import { SiteSettings, CoachingCenter } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getSettings, saveSettings } from '@/lib/dataService';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Error loading settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Loads data once on mount; state updates are intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      await saveSettings(settings);
      showToast('Settings saved. The website updates in about 2 minutes.', 'success');
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateCenter = (index: number, field: keyof CoachingCenter, value: string) => {
    if (!settings) return;
    const centersCopy = [...settings.coachingCenters];
    centersCopy[index] = { ...centersCopy[index], [field]: value };
    setSettings({ ...settings, coachingCenters: centersCopy });
  };

  if (!settings) {
    return <div className="p-8 text-center text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            Website & Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure live announcement banner, teacher profile metrics, coaching center addresses, and contact channels.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Top Announcement Alert Banner Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Top Website Announcement Banner</h3>
                <p className="text-xs text-slate-400">Controls the marquee alert shown at the very top of all student pages.</p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.bannerActive}
                onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-xs font-bold text-slate-200">
                {settings.bannerActive ? 'Banner Active' : 'Banner Disabled'}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Announcement Message Text
              </label>
              <input
                type="text"
                placeholder="e.g. 📢 Admissions Open for Class 11 & 12 Chemistry Master Batch & JEE/NEET Revision. Check Notice Board!"
                value={settings.bannerAlert}
                onChange={(e) => setSettings({ ...settings, bannerAlert: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <HindiFields
              fields={[{ key: 'bannerAlertHi', label: 'Announcement in Hindi', placeholder: 'जैसे: कक्षा 11 और 12 के नए बैच में प्रवेश शुरू' }]}
              values={settings as unknown as Record<string, string | undefined>}
              onChange={(k, v) => setSettings({ ...settings, [k]: v })}
            />

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Banner Action Link (e.g. /updates or /study-materials)
              </label>
              <input
                type="text"
                value={settings.bannerLink || ''}
                onChange={(e) => setSettings({ ...settings, bannerLink: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Educator Profile & Statistics */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Teacher profile & numbers</h3>
              <p className="text-xs text-slate-400">Shown on the home page and the About page.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Teacher name (top of every page and home page photo)</label>
              <input
                type="text"
                value={settings.teacherName}
                onChange={(e) => setSettings({ ...settings, teacherName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Line under the home page photo</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Years of teaching (shown as “8+”)</label>
              <input
                type="number"
                value={settings.experienceYears}
                onChange={(e) => setSettings({ ...settings, experienceYears: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Students taught (e.g. 5,000+)</label>
              <input
                type="text"
                value={settings.studentsCount}
                onChange={(e) => setSettings({ ...settings, studentsCount: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Introduction under the home page headline</label>
            <textarea
              rows={3}
              value={settings.bioShort}
              onChange={(e) => setSettings({ ...settings, bioShort: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white resize-none"
            ></textarea>
            <p className="mt-1 text-[11px] text-slate-500">The number of schools is counted automatically from the list below.</p>
          </div>

          <HindiFields
            fields={[
              { key: 'teacherNameHi', label: 'Teacher name in Hindi', placeholder: 'अजय चौधरी' },
              { key: 'taglineHi', label: 'Line under the photo in Hindi' },
              { key: 'bioShortHi', label: 'Introduction in Hindi', rows: 3 },
            ]}
            values={settings as unknown as Record<string, string | undefined>}
            onChange={(k, v) => setSettings({ ...settings, [k]: v })}
          />
        </div>

        {/* 3. Coaching Centers Information */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Coaching Centers Information (3 Centers)</h3>
              <p className="text-xs text-slate-400">Manage names, addresses, and schedules for your active teaching centers.</p>
            </div>
          </div>

          <div className="space-y-6">
            {settings.coachingCenters?.map((center, idx) => (
              <div key={center.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Coaching Center #{idx + 1}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Institute Name</label>
                    <input
                      type="text"
                      value={center.name}
                      onChange={(e) => updateCenter(idx, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Location Sub-title</label>
                    <input
                      type="text"
                      value={center.location}
                      onChange={(e) => updateCenter(idx, 'location', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Physical Address</label>
                  <input
                    type="text"
                    value={center.address}
                    onChange={(e) => updateCenter(idx, 'address', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Batches Offered</label>
                    <input
                      type="text"
                      value={center.batches}
                      onChange={(e) => updateCenter(idx, 'batches', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Weekly Schedule Timings</label>
                    <input
                      type="text"
                      value={center.schedule}
                      onChange={(e) => updateCenter(idx, 'schedule', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>
                <HindiFields
                  fields={[
                    { key: 'nameHi', label: 'School name in Hindi' },
                    { key: 'locationHi', label: 'Area / location in Hindi' },
                    { key: 'batchesHi', label: 'Batches in Hindi' },
                    { key: 'scheduleHi', label: 'Schedule in Hindi' },
                  ]}
                  values={center as unknown as Record<string, string | undefined>}
                  onChange={(k, v) => updateCenter(idx, k as keyof CoachingCenter, v)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Contact Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-400" />
            Official Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Public Contact Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* 5. Enquiry email */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            Where should student enquiries be emailed?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Leave empty to use the public contact email. The first enquiry to a new address sends a one-time
            confirmation email. Open it and click &ldquo;Activate&rdquo; once.
          </p>
          <input
            type="email"
            placeholder={settings.email}
            value={settings.enquiryEmail || ''}
            onChange={(e) => setSettings({ ...settings, enquiryEmail: e.target.value })}
            className="w-full sm:max-w-md px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
          />
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
