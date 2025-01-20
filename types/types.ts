export interface FriendUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  birthdate: string;
  city: string;
  current_points: number;
  total_points: number;
  role: string;
  created_at: string;
}

export interface FriendRequest {
  id: string;
  created_at: string;
  receiver_id: string;
  sender_id: string;
  status: string; 
  senderUser?: {
      id?: number;
      first_name?: string;
      last_name?: string;
  };
}

export interface FriendObject extends FriendUser {
  mutualFriends?: FriendUser[];
}