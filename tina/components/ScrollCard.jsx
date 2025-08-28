import React from "react";

export default function ScrollCard({ input }) {
  const { value = {}, onChange } = input;

  const scroll = value.scroll || false;

  const handleChange = (key, val) => {
    const updated = { ...value, [key]: val };

    if (key === "scroll") {
      if (val === false) {
        delete updated.id;
      }
    }
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <label>Do you want it to Scroll?</label>
      <select
        value={scroll ? "true" : "false"}
        onChange={(e) => handleChange("scroll", e.target.value === "true")}
        className="p-2 border rounded"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {scroll === true && (
        <>
          <label>
            Card ID <br />
            (Must match the ID of the section <br />
            for smooth scroll to work)
          </label>
          <input
            type="text"
            value={value.id ?? ""}
            onChange={(e) => handleChange("id", e.target.value)}
            className="p-2 border rounded"
          />
        </>
      )}
    </div>
  );
}
