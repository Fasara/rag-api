# rag-api

A REST API for **Retrieval-Augmented Generation (RAG)** workflows. It accepts PDF document uploads, extracts their text content, and splits it into overlapping chunks ready for embedding and retrieval.

Built with [NestJS](https://nestjs.com), [pdf-parse](https://www.npmjs.com/package/pdf-parse), [Vectra](https://github.com/Stevenic/vectra) (local vector store), and the [Anthropic SDK](https://www.npmjs.com/package/@anthropic-ai/sdk).

---

## How it works

1. A PDF file is uploaded via `POST /documents`.
2. The text is extracted from the PDF using `pdf-parse`.
3. The text is split into chunks of **500 characters** with a **100-character overlap** using the `chunkText` utility.
4. The number of chunks created is returned in the response.

---

## API

### `POST /documents`

Upload a PDF file for processing.

- **Content-Type:** `multipart/form-data`
- **Field name:** `file`

**Example with curl:**
```bash
curl -X POST http://localhost:3000/documents \
  -F "file=@/path/to/document.pdf"
```

**Response:**
```json
{ "chunks": 42 }
```

---

## Project structure

```
src/
├── documents/
│   ├── documents.controller.ts   # POST /documents endpoint
│   ├── documents.service.ts      # PDF parsing and chunking logic
│   └── documents.module.ts
├── utils/
│   └── chunker.util.ts           # Text chunking utility
├── app.module.ts
└── main.ts
```

