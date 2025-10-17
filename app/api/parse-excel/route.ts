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
    const workbook = XLSX.read(buffer, { type: "array", cellDates: false })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { raw: true })

    console.log("Excel Headers:", Object.keys(data[0]))
    console.log("Sample Rows (first 3):", data.slice(0, 3))

    const vouchers: VoucherData[] = data.map((row, index) => {
      const indusId = row["Indus ID"] || row["IndusID"] || ""
      const remarks = row.Remarks || ""
      const combinedRemarks = indusId ? `${indusId} - ${remarks}` : remarks

      // ✅ Convert Excel numeric date serial to DD-MM-YYYY
      const dateValue = row.Date
      const formattedDate =
        typeof dateValue === "number"
          ? excelSerialToDate(dateValue)
          : String(dateValue)

      return {
        voucherNo: String(Number.parseInt(startingVoucherNo) + index),
        date: formattedDate,
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

/**
 * ✅ Converts Excel date serial number to "DD-MM-YYYY"
 */
function excelSerialToDate(serial: number): string {
  const excelEpoch = new Date(1900, 0, serial - 1)
  const day = String(excelEpoch.getDate()).padStart(2, "0")
  const month = String(excelEpoch.getMonth() + 1).padStart(2, "0")
  const year = excelEpoch.getFullYear()
  return `${day}-${month}-${year}`
}
