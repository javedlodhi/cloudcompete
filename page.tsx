"use client";

import { FormEvent, useMemo, useState } from "react";
import { categories, serviceCatalog, type ServiceCategory } from "../lib/catalog";
import { demoPrices } from "../lib/fixtures";
import type { ComputePrice } from "../lib/types";

const formatUsd = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", minimumFractionDigits: 3, maximumFractionDigits: 3
}).format(amount);

export default function Home() {
  const [category, setCategory] = useState<ServiceCategory>("compute");
  const [serviceId, setServiceId] = useState("general-compute");
  const [vcpu, setVcpu] = useState(4);
  const [memory, setMemory] = useState(16);
  const [os, setOs] = useState<"linux" | "windows">("linux");
  const [prices, setPrices] = useState<ComputePrice[]>(demoPrices);
  const [loading, setLoading] = useState(false);
  const monthlyHours = 730;
  const cheapest = useMemo(() => Math.min(...prices.map((item) => item.hourlyUsd)), [prices]);
  const visibleServices = serviceCatalog.filter((service) => service.category === category);
  const selectedService = serviceCatalog.find((service) => service.id === serviceId) ?? serviceCatalog[0];

  async function compare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/comparisons?vcpu=${vcpu}&memoryGiB=${memory}&os=${os}`);
      const result = await response.json() as { prices: ComputePrice[] };
      setPrices(result.prices);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav className="nav"><a className="brand" href="#top">CloudRate<span>•</span></a><div className="nav-links"><a href="#estimator">Estimator</a><a href="#catalog">Service catalog</a><a href="#methodology">Methodology</a></div></nav>
      <section className="hero" id="top">
        <p className="eyebrow">AWS · AZURE · GOOGLE CLOUD · ORACLE CLOUD</p>
        <h1>Understand your<br />multi-cloud bill.</h1>
        <p className="lede">Compare equivalent cloud services, public list rates, and regional availability before you commit to an architecture.</p>
      </section>
      <section className="workspace" id="estimator" aria-label="Cloud service comparison">
        <div className="estimator-head"><div><p className="eyebrow">PRICING ESTIMATOR</p><h2>Build a comparable workload</h2></div><span className="step">Step 1 of 3 · Choose a service</span></div>
        <div className="category-tabs" role="tablist" aria-label="Service categories">{categories.map((item) => <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => { setCategory(item.id); setServiceId(serviceCatalog.find((service) => service.category === item.id)?.id ?? "general-compute"); }}><small>{item.icon}</small>{item.label}</button>)}</div>
        <div className="service-picker"><div><label htmlFor="service">Comparable service</label><select id="service" value={serviceId} onChange={(event) => setServiceId(event.target.value)}>{visibleServices.map((service) => <option key={service.id} value={service.id}>{service.capability}</option>)}</select><p>{selectedService.description}</p></div><div className="provider-map"><span>Maps to</span>{Object.entries(selectedService.providers).map(([provider, item]) => <div key={provider}><strong>{provider.toUpperCase()}</strong><span>{item?.product}</span></div>)}</div></div>
        {selectedService.category === "compute" ? <><form className="controls" onSubmit={compare}>
          <label>Service<select defaultValue="compute" disabled><option value="compute">Virtual machines</option></select></label>
          <label>vCPU<input type="number" min="1" max="128" value={vcpu} onChange={(event) => setVcpu(Number(event.target.value))} /></label>
          <label>Memory (GiB)<input type="number" min="1" max="1024" value={memory} onChange={(event) => setMemory(Number(event.target.value))} /></label>
          <label>Operating system<select value={os} onChange={(event) => setOs(event.target.value as "linux" | "windows")}><option value="linux">Linux</option><option value="windows">Windows</option></select></label>
          <button type="submit" disabled={loading}>{loading ? "Comparing…" : "Compare rates"}</button>
        </form>
        <div className="notice"><strong>Prototype data</strong><span>Live catalog adapters are not connected yet. The displayed compute rates are a static sample and are not purchase-ready.</span></div>
        <div className="table-wrap"><table>
          <thead><tr><th>Provider</th><th>Closest public SKU</th><th>Region</th><th>Configuration</th><th>Hourly</th><th>Est. monthly</th><th>Source</th></tr></thead>
          <tbody>{prices.map((price) => <tr key={price.provider}>
            <td><span className={`provider ${price.provider}`}>{price.providerLabel}</span>{price.hourlyUsd === cheapest && <small>Lowest shown</small>}</td>
            <td><strong>{price.sku}</strong><span className="subtle">{price.instanceFamily}</span></td>
            <td>{price.regionLabel}<span className="subtle">{price.region}</span></td>
            <td>{price.vcpu} vCPU · {price.memoryGiB} GiB<span className="subtle">{price.operatingSystem} · shared</span></td>
            <td className="money">{formatUsd(price.hourlyUsd)}</td>
            <td className="money">{formatUsd(price.hourlyUsd * monthlyHours)}</td>
            <td><a href={price.sourceUrl} target="_blank" rel="noreferrer">View source ↗</a><span className="subtle">List price</span></td>
          </tr>)}</tbody>
        </table></div></> : <div className="coming-soon"><strong>Pricing adapter pending</strong><span>{selectedService.capability} is mapped across providers and ready for catalog ingestion. Add this provider-specific rate adapter before displaying estimates.</span></div>}
      </section>
      <section className="catalog" id="catalog"><div><p className="eyebrow">SERVICE CATALOG</p><h2>Start with a workload,<br />not a provider name.</h2></div><div className="catalog-list">{serviceCatalog.map((service) => <article key={service.id}><span>{categories.find((item) => item.id === service.category)?.label}</span><h3>{service.capability}</h3><p>{service.description}</p><small>{Object.keys(service.providers).length} providers mapped · {service.unit}</small></article>)}</div></section>
      <section className="principles" id="methodology"><div><p className="eyebrow">HOW TO READ THIS</p><h2>Comparable, not identical.</h2></div><p>Cloud SKUs differ in CPU generation, network performance, local storage, service limits, and licensing. CloudRate makes those differences visible and always exposes the provider’s original public rate.</p><p>Monthly estimates use 730 hours. Taxes, support plans, egress, committed-use discounts, and negotiated prices are excluded.</p></section>
      <footer>CloudRate prototype · Public list prices in USD · Updated from provider catalogs</footer>
    </main>
  );
}
