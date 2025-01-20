// utils/getFriendDetailContent.ts

// Inline type definition for a user object 
// (adapt these fields as needed)
export type FriendUser = {
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
    email?: string | null;
    // etc.
  };
  
  /**
   * Converts a friend user object into an array of items you might
   * display with <CommonContent> or similar.
   */
  export function getFriendDetailContent(friend: FriendUser) {
    return [
      {
        titleText: "First Name",
        contentText: friend.first_name ?? "N/A",
      },
      {
        titleText: "Last Name",
        contentText: friend.last_name ?? "N/A",
      },
      {
        titleText: "Username",
        contentText: friend.username ?? "N/A",
      },
      {
        titleText: "Email",
        contentText: friend.email ?? "N/A",
      },
      // ...
    ];
  }
  