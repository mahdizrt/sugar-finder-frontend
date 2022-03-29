export type MessageType = {
  id: string;
  from: number;
  to: number;
  send: boolean;
  text: string;
  fromFirstName: string;
  photo?: string;
};
