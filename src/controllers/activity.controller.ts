import { ActivityService } from "@/services/activity.service";

export class ActivityController {
  private activityService = new ActivityService();

  async createActivity(data: any) {
    return this.activityService.createActivity(data);
  }

  async getLeadActivities(leadId: string) {
    return this.activityService.getLeadActivities(
      leadId
    );
  }
}