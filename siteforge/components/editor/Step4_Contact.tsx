'use client';

import { useEditorStore } from '@/lib/businessStore';
import { OpeningHours } from '@/lib/types';
import InputField from '@/components/ui/InputField';

// ===== Helpers for parsing/formatting the "HH:MM-HH:MM" or "closed" string =====

type DaySchedule = { isOpen: boolean; from: string; to: string };

function parseHours(value: string): DaySchedule {
  if (!value || value === 'closed') return { isOpen: false, from: '09:00', to: '18:00' };
  const [from, to] = value.split('-');
  return { isOpen: true, from: from ?? '09:00', to: to ?? '18:00' };
}

function formatHours(day: DaySchedule): string {
  return day.isOpen ? `${day.from}-${day.to}` : 'closed';
}

// ===== Day config =====
const DAYS: { key: keyof OpeningHours; label: string }[] = [
  { key: 'sunday',    label: 'Sun' },
  { key: 'monday',    label: 'Mon' },
  { key: 'tuesday',   label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday',  label: 'Thu' },
  { key: 'friday',    label: 'Fri' },
  { key: 'saturday',  label: 'Sat' },
];

// ===== Toggle styled button =====
function Toggle({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
        isOn ? 'bg-purple-600' : 'bg-white/15'
      }`}
      aria-pressed={isOn}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
          isOn ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  );
}

export default function Step4_Contact() {
  const { businessData, updateBusinessData } = useEditorStore();

  // Direct-to-store helpers for opening hours
  const toggleDay = (dayKey: keyof OpeningHours) => {
    const current = parseHours(businessData.openingHours[dayKey]);
    updateBusinessData({
      openingHours: {
        ...businessData.openingHours,
        [dayKey]: formatHours({ ...current, isOpen: !current.isOpen }),
      },
    });
  };

  const updateTime = (dayKey: keyof OpeningHours, field: 'from' | 'to', value: string) => {
    const current = parseHours(businessData.openingHours[dayKey]);
    updateBusinessData({
      openingHours: {
        ...businessData.openingHours,
        [dayKey]: formatHours({ ...current, [field]: value }),
      },
    });
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Contact & Hours</h2>
        <p className="text-white/40 text-sm">How can customers reach you?</p>
      </div>

      {/* Contact grid */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Phone"
          value={businessData.phone}
          onChange={(v) => updateBusinessData({ phone: v })}
          placeholder="050-123-4567"
          type="tel"
        />
        <InputField
          label="Email"
          value={businessData.email}
          onChange={(v) => updateBusinessData({ email: v })}
          placeholder="hello@mybusiness.com"
          type="email"
        />
        <InputField
          label="Address"
          value={businessData.address}
          onChange={(v) => updateBusinessData({ address: v })}
          placeholder="123 Main Street"
        />
        <InputField
          label="City"
          value={businessData.city}
          onChange={(v) => updateBusinessData({ city: v })}
          placeholder="Tel Aviv"
        />
      </div>

      {/* Social links */}
      <div>
        <p className="text-sm font-semibold text-white/60 mb-3">Social Media</p>
        <div className="space-y-3">
          <InputField
            label="Instagram"
            value={businessData.instagram}
            onChange={(v) => updateBusinessData({ instagram: v })}
            placeholder="@mybusiness"
          />
          <InputField
            label="Facebook"
            value={businessData.facebook}
            onChange={(v) => updateBusinessData({ facebook: v })}
            placeholder="facebook.com/mybusiness"
          />
          <InputField
            label="WhatsApp"
            value={businessData.whatsapp}
            onChange={(v) => updateBusinessData({ whatsapp: v })}
            placeholder="050-123-4567"
          />
        </div>
      </div>

      {/* Opening Hours */}
      <div>
        <p className="text-sm font-semibold text-white/60 mb-3">Opening Hours</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {DAYS.map(({ key, label }, index) => {
            const hours = parseHours(businessData.openingHours[key]);
            return (
              <div
                key={key}
                className={`flex items-center gap-3 px-4 py-3 ${
                  index < DAYS.length - 1 ? 'border-b border-white/[0.06]' : ''
                }`}
              >
                {/* Day label */}
                <span className="text-sm font-medium text-white/60 w-9 flex-shrink-0">{label}</span>

                {/* Toggle */}
                <Toggle isOn={hours.isOpen} onToggle={() => toggleDay(key)} />

                {/* Time inputs or "Closed" */}
                {hours.isOpen ? (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <input
                      type="time"
                      value={hours.from}
                      onChange={(e) => updateTime(key, 'from', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-purple-500 transition-colors w-24"
                    />
                    <span className="text-white/25 text-xs flex-shrink-0">–</span>
                    <input
                      type="time"
                      value={hours.to}
                      onChange={(e) => updateTime(key, 'to', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-purple-500 transition-colors w-24"
                    />
                  </div>
                ) : (
                  <span className="text-white/25 text-xs flex-1">Closed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
