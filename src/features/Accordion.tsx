import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

/**
 * A reusable accordion component that expands and collapses content.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title displayed in the accordion header.
 * @param {React.ReactNode} props.children - The content inside the accordion.
 * @param {boolean} [props.open=false] - Determines if the accordion is open by default.
 *
 * @description
 * - Provides a collapsible section with a title.
 * - Uses a state (`isOpen`) to toggle visibility.
 * - Displays an arrow icon (`IoMdArrowDropup` / `IoMdArrowDropdown`) to indicate the state.
 * - Supports smooth transitions for better user experience.
 *
 * @example
 * ```tsx
 * <Accordion title="Click to Expand" open={true}>
 *   <p>This is the content inside the accordion.</p>
 * </Accordion>
 * ```
 *
 * @returns {JSX.Element} A collapsible accordion section.
 */

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
