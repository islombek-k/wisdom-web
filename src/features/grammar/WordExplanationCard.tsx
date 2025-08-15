import React, { useState } from "react";
// import { ChevronDown, ChevronRight, Volume2, Bookmark } from "lucide-react";
import {
  ChevronDownIcon,
  ChevronRight,
  VolumeIcon,
  BookmarkIcon,
} from "@/shared/assets/icons";

interface Grammar {
  id: number;
  body: string;
}

interface GrammarDetailResponse {
  word: string;
  grammars: Grammar[];
}

interface WordExplanationCardProps {
  grammarData?: GrammarDetailResponse;
}

interface Definition {
  id: number;
  label: string;
  examples: string[];
  synonyms?: string[];
  antonyms?: string[];
}

const WordExplanationCard: React.FC<WordExplanationCardProps> = ({
  grammarData,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});
  const [expandedSynonyms, setExpandedSynonyms] = useState(false);
  const [expandedAntonyms, setExpandedAntonyms] = useState(false);

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Use grammarData if available, otherwise fall back to static data
  const definitions: Definition[] = grammarData
    ? []
    : [
        {
          id: 1,
          label: "ishqalanish",
          examples: [
            "Friction between moving parts had caused the engine to overheat.",
            "Putting oil on both surfaces reduces friction.",
            "Check your rope frequently, as friction against the rock can wear it away.",
          ],
          synonyms: [
            "abrasion",
            "rubbing",
            "chafing",
            "grating",
            "rasping",
            "scraping",
          ],
        },
        {
          id: 2,
          label: "[physics] ishqalanish kuchi, qarshilik",
          examples: [
            "The force of friction slows the spacecraft down as it re-enters the earth's atmosphere.",
            "Putting oil on both surfaces reduces friction.",
            "The force of friction slows the spacecraft down as it re-enters the earth's atmosphere.",
          ],
          antonyms: [
            "abrasion",
            "rubbing",
            "chafing",
            "grating",
            "rasping",
            "scraping",
            "abrasion",
            "rubbing",
            "chafing",
            "grating",
            "rasping",
            "scraping",
            "abrasion",
            "rubbing",
            "chafing",
            "grating",
            "rasping",
            "scraping",
            "abrasion",
            "rubbing",
            "chafing",
            "grating",
            "rasping",
            "scraping",
          ],
        },
      ];

  return (
    <div className="bg-white rounded-2xl p-9 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-semibold text-gray-900">
              {grammarData?.word || "activity"}
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <VolumeIcon className=" text-gray-600" />
            </button>
          </div>
          <button className="p-3 bg-gray-100 hover:opacity-80 rounded-full transition-colors">
            <BookmarkIcon className=" text-gray-600" />
          </button>
        </div>

        <div className="text-gray-600 mb-6">
          <span className="italic">noun</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="italic">U</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">/ˈæk.tɪv.ə.ti/</span>
        </div>
      </div>

      <div className="space-y-6">
        {grammarData
          ? grammarData.grammars.map((grammar) => (
              <div key={grammar.id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-900 font-medium text-lg">
                      {grammar.id}.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <BookmarkIcon className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => toggleSection(grammar.id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {expandedSections[grammar.id] ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="prose prose-gray max-w-none mb-6">
                  <div dangerouslySetInnerHTML={{ __html: grammar.body }} />
                </div>
              </div>
            ))
          : definitions.map((definition) => (
              <div key={definition.id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-900 font-medium text-lg">
                      {definition.id}.
                    </span>
                    <span className="text-gray-900 font-medium text-lg">
                      {definition.label}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <BookmarkIcon className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => toggleSection(definition.id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {expandedSections[definition.id] ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {definition.examples.map((example, idx) => (
                    <div key={idx} className="text-gray-700 italic">
                      • {example}
                    </div>
                  ))}
                </div>

                {/* Synonyms Section */}
                {definition.synonyms && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedSynonyms(!expandedSynonyms)}
                      className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                    >
                      <span>Sinonimlar</span>
                      {expandedSynonyms ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {expandedSynonyms && (
                      <div className="mt-2 text-gray-600 italic">
                        {definition.synonyms.join(", ")}
                      </div>
                    )}
                  </div>
                )}

                {/* Antonyms Section */}
                {definition.antonyms && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedAntonyms(!expandedAntonyms)}
                      className="flex justify-between bg-gray-100 w-full p-4 rounded-2xl items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                    >
                      <span>Antonimlar</span>
                      {expandedAntonyms ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {expandedAntonyms && (
                      <div className="mt-2 text-gray-600 italic">
                        {definition.antonyms.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
      </div>

      {/* More Examples Section */}
      <div className="mt-8 pt-6">
        <button className="flex justify-between bg-gray-100 w-full p-4 rounded-2xl items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
          <span>Ko'proq namunalar</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WordExplanationCard;
