import { shuffleArray } from "@/app/lib/utils";
import { Quiz } from "@/components/quiz";
import { useState } from "react";
import type { Question } from "@/shared/types";
import { scienceQuestions } from "@/app/data/science";

function SciencePage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <div className="bg-sidebar flex size-full flex-col gap-y-4 rounded-md border p-4">
      {questions.length === 0 && (
        <div className="flex flex-wrap gap-4">
          {Object.values(scienceQuestions).map((questions, index) => (
            <div
              key={index}
              className="hover:bg-sidebar-accent cursor-pointer rounded-md border p-4 transition-colors"
              onClick={() => setQuestions(shuffleArray(questions))}
            >
              <span className="text-sm">
                Викторина по теме «Наука» №{index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <Quiz questions={questions} onClose={() => setQuestions([])} />
      )}
    </div>
  );
}

export default SciencePage;
