const QUESTIONS = [
  "오늘 가장 오래 남은 감정은 무엇이었나요?",
  "지금 다시 돌아가고 싶은 장면이 있나요?",
  "오늘의 나를 한 문장으로 남긴다면?",
  "오늘 하루 중 가장 감사했던 순간은 언제인가요?",
  "오늘 나를 미소 짓게 한 것은 무엇인가요?",
  "오늘의 나에게 해주고 싶은 말은?",
  "최근 나를 설레게 하는 것은 무엇인가요?",
  "오늘 누군가에게 전하고 싶었지만 못한 말이 있나요?",
  "내일 하루를 어떻게 보내고 싶나요?",
  "오늘의 나를 색깔로 표현한다면 무슨 색일까요?",
  "오늘 가장 힘들었던 순간은 언제였나요?",
  "그 힘든 순간을 어떻게 이겨냈나요?",
  "요즘 내가 가장 많이 생각하는 것은 무엇인가요?",
  "오늘 가장 자랑스러운 나의 모습은?",
  "만약 내일이 내 생애 마지막 날이라면 오늘을 어떻게 보낼까요?",
  "오늘 하루 중 후회되는 일과 그 이유는?",
  "나에게 위로가 되는 장소나 물건은 무엇인가요?",
  "최근 새롭게 알게 된 사실이나 깨달음이 있나요?",
  "오늘 나의 에너지를 가장 많이 쏟은 곳은?",
  "내가 요즘 가장 피하고 싶은 것은 무엇인가요?",
  "그것을 피하고 싶은 이유는 무엇일까요?",
  "나를 가장 편안하게 만들어주는 사람은 누구인가요?",
  "오늘 하루 내가 버리고 싶은 감정이나 생각이 있다면?",
  "요즘 나에게 가장 필요한 것은 무엇이라고 생각하나요?",
  "내가 정말 좋아하는 나의 장점 세 가지는?",
  "오늘 하루를 하나의 영화로 만든다면 제목은 무엇일까요?",
  "내 삶에서 가장 중요하게 생각하는 가치는 무엇인가요?",
  "최근 나를 웃게 만들었던 유머나 재밌는 상황은?",
  "오늘 밤, 어떤 꿈을 꾸고 싶나요?",
  "내일의 나를 위해 오늘 할 수 있는 작은 일은 무엇일까요?"
];

export const useQuestion = () => {
  const getQuestionForToday = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple hash function for the date string
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = (hash << 5) - hash + dateString.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % QUESTIONS.length;
    return QUESTIONS[index];
  };

  const question = useState("daily-question", () => getQuestionForToday());

  return {
    question
  };
};
