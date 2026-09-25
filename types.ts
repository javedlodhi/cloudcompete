export type CloudProvider = "aws" | "azure" | "gcp" | "oci";

export type ComputePrice = {
  provider: CloudProvider;
  providerLabel: string;
  sku: string;
  instanceFamily: string;
  region: string;
  regionLabel: string;
  vcpu: number;
  memoryGiB: number;
  operatingSystem: "linux" | "windows";
  tenancy: "shared" | "dedicated";
  billingUnit: "hour";
  hourlyUsd: number;
  sourceUrl: string;
  sourceLabel: string;
  retrievedAt: string;
  isLive: boolean;
};

export type ComparisonQuery = {
  vcpu: number;
  memoryGiB: number;
  operatingSystem: "linux" | "windows";
  geo: "us-east" | "europe-west" | "middle-east";
};

export type RegionGroup = {
  id: "north-america-east" | "europe-west" | "middle-east" | "asia-pacific";
  label: string;
  members: Partial<Record<CloudProvider, { region: string; label: string }>>;
};
