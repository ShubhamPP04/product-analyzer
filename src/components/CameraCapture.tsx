'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, ArrowLeft, Check, SwitchCamera } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-green-100 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition"
        disabled={loading}
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Age Input
      </button>

      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <Camera className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-green-800 text-center mb-4">
        Capture Product Label
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Position the product ingredients label clearly in the camera frame
      </p>

      <div className="space-y-6">
        {cameraError ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium mb-2">
              Unable to access camera
            </p>
            <p className="text-sm text-red-500">
              Please ensure you have granted camera permissions and try again.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-4 border-green-200 bg-black">
              {!imgSrc ? (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto"
                  videoConstraints={{
                    facingMode: facingMode,
                  }}
                  onUserMediaError={handleUserMediaError}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgSrc} alt="Captured product" className="w-full h-auto" />
              )}
            </div>
            
            {!imgSrc && (
              <button
                onClick={switchCamera}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-green-700 p-3 rounded-full shadow-lg transition duration-200 transform hover:scale-110"
                title="Switch Camera"
                type="button"
              >
                <SwitchCamera className="w-6 h-6" />
              </button>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-white">
                <div className="bg-white/10 rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-11/12 max-w-xs">
                  <p className="text-sm uppercase tracking-wide text-white/80">Analyzing</p>
                  <div className="text-4xl font-semibold">{Math.min(Math.round(progress), 100)}%</div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-200"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/70 text-center">We’re reading the label and preparing your insights...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!cameraError && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {!imgSrc ? (
              <button
                onClick={capture}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg"
                type="button"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
            ) : (
              <>
                <button
                  onClick={retake}
                  className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg disabled:opacity-50"
                  disabled={loading}
                  type="button"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake
                </button>
                <button
                  onClick={confirmCapture}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  <Check className="w-5 h-5" />
                  {loading ? 'Analyzing...' : 'Analyze Product'}
                </button>
              </>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            💡 Tip: Ensure good lighting and the text is clearly visible for best results
          </p>
        </div>
      </div>
    </div>
  );
}
