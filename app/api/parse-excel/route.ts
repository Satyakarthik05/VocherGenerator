import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"
import type { VoucherData, ExcelRow } from "@/types/voucher"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const startingVoucherNo = formData.get("startingVoucherNo") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: "array" })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet)
    console.log("Excel Headers:", Object.keys(data[0]))

    const vouchers: VoucherData[] = data.map((row, index) => {
      const indusId = row["Indus ID"] || row["IndusID"] || ""
      const remarks = row.Remarks || ""
      const combinedRemarks = indusId ? `${indusId} - ${remarks}` : remarks

      return {
        voucherNo: String(Number.parseInt(startingVoucherNo) + index),
        date: formatDate(row.Date),
        paidTo: row["Paid to "] || row["Paid to"] || "",
        remarks: combinedRemarks,
        amount: String(row.Amount),
        words: row.Words,
      }
    })

    return NextResponse.json({ vouchers })
  } catch (error) {
    console.error("Error parsing Excel:", error)
    return NextResponse.json({ error: "Failed to parse Excel file" }, { status: 500 })
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    return `${day}-${month}-${year}`
  } catch {
    return dateString
  }
}
