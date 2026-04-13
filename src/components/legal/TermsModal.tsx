'use client';

import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">الشروط والأحكام</h2>
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
                مرحباً بك في تطبيق "تعافي". باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">2. الغرض من التطبيق</h3>
              <p className="leading-relaxed">
                تطبيق "تعافي" هو أداة مساعدة تهدف إلى دعم المستخدمين في التقليل من استخدام تطبيقات الفيديو القصيرة وبناء عادات صحية. التطبيق لا يقدم استشارات طبية أو نفسية متخصصة، وفي حالة الحاجة إلى مساعدة متخصصة، ننصح بالتوجه إلى مختصين.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">3. استخدام التطبيق</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يُسمح باستخدام التطبيق للأغراض الشخصية فقط.</li>
                <li>يُمنع استخدام التطبيق لأي أغراض غير قانونية أو ضارة.</li>
                <li>يُمنع محاولة اختراق أو تعطيل خدمة التطبيق.</li>
                <li>المستخدم مسؤول عن الحفاظ على سرية حسابه.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">4. المحتوى</h3>
              <p className="leading-relaxed">
                جميع المحتويات المقدمة في التطبيق (نصوص، صور، أيقونات) هي ملك لنا أو مرخصة للاستخدام. يُمنع نسخ أو توزيع أو تعديل أي محتوى دون إذن مسبق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">5. المسؤولية</h3>
              <p className="leading-relaxed">
                نحن نسعى لتقديم أفضل تجربة ممكنة، لكننا لا نضمن عدم وجود أخطاء أو انقطاع في الخدمة. نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">6. التعديلات</h3>
              <p className="leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إعلامك بأي تغييرات جوهرية عبر التطبيق. استمرارك في استخدام التطبيق بعد التعديلات يعني موافقتك عليها.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">7. التواصل</h3>
              <p className="leading-relaxed">
                للاستفسارات أو الاقتراحات، يمكنك التواصل معنا عبر:
              </p>
              <div className="mt-3 p-4 bg-green-500/10 rounded-xl">
                <p className="text-green-400 font-bold">📞 رقم الهاتف: 0563494180</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">8. القانون الواجب التطبيق</h3>
              <p className="leading-relaxed">
                تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاعات تنشأ عن هذه الشروط ستُحال إلى المحاكم المختصة.
              </p>
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
