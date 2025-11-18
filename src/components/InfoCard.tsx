import { Info } from 'lucide-react';

export default function InfoCard() {
  return (
    <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-cyan-100 rounded-xl p-2 shrink-0">
          <Info className="w-5 h-5 text-cyan-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-cyan-900 mb-3">
            How It Works
          </h3>
          <ul className="space-y-2.5 text-sm text-cyan-800 font-medium">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
              Enter your age for personalized insights
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
              Capture a photo of the product label
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
              AI extracts and analyzes the ingredients
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
              Get health score, pros, cons & recommendations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
