/* inspired by https://en.wikipedia.org/wiki/Set_(card_game) */

/* all available property values for cards in the game */
const CARD_PROPERTIES = ['COLOR', 'SHAPE', 'COUNT', 'FILL'];
const COLORS = ['RED', 'BLUE', 'GREEN'];
const SHAPES = ['RECT', 'OVAL', 'DIAMOND'];
const COUNTS = ['1', '2', '3'];
const FILLS = ['FULL', 'TRANSPARENT', 'EMPTY'];
const CARD_VALUES = {COLOR: COLORS, SHAPE: SHAPES, COUNT: COUNTS, FILL: FILLS}

/* generate all 81 cards for the game from all possible combinations of property values  */
const ALL_CARDS = [];
for (const color of COLORS) {
    for (const shape of SHAPES) {
        for (const count of COUNTS) {
            for (const fill of FILLS) {
                ALL_CARDS.push({
                    id: `${color}-${shape}-${count}-${fill}`,
                    color: color,
                    shape: shape,
                    count: count,
                    fill: fill
                })
            }
        }
    }
}


const NOT_THERE = -1;
