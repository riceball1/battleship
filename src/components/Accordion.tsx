import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ children, title }: Props) => {
  return (
    <div>
        <div>
            <h2>{title}</h2>
        </div>
      <div>{children}</div>
    </div>
  );
};

export default Accordion;
