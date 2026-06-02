'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX';
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20ACM%20Shivalik`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 mr-2 bg-zinc-900 border border-zinc-800 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl"
          >
            Need Help? Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer relative"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.8.001-2.617-1.01-5.079-2.846-6.917C16.398 2.05 13.942 1.04 11.326 1.04c-5.41 0-9.811 4.399-9.813 9.802-.001 1.572.41 3.109 1.192 4.476l-.998 3.645 3.738-.981.612.363zM16.59 13.96c-.26-.13-1.536-.759-1.774-.846-.237-.087-.41-.13-.58.13-.173.26-.67.846-.821 1.019-.15.173-.3.195-.56.065-.26-.13-1.097-.404-2.09-1.29-.772-.688-1.293-1.537-1.444-1.796-.15-.26-.016-.401.115-.53.118-.117.26-.303.39-.455.13-.15.172-.26.26-.433.086-.173.043-.325-.022-.455-.064-.13-.58-1.4-.795-1.92-.21-.51-.43-.43-.58-.44h-.496c-.173 0-.455.065-.693.303-.238.238-.91.888-.91 2.166 0 1.278.93 2.512 1.06 2.685.13.173 1.83 2.795 4.434 3.918.619.267 1.1.427 1.477.547.622.197 1.187.17 1.634.1.499-.078 1.536-.628 1.752-1.234.217-.606.217-1.126.152-1.234-.065-.108-.238-.173-.498-.303z" />
        </svg>
      </motion.a>
    </div>
  );
}
