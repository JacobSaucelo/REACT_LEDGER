import React from "react";

interface CoreTextsHeaderTextProps {
  //   PROPS_IS_LABEL?: boolean;
  //   PROPS_LABEL?: string;
  PROPS_TITLE: string;
  PROPS_SUB_TEXT: string;
  PROPS_DESC?: string;
  //   PROPS_ICON?: string;
}

const CoreTextsHeaderText: React.FC<CoreTextsHeaderTextProps> = ({
  //   PROPS_IS_LABEL = false,
  //   PROPS_LABEL = "",
  PROPS_TITLE,
  PROPS_SUB_TEXT,
  PROPS_DESC = "",
  //   PROPS_ICON = "pi pi-box",
}) => {
  return (
    <section
      className="
        p-4 
        flex 
        flex-wrap 
        items-center 
        gap-4 
        rounded 
        select-none
      "
    >
      shitter
      {/* {PROPS_IS_LABEL ? (
        <Avatar
          label={PROPS_LABEL}
          size="xlarge"
          className="text-lg font-semibold"
        />
      ) : (
        <Avatar icon={PROPS_ICON} size="xlarge" />
      )} */}
      <aside>
        <h1 className="text-3xl font-semibold">{PROPS_TITLE}</h1>
        <h6 className="text-sm text-gray-500">{PROPS_SUB_TEXT}</h6>
        <p className="text-base">{PROPS_DESC}</p>
      </aside>
    </section>
  );
};

export default CoreTextsHeaderText;
