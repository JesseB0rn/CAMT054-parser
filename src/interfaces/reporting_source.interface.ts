export enum ReportingSoruce {
  C53F,
  C53C,
  C52F,
  C52C,
  DBTN,
  CDTN,
  OTHR,
}

export function reportingSoruceMap(source: string): ReportingSoruce {
  switch (source) {
    case "C53F":
      return 0;
    case "C53C":
      return 1;
    case "C52F":
      return 2;
    case "C52C":
      return 3;
    case "DBTN":
      return 4;
    case "CDTN":
      return 5;
    case "OTHR":
      return 6;
  }
}
