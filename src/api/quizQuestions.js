var quizQuestions = [
  {
      question: "Where were you during 9/11 or the '93 bombing?",
      answers: [
          {
            nextQuestionId: 1,
            type: "Microsoft",
            content: "I was not alive"
          },
          {
            nextQuestionId: 2,
            type: "Nintendo",
            content: "Near an attack site"
          },
          {
            nextQuestionId: 2,
            type: "Sony",
            content: "Elsewhere in the U.S."
          },
          {
            nextQuestionId: 2,
            type: "Sony",
            content: "Elsewhere internationally"
          }
      ]
  },
  {
      question: "Would you like to talk about how you've learned about these attacks?",
      answers: [
          {
            nextQuestionId: 'record',
            type: "Microsoft",
            content: "Yes"
          },
          {
            nextQuestionId: 3,
            type: "Nintendo",
            content: "No"
          }
      ]
  },
  {
      question: "Would you like to tell your 9/11 or ‘93 story?",
      answers: [
          {
            nextQuestionId: 'record',
            type: "Microsoft",
            content: "Yes"
          },
          {
            nextQuestionId: 3,
            type: "Nintendo",
            content: "No"
          }
      ]
  },
  {
      question: "Would you like to make a recording in memory of a victim of 9/11 or 1993?",
      answers: [
          {
            nextQuestionId: 'record',
            type: "Microsoft",
            content: "Yes"
          },
          {
            nextQuestionId: 4,
            type: "Nintendo",
            content: "No"
          }
      ]
  },
  {
      question: "Would you like to talk about how these attacks continue to impact you today?",
      answers: [
          {
            nextQuestionId: 5,
            type: "Microsoft",
            content: "Yes"
          },
          {
            nextQuestionId: 6,
            type: "Nintendo",
            content: "No"
          }
      ]
  },
  {
      question: "Do you know what you'd like to say?",
      answers: [
          {
            nextQuestionId: 'record',
            type: "Microsoft",
            content: "Yes"
          },
          {
            nextQuestionId: 7,
            type: "Nintendo",
            content: "No"
          }
      ]
  },
  {
      question: "Here are some other topics to talk about.",
      answers: [
          {
            nextQuestionId: 'record',
              type: "Microsoft",
              content: "What does rebuilding at ground zero mean to you?"
          },
          {
            nextQuestionId: 'record',
              type: "Nintendo",
              content: "Why is is important to remember 9/11?"
          },
          {
            nextQuestionId: 'record',
              type: "Nintendo",
              content: "Did you see something at the museum that impacted you?"
          }
      ]
  },
  {
      question: "Here are some prompts to help you get started.",
      answers: [
          {
            nextQuestionId: 'record',
              type: "Microsoft",
              content: "What is your experience with ongoing recovery efforts or health effects?"
          },
          {
            nextQuestionId: 'record',
              type: "Nintendo",
              content: "Has 9/11 influenced your feelings about patriotism?"
          },
          {
            nextQuestionId: 'record',
              type: "Nintendo",
              content: "Has 9/11 influenced your own military service or volunteerism?"
          },
          {
            nextQuestionId: 'record',
              type: "Nintendo",
              content: "How has your life been afected by 9/11?"
          }


      ]
  }
];

export default quizQuestions;
