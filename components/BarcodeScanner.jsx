'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { initBarcodeDetector } from '@/utils/barcodePolyfill';

export default function BarcodeScanner({ onDetected, onClose, onManualInput }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [barcodeDetectorReady, setBarcodeDetectorReady] = useState(false);

  useEffect(() => {
    initDetector();
    return () => {
      stopCamera();
    };
  }, []);

  const initDetector = async () => {
    try {
      await initBarcodeDetector();
      setBarcodeDetectorReady(true);
      startCamera();
    } catch (err) {
      console.error('Erro ao inicializar detector:', err);
      setError('Seu navegador não suporta leitura de códigos de barras. Por favor, digite manualmente.');
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Câmera traseira em dispositivos móveis
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setScanning(true);
      }
    } catch (err) {
      console.error('Erro ao acessar câmera:', err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopCamera = () => {
    setScanning(false);
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureAndDecode = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Define dimensões do canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Captura frame do vídeo
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Tenta detectar código de barras
    try {
      // Usa a API BarcodeDetector se disponível
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new window.BarcodeDetector({
          formats: ['ean_13', 'ean_8', 'code_128', 'code_39']
        });
        
        const barcodes = await barcodeDetector.detect(canvas);
        
        if (barcodes.length > 0) {
          const barcode = barcodes[0].rawValue;
          stopCamera();
          onDetected(barcode);
          return;
        }
      }
    } catch (err) {
      console.error('Erro ao decodificar:', err);
    }

    // Continua escaneando
    if (scanning) {
      requestAnimationFrame(captureAndDecode);
    }
  };

  useEffect(() => {
    if (scanning && videoRef.current && videoRef.current.readyState === 4) {
      captureAndDecode();
    }
  }, [scanning]);

  const handleManualInput = () => {
    stopCamera();
    if (onManualInput) {
      onManualInput();
    } else {
      onClose();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {error ? (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: 'var(--error)'
        }}>
          <p>{error}</p>
          <Button onClick={handleManualInput} style={{ marginTop: '16px' }}>
            Digitar Manualmente
          </Button>
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            
            {/* Guia de alinhamento */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '100px',
              border: '2px solid var(--success)',
              borderRadius: '8px',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
              pointerEvents: 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}>
                Alinhe o código de barras aqui
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ 
              marginBottom: '12px', 
              color: 'var(--foreground)',
              fontSize: '14px'
            }}>
              Posicione o código de barras no centro da câmera
            </p>
            <Button variant="secondary" onClick={handleManualInput}>
              Digitar Manualmente
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
