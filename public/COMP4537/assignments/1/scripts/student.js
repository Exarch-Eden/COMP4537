const answers = [];

let correctCounter = 0;

const submitQuiz = () => {
  // reset correctCounter
  correctCounter = 0;

  const numQuestions = answers.length;

  console.log("submitted quiz");
  console.log("answers");
  console.log(answers);

  for (let i = 0; i < answers.length; i++) {
    const isChecked = document.getElementById(answers[i]).checked;
    console.log("isChecked:");
    console.log(isChecked);

    if (isChecked) correctCounter += 1;
  }

  console.log("checking results:");
  console.log();
  document.getElementById(
    "score"
  ).innerText = `Score: ${correctCounter} / ${numQuestions}`;
};
