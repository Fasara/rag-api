/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import { chunkText } from '../utils/chunker.util';

@Injectable()
export class DocumentsService {
  async processDocument(
    file: Express.Multer.File,
  ): Promise<{ chunks: number }> {
    // Extract text from the PDF file using pdf-parse
    // @ts-expect-error
    const pdfData = (await pdfParse(file.buffer)) as { text: string };
    // Split the extracted text into chunks using the chunkText function
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const text = pdfData.text;
    const chunks = chunkText(text);

    console.log(`Extracted ${chunks.length} chunks from ${file.originalname}`);

    // Return the number of chunks created
    return { chunks: chunks.length };
  }
}
