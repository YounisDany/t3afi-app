'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/t3afi-logo.png" alt="تعافي" className="w-8 h-8" />
            <span className="text-lg font-bold gradient-text">تعافي</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-white transition-colors">الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">تواصل معنا</a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>صُنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>في السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
