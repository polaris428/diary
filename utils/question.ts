export const getQuestionOfTheDay = (date = new Date()) => {
  const questions = [
    "오늘 가장 오래 남은 감정은 무엇이었나요?",
    "오늘 내 선택 중 다시 하고 싶은 것이 있나요?",
    "내일의 나에게 남기고 싶은 문장은 무엇인가요?"
  ];

  return questions[date.getDate() % questions.length];
};
