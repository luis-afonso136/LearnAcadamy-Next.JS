declare module "jspdf-autotable" {
    import { jsPDF } from "jspdf";
    declare module "jspdf" {
      interface jsPDF {
        autoTable: any;
      }
    }
  }
  