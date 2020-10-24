


const groups = ["Smileys & Emotion", "People & Body", ];

const loadEmojiFunc = async () => {
    
    const response = await fetch(`js/packages/emoji.json`);

    const result = await response.json();
    console.log(result)


}

loadEmojiFunc()