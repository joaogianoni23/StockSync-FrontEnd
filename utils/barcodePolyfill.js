// Polyfill para BarcodeDetector em navegadores que não suportam
export async function initBarcodeDetector() {
  // Verifica se está no navegador
  if (typeof window === 'undefined') {
    return;
  }

  if (!('BarcodeDetector' in window)) {
    console.log('BarcodeDetector não suportado, carregando polyfill...');
    
    try {
      // Importa dinamicamente a biblioteca ZXing como fallback
      const { BrowserMultiFormatReader } = await import('@zxing/library');
      
      // Cria um polyfill básico
      window.BarcodeDetector = class BarcodeDetector {
        constructor(options = {}) {
          this.formats = options.formats || ['ean_13', 'ean_8', 'code_128', 'code_39'];
          this.reader = new BrowserMultiFormatReader();
        }

        async detect(imageData) {
          try {
            let result;
            
            if (imageData instanceof HTMLCanvasElement) {
              result = await this.reader.decodeFromCanvas(imageData);
            } else if (imageData instanceof HTMLImageElement) {
              result = await this.reader.decodeFromImage(imageData);
            } else if (imageData instanceof ImageData) {
              // Converter ImageData para Canvas
              const canvas = document.createElement('canvas');
              canvas.width = imageData.width;
              canvas.height = imageData.height;
              const ctx = canvas.getContext('2d');
              ctx.putImageData(imageData, 0, 0);
              result = await this.reader.decodeFromCanvas(canvas);
            }

            if (result) {
              return [{
                rawValue: result.getText(),
                format: result.getBarcodeFormat()
              }];
            }
            return [];
          } catch (err) {
            // Nenhum código de barras detectado
            return [];
          }
        }
      };

      console.log('Polyfill BarcodeDetector carregado com sucesso');
    } catch (err) {
      console.error('Erro ao carregar polyfill:', err);
      throw new Error('Seu navegador não suporta leitura de códigos de barras');
    }
  }
}

export function isBarcodeDetectorSupported() {
  return 'BarcodeDetector' in window || typeof window !== 'undefined';
}
