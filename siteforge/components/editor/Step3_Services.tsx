'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/lib/businessStore';
import { ServiceItem } from '@/lib/types';
import InputField from '@/components/ui/InputField';

const MAX_SERVICES = 12;

export default function Step3_Services() {
  const { businessData, updateBusinessData } = useEditorStore();

  const addService = () => {
    if (businessData.services.length >= MAX_SERVICES) return;
    const newService: ServiceItem = {
      id: crypto.randomUUID(),
      name: '',
      price: '',
      description: '',
    };
    updateBusinessData({ services: [...businessData.services, newService] });
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    updateBusinessData({
      services: businessData.services.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const removeService = (id: string) => {
    updateBusinessData({
      services: businessData.services.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Services & Pricing</h2>
        <p className="text-white/40 text-sm">Add the services your business offers</p>
      </div>

      {/* Service cards */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {businessData.services.map((service, index) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Service {index + 1}
                </span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => removeService(service.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/20 text-red-400/50 hover:text-red-400 transition-all duration-200"
                  aria-label="Remove service"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>

              {/* Name + Price */}
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Service Name"
                  value={service.name}
                  onChange={(v) => updateService(service.id, { name: v })}
                  placeholder="e.g. Haircut"
                />
                <InputField
                  label="Price"
                  value={service.price}
                  onChange={(v) => updateService(service.id, { price: v })}
                  placeholder="e.g. ₪60"
                />
              </div>

              {/* Description */}
              <InputField
                label="Short Description (optional)"
                value={service.description}
                onChange={(v) => updateService(service.id, { description: v })}
                placeholder="e.g. Includes wash and style"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Service button */}
      {businessData.services.length < MAX_SERVICES && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={addService}
          className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/45 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Service
          {businessData.services.length > 0 && (
            <span className="text-white/25 ms-1">
              ({businessData.services.length}/{MAX_SERVICES})
            </span>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {businessData.services.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-white/25 text-sm py-4"
          >
            No services yet — click &quot;Add Service&quot; to get started
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
