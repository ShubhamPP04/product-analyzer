import { Info } from 'lucide-react';

export default function InfoCard() {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 my-6">
      <div className="flex items-start gap-3">
        <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            How It Works
          </h3>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>📝 Enter your age for personalized insights</li>
            <li>📸 Capture a photo of the product label</li>
            <li>🔍 AI extracts and analyzes the ingredients</li>
            <li>💡 Get health score, pros, cons & recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
