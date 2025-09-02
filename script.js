const { useState, useEffect } = React;

const bank = [
  { key: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function DrumPad({ clip, playClip }) {
  return (
    <button className="drum-pad" id={clip.id} onClick={() => playClip(clip.key)}>
      {clip.key}
      <audio className="clip" id={clip.key} src={clip.url}></audio>
    </button>
  );
}

function DrumMachine() {
  const [display, setDisplay] = useState("");

  const playClip = (key) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    const clipName = bank.find((c) => c.key === key).id;
    setDisplay(clipName);
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    if (bank.some((c) => c.key === key)) playClip(key);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="drum-machine">
      {bank.map((clip) => (
        <DrumPad key={clip.key} clip={clip} playClip={playClip} />
      ))}
      <div id="display">{display}</div>
    </div>
  );
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
