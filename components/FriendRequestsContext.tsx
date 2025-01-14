// src/contexts/FriendRequestContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FriendRequest } from '../types/types';

interface FriendRequestContextType {
  sentFriendRequests: Set<number>;
  receivedFriendRequests: Set<number>;
  addSentFriendRequest: (receiverId: number) => void;
  removeSentFriendRequest: (receiverId: number) => void;
  addReceivedFriendRequest: (senderId: number) => void;
  removeReceivedFriendRequest: (senderId: number) => void;
}

const FriendRequestContext = createContext<FriendRequestContextType | undefined>(undefined);

export const FriendRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sentFriendRequests, setSentFriendRequests] = useState<Set<number>>(new Set());
  const [receivedFriendRequests, setReceivedFriendRequests] = useState<Set<number>>(new Set());

  const addSentFriendRequest = (receiverId: number) => {
    setSentFriendRequests((prev) => new Set(prev).add(receiverId));
    console.log(`Added sent friend request to ID: ${receiverId}`);
  };

  const removeSentFriendRequest = (receiverId: number) => {
    setSentFriendRequests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(receiverId);
      console.log(`Removed sent friend request to ID: ${receiverId}`);
      return newSet;
    });
  };

  const addReceivedFriendRequest = (senderId: number) => {
    setReceivedFriendRequests((prev) => new Set(prev).add(senderId));
    console.log(`Added received friend request from ID: ${senderId}`);
  };

  const removeReceivedFriendRequest = (senderId: number) => {
    setReceivedFriendRequests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(senderId);
      console.log(`Removed received friend request from ID: ${senderId}`);
      return newSet;
    });
  };

  return (
    <FriendRequestContext.Provider
      value={{
        sentFriendRequests,
        receivedFriendRequests,
        addSentFriendRequest,
        removeSentFriendRequest,
        addReceivedFriendRequest,
        removeReceivedFriendRequest,
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};

export const useFriendRequests = () => {
  const context = useContext(FriendRequestContext);
  if (!context) {
    throw new Error("useFriendRequests must be used within a FriendRequestProvider");
  }
  return context;
};
