import { XMLParser } from "fast-xml-parser";
const fs = require("fs");

const _in = process.argv[2];

console.log(_in);

fs.readFile(_in, "utf8", (err: Error, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  const parser = new XMLParser();
  let jsonrepr = parser.parse(data);

  console.log(jsonrepr);

  // console.log(`AMT:    CHF ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.Amt}`);
  // console.log(`REF:    ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.NtryDtls.TxDtls.RmtInf.Strd.CdtrRefInf.Ref}`);
  // console.log(`DATE:   ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.ValDt.Dt}`);
});
