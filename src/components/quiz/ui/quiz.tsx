import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/app/store/app.store";
import type { Question } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { declension } from "@/app/lib/utils";

function Quiz({
  questions,
  onClose,
}: {
  questions: Question[];
  onClose?: () => void;
}) {
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [allTime, setAllTime] = useState(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const setBalance = useAppStore((state) => state.setBalance);
  const setResults = useAppStore((state) => state.setResults);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAnswer(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, selected]);

  const handleAnswer = (index: number | null) => {
    if (selected !== null) return;
    setSelected(index);
    if (index !== null && index === questions[current].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setSelected(null);
      setTimeLeft(15);
      setAllTime((prev) => prev + (15 - timeLeft));
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        const totalScore =
          score +
          (index !== null && index === questions[current].correct ? 1 : 0);
        setBalance(totalScore);
        const time = allTime + (15 - timeLeft);
        const leftTimeSpent = Math.round(time / 60);
        const rightTimeSpent = time % 60;
        setResults({
          date: new Date().getTime(),
          timeSpent: `${leftTimeSpent > 9 ? leftTimeSpent : `0${leftTimeSpent}`}:${rightTimeSpent > 9 ? rightTimeSpent : `0${rightTimeSpent}`}`,
          answers: `${totalScore}/${questions.length}`,
          scores: totalScore,
        });
        setIsAnswered(true);
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    handleAnswer(null);
  }

  if (isAnswered) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex w-fit items-center justify-center rounded-md border p-4">
          <div className="flex flex-col gap-y-4">
            <span className="text-sm">
              Вы ответили на {score} из {questions.length}{" "}
              {declension(questions.length, [
                "вопроса",
                "вопросов",
                "вопросов",
              ])}
            </span>
            <Button onClick={onClose}>Закрыть</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center size-full items-center">
      <div className="w-full max-w-xl">
        <div className="rounded-lg border p-6 flex flex-col">
          <h2 className="mb-4 text-xl text-center font-bold">
            {questions[current].question}
          </h2>
          <div className="mb-4 text-center">
            Осталось времени: <span className="font-bold">{timeLeft}</span> сек.
          </div>
          <div className="grid gap-2">
            {questions[current].answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`cursor-pointer rounded border px-4 py-2 ${
                  selected === null
                    ? "hover:bg-sidebar-accent"
                    : i === questions[current].correct
                      ? "bg-green-700"
                      : selected === i
                        ? "bg-red-700"
                        : ""
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
          <Button onClick={handleSkip} className='mt-4 self-center'>Пропустить</Button>
        </div>
      </div>
    </div>
  );
}

export { Quiz };
