import React from "react";

const Units = ({ subject, checkedItems, toggleUnit }) => {
  return (
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={!!checkedItems.subjects[subject.name.subjectName]}
          onChange={() => toggleUnit(subject.name.subjectName)}
        />
        <h3 className="font-bold mb-2 ml-2">{subject.name.subjectName}</h3>
      </label>
      {subject.units.map((unit, unitIndex) => (
        <div className="ml-4" key={unit._id}>
          <label className="block">
            <input
              type="checkbox"
              checked={
                !!checkedItems.subjects[
                  `${subject.name.subjectName}-${unit.unitsName}`
                ]
              }
              onChange={() =>
                toggleUnit(subject.name.subjectName, unit.unitsName)
              }
            />
            {unit.unitsName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Units;
