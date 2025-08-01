interface VerseCardProps {
  chapter: number;
  verse: number;
  sanskrit: string;
  english: string;
  showActions?: boolean;
}

const VerseCard = ({ chapter, verse, sanskrit, english, showActions = false }: VerseCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${sanskrit}\n\n${english}\n\n- Bhagavad Gita ${chapter}.${verse}`);
  };

  return (
    <div className="verse-card group">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-muted-foreground">
          Chapter {chapter}, Verse {verse}
        </div>
        {showActions && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity btn-peace text-xs"
          >
            Copy
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="sanskrit-text">
          {sanskrit}
        </div>
        
        <div className="spiritual-divider"></div>
        
        <div className="text-foreground leading-relaxed">
          {english}
        </div>
      </div>
    </div>
  );
};

export default VerseCard;