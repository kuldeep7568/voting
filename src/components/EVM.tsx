import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./evm.css";

/**
 * Fixed assets from Vite public folder:
 * - Candidate photo: public/sarika.png -> "/sarika.png"
 * - Party symbol:    public/hand.png   -> "/hand.png"
 *
 * Vote redirects to "/result" (Result page should play video from public too).
 */
const CANDIDATE_PHOTO_SRC = "/pic.jpeg";
const PARTY_SYMBOL_SRC = "/pic1.jpeg";

// Candidate data for row 3
const CANDIDATE = {
  index: 2,
  name: " पृथ्वीराज शिवाजी सावंत ",
  hasData: true,
};

// Arrow indicator SVG
const ArrowIndicator = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 text-muted-foreground"
    aria-hidden="true"
  >
    <path fill="currentColor" d="M14 7l-5 5 5 5V7z" />
    <rect x="4" y="10" width="10" height="4" fill="currentColor" />
  </svg>
);

// Placeholder avatar for candidate photo (fallback)
const CandidatePhotoPlaceholder = () => (
  <div className="w-12 h-14 bg-secondary rounded overflow-hidden flex items-center justify-center border-2 border-border">
    <svg
      viewBox="0 0 40 48"
      className="w-full h-full"
      aria-label="Candidate photo placeholder"
    >
      <rect width="40" height="48" fill="#f0e6d3" />
      <circle cx="20" cy="16" r="10" fill="#8b7355" />
      <ellipse cx="20" cy="44" rx="16" ry="14" fill="#c4956a" />
      <circle cx="20" cy="14" r="8" fill="#f5dcc4" />
      <path d="M12 10 Q20 2 28 10 Q28 18 20 16 Q12 18 12 10Z" fill="#1a1a1a" />
    </svg>
  </div>
);

function CandidatePhoto({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!src || broken) return <CandidatePhotoPlaceholder />;

  return (
    <div className="w-12 h-14 bg-secondary rounded overflow-hidden flex items-center justify-center border-2 border-border">
      <img
        src={src}
        alt="Candidate"
        className="w-full h-full object-cover"
        onError={() => setBroken(true)}
      />
    </div>
  );
}

// Fallback party symbol (simple lotus)
const LotusSymbol = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-12 h-12"
    aria-label="Party symbol placeholder"
  >
    <ellipse cx="32" cy="50" rx="12" ry="6" fill="#e8b923" />
    <path
      d="M32 10 C32 10 20 25 20 38 C20 45 25 50 32 50 C39 50 44 45 44 38 C44 25 32 10 32 10Z"
      fill="#ff6b35"
    />
    <path
      d="M32 15 C32 15 24 28 24 38 C24 43 27 47 32 47 C37 47 40 43 40 38 C40 28 32 15 32 15Z"
      fill="#ff8c42"
    />
    <path
      d="M15 30 C15 30 22 35 28 42"
      stroke="#ff6b35"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M49 30 C49 30 42 35 36 42"
      stroke="#ff6b35"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="32" cy="35" r="4" fill="#fff4e0" />
  </svg>
);

function PartySymbol({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!src || broken) return <LotusSymbol />;

  return (
    <div className="w-12 h-12 rounded overflow-hidden flex items-center justify-center border-2 border-border bg-secondary">
      <img
        src={src}
        alt="Party symbol"
        className="w-full h-full object-contain"
        onError={() => setBroken(true)}
      />
    </div>
  );
}

export default function EVM() {
  const navigate = useNavigate();
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  // Initialize count from localStorage or 0
  const [buttonClickCount, setButtonClickCount] = useState(() => {
    const savedCount = localStorage.getItem("evmButtonClickCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("evmButtonClickCount", buttonClickCount.toString());
  }, [buttonClickCount]);

  const handleVoteClick = (rowIndex: number) => {
    if (rowIndex === CANDIDATE.index) {
      setButtonClickCount(prev => prev + 1);
      // Add small delay to see count update before navigation
      setTimeout(() => {
        navigate("/result");
      }, 500);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background p-2 sm:p-4 flex flex-col items-center pb-20">
        {/* Main EVM Container */}
        <div className="w-full max-w-2xl bg-card rounded shadow-lg border-4 border-border overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-[hsl(var(--evm-header-bg))] px-3 py-4 text-center border-b-4 border-border">
            <h1 className="text-lg sm:text-xl font-bold text-[hsl(var(--evm-header-text))]">
              लातूर जिला परिषद एवं पंचायत समिति
            </h1>
            <h2 className="text-base sm:text-lg font-bold text-[hsl(var(--evm-header-text))]">
              आम चुनाव
            </h2>
            <p className="text-sm font-semibold text-foreground mt-1">
              2026 भारतीय
            </p>
            <p className="text-xs sm:text-sm mt-2 text-foreground">
              नगराध्यक्ष पदासाठी मतदानाच्या दिवशी सुद्धा{" "}
              <span className="text-[hsl(var(--evm-header-text))] font-bold">
                कमळ
              </span>{" "}
              चिन्ह समोरील बटन दाबावे
            </p>
          </div>

          <div className="overflow-x-auto sm:overflow-visible">
            {/* Table Header */}
            <div className="border-b-4 border-border">
              <div className="grid grid-cols-[50px_1fr_70px_70px_80px] sm:grid-cols-[60px_1fr_80px_80px_100px] text-center font-bold text-sm">
                <div className="p-2 border-r-2 border-border row-span-2 flex items-center justify-center">
                  अ.क्र.
                </div>
                <div className="col-span-2 p-1 border-r-2 border-border border-b-2">
                  उमेदवाराचे नाव
                </div>
                <div className="p-1 border-r-2 border-border row-span-2 flex items-center justify-center">
                  चिन्ह
                </div>
                <div className="p-1 row-span-2 flex items-center justify-center">
                  बटन
                </div>
              </div>
              <div className="grid grid-cols-[50px_1fr_70px_70px_80px] sm:grid-cols-[60px_1fr_80px_80px_100px] text-center font-bold text-xs border-t-0">
                <div className="p-1 border-r-2 border-border"></div>
                <div className="p-1 border-r-2 border-border">नाव</div>
                <div className="p-1 border-r-2 border-border">फोटो</div>
                <div className="p-1 border-r-2 border-border"></div>
                <div className="p-1"></div>
              </div>
            </div>

            {/* Table Body - 10 Rows */}
            <div className="divide-y-2 divide-border">
              {rows.map(rowNum => {
                const isActiveRow = rowNum === CANDIDATE.index;

                return (
                  <div
                    key={rowNum}
                    className={`grid grid-cols-[50px_1fr_70px_70px_80px] sm:grid-cols-[60px_1fr_80px_80px_100px] min-h-[60px] ${
                      isActiveRow
                        ? "bg-[hsl(var(--evm-row-highlight))]"
                        : "bg-card"
                    }`}
                  >
                    {/* Index Column */}
                    <div className="flex items-center justify-center font-bold text-lg border-r-2 border-border">
                      {rowNum}
                    </div>

                    {/* Name Column */}
                    <div className="flex items-center px-2 border-r-2 border-border font-semibold text-sm sm:text-base min-w-0 break-words leading-tight">
                      {isActiveRow ? CANDIDATE.name : ""}
                    </div>

                    {/* Photo Column */}
                    <div className="flex items-center justify-center border-r-2 border-border p-1">
                      {isActiveRow && (
                        <CandidatePhoto src={CANDIDATE_PHOTO_SRC} />
                      )}
                    </div>

                    {/* Symbol Column */}
                    <div className="flex items-center justify-center border-r-2 border-border p-1">
                      {isActiveRow && <PartySymbol src={PARTY_SYMBOL_SRC} />}
                    </div>

                    {/* Button Column */}
                    <div className="flex items-center justify-center gap-1 p-1">
                      <ArrowIndicator />
                      <button
                        type="button"
                        onClick={() => handleVoteClick(rowNum)}
                        disabled={!isActiveRow}
                        className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                          isActiveRow
                            ? "bg-[hsl(var(--evm-button-blue))] text-primary-foreground hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
                            : "bg-[hsl(var(--evm-button-blue))] text-primary-foreground opacity-60 cursor-not-allowed"
                        }`}
                      >
                        बटन
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Click Counter */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t-4 border-border shadow-lg">
        <div className="flex justify-center items-center py-3 px-4">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-foreground">
              मतदान  संख्या:
            </span>
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-xl min-w-[60px] text-center">
              {buttonClickCount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
