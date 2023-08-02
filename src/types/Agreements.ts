export type AgreementDocument = {
  id: string;
  title: string;
  type: string;
  url: string;
  support_documents: AgreementDocument[];
};

export enum AgreementType {
  DRIVER = "driver",
  SHIPPER = "shipper",
}
