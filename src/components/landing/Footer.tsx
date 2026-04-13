'use client';

import { useState } from 'react';
import { Heart, Phone } from 'lucide-react';
import { TermsModal } from '@/components/legal/TermsModal';
import { PrivacyModal } from '@/components/legal/PrivacyModal';

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="py-8 px-4 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button 
                onClick={() => setShowTerms(true)}
                className="hover:text-white transition-colors"
              >
                الشروط والأحكام
              </button>
              <span className="text-gray-600">|</span>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white transition-colors"
              >
                الخصوصية
              </button>
              <span className="text-gray-600">|</span>
              <a 
                href="tel:0563494180" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                تواصل معنا
              </a>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="تعافي" className="w-8 h-8 rounded-full" />
              <span className="text-lg font-bold gradient-text">تعافي</span>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-2 text-green-400">
              <Phone className="w-4 h-4" />
              <span className="font-medium" dir="ltr">0563494180</span>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>صُنع بـ</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>في السعودية</span>
            </div>

            <div className="text-xs text-gray-600">
              © 2026 تعافي - جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      
      {/* Privacy Modal */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
}
