type PostPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = await params;

  if (!postId) return null;

  return (
    <div className="flex p-4 items-center justify-center md:h-full flex-col gap-4">
      <h1 className="text-4xl font-bold">Post Page</h1>
      <div>
        <p>{postId}</p>
      </div>
    </div>
  );
};

export default PostPage;
