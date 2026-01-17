'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, ArrowLeft, Check, SwitchCamera, Type, Scan } from 'lucide-react';

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
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');

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
    if (isTextMode) {
      if (textInput.trim().length > 0) {
        onCapture(`TEXT:${textInput}`);
      }
    } else if (imgSrc) {
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
    <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl border border-slate-200 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition font-medium p-2 -ml-2 rounded-xl hover:bg-slate-50"
          disabled={loading}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2">
          {isTextMode ? (
            <Type className="w-5 h-5 text-emerald-600" />
          ) : (
            <Scan className="w-5 h-5 text-emerald-600" />
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            {isTextMode ? 'Type Ingredients' : 'Scan Product'}
          </h2>
        </div>
        <button
          onClick={() => setIsTextMode(!isTextMode)}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition px-3 py-2 rounded-xl hover:bg-emerald-50"
          disabled={loading}
        >
          {isTextMode ? 'Use Camera' : 'Type Text'}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {isTextMode ? (
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 min-h-[300px] flex flex-col">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Paste or type ingredients list:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="e.g., Sugar, Water, Palm Oil, Wheat Flour..."
              className="w-full flex-1 p-4 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none resize-none text-slate-700 placeholder:text-slate-400 bg-white"
            />
          </div>
        ) : (
          <>
            {cameraError ? (
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                  <Camera className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-rose-800 mb-2">Camera Access Required</h3>
                <p className="text-rose-700 max-w-xs mx-auto mb-4">
                  Please allow camera access in your browser settings to scan products.
                </p>
                <button
                  onClick={() => setIsTextMode(true)}
                  className="text-emerald-700 font-bold underline hover:text-emerald-800"
                >
                  Or type ingredients manually
                </button>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-2xl aspect-[3/4] sm:aspect-[4/3] border border-slate-200">
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
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>

                        {/* Scanning Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80 animate-scan"></div>
                      </div>
                      <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                        <p className="text-white/90 font-medium bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm border border-white/10">
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
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-all duration-200 z-10 active:scale-95 border border-white/20"
                    title="Switch Camera"
                    type="button"
                  >
                    <SwitchCamera className="w-6 h-6" />
                  </button>
                )}

                {loading && (
                  <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-white z-20 p-6">
                    <div className="relative">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-white/10 border-t-emerald-500 animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl">
                        {Math.min(Math.round(progress), 100)}%
                      </div>
                    </div>
                    <div className="text-center max-w-xs">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Analyzing Ingredients</h3>
                      <p className="text-white/60 text-xs sm:text-sm">Our AI is checking for health impacts...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {(!cameraError || isTextMode) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
            {!isTextMode && !imgSrc ? (
              <button
                onClick={capture}
                className="group relative flex items-center justify-center gap-3 bg-white border-4 border-slate-200 hover:border-emerald-300 p-1.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-100 hover:scale-105 active:scale-95"
                type="button"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-600 group-hover:to-teal-600 flex items-center justify-center transition-colors shadow-lg">
                  <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                {!isTextMode && (
                  <button
                    onClick={retake}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition duration-200 disabled:opacity-50 text-sm sm:text-base active:scale-95 hover:bg-slate-50"
                    disabled={loading}
                    type="button"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Retake
                  </button>
                )}
                <button
                  onClick={confirmCapture}
                  disabled={loading || (isTextMode && !textInput.trim())}
                  className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition duration-200 shadow-lg shadow-emerald-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95"
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
