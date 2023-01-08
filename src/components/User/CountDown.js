import React, { useEffect, useState } from "react";

const CountDown = ({ timeOut }) => {
  const [count, setCount] = useState(300);

  const toHHMMSS = (seconds) => {
    let h,
      m,
      s,
      result = "";
    // HOURs
    h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    if (h) {
      result = h < 10 ? "0" + h + ":" : h + ":";
    }
    // MINUTEs
    m = Math.floor(seconds / 60);
    seconds -= m * 60;
    result += m < 10 ? "0" + m + ":" : m + ":";
    // SECONDs
    s = seconds % 60;
    result += s < 10 ? "0" + s : s;
    return result;
  };

  useEffect(() => {
    if (count === 0) {
      timeOut();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return <div className="main">{toHHMMSS(count)}</div>;
};

export default CountDown;
