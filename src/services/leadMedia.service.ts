import { LeadMediaRepository } from "@/repositories/leadMedia.repository";

export class LeadMediaService {
  private repository = new LeadMediaRepository();

  /**
   * Upload Media
   */
  async uploadMedia(data: any) {
    if (!data.leadId) {
      throw new Error("Lead ID is required");
    }

    if (!data.fileUrl) {
      throw new Error("File URL is required");
    }

    if (!data.fileName) {
      throw new Error("File name is required");
    }

    if (!data.type) {
      throw new Error("Media type is required");
    }

    return this.repository.create({
      leadId: data.leadId,
      uploadedById: data.uploadedById || null,
      type: data.type,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize || null,
      caption: data.caption || null,
    });
  }

  /**
   * Get Media by ID
   */
  async getMediaById(id: string) {
    const media = await this.repository.getById(id);

    if (!media) {
      throw new Error("Media not found");
    }

    return media;
  }

  /**
   * Get All Lead Media
   */
  async getLeadMedia(leadId: string) {
    return this.repository.getLeadMedia(leadId);
  }

  /**
   * Photos
   */
  async getPhotos(leadId: string) {
    return this.repository.getPhotos(leadId);
  }

  /**
   * Videos
   */
  async getVideos(leadId: string) {
    return this.repository.getVideos(leadId);
  }

  /**
   * Audio
   */
  async getAudios(leadId: string) {
    return this.repository.getAudios(leadId);
  }

  /**
   * Documents
   */
  async getDocuments(leadId: string) {
    return this.repository.getDocuments(leadId);
  }

  /**
   * Latest Uploads
   */
  async getLatestMedia(limit = 20) {
    return this.repository.getLatest(limit);
  }

  /**
   * Update Caption
   */
  async updateMedia(
    id: string,
    data: {
      caption?: string;
      fileName?: string;
    }
  ) {
    return this.repository.update(id, data);
  }

  /**
   * Delete Media
   */
  async deleteMedia(id: string) {
    const media = await this.repository.getById(id);

    if (!media) {
      throw new Error("Media not found");
    }

    return this.repository.delete(id);
  }

  /**
   * Delete All Media
   */
  async deleteLeadMedia(leadId: string) {
    return this.repository.deleteLeadMedia(leadId);
  }

  /**
   * Search
   */
  async searchMedia(
    leadId: string,
    keyword: string
  ) {
    return this.repository.search(
      leadId,
      keyword
    );
  }

  /**
   * Count
   */
  async countMedia(leadId: string) {
    return this.repository.count(leadId);
  }

  /**
   * Summary
   */
  async getSummary(leadId: string) {
    return this.repository.getSummary(
      leadId
    );
  }

  /**
   * Dashboard Statistics
   */
  async getStatistics() {
    return this.repository.getStatistics();
  }

  /**
   * Validate File Type
   */
  validateMediaType(type: string) {
    const allowed = [
      "PHOTO",
      "VIDEO",
      "AUDIO",
      "DOCUMENT",
    ];

    if (!allowed.includes(type)) {
      throw new Error("Invalid media type");
    }

    return true;
  }

  /**
   * Validate File Size
   */
  validateFileSize(
    size: number,
    maxMB = 100
  ) {
    const max =
      maxMB * 1024 * 1024;

    if (size > max) {
      throw new Error(
        `Maximum ${maxMB}MB allowed`
      );
    }

    return true;
  }

  /**
   * Validate Upload
   */
  async validateUpload(data: any) {
    this.validateMediaType(data.type);

    if (data.fileSize) {
      this.validateFileSize(
        data.fileSize
      );
    }

    return true;
  }

  /**
   * Upload + Validation
   */
  async create(data: any) {
    await this.validateUpload(data);

    return this.uploadMedia(data);
  }
}