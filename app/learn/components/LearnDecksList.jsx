import DeckGrid from "./DeckGrid";

export default function LearnDecks({ currentLanguage }) {

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gridGap: "10px",
          paddingBottom: "10px",
        }}
        className="justify-center"
      >
        <DeckGrid currentLanguage={currentLanguage}/> 
      </div>
    </>
  );
}
