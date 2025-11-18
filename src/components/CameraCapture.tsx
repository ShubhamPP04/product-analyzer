'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, ArrowLeft, Check, SwitchCamera, ScanLine } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  loading: boolean;
  progress: number;
  onBack: () => void;
}

export default function CameraCapture({ onCapture, loading, progress, onBack }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirmCapture = () => {
    if (imgSrc) {
      onCapture(imgSrc);
    }
  };

  const handleUserMediaError = () => {
    setCameraError(true);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition font-medium p-2 -ml-2"
          disabled={loading}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Scan Product</h2>
        <div className="w-8 sm:w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {cameraError ? (
          <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <Camera className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-rose-900 mb-2">Camera Access Required</h3>
            <p className="text-rose-700 max-w-xs mx-auto">
              Please allow camera access in your browser settings to scan products.
            </p>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl aspect-[3/4] sm:aspect-[4/3]">
            {!imgSrc ? (
              <>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{
                    facingMode: facingMode,
                  }}
                  onUserMediaError={handleUserMediaError}
                />
                {/* Camera Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-[20px] sm:border-[40px] border-black/30 mask-image-scan"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] sm:w-64 sm:h-64 border-2 border-white/50 rounded-3xl">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-xl"></div>

                    {/* Scanning Animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70 animate-scan"></div>
                  </div>
                  <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                    <p className="text-white/90 font-medium bg-black/40 inline-block px-4 py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm">
                      Position ingredients label in frame
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imgSrc} alt="Captured product" className="w-full h-full object-cover" />
            )}

            {!imgSrc && (
              <button
                onClick={switchCamera}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 z-10 active:scale-95"
                title="Switch Camera"
                type="button"
              >
                <SwitchCamera className="w-6 h-6" />
              </button>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-white z-20 p-6">
                <div className="relative">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-white/10 border-t-emerald-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl">
                    {Math.min(Math.round(progress), 100)}%
                  </div>
                </div>
                <div className="text-center max-w-xs">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Analyzing Ingredients</h3>
                  <p className="text-white/60 text-xs sm:text-sm">Our AI is reading the label and checking for health impacts...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!cameraError && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
            {!imgSrc ? (
              <button
                onClick={capture}
                className="group relative flex items-center justify-center gap-3 bg-white border-4 border-slate-100 hover:border-emerald-100 p-1.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                type="button"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-emerald-500 group-hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={retake}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition duration-200 disabled:opacity-50 text-sm sm:text-base active:scale-95"
                  disabled={loading}
                  type="button"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Retake
                </button>
                <button
                  onClick={confirmCapture}
                  disabled={loading}
                  className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95"
                  type="button"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
            animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
