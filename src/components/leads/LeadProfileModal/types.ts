// ================================
// Lead Media Types
// ================================

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

// ================================
// Upload Component
// ================================

export interface UploadMediaProps {
  leadId: string;

  onUploaded?: () => Promise<void> | void;
}

// ================================
// Gallery Component
// ================================

export interface LeadGalleryProps {
  media: LeadMedia[];

  onDeleted?: () => Promise<void> | void;
}

// ================================
// Gallery Card
// ================================

export interface GalleryCardProps {
  item: LeadMedia;

  deletingId: string | null;

  onPreview: (media: LeadMedia) => void;

  onDelete: (id: string) => Promise<boolean>;
}

// ================================
// Media Preview
// ================================

export interface MediaPreviewProps {
  media: LeadMedia | null;

  deletingId: string | null;

  open: boolean;

  onClose: () => void;

  onDelete: (id: string) => Promise<boolean>;
}

// ================================
// Gallery Filters
// ================================

export interface GalleryFiltersProps {
  search: string;

  setSearch: (value: string) => void;

  filter: LeadMediaType | "ALL";

  setFilter: (
    value: LeadMediaType | "ALL"
  ) => void;
}

// ================================
// Customer Info
// ================================

export interface CustomerInfoProps {
  lead: any;
}
// ================================
// Call Recordings
// ================================

export interface CallRecording {
  id: string;

  direction: "INCOMING" | "OUTGOING";

  phoneNumber: string;

  employeeName?: string | null;

  duration: number;

  recordingUrl: string;

  createdAt: string;
}

export interface CallRecordingsProps {
  recordings: CallRecording[];

  loading?: boolean;

  onDelete?: (id: string) => Promise<void> | void;
}