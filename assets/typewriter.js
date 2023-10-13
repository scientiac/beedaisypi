    // var fullText = 'An Architectural Engineering student passionate about art and an avid <a class="paralink" href="/bee">boo</a>k reader/collector.';
    var text = document.getElementById('text');
    var fullText = 'An Architectural Engineering student passionate about art and an avid <a class="paralink" href="/bee">boo</a>k reader/collector.';
    var part1 = fullText.slice(0, 1);  // The first letter
    var part2 = fullText.slice(1);  // The part after the first letter
    var i = 0;
    var forward = true;
    var speed = 100;  // Normal typing speed

    function typeWriter() {
        if (forward) {
            if (i < part2.length) {
                text.innerHTML = part1 + part2.slice(0, i+1);
                if (part2[i] === '<') {
                    speed = 10;  // Type faster
                } else if (part2[i] === '>') {
                    speed = 100;  // Return to normal speed
                }
                i++;
            } else {
                forward = false;
                setTimeout(typeWriter, 2000);  // Wait for a while when the line is completely typed
                return;
            }
        } else {
            if (i > 0) {
                text.innerHTML = part1 + part2.slice(0, i);
                if (part2[i-1] === '>') {
                    speed = 10;  // Type faster when deleting
                } else if (part2[i-1] === '<') {
                    speed = 100;  // Return to normal speed when deleting
                }
                i--;
            } else {
                forward = true;
            }
        }
        setTimeout(typeWriter, speed);
    }

    window.onload = typeWriter;
