import {Metric} from "./Metric";

export class Message {
  id!: number;
  content!: string;
  sender!: string;
  dateTime!: Date;
  isActive!: boolean;
  metrics!: Metric[]; // Liste des métriques
}
