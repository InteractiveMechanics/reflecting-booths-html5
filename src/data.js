const data = {
  "attract": {
    "teleprompter": {
      "videosrc": "http://techslides.com/demos/sample-videos/small.mp4"
    },
    "touchscreen": {
      "text":"<h3>welcome to the</h3><h2>Recording Booth</h2><p>Tap anywhere to begin</p>"
    },
    "buttonclass": "large",
    "welcome": "welcome"
  },


      "welcome": {

        "teleprompter": {
          "heading": "Welcome to the 9/11 Recording Booths",
          "paragraph": "We invite you to record and share your thoughts about the on-going meaning of 9/11, or your own experiences of that day."
        },
        "touchscreen": {
          "text": ""
        },
        "buttonclass": "large",
        "next": "about-1",
        "language": "language"

    },
    "language": {
      "teleprompter": {
        "heading": "Select Your Language"
      },
      "touchscreen": "langage input component here",
      "back": "welcome",
      "buttonclass": "small",
      "languages": ["English", "French", "Spanish", "Italian", "Japanese", "Mandarin", "Portuguese", "Dutch"]

  },
      "about-1": {
        "teleprompter": {
          "heading": "Become Part of History",
          "paragraph": "There are many ways people have experienced the 9/11 and 1993 attacks. We welcome you to join the discussion by making a video recording sharing your perspective."
        },
        "touchscreen": {
          "text": ""
        },
        "buttonclass": "large",
        "next": "about-2",
        "back": "welcome"

    },
      "about-2": {
        "teleprompter": {
          "heading": "An Ongoing Discussion",
          "paragraph": "By making a recording, you are adding your voice to the ongoing dialogue and remembrance of the 1993 and 2001 terrorist attacks. You may save your recording for use in exhibitions and programs at the museum."
        },
        "touchscreen": {
          "text": ""
        },
        "buttonclass": "large",
        "next": "questions",
        "back": "about-1"
    },
      "questions": {
        "teleprompter": {},
        "touchscreen": {},
        "buttonclass": "small",
        "next": "record-intro-1",
        "back": "about-2"
    },

      "record-intro-1": {
        "teleprompter": {
          "recordvideo": true
        },
        "touchscreen": {
          "text": ""
        },
        "buttonclass": "large",
        "next": "record-intro-2",
        "back": "questions"
    },

      "record-intro-2": {
        "teleprompter": {
          "heading": "Tap to Begin Recording",
          "paragraph": "If recording a remembrance of a victim of the 9/11 or 1993 attacks, please start your recording by stating your loved one’s full name and their relationship to you."
        },
        "touchscreen": {
          "text": ""
        },
        "buttonclass": "large",
        "recording": "recording",
        "back": "record-intro-1"
    },
      "recording": {
        "teleprompter": {
          "heading": "Time remaining:",
          "paragraph": "last prompt rendered in place of progress"
        },
        "touchscreen": {
          "text": ""
        },
        "stop": "review"
      },

    "review": {
      "teleprompter": {
        "heading": "Recording Complete",
        "paragraph": "Thank you for your recording. You may retake your video or tap continue to enter your information and submit your video to the museum."
      },
      "touchscreen": {
        "text": ""
      },
      "buttonclass": "large",
      "record-again": "record-intro-1",
      "next": "user-agreement"
    },
    "user-agreement": {
      "teleprompter": {
        "heading": "Submitting Your Video",
        "paragraph": "To submit your video for use by the museum, you must agree to our terms of service and enter your information on the screen in front of you."
      },
      "touchscreen": {
        "text": "",
        "heading": "Usage Agreement: Terms of Service",
        "agreement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper ipsum risus, quis convallis purus pellentesque vitae. Curabitur non elit vulputate, vehicula nibh eu, consectetur risus. Suspendisse ornare, magna molestie facilisis euismod, mauris tortor laoreet tellus, quis molestie lacus lacus sed odio. Aenean libero tellus, tincidunt ut arcu sit amet, rhoncus tincidunt felis. Etiam lobortis, nibh eget dictum tristique, lacus massa lobortis quam, quis lacinia sem sem et nisi. Donec vel libero sapien. Sed id dignissim risus, et feugiat metus. Suspendisse urna nisl, maximus eu pharetra in, mattis vitae mi. Duis iaculis luctus rhoncus. Nullam sodales urna eget tristique iaculis. Vestibulum eget blandit arcu. In consectetur placerat facilisis. Curabitur elementum tellus at mi congue finibus."
      },
      "buttonclass": "small",
      "agree": "first-name",
      "disagree": "user-agreement-warning"
    },
    "user-agreement-warning": {
      "teleprompter": {
        "heading": "Are you sure you want to delete your recording?",
      },
      "touchscreen": {
        "text": ""
      },
      "buttonclass": "large",
      "delete": "welcome",
      "save": "user-agreement"
    },
    "first-name": {
      "teleprompter": {
        "heading": "Please enter your first name.",
      },
      "touchscreen": {
        "text": ""
      },
      "keyboard": {
        "language": "english",
        "input": "firstname"
      },
      "buttonclass": "small",
      "next": "last-name",
      "back": "user-agreement"
    },
    "last-name": {
      "teleprompter": {
        "heading": "Please enter your last name.",
      },
      "touchscreen": {
        "text": ""
      },
      "keyboard": {
        "language": "english",
        "input": "lastname"
      },
      "buttonclass": "small",
      "next": "email",
      "back": "first-name"
    },
    "email": {
      "teleprompter": {
        "heading": "Please enter your email address.",
      },
      "touchscreen": {
        "text": ""
      },
      "keyboard": {
        "language": "english",
        "input": "email"
      },
      "buttonclass": "small",
      "next": "location",
      "back": "last-name"
    },
    "location": {
      "teleprompter": {
        "heading": "Please enter your city, state, and country.",
      },
      "touchscreen": {
        "text": ""
      },
      "keyboard": {
        "language": "english",
        "input": "location"
      },
      "buttonclass": "small",
      "next": "age",
      "back": "last-name"
    },
    "age": {
      "teleprompter": {
        "heading": "Are you 18 years of age or older?",
        "paragraph": "If you are not, your video will be saved but not shared publicly."
      },
      "touchscreen": {
        "age-select":{
          "yes": "yes",
          "no": "no",
        },
        "text": "age select here"
      },
      "buttonclass": "small",
      "next": "end",
      "back": "location"
    },
    "end": {
      "teleprompter": {
        "heading": "Video Submitted",
        "paragraph": "Thank you for submitting your video."
      },
      "touchscreen": {
        "text": ""
      },
      "buttonclass": "large",
      "record-again": "questions",
      "home": "attract"
    }
  }
    export default data;
