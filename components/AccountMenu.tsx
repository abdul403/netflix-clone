import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "react-hot-toast";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  const handleLogout = () => {
    try {
      signOut();
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2">
      <div className="flex flex-col gap-3">
        <div className="px-3  group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt="profile-image"
          />
          <p className="text-white text-lg group-hover/item:underline">
            {data?.name}
          </p>
        </div>

        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={handleLogout}
          className="px-3 text-center text-sm hover:underline text-red-500"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
