"use client";

import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";

interface Props {
  leads: any[];
  refresh: () => void;
}

export default function CeilingLeads({
  leads,
  refresh,
}: Props) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("ALL");
  const [sort, setSort] = useState("LATEST");

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  const updateStage = async (
    id: string,
    stage: string
  ) => {
    try {
      setLoadingId(id);

      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage,
        }),
      });

      refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredLeads = useMemo(() => {
    let data = [...leads];

    // Search
    if (search) {
      data = data.filter(
        (lead) =>
          lead.customer_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          lead.phone_number
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          lead.city
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // Stage filter
    if (stage !== "ALL") {
      data = data.filter(
        (lead) => lead.stage === stage
      );
    }

    // Sort
    switch (sort) {
      case "OLDEST":
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      case "A_Z":
        data.sort((a, b) =>
          a.customer_name.localeCompare(
            b.customer_name
          )
        );
        break;

      case "Z_A":
        data.sort((a, b) =>
          b.customer_name.localeCompare(
            a.customer_name
          )
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return data;
  }, [leads, search, stage, sort]);

  const getBadgeClass = (stage: string) => {
    switch (stage) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "MEETING_FIXED":
        return "bg-blue-100 text-blue-700";

      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";

      case "CALL_SCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      case "FOLLOWUP":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">

      <FilterBar
        search={search}
        setSearch={setSearch}
        stage={stage}
        setStage={setStage}
        sort={sort}
        setSort={setSort}
      />

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="p-5 border-b flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Ceiling Leads
            </h2>

            <p className="text-sm text-slate-500">
              {filteredLeads.length} leads found
            </p>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="text-left">
                  Phone
                </th>

                <th className="text-left">
                  City
                </th>

                <th className="text-left">
                  Stage
                </th>

                <th className="text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4">

                    <div className="font-semibold">
                      {lead.customer_name}
                    </div>

                    <div className="text-xs text-slate-400">
                      {lead.email}
                    </div>

                  </td>

                  <td>
                    {lead.phone_number}
                  </td>

                  <td>
                    {lead.city}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(
                        lead.stage
                      )}`}
                    >
                      {lead.stage}
                    </span>

                  </td>

                  <td className="space-x-1">

                    {loadingId === lead.id ? (
                      <span className="text-indigo-600 text-xs">
                        Updating...
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            updateStage(
                              lead.id,
                              "CALL_SCHEDULED"
                            )
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Call
                        </button>

                        <button
                          onClick={() =>
                            updateStage(
                              lead.id,
                              "MEETING_FIXED"
                            )
                          }
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Meeting
                        </button>

                        <button
                          onClick={() =>
                            updateStage(
                              lead.id,
                              "SITE_VISIT"
                            )
                          }
                          className="bg-purple-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Site
                        </button>

                        <button
                          onClick={() =>
                            updateStage(
                              lead.id,
                              "CONFIRMED"
                            )
                          }
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          ✓
                        </button>

                        <button
                          onClick={() =>
                            updateStage(
                              lead.id,
                              "REJECTED"
                            )
                          }
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          ✕
                        </button>
                      </>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}