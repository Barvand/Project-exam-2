import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  open = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  return (
    <div className="border rounded mb-4">
      <div
        className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          {isOpen ? (
            <IoMdArrowDropup className="text-2xl" />
          ) : (
            <IoMdArrowDropdown className="text-2xl" />
          )}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
