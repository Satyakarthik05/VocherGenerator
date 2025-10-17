"use client"

import type { VoucherData } from "@/types/voucher"
import VoucherTemplate from "./voucher-template"
import { useRef } from "react"
import html2canvas from "html2canvas"

interface VoucherPreviewProps {
  vouchers: VoucherData[]
}

export default function VoucherPreview({ vouchers }: VoucherPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=800")
    if (printWindow && printRef.current) {
      const printStyles = `
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            background: white;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .page-break {
              page-break-after: always;
              page-break-inside: avoid;
            }
            div {
              border-color: black !important;
            }
          }
        </style>
      `
      printWindow.document.write(printStyles)
      printWindow.document.write(printRef.current.innerHTML)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }

  const handleDownloadPDF = async () => {
    const element = printRef.current
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "vouchers.png"
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={handlePrint}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Print Vouchers
        </button>
      </div>

      <div ref={printRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Print Layout: 2 vouchers per A4 page */}
        {Array.from({ length: Math.ceil(vouchers.length / 2) }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            className="page-break"
            style={{
              pageBreakAfter: "always",
              minHeight: "297mm",
              width: "210mm",
              margin: "0 auto",
              padding: "10mm",
              boxSizing: "border-box",
            }}
          >
            {/* First Voucher */}
            {vouchers[pageIndex * 2] && (
              <div className="mb-6">
                <VoucherTemplate voucher={vouchers[pageIndex * 2]} />
              </div>
            )}

            {/* Second Voucher */}
            {vouchers[pageIndex * 2 + 1] && (
              <div>
                <VoucherTemplate voucher={vouchers[pageIndex * 2 + 1]} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-600 bg-blue-50 p-4 rounded-md">
        <p>
          Total Vouchers: <strong>{vouchers.length}</strong>
        </p>
        <p>
          Total Pages: <strong>{Math.ceil(vouchers.length / 2)}</strong>
        </p>
      </div>
    </div>
  )
}
