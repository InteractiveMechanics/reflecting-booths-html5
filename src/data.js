const data = {
  "attract": {
    "teleprompter": {
      "videosrc": "http://techslides.com/demos/sample-videos/small.mp4"
    },
    "touchscreen": {
      "text":"<h3>welcome to the</h3><h2>Recording Booth</h2><p>Tap anywhere to begin</p>"
    },
    "next": "welcome",
    "back": null
  },


      "welcome": {

        "teleprompter": {
          "heading": "Welcome to the 9/11 Recording Booths",
          "paragraph": "We invite you to record and share your thoughts about the on-going meaning of 9/11, or your own experiences of that day."
        },
        "touchscreen": {
          "text": ""
        },
        "next": "about-1",
        "back": "attract",
        "language": "language"

    },
    "language": {
      "teleprompter": {
        "heading": "Select Your Language"
      },
      "touchscreen": "langage input component here",
      "back": "welcome"

  },
      "about-1": {
        "teleprompter": {
          "heading": "Become Part of History",
          "paragraph": "There are many ways people have experienced the 9/11 and 1993 attacks. We welcome you to join the discussion by making a video recording sharing your perspective."
        },
        "touchscreen": {
          "text": ""
        },
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
        "next": "questions",
        "back": "about-1"
    },
      "questions": {
        "teleprompter": {},
        "touchscreen": {},
        "next": "record-intro-1",
        "back": "about-2"
    },

      "record-intro-1": {
        "teleprompter": {
          "heading": "video component"
        },
        "touchscreen": {
          "text": ""
        },
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
        "next": "recording",
        "back": "record-intro-1"
    },
      "recording": {
        "teleprompter": {
          "heading": "Recording starts in (d3 animation countdown component)",
          "paragraph": "last prompt rendered in place of progress"
        },
        "touchscreen": {
          "text": ""
        },
        "next": "review",
        "back": "record-intro-2"
      },

    "review": {
      "teleprompter": {
        "heading": "Recording Complete",
        "paragraph": "Thank you for your recording. You may retake your video or tap continue to enter your information and submit your video to the museum."
      },
      "touchscreen": {
        "text": ""
      },
      "next": "user-agreement"
    },
    "user-agreement": {
      "teleprompter": {
        "heading": "Submitting Your Video",
        "paragraph": "To submit your video for use by the museum, you must agree to our terms of service and enter your information on the screen in front of you."
      },
      "touchscreen": {
        "text": ""
      },
      "next": "first-name",
      "back": "user-agreement-warning"
    },
    "user-agreement-warning": {
      "teleprompter": {
        "heading": "Are you sure you want to delete your recording?",
      },
      "touchscreen": {
        "text": ""
      },
      "next": "first-name",
      "back": "end"
    },
    "first-name": {
      "teleprompter": {
        "heading": "Please enter your first name.",
      },
      "touchscreen": {
        "text": ""
      },
      "keyboard": {
        "language": "english"
      },
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
      "next": "age",
      "back": "last-name"
    },
    "age": {
      "teleprompter": {
        "heading": "Are you 18 years of age or older?",
        "paragraph": "If you are not, your video will be saved but not shared publicly."
      },
      "touchscreen": {
        "text": "age select here"
      },
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
      "next": "questions",
      "back": "attract"
    }
  }
    export default data;
