import Image from "next/image";

const Details = ({ username, email }) => {
  return (
    <div className="rounded-md w-full p-2  flex flex-col gap-2">
      <div className="rounded-full mx-auto border-b-2">
        <Image
          src={"/assets/logo/userplacehold.png"}
          alt="user avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
      <div className="mx-auto">
        <p className="text-sm font-medium text-gray-50 text-center">
          {username}
        </p>

        <p className="text-sm text-gray-500 text-center">{email}</p>
        <p className="text-sm text-gray-500 text-center">Click to edit</p>
      </div>
    </div>
  );
};
export default Details;
