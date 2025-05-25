import { useState } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  handleTabSwitch: () => void;
}

export function Tabs({ handleTabSwitch, children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleTabClick(index : any){
    setActiveIndex(index)
    handleTabSwitch();
  }

  return (
    <div>
      <div className="flex border-b">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`p-2 ${activeIndex === index ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">{children[activeIndex]}</div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}
