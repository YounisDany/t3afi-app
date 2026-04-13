'use client';

import { motion } from 'framer-motion';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl max-h-[80vh] glass rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 glass border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold text-white">سياسة الخصوصية</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] text-right" dir="rtl">
          <div className="space-y-6 text-gray-300">
            <section>
              <h3 className="text-lg font-bold text-white mb-3">1. مقدمة</h3>
              <p className="leading-relaxed">
                نحن في "تعافي" نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام تطبيقنا.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">2. المعلومات التي نجمعها</h3>
              <p className="leading-relaxed mb-3">نجمع المعلومات التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني (اختياري)</li>
                <li><strong>بيانات الاستخدام:</strong> تقدمك، نقاط XP، الأيام المتتالية</li>
                <li><strong>إعدادات التطبيق:</strong> تفضيلاتك وتخصيصاتك</li>
                <li><strong>بيانات الجهاز:</strong> نوع الجهاز ونظام التشغيل لتحسين الأداء</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">3. كيف نستخدم معلوماتك</h3>
              <p className="leading-relaxed mb-3">نستخدم المعلومات لـ:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>توفير وتحسين خدمات التطبيق</li>
                <li>تتبع تقدمك وعرض إحصائياتك</li>
                <li>تخصيص تجربتك في التطبيق</li>
                <li>إرسال إشعارات تحفيزية (يمكنك إيقافها)</li>
                <li>تحليل استخدام التطبيق لتحسينه</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">4. تخزين البيانات</h3>
              <p className="leading-relaxed">
                بياناتك تُخزن محلياً على جهازك باستخدام تقنية التخزين المحلي (LocalStorage). هذا يعني أن بياناتك تبقى على جهازك ولا يتم نقلها إلى خوادمنا إلا إذا قمت بإنشاء حساب ومزامنة بياناتك.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">5. مشاركة البيانات</h3>
              <p className="leading-relaxed">
                لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة. قد نشارك بيانات مجهولة الهوية لأغراض تحسين الخدمة والبحث.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">6. حقوقك</h3>
              <p className="leading-relaxed mb-3">لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الوصول إلى بياناتك الشخصية</li>
                <li>تصحيح أو تحديث معلوماتك</li>
                <li>حذف حسابك وجميع بياناتك</li>
                <li>رفض جمع بعض البيانات</li>
                <li>تصدير بياناتك</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">7. أمان البيانات</h3>
              <p className="leading-relaxed">
                نتخذ إجراءات أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. لكن لا يمكن ضمان أمان بنسبة 100% للبيانات المنقولة عبر الإنترنت.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">8. ملفات تعريف الارتباط</h3>
              <p className="leading-relaxed">
                يستخدم التطبيق ملفات تعريف ارتباط محلية (Local Storage) لتخزين تفضيلاتك وبياناتك. يمكنك مسح هذه البيانات من إعدادات جهازك أو التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">9. الأطفال</h3>
              <p className="leading-relaxed">
                التطبيق مناسب لجميع الأعمار. لا نجمع عمداً معلومات من الأطفال دون 13 عاماً دون موافقة ولي الأمر.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">10. تحديثات السياسة</h3>
              <p className="leading-relaxed">
                قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر التطبيق. ننصحك بمراجعة هذه السياسة periodically.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">11. التواصل</h3>
              <p className="leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، تواصل معنا:
              </p>
              <div className="mt-3 p-4 bg-green-500/10 rounded-xl">
                <p className="text-green-400 font-bold">📞 رقم الهاتف: 0563494180</p>
              </div>
            </section>

            <div className="pt-4 border-t border-white/10 text-sm text-gray-500">
              <p>آخر تحديث: أبريل 2026</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
