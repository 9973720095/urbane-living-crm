// @ts-ignore: googleapis may not have type declarations in this project
import { google } from "googleapis";

export class GoogleCalendarService {
  private auth;
  private calendar;

  constructor() {
    this.auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/api/google/callback"
    );

    this.calendar = google.calendar({ version: "v3", auth: this.auth });
  }

  setCredentials(token: any) {
    this.auth.setCredentials(token);
  }

  async createEvent(data: {
    title: string;
    description?: string;
    start: Date;
    end: Date;
    email: string;
  }) {
    const event = await this.calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: data.title,
        description: data.description,
        start: {
          dateTime: data.start.toISOString(),
        },
        end: {
          dateTime: data.end.toISOString(),
        },
        attendees: [{ email: data.email }],
      },
    });

    return event.data;
  }
}