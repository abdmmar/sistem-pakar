import { questionItem } from "./components/questionItem.js";

const cfPakar = [0.6, 0.2, 0.6, 0.4, 0.4, 0.2, 0.2, 0.8];
const cfUser = [0, 0, 0, 0, 0, 0, 0, 0];
const questions = [
  "Apakah Anda mengalami sakit kepala secara bertahap?",
  "Apakah Anda mengalami mual dan muntah tanpa sebab?",
  "Apakah Anda mengalami gangguan ingatan?",
  "Apakah Anda mengalami kejang?",
  "Apakah Anda mengalami kesemutan dan mati rasa di lengan atau kaki?",
  "Apakah Anda mengalami gangguan penglihatan seperti penglihatan kabur?",
  "Apakah Anda mengalami masalah dengan indra pendengaran?",
  "Apakah Anda mengalami gangguan keseimbangan, kesulitan saat bergerak?",
];

let cfCombine = 0;
let diagnostic = "";

const questionsContainer = document.querySelector(".questions-container");

questions.forEach((question, index) => {
  questionsContainer.append(questionItem(question, index));
});

const pertanyaan = document.querySelectorAll('input[type="radio"]');

for (const jawab of pertanyaan) {
  jawab.addEventListener("input", () => {
    switch (jawab.name) {
      case "question-0":
        cfUser[0] = parseFloat(jawab.value);
        break;
      case "question-1":
        cfUser[1] = parseFloat(jawab.value);
        break;
      case "question-2":
        cfUser[2] = parseFloat(jawab.value);
        break;
      case "question-3":
        cfUser[3] = parseFloat(jawab.value);
        break;
      case "question-4":
        cfUser[4] = parseFloat(jawab.value);
        break;
      case "question-5":
        cfUser[5] = parseFloat(jawab.value);
        break;
      case "question-6":
        cfUser[6] = parseFloat(jawab.value);
        break;
      case "question-7":
        cfUser[7] = parseFloat(jawab.value);
        break;

      default:
        break;
    }
  });
}

const form = document.querySelector("form");

const diagnosa = (e) => {
  e.preventDefault();

  const cfPerQuestion = [0, 0, 0, 0, 0, 0, 0, 0];

  cfPerQuestion.forEach((cf, index) => {
    cf = cfPakar[index] * cfUser[index];
    index === 0
      ? (cfCombine = cfCombine + cf)
      : (cfCombine = cfCombine + cf * (1 - cfCombine));
  });

  cfCombine = (Math.round(cfCombine * 10000) * 100) / 10000;

  if (cfCombine >= 0 && cfCombine <= 50) {
    diagnostic = "KEMUNGKINAN yang KECIL";
  } else if (cfCombine > 50 && cfCombine <= 79) {
    diagnostic = "KEMUNGKINAN";
  } else if (cfCombine > 79 && cfCombine <= 99) {
    diagnostic = "KEMUNGKINAN YANG BESAR";
  } else {
    diagnostic = "SANGAT YAKIN";
  }

  console.log(cfCombine);
  console.log(diagnostic);
};

form.addEventListener("submit", diagnosa);
