const fs = require('fs');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let packetLength = 4;
    for (var i = 0; i < data.length; i++) {
        var frame = data.slice(i, i + packetLength);

        if (checkFrameForUniqueness(frame)) {
            break;
        }
    }
    console.log('!!! Unique frame ("' + frame + '") found at index ' + i + '. Packet starts at: ' + (i + packetLength));

    let messageLength = 14;
    for (var i = 0; i < data.length; i++) {
        var frame = data.slice(i, i + messageLength);

        if (checkFrameForUniqueness(frame)) {
            break;
        }
    }
    console.log('!!! Unique frame ("' + frame + '") found at index ' + i + '. Message starts at: ' + (i + messageLength));
});

const checkFrameForUniqueness = (frame) => {
    for (let i = 0; i < frame.length; i++) {
        // having a different index between first occurance and last occurance means that there's a duplicate character
        if (frame.indexOf(frame[i]) !== frame.lastIndexOf(frame[i])) {
            return false;
        }
    }
    return true;
}