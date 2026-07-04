import { LeadMediaService } from "@/services/leadMedia.service";

export class LeadMediaController {
  private leadMediaService = new LeadMediaService();

  /**
   * Upload Media
   */
  async uploadMedia(data: any) {
    return this.leadMediaService.create(data);
  }

  /**
   * Get Single Media
   */
  async getMediaById(id: string) {
    return this.leadMediaService.getMediaById(id);
  }

  /**
   * Get All Media of Lead
   */
  async getLeadMedia(leadId: string) {
    return this.leadMediaService.getLeadMedia(leadId);
  }

  /**
   * Photos
   */
  async getPhotos(leadId: string) {
    return this.leadMediaService.getPhotos(leadId);
  }

  /**
   * Videos
   */
  async getVideos(leadId: string) {
    return this.leadMediaService.getVideos(leadId);
  }

  /**
   * Audio Recordings
   */
  async getAudios(leadId: string) {
    return this.leadMediaService.getAudios(leadId);
  }

  /**
   * Documents
   */
  async getDocuments(leadId: string) {
    return this.leadMediaService.getDocuments(leadId);
  }

  /**
   * Latest Uploads
   */
  async getLatestMedia(limit?: number) {
    return this.leadMediaService.getLatestMedia(limit);
  }

  /**
   * Update Media
   */
  async updateMedia(
    id: string,
    data: {
      caption?: string;
      fileName?: string;
    }
  ) {
    return this.leadMediaService.updateMedia(
      id,
      data
    );
  }

  /**
   * Delete Media
   */
  async deleteMedia(id: string) {
    return this.leadMediaService.deleteMedia(id);
  }

  /**
   * Delete All Lead Media
   */
  async deleteLeadMedia(leadId: string) {
    return this.leadMediaService.deleteLeadMedia(
      leadId
    );
  }

  /**
   * Search
   */
  async searchMedia(
    leadId: string,
    keyword: string
  ) {
    return this.leadMediaService.searchMedia(
      leadId,
      keyword
    );
  }

  /**
   * Count Media
   */
  async countMedia(leadId: string) {
    return this.leadMediaService.countMedia(
      leadId
    );
  }

  /**
   * Summary
   */
  async getSummary(leadId: string) {
    return this.leadMediaService.getSummary(
      leadId
    );
  }

  /**
   * Dashboard Statistics
   */
  async getStatistics() {
    return this.leadMediaService.getStatistics();
  }
}