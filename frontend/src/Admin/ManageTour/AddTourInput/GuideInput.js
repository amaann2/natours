import React from "react";

const GuideInput = ({ handleChange, users }) => {
  const filter = users.filter(
    (user) => user.role === "guide" || user.role === "lead-guide"
  );
  return (
    <>
      <h4>Tour Guides</h4>
      <hr />
      <select name="guides" onChange={handleChange}>
        {filter.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default GuideInput;
