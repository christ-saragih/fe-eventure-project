interface IEvent {
  _id: string;
  name: string;
  banner: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

export type { IEvent };
