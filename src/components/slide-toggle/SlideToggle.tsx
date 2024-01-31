import React, { useRef, useState } from "react";
import styles from "./SlideToggle.module.css"; // Import styles as an object

const SlideToggle: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputId = `cwstiid-${new Date().getTime()}`;

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    if (wrapperRef.current) {
      wrapperRef.current.setAttribute(
        "data-color-display",
        isChecked ? "dark" : "light"
      );
    }
    if (isChecked) {
      document.documentElement.style.setProperty("--text-primary", "#fffcfc");
      document.documentElement.style.setProperty(
        "--background-primary",
        "#00050a"
      );
    } else {
      document.documentElement.style.setProperty("--text-primary", "#00050a");
      document.documentElement.style.setProperty(
        "--background-primary",
        "#fffcfc"
      );
    }
    setIsChecked(newCheckedState);
  };

  return (
    <div
      style={{ display: "flex", gap: "0.5em" }}
      onClick={handleToggle}
    >
      <div
        className={styles.wrapper}
        ref={wrapperRef}
        data-color-display="dark"
      >
        <label
          className={styles.slideToggleLabel}
          htmlFor={inputId}
        ></label>
        <input
          type="checkbox"
          className={styles.slideToggleInput}
          onInput={handleToggle}
          id={inputId}
        />
        <div
          className={`${styles.slideToggleCircle} ${
            isChecked ? styles.slideToggleCircleTrue : ""
          }`}
        ></div>
      </div>
      <small style={{ fontSize: "12px", cursor: "default" }}>
        {isChecked ? "Light" : "Dark"}
      </small>
    </div>
  );
};

export default SlideToggle;
