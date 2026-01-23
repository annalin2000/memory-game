# Memory Game Project

# HTML

- [x] Game wrapper
  - [x] Main .wrapper contains the entire game
  - [x] Wrapper holds cards, stats, and message
- [x] Card grid
  - [x] 4 × 3 layout (12 cards total)
  - [x] Each card appears exactly twice to form 6 pairs
- [x] Cards
  - [x] Cards are clickable elements
  - [x] Each card has two faces:
    - [x] Front face shows a question mark icon
    - [x] Back face shows an image
- [x] Stats bar
  - [x] Displays remaining time
  - [x] Displays number of flips
  - [x] Includes a restart button
- [x] Message section
  - [x] Hidden by default
  - [x] Shown on win or loss
  - [x] Contains a message and one action button
  - [x] Button advances to next level or retries the level

# SCSS

- [x] Page layout
  - [x] Center the game on the screen
  - [x] Light blue background
  - [x] Consistent font across the app
- [x] Game container
  - [x] Fixed square layout
  - [x] Rounded corners and shadow
  - [x] Responsive sizing
- [x] Card grid
  - [x] Flex based 4 × 3 layout
  - [x] Even spacing between cards
- [x] Card visuals
  - [x] Front and back faces stacked
  - [x] Front face visible by default
  - [x] Back face hidden until flipped
  - [x] 3D flip animation on interaction
- [x] Card states
  - [x] Flipped cards reveal their image
  - [x] Wrong matches trigger a shake animation
  - [x] Matched cards remain revealed and cannot be clickedclicked again
- [x] Message section
  - [x] Covers the game area
  - [x] Centered message box

# JS

- [x] Game state
  - [x] Track selected cards per turn
  - [x] Lock input during animations
  - [x] Track matched cards
  - [x] Track flip count
  - [x] Track current level
- [x] Timer & difficulty
  - [x] Countdown timer
  - [x] Timer starts on first card flip
  - [x] Time decreases as levels increase
  - [x] Timer stops on win or loss
- [x] Card interaction
  - [x] Ignore clicks when input is locked
  - [x] Ignore already matched cards
  - [x] Flip card on click
  - [x] Store first card selection
  - [x] Compare cards after second selection
- [x] Turn resolution
  - [x] Matching cards stay face up
  - [x] Non-matching cards briefly reveal, then flip back
  - [x] Input remains locked during mismatch delay
  - [x] Sound feedback for matches and mistakes
- [x] Win & lose logic
  - [x] Win detected when all pairs are matched
  - [x] Timer stops on win
  - [x] Win message shows “Next Level”
  - [x] Loss detected when time reaches zero
  - [x] Loss message shows “Retry Level”
- [x] Restart & progression
  - [x] Restart resets all game state
  - [x] Cards reshuffle each level
  - [x] Timer recalculates per level
  - [x] Game can restart or advance without refreshing the page
