export interface VoucherData {
  voucherNo: string
  date: string
  paidTo: string
  remarks: string
  amount: string
  words: string
}

export interface ExcelRow {
  "S. No.": number
  Date: string
  "Indus ID": string
  "Paid to": string
  Remarks: string
  Amount: number
  Words: string
}
