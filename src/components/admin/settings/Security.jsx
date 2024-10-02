import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import { useState } from "react";

const Security = () => {

  return (
    <SettingSection icon={Lock} title={"Bảo mật"}>
      <div className="mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200
        "
        >
          Đổi mật khẩu
        </button>
      </div>
    </SettingSection>
  );
};
export default Security;
