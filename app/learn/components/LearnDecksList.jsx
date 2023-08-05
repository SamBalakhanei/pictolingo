import DeckGrid from "./DeckGrid";

export default function LearnDecks({ currentLanguage }) {

  return (
    <>
      <h2 className="w3-center w3-round-xxlarge w3-padding-16">
        <span
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: "8px",
            color: "white",
            backgroundColor: "#395c8a",
            position: "static",
          }}
        >
          {currentLanguage} Decks
        </span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gridGap: "10px",
          paddingBottom: "10px",
        }}
      >
        <DeckGrid currentLanguage={currentLanguage}/> 
      </div>
    </>
  );
}
