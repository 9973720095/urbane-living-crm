import { TimelineService } from "@/services/timeline.service";

export class TimelineController {
  private timelineService = new TimelineService();

  /**
   * Complete Timeline
   */
  async getLeadTimeline(leadId: string) {
    return await this.timelineService.getTimeline(
      leadId
    );
  }

  /**
   * Alias
   */
  async getTimeline(leadId: string) {
    return await this.timelineService.getTimeline(
      leadId
    );
  }

  /**
   * Activities
   */
  async getActivities(leadId: string) {
    return await this.timelineService.getActivities(
      leadId
    );
  }

  /**
   * Followups
   */
  async getFollowups(leadId: string) {
    return await this.timelineService.getFollowups(
      leadId
    );
  }

  /**
   * Meetings
   */
  async getMeetings(leadId: string) {
    return await this.timelineService.getMeetings(
      leadId
    );
  }

  /**
   * Orders
   */
  async getOrders(leadId: string) {
    return await this.timelineService.getOrders(
      leadId
    );
  }

  /**
   * Tasks
   */
  async getTasks(leadId: string) {
    return await this.timelineService.getTasks(
      leadId
    );
  }

  /**
   * Media
   */
  async getMedia(leadId: string) {
    return await this.timelineService.getMedia(
      leadId
    );
  }
}