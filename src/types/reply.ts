export type Reply = {
  id: string;
  text: string;
  profilesId: string;
  created_at: string;
  username: string;
  displayName?: string | null;
  likesCount: number;
  imageUrl: string;
  replyCount: number;
  replyLikesCount: number;
  replyRepostCount: number;
  isReplyLiked: boolean;
  isReplyReposted: boolean;
  isReplyBookmarked: boolean;
  profilePicture: string;
  postId: string;
};
