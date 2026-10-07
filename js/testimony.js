const rows = document.querySelectorAll(".testimony-row");
const detail = document.getElementById("testimonyDetail");

const testimonyData = {
  1: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>인간 스트레스. 작업 스트레스.<br>
        내마음대로 진행되지 않는 모든 일.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내가 컨트롤 할 수 없는 부분이라고 생각해서</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 체념, 조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>개과천선 하기로함. 원래 독불장군 같은 스타일이였지만 조금 유하게 살아보자 라고 생각하고 실천중.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다., 내보내고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>친구를 불러서 고민을 얘기하고 상담을 받는다.</span>
      </p>
    </div>
  `,

  2: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>과제</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>특별한 이유는 없다고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>그냥 지나가는 과정이라고 생각하고 특별한 원인은 없다고 생각한다. 한번에 결과물이 나오긴 힘드니까</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>평소보다 작업량을 늘림</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>걍 스스로 해결하고 원인을 찾는다. 언젠간 지나가겠지하는타입</span>
      </p>
    </div>
  `,

  3: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>팀플</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>서로 잘 모르는 사람들이 모여서 하나의 결과물을 만드려고 하다보니 생기는 문제라고 생각했음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념을 하게됨</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자 생각함</span>
      </p>
    </div>
  `,

  4: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>졸전</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>운 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>잘했든 못했든 교수님이 기준을 결정하기 때문..</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>외부의 의견에 휘둘리지 않기로 맘먹음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>스스로 노력하기</span>
      </p>
    </div>
  `,

  5: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>항상 중요한 시기에 감정적인 일이 생김</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>인간관계에서 일어난 일들은 내가 다 알 수 없기 때문에 문제가 터졌을 때 나에겐 갑작스런 일이었어도 전조증상은 분명 있었을거라 생각함</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내기준을 확고하게 세우기</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자 고민해보고 결정</span>
      </p>
    </div>
  `,

  6: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네 ㅠ 인턴이 자꾸 떨어져서 슬퍼요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>반복적으로 떨어지는 것은 나 자신에 대한 문제가 있다고 생각해서</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>문제 원인을 분석하기 위해 노력했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>문제를 해결한 사람들의 방식을 분석해서 내 방식과 어떤 점이 다른지 비교해서 해결책을 찾으려고 노력한다</span>
      </p>
    </div>
  `,

  7: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>규칙적으로 생활하는 것이 힘들다(매일 하루에 3시간씩 과제하는 것, 아침 9시에 일어나는 것 등)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의지 문제라고 생각함</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>억지로라도 앉아보거나 하는 노력..</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>그냥 스스로 해결하려고 한다. 안되면 남의 도움을 받는다거나(채찍질 해달라고 부탁하기, 친구나 ai한테)</span>
      </p>
    </div>
  `,

  8: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네, 졸전으로 인해 골머리를 앓고있습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>4학년 시기에 졸업을 하기위한 어쩔수 없는 상황이라고 생각합니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황에 맞춰 생활패턴을 바꿨습니다. (늦게자고 일찍 일어나기)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>무속</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조언을 듣거나, 계속 그 문제에 대해 부딪히면서 해결하고자 한다.</span>
      </p>
    </div>
  `,

  9: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자 생각해보고 반성하며 최선의 해결책을 찾으려고 노력한다. 마인드컨트롤.. 정신승리..?적으로 혼자 합리화하는 경우도 많은 것 같다. 혹시나 혼자 해결하기 버거운 문제라면 일단 챗지피티에게 상담하고 정리한 후 가족, 주변인 등 적합한 사람에게 도움을 요청한다.</span>
      </p>
    </div>
  `,

  10: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>졸업전시 준비를 하는 과정에서 기획 단계, 디자인 단계 전반적으로 진행이 더디며 고민이 많습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>운이나 나의 선택 같은 특정한 이유에 기대기보다 전반적인 상황이 그냥 그렇게 흘러가고 있다고 느꼈다 굳이 찾자면 상황적 배경? 교수님도 도움되는 피드백도 많이 주시고 너무 좋은데 왜이렇게 잘 안 풀리는 지 모르겠다 그냥 여러가지 상황때문이라고 생각했다.. 나도 문제고 교수님 피드백도 잘 반영하기 어려웠고.. 모르겧다 ㅋ…</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>거의 대부분 혼자 생각하고 해결하려함. ai와도 상담할 때도 있음. 특별한 경우, 다수의 의견이 필요할 땐 친구들과 고민을 공유하고 해결함</span>
      </p>
    </div>
  `,

  11: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>작업을 시작하기까지 시간이 너무 오래 걸려요. 마음이 너무 조마조마거려요.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>움직이는 것은 제가 스스로 하는 것이니까요.. 제 탓이 아니면 누구의 탓을 해야할지.. 탓할 사람이 있으면 좋겠네요.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>타인의 조언과 이야기를 듣습니다.</span>
      </p>
    </div>
  `,

  12: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>X</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>삼재</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>합리화</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>유연한 생각을 가지기</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내보내고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>잘안되면 혼자만의 생각가지기</span>
      </p>
    </div>
  `,

  13: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>회사 프로젝트 진행에 시스템 부재로 고생</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>급한 일정과 모호한 역할 분담</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>단호한 거절</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>가까운 지인에게 털어놓음</span>
      </p>
    </div>
  `,

  14: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>진짜 삼재때문인지는 모르겠으나 작년에 카페에서 작업하다가 가만히 있던 창문이 떨어져 목과 허리를 다친 경험이 있습니다. 그 후에도 1-2주 간격으로, 길을 걷는데 갑자기 지붕의 파편 조각이 떨어진다거나, 전깃줄에 감전된 비둘기가 바로 앞에서 떨어진다거나 등 저를 위협하는 일이 벌어졌습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>삼재</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>평소에도 삼재라는 걸 알고 있었고, 사실 잘 믿진 않았지만 한번에 안 좋은 일이 너무 몰아쳐서 삼재라 그런 것이라고 생각이 변했습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>공사장 근처나 위에 무언가 있는 곳 옆에 지나갈 때 최대한 빠르게 지나가거나 피해다녔습니다. 트라우마 생겨서.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다., 지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>원인을 알고 나름 긍정적으로 바라보는 편입니다. 예를들면 이번엔 '삼재'라는 것때문에 이런 일이 일어난 것이기 때문에 곧 지나갈 것이다라는,, 후에 좋은 일이 올것이라는,,, 자기 최면?</span>
      </p>
    </div>
  `,

  15: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>졸업 전시가 도서히 진행되지 않습니다 매주 옆으로 걸어가고있습니다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>별 생각 없음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>미래의 내가 해결해주길이라고 생각하면서 버텨봅니다</span>
      </p>
    </div>
  `,

  16: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>특별한 이유는 없다고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>힘든 일은 재앙처럼 일어나지만, 결국 결과적으로는 도움이 되는 경우가 많았다. 깊게 생각하지 않고 이또한 지나갈 것이다 생각하면 마음이 편하다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>별 생각 없음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>힘든 시기가 오면 의식적으로 생각을 비우려고 노력했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도(종교에 기대기)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>할 수 있는 선에서 최선을 다한다. 그럼에도 불구하고 해결할 수 없는 일은 지나가기를 기다린다</span>
      </p>
    </div>
  `,

  17: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>인간관계</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>어떤 인간 관계든 내가 선택한거니까</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다., 지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>부딪히기</span>
      </p>
    </div>
  `,

  18: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>과제</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>운 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>운이라고 생각해야 마음이 편해져서 (어쩔 수 없는 운명이었다라고 생각)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나는 운이 좋은 사람이라고 자신을 세뇌시켰습니다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내보내고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>그냥 흘러가겠지하고 둔다</span>
      </p>
    </div>
  `,

  19: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>별 생각 없음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>원인분석</span>
      </p>
    </div>
  `,

  20: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>시기가 안 좋다고 생각했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>그럴때가 있다~ 고 생각했고 이 시간이 지나고 나면 괜찮아 질 것 이라고 생각했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>평소보다 한번 더 생각하고 행동하거나 조금 더 고민을 하고 행동을 하기</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>고민하다가 정 해결이 안될시에 다른 사람에게 조언을 구한다</span>
      </p>
    </div>
  `,

  21: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>특별한 이유는 없다고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>이미 발생한 일에 대해 딱히 생각 x</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 별 생각 없음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가기를 기다림</span>
      </p>
    </div>
  `,

  22: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>인생은 선택의 연속이기 때문</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념, 조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>흥분하지 않고 해결 가능한문제는 침착하개 대응하거나 해결불가능한 문제는 지나가길 기다린다</span>
      </p>
    </div>
  `,

  23: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>자취방 윗집 사람 때문에 한달 동안 심한 층간소음에 시달림</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>특정인물 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다세대 공동주택인만큼 소음에 취약하고 더 조심해야한다고 생각하는데 한달 내내 시간과 상관 없이 쿵쿵거리고 새벽 4시가 다 되도록 소리를 지르거나 지인들을 불러 소음을 일으키거나 뛰어다니거나 바닥을 치는 소리가 들려 피해를 줌. 다른 이웃의 민원신고와 경고문에도 불구하고 여러차례(거의 매일) 반복되어 스트레스를 받았음.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기타 (개빡침 존나 분노)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>보통은 참고 넘기는데 정도라 심해서 집주인분에게 장문의 연락을 남김. 경고와 주의부탁 메세지</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>보통은 혼자 생각하거나 고민하지만 혼자 생각했을 때 해결이 되지 않거나 누군가의 조언이 필요하다 생긱되는 걍우에는 주변인에게 고민을 상담하기</span>
      </p>
    </div>
  `,

  24: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>시기가 안 좋다고 생각했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>그렇게 될 운명이기에 흐름대로 흘러갔을 뿐이라고 생각한다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다., 지나가게 하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>문제를 최대한 객관적으로 바라보기</span>
      </p>
    </div>
  `,

  25: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>일상</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>하고싶다고마구잡이로했다생각</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내보내고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>주변인들의 조언</span>
      </p>
    </div>
  `,

  26: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>모든 상황과 행동은 내 선택에서 비롯된 것이기 때문에</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황이 나아지는 방향으로 개선을 함?</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>처음부터 다시 시작하거나, 그러한 경험이 있는 사람의 조언듣기</span>
      </p>
    </div>
  `,

  27: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>미래에 대한 불안과 걱정 때문에 현재에 집중하지 못 하고 있습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황적으로 여러 일들이 있고 또 올해가 삼재라 최대한 조심하고 여러 글들을 찾아보고 있습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>불안, 조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>현재에 집중하려 노력합니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지나가게 하고 싶었다., 내보내고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도(종교에 기대기)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>많은 생각을 하고 결정을 내려 행동합니다.</span>
      </p>
    </div>
  `,

  28: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>자녀 학교생활</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>시기가 안 좋다고 생각했다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>사춘기랑 아이의 회피하려는 성격</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>체념</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지켜봐준다 있는 그대로</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>여러사람의 의견을 듣고 수렴한다</span>
      </p>
    </div>
  `,

  29: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>골프운동</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>특별한 이유는 없다고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>연습부족</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>별 생각 없음</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>여러 전문가의 조언을. 참고한다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>의례(무속 또는 자신만의 방식)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다수와</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>아니요</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>연습</span>
      </p>
    </div>
  `,

  30: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>여자친구와 자주 싸웁니다..</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>나의 선택 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>내가 좀 어린 부분이 있는 것 같다</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>좀 더 성숙하게 생각해야겠다고 마음 먹었습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도(종교에 기대기)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>혼자</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지인에게 조언을 구한다</span>
      </p>
    </div>
  `,

  31: `
    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>최근 반복적으로 잘 풀리지 않는 일이 있었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네.. 여자친구랑 자주 싸우는데 솔직히 싸움의 원인이 서로 안 지려고하는 모습이 있어서 그런 것 같습니다. 그리고 가끔 저의 어린 생각으로 싸움을 거는 그런 모습도 있는 것 같습니다. 언제쯤 저희는 서로를 이해하고 져주고 배려하는 모습을 보일까요 ?</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황의 원인을 어떻게 생각했나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황 때문이라고 생각했다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그렇게 생각한 이유는 무엇인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>상황이 자주 만나지 못 해서 조금 감정이 올라오면 바로 표현하고 그걸 이해해주지 못하는 것 같아요..</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>만약 반대되는 해석이나 조언을 들었다면, 같은 선택을 했을 것 같나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>앞서 적어주신 상황에서 어떤 감정을 느꼈나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>조심해야겠다고 느꼈다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>그 상황 이후 행동을 바꾼 적이 있나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>어떤 행동을 바꿨나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>좀 더 성숙하게 생각하려 노력하고 져줄 수 있는 상황이면 져주고 괜한 자존심을 부리면 빠르게 생각을 바꾼 것 같습니다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>문제를 어떻게 해결하고 싶었나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>제거하고 싶었다.</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 방식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>기도(종교에 기대기)</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>고민을 상담할 때 어떤 형식이 더 익숙한가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>다함께 생각하기</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>같은 상황이라도, 다른 방식으로 해결할 수 있다고 생각하시나요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>네</span>
      </p>
    </div>

    <div class="testimony-question">
      <p class="testimony-question-title testimony-body-q">
        <span>질문.</span>
        <span>당신은 문제를 어떤 방식으로 해결하는 편인가요?</span>
      </p>
      <p class="testimony-answer body2-left">
        <span>답:</span>
        <span>지인에게 조언을 구하거나 이런 상황에서 내가 다르게 생각할 수는 없었을까? 하고 저에게 질문하는 편인 것 같습니다.</span>
      </p>
    </div>
  `,
};
const testimonyList = document.querySelector(".testimony-list");
const scrollbar = document.querySelector(".testimony-scrollbar");
const scrollbarThumb = document.querySelector(".testimony-scrollbar-thumb");

function updateTestimonyScrollbar() {
  if (
    !testimonyList ||
    !scrollbar ||
    !scrollbarThumb ||
    !testimonyList.scrollHeight
  )
    return;
  const visibleRatio = testimonyList.clientHeight / testimonyList.scrollHeight;

  const thumbHeight = Math.min(
    scrollbar.clientHeight,
    Math.max(40, scrollbar.clientHeight * visibleRatio),
  );

  const maxScroll = testimonyList.scrollHeight - testimonyList.clientHeight;

  const maxThumbTop = scrollbar.clientHeight - thumbHeight;

  const scrollRatio = maxScroll > 0 ? testimonyList.scrollTop / maxScroll : 0;

  scrollbarThumb.style.height = thumbHeight + "px";

  scrollbarThumb.style.top = scrollRatio * maxThumbTop + "px";
}

testimonyList?.addEventListener("scroll", updateTestimonyScrollbar);

window.addEventListener("resize", updateTestimonyScrollbar);

updateTestimonyScrollbar();

(() => {
  const preview = document.getElementById("testimonyPreview");

  if (!preview) return;

  document.querySelectorAll(".testimony-row").forEach((row) => {
    // 호버하면 해당 이미지 표시
    row.addEventListener("mouseenter", () => {
      const imagePath = row.dataset.preview;

      if (!imagePath) return;

      preview.src = imagePath;
      preview.hidden = false;
    });

    // 클릭해도 해당 이미지 그대로 유지
    row.addEventListener("click", () => {
      if (testimonyMotion.busy) return;
      const imagePath = row.dataset.preview;

      if (!imagePath) return;

      preview.src = imagePath;
      preview.hidden = false;
    });
  });

  preview.addEventListener("error", () => {
    preview.hidden = true;
    preview.removeAttribute("src");
  });
})();

// 증언을 선택하면 오른쪽 족자를 즉시 표시합니다.
const testimonyMotion = (() => {
  const guide = document.querySelector('.testimony-guide');
  const scroll = document.querySelector('.testimony-answer-scroll');
  const body = document.getElementById('testimonyDetailBody');
  let selected = null;

  function reset() {
    scroll.hidden = true;
    guide.hidden = false;
    body.innerHTML = '';
    detail.classList.remove('is-open');
    detail.scrollTop = 0;
    rows.forEach(row => row.classList.remove('is-selected'));
    selected = null;
  }

  function select(row) {
    if (selected === row) return;
    body.innerHTML = testimonyData[row.dataset.id] ||
      '<p class="body2-left">이 증언의 내용은 준비 중입니다.</p>';
    detail.classList.add('is-open');
    detail.scrollTop = 0;
    guide.hidden = true;
    scroll.hidden = false;
    rows.forEach(item => item.classList.toggle('is-selected', item === row));
    selected = row;
    detail.dispatchEvent(new Event('scroll'));
  }

  window.addEventListener('pagehide', reset);
  window.addEventListener('pageshow', event => { if (event.persisted) reset(); });
  return { select, reset, get busy() { return false; } };
})();

rows.forEach(row => row.addEventListener('click', () => testimonyMotion.select(row)));

(() => {
  const content = document.getElementById("testimonyDetail");
  const track = document.querySelector(".testimony-detail-scrollbar");
  const thumb = document.querySelector(".testimony-detail-thumb");

  if (!content || !track || !thumb) return;

  function update() {
    const maxScroll = content.scrollHeight - content.clientHeight;
    track.hidden = maxScroll <= 1;
    if (track.hidden) return;

    const trackHeight = track.clientHeight;
    if (!trackHeight || !content.clientHeight) return;

    const thumbHeight = Math.min(
      trackHeight,
      Math.max(40, (trackHeight * content.clientHeight) / content.scrollHeight),
    );

    const travel = trackHeight - thumbHeight;

    thumb.style.height = thumbHeight + "px";
    thumb.style.top =
      (maxScroll > 0 ? (content.scrollTop / maxScroll) * travel : 0) + "px";
  }

  content.addEventListener("scroll", update);
  new ResizeObserver(update).observe(content);

  new MutationObserver(update).observe(content, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  let drag = null;

  document.addEventListener("click", (event) => {
    const clickedRow = event.target.closest(".testimony-row");
    const clickedDetail = event.target.closest(".testimony-detail");

    // 행이나 오른쪽 상세 영역을 누른 건 유지
    if (clickedRow || clickedDetail) return;

    if (testimonyMotion.busy) return;
    testimonyMotion.reset();
  });

  thumb.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    event.preventDefault();
    drag = {
      y: event.clientY,
      scroll: content.scrollTop,
    };

    

    thumb.setPointerCapture(event.pointerId);
  });

  thumb.addEventListener("pointermove", (event) => {
    if (!drag) return;

    const travel = track.clientHeight - thumb.offsetHeight;
    const maxScroll = content.scrollHeight - content.clientHeight;

    if (travel <= 0) return;

    content.scrollTop =
      drag.scroll + ((event.clientY - drag.y) / travel) * maxScroll;
  });

  thumb.addEventListener("pointerup", () => {
    drag = null;
  });

  thumb.addEventListener("pointercancel", () => {
    drag = null;
  });

  thumb.addEventListener("lostpointercapture", () => {
    drag = null;
  });

  update();
})();
