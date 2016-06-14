# PUPSLIDER
A brilliant implementation of the classic slider puzzle game. I use the word
brilliant not out of pride or vanity, but because it is a simple fact. Just
as the sun and the moon are facts.

Pupslider presents you with a selection of puppy images from Google Images, and leaves
it in your hands as to which puppy you'll be reconstructing during the game
session.

# Technical stuff
This is a pretty straightforward React app with only a few dependencies. I've
only worked with React a bit, so I took this as an opportunity to dive back in.

A very basic Express JS API runs in parallel in the same process and port as the
web server, which provides image manipulation, puppy image fetching, and high
score management. If this project were to move forward to deployment, one of
the first things I would do is break the API out into a separate project. It's
absurdly silly to run it in the same thread as the web server, but for
it works fine for demonstration purposes.

# Additional
This app severely lacks polish, and I'd love to revisit it and implement a few
of the features I originally planned:

1. Difficulty levels (aka arbitrary board sizes): "Puppy", "Dog", "I'm sorry
for your loss." (Yes, the "hard" difficulty is a bit morbid, but
logically, it plays)
1. Animation: it's almost there, but I wanted to focus on the API for now.
1. Sound: natch.
1. AI: The ability to watch the computer solve the puzzle, and subsequently
chide you for failing. This would undoubtedly utilize the classic A* pathfinding
algorithm.
1. Better component abstraction: The high scores should be their own component
