import { XMLParser } from "fast-xml-parser";

let efilename = document.getElementById("filename");
let eamt = document.getElementById("amt");
let eref = document.getElementById("ref");
let edate = document.getElementById("date");

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

function openedFileText(fileText: string, name: string) {
  let data = fileText;
  const parser = new XMLParser();
  let jsonrepr = parser.parse(data);

  console.log(jsonrepr);

  efilename!.innerHTML = name;
  eamt!.innerHTML = `AMT:    CHF ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.Amt}`;
  eref!.innerHTML = `REF:    ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.NtryDtls.TxDtls.RmtInf.Strd.CdtrRefInf.Ref}`;
  edate!.innerHTML = `DATE:   ${jsonrepr.Document.BkToCstmrDbtCdtNtfctn.Ntfctn.Ntry.ValDt.Dt}`;
}
