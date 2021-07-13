
export interface Message {
  message: string;
  from: string;
  timestamp: {
    $date: number
  };
}
