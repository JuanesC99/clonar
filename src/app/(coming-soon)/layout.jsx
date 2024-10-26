import Header from "@layouts/headers/Index";

const ComingSoonLayouts = ({
  children
}) => {
  return (
    <>
      <Header layout={"coming"} />

      {/* content */}
      <div id="content">
        {children}
      </div>
      {/* content */}
    </>
  );
};
export default ComingSoonLayouts;
