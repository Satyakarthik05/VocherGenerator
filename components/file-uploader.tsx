"use client"

import type React from "react"

import { useRef } from "react"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  isProcessing: boolean
}

export default function FileUploader({ onFileUpload, isProcessing }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div>
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="hidden" />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        {isProcessing ? "Processing..." : "Upload Excel File"}
      </button>
      <p className="text-xs text-slate-500 mt-2">Supported formats: .xlsx, .xls, .csv</p>
    </div>
  )
}
