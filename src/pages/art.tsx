import { useState } from "react";
import type { Question } from "@/shared/types";
import { Quiz } from "@/components/quiz";
import { shuffleArray } from "@/app/lib/utils";
import { artQuestions1, artQuestions2 } from "@/app/data/art";

function ArtPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <div className="bg-sidebar flex size-full flex-col gap-y-4 rounded-md border p-4">
      {questions.length === 0 && (
        <div className="flex gap-x-4">
          <div
            className="hover:bg-sidebar-accent cursor-pointer rounded-md border p-4 transition-colors"
            onClick={() => setQuestions(shuffleArray(artQuestions1))}
          >
            <span className="text-sm">Викторина по теме «Искусство» №1</span>
          </div>
          <div
            className="hover:bg-sidebar-accent cursor-pointer rounded-md border p-4 transition-colors"
            onClick={() => setQuestions(shuffleArray(artQuestions2))}
          >
            <span className="text-sm">Викторина по теме «Искусство» №2</span>
          </div>
        </div>
      )}

      {questions.length > 0 && (
        <Quiz questions={questions} onClose={() => setQuestions([])} />
      )}
    </div>
  );
}

export default ArtPage;
