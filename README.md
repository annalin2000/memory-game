
# Memory Game Project


# HTML

- [ ] Game wrapper
    - [ ] Create a main wrapper: section class="game"
    - [ ] Inside it, include the grid, stats bar, and win message area
- [ ] Grid container (4 x 3)
    - [ ] Add a container for cards: div class="game__grid"
    - [ ] Grid holds 12 card buttons (6 pairs)
- [ ] Card buttons (12 total)
    - [ ] Each card is a button for accessibility and easy click handling
    - [ ] Each card stores a match value (recommended via data-value and data-id)
    - [ ] Each card contains two faces:
        - [ ] .card__front (default/hidden state → “?”)
        - [ ] .card__back (revealed state → emoji)
- [ ] Stats bar
    - [ ] Wrapper: div class="stats"
    - [ ] Time display
    - [ ] Flips display 
    - [ ] Restart button
 - [ ] Win message section
    - [ ] Add a hidden win area
    - [ ] Show it only when all pairs are matched
-  [ ] Classes & IDs:
    - [ ] .game
    - [ ] .game__grid
    - [ ] .stats
    - [ ] #time
    - [ ] #flips
    - [ ] #restart
    - [ ] .card__front
    - [ ] .card__back
    - [ ] .card--flipped
    - [ ] .card--matched
    - [ ] .win


# SCSS

 -  [ ] Page + game background
     - [ ] Set body background to dark grey
     - [ ] Center the .game wrapper on the page
     - [ ] Add spacing and consistent font size
-  [ ] Grid layout
    - [ ] 4 columns
    - [ ] 3 rows
    - [ ] Gap between cards
-  [ ] Card base style
    - [ ] Cards are square with rounded corners
    - [ ] Use border for separation
    - [ ] Button fills the grid cell
-  [ ] Card faces
    - [ ] .card__front
        - [ ] Shows a blue question mark
        - [ ] Visible by default
    - [ ] .card__back
        - [ ] Hidden by default
        - [ ] Center the emoji
- [ ] Flipped state
    - [ ] .card--flipped
    - [ ] Hide front face
    - [ ] Show back face
- [ ] Matched state
    - [ ] .card--matched
    - [ ] Light blue background
    - [ ] Disable pointer events so it can’t be clicked again
- [ ] Unmatched feedback 
    - [ ] Add a temporary .card--wrong class
    - [ ] Red background flash
    - [ ] Remove after unflipping
- [ ] Stats bar + win message
    - [ ] .stats displayed as a row with spacing
    - [ ] Restart button blue
    - [ ] .win hidden by default, shown on win


# JS

 - [ ] Define values + build the deck
    - [ ] Create values = 6 unique emoji
    - [ ] Duplicate values to form pairs
    - [ ] Convert into card objects
 - [ ] Shuffle the deck
   - [ ] Loop from end to start
- [ ] Render cards into the grid
- [ ] Event listeners
   - [ ] Detect if a card button was clicked
   - [ ] Add click listener to restart the game
- [ ] Restart the game
   - [ ] Reset all state variables
   - [ ] Stop timer and reset time 
   - [ ] Reset all flips 
   - [ ] Hide win message
   - [ ] Build deck → shuffle → render
- [ ] Card click handler
   - [ ] Ignore the click if the game is already won, the card is already, flipped or already matched
   - [ ] Start the timer on the first valid card flip.
   - [ ] Flip the selected card face up
   - [ ] Increase the flip counter
   - [ ] If this is the first card store it and wait
   - [ ] If this is the second card compare the two cards
- [ ] Turn resolution
   - [ ] Compare the two flipped cards
   - [ ] If they match: mark both as matched, keep them face up
   - [ ] If they don’t match: briefly show them, then flip both back face down
- [ ] Win check 
   - [ ] After every successful match: check if all cards are matched
   - [ ] If yes: stop the timer, show the win message, prevent further interaction
- [ ] Timer logic 
   - [ ] Start counting time on the first card flip
   - [ ] Increase the time every second
   - [ ] Stop the timer when the game is won or restarted