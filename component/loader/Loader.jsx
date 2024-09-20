import Image from "next/image";

const Loader = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center w-full fixed top-0"
      style={{ background: "#fff" }}
    >
      <Image
        src="/assets/images/loader.gif"
        alt="Loading..."
        unoptimized
        width={300}
        height={300}
      />
    </div>
  );
};
export default Loader;
