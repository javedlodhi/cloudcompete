import type { ComparisonQuery, ComputePrice } from "./types";

const RETRIEVED_AT = "2026-09-26T08:00:00.000Z";

export const demoPrices: ComputePrice[] = [
  { provider: "aws", providerLabel: "AWS", sku: "m6i.xlarge", instanceFamily: "General purpose", region: "us-east-1", regionLabel: "US East (N. Virginia)", vcpu: 4, memoryGiB: 16, operatingSystem: "linux", tenancy: "shared", billingUnit: "hour", hourlyUsd: 0.192, sourceUrl: "https://aws.amazon.com/ec2/pricing/on-demand/", sourceLabel: "AWS EC2 public pricing", retrievedAt: RETRIEVED_AT, isLive: false },
  { provider: "azure", providerLabel: "Azure", sku: "Standard_D4s_v5", instanceFamily: "General purpose", region: "eastus", regionLabel: "East US", vcpu: 4, memoryGiB: 16, operatingSystem: "linux", tenancy: "shared", billingUnit: "hour", hourlyUsd: 0.192, sourceUrl: "https://prices.azure.com/api/retail/prices", sourceLabel: "Azure Retail Prices API", retrievedAt: RETRIEVED_AT, isLive: false },
  { provider: "gcp", providerLabel: "Google Cloud", sku: "n2-standard-4", instanceFamily: "General purpose", region: "us-east4", regionLabel: "Northern Virginia", vcpu: 4, memoryGiB: 16, operatingSystem: "linux", tenancy: "shared", billingUnit: "hour", hourlyUsd: 0.194, sourceUrl: "https://cloud.google.com/compute/vm-instance-pricing", sourceLabel: "Google Cloud public pricing", retrievedAt: RETRIEVED_AT, isLive: false },
  { provider: "oci", providerLabel: "Oracle Cloud", sku: "VM.Standard.E5.Flex", instanceFamily: "Flexible VM", region: "us-ashburn-1", regionLabel: "US East (Ashburn)", vcpu: 4, memoryGiB: 16, operatingSystem: "linux", tenancy: "shared", billingUnit: "hour", hourlyUsd: 0.17, sourceUrl: "https://www.oracle.com/cloud/price-list/", sourceLabel: "OCI public price list", retrievedAt: RETRIEVED_AT, isLive: false }
];

export function matchDemoPrices(query: ComparisonQuery): ComputePrice[] {
  return demoPrices
    .filter((price) => price.operatingSystem === query.operatingSystem)
    .sort((a, b) => a.hourlyUsd - b.hourlyUsd);
}
