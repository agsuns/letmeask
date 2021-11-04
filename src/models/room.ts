import { FirebaseQuestion } from "./question";

export interface FirebaseRoom {
  authorId: string, 
  questions: {
    [id: string]: FirebaseQuestion
  },
  title: string,
  closedAt?: string,
}