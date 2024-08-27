import { Injectable } from '@angular/core';

@Injectable()
export class FileHandler {
  private FILE_TYPES_MAGIC_NUMBERS: {
    [key: string]: { magicNumber: string; mime: string };
  } = {
    xlsx: {
      magicNumber: '504B0304',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  };

  downloadFileFromBase64(base64: string, filename: string) {
    const binaryString = atob(base64);

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++)
      bytes[i] = binaryString.charCodeAt(i);

    const blob = new Blob([bytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobURL;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(blobURL);
  }

  async checkFileType(file: File, type: string): Promise<boolean> {
    try {
      if (Object.keys(!this.FILE_TYPES_MAGIC_NUMBERS).includes(type))
        throw new Error('Specified file type unavailable.');

      const fileInfo = this.FILE_TYPES_MAGIC_NUMBERS[type];
      return (
        file.type === fileInfo.mime &&
        (await this.validateFileType(file, fileInfo.magicNumber))
      );
    } catch {
      console.log('ERROR');
      return false;
    }
  }

  private validateFileType(file: File, magicNumber: string) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      const blob = file.slice(0, 4);

      reader.onload = (e) => {
        const uint8Array = new Uint8Array(e.target?.result as ArrayBuffer);
        resolve(this.getMagicNumber(uint8Array) === magicNumber);
      };

      reader.readAsArrayBuffer(blob);
    }) as Promise<boolean>;
  }

  private getMagicNumber(arr: Uint8Array) {
    return Array.from(arr)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }
}
