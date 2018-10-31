// 'letters' for file naming purpose to get correct letter for keycode
const letters = {
    65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j",
    75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t",
    85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z"
};

// array of words
const arrABC = [
    ["Aa", "apple", "ant", "airplane"], ["Bb", "banana", "bat", "ball"], 
    ["Cc", "carrot", "cat", "car"], ["Dd", "dates", "dolphin", "door"], 
    ["Ee", "eggplant", "elephant", "eraser"], ["Ff", "fig", "fish", "fire engine"], 
    ["Gg", "grapes", "goldfish", "guitar"], ["Hh", "honey", "horse", "house"], 
    ["Ii", "ice cream", "insect", "island"], ["Jj", "jackfruit", "jelly fish", "jeep"],
    ["Kk", "kiwi", "kangaroo", "kite"], ["Ll", "lemon", "lady bug", "leaf"],
    ["Mm", "melon", "monkey", "moon"], ["Nn", "nuts", "net", "nail"],
    ["Oo", "orange", "orca", "oak tree"], ["Pp", "pear", "panda", "pen"],
    ["Qq", "queen", "quail", "quarter"], ["Rr", "rice", "rooster", "rainbow"],
    ["Ss", "salad", "seal", "shoes"], ["Tt", "tomatoes", "tiger", "tent"],
    ["Uu", "utensils", "unicorn", "ukulele"], ["Vv", "vase", "van", "vacuum"],
    ["Ww", "watermelon", "whale", "window"], ["Xx", "xray", "xray fish", "xylophone"],
    ["Yy", "yam", "yak", "yo-yo"], ["Zz", "zucchini", "zebra", "zipper"]
];