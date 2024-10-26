type LayoutWrapProps = {
  children: React.ReactNode;
};

const LayoutWrap = ({ children }: LayoutWrapProps) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] ">{children}</div>
  );
};

export default LayoutWrap;
