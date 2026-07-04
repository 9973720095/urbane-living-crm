"use client";

import { useEffect, useState, useCallback } from "react";

import {
  X,
  User,
  Phone,
  MessageCircle,
  Mail,
  Loader2,
} from "lucide-react";

import CustomerInfo from "./LeadProfileModal/CustomerInfo";
import UploadMedia from "./LeadProfileModal/UploadMedia";
import LeadGallery from "./LeadProfileModal/LeadGallery";
import CallRecordings from "./LeadProfileModal/CallRecordings";

import {
  LeadMedia,
  CallRecording,
} from "./LeadProfileModal/types";

interface Props {
  lead: any;
  onClose: () => void;
}

export default function LeadDetailsDrawer({
  lead,
  onClose,
}: Props) {

  // ==========================================================
  // STATES
  // ==========================================================

  const [media, setMedia] = useState<LeadMedia[]>([]);

  const [recordings, setRecordings] = useState<
    CallRecording[]
  >([]);

  const [loadingMedia, setLoadingMedia] =
    useState(true);

  const [loadingRecordings, setLoadingRecordings] =
    useState(true);

  const [mediaError, setMediaError] =
    useState<string | null>(null);

  const [recordingError, setRecordingError] =
    useState<string | null>(null);

  // ==========================================================
  // BODY SCROLL LOCK
  // ==========================================================

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ==========================================================
  // QUICK ACTIONS
  // ==========================================================

  const whatsappUrl = lead?.phone_number
    ? `https://wa.me/${lead.phone_number.replace(/\D/g, "")}`
    : "#";

  // ==========================================================
  // LOAD MEDIA
  // ==========================================================

  const loadMedia = useCallback(async () => {
    if (!lead?.id) return;

    setLoadingMedia(true);
    setMediaError(null);

    try {
      const res = await fetch(
        `/api/lead-media?leadId=${lead.id}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Unable to load media"
        );
      }

      setMedia(data.media || []);
    } catch (err: any) {
      console.error(err);

      setMedia([]);

      setMediaError(
        err.message || "Unable to load media"
      );
    } finally {
      setLoadingMedia(false);
    }
  }, [lead?.id]);

  // ==========================================================
  // LOAD RECORDINGS
  // ==========================================================

  const loadRecordings = useCallback(async () => {
    if (!lead?.id) return;

    setLoadingRecordings(true);

    setRecordingError(null);

    try {
      const res = await fetch(
        `/api/call-recordings?leadId=${lead.id}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Unable to load recordings"
        );
      }

      setRecordings(data.recordings || []);
    } catch (err: any) {
      console.error(err);

      setRecordings([]);

      setRecordingError(
        err.message ||
          "Unable to load recordings"
      );
    } finally {
      setLoadingRecordings(false);
    }
  }, [lead?.id]);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    if (!lead?.id) return;

    loadMedia();

    loadRecordings();
  }, [
    lead?.id,
    loadMedia,
    loadRecordings,
  ]);

  // ==========================================================
  // CLOSE
  // ==========================================================

  if (!lead) return null;

  // ==========================================================
  // UI STARTS HERE
  // ==========================================================

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}

      <div className="fixed top-0 right-0 z-50 h-screen w-full md:w-[650px] bg-white shadow-2xl overflow-y-auto">
                  {/* Header */}

        <div className="sticky top-0 z-30 bg-white border-b px-6 py-5 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Lead Details
            </h2>

            <p className="text-sm text-slate-500">
              Customer Profile
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Customer Card */}

          <div className="rounded-3xl border bg-gradient-to-r from-indigo-50 via-white to-slate-50 p-6">

            <div className="flex items-start gap-5">

              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">

                <User
                  size={30}
                  className="text-indigo-600"
                />

              </div>

              <div className="flex-1 min-w-0">

                <h2 className="text-2xl font-bold text-slate-800 truncate">

                  {lead.customer_name}

                </h2>

                <p className="text-slate-500 mt-1">

                  {lead.phone_number}

                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">

                    {lead.stage || "NEW"}

                  </span>

                  {lead.priority && (

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">

                      {lead.priority}

                    </span>

                  )}

                  {lead.tags && (

                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">

                      {lead.tags}

                    </span>

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div>

            <h3 className="text-lg font-semibold text-slate-800 mb-4">

              Quick Actions

            </h3>

            <div className="grid grid-cols-3 gap-4">

              <a
                href={`tel:${lead.phone_number}`}
                className="rounded-2xl bg-green-50 hover:bg-green-100 transition p-5 text-center border"
              >

                <Phone
                  className="mx-auto text-green-600"
                  size={24}
                />

                <p className="mt-3 text-sm font-medium">

                  Call

                </p>

              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition p-5 text-center border"
              >

                <MessageCircle
                  className="mx-auto text-emerald-600"
                  size={24}
                />

                <p className="mt-3 text-sm font-medium">

                  WhatsApp

                </p>

              </a>

              <a
                href={`mailto:${lead.email}`}
                className="rounded-2xl bg-blue-50 hover:bg-blue-100 transition p-5 text-center border"
              >

                <Mail
                  className="mx-auto text-blue-600"
                  size={24}
                />

                <p className="mt-3 text-sm font-medium">

                  Email

                </p>

              </a>

            </div>

          </div>

          {/* Customer Information */}

          <CustomerInfo
            lead={lead}
          />

          {/* Upload Media */}

          <UploadMedia
            leadId={lead.id}
            onUploaded={loadMedia}
          />

          {/* Gallery */}

          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-lg font-semibold">

                Customer Media

              </h3>

              {loadingMedia && (

                <Loader2
                  size={20}
                  className="animate-spin text-slate-500"
                />

              )}

            </div>
                        {mediaError ? (

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                <p className="text-red-600 text-sm">

                  {mediaError}

                </p>

                <button
                  onClick={loadMedia}
                  className="mt-4 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                >
                  Retry
                </button>

              </div>

            ) : (

              <LeadGallery
                media={media}
                onDeleted={loadMedia}
              />

            )}

          </div>

          {/* ========================================= */}
          {/* CALL RECORDINGS */}
          {/* ========================================= */}

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold">

                Call Recordings

              </h3>

              {loadingRecordings && (

                <Loader2
                  size={20}
                  className="animate-spin text-slate-500"
                />

              )}

            </div>

            {recordingError ? (

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                <p className="text-red-600">

                  {recordingError}

                </p>

                <button
                  onClick={loadRecordings}
                  className="mt-4 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                >
                  Retry
                </button>

              </div>

            ) : (

     <CallRecordings
    recordings={[]}
    loading={false}
/>

            )}

          </div>

          {/* ========================================= */}
          {/* CREATED INFO */}
          {/* ========================================= */}

          <div className="rounded-3xl border p-5 bg-slate-50">

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-500">

                  Created At

                </p>

                <p className="font-semibold mt-2">

                  {new Date(
                    lead.createdAt
                  ).toLocaleString()}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-500">

                  Updated At

                </p>

                <p className="font-semibold mt-2">

                  {new Date(
                    lead.updatedAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          </div>
                  </div>

      </div>

    </>

  );
}