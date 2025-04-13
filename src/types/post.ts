export type Post = {
  id: string;
  text: string;
  profilesId: string;
  created_at: string;
  username: string;
  displayName?: string | null;
  likesCount: number;
  imageUrl: string;
  replyCount: number;
  rePostCount: number;
  isLiked: boolean;
  isRePosted: boolean;
  isBookmarked: boolean;
  profilePicture: any;
  
};
