import { TimelineRepository } from "@/repositories/timeline.repository";

export class TimelineService {
  private repository = new TimelineRepository();

  /**
   * Alias
   */
  async getTimeline(leadId: string) {
    return this.getLeadTimeline(leadId);
  }

  /**
   * Complete Timeline
   */
  async getLeadTimeline(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    if (!lead) {
      throw new Error("Lead not found");
    }

    const timeline: any[] = [];

    timeline.push({
       id: `lead-${lead.id}`,
      type: "LEAD_CREATED",
      title: "Lead Created",
      description: `${lead.customer_name} lead created`,
      date: lead.createdAt,
    });

    lead.activities?.forEach((activity: any) => {
      timeline.push({
         id: `lead-${lead.id}`,
        type: "ACTIVITY",
        title: activity.type,
        description:
          activity.note ??
          `${activity.oldStatus ?? "-"} → ${activity.newStatus ?? "-"}`,
        date: activity.createdAt,
      });
    });

    lead.followups?.forEach((followup: any) => {
      timeline.push({
         id: `lead-${lead.id}`,
        type: "FOLLOWUP",
        title: "Follow-up",
        description:
          followup.remarks ??
          "Follow-up Scheduled",
        date: followup.createdAt,
      });
    });

    lead.meetings?.forEach((meeting: any) => {
      timeline.push({
         id: `lead-${lead.id}`,
        type: "MEETING",
        title: "Meeting",
        description:
          meeting.notes ??
          "Meeting Scheduled",
        date: meeting.createdAt,
      });
    });

    lead.orders?.forEach((order: any) => {
      timeline.push({
         id: `lead-${lead.id}`,
        type: "ORDER",
        title: "Order",
        description: order.status,
        date: order.createdAt,
      });
    });

    lead.media?.forEach((media: any) => {
      timeline.push({
         id: `lead-${lead.id}`,
        type: "MEDIA",
        title: media.type,
        description: media.fileName,
        date: media.createdAt,
      });
    });

    timeline.sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );

    return timeline;
  }

  async getActivities(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.activities ?? [];
  }

  async getFollowups(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.followups ?? [];
  }

  async getMeetings(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.meetings ?? [];
  }

  async getOrders(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.orders ?? [];
  }

  async getTasks(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.tasks ?? [];
  }

  async getMedia(leadId: string) {
    const lead =
      await this.repository.getLeadTimeline(
        leadId
      );

    return lead?.media ?? [];
  }
}