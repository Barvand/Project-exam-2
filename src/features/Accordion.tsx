import React, { useState } from "react";
import { FaArrowsAltV } from "react-icons/fa";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="border rounded mb-4">
      <div
        className="cursor-pointer p-4 bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <FaArrowsAltV />
        </div>
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

export default Accordion;
