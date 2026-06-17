"use client";

import StatsCards from "./StatsCards";

interface Props {
  leads: any[];
}

export default function DashboardStats({
  leads = [],
}: Props) {
  const total = leads.length;

  const newLeads = leads.filter(
    (l) => l.stage === "NEW"
  ).length;

  const calls = leads.filter(
    (l) =>
      l.stage === "CALL_SCHEDULED" ||
      l.stage === "FOLLOWUP"
  ).length;

  const meetings = leads.filter(
    (l) => l.stage === "MEETING_FIXED"
  ).length;

  const siteVisits = leads.filter(
    (l) => l.stage === "SITE_VISIT"
  ).length;

  const confirmed = leads.filter(
    (l) => l.stage === "CONFIRMED"
  ).length;

  const rejected = leads.filter(
    (l) => l.stage === "REJECTED"
  ).length;

  const activeLeads = leads.filter(
    (lead) =>
      lead.stage !== "CONFIRMED" &&
      lead.stage !== "REJECTED"
  ).length;

  const conversion =
    total === 0
      ? 0
      : Number(
          ((confirmed / total) * 100).toFixed(1)
        );

  const stats = [
    {
      title: "Total Leads",
      value: total,
      icon: "📊",
      color: "bg-white",
      trend: "+12%",
    },

    {
      title: "New Leads",
      value: newLeads,
      icon: "🆕",
      color: "bg-blue-50",
      trend: "+8%",
    },

    {
      title: "Calls",
      value: calls,
      icon: "📞",
      color: "bg-yellow-50",
      trend: "+6%",
    },

    {
      title: "Meetings",
      value: meetings,
      icon: "🤝",
      color: "bg-indigo-50",
      trend: "+7%",
    },

    {
      title: "Site Visits",
      value: siteVisits,
      icon: "🏠",
      color: "bg-purple-50",
      trend: "+4%",
    },

    {
      title: "Won Deals",
      value: confirmed,
      icon: "🏆",
      color: "bg-green-50",
      trend: "+15%",
    },

    {
      title: "Rejected",
      value: rejected,
      icon: "❌",
      color: "bg-red-50",
      trend: "-3%",
    },

    {
      title: "Conversion %",
      value: conversion,
      icon: "🚀",
      color: "bg-emerald-50",
      trend: `${conversion}%`,
    },

    {
      title: "Active Leads",
      value: activeLeads,
      icon: "🔥",
      color: "bg-orange-50",
      trend: "+10%",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-5
      "
    >
      {stats.map((item) => (
        <StatsCards
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          trend={item.trend}
        />
      ))}
    </div>
  );
}