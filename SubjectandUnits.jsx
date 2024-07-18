import React, { useState } from "react";
import Units from "./Units"; // Adjust the path as per your project structure

const SubjectsAndUnits = () => {
  const [checkedItems, setCheckedItems] = useState({
    allSubjects: false,
    subjects: {},
  });

  const subjects = [
    {
      name: { _id: "w86534jhfd", subjectName: "Behavioral Sciences" },
      units: [
        {
          _id: "nsjfdi3674",
          unitsName: "Sensation, Perception, and Consciousness",
        },
        { _id: "nsjfdi3674", unitsName: "Memory and Cognition" },
        { _id: "nsjfdi3674", unitsName: "Developmental Psychology" },
        { _id: "nsjfdi3674", unitsName: "Social Psychology" },
      ],
    },
    {
      name: { _id: "anotherid", subjectName: "Biochemistry" },
      units: [
        { _id: "anotherid", unitsName: "Amino Acids and Proteins" },
        { _id: "anotherid", unitsName: "Enzymes" },
        {
          _id: "anotherid",
          unitsName: "Carbohydrates, Nucleotides, and Lipids",
        },
        { _id: "anotherid", unitsName: "Metabolic Reactions" },
      ],
    },
    // Add more subjects with units as needed
  ];

  const toggleAllSubjects = () => {
    const newCheckedState = !checkedItems.allSubjects;
    const newSubjectsState = {};
    subjects.forEach((subject) => {
      newSubjectsState[subject.name.subjectName] = newCheckedState;
      subject.units.forEach((unit) => {
        newSubjectsState[`${subject.name.subjectName}-${unit.unitsName}`] =
          newCheckedState;
      });
    });
    setCheckedItems({
      allSubjects: newCheckedState,
      subjects: newSubjectsState,
    });
  };

  const toggleUnit = (subjectName, unitName) => {
    const newCheckedState =
      !checkedItems.subjects[`${subjectName}-${unitName}`];
    const newSubjectsState = {
      ...checkedItems.subjects,
      [`${subjectName}-${unitName}`]: newCheckedState,
    };

    // Update subject checkbox state based on unit checkboxes
    const allUnitsChecked = subjects
      .find((subject) => subject.name.subjectName === subjectName)
      .units.every(
        (unit) => newSubjectsState[`${subjectName}-${unit.unitsName}`]
      );

    newSubjectsState[subjectName] = allUnitsChecked || false; // Ensure subject checkbox is unchecked if no units are checked

    // Update "All Subjects" checkbox state based on all subjects and their units
    const allSubjectsChecked = subjects.every(
      (subject) =>
        newSubjectsState[subject.name.subjectName] &&
        subject.units.every(
          (unit) =>
            newSubjectsState[`${subject.name.subjectName}-${unit.unitsName}`]
        )
    );

    setCheckedItems({
      allSubjects: allSubjectsChecked,
      subjects: newSubjectsState,
    });
  };

  return (
    <div className="mb-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checkedItems.allSubjects}
          onChange={toggleAllSubjects}
        />
        <h2 className="text-xl font-bold mb-4 ml-2">Subjects and Units</h2>
      </label>
      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <Units
            key={index}
            subject={subject}
            checkedItems={checkedItems}
            toggleUnit={toggleUnit}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectsAndUnits;
