// ==========================================
// Timeline
// ==========================================

export interface TimelineActivity {
  id: string;

  type: string;

  oldStatus?: string | null;

  newStatus?: string | null;

  note?: string | null;

  performedBy?: string | null;

  createdAt: string;
}

// ==========================================
// Timeline Component
// ==========================================

export interface TimelineProps {
  leadId: string;
}

export interface TimelineCardProps {
  activity: TimelineActivity;
}

// ==========================================
// Customer Information
// ==========================================

export interface CustomerInfoProps {
  lead: any;
}

// ==========================================
// Lead Media
// ==========================================

export type LeadMediaType =
  | "PHOTO"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT";

export interface LeadMedia {
  id: string;

  type: LeadMediaType;

  fileName: string;

  fileUrl: string;

  caption?: string | null;

  fileSize?: number | null;

  createdAt: string;
}

export interface UploadMediaProps {
  leadId: string;

  onUploaded?: () => Promise<void> | void;
}

export interface LeadGalleryProps {
  media: LeadMedia[];

  onDeleted?: () => Promise<void> | void;
}

export interface GalleryCardProps {
  item: LeadMedia;

  deletingId: string | null;

  onPreview: (media: LeadMedia) => void;

  onDelete: (id: string) => Promise<boolean>;
}

export interface MediaPreviewProps {
  media: LeadMedia | null;

  deletingId: string | null;

  open: boolean;

  onClose: () => void;

  onDelete: (id: string) => Promise<boolean>;
}

export interface GalleryFiltersProps {
  search: string;

  setSearch: (value: string) => void;

  filter: LeadMediaType | "ALL";

  setFilter: (
    value: LeadMediaType | "ALL"
  ) => void;
}

// ==========================================
// Call Recordings
// ==========================================

export interface CallRecording {
  id: string;

  direction:
    | "INCOMING"
    | "OUTGOING";

  phoneNumber: string;

  employeeName?: string | null;

  duration: number;

  recordingUrl: string;

  createdAt: string;
}

export interface CallRecordingsProps {
  leadId: string;

  recordings?: CallRecording[];

  loading?: boolean;

  onDelete?: (
    id: string
  ) => Promise<void> | void;
}