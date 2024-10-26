"use server";

import { headers } from "next/headers";
import type { Gender, Prisma, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import processFile from "@/utils/processFile";
import { GetPost } from "@/types";

export const getUserId = async (action?: string) => {
  const session = await auth();
  const headersList = await headers();
  const userId = session?.userId || headersList.get("x-user-id");

  if (!userId) {
    console.error(
      `You need to be logged in to ${action || "perform this action"}. `,
    );

    return null;
  }

  return userId;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userId = await getUserId("get the current user");

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
  });
};

export const getCurrentUserLikes = async (): Promise<
  Prisma.LikeGetPayload<{
    include: {
      post: {
        include: {
          author: true;
          media: true;
        };
      };
    };
  }>[]
> => {
  const userId = await getUserId("get the current user's likes");
  if (!userId) return [];

  return prisma.like.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          author: true,
          media: true,
        },
      },
    },
  });
};

export const getAllUsers = async (query?: string) => {
  return prisma.user.findMany({
    where: query
      ? {
          username: {
            contains: query,
          },
        }
      : undefined,
  });
};

export const getUser = async ({
  id,
  username,
  email,
}: {
  id?: string;
  username?: string;
  email?: string;
}) => {
  return prisma.user.findUnique({
    where: { id, username, email },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      gender: true,
      phoneNumber: true,
      verified: true,
      profile: {
        select: {
          bio: true,
          website: true,
          picture: {
            select: {
              url: true,
            },
          },
        },
      },
      followers: {
        select: {
          id: true,
        },
      },
      following: {
        select: {
          id: true,
        },
      },
      posts: {
        select: {
          id: true,
        },
      },
    },
  });
};

export const getPost = async (id: string): Promise<GetPost | null> => {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      caption: true,
      published: true,
      archived: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          verified: true,
          followers: {
            select: {
              id: true,
            },
          },
          following: {
            select: {
              id: true,
            },
          },
          profile: {
            select: {
              picture: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
      media: {
        select: {
          type: true,
          url: true,
          publicId: true,
        },
      },
      likes: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      comments: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          writtenBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });
};

export const getFeed = async () => {
  const userId = await getUserId("get the user's feed");
  if (!userId) return null;

  const followedUsers = await prisma.user
    .findUnique({ where: { id: userId } })
    ?.following();
  const followedUserIds =
    followedUsers?.map((user: { id: string }) => user.id) ?? [];

  return prisma.post.findMany({
    where: {
      author: { id: { in: [...followedUserIds, userId] } },
      deletedAt: null,
      published: true,
      archived: false,
    },
    select: {
      id: true,
      caption: true,
      published: true,
      archived: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          verified: true,
          followers: { select: { id: true } },
          following: { select: { id: true } },
          profile: {
            select: {
              picture: { select: { url: true } },
            },
          },
        },
      },
      media: {
        select: {
          type: true,
          url: true,
          publicId: true,
        },
      },
      likes: {
        select: {
          id: true,
          user: { select: { id: true, username: true } },
        },
      },
      comments: {
        where: { deletedAt: null },
        select: {
          id: true,
          text: true,
          createdAt: true,
          writtenBy: { select: { id: true, username: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getExploreFeed = async () => {
  const userId = await getUserId("get the explore feed");

  if (!userId) return null;

  const following = await prisma.user
    .findUnique({ where: { id: userId } })
    .following();
  const followingIds =
    following?.map((follower: { id: string }) => follower.id) ?? [];

  return prisma.post.findMany({
    where: {
      author: { id: { notIn: [...followingIds, userId] } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateUser = async ({
  input,
}: {
  id: string;
  input: {
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    bio: string;
    website: string;
    profilePicture: File;
  };
}) => {
  const userId = await getUserId("update user");
  if (!userId) return null;

  let updatedProfilePicture;

  if (input.profilePicture) {
    const tags = ["user_profile_picture"];
    const { url, publicId } = await processFile({
      file: input.profilePicture,
      tags,
      userId,
    });

    updatedProfilePicture = { url, publicId };
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      name: input.name,
      username: input.username,
      email: input.email,
      phoneNumber: input.phoneNumber,
      gender: input.gender as Gender,
      profile: {
        update: {
          bio: input.bio,
          website: input.website,
          picture: input.profilePicture
            ? { create: updatedProfilePicture }
            : undefined,
        },
      },
    },
  });
};
