const lines = [
"Dear pi,",
"...",
"I've never experienced such happiness as I have with you",
"I just cannot imagine how I would have been if you weren't with me",
"And the paradox is that seeing you happy makes me happy",
"Maybe it's human nature to want to feel like how their loved ones are feeling.",
"And you might have already realized that life isn't as simple as we thought it was",
"Many variables keep on adding up",
"Being happy has become so complicated",
"but,",
"being with you makes me feel like a child who doesn't need any reason to be happy",
"Every birthday, new variables keep adding up",
"I being one this birthday",
"This is my first time wishing you a happy birthday",
"so, I am a little nervous",
"and scared",
"...",
"Bee,",
"The entire universe is made up of fluctuations",
"Every movement makes waves",
"Everything makes an impact on everything",
"Some are loosely connected and some entangled",
"I like to think",
"that, out of everything in the universe",
"we are the most entangled",
"because no matter how far we are",
"no matter what's in between us",
"we find a way to be together",
"and that's what I love about us",
"...",
"...",
"pi,",
"I wish you the best birthday ever",
"...",
"Yours,",
"b"
];

let currentLine = 0;
const textElement = document.getElementById('text');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function() {
    // Hide the button when typing starts
    startButton.style.display = 'none';
    // Reset currentLine to 0 every time the button is clicked
    currentLine = 0;
    startTyping();
});

function startTyping() {
    if (currentLine < lines.length) {
        const line = lines[currentLine];
        let i = 0;
        textElement.textContent = "";

        const typeWriter = setInterval(function() {
            if (i < line.length) {
                textElement.textContent += line.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                setTimeout(function() {
                    clearText();
                }, 2000);
            }
        }, 100);
        currentLine++;
    } else {
        // Show the button when all lines have been typed and cleared
        startButton.style.display = 'block';
    }
}

function clearText() {
    let i = textElement.textContent.length;

    const textClearer = setInterval(function() {
        if (i >= 0) {
            textElement.textContent = textElement.textContent.slice(0, i);
            i--;
        } else {
            clearInterval(textClearer);
            // Only call startTyping if there are more lines to type
            if (currentLine < lines.length) {
                startTyping();
            } else {
                // Show the button when all lines have been typed and cleared
                startButton.style.display = 'block';
            }
        }
    }, 20);
}
