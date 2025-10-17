"use client"

import { useState } from "react"
import FileUploader from "@/components/file-uploader"
import VoucherPreview from "@/components/voucher-preview"
import type { VoucherData } from "@/types/voucher"

export default function Home() {
  const [voucherData, setVoucherData] = useState<VoucherData[]>([])
  const [startingVoucherNo, setStartingVoucherNo] = useState<string>("1001")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("startingVoucherNo", startingVoucherNo)

      const response = await fetch("/api/parse-excel", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to parse Excel file")
      }

      const data = await response.json()
      setVoucherData(data.vouchers)
    } catch (error) {
      console.error("Error processing file:", error)
      alert("Error processing file. Please check the Excel format.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Voucher Generator</h1>
          <p className="text-slate-600">Generate payment debit vouchers from Excel data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Configuration</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Starting Voucher Number</label>
                <input
                  type="text"
                  value={startingVoucherNo}
                  onChange={(e) => setStartingVoucherNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1001"
                />
              </div>

              <FileUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            {voucherData.length > 0 ? (
              <VoucherPreview vouchers={voucherData} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-slate-500 text-lg">Upload an Excel file to generate vouchers</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
