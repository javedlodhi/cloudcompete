# CloudRate

Public cloud list-price comparison MVP for AWS, Azure, Google Cloud, and OCI.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current scope

The UI provides an estimator-style discovery experience for compute, storage, databases, containers, and networking. Its executable comparison currently covers on-demand shared Linux or Windows virtual-machine entries and estimates monthly cost with 730 hours. It deliberately labels the included data as **prototype data**: rates are static samples until catalog ingestion is enabled.

## Live-price ingestion design

Do not call provider catalog endpoints directly from the browser. Fetch and normalize rates in a server-side scheduled job, persist a timestamped price history, and serve comparisons from the database/cache.

| Provider | Public catalog source | Integration note |
| --- | --- | --- |
| Azure | Azure Retail Prices API | Unauthenticated public retail rates; filter and follow pagination. |
| AWS | AWS Price List API / bulk price files | Query APIs require AWS authentication; bulk catalogs are suitable for scheduled parsing. |
| Google Cloud | Cloud Billing Catalog API | Public SKU catalog; requires a Google Cloud API key/project. |
| OCI | OCI price list / CLI | Use OCI’s published price list through an authenticated server-side integration. |

## Next implementation milestones

1. Add PostgreSQL tables for `provider_skus`, `normalized_prices`, and `price_snapshots`.
2. Implement one adapter at a time, beginning with Azure’s retail endpoint.
3. Create a scheduled ingestion job with retry, pagination, change detection, and source snapshot timestamps.
4. Add a region-equivalence map rather than claiming that differently located regions are directly equivalent.
5. Extend categories to object storage, managed databases, egress, and Kubernetes.

## Pricing caveat

Displayed list rates exclude taxes, support, data transfer, licensing exceptions, commitment discounts, and negotiated enterprise pricing. Instance configurations are similar—not identical—across clouds.
