import type { CloudProvider } from "./types";

export type ServiceCategory = "compute" | "storage" | "database" | "containers" | "networking";

export type ComparableService = {
  id: string;
  category: ServiceCategory;
  capability: string;
  unit: string;
  description: string;
  providers: Partial<Record<CloudProvider | "digitalocean", { product: string; notes: string }>>;
};

export const serviceCatalog: ComparableService[] = [
  {
    id: "general-compute", category: "compute", capability: "General-purpose virtual machine", unit: "instance hour",
    description: "Shared-tenancy VM sized by vCPU and memory.",
    providers: {
      aws: { product: "Amazon EC2", notes: "M-family equivalent" }, azure: { product: "Azure Virtual Machines", notes: "D-family equivalent" },
      gcp: { product: "Compute Engine", notes: "N-family equivalent" }, oci: { product: "OCI Compute", notes: "Flex VM equivalent" },
      digitalocean: { product: "Droplets", notes: "Basic / General Purpose" }
    }
  },
  {
    id: "object-storage", category: "storage", capability: "Object storage — standard tier", unit: "GB-month",
    description: "Durable, regional object storage; requests and data transfer are separate.",
    providers: {
      aws: { product: "Amazon S3 Standard", notes: "First storage tier" }, azure: { product: "Azure Blob Hot", notes: "LRS / region-specific" },
      gcp: { product: "Cloud Storage Standard", notes: "Regional storage" }, oci: { product: "OCI Object Storage", notes: "Standard storage" },
      digitalocean: { product: "Spaces", notes: "Bundled transfer applies" }
    }
  },
  {
    id: "managed-postgres", category: "database", capability: "Managed PostgreSQL", unit: "instance hour",
    description: "Managed relational database; storage, HA, and backup policies vary.",
    providers: {
      aws: { product: "Amazon RDS for PostgreSQL", notes: "Single-AZ baseline" }, azure: { product: "Azure Database for PostgreSQL", notes: "Flexible Server baseline" },
      gcp: { product: "Cloud SQL for PostgreSQL", notes: "Single-zone baseline" }, oci: { product: "OCI Base Database Service", notes: "Comparable managed database" },
      digitalocean: { product: "Managed Databases", notes: "PostgreSQL cluster" }
    }
  },
  {
    id: "managed-kubernetes", category: "containers", capability: "Managed Kubernetes control plane", unit: "cluster hour",
    description: "Control-plane cost only; worker nodes are priced independently.",
    providers: {
      aws: { product: "Amazon EKS", notes: "Per-cluster control plane" }, azure: { product: "Azure Kubernetes Service", notes: "Tier-specific control plane" },
      gcp: { product: "Google Kubernetes Engine", notes: "Management fee after free tier" }, oci: { product: "Oracle Container Engine for Kubernetes", notes: "Control plane pricing differs" }
    }
  },
  {
    id: "internet-egress", category: "networking", capability: "Internet data egress", unit: "GB",
    description: "Outbound public internet transfer, excluding free tiers and bundled allowances.",
    providers: {
      aws: { product: "AWS Data Transfer", notes: "Tiered by monthly volume" }, azure: { product: "Azure Bandwidth", notes: "Zone and destination dependent" },
      gcp: { product: "Network Internet Egress", notes: "Destination and volume dependent" }, oci: { product: "OCI Outbound Data Transfer", notes: "Monthly allowance may apply" },
      digitalocean: { product: "Droplet / Spaces transfer", notes: "Bundled allowance may apply" }
    }
  }
];

export const categories: Array<{ id: ServiceCategory; label: string; icon: string }> = [
  { id: "compute", label: "Compute", icon: "01" }, { id: "storage", label: "Storage", icon: "02" },
  { id: "database", label: "Databases", icon: "03" }, { id: "containers", label: "Containers", icon: "04" },
  { id: "networking", label: "Networking", icon: "05" }
];
