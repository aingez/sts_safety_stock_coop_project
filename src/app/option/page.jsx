import React from "react";
import PlantSetting from "../../components/setPlant";
import SwitchTheme from "../../components/themeSwitch";

function optionPage() {
  return (
    <div className="min-h-screen pb-20">
      <h1 className="custom-title-1">Option Setting</h1>
      <div className="flex flex-row gap-4">
        <PlantSetting />
        <SwitchTheme />
      </div>
    </div>
  );
}

export default optionPage;
