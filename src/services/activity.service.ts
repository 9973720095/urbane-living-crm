import { ActivityRepository } from "@/repositories/activity.repository";

export class ActivityService {
  private activityRepository = new ActivityRepository();

  async createActivity(data: any) {
    return this.activityRepository.create(data);
  }

  async getLeadActivities(leadId: string) {
    return this.activityRepository.getLeadActivities(
      leadId
    );
  }
}