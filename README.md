# 📁 File Uploader

A simple and efficient **File Uploader** application built as part of a coding assignment.  
The project allows users to upload and delete files using **Supabase Storage** and **Supabase Edge Functions**, with a clean React-based UI.

---

## 📌 Table of Contents

1. Project Overview
2. Tech Requirements
3. Features
4. Prerequisites
5. Installation
6. Environment Variables
7. Running the Project
8. API Details

---

## 📘 Project Overview

This project demonstrates:

- File uploads using Supabase Storage
- Secure file deletion via Edge Functions
- Axios interceptors for request/response handling
- Modular, clean frontend architecture
- React + TypeScript best practices

This assignment ensures clarity in API handling, state management, and real-world file handling workflows.

---

## 🛠️ Tech Requirements

| Layer       | Tech                    |
| ----------- | ----------------------- |
| Frontend    | React, Vite, TypeScript |
| Storage     | Supabase Storage        |
| Serverless  | Supabase Edge Functions |
| HTTP Client | Axios                   |

---

## ✨ Features

- Upload any file (images, docs, videos, etc.)
- Delete files by ID via Edge Function
- Axios interceptors for global API error handling
- TypeScript-based modular code structure
- Easy to integrate into any frontend project

---

## 📦 Prerequisites

Make sure you have:

- **Node.js 16+**
- **npm / pnpm / yarn**
- A **Supabase project**
- A **storage bucket** created (example: `uploads`)
- A deployed **Edge Function** for deleting files

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd <project-folder>

# 2. Install dependencies
npm install
```

---

## 🔑 Environment Variables

Create a .env file in the root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_BUCKET_NAME=documents //default
```

## ▶️ Running the Project

Start development server:

```bash
npm run dev
```

App runs on:
http://localhost:5173

## 🔌 API Details

### 1. Upload File

- Sends POST request to Supabase Storage.
- Uses FormData.
- Returns file metadata.

### 2. Delete File

- Sends DELETE request to Supabase Edge Function.
- Payload example:

```bash
{
  "file_id": "folder/my-doc.docx"
}
```

### 3. Axios Interceptors

- Captures global API errors.
- Reduces repetitive try/catch blocks.

## 📝 Conclusion

This project demonstrates:

- Practical skills in frontend architecture
- Real-world API integration
- Good coding practices with React + TypeScript
- Ability to work with cloud storage and serverless functions
