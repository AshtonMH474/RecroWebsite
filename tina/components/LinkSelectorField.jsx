

import React from "react";

export default function SubLinkSelectorField({ input }) {
  const { value = {}, onChange } = input;

  const type = value.type || "link";

  const handleChange = (key, val) => {
    const updated = { ...value, [key]: val };

    if (key === "type") {
      if (val === "link") {
        delete updated.id;
        delete updated.scrollPosition;
      } else if (val === "id") {
        delete updated.link;
      }
    }

    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <label>Type of Link</label>
      <select
        value={type}
        onChange={(e) => handleChange("type", e.target.value || "link")}
        className="p-2 border rounded"
      >
        <option value="link">Link</option>
        <option value="id">Scroll to Section ID</option>
      </select>

      {type === "id" && (
        <>
          <label>
            Section ID <br />
            (Must match the ID of the section <br />
            for smooth scroll to work)
          </label>
          <input
            type="text"
            value={value.id ?? ""}
            onChange={(e) => handleChange("id", e.target.value)}
            className="p-2 border rounded"
          />

          <label>Scroll Position (Must be same as the<br/> sections scroll position)</label>
          <select
            value={value.scrollPosition || "start"}
            onChange={(e) => handleChange("scrollPosition", e.target.value)}
            className="p-2 border rounded"
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </>
      )}

      {type === "link" && (
        <>
          <label>Link URL</label>
          <input
            type="text"
            value={value.link ?? ""}
            onChange={(e) => handleChange("link", e.target.value)}
            className="p-2 border rounded"
          />
        </>
      )}
    </div>
  );
}


