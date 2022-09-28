import "./styles/main.scss";
import { X2jOptions, XMLParser } from "fast-xml-parser";

let efilename = document.getElementById("filename");
let etransactions = document.getElementById("transactions");

function preventDefault(event: DragEvent) {
  event.preventDefault();
}
document.documentElement.addEventListener("dragover", preventDefault);
document.documentElement.addEventListener("drop", async (event: DragEvent) => {
  event.preventDefault();

  if (event.dataTransfer == null) return;
  let item = event.dataTransfer.items[0];
  if (item.kind === "file") {
    let file = item.getAsFile();
    if (file != null) {
      openedFile(file);
    }
  }
});

async function openedFile(file: File) {
  openedFileText(await file.text(), file.name);
}

function buildTxHTML(amount: number, ref: string, date: string) {
  return `

    <h2>Details für TX ${ref}</h2>
    <p class="ref">Ref: ${ref}</p>
    <p>Total: CHF ${amount}</p>
    <p>Datum: ${date}</p>
    <hr/>
  `;
}

function openedFileText(fileText: string, name: string) {
  let data = fileText;
  const options: Partial<X2jOptions> = {
    numberParseOptions: {
      leadingZeros: false,
      hex: true,
      skipLike: /[\s\S]*/,
    },
  };
  const parser = new XMLParser(options);
  let jsonrepr = parser.parse(data);

  // console.log(jsonrepr);

  // check number of entries
  const entryCnt = jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.NtryDtls.Btch.NbOfTxs;
  console.log(`we've gotten notice of ${entryCnt} TX's`);

  // get all TX dtls
  let txDtls: any[] = [];

  if (entryCnt == 1) {
    txDtls.push(jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.NtryDtls.TxDtls);
  } else {
    txDtls = [...jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.NtryDtls.TxDtls];
  }
  console.log(txDtls);

  efilename!.innerHTML = name;

  let html = "";
  txDtls.forEach((dtls) => {
    html += buildTxHTML(dtls.Amt, dtls.RmtInf.Strd.CdtrRefInf.Ref, jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.ValDt.Dt);
  });
  etransactions!.innerHTML = html;
}
