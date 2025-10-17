import type { VoucherData } from "@/types/voucher";

interface VoucherTemplateProps {
  voucher: VoucherData;
}

export default function VoucherTemplate({ voucher }: VoucherTemplateProps) {
  return (
    <div
      style={{
        minHeight: "120mm",
        border: "2px solid black",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        marginBottom: "10mm", // ✅ This gives space between printed vouchers
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>
          SRI MANJUNATH TECHNICAL SERVICES
        </h2>
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>
          MCH NUMBER 8-3-1113/2D, OPP CHOP STICKS RESTARUANT, KESAVA NAGAR, SRINAGAR COLONY, HYDERABAD-500073
        </div>
        <h3 style={{ marginTop: "8px", fontWeight: "bold", textDecoration: "underline" }}>
          PAYMENT DEBIT VOUCHER
        </h3>
      </div>

      {/* Voucher No & Date */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <div>
          <strong>Voucher No -</strong>{" "}
          <span style={{ display: "inline-block", borderBottom: "1px solid black", width: "150px" }}>
            {voucher.voucherNo}
          </span>
        </div>
        <div>
          <strong style={{ textDecoration: "underline" }}>Date -</strong>{" "}
          <span style={{ display: "inline-block", borderBottom: "1px solid black", width: "150px" }}>
            {voucher.date}
          </span>
        </div>
      </div>

      {/* A/C Head */}
      <div style={{ marginBottom: "12px" }}>
        <strong>A/C Head </strong>{" "}
        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "500px" }}>
          Civil & Electrical
        </span>
      </div>

      {/* Paid To */}
      <div style={{ marginBottom: "12px" }}>
        <strong>Paid To Mr </strong>{" "}
        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "500px" }}>
          {voucher.paidTo}
        </span>
      </div>

      {/* ✅ Towards – Single line with underline */}
      <div style={{ marginBottom: "16px" }}>
        <strong>Towards </strong>
        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "500px" }}>
          {voucher.remarks}
        </span>
      </div>

      {/* ✅ Cash / Cheque Details & On: Rupees – All inline with underline */}
     <div
  style={{
    marginBottom: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "clamp(9px, 1vw, 12px)", // ⬇ smaller font range (9–11px)
    lineHeight: "1.2", // tighten vertical space
  }}
>
  <strong style={{ fontWeight: 600 }}>By Cash/Cheque/DD No :</strong>{" "}
  <span
    style={{
      borderBottom: "1px solid black",
      display: "inline-block",
      width: "35px",
      marginRight: "6px",
    }}
  >
    Cash
  </span>
  <strong style={{ marginRight: "4px", fontWeight: 600 }}>Date :</strong>{" "}
  <span
    style={{
      borderBottom: "1px solid black",
      display: "inline-block",
      width: "55px",
      marginRight: "6px",
    }}
  >
    {voucher.date}
  </span>
  <strong style={{ marginRight: "2px", fontWeight: 600 ,marginLeft:3}}>On: Rupees</strong>{" "}
  <span
    style={{
      borderBottom: "1px solid black",
      display: "inline-block",
      width: "200px", // ⬇ slightly narrower to fit better
    }}
  >
    {voucher.words}
  </span>
</div>



      {/* Amount Row */}
     <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" ,width:200,marginLeft:60}}>
  {/* Rs Box */}
  <div
    style={{
      backgroundColor: "black",
      color: "white",
      padding: "6px 20px",
      fontWeight: "bold",
      fontSize: "14px",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
    }}
  >
    Rs
  </div>

  {/* Amount Box */}
  <div
    style={{
      border: "1px solid black",
      borderLeft: "none", // join with Rs box
      flex: 1,
      padding: "6px 12px",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      backgroundColor: "transparent",
      width:40
    }}
  >
    {voucher.amount}
  </div>
</div>


      {/* Signature Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderTop: "1px solid black", width: "140px", margin: "0 auto 4px" }}></div>
          <strong>Prepared By</strong>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderTop: "1px solid black", width: "140px", margin: "0 auto 4px" }}></div>
          <strong>Receivers Signature</strong>
        </div>
      </div>
    </div>
  );
}
