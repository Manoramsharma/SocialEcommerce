import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";

export default function Linkshare() {
  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  return (
    <div style={styles.div}>
      <SendIcon onClick={copy} />
      <div style={styles.button}>{!copied ? "" : "Copied!"}</div>
    </div>
  );
}

const styles = {
  button: {},
  div: {
    display: "flex",
    gap: "0.3em",
  },
};
