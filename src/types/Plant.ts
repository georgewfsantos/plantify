export interface PlantData {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: Array<string>;
  frequency: {
    times: number;
    repeat_every: string;
  };
  time: string;
  dateTimeNotification: Date;
}

export interface StoredPlantData {
  [id: string]: {
    data: PlantData;
    notificationId: string;
  };
}
