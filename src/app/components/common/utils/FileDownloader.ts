import { Injectable } from '@angular/core';

@Injectable()
export class FileDownloader {
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
}
