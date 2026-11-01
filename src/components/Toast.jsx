import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-[#E5C07B]/40 bg-[#081738]/95 px-5 py-3.5 text-white shadow-2xl shadow-black/80 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5C07B]/20 text-[#F7E5A9]">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-bold text-white">{toast.title}</div>
        <div className="text-[11px] text-blue-200">{toast.message}</div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-blue-300 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
