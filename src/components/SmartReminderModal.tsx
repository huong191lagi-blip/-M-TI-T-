import React, { useState, useEffect } from 'react';
import { ReminderSettings } from '../types';
import { Bell, Sparkles, Clock, Check, Calendar, ShieldCheck, X } from 'lucide-react';
import { SoundEffects } from '../utils/audio';

interface SmartReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReminderSettings;
  onSaveSettings: (newSettings: ReminderSettings) => void;
  streak: number;
  masteredCount: number;
}

export const SmartReminderModal: React.FC<SmartReminderModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  streak,
  masteredCount
}) => {
  const [localSettings, setLocalSettings] = useState<ReminderSettings>(settings);
  const [smartTip, setSmartTip] = useState<{ title: string; body: string; recommendation: string } | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    setLocalSettings(settings);
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, [settings, isOpen]);

  // Fetch AI Smart Reminder Tip
  useEffect(() => {
    if (isOpen) {
      fetchSmartTip();
    }
  }, [isOpen]);

  const fetchSmartTip = async () => {
    setIsLoadingTip(true);
    try {
      const res = await fetch('/api/smart-reminder-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streak, masteredCount })
      });
      const data = await res.json();
      setSmartTip(data);
    } catch (e) {
      setSmartTip({
        title: '🌟 Duy trì thói quen IPA 10 phút mỗi ngày',
        body: 'Phát âm là trí nhớ cơ bắp (muscle memory). Luyện tập đều đặn hàng ngày sẽ giúp cơ hàm và đầu lưỡi của bạn linh hoạt hơn.',
        recommendation: 'Hãy luyện tập 3 âm mỗi ngày vào buổi tối.'
      });
    } finally {
      setIsLoadingTip(false);
    }
  };

  const handleRequestNotification = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
      if (permission === 'granted') {
        new Notification('IPA Master - Luyện phát âm chuẩn', {
          body: 'Thông báo nhắc nhở thông minh đã được bật thành công!',
          icon: '/favicon.ico'
        });
      }
    }
  };

  const handleSave = () => {
    SoundEffects.playClick();
    onSaveSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="smart-reminder-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-xl overflow-hidden my-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Nhắc nhở học tập thông minh</h3>
              <p className="text-xs text-slate-500">Xây dựng thói quen luyện IPA đều đặn mỗi ngày</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Tip Card */}
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Lời khuyên AI dành riêng cho bạn:
          </div>
          {isLoadingTip ? (
            <p className="text-xs text-slate-500 animate-pulse">Đang tối ưu lịch học...</p>
          ) : smartTip ? (
            <div className="space-y-1 text-xs text-indigo-950">
              <p className="font-bold text-indigo-900">{smartTip.title}</p>
              <p className="leading-relaxed text-indigo-800">{smartTip.body}</p>
            </div>
          ) : null}
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-sm font-bold text-slate-800 block">Kích hoạt thông báo nhắc nhở</span>
              <span className="text-xs text-slate-500">Nhận nhắc nhở lịch học trên trình duyệt</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.enabled}
                onChange={(e) => setLocalSettings({ ...localSettings, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Preferred Time Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              Khung giờ luyện tập lý tưởng:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { time: '08:00', label: 'Buổi sáng (08:00)' },
                { time: '14:00', label: 'Buổi chiều (14:00)' },
                { time: '20:00', label: 'Buổi tối (20:00)' }
              ].map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, preferredTime: slot.time })}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    localSettings.preferredTime === slot.time
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Sound Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Mục tiêu mỗi ngày: <span className="text-emerald-700 font-bold">{localSettings.dailySoundGoal} âm mới</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, dailySoundGoal: goal })}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    localSettings.dailySoundGoal === goal
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {goal} âm / ngày
                </button>
              ))}
            </div>
          </div>

          {/* Browser Permission Prompt */}
          {notificationStatus !== 'granted' && localSettings.enabled && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="text-xs text-amber-900">
                <span className="font-bold block">Cấp quyền thông báo</span>
                <span className="text-amber-700">Cho phép trình duyệt gửi thông báo học</span>
              </div>
              <button
                type="button"
                onClick={handleRequestNotification}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all"
              >
                Cho phép
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
          >
            Đóng
          </button>
          <button
            type="button"
            id="btn-save-reminder"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Check className="w-4 h-4" />
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};
