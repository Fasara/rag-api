import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import { chunkText } from '../utils/chunker.util';

@Injectable()
export class DocumentsService {
  async processDocument(
    file: Express.Multer.File,
  ): Promise<{ chunks: number }> {
    const parser = new PDFParse({ data: file.buffer });
    const pdfData = await parser.getText();
    const text = pdfData.text;
    const chunks = chunkText(text);

    console.log(`Extracted ${chunks.length} chunks from ${file.originalname}`);

    // Return the number of chunks created
    return { chunks: chunks.length };
  }
}
