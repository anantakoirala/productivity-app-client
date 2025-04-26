export type Message = {
  AdditionalResource: {
    id: number;
    messageId: number;
    name: string;
    type: string;
  }[];
  content: string;
  conversationId: number;
  createdAt: string;
  sender: { id: number; name: string; username: string };
};
