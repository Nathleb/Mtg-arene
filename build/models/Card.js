"use strict";

const mongoose = require("mongoose");

var random = require("mongoose-simple-random");

mongoose.set("debug", true);
const cardSchema = new mongoose.Schema({
  _id: {
    type: "ObjectId"
  },
  image_uris: {
    small: {
      type: "String"
    },
    normal: {
      type: "String"
    },
    large: {
      type: "String"
    },
    png: {
      type: "String"
    },
    art_crop: {
      type: "String"
    },
    border_crop: {
      type: "String"
    }
  },
  cmc: {
    type: "Number"
  },
  edhrec_rank: {
    type: "Number"
  },
  related_uris: {
    gatherer: {
      type: "String"
    },
    tcgplayer_infinite_articles: {
      type: "String"
    },
    tcgplayer_infinite_decks: {
      type: "String"
    },
    edhrec: {
      type: "String"
    },
    mtgtop8: {
      type: "String"
    }
  },
  object: {
    type: "String"
  },
  id: {
    type: "String"
  },
  oracle_id: {
    type: "String"
  },
  multiverse_ids: {
    type: ["Number"]
  },
  mtgo_id: {
    type: "Number"
  },
  tcgplayer_id: {
    type: "Number"
  },
  cardmarket_id: {
    type: "Number"
  },
  name: {
    type: "String"
  },
  lang: {
    type: "String"
  },
  released_at: {
    type: "Date"
  },
  uri: {
    type: "String"
  },
  scryfall_uri: {
    type: "String"
  },
  layout: {
    type: "String"
  },
  highres_image: {
    type: "Boolean"
  },
  image_status: {
    type: "String"
  },
  mana_cost: {
    type: "String"
  },
  type_line: {
    type: "String"
  },
  oracle_text: {
    type: "String"
  },
  colors: {
    type: "Array"
  },
  color_identity: {
    type: ["Array"]
  },
  keywords: {
    type: "Array"
  },
  produced_mana: {
    type: ["String"]
  },
  legalities: {
    standard: {
      type: "String"
    },
    future: {
      type: "String"
    },
    historic: {
      type: "String"
    },
    gladiator: {
      type: "String"
    },
    pioneer: {
      type: "String"
    },
    modern: {
      type: "String"
    },
    legacy: {
      type: "String"
    },
    pauper: {
      type: "String"
    },
    vintage: {
      type: "String"
    },
    penny: {
      type: "String"
    },
    commander: {
      type: "String"
    },
    brawl: {
      type: "String"
    },
    historicbrawl: {
      type: "String"
    },
    paupercommander: {
      type: "String"
    },
    duel: {
      type: "String"
    },
    oldschool: {
      type: "String"
    },
    premodern: {
      type: "String"
    }
  },
  games: {
    type: ["String"]
  },
  reserved: {
    type: "Boolean"
  },
  foil: {
    type: "Boolean"
  },
  nonfoil: {
    type: "Boolean"
  },
  finishes: {
    type: ["String"]
  },
  oversized: {
    type: "Boolean"
  },
  promo: {
    type: "Boolean"
  },
  reprint: {
    type: "Boolean"
  },
  variation: {
    type: "Boolean"
  },
  set_id: {
    type: "String"
  },
  set: {
    type: "String"
  },
  set_name: {
    type: "String"
  },
  set_type: {
    type: "String"
  },
  set_uri: {
    type: "String"
  },
  set_search_uri: {
    type: "String"
  },
  scryfall_set_uri: {
    type: "String"
  },
  rulings_uri: {
    type: "String"
  },
  prints_search_uri: {
    type: "String"
  },
  collector_number: {
    type: "String"
  },
  digital: {
    type: "Boolean"
  },
  rarity: {
    type: "String"
  },
  flavor_text: {
    type: "String"
  },
  card_back_id: {
    type: "String"
  },
  artist: {
    type: "String"
  },
  artist_ids: {
    type: ["String"]
  },
  illustration_id: {
    type: "String"
  },
  border_color: {
    type: "String"
  },
  frame: {
    type: "Date"
  },
  full_art: {
    type: "Boolean"
  },
  textless: {
    type: "Boolean"
  },
  booster: {
    type: "Boolean"
  },
  story_spotlight: {
    type: "Boolean"
  },
  prices: {
    usd: {
      type: "String"
    },
    usd_foil: {
      type: "String"
    },
    usd_etched: {
      type: "Mixed"
    },
    eur: {
      type: "String"
    },
    eur_foil: {
      type: "String"
    },
    tix: {
      type: "String"
    }
  },
  img: {
    data: Buffer,
    contentType: String
  }
}, {
  collection: "ravnica"
});
cardSchema.plugin(random);
const Card = mongoose.model("card", cardSchema);
module.exports = Card;
//# sourceMappingURL=Card.js.map