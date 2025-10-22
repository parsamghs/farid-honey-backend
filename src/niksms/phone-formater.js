export function toNikMsisdn(msisdn) {
  const d = msisdn.replace(/\D/g, "");
  if (d.startsWith("98")) return d;
  if (d.startsWith("0")) return "98" + d.slice(1);
  if (d.length === 10 && d.startsWith("9")) return "98" + d;
  return d;
}
