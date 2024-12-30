// src/components/Toggle.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div
      style={{
        width: "40px",
        height: "26px",
        backgroundColor: isOn ? "gray" : "lightgray",
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onClick={toggleSwitch}
    >
      <motion.div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
          transform: isOn ? "translateX(16px)" : "translateX(0px)",
          transition: "transform 0.3s",
        }}
        layout
        transition={spring}
      />
    </div>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default Toggle;
