import type { Prisma } from "@cuurly/db";

export type GetPost = Prisma.PostGetPayload<{
  select: {
    id: true;
    caption: true;
    published: true;
    archived: true;
    createdAt: true;
    author: {
      select: {
        id: true;
        username: true;
        verified: true;
        followers: { select: { id: true } };
        following: { select: { id: true } };
        profile: { select: { picture: { select: { url: true } } } };
      };
    };
    media: { select: { type: true; url: true; publicId: true } };
    likes: {
      select: { id: true; user: { select: { id: true; username: true } } };
    };
    comments: {
      where: { deletedAt: null };
      select: {
        id: true;
        text: true;
        createdAt: true;
        writtenBy: { select: { id: true; username: true } };
      };
    };
  };
}>;

export type GetUser = Prisma.UserGetPayload<{
  include: {
    likes: true;
  };
}>;
