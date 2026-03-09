import crypto from "node:crypto";

const VNPAY_URL = process.env.VNPAY_URL ?? "https://sandbox.vnpayment.vn/paymentv2/vpcpay";

export function createVnpayPaymentUrl(params: {
  tmnCode: string;
  hashSecret: string;
  amount: number; // VND
  txnRef: string;
  orderInfo: string;
  returnUrl: string;
  ipnUrl?: string;
  locale?: "vn" | "en";
}): string {
  const {
    tmnCode,
    hashSecret,
    amount,
    txnRef,
    orderInfo,
    returnUrl,
    ipnUrl,
    locale = "vn",
  } = params;

  const vnpParams: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: String(Math.round(amount) * 100), // VNPay yêu cầu x100
    vnp_CurrCode: "VND",
    vnp_TxnRef: txnRef,
    vnp_OrderInfo: orderInfo.slice(0, 255),
    vnp_OrderType: "other",
    vnp_Locale: locale,
    vnp_ReturnUrl: returnUrl,
    vnp_CreateDate: new Date()
      .toISOString()
      .replace(/[-:T.Z]/g, "")
      .slice(0, 14),
  };
  if (ipnUrl) vnpParams.vnp_IpnUrl = ipnUrl;

  const sortedKeys = Object.keys(vnpParams).sort();
  const signData = sortedKeys
    .map((k) => `${k}=${encodeURIComponent(vnpParams[k])}`)
    .join("&");
  const hmac = crypto.createHmac("sha512", hashSecret);
  hmac.update(Buffer.from(signData, "utf8"));
  const vnpSecureHash = hmac.digest("hex");

  const query = new URLSearchParams({ ...vnpParams, vnp_SecureHash: vnpSecureHash });
  return `${VNPAY_URL}?${query.toString()}`;
}

export function verifyVnpayReturn(query: Record<string, string>, hashSecret: string): boolean {
  const secureHash = query.vnp_SecureHash ?? query.vnp_SecureHashType;
  if (!secureHash) return false;

  const sortedKeys = Object.keys(query)
    .filter((k) => !k.startsWith("vnp_SecureHash") && !k.startsWith("vnp_SecureHashType"))
    .sort();
  const signData = sortedKeys
    .map((k) => `${k}=${encodeURIComponent(query[k])}`)
    .join("&");
  const hmac = crypto.createHmac("sha512", hashSecret);
  hmac.update(Buffer.from(signData, "utf8"));
  const expected = hmac.digest("hex");
  return expected === secureHash;
}
