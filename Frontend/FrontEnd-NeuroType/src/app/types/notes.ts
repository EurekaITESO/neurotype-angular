export interface Notes {
    text: string;
    id: number;
    created_at: string; // Si estás usando Date, puedes convertirlo más tarde
    user_id: number;
    happy_count: number;
    calm_count: number;
    sad_count: number;
    upset_count: number;
  }
