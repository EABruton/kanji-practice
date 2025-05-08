# Kanji Tester

This small application tests the ability to recall kanji from hiragana.
Answers are meant to be written on paper and checked via the application, so there is no input field for typing kanji.

## Instructions

1. Have a list of kanji that you want to test yourself on typed out and ready to copy-and-paste.
2. Go to an LLM (such as [ChatGPT](https://chatgpt.com/?sso=) or [DeepSeek](https://chat.deepseek.com/)) and provide it the following prompt:

```markdown
Please take the following kanji, convert them to their hiragana (NOT katakana), and insert them into sentences that are entirely hiragana.
Then, create a question and answer list in the following format:
[
  {
    question: the sentence in hiragana,
    answer: the sentence in its normal form (mixed hiragana and katakana)
  }
]
I want the hiragana for the word the question is based off of surrounded by <strong></strong> tags.
I want the kanji for the word the answer is based off of surrounded by <strong></strong> tags.
I only want one question and answer per kanji.
Here are the kanji:
迷う
迷惑
低迷
破る
破れる
破産
破壊
来月末
末
申し訳
申し込む
申請
言葉
葉
紅葉
```

3. Take the JSON content it gives you and add it to a json file (you can use `kanji_ch_5.json`).
4. Open `index.html` up in the browser and then click "Choose File". Select the file with your questions.
5. The questions should now render. Write your answers on a piece of paper or whatever.
- If you want to shuffle the existing questions, you can clear the file and re-select it.
6. When you're ready to check your results, click "Toggle Answers."
