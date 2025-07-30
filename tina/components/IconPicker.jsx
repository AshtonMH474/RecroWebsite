// components/IconPickerField.tsx
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import React from "react";

export const iconOptions = Object.entries(FaIcons).map(([name, Icon]) => ({
  name,
  Icon: Icon,
}));

export const IconPickerField = ({ input }) => {
  const [search, setSearch] = useState("");

  const filtered = iconOptions.filter(opt =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleIconClick = (name) => {
    // If the icon clicked is already selected, unselect it
    if (input.value === name) {
      input.onChange(""); // Clear selection
    } else {
      input.onChange(name);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search icons..."
        className="p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
        {filtered.map(({ name, Icon }) => (
          <div
            key={name}
            className={`p-2 border rounded cursor-pointer ${
              input.value === name ? "bg-primary text-white" : ""
            }`}
            onClick={() => handleIconClick(name)}
          >
            <Icon size={24} />
          </div>
        ))}
      </div>

      {/* Optional: clear button */}
      {input.value && (
        <button
          type="button"
          className="mt-2 text-sm text-red-500 hover:underline"
          onClick={() => input.onChange("")}
        >
          Clear Icon
        </button>
      )}
    </div>
  );
};
