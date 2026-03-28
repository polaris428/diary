const QUESTIONS = [
  "오늘 가장 오래 남은 감정은 무엇이었나요?",
  "지금 다시 돌아가고 싶은 장면이 있나요?",
  "오늘의 나를 한 문장으로 남긴다면?"
];

export const useQuestion = () => {
  const question = useState("daily-question", () => QUESTIONS[0]);

  return {
    question
  };
};
