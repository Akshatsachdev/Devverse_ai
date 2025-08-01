import { useState } from "react";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import VerseCard from "@/components/VerseCard";

const Verses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");

  const verses = [
    {
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      english: "You have a right to perform your prescribed duty, but not to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      keywords: "duty action fruits karma detachment"
    },
    {
      chapter: 2,
      verse: 48,
      sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
      english: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.",
      keywords: "yoga equanimity success failure attachment balance"
    },
    {
      chapter: 4,
      verse: 7,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      english: "Whenever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
      keywords: "dharma righteousness divine incarnation protection"
    },
    {
      chapter: 4,
      verse: 8,
      sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
      english: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, millennium after millennium.",
      keywords: "protection good evil dharma divine purpose"
    },
    {
      chapter: 6,
      verse: 5,
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      english: "One must deliver oneself with the help of one's mind, and not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",
      keywords: "self-improvement mind friend enemy inner struggle"
    },
    {
      chapter: 7,
      verse: 7,
      sanskrit: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय। मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥",
      english: "O conqueror of wealth, there is no truth superior to Me. Everything rests upon Me, as pearls are strung on a thread.",
      keywords: "supreme truth divine unity connection consciousness"
    }
  ];

  const chapters = [
    { value: "all", label: "All Chapters" },
    { value: "2", label: "Chapter 2: Sankhya Yoga" },
    { value: "4", label: "Chapter 4: Jnana Yoga" },
    { value: "6", label: "Chapter 6: Dhyana Yoga" },
    { value: "7", label: "Chapter 7: Vijnana Yoga" }
  ];

  const filteredVerses = verses.filter(verse => {
    const matchesSearch = searchTerm === "" || 
      verse.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verse.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChapter = selectedChapter === "all" || 
      verse.chapter.toString() === selectedChapter;
    
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-spiritual font-bold text-primary mb-4">
              Sacred Verses
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the timeless wisdom of the Bhagavad Gita. Each verse contains profound truths for modern living.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="divine-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                  Search verses by keyword or theme
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Try 'karma', 'peace', 'duty'..."
                  className="w-full p-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="chapter" className="block text-sm font-medium text-foreground mb-2">
                  Filter by chapter
                </label>
                <select
                  id="chapter"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.value} value={chapter.value}>
                      {chapter.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredVerses.length} verse{filteredVerses.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Verses Grid */}
          {filteredVerses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVerses.map((verse, index) => (
                <VerseCard
                  key={`${verse.chapter}-${verse.verse}`}
                  chapter={verse.chapter}
                  verse={verse.verse}
                  sanskrit={verse.sanskrit}
                  english={verse.english}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-spiritual font-bold text-primary mb-2">
                No verses found
              </h3>
              <p className="text-muted-foreground">
                Try different keywords or select a different chapter.
              </p>
            </div>
          )}

          {/* Wisdom Quote */}
          <div className="divine-card p-8 mt-12 text-center">
            <div className="text-4xl mb-4">📿</div>
            <blockquote className="text-lg font-spiritual italic text-primary mb-4">
              "The Bhagavad Gita is not just a scripture, but a mirror reflecting the deepest truths of existence."
            </blockquote>
            <p className="text-muted-foreground">
              Continue your journey of spiritual discovery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verses;